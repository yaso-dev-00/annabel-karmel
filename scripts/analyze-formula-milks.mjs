const res = await fetch("https://www.annabelkarmel.com/advice/different-infant-formula-milks/", {
  headers: { "user-agent": "Mozilla/5.0" },
});
const html = await res.text();

const startIdx = html.indexOf("First Stage");
const endIdx = html.indexOf("Related Advice");
const region = html.slice(startIdx, endIdx);

const imgRe = /<img[^>]*>/gi;
let m;
while ((m = imgRe.exec(region))) {
  const tag = m[0];
  if (!tag.includes("wp-content/uploads")) continue;
  if (/AK_Logo|Frame-optimized|Close-optimized|Sarah-sig/.test(tag)) continue;
  console.log(tag);
  console.log("---");
}
