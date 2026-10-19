import { chromium, expect } from "@playwright/test";
import { readdir } from "node:fs/promises";
const base = (
  process.env.LUME_BASE_URL || "http://127.0.0.1:4173/reverse-netflix"
).replace(/\/$/, "");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
  headless: true,
});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const slugs = await readdir("out/titulo");
  for (const slug of slugs) {
    const response = await page.goto(base + "/titulo/" + slug + "/");
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).not.toBeEmpty();
    await page.reload();
    await expect(page.locator(".detail-art")).toHaveJSProperty(
      "complete",
      true,
    );
    expect(
      await page.locator(".detail-art").evaluate((e) => e.naturalWidth),
    ).toBeGreaterThan(0);
  }
  console.log(
    `PASS ${slugs.length} direct title URLs, reloads and hero artwork`,
  );
  await page.goto(base + "/buscar/");
  await page
    .getByRole("textbox", { name: "Pesquisar no catálogo", exact: true })
    .fill("órbita");
  await page.locator(".large-search button[type=submit]").click();
  await expect(page.locator(".card-grid .movie-card")).toHaveCount(1);
  await expect(page.locator(".card-grid h3")).toHaveText("Órbita");
  expect(new URL(page.url()).pathname).toBe(
    new URL(base).pathname + "/buscar/",
  );
  await page.reload();
  await expect(page.locator(".card-grid h3")).toHaveText("Órbita");
  console.log(
    "PASS native search form preserves repository prefix and query after reload",
  );
  const r = await page.request.get(base + "/media/lume-demo.mp4", {
    headers: { Range: "bytes=100-199" },
  });
  expect(r.status()).toBe(206);
  expect((await r.body()).length).toBe(100);
  console.log("PASS media byte ranges for player seeking");
  expect(errors).toEqual([]);
  console.log("PASS no runtime exceptions across all exported title pages");
} finally {
  await browser.close();
}
