import { ArticleStaticPage } from "@/components/article-static-page";

export default function HeckFamilyFavouritesPage() {
  return (
    <ArticleStaticPage
      category="Recipes & Ideas"
      title="Annabel's 6 family favourites with HECK!"
      intro="These quick family dinners focus on simple prep and familiar flavours, making weeknight cooking easier and more enjoyable."
      heroImage="/articles/annabels-6-family-favourites-with-heck/hero.jpg"
      heroAlt="Family dinner recipes"
      sections={[
        {
          title: "Weeknight Recipe Ideas",
          points: [
            "Sausage and vegetable tray bake with sweet potato wedges.",
            "Mini meatball pasta with tomato and hidden veg sauce.",
            "Mild sausage and bean stew served with soft rice.",
          ],
        },
        {
          title: "Meal Prep Shortcuts",
          points: [
            "Prep chopped vegetables in batches for two or three meals.",
            "Cook extra portions for next-day lunches.",
            "Keep sauces mild and add seasoning at the table for adults.",
          ],
        },
      ]}
    />
  );
}
