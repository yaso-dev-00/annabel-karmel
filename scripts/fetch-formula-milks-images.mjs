import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join("public", "articles", "different-infant-formula-milks");
await mkdir(dir, { recursive: true });

const bottle = path.join("public", "advice-category", "bottle-feeding-tips");
const breast = path.join("public", "advice-category", "breastfeeding-advice");

async function download(url, dest) {
  let res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) throw new Error(`too small (${buf.length})`);
  await writeFile(dest, buf);
  console.log("ok", path.basename(dest), buf.length);
}

// The only body image the origin still serves (2016 asset) is the Comfort Milk twins photo.
try {
  await download(
    "https://www.annabelkarmel.com/wp-content/uploads/2016/08/Feeding-multiples-2-optimized.jpg",
    path.join(dir, "comfort-milk.jpg"),
  );
} catch (e) {
  console.warn("comfort-milk download failed", e.message);
  await copyFile(path.join(breast, "breastfeeding-multiples.jpg"), path.join(dir, "comfort-milk.jpg"));
}

// Every other heading image 404s on the origin (broken on the live site too),
// so use topically-related local assets.
const related = [
  ["first-stage.jpg", path.join(bottle, "different-infant-formula-milks.jpg")],
  ["goats-milk.jpg", path.join(bottle, "formula-milk.jpg")],
  ["anti-reflux.jpg", path.join(breast, "reflux-expert-advice.jpg")],
  ["soya.jpg", path.join(bottle, "responsive-bottle-feeding.jpg")],
  ["allergen-free.jpg", path.join(breast, "newborn-feeding-patterns.jpg")],
  ["cows-milk-allergy.jpg", path.join(breast, "breast-milk.jpg")],
  ["eczema-allergies.jpg", path.join(breast, "introduction-to-breastfeeding.jpg")],
  ["vegetarian-vegan.jpg", path.join(breast, "comfort-feeding.jpg")],
];

for (const [name, src] of related) {
  await copyFile(src, path.join(dir, name));
  console.log("related", name);
}
