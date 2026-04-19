// src/app/api/ai/generate/route.ts
// AI caption generation endpoint.
//
// Design:
// - Subscription + credit gated (checked before calling OpenAI)
// - Platform-aware prompts (LinkedIn tone ≠ Twitter tone)
// - Token-limited to control costs
// - Zod-validated input
// - No streaming for MVP (simpler error handling)

import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import {
  requireAuth,
  requireWorkspaceMember,
  requireAiCredits,
  withErrorHandling,
  badRequest,
  ApiError,
} from "@/lib/api";

// ─── OpenAI client ────────────────────────────────────────────────────────────

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  return new OpenAI({ apiKey });
}

// ─── Input schema ─────────────────────────────────────────────────────────────

const schema = z.object({
  workspaceId: z.string().min(1),
  platform: z.enum(["LINKEDIN"]), // expand as platforms are added
  prompt: z
    .string()
    .min(10, "Prompt must be at least 10 characters")
    .max(500, "Prompt must be under 500 characters"),
  tone: z
    .enum(["professional", "conversational", "inspirational", "educational"])
    .default("professional"),
  includeHashtags: z.boolean().default(true),
  postLength: z.enum(["short", "medium", "long"]).default("medium"),
});

type GenerateInput = z.infer<typeof schema>;

// ─── Platform-aware prompt builder ───────────────────────────────────────────

const LENGTH_GUIDELINES = {
  short:  "Keep it under 150 characters — punchy and direct.",
  medium: "Aim for 150–400 characters — substantive but scannable.",
  long:   "Write 400–700 characters — thought leadership format with clear structure.",
};

const TONE_GUIDELINES = {
  professional:   "Authoritative, polished, business-appropriate. No slang.",
  conversational: "Warm, direct, like talking to a colleague. First-person OK.",
  inspirational:  "Motivating, forward-looking, with a clear call to action.",
  educational:    "Informative, structured. Use numbered points or clear logic.",
};

function buildLinkedInPrompt(input: GenerateInput): string {
  return `You are an expert LinkedIn content strategist.

Write a LinkedIn post based on this brief:
"${input.prompt}"

Requirements:
- Tone: ${TONE_GUIDELINES[input.tone]}
- Length: ${LENGTH_GUIDELINES[input.postLength]}
- Platform: LinkedIn (professional network — NO casual language, NO emojis unless very sparing)
- Structure: Hook first line → Value in middle → CTA or insight at end
- ${input.includeHashtags ? "Add 3–5 relevant professional hashtags at the end (e.g. #Leadership #SaaS)" : "Do NOT include hashtags"}
- Write ONLY the post content. No intro, no "Here's a post:", no quotes around the content.
- Do not include a subject line or title.`;
}

function buildSystemPrompt(platform: string): string {
  return `You are an expert social media copywriter specializing in ${platform} content. 
You write high-performing posts that drive genuine engagement.
You understand platform nuances and always optimize for both authenticity and reach.
Output only the post content — no explanations, no meta-commentary.`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export const POST = withErrorHandling(async (req: Request) => {
  const { session } = await requireAuth();

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return badRequest(parsed.error.errors[0].message);
  }

  const input = parsed.data;
  const { workspaceId } = input;

  // Auth + subscription + credit check
  await requireWorkspaceMember(session.user.id, workspaceId);
  const { used, limit } = await requireAiCredits(workspaceId);

  // Call OpenAI
  const openai = getOpenAIClient();

  const maxTokens = {
    short:  80,
    medium: 200,
    long:   400,
  }[input.postLength];

  let generatedContent: string;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cost-efficient, high quality
      max_tokens: maxTokens,
      temperature: 0.75, // creative but not unpredictable
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(input.platform),
        },
        {
          role: "user",
          content: buildLinkedInPrompt(input),
        },
      ],
    });

    generatedContent = completion.choices[0]?.message?.content?.trim() ?? "";

    if (!generatedContent) {
      throw new ApiError(502, "AI returned an empty response. Please try again.");
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;

    // OpenAI SDK errors
    if (error instanceof OpenAI.APIError) {
      console.error("[AI] OpenAI API error:", error.status, error.message);

      if (error.status === 429) {
        throw new ApiError(429, "AI service is busy. Please try again in a moment.");
      }
      throw new ApiError(502, "AI service error. Please try again.");
    }

    throw error;
  }

  return NextResponse.json({
    content: generatedContent,
    platform: input.platform,
    creditsUsed: used + 1,
    creditsLimit: limit,
    model: "gpt-4o-mini",
  });
});
