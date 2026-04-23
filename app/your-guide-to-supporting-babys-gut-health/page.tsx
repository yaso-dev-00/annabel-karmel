import { ArticleStaticPage } from "@/components/article-static-page";

export default function GutHealthPage() {
  return (
    <ArticleStaticPage
      category="Baby Nutrition"
      title="Your guide to supporting baby's gut health"
      intro="Healthy digestion supports comfort, appetite and routine. These everyday food habits can help support your baby's gut balance."
      heroImage="/articles/your-guide-to-supporting-babys-gut-health/hero.jpg"
      heroAlt="Healthy ingredients"
      sections={[
        {
          title: "Food Habits That Help",
          points: [
            "Serve fibre-rich fruits and vegetables in age-appropriate textures.",
            "Include wholegrain options as solids become established.",
            "Offer regular water with meals and snacks.",
          ],
        },
        {
          title: "Routine and Observation",
          points: [
            "Keep meal times regular to support predictable digestion.",
            "Introduce foods one by one when trying new ingredients.",
            "Check for signs of comfort, appetite and stool consistency.",
          ],
        },
      ]}
    />
  );
}
