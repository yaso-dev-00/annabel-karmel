import fs from "fs";

const html = fs.readFileSync("d:/ak/scripts/live-home.html", "utf8");

const match = html.match(/window\.advads_passive_placements = (\{[\s\S]*?\});/);
if (!match) {
  console.log("no match");
  process.exit(1);
}
const data = JSON.parse(match[1]);
for (const [key, placement] of Object.entries(data)) {
  console.log("===", key, placement.placement_info?.title || placement.group_info?.name);
  for (const ad of Object.values(placement.ads || {})) {
    const c = ad.content || "";
    const img = c.match(/uploads\/[^"\\]+/)?.[0];
    const href = c.match(/href=\\"([^\\"]+)/)?.[1];
    const aria = c.match(/aria-label=\\"([^\\"]+)/)?.[1];
    const w = c.match(/width=\\"(\d+)/)?.[1];
    const h = c.match(/height=\\"(\d+)/)?.[1];
    const geo = ad.visitors?.length ? ad.visitors.map((v) => v.country).join(",") : "global";
    console.log(JSON.stringify({ id: ad.id, title: ad.title, geo, img, href, aria, w, h }));
  }
}
