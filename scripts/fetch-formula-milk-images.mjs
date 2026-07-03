import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join("public", "articles", "formula-milk");
await mkdir(dir, { recursive: true });

const bottle = path.join("public", "advice-category", "bottle-feeding-tips");
const breast = path.join("public", "advice-category", "breastfeeding-advice");

async function download(url, dest) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error(`too small (${buf.length})`);
  await writeFile(dest, buf);
  console.log("ok", path.basename(dest), buf.length);
}

async function tryDownload(url, dest, fallback) {
  try {
    await download(url, dest);
  } catch (e) {
    console.warn("fail", path.basename(dest), e.message);
    await copyFile(fallback, dest);
    console.log("fallback", path.basename(dest));
  }
}

// Decorative blue star-dot divider used between subsections.
await tryDownload(
  "https://www.annabelkarmel.com/wp-content/uploads/2018/10/divider-blue-optimized.png",
  path.join(dir, "divider-blue.png"),
  path.join(bottle, "formula-milk.jpg"),
);

// "Choosing a formula" and "Preparing formula" section images (origin 404s -> related).
await tryDownload(
  "https://www.annabelkarmel.com/wp-content/uploads/2018/09/shutterstock_738113506-1-optimized.jpg",
  path.join(dir, "choosing-a-formula.jpg"),
  path.join(bottle, "different-infant-formula-milks.jpg"),
);
await tryDownload(
  "https://www.annabelkarmel.com/wp-content/uploads/2018/09/shutterstock_738113488-optimized.jpg",
  path.join(dir, "preparing-formula.jpg"),
  path.join(breast, "newborn-feeding-patterns.jpg"),
);
