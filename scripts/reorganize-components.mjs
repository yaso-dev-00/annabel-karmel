import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const COMPONENTS = path.join(ROOT, "components");

/** @type {Record<string, string>} old basename (no ext) -> new path under components/ */
const COMPONENT_MAP = {
  "use-snap-carousel": "hooks/useSnapCarousel",
  "use-media-query": "hooks/useMediaQuery",

  "site-header": "SiteLayout/SiteHeader",
  "site-footer": "SiteLayout/SiteFooter",
  "site-nav-progress": "SiteLayout/SiteNavProgress",
  "site-nav-overlay": "SiteLayout/SiteNavOverlay",
  "site-newsletter": "SiteLayout/SiteNewsletter",
  "site-newsletter-bar": "SiteLayout/SiteNewsletterBar",
  "newsletter-modal": "SiteLayout/NewsletterModal",
  "site-ad-placement": "SiteLayout/SiteAdPlacement",
  "site-ad-banner": "SiteLayout/SiteAdBanner",
  "instagram-share-section": "SiteLayout/InstagramShareSection",

  "fallback-image": "UiPrimitives/FallbackImage",
  "search-icon": "UiPrimitives/SearchIcon",
  "section-background-image": "UiPrimitives/SectionBackgroundImage",
  "product-hero-image": "UiPrimitives/ProductHeroImage",

  "related-articles-carousel": "SharedCarousels/RelatedArticlesCarousel",
  "article-recipe-carousel": "SharedCarousels/ArticleRecipeCarousel",
  "book-image-carousel": "SharedCarousels/BookImageCarousel",
  "ways-to-serve-carousel": "SharedCarousels/WaysToServeCarousel",

  "home-page": "HomeScreen/HomePage",

  "recipe-detail-page": "RecipeScreen/RecipeDetailPage",
  "recipe-category-page": "RecipeScreen/RecipeCategoryPage",
  "recipe-finder": "RecipeScreen/RecipeFinder",
  "recipe-finder-select": "RecipeScreen/RecipeFinderSelect",
  "recipe-listing-grid": "RecipeScreen/RecipeListingGrid",

  "advice-category-listing": "ArticleScreen/AdviceCategoryListing",
  "pregnancy-advice-listing": "ArticleScreen/PregnancyAdviceListing",
  "listing-pagination-scroll": "ArticleScreen/ListingPaginationScroll",
  "article-static-page": "ArticleScreen/ArticleStaticPage",
  "get-kids-kitchen-recipe-carousel": "ArticleScreen/GetKidsKitchenRecipeCarousel",
  "adam-fox-allergies-accordion": "ArticleScreen/AdamFoxAllergiesAccordion",
  "balanced-trimesters-accordion": "ArticleScreen/BalancedTrimestersAccordion",
  "development-milestones-accordion": "ArticleScreen/DevelopmentMilestonesAccordion",
  "dairy-free-faq-accordion": "ArticleScreen/DairyFreeFaqAccordion",
  "food-allergies-faq-accordion": "ArticleScreen/FoodAllergiesFaqAccordion",
  "food-category-accordion": "ArticleScreen/FoodCategoryAccordion",
  "egg-questions-accordion": "ArticleScreen/EggQuestionsAccordion",
  "weaning-kitchen-essentials-accordion": "ArticleScreen/WeaningKitchenEssentialsAccordion",

  "frozen-meals-page": "ProductScreen/categories/FrozenMealsPage",
  "chilled-meals-page": "ProductScreen/categories/ChilledMealsPage",
  "plant-powered-bites-page": "ProductScreen/categories/PlantPoweredBitesPage",
  "australia-frozen-page": "ProductScreen/categories/AustraliaFrozenPage",
  "product-category-intro-section": "ProductScreen/shared/ProductCategoryIntroSection",
  "product-category-product-card": "ProductScreen/shared/ProductCategoryProductCard",
  "frozen-product-page": "ProductScreen/detail/FrozenProductPage",
  "chilled-product-page": "ProductScreen/detail/ChilledProductPage",
  "australia-frozen-product-page": "ProductScreen/detail/AustraliaFrozenProductPage",
  "plant-powered-bites-product-page": "ProductScreen/detail/PlantPoweredBitesProductPage",
  "mild-chicken-tikka-page": "ProductScreen/detail/wrappers/MildChickenTikkaPage",
  "chicken-tikka-masala-page": "ProductScreen/detail/wrappers/ChickenTikkaMasalaPage",
  "chicken-tomato-mascarpone-pasta-page": "ProductScreen/detail/wrappers/ChickenTomatoMascarponePastaPage",
  "tasty-spaghetti-bolognese-page": "ProductScreen/detail/wrappers/TastySpaghettiBolognesePage",
  "mighty-bolognese-mac-and-cheese-page": "ProductScreen/detail/wrappers/MightyBologneseMacAndCheesePage",
  "tableware-page": "ProductScreen/tableware/TablewarePage",
  "tableware-product-page": "ProductScreen/tableware/TablewareProductPage",
  "tableware-hero-carousel": "ProductScreen/tableware/TablewareHeroCarousel",
  "tableware-features-section": "ProductScreen/tableware/TablewareFeaturesSection",
  "tableware-product-card": "ProductScreen/tableware/TablewareProductCard",

  "recipe-app-page": "MarketingScreen/RecipeAppPage",
  "recipe-app-features-scroll": "MarketingScreen/RecipeAppFeaturesScroll",
  "recipe-app-carousels": "MarketingScreen/RecipeAppCarousels",
  "recipe-app-pricing": "MarketingScreen/RecipeAppPricing",
  "childcare-app-page": "MarketingScreen/ChildcareAppPage",
  "childcare-app-carousels": "MarketingScreen/ChildcareAppCarousels",
  "empower-your-employees-page": "MarketingScreen/EmpowerYourEmployeesPage",
  "empower-carousels": "MarketingScreen/EmpowerCarousels",
  "empower-form-select": "MarketingScreen/EmpowerFormSelect",
  "our-books-page": "MarketingScreen/OurBooksPage",
  "offers-page": "MarketingScreen/OffersPage",
  "craft-crumb-page": "MarketingScreen/CraftCrumbPage",

  "about-annabel-karmel-page": "FooterPagesScreen/AboutAnnabelKarmelPage",
  "contact-page": "FooterPagesScreen/ContactPage",
  "contact-select": "FooterPagesScreen/ContactSelect",

  "legal-page-content": "LegalScreen/LegalPageContent",
};

