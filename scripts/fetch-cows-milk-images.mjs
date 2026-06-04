import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const outDir = path.join("public", "articles", "cows-milk-allergy");
await mkdir(outDir, { recursive: true });

async function download(url, dest) {
  const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1200`;
  const res = await fetch(proxy);
  if (!res.ok) throw new Error(`${dest}: ${res.status}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log("ok", dest);
}

const AK = "https://www.annabelkarmel.com/wp-content/uploads";
await download(`${AK}/2017/06/milk-allergies.jpg`, path.join(outDir, "hero.jpg"));
await download(`${AK}/2019/10/toddler.png`, path.join(outDir, "book-meal-planner.png"));

const weaningBook = path.join("public", "articles", "weaning-and-baby-allergies", "book-meal-planner.png");
if (existsSync(weaningBook) && !existsSync(path.join(outDir, "book-meal-planner.png"))) {
  await copyFile(weaningBook, path.join(outDir, "book-meal-planner.png"));
}
