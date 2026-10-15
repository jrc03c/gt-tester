import { test } from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { withPage } from "../helpers/browser.js"

test("downloadFeedback saves one self-contained HTML report", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/flatten.html`)
    await page.waitForFunction(() => window.fixtureReady === true)

    const downloads = []
    page.on("download", download => downloads.push(download))

    await page.evaluate(async () => {
      const canvas = document.createElement("canvas")
      canvas.width = 40
      canvas.height = 30
      canvas.getContext("2d").fillRect(0, 0, 40, 30)
      const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, "image/png"),
      )
      await window.harness.downloadFeedback({
        key: "abc1234",
        mode: "test",
        reviewerName: "Alice",
        text: "Looks <off>",
        annotations: [],
        context: { lines: [{ from: 1, to: 3, program: "main" }] },
        image: { blob, url: URL.createObjectURL(blob), width: 40, height: 30 },
      })
    })
    await page.waitForTimeout(500)

    assert.equal(downloads.length, 1)
    const [download] = downloads
    assert.match(
      download.suggestedFilename(),
      /^feedback-abc1234-[0-9T-]+Z\.html$/,
    )
    const html = await readFile(await download.path(), "utf8")
    assert.ok(html.includes('<img src="data:image/png;base64,'))
    assert.ok(html.includes("Looks &lt;off&gt;"))
    assert.ok(html.includes("main: lines 1-3"))
  })
})
