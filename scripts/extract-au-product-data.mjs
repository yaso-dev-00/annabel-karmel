const products = [
  "beautiful-bolognese-pasta-bake",
  "bolognese-mac-cheese",
  "comforting-beef-cottage-pie",
  "delicious-mild-butter-chicken-rice",
  "scrumptious-spaghetti-meatballs",
  "tasty-veggie-pasta-bake",
  "macaroni-cheese",
];

function retailerFromUrl(url) {
  if (url.includes("woolworths.com.au")) return "Woolworths";
  if (url.includes("coles.com.au")) return "Coles";
  if (url.includes("igashop.com.au")) return "IGA";
  return "Unknown";
}

for (const slug of products) {
  const res = await fetch(`https://www.annabelkarmel.com/products/${slug}/`);
  const html = await res.text();
  const retailers = [...html.matchAll(/dce-acf-repeater-item"><a href="([^"]+)"/g)].map((m) => m[1]);
  const unique = [...new Set(retailers)];
  console.log(`=== ${slug} ===`);
  for (const url of unique) {
    console.log(`  ${retailerFromUrl(url)}: ${url}`);
  }
  console.log("count:", unique.length);
}
