import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

const capture = page =>
  page.evaluate(async () => {
    const { captureViewport, pixelAt } = window.harness
    const result = await captureViewport({ scale: 1 })
    return {
      type: result.blob.type,
      width: result.width,
      height: result.height,
      corner: await pixelAt(result.blob, 10, 10),
      middle: await pixelAt(result.blob, 400, 400),
    }
  })

test("captures the viewport, excluding harness chrome", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/capture.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    const result = await capture(page)
    assert.equal(result.type, "image/webp")
    assert.equal(result.width, 800)
    assert.equal(result.height, 600)
    assert.ok(
      result.corner.r > 200 && result.corner.b < 80,
      `expected red, got ${JSON.stringify(result.corner)}`,
    )
    assert.ok(
      result.middle.r > 240 && result.middle.g > 240 && result.middle.b > 240,
      `expected white, got ${JSON.stringify(result.middle)}`,
    )
  })
})

test("captures the scrolled viewport, not the top of the page", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/capture.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    await page.evaluate(() => window.scrollTo(0, 1000))
    const result = await capture(page)
    assert.ok(
      result.corner.g > 200 && result.corner.r < 80,
      `expected green, got ${JSON.stringify(result.corner)}`,
    )
  })
})
