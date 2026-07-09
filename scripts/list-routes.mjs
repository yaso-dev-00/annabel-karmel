import fs from "fs";
import path from "path";

const BASE = "https://annabel-karmel.vercel.app";

function walk(dir, prefix = "") {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("(") || entry.name.startsWith("_")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) {
        routes.push({ path: `${prefix}/${entry.name}`, dynamic: true });
      } else {
        routes.push(...walk(full, `${prefix}/${entry.name}`));
      }
    } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
      routes.push({ path: prefix || "/", dynamic: false });
    }
  }
  return routes;
}

const staticUrls = walk("app")
  .filter((r) => !r.dynamic)
  .map((r) => BASE + (r.path === "/" ? "" : r.path.replace(/\\/g, "/")));

const expanded = {
  "recipe-category": [
    "first-foods",
    "6-9-months-recipes",
    "9-12-months",
    "12-18-months",
    "18-months",
    "family-recipes",
  ],
  "meal-time": ["breakfast", "snack", "main-meals", "dessert-recipes", "weaning"],
  allergen: [
    "vegan",
    "vegetarian",
    "dairy-free-recipes",
    "egg-free-recipes",
    "gluten-free-recipes",
    "nut-free-recipes",
  ],
  "meet-our-experts": [
    "maria-betsworth",
    "kerry-secker",
    "alexis-stickland-and-beccy-hands",
    "amy-ransom",
    "professor-adam-fox",
    "jenna-brown",
    "gemma-arnold-sophia-ziff-mental-health-behaviour-and-wellbeing-specialists",
  ],
  "apps-books": [
    "finger-foods",
    "weaning-2",
    "new-complete-baby-toddler-meal-planner-25th-anniversary-edition",
    "my-first-cookbook",
    "where-does-my-food-come-from",
    "fun-fast-easy-childrens-cookbook",
    "weaning-made-simple",
    "real-foods-kids-will-love",
    "baby-led-weaning-recipe-book",
    "annabels-family-cookbook",
    "babys-first-year-journal",
  ],
  tableware: [
    "suction-bowl-spoon-set",
    "plate-soft-sage",
    "compartment-plate-warm-stone",
    "multi-way-cup-warm-stone",
    "catch-all-bib-set-soft-sage-warm-stone",
    "placemat",
    "cutlery-set",
    "easy-grip-baby-spoons",
    "food-freezer-tray-soft-sage",
    "popsicle-mould",
    "mealtime-gift-set-soft-sage",
  ],
  recipes: [
    "fish-finger-pie",
    "smoked-sweet-paprika-pepper-chicken-puree-2",
    "salmon-spinach-fritters-2",
    "sweet-potato-chicken-croquettes-2",
    "mac-n-cheese-veggie-muffins",
    "104277",
    "rainbow-veggie-pizza",
    "choc-orange-marble-cake",
    "easy-5-veg-croquettes",
    "best-ever-roast-beef",
    "veggie-frittata-fingers",
    "nuggets-with-sweet-potato-wedges-veggies",
    "nuggets-party-platter",
    "nugget-katsu-curry",
    "kofta-style-wraps",
    "mini-burgers-grazing-platter",
    "mini-meat-free-sliders",
    "apple-puree-2",
    "banana-puree",
    "avocado-puree",
    "carrot-pea-puree",
    "butternut-squash-parsnip",
  ],
};

const navOnly = [
  "/advice",
  "/competitions",
  "/partners",
  "/pampers-snacking",
  "/pampers-2026",
  "/birds-eye",
  "/our-products",
  "/competitions/pots-for-tots",
  "/partners/sani-resort",
  "/partners/pampers",
  "/partners/dualit",
  "/partners/po-cruises",
  "/partners/bugaboo",
  "/partners/symprove",
  "/partners/heck",
  "/partners/jumeirah-carlton-tower",
  "/partners/green-giant",
  "/partners/warburtons",
  "/partners/hamleys",
  "/partners/reading-eggs",
  "/partners/emirates",
  "/partners/miele",
  "/partners/kallo",
  "/partners/baby-annabell",
  "/login",
  "/register",
  "/search",
  "/all-recipes",
  "/social/instagram",
  "/social/facebook",
  "/social/pinterest",
  "/social/tiktok",
];

const lines = [];
lines.push("# Annabel Karmel — All Routes");
lines.push(`# Base: ${BASE}`);
lines.push("");

lines.push(`## Static pages (${staticUrls.length})`);
staticUrls.sort().forEach((u) => lines.push(u));

for (const [segment, slugs] of Object.entries(expanded)) {
  lines.push("");
  lines.push(`## ${segment} (dynamic, ${slugs.length} known slugs)`);
  slugs.forEach((slug) => lines.push(`${BASE}/${segment}/${slug}`));
}

lines.push("");
lines.push(`## Nav-linked but no page yet (${navOnly.length})`);
navOnly.forEach((p) => lines.push(`${BASE}${p}`));

lines.push("");
lines.push("## Dynamic patterns (any slug)");
lines.push(`${BASE}/recipes/{slug}`);
lines.push(`${BASE}/recipe-category/{slug}`);
lines.push(`${BASE}/recipe-category/{slug}/page/{page}`);
lines.push(`${BASE}/meal-time/{slug}`);
lines.push(`${BASE}/meal-time/{slug}/page/{page}`);
lines.push(`${BASE}/allergen/{slug}`);
lines.push(`${BASE}/allergen/{slug}/page/{page}`);
lines.push(`${BASE}/advice/{slug}`);
lines.push(`${BASE}/meet-our-experts/{slug}`);
lines.push(`${BASE}/apps-books/{slug}`);
lines.push(`${BASE}/tableware/{slug}`);

fs.writeFileSync("route-urls.txt", lines.join("\n") + "\n");
console.log(`Wrote ${lines.filter((l) => l.startsWith("http")).length} URLs to route-urls.txt`);
