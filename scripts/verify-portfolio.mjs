import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
async function loadImages(page) {
  await page.evaluate(async () => {
    // Offscreen lazy images can otherwise keep decode() pending during full-page QA.
    for (const image of document.images) image.loading = "eager";
    for (let y = 0; y < document.body.scrollHeight; y += 650) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.decode().catch(() => {}),
      ),
    );
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  await page.waitForTimeout(600);
}
async function verifyCatalog(page, width) {
  await page.locator(".collection-link").click();
  await expect(page).toHaveURL("http://127.0.0.1:4173/projects/");
  await expect(page.locator("h1")).toContainText("113+");
  await expect(page.locator(".work-card")).toHaveCount(20);
  await page.getByRole("button", { name: "Games", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Hardware", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(11);
  await page.getByRole("button", { name: "Software", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(6);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await page.getByRole("textbox", { name: "Search projects" }).fill("texlab");
  await expect(page.locator(".work-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear search", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(20);
  await page
    .getByRole("textbox", { name: "Search projects" })
    .fill("nothing-matches-this");
  await expect(page.locator(".empty-search")).toBeVisible();
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .click();
  await expect(page.locator(".work-card")).toHaveCount(20);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    `Project collection overflow at ${width}px`,
  );
  if ([1440, 390].includes(width)) {
    await loadImages(page);
    await page.screenshot({
      path: `artifacts/projects-${width}.png`,
      fullPage: true,
    });
  }
  if (width === 1440) {
    for (const href of await page
      .locator(".work-card")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")))) {
      assert.equal(
        (await page.request.get(`http://127.0.0.1:4173${href}`)).status(),
        200,
        href,
      );
    }
  }
}
try {
  const loaderPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  loaderPage.on("pageerror", (error) => errors.push(error.message));
  await loaderPage.route("**/design/workshop.webp", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2300));
    await route.continue();
  });
  await loaderPage.goto("http://127.0.0.1:4173/", {
    waitUntil: "domcontentloaded",
  });
  await expect(loaderPage.locator(".site-loader")).toBeVisible();
  await loaderPage.screenshot({ path: "artifacts/loading-desktop.png" });
  await expect
    .poll(() =>
      loaderPage.evaluate(
        () => document.documentElement.dataset.portfolioReady,
      ),
    )
    .toBe("true");
  await expect
    .poll(() =>
      loaderPage
        .locator("#hero-title .title-word-text")
        .first()
        .evaluate((word) => word.getAnimations().length),
    )
    .toBeGreaterThan(0);
  await expect(loaderPage.locator(".site-loader")).toHaveCount(0, {
    timeout: 3000,
  });
  await loaderPage.waitForLoadState("networkidle");
  await expect(loaderPage.locator("#hero-title")).toHaveText("RATUL HASAN");
  await loaderPage.close();
  console.log(
    "Loading indicator, bounded loading time, and title entrance after loading passed.",
  );
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 360, height: 800 },
    { width: 320, height: 740 },
  ]) {
    const page = await browser.newPage({ viewport });
    page.on("pageerror", (error) => errors.push(error.message));
    const failures = [];
    page.on("response", (response) => {
      if (
        response.status() >= 400 &&
        response.url().startsWith("http://127.0.0.1:4173")
      )
        failures.push(`${response.status()} ${response.url()}`);
    });
    await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await loadImages(page);
    await expect(page.locator(".site-loader")).toHaveCount(0);
    await expect(page.locator("#hero-title .title-word-text")).toHaveCount(2);
    await expect(page.locator(".skill-badge img")).toHaveCount(48);
    assert.equal(
      await page
        .locator(".skill-badge img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image.complete &&
              image.naturalWidth > 0 &&
              image.getAttribute("src").startsWith("/icons/skills/"),
          ),
        ),
      true,
      "Every skill logo should load from the local project",
    );
    await expect(page.locator(".paper-entry")).toHaveCount(3);
    await expect(
      page.locator("#paper-stochastic-llm-rankings .paper-conference"),
    ).toHaveText("Target conference: AISTATS 2027");
    await expect(page.locator(".paper-status")).toHaveCount(0);
    await expect(page.locator("#research")).not.toContainText(
      /under review|in preparation/i,
    );
    await expect(page.locator(".section-rail")).toHaveCount(0);
    await expect(page.locator(".research-presentation")).toHaveCount(1);
    await expect(page.locator(".research-highlight-card")).toHaveCount(2);
    await expect(page.locator(".research-award h3")).toHaveText(
      "IEEE Gold Award",
    );
    assert.equal(
      await page
        .locator(".research-presentation")
        .evaluate((card) => card.getBoundingClientRect().height < 200),
      true,
      "Research highlights should remain compact",
    );
    await expect(page.locator(".paper-author-self")).toHaveCount(3);
    await expect(page.locator(".supervisor-link")).toHaveAttribute(
      "href",
      "https://www.bracu.ac.bd/about/people/md-golam-rabiul-alam-phd",
    );
    await expect(
      page
        .locator(".experience-role-list > li")
        .filter({
          has: page.getByRole("heading", { name: "Lecturer", exact: true }),
        })
        .locator(".experience-date"),
    ).toHaveText("2025 — 2026");
    await expect(
      page.locator("#achievements .scene-section-label"),
    ).toContainText("SELECTED AWARDS");
    await expect(
      page.locator("#achievements .portfolio-heading-row p"),
    ).toContainText("Highlights from many");
    await expect(
      page.locator('.skills-group:not([aria-hidden="true"]) .skill-badge'),
    ).toHaveCount(24);
    await page
      .getByRole("button", { name: "Pause skills animation", exact: true })
      .click();
    await expect(page.locator(".skills-scroller-section")).toHaveAttribute(
      "data-paused",
      "true",
    );
    await expect(page.locator(".skills-track").first()).toHaveCSS(
      "animation-play-state",
      "paused",
    );
    await page
      .getByRole("button", { name: "Play skills animation", exact: true })
      .click();
    await page.mouse.move(0, 0);
    await expect(page.locator(".skills-track").first()).toHaveCSS(
      "animation-play-state",
      "running",
    );
    await expect(
      page.getByRole("button", { name: "Search site", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Search site", exact: true })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Search", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".site-search-quick strong")).toHaveText([
      "Projects",
      "Research",
      "Contact",
    ]);
    await expect(page.locator(".site-search-results")).toHaveCount(0);
    if ([1440, 390].includes(viewport.width)) {
      await page.screenshot({ path: `artifacts/search-${viewport.width}.png` });
    }
    await page
      .getByRole("searchbox", { name: "Search portfolio" })
      .fill("texlab");
    await expect(page.locator(".site-search-result")).toHaveCount(1);
    await expect(page.locator(".site-search-result strong")).toHaveText(
      "TexLab Online",
    );
    await page
      .getByRole("searchbox", { name: "Search portfolio" })
      .fill("AISTATS");
    await expect(page.locator(".site-search-result")).toHaveCount(1);
    await expect(page.locator(".site-search-result")).toHaveAttribute(
      "href",
      "/#paper-stochastic-llm-rankings",
    );
    await page
      .getByRole("searchbox", { name: "Search portfolio" })
      .fill("KAGE");
    await expect(page.locator(".site-search-result")).toHaveCount(1);
    await expect(page.locator(".site-search-result")).toHaveAttribute(
      "href",
      "/#paper-kage-agentic-assistance",
    );
    await expect(page.locator(".site-search-result-copy small")).toHaveText(
      "Research paper",
    );
    await page
      .getByRole("searchbox", { name: "Search portfolio" })
      .fill("nothing-matches-this");
    await expect(page.locator(".site-search-empty")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: "Search", exact: true }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Search site", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Control+k");
    await expect(
      page.getByRole("searchbox", { name: "Search portfolio" }),
    ).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.locator(".site-search-result").first()).toBeFocused();
    await page.keyboard.press("Escape");
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    await page
      .getByRole("button", { name: "Search site", exact: true })
      .click();
    await page
      .getByRole("searchbox", { name: "Search portfolio" })
      .fill("KAGE");
    await page.locator(".site-search-result").click();
    await expect(
      page.getByRole("dialog", { name: "Search", exact: true }),
    ).not.toBeVisible();
    await expect(
      page.locator("#paper-kage-agentic-assistance h4"),
    ).toBeInViewport();
    if (viewport.width <= 768) {
      await page
        .getByRole("button", { name: "Open navigation", exact: true })
        .click();
      await expect(page.locator(".mobile-nav-dialog")).toBeVisible();
      assert.equal(
        await page.locator(".mobile-nav-dialog").evaluate((dialog) => {
          const bounds = dialog.getBoundingClientRect();
          return (
            bounds.x === 0 &&
            bounds.y === 0 &&
            Math.abs(bounds.width - innerWidth) < 1 &&
            Math.abs(bounds.height - innerHeight) < 1
          );
        }),
        true,
        `Mobile navigation must fill the screen at ${viewport.width}px`,
      );
      assert.equal(
        await page.evaluate(() => document.body.style.overflow),
        "hidden",
      );
      for (let index = 0; index < 8; index++) await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(
          () => !!document.activeElement?.closest(".mobile-nav-dialog"),
        ),
        true,
        "Keyboard focus must remain inside the mobile menu",
      );
      await page
        .locator(".mobile-nav-dialog")
        .getByRole("button", { name: "Search site", exact: true })
        .click();
      await expect(page.locator(".mobile-nav-dialog")).toBeHidden();
      await page.waitForTimeout(100);
      assert.equal(
        await page.evaluate(() => document.body.style.overflow),
        "hidden",
        "Opening search from navigation must keep the page locked",
      );
      await page
        .getByRole("button", { name: "Close search", exact: true })
        .click();
      assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const projectFrames = await page
      .locator(".sculpted-project-grid .sculpted-main")
      .evaluateAll((nodes) =>
        nodes.map((node) => ({
          width: Math.round(node.getBoundingClientRect().width),
          height: Math.round(node.getBoundingClientRect().height),
        })),
      );
    assert(
      projectFrames.every(
        (frame) =>
          frame.width === projectFrames[0].width &&
          frame.height === projectFrames[0].height,
      ),
      `Unequal project frames at ${viewport.width}px`,
    );
    if (viewport.width === 1440) {
      await page.locator("#research").scrollIntoViewIfNeeded();
      await expect(
        page.locator('.main-nav a[aria-current="location"]'),
      ).toHaveAttribute("href", "#research");
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    await expect(page.locator(".hero-role")).toHaveText(
      "Researcher. Engineer. Inventor.",
    );
    await expect(
      page.getByRole("link", { name: "Explore work", exact: true }),
    ).toHaveAttribute("href", "#projects");
    await expect(
      page.getByRole("link", { name: "View CV", exact: true }),
    ).toHaveAttribute("href", "/cv.pdf");
    assert.equal(
      await page
        .locator(".hero-button-ghost")
        .first()
        .evaluate(
          (element) => getComputedStyle(element, "::before").animationName,
        ),
      "hero-glitch-loop",
    );
    assert.equal(
      await page
        .locator(".hero-button-ghost")
        .first()
        .evaluate(
          (element) =>
            getComputedStyle(element, "::before").animationIterationCount,
        ),
      "infinite",
    );
    assert.equal(
      await page
        .locator(".hero-button-ghost")
        .first()
        .evaluate(
          (element) => getComputedStyle(element, "::before").animationDuration,
        ),
      "1.8s",
    );
    assert.equal(
      await page
        .locator(".sculpted-pixi img")
        .evaluate((img) => decodeURIComponent(new URL(img.src).pathname)),
      "/projects/hardware/pixi v2_humanoid robot.webp",
    );
    await expect(page.locator(".footer-workshop-image img")).toHaveCount(1);
    const greenSurfaces = await page
      .locator(".sculpted-main, .sculpted-corner")
      .evaluateAll(
        (nodes) =>
          nodes.filter((node) => {
            const channels = getComputedStyle(node)
              .backgroundColor.match(/\d+/g)
              .map(Number);
            return channels[1] > channels[0] + 2;
          }).length,
      );
    assert.equal(greenSurfaces, 0, "Green surface tint should be removed");
    await expect(page.locator("main .portfolio-heading-row h2")).toHaveText([
      "RESEARCH",
      "PROJECTS",
      "ABOUT ME",
      "EXPERIENCE",
      "SELECTED ACHIEVEMENTS",
    ]);
    await expect(page.locator(".feature-exhibit")).toHaveCount(4);
    const clippedActions = await page
      .locator(".feature-exhibit")
      .evaluateAll((cards) =>
        cards
          .filter((card) => {
            const action = card
              .querySelector(".project-view-link")
              .getBoundingClientRect();
            const bounds = card.getBoundingClientRect();
            return (
              action.bottom > bounds.bottom + 1 ||
              action.right > bounds.right + 1
            );
          })
          .map((card) => card.getAttribute("href")),
      );
    assert.deepEqual(
      clippedActions,
      [],
      `Clipped project actions at ${viewport.width}px`,
    );
    await expect(page.locator(".sculpted-frame")).toHaveCount(4);
    await expect(page.locator(".recognition-card")).toHaveCount(6);
    await expect(
      page.locator(
        '.recognition-group:not([aria-hidden="true"]) .recognition-card',
      ),
    ).toHaveCount(3);
    if ([1440, 390].includes(viewport.width)) {
      const gallery = page.locator(".recognition-gallery");
      await gallery.scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      const initialPosition = await gallery.evaluate(
        (element) => element.scrollLeft,
      );
      await expect
        .poll(() => gallery.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(initialPosition + 4);
      await page
        .getByRole("button", {
          name: "Pause achievement scrolling",
          exact: true,
        })
        .click();
      const stoppedPosition = await gallery.evaluate(
        (element) => element.scrollLeft,
      );
      await page.waitForTimeout(300);
      assert.equal(
        await gallery.evaluate((element) => element.scrollLeft),
        stoppedPosition,
        "Achievement pause must stop scrolling",
      );
      await page
        .getByRole("button", {
          name: "Play achievement scrolling",
          exact: true,
        })
        .click();
      await page.mouse.move(0, 0);
      await expect
        .poll(() => gallery.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(stoppedPosition + 4);
      if (viewport.width === 1440) {
        await gallery.hover();
        await page.waitForTimeout(100);
        const hoveredPosition = await gallery.evaluate(
          (element) => element.scrollLeft,
        );
        await page.waitForTimeout(300);
        assert.equal(
          await gallery.evaluate((element) => element.scrollLeft),
          hoveredPosition,
          "Hover must pause achievement scrolling",
        );
        await page.mouse.move(0, 0);
      }
      await page
        .locator(
          '.recognition-group:not([aria-hidden="true"]) .recognition-card',
        )
        .first()
        .focus();
      await page.waitForTimeout(100);
      const focusedPosition = await gallery.evaluate(
        (element) => element.scrollLeft,
      );
      await page.waitForTimeout(300);
      assert.equal(
        await gallery.evaluate((element) => element.scrollLeft),
        focusedPosition,
        "Keyboard focus must pause achievement scrolling",
      );
      await page
        .getByRole("button", {
          name: "Pause achievement scrolling",
          exact: true,
        })
        .focus();
      await page.locator("#achievements").screenshot({
        path: `artifacts/achievements-${viewport.width}.png`,
        style: ".site-header, .skip-link {visibility:hidden!important}",
      });
    }
    await expect(page.locator(".skill-list > div")).toHaveCount(4);
    await expect(page.locator(".skill-list")).toBeVisible();
    await expect(page.locator(".experience-role-list > li")).toHaveCount(10);
    await expect(page.locator(".experience-role-list h3").first()).toHaveText(
      "Research Assistant",
    );
    assert.equal(
      await page
        .locator(".journey-index, .skill-details, .shelf-controls")
        .count(),
      0,
      "Removed confusing hidden panels and carousel controls",
    );
    assert.equal(
      await page
        .locator(
          ".research-scene-art, .work-backdrop, .about-scene-art, .honors-scene-art, .contact-scene-art",
        )
        .count(),
      0,
      "Scenic backgrounds should be confined to the hero",
    );
    const shapeCopies = await page
      .locator(".sculpted-frame")
      .evaluateAll((frames) =>
        frames
          .map((frame) => {
            const bounds = frame.getBoundingClientRect();
            const copy = frame
              .querySelector(".sculpted-copy")
              .getBoundingClientRect();
            return {
              title: frame.querySelector("h3").textContent,
              bottom: copy.bottom - bounds.top,
              available: bounds.height * 0.423,
            };
          })
          .filter((copy) => copy.bottom > copy.available + 2),
      );
    assert.deepEqual(
      shapeCopies,
      [],
      `Text extends beyond its sculpted recess at ${viewport.width}px`,
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      await page.locator("h1").evaluate((heading) => {
        const range = document.createRange();
        range.selectNodeContents(heading);
        const text = range.getBoundingClientRect();
        return text.left >= 0 && text.right <= innerWidth;
      }),
      true,
      `Name is cropped at ${viewport.width}px`,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      `Horizontal overflow at ${viewport.width}px`,
    );
    await page.screenshot({
      path: `artifacts/home-${viewport.width}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `artifacts/hero-${viewport.width}.png` });
    await expect(page.locator(".directory-toggle")).toHaveCount(0);
    await expect(page.locator(".project-heading-count")).toContainText("113+");
    if (viewport.width === 1440) {
      await page.locator("#research").screenshot({
        path: "artifacts/research-desktop.png",
        style: ".site-header, .skip-link { visibility: hidden !important; }",
      });
      await page.locator(".selected-exhibits").screenshot({
        path: "artifacts/exhibits-desktop.png",
        style: ".site-header, .skip-link { visibility: hidden !important; }",
      });
    }
    if (viewport.width === 390) {
      await page.locator(".research-highlights").screenshot({
        path: "artifacts/research-highlights-mobile.png",
        style: ".site-header, .skip-link { visibility: hidden !important; }",
      });
    }
    await verifyCatalog(page, viewport.width);
    if (viewport.width === 1440) {
      await page.goto(
        "http://127.0.0.1:4173/projects/hardware/pixi-v2-humanoid/",
        { waitUntil: "networkidle" },
      );
      await loadImages(page);
      await page.screenshot({
        path: "artifacts/project-desktop.png",
        fullPage: true,
      });
      assert.match(await page.title(), /Pixi/);
      assert.equal(
        await page.locator("nav a").first().getAttribute("href"),
        "/#research",
      );
      await page.goto("http://127.0.0.1:4173/awards/", {
        waitUntil: "networkidle",
      });
      await expect(page.locator(".archive-card")).toHaveCount(19);
      await page
        .getByRole("button", { name: "Certifications", exact: true })
        .click();
      await expect(page.locator(".archive-card")).toHaveCount(3);
      await page.getByRole("button", { name: "Research", exact: true }).click();
      await expect(page.locator(".archive-card")).toHaveCount(1);
    }
    if (viewport.width === 390) {
      await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(page.locator(".mobile-nav-dialog")).toBeVisible();
      await page
        .locator(".mobile-nav-dialog")
        .getByRole("link", { name: "Research", exact: true })
        .click();
      await expect(page.locator(".mobile-nav-dialog")).toBeHidden();
      await page.goto(
        "http://127.0.0.1:4173/projects/software/texlab-online/",
        { waitUntil: "networkidle" },
      );
      await loadImages(page);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      await page.screenshot({
        path: "artifacts/project-mobile.png",
        fullPage: true,
      });
      await page.goto("http://127.0.0.1:4173/awards/", {
        waitUntil: "networkidle",
      });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        "Awards mobile overflow",
      );
    }
    assert.deepEqual(failures, [], `Failed requests at ${viewport.width}px`);
    console.log(
      `${viewport.width}px: layout, assets, and applicable interactions passed.`,
    );
    await page.close();
  }
  const touchPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  touchPage.on("pageerror", (error) => errors.push(error.message));
  await touchPage.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await touchPage
    .getByRole("button", { name: "Open navigation", exact: true })
    .tap();
  await expect(touchPage.locator(".mobile-nav-dialog")).toBeVisible();
  await touchPage
    .locator(".mobile-nav-dialog")
    .getByRole("button", { name: "Search site", exact: true })
    .tap();
  await expect(touchPage.locator(".mobile-nav-dialog")).toBeHidden();
  await touchPage
    .getByRole("searchbox", { name: "Search portfolio" })
    .fill("KAGE");
  await touchPage.locator(".site-search-result").tap();
  await expect(
    touchPage.locator("#paper-kage-agentic-assistance h4"),
  ).toBeInViewport();
  await touchPage
    .getByRole("button", { name: "Pause skills animation", exact: true })
    .tap();
  await expect(touchPage.locator(".skills-track").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await touchPage
    .getByRole("button", { name: "Play skills animation", exact: true })
    .tap();
  await expect(touchPage.locator(".skills-track").first()).toHaveCSS(
    "animation-play-state",
    "running",
  );
  await touchPage
    .locator('.feature-exhibit[href="/projects/hardware/pixi-v2-humanoid/"]')
    .tap();
  await expect(touchPage.locator("h1")).toContainText("Pixi");
  await touchPage
    .getByRole("button", { name: "Search site", exact: true })
    .tap();
  await touchPage
    .getByRole("searchbox", { name: "Search portfolio" })
    .fill("Research");
  await touchPage.locator('.site-search-result[href="/#research"]').tap();
  await expect(
    touchPage.locator("#research .portfolio-heading-row h2"),
  ).toBeInViewport();
  assert.equal(
    await touchPage.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
    "Touch device horizontal overflow",
  );
  await touchPage.close();
  console.log(
    "Touch navigation, search, skills pause/play, project routing, and research links passed.",
  );
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator(".site-loader")).not.toBeVisible();
  assert.equal(
    await page
      .locator("#hero-title .title-word-text")
      .evaluateAll((words) =>
        words.every((word) => word.getAnimations().length === 0),
      ),
    true,
    "Reduced motion must disable title movement",
  );
  await expect(page.locator(".skills-track").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".skills-group-repeat").first()).toBeHidden();
  await expect(page.locator(".hero h1")).toHaveCSS("animation-name", "none");
  await expect(
    page.locator('.recognition-group[aria-hidden="true"]'),
  ).toBeHidden();
  await expect(page.locator(".honors-motion-tools")).toBeHidden();
  assert.equal(
    await page
      .locator(".hero-button-ghost")
      .first()
      .evaluate(
        (element) => getComputedStyle(element, "::before").animationName,
      ),
    "none",
  );
  await page.locator(".recognition-gallery").scrollIntoViewIfNeeded();
  const reducedPosition = await page
    .locator(".recognition-gallery")
    .evaluate((element) => element.scrollLeft);
  await page.waitForTimeout(300);
  assert.equal(
    await page
      .locator(".recognition-gallery")
      .evaluate((element) => element.scrollLeft),
    reducedPosition,
    "Reduced motion must disable achievement auto scrolling",
  );
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  for (const pathname of ["cv.pdf", "sitemap.xml", "robots.txt"])
    assert.equal(
      (await page.request.get(`http://127.0.0.1:4173/${pathname}`)).status(),
      200,
    );
  const staticPage = await browser.newPage({ javaScriptEnabled: false });
  await staticPage.goto("http://127.0.0.1:4173/");
  await expect(staticPage.locator(".site-loader")).not.toBeVisible({
    timeout: 3000,
  });
  await expect(staticPage.locator("#hero-title")).toBeVisible();
  await expect(staticPage.locator("#research-heading")).toBeVisible();
  await expect(
    staticPage.locator(".experience-role-list h3").first(),
  ).toBeVisible();
  await expect(
    staticPage.locator(".experience-role-list h3").first(),
  ).toHaveText("Research Assistant");
  await staticPage.close();
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(
    "All project routes, CV, metadata routes, and reduced motion passed.",
  );
} finally {
  await browser.close();
}
