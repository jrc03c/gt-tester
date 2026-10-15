import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

async function open(page, baseUrl) {
  await page.goto(`${baseUrl}/test/fixtures/modal.html`)
  await page.waitForFunction(() => window.fixtureReady === true)
  await page.evaluate(() => window.openModal())
  await page.waitForSelector(".harness-modal")
}

test("opens with the pen tool selected and a hint", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await open(page, baseUrl)
    assert.equal(
      await page.locator(".harness-modal[data-harness-chrome]").count(),
      1,
    )
    assert.equal(await page.locator(".harness-toolbar [data-tool]").count(), 4)
    assert.equal(
      await page.locator('[data-tool="pen"][aria-pressed="true"]').count(),
      1,
    )
    assert.equal(
      await page.locator(".harness-hint").innerText(),
      "Draw on the screenshot.",
    )
    assert.equal(
      await page.evaluate(() => window.modal.editor.getTool()),
      "pen",
    )
  })
})

test("switching tools updates the editor, button state, and hint", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await open(page, baseUrl)
    await page.click('[data-tool="callout"]')
    assert.equal(
      await page.evaluate(() => window.modal.editor.getTool()),
      "callout",
    )
    assert.equal(
      await page.locator('[data-tool="callout"][aria-pressed="true"]').count(),
      1,
    )
    assert.equal(
      await page.locator('[data-tool="pen"][aria-pressed="true"]').count(),
      0,
    )
    assert.equal(
      await page.locator(".harness-hint").innerText(),
      "Click where the note should point.",
    )
  })
})

test("send passes annotations and text, then closes", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await open(page, baseUrl)
    await page.fill(".harness-text", "  Looks wrong  ")
    await page.click('[data-action="send"]')
    await page.waitForSelector(".harness-modal", { state: "detached" })
    const sent = await page.evaluate(() => window.sent)
    assert.deepEqual(sent, [{ annotations: [], text: "Looks wrong" }])
  })
})

test("a failed send shows the error and offers retry", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await open(page, baseUrl)
    await page.evaluate(() => (window.failNext = true))
    await page.click('[data-action="send"]')
    await page.waitForSelector(".harness-error:not([hidden])")
    assert.match(
      await page.locator(".harness-error").innerText(),
      /network down/,
    )
    assert.equal(
      await page.locator('[data-action="send"]').innerText(),
      "Retry",
    )
    assert.equal(await page.locator('[data-action="send"]:disabled').count(), 0)
    assert.equal(await page.locator(".harness-modal").count(), 1)

    await page.click('[data-action="send"]')
    await page.waitForSelector(".harness-modal", { state: "detached" })
    assert.equal(await page.evaluate(() => window.sent.length), 2)
  })
})

test("cancel closes without sending", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await open(page, baseUrl)
    await page.click('[data-action="cancel"]')
    await page.waitForSelector(".harness-modal", { state: "detached" })
    assert.equal(await page.evaluate(() => window.cancelled), 1)
    assert.equal(await page.evaluate(() => window.sent.length), 0)
  })
})

test("controls render the feedback button and the name field", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/modal.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    await page.evaluate(() => {
      window.controls = window.harness.createControls({
        root: document.getElementById("root"),
        onFeedback: () => window.clicks++,
        name: { value: "Bob", onChange: value => window.names.push(value) },
      })
    })
    assert.equal(
      await page.locator(".harness-controls[data-harness-chrome]").count(),
      1,
    )
    assert.match(
      await page.locator(".harness-feedback-button").innerText(),
      /Give feedback/,
    )
    await page.click(".harness-feedback-button")
    assert.equal(await page.evaluate(() => window.clicks), 1)

    assert.equal(await page.inputValue(".harness-name input"), "Bob")
    await page.fill(".harness-name input", "  Alice  ")
    await page.press(".harness-name input", "Tab")
    assert.deepEqual(await page.evaluate(() => window.names), ["Alice"])

    await page.evaluate(() => window.controls.setBusy(true))
    assert.equal(
      await page.locator(".harness-feedback-button:disabled").count(),
      1,
    )
  })
})
