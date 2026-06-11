import fs from "fs";

const html = fs.readFileSync(
  "d:/ak/public/hero-slides/Annabel Karmel - Children's Recipes, Books & Food for Babies and Children.html",
  "utf8",
);
const match = html.match(/window\.advads_passive_placements = (\{[\s\S]*?\});/);
if (!match) {
  console.log("no match");
  process.exit(1);
}
const data = JSON.parse(match[1]);
function parseAd(ad) {
  const c = ad.content || "";
  const img = c.match(/uploads\/[^"\\]+/)?.[0];
  const href = c.match(/href=\\"([^\\"]+)/)?.[1] || c.match(/href="([^"]+)/)?.[1];
  const aria = c.match(/aria-label=\\"([^\\"]+)/)?.[1] || c.match(/aria-label="([^"]+)/)?.[1];
  const alt = c.match(/alt=\\"([^\\"]*)/)?.[1] || c.match(/alt="([^"]*)/)?.[1];
  const w = c.match(/width=\\"(\d+)/)?.[1] || c.match(/width="(\d+)/)?.[1];
  const h = c.match(/height=\\"(\d+)/)?.[1] || c.match(/height="(\d+)/)?.[1];
  const geo = ad.visitors?.length ? ad.visitors.map((v) => v.country || v.type).join(",") : "global";
  return { id: ad.id, title: ad.title, geo, img, href, aria, alt, w, h };
}

for (const [key, placement] of Object.entries(data)) {
  console.log("===", key, placement.placement_info?.title || placement.group_info?.name);
  for (const ad of Object.values(placement.ads || {}).map(parseAd)) {
    console.log(JSON.stringify(ad, null, 0));
  }
}
