import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage, drag } from "../helpers/browser.js"

async function openEditor(page, baseUrl) {
  await page.goto(`${baseUrl}/test/fixtures/editor.html`)
  await page.waitForFunction(() => window.editorReady === true)
}

const annotations = page => page.evaluate(() => window.editor.getAnnotations())
const setTool = (page, tool) =>
  page.evaluate(name => window.editor.setTool(name), tool)
const rounded = points => points.map(([x, y]) => [Math.round(x), Math.round(y)])

test("pen tool draws a thinned stroke", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openEditor(page, baseUrl)
    await setTool(page, "pen")
    await page.mouse.move(50, 50)
    await page.mouse.down()
    await page.mouse.move(150, 50, { steps: 5 })
    await page.mouse.move(150, 150, { steps: 5 })
    await page.mouse.up()

    const list = await annotations(page)
    assert.equal(list.length, 1)
    assert.equal(list[0].type, "pen")
    assert.deepEqual(rounded(list[0].points), [
      [50, 50],
      [150, 50],
      [150, 150],
    ])
    assert.equal(await page.locator("svg g[data-type=pen]").count(), 1)
  })
})

test("highlight tool draws a highlight", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openEditor(page, baseUrl)
    await setTool(page, "highlight")
    await drag(page, [20, 100], [200, 100])
    const list = await annotations(page)
    assert.equal(list.length, 1)
    assert.equal(list[0].type, "highlight")
    assert.deepEqual(rounded(list[0].points), [
      [20, 100],
      [200, 100],
    ])
  })
})

test("callout tool creates a note at the click, focused for typing", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openEditor(page, baseUrl)
    await setTool(page, "callout")
    await page.mouse.click(100, 200)

    let [callout] = await annotations(page)
    assert.equal(callout.type, "callout")
    assert.deepEqual(callout.anchor, [100, 200])
    assert.deepEqual(callout.box, { x: 140, y: 90, w: 180, h: 64 })

    const focused = await page.evaluate(() =>
      document.activeElement.getAttribute("data-role"),
    )
    assert.equal(focused, "text")

    await page.keyboard.type("Hello")
    ;[callout] = await annotations(page)
    assert.equal(callout.text, "Hello")

    await page.evaluate(() => document.activeElement.blur())
    ;[callout] = await annotations(page)
    assert.equal(callout.text, "Hello")
  })
})

test("select tool moves a stroke", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openEditor(page, baseUrl)
    await setTool(page, "pen")
    await drag(page, [50, 50], [150, 50])
    await setTool(page, "select")
    await drag(page, [100, 50], [100, 100])
    const [stroke] = await annotations(page)
    assert.deepEqual(rounded(stroke.points), [
      [50, 100],
      [150, 100],
    ])
    assert.equal(
      await page.evaluate(() => window.editor.getSelectedId()),
      stroke.id,
    )
  })
})

test("select tool moves a callout box, its anchor, and resizes it", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openEditor(page, baseUrl)
    await setTool(page, "callout")
    await page.mouse.click(100, 200)
    await page.evaluate(() => document.activeElement.blur())
    await setTool(page, "select")

    await drag(page, [142, 92], [162, 112])
    let [callout] = await annotations(page)
    assert.deepEqual(callout.box, { x: 160, y: 110, w: 180, h: 64 })
    assert.deepEqual(callout.anchor, [100, 200])

    await drag(page, [100, 200], [120, 220])
    ;[callout] = await annotations(page)
    assert.deepEqual(callout.anchor, [120, 220])

    await drag(page, [334, 168], [364, 178])
    ;[callout] = await annotations(page)
    assert.deepEqual(callout.box, { x: 160, y: 110, w: 210, h: 74 })
  })
})

test("delete key removes the selected shape and undo restores it", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openEditor(page, baseUrl)
    await setTool(page, "pen")
    await drag(page, [50, 50], [150, 50])
    await setTool(page, "select")
    await page.mouse.click(100, 50)
    await page.keyboard.press("Delete")
    assert.equal((await annotations(page)).length, 0)

    await page.evaluate(() => window.editor.undo())
    assert.equal((await annotations(page)).length, 1)

    await page.evaluate(() => window.editor.undo())
    assert.equal((await annotations(page)).length, 0)

    await page.evaluate(() => window.editor.undo())
    assert.equal((await annotations(page)).length, 0)
  })
})

test("clicking empty space deselects and onChange fires on commits", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openEditor(page, baseUrl)
    await setTool(page, "pen")
    await drag(page, [50, 50], [150, 50])
    await setTool(page, "select")
    await page.mouse.click(100, 50)
    assert.notEqual(
      await page.evaluate(() => window.editor.getSelectedId()),
      null,
    )
    await page.mouse.click(300, 250)
    assert.equal(await page.evaluate(() => window.editor.getSelectedId()), null)
    const changes = await page.evaluate(() => window.changes.length)
    assert.equal(changes, 1)
  })
})
