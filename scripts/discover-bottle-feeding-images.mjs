const res = await fetch("https://www.annabelkarmel.com/advice-category/bottle-feeding-tips/", {
  headers: { "user-agent": "Mozilla/5.0" },
});
const html = await res.text();

// Grab each article card: link to /advice/<slug>/ plus the nearby image src.
const cardRe = /<a[^>]+href="https:\/\/www\.annabelkarmel\.com\/advice\/([^"/]+)\/"[\s\S]{0,600}?<img[^>]+?(?:data-src|src)="([^"]+)"/g;
const seen = new Set();
let m;
while ((m = cardRe.exec(html))) {
  const slug = m[1];
  const img = m[2];
  if (seen.has(slug)) continue;
  seen.add(slug);
  console.log(slug, "=>", img);
}

console.log("\n--- all wp-content images ---");
const imgRe = /(https:\/\/www\.annabelkarmel\.com\/wp-content\/uploads\/[^"'\s]+\.(?:jpg|jpeg|png|webp))/gi;
const imgs = new Set();
while ((m = imgRe.exec(html))) imgs.add(m[1]);
for (const i of imgs) console.log(i);
