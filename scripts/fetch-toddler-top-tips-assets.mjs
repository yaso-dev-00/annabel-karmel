import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const slug = "toddler-top-tips-to-healthy-food-habits";
const outDir = path.join("public", "articles", slug);
const listingImage = path.join("public", "advice-category", "child-health-and-development", "toddler-top-tips.jpg");

await mkdir(outDir, { recursive: true });

const res = await fetch(`https://www.annabelkarmel.com/advice/${slug}/`);
const html = await res.text();

const hereLinks = [...html.matchAll(/href="([^"]+)"[^>]*>\s*HERE\s*<\/a>/gi)].map((m) => m[1]);
console.log("HERE links:", hereLinks);

const imgs = [...new Set([...html.matchAll(/https:\/\/www\.annabelkarmel\.com\/wp-content\/uploads\/[^"'\s]+/g)].map((m) => m[0]))];
console.log("content images:", imgs.slice(0, 5));

try {
  await copyFile(listingImage, path.join(outDir, "hero.jpg"));
  console.log("ok hero.jpg (from listing thumbnail)");
} catch {
  console.warn("fallback hero copy failed");
}
