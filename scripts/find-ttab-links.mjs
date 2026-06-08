const res = await fetch("https://www.annabelkarmel.com/advice/toddler-top-tips-to-healthy-food-habits/");
const html = await res.text();
const idx = html.indexOf("ramekins");
console.log(html.slice(idx - 200, idx + 400));
