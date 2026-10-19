import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const base = process.env.LUME_BASE_URL || "http://127.0.0.1:3000";
const basePath = new URL(base).pathname.replace(/\/$/, "");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1050 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const checks = [];
const check = async (name, fn) => {
  await fn();
  checks.push(name);
  console.log("PASS " + name);
};
await mkdir("test-results", { recursive: true });
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await check("Home loads with original hero and card artwork", async () => {
    await expect(page.getByRole("heading", { name: /ALÉM DO/ })).toBeVisible();
    await expect(page.locator(".movie-card")).toHaveCount(19);
    for (const img of await page.locator(".card-image img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveJSProperty("complete", true);
      expect(await img.evaluate((e) => e.naturalWidth)).toBeGreaterThan(0);
    }
  });
  await page.evaluate(() => {
    document.querySelectorAll(".carousel").forEach((e) => (e.scrollLeft = 0));
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.screenshot({ path: "test-results/desktop-viewport.png" });
  await check("Carousel next arrow scrolls horizontally", async () => {
    const carousel = page.locator(".carousel").first();
    await page
      .getByRole("button", {
        name: "Próximo em Seu próximo grande play",
        exact: true,
      })
      .click();
    await expect
      .poll(() => carousel.evaluate((e) => e.scrollLeft))
      .toBeGreaterThan(100);
  });
  await check(
    "Featured title selector updates title and details link",
    async () => {
      await page.getByRole("button", { name: "Destacar Cidade Neon" }).click();
      await expect(
        page.getByRole("heading", {
          name: "Cidade Neon",
          exact: true,
          level: 1,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Mais informações" }),
      ).toHaveAttribute(
        "href",
        new RegExp("^" + basePath + "/titulo/cidade-neon/?$"),
      );
      await page
        .getByRole("button", { name: "Destacar Além do Horizonte" })
        .click();
    },
  );
  await check("Favorites persist across navigation and reload", async () => {
    await page.locator(".hero-save").click();
    await page.getByRole("link", { name: "Minha lista", exact: true }).click();
    await expect(page.locator(".card-grid .movie-card")).toHaveCount(1);
    await expect(page.locator(".card-grid h3")).toHaveText("Além do Horizonte");
    await page.reload();
    await expect(page.locator(".card-grid .movie-card")).toHaveCount(1);
  });
  await check("Favorites removal shows useful empty state", async () => {
    await page
      .getByRole("button", { name: "Remover Além do Horizonte da minha lista" })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Sua lista começa com uma boa história.",
      }),
    ).toBeVisible();
  });
  await check("Header search matches accent-insensitive titles", async () => {
    await page.getByRole("button", { name: "Abrir busca" }).click();
    await page
      .getByRole("textbox", { name: "Buscar títulos", exact: true })
      .fill("orbita");
    await page
      .getByRole("textbox", { name: "Buscar títulos", exact: true })
      .press("Enter");
    await expect(page.locator(".card-grid .movie-card")).toHaveCount(1);
    await expect(page.locator(".card-grid h3")).toHaveText("Órbita");
  });
  await check(
    "Search empty results and unknown title return proper UI",
    async () => {
      await page.goto(base + "/buscar?q=zzzinexistente");
      await expect(
        page.getByRole("heading", { name: "Nenhuma história por aqui." }),
      ).toBeVisible();
      const response = await page.goto(base + "/titulo/inexistente");
      expect(response.status()).toBe(404);
      await expect(
        page.getByRole("heading", { name: "Essa história ainda não existe." }),
      ).toBeVisible();
    },
  );
  await check("Genre filter and alphabetical sort narrow catalog", async () => {
    await page.goto(base);
    await page.getByRole("button", { name: "Aventura", exact: true }).click();
    await expect(page.locator(".card-grid .movie-card")).toHaveCount(3);
    await page
      .getByRole("combobox", { name: "Ordenar catálogo" })
      .selectOption("name");
    await expect(page.locator(".card-grid h3").first()).toHaveText(
      "Entre Montanhas",
    );
  });
  await check("Films and series navigation filters formats", async () => {
    await page.getByRole("link", { name: "Filmes", exact: true }).click();
    await expect(page.locator(".card-grid .movie-card")).toHaveCount(7);
    await page.getByRole("link", { name: "Séries", exact: true }).click();
    await expect(page.locator(".card-grid .movie-card")).toHaveCount(5);
  });
  await check("Title details and series episodes render", async () => {
    await page
      .getByRole("link", { name: "Ver detalhes de Mar Profundo", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Mar Profundo",
        exact: true,
        level: 1,
      }),
    ).toBeVisible();
    await expect(page.locator(".episode")).toHaveCount(3);
    await expect(
      page.getByRole("heading", { name: "Sobre Mar Profundo", exact: false }),
    ).toBeVisible();
  });
  await check(
    "Demo player decodes video, plays, pauses, seeks, closes with Escape",
    async () => {
      await page.getByRole("button", { name: "Assistir prévia" }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      const video = page.locator("video");
      await expect
        .poll(() => video.evaluate((v) => v.readyState))
        .toBeGreaterThanOrEqual(2);
      await video.evaluate((v) => v.play());
      await expect
        .poll(() => video.evaluate((v) => v.currentTime))
        .toBeGreaterThan(0.2);
      await video.evaluate((v) => {
        v.pause();
        v.currentTime = 10;
      });
      await expect
        .poll(() => video.evaluate((v) => v.currentTime))
        .toBeGreaterThanOrEqual(10);
      expect(await video.evaluate((v) => v.duration)).toBeCloseTo(20, 0);
      await page.screenshot({ path: "test-results/player.png" });
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "Assistir prévia" }),
      ).toBeFocused();
    },
  );
  await page.screenshot({ path: "test-results/details.png", fullPage: true });
  await check(
    "Mobile responsive layout has no horizontal page overflow",
    async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(base);
      await expect(
        page.getByRole("heading", { name: /ALÉM DO/ }),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: "test-results/mobile.png",
        fullPage: true,
      });
      await page.getByRole("button", { name: "Abrir busca" }).click();
      await page
        .getByRole("textbox", { name: "Buscar títulos", exact: true })
        .fill("mar");
      await page
        .getByRole("textbox", { name: "Buscar títulos", exact: true })
        .press("Enter");
      await expect(
        page.locator(".card-grid .movie-card").first(),
      ).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    },
  );
  await check("No browser runtime exceptions", async () =>
    expect(errors).toEqual([]),
  );
  await check(
    "Small phones, tablets and desktops avoid page overflow",
    async () => {
      for (const width of [320, 768, 1024]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(base);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await expect(
          page.getByRole("button", { name: "Assistir prévia" }),
        ).toBeVisible();
      }
    },
  );
  console.log(`\n${checks.length} checks passed.`);
} finally {
  await browser.close();
}
