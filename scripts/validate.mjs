import { access, readFile } from "node:fs/promises";

for (const file of ["public/index.html", "public/styles.css", "public/app.js", "wrangler.jsonc"]) {
  await access(file);
}

const config = JSON.parse(await readFile("wrangler.jsonc", "utf8"));
if (config.assets?.directory !== "./public") {
  throw new Error("Cloudflare static asset directory must be ./public");
}

console.log("Project structure is valid");
