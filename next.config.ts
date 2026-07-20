import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  outputFileTracingIncludes: {
    "/admin": ["./data/cms/**/*"],
    "/admin/advice": ["./data/cms/**/*"],
    "/admin/advice/new": ["./data/cms/**/*"],
    "/admin/advice/[id]/edit": ["./data/cms/**/*"],
    "/admin/advice/[id]/preview": ["./data/cms/**/*"],
    "/api/admin/advice-articles": ["./data/cms/**/*"],
    "/api/admin/advice-articles/[id]": ["./data/cms/**/*"],
    "/advice/[slug]": ["./data/cms/**/*"],
    "/admin/articles": ["./data/cms/**/*"],
    "/admin/articles/new": ["./data/cms/**/*"],
    "/admin/articles/[id]/edit": ["./data/cms/**/*"],
    "/admin/articles/[id]/preview": ["./data/cms/**/*"],
    "/api/admin/articles": ["./data/cms/**/*"],
    "/api/admin/articles/[id]": ["./data/cms/**/*"],
    "/articles/[slug]": ["./data/cms/**/*"],
    "/admin/experts": ["./data/cms/**/*"],
    "/admin/experts/new": ["./data/cms/**/*"],
    "/admin/experts/[id]/edit": ["./data/cms/**/*"],
    "/admin/experts/[id]/preview": ["./data/cms/**/*"],
    "/api/admin/experts": ["./data/cms/**/*"],
    "/api/admin/experts/[id]": ["./data/cms/**/*"],
    "/api/admin/experts/settings": ["./data/cms/**/*"],
    "/experts/[slug]": ["./data/cms/**/*"],
    "/meet-our-experts": ["./data/cms/**/*"],
  },
  async rewrites() {
    return [
      // Cached 308s from the old /recipe-app/* redirect may still request assets here.
      {
        source: "/the-ultimate-baby-toddler-recipe-app/:path+",
        destination: "/recipe-app/:path+",
      },
    ];
  },
  async redirects() {
    return [
      {
        // Profile pages only — do not redirect static assets like /meet-our-experts/*.jpg
        source: "/meet-our-experts/:slug([^/.]+)",
        destination: "/experts/:slug",
        permanent: true,
      },
      {
        source: "/advice/baby-nutrition",
        destination: "/category/nutrition/baby-nutrition",
        permanent: true,
      },
      {
        source: "/advice/toddler-child",
        destination: "/category/nutrition/nutrition-toddler-child",
        permanent: true,
      },
      {
        source: "/advice/allergies",
        destination: "/category/nutrition/nutrition-allergies",
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
      {
        source: "/food-allergies-natashas-law-put-a-label-on-it",
        destination: "/food-allergies-put-a-label-on-it",
        permanent: true,
      },
      {
        source: "/managing-childs-food-allergy",
        destination: "/managing-my-childs-food-allergy",
        permanent: true,
      },
      {
        source: "/weaning-baby-allergies",
        destination: "/weaning-and-baby-allergies",
        permanent: true,
      },
      {
        source: "/travelling-children-food-allergies",
        destination: "/travelling-with-children-with-food-allergies",
        permanent: true,
      },
      {
        source: "/breastfeeding-food-allergies",
        destination: "/breastfeeding-and-food-allergies",
        permanent: true,
      },
      {
        source: "/eczema-linked-food-allergies",
        destination: "/is-eczema-linked-to-food-allergies",
        permanent: true,
      },
      {
        source: "/common-food-allergens-uk",
        destination: "/the-most-common-food-allergens-in-the-uk",
        permanent: true,
      },
      {
        source: "/common-food-allergies-babies",
        destination: "/most-common-food-allergies-in-babies",
        permanent: true,
      },
      {
        source: "/managing-babys-lactose-intolerance",
        destination: "/managing-your-babys-lactose-intolerance",
        permanent: true,
      },
      {
        source: "/advice/pregnancy-birth-postnatal",
        destination: "/advice-category/pregnancy-tips",
        permanent: true,
      },
      {
        source: "/advice/health-development",
        destination: "/advice-category/child-health-and-development",
        permanent: true,
      },
      {
        source: "/advice/sleep",
        destination: "/advice-category/baby-sleep-advice",
        permanent: true,
      },
      {
        source: "/infertility-and-iodine-deficiency-everything-you-need-to-know",
        destination: "/advice/infertility-and-iodine-deficiency-everything-you-need-to-know",
        permanent: true,
      },
      {
        source: "/the-best-foods-for-boosting-fertility",
        destination: "/advice/the-best-foods-for-boosting-fertility",
        permanent: true,
      },
      {
        source: "/top-ten-tips-fourth-trimester",
        destination: "/advice/top-ten-tips-fourth-trimester",
        permanent: true,
      },
      {
        source: "/pregnancy-month-month",
        destination: "/advice/pregnancy-month-month",
        permanent: true,
      },
      { source: "/nesting", destination: "/advice/nesting", permanent: true },
      { source: "/what-to-buy", destination: "/advice/what-to-buy", permanent: true },
      {
        source: "/weaning-premature-babies",
        destination: "/advice/weaning-premature-babies",
        permanent: true,
      },
      {
        source: "/looking-after-childrens-teeth",
        destination: "/advice/looking-after-childrens-teeth",
        permanent: true,
      },
      {
        source: "/cooking-with-kids",
        destination: "/advice/cooking-with-kids",
        permanent: true,
      },
      {
        source: "/toddler-snacking",
        destination: "/advice/toddler-snacking",
        permanent: true,
      },
      {
        source: "/cooking-with-toddlers",
        destination: "/advice/cooking-with-toddlers",
        permanent: true,
      },
      {
        source: "/potty-training",
        destination: "/advice/potty-training",
        permanent: true,
      },
      {
        source: "/learn-through-play",
        destination: "/advice/learn-through-play",
        permanent: true,
      },
      {
        source: "/common-concerns",
        destination: "/advice/common-concerns",
        permanent: true,
      },
      {
        source: "/schools",
        destination: "/advice/schools",
        permanent: true,
      },
      {
        source: "/family-health",
        destination: "/advice/family-health",
        permanent: true,
      },
      {
        source: "/teething",
        destination: "/advice/teething",
        permanent: true,
      },
      {
        source: "/our-products/chilled-meals",
        destination: "/product-category/chilled-meals",
        permanent: true,
      },
      {
        source: "/our-products/frozen-meals",
        destination: "/product-category/frozen-meals",
        permanent: true,
      },
      {
        source: "/our-products/plant-powered-bites",
        destination: "/product-category/plant-powered-bites",
        permanent: true,
      },
      {
        source: "/our-products/baking-kits",
        destination: "/craft-crumb",
        permanent: true,
      },
      {
        source: "/our-products/cookbooks",
        destination: "/app-book-category/our-books",
        permanent: true,
      },
      {
        source: "/our-products/cookbooks/:path*",
        destination: "/apps-books/:path*",
        permanent: true,
      },
      {
        source: "/recipe-app",
        destination: "/the-ultimate-baby-toddler-recipe-app",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/product-category/food-au",
        destination: "/product-category/australia-frozen",
        permanent: true,
      },
      {
        source: "/product-category/food-au/:path*",
        destination: "/product-category/australia-frozen",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
