import { ArticleStaticPage } from "@/components/article-static-page";

export default function StartingSolidsPage() {
  return (
    <ArticleStaticPage
      category="Baby Nutrition"
      title="Starting solids: Top tips on how to transition from milk to solid food"
      intro="Moving to solids is a gradual process. These practical steps help you build confidence with textures, variety and mealtime rhythm."
      heroImage="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/hero.jpg"
      heroAlt="Baby first solids"
      sections={[
        {
          title: "Start Slow and Consistent",
          points: [
            "Begin with one meal a day and increase gradually.",
            "Keep milk feeds alongside solids while intake builds.",
            "Offer repeated tastes even if food is refused at first.",
          ],
        },
        {
          title: "Build Variety Over Time",
          points: [
            "Rotate vegetables, fruit, protein and grains during the week.",
            "Progress from smooth purees to mashed and soft finger foods.",
            "Introduce new foods one at a time for easier tracking.",
          ],
        },
      ]}
    />
  );
}
