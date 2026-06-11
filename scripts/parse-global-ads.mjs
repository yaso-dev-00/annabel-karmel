import fs from "fs";

const html = fs.readFileSync("d:/ak/scripts/live-home.html", "utf8");
const match = html.match(/window\.advads_passive_placements = (\{[\s\S]*?\});/);
const data = JSON.parse(match[1]);
const seen = new Set();
for (const placement of Object.values(data)) {
  for (const ad of Object.values(placement.ads || {})) {
    if (seen.has(ad.id)) continue;
    seen.add(ad.id);
    const geo = ad.visitors?.length ? ad.visitors.map((v) => v.country).join(",") : "global";
    if (geo !== "global") continue;
    const c = ad.content;
    const img = c.match(/<img[^>]+src="([^"]+)"/)?.[1];
    const href = c.match(/<a[^>]+href="([^"]+)"/)?.[1];
    const aria = c.match(/aria-label="([^"]*)"/)?.[1];
    const w = c.match(/width="(\d+)"/)?.[1];
    const h = c.match(/height="(\d+)"/)?.[1];
    console.log(JSON.stringify({ id: ad.id, title: ad.title, img, href, aria, w, h }, null, 2));
  }
}
