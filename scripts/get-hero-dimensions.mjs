import { readdirSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const products = [
  "delicious-cottage-pie",
  "mild-chicken-tikka",
  "tasty-chicken-pasta-in-a-tomato-veggie-sauce",
  "yummy-little-lasagne-new",
  "chicken-tikka-masala",
  "chicken-tomato-mascarpone-pasta",
  "mighty-bolognese-mac-and-cheese",
  "tasty-spaghetti-bolognese",
];

for (const slug of products) {
  const dir = join("d:/ak/public/products", slug);
  const files = readdirSync(dir);
  const desktop = files.find((f) => f.startsWith("hero-desktop"));
  const mobile = files.find((f) => f.startsWith("hero-mobile"));
  const d = await sharp(join(dir, desktop)).metadata();
  const m = await sharp(join(dir, mobile)).metadata();
  console.log(
    slug,
    JSON.stringify({
      desktopWidth: d.width,
      desktopHeight: d.height,
      mobileWidth: m.width,
      mobileHeight: m.height,
    }),
  );
}