const SPECIAL_MAP = {
  "marketing/marketing-primitives.tsx": "MarketingScreen/MarketingPrimitives/marketing-primitives.tsx",
  "marketing/marketing.module.css": "MarketingScreen/MarketingPrimitives/marketing.module.css",
  "product-category-shared.module.css": "ProductScreen/shared/product-category-shared.module.css",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function gitMv(from, to) {
  ensureDir(path.dirname(to));
  if (!fs.existsSync(from)) {
    return false;
  }
  if (fs.existsSync(to)) {
    console.warn(`skip exists: ${to}`);
    return false;
  }
  execSync(`git mv "${from.replace(/\\/g, "/")}" "${to.replace(/\\/g, "/")}"`, {
    cwd: ROOT,
    stdio: "inherit",
  });
  return true;
}

function moveFlatComponents() {
  let moved = 0;
  for (const [base, destDir] of Object.entries(COMPONENT_MAP)) {
    for (const ext of [".tsx", ".ts", ".module.css"]) {
      const from = path.join(COMPONENTS, `${base}${ext}`);
      const to = path.join(COMPONENTS, destDir, `${base}${ext}`);
      if (gitMv(from, to)) moved += 1;
    }
  }

  for (const [rel, destRel] of Object.entries(SPECIAL_MAP)) {
    if (gitMv(path.join(COMPONENTS, rel), path.join(COMPONENTS, destRel))) moved += 1;
  }

  const iconsFrom = path.join(COMPONENTS, "recipe-detail-icons");
  const iconsTo = path.join(COMPONENTS, "RecipeScreen/RecipeDetailIcons");
  if (fs.existsSync(iconsFrom) && !fs.existsSync(iconsTo)) {
    ensureDir(path.dirname(iconsTo));
    gitMv(iconsFrom, iconsTo);
    moved += 1;
  }

  const marketingDir = path.join(COMPONENTS, "marketing");
  if (fs.existsSync(marketingDir) && fs.readdirSync(marketingDir).length === 0) {
    fs.rmdirSync(marketingDir);
  }

  return moved;
}

function createIndexFiles() {
  const indexDirs = new Set(Object.values(COMPONENT_MAP));

  for (const dir of indexDirs) {
    const fullDir = path.join(COMPONENTS, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs
      .readdirSync(fullDir)
      .filter((f) => (f.endsWith(".tsx") || f.endsWith(".ts")) && f !== "index.ts");

    if (files.length === 0) continue;

    const mainFile = files[0];
    const base = mainFile.replace(/\.(tsx|ts)$/, "");
    const indexPath = path.join(fullDir, "index.ts");
    fs.writeFileSync(indexPath, `export * from "./${base}";\n`);
  }
}

function buildImportReplacements() {
  /** @type {Array<[string, string]>} */
  const replacements = [];

  for (const [base, dest] of Object.entries(COMPONENT_MAP)) {
    replacements.push([`@/components/${base}`, `@/components/${dest}`]);
  }

  replacements.push([
    `@/components/MarketingScreen/MarketingPrimitives`,
    `@/components/MarketingScreen/MarketingPrimitives`,
  ]);
  replacements.push([
    `@/components/RecipeScreen/RecipeDetailIcons`,
    `@/components/RecipeScreen/RecipeDetailIcons`,
  ]);

  replacements.sort((a, b) => b[0].length - a[0].length);
  return replacements;
}

function updateImportsInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
  return changed;
}

function walkAndUpdateImports(dir, replacements) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      count += walkAndUpdateImports(full, replacements);
    } else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) {
      if (updateImportsInFile(full, replacements)) count += 1;
    }
  }
  return count;
}

function fixProductSharedCssImports() {
  const sharedImport = `from "@/components/ProductScreen/shared/product-category-shared.module.css"`;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".tsx")) {
        let content = fs.readFileSync(full, "utf8");
        const next = content.replace(
          /from "\.\.?\/product-category-shared\.module\.css"/g,
          sharedImport,
        );
        if (next !== content) fs.writeFileSync(full, next);
      }
    }
  };
  if (fs.existsSync(path.join(COMPONENTS, "ProductScreen"))) {
    walk(path.join(COMPONENTS, "ProductScreen"));
  }
}

console.log("Moving components...");
const moved = moveFlatComponents();
console.log(`Moved ${moved} files`);

console.log("Creating index.ts files...");
createIndexFiles();

// MarketingPrimitives index
const mpDir = path.join(COMPONENTS, "MarketingScreen/MarketingPrimitives");
if (fs.existsSync(mpDir)) {
  fs.writeFileSync(path.join(mpDir, "index.ts"), `export * from "./marketing-primitives";\n`);
}

console.log("Updating imports...");
const replacements = buildImportReplacements();
const updated = walkAndUpdateImports(ROOT, replacements);
console.log(`Updated imports in ${updated} files`);

fixProductSharedCssImports();

console.log("Done.");
