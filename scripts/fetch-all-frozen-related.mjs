const slugs = [
  "chicken-tikka-masala",
  "tasty-spaghetti-bolognese",
  "mighty-bolognese-mac-and-cheese",
  "chicken-tomato-mascarpone-pasta",
];

for (const slug of slugs) {
  const html = await (await fetch(`https://www.annabelkarmel.com/products/${slug}/`)).text();
  const block = html.match(/Why not try[\s\S]{0,8000}?Share the love/)?.[0] ?? "";
  const imgs = [...block.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
  console.log(slug, imgs);
}
