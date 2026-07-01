import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const res = await fetch("https://www.annabelkarmel.com/apps-books/finger-foods/");
const html = await res.text();
writeFileSync(join(__dirname, "finger-foods-live.html"), html);
console.log("saved", html.length);
