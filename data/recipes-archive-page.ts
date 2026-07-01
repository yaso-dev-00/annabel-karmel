const assetBase = "/recipes-archive";

export type RecipeBrowseTile = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const recipesArchiveHero = {
  finderBackground: `${assetBase}/finder-bg.webp`,
};

export const popularByAgeSection = {
  heading: "Popular by Age",
  subheading: "Recipes for every age, stage and occasion",
  tiles: [
    {
      title: "First Foods",
      href: "/recipe-category/first-foods",
      image: `${assetBase}/first-foods.jpg`,
      imageAlt: "First Foods",
    },
    {
      title: "6 Months +",
      href: "/recipe-category/6-9-months-recipes",
      image: `${assetBase}/6-months-plus.jpg`,
      imageAlt: "6 Months +",
    },
    {
      title: "9 Months +",
      href: "/recipe-category/9-12-months",
      image: `${assetBase}/9-months-plus.jpg`,
      imageAlt: "9 Months +",
    },
    {
      title: "12 Months +",
      href: "/recipe-category/12-18-months",
      image: `${assetBase}/12-months-plus.jpg`,
      imageAlt: "12 Months +",
    },
    {
      title: "18 Months +",
      href: "/recipe-category/18-months",
      image: `${assetBase}/18-months-plus.jpg`,
      imageAlt: "18 Months +",
    },
    {
      title: "Family",
      href: "/recipe-category/family-recipes",
      image: `${assetBase}/family.jpg`,
      imageAlt: "Family",
    },
  ] satisfies RecipeBrowseTile[],
};

export const browseByMealTimeSection = {
  heading: "Browse by Meal Time",
  tiles: [
    {
      title: "Breakfast",
      href: "/meal-time/breakfast",
      image: `${assetBase}/breakfast.jpg`,
      imageAlt: "Breakfast",
    },
    {
      title: "Main Meals",
      href: "/meal-time/main-meals",
      image: `${assetBase}/main-meals.jpg`,
      imageAlt: "Main Meals",
    },
    {
      title: "Desserts",
      href: "/meal-time/dessert-recipes",
      image: `${assetBase}/desserts.jpg`,
      imageAlt: "Desserts",
    },
    {
      title: "Snacks",
      href: "/meal-time/snack",
      image: `${assetBase}/snacks.jpg`,
      imageAlt: "Snacks",
    },
    {
      title: "Weaning",
      href: "/meal-time/weaning",
      image: `${assetBase}/weaning.jpg`,
      imageAlt: "Weaning",
    },
  ] satisfies RecipeBrowseTile[],
};
