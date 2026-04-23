import { ArticleStaticPage } from "@/components/article-static-page";

export default function FibreIntakePage() {
  return (
    <ArticleStaticPage
      category="Baby Nutrition"
      title="Fibre intake for babies - what you need to know!"
      intro="Fibre supports healthy digestion, but balance matters. This page covers how to increase fibre gradually without overwhelming small tummies."
      heroImage="/articles/fibre-intake-for-babies-what-you-need-to-know/hero.jpg"
      heroAlt="Fibre rich meals"
      sections={[
        {
          title: "Where to Start",
          points: [
            "Add soft fruit, vegetables and oats into daily meals.",
            "Introduce one higher-fibre food at a time.",
            "Pair fibre increases with extra fluids through the day.",
          ],
        },
        {
          title: "Balanced Plate Ideas",
          points: [
            "Combine wholegrains with protein and healthy fats.",
            "Keep portions age-appropriate and easy to chew.",
            "Use soups and mash bowls for mixed ingredients.",
          ],
        },
      ]}
    />
  );
}
