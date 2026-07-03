import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join("public", "articles", "how-to-sterilise-bottles");
await mkdir(dir, { recursive: true });

const url = "https://annabelkarmel.com/wp-content/uploads/2019/08/shutterstock_482677372-optimized.jpg";
const dest = path.join(dir, "sterilising-bottles.jpg");

let res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
if (!res.ok) {
  res = await fetch(`https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1200&output=jpg`);
}
if (!res.ok) throw new Error(`${res.status}`);
const buf = Buffer.from(await res.arrayBuffer());
await writeFile(dest, buf);
console.log("ok", dest, buf.length);
