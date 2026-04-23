import { ArticleStaticPage } from "@/components/article-static-page";

export default function CherryTomatoRecipesPage() {
  return (
    <ArticleStaticPage
      category="Seasonal"
      title="10 delicious cherry tomato recipes"
      intro="Bright, sweet cherry tomatoes are perfect for family cooking. These quick ideas work for snacks, lunches and simple evening meals."
      heroImage="/articles/10-delicious-cherry-tomato-recipes/hero.jpg"
      heroAlt="Cherry tomato dishes"
      sections={[
        {
          title: "Family-Friendly Tomato Ideas",
          points: [
            "Roasted tomato pasta with basil and parmesan.",
            "Tomato and mozzarella skewers for lunchboxes.",
            "Quick tomato soup with grilled cheese fingers.",
          ],
        },
        {
          title: "Make-Ahead Options",
          points: [
            "Batch roast tomatoes to use in sauces and wraps.",
            "Prepare a mild salsa for eggs, fish or baked potatoes.",
            "Store chopped tomato salad for same-day side dishes.",
          ],
        },
      ]}
    />
  );
}
