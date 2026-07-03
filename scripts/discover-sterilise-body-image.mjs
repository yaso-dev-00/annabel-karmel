const res = await fetch("https://www.annabelkarmel.com/advice/how-to-sterilise-bottles/", {
  headers: { "user-agent": "Mozilla/5.0" },
});
const html = await res.text();

// Isolate the main article body region.
const start = html.indexOf("thoroughly washed and rinsed");
const region = html.slice(start, start + 4000);
console.log("--- region after remember paragraph ---");
const imgRe = /<img[^>]*>/gi;
let m;
while ((m = imgRe.exec(region))) console.log(m[0], "\n");
