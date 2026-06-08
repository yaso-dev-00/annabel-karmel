import { GaggingVsChokingArticle } from "@/app/advice/gagging-vs-choking/gagging-vs-choking-article";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gagging vs Choking: The differences you need to know | Annabel Karmel",
  description:
    "Learn the difference between gagging and choking when weaning, what to do in each situation, choking risks, and NHS first-aid guidance.",
};

export default function GaggingVsChokingAdvicePage() {
  return <GaggingVsChokingArticle currentHref="/advice/gagging-vs-choking" />;
}
