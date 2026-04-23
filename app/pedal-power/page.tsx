import { ArticleStaticPage } from "@/components/article-static-page";

export default function PedalPowerPage() {
  return (
    <ArticleStaticPage
      category="Family"
      title="Pedal Power!"
      intro="Cycling supports physical and emotional development. These simple ideas help children build confidence, coordination and joy outdoors."
      heroImage="/articles/pedal-power/hero.jpg"
      heroAlt="Child cycling"
      sections={[
        {
          title: "Benefits of Cycling",
          points: [
            "Improves balance, core strength and coordination.",
            "Encourages independence and confidence in movement.",
            "Builds healthy outdoor habits as a family.",
          ],
        },
        {
          title: "Getting Started",
          points: [
            "Choose a correctly sized bike for comfort and control.",
            "Practice in quiet open spaces before busier routes.",
            "Turn short rides into regular weekend rituals.",
          ],
        },
      ]}
    />
  );
}
