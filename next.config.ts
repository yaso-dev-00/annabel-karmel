import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/advice/baby-nutrition",
        destination: "/category/nutrition/baby-nutrition",
        permanent: true,
      },
      {
        source: "/babys-hydration",
        destination: "/babys-hydration-2",
        permanent: true,
      },
      {
        source: "/top-tips-thinning-baby-purees",
        destination: "/top-tips-thinning-baby-purees-2",
        permanent: true,
      },
      { source: "/recipes/first-foods", destination: "/recipe-category/first-foods", permanent: true },
      { source: "/recipes/6-9-months", destination: "/recipe-category/6-9-months-recipes", permanent: true },
      { source: "/recipes/9-12-months", destination: "/recipe-category/9-12-months", permanent: true },
      { source: "/recipes/12-18-months", destination: "/recipe-category/12-18-months", permanent: true },
      { source: "/recipes/18-months-plus", destination: "/recipe-category/18-months", permanent: true },
      { source: "/recipes/family", destination: "/recipe-category/family-recipes", permanent: true },
      { source: "/recipes/meal-time/breakfast", destination: "/meal-time/breakfast", permanent: true },
      { source: "/recipes/meal-time/snacks", destination: "/meal-time/snack", permanent: true },
      { source: "/recipes/meal-time/main-meals", destination: "/meal-time/main-meals", permanent: true },
      { source: "/recipes/meal-time/desserts", destination: "/meal-time/dessert-recipes", permanent: true },
      { source: "/recipes/meal-time/weaning", destination: "/meal-time/weaning", permanent: true },
      { source: "/recipes/free-from/plant-based", destination: "/allergen/vegan", permanent: true },
      { source: "/recipes/free-from/vegetarian", destination: "/allergen/vegetarian", permanent: true },
      { source: "/recipes/free-from/dairy-free", destination: "/allergen/dairy-free-recipes", permanent: true },
      { source: "/recipes/free-from/egg-free", destination: "/allergen/egg-free-recipes", permanent: true },
      { source: "/recipes/free-from/gluten-free", destination: "/allergen/gluten-free-recipes", permanent: true },
      { source: "/recipes/free-from/nut-free", destination: "/allergen/nut-free-recipes", permanent: true },
    ];
  },
};

export default nextConfig;
