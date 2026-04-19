import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing | Manage Actly",
  description: "Simple monthly plans for social media management. Foundation, Growth and Authority. Start with a paid pilot.",
};

export default function PricingPage() {
  return <PricingClient />;
}
