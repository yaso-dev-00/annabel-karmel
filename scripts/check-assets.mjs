import fs from "fs";
import path from "path";

function extractPaths(file) {
  const content = fs.readFileSync(file, "utf8");
  const matches = [...content.matchAll(/["'`](\/[^"'`]+)["'`]/g)].map((m) => m[1]);
  return [...new Set(matches.filter((p) => p.startsWith("/product") || p.startsWith("/products")))];
}

const files = [
  "data/plant-powered-bites-page.ts",
  "data/chilled-meals-page.ts",
  "data/mild-chicken-tikka-page.ts",
  "data/australia-frozen-page.ts",
  "data/australia-frozen-products.ts",
];

const missing = [];
for (const file of files) {
  for (const assetPath of extractPaths(file)) {
    const disk = path.join("public", assetPath.replace(/^\//, ""));
    if (!fs.existsSync(disk)) missing.push({ file, path: assetPath });
  }
}
console.log(missing.length ? JSON.stringify(missing, null, 2) : "All referenced assets exist.");
