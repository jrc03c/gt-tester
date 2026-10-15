import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

test("fixture bundle loads and styles apply", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/smoke.html`)
    await page.waitForFunction(() => window.harness !== undefined)
    const margin = await page.evaluate(
      () => getComputedStyle(document.body).margin,
    )
    assert.equal(margin, "0px")
    const hasVersion = await page.evaluate(
      () => typeof window.harness.version === "string",
    )
    assert.ok(hasVersion, "entry should expose harness.version")
  })
})
