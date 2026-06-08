import { writeFile } from "node:fs/promises";
import path from "node:path";

const out = path.join("public", "articles", "toddler-top-tips-to-healthy-food-habits", "ttab-logo.png");
const urls = [
  "https://www.annabelkarmel.com/wp-content/uploads/2022/02/logo-300x300-optimized.png",
  "https://www.annabelkarmel.com/wp-content/uploads/2022/02/logo-300x300.png",
];

for (const url of urls) {
  try {
    let res = await fetch(url);
    if (!res.ok) {
      const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=png`;
      res = await fetch(proxy);
    }
    if (!res.ok) throw new Error(String(res.status));
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(out, buf);
    console.log("ok", out, buf.length);
    process.exit(0);
  } catch (e) {
    console.warn("fail", url, e.message);
  }
}
process.exit(1);
