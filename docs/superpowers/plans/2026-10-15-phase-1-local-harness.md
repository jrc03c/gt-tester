# Phase 1: Local Feedback Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A static page on GitHub Pages that embeds a GuidedTrack program by key, lets the reviewer screenshot the viewport, annotate it with pen, highlighter, and pointing notes, type feedback, and download the result as a flattened PNG plus a JSON sidecar with the captured context.

**Architecture:** Vanilla ES modules bundled by esbuild into a single-page app. Pure modules (router, annotation model, SVG renderer, context tracker) are unit-tested in Node. Browser modules (editor, capture, flatten, GT embed, modal) are tested with Playwright against fixture pages served by a tiny local HTTP server. The "send" action is injected into the reviewer screen so Phase 2 can swap the local download for Supabase without touching the screen.

**Tech Stack:** Node 24, esbuild, Prettier, `node --test`, Playwright 1.49.0 (already installed in the dev container; not an npm dependency), modern-screenshot 4.x.

**Spec:** `docs/superpowers/specs/2026-10-14-gt-feedback-harness-design.md`

## Global Constraints

- Code style: ES modules, no semicolons, double quotes, two-space indent, `arrowParens: "avoid"` (enforced by Prettier; run `npm run format` before each commit).
- No framework. Dependencies limited to `modern-screenshot` (runtime) and `esbuild`, `prettier` (dev). Playwright is imported from the environment, never added to `package.json` (the dev container forbids `npm install playwright`).
- All harness DOM that must be excluded from screenshots carries the attribute `data-harness-chrome`.
- Harness CSS classes are prefixed `harness-` so GT's Bootstrap stylesheet cannot collide with them.
- Routing is by query string only. Phase 1 uses `?key=<gt key>&mode=run|test`; Phase 2 replaces `key` with the share id `r`.
- `index.html` sets `<meta name="referrer" content="strict-origin-when-cross-origin">` and nothing in the harness may loosen it (the spec depends on origin-only referrers).
- Annotation coordinates are stored in image pixels; the SVG `viewBox` always equals the image's pixel size.
- GT container markup is copied verbatim from `temp/guidedtrack-web/app/views/programs/_program_container.html.erb` (see Task 11).
- Every commit message ends with the trailer line `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Markdown written in this repo: exactly one blank line after every heading, no manual line wrapping inside paragraphs.

## File structure

```
package.json                 scripts, deps
package-lock.json
build.mjs                    esbuild: src/main.js -> dist/, test/fixtures/entry.js -> test/fixtures/build/
.prettierrc
.gitignore                   adds dist, test/fixtures/build, spikes/out
index.html                   the single page
README.md
src/main.js                  entry: parse route, mount screen
src/styles.css               all harness styles
src/router.js                parseRoute(search)
src/annotations/model.js     pure shape model, geometry, history
src/annotations/render.js    pure JSON -> SVG tree, toSvgString, toDom
src/annotations/editor.js    pointer tools on top of the renderer
src/annotations/flatten.js   static SVG + image -> PNG blob
src/capture.js               viewport screenshot via modern-screenshot
src/gt-embed.js              GT container markup, script loading, event relay, refusal detection
src/context.js               per-page line tracking + snapshot
src/controls.js              floating button cluster
src/feedback-modal.js        modal composing editor + textarea + send
src/send-local.js            Phase 1 send action: download PNG + JSON
src/screens/reviewer.js      reviewer screen wiring
src/screens/home.js          key + mode form
spikes/trace-lines.mjs       throwaway spike A
spikes/screenshot-fidelity.mjs  throwaway spike B
docs/superpowers/spikes/2026-10-15-phase-1-spikes.md  spike findings
test/helpers/server.js       static file server for browser tests
test/helpers/browser.js      withPage() helper around Playwright
test/fixtures/entry.js       exposes modules on window.harness for fixtures
test/fixtures/*.html         one fixture page per browser module
test/fixtures/gt-stub/*.js   fake jquery_gt.js, bootstrap.min.js, gt_interpreter.js
test/unit/*.test.js          node --test
test/browser/*.test.js       node --test + Playwright
.github/workflows/deploy.yml test + build + publish to Pages
```

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `build.mjs`, `.prettierrc`, `index.html`, `src/main.js`, `src/styles.css`, `test/fixtures/entry.js`, `test/unit/scaffold.test.js`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `npm run build` writes `dist/main.js`, `dist/main.css`, `test/fixtures/build/entry.js`, `test/fixtures/build/entry.css`. `npm run test:unit` runs `test/unit/**/*.test.js`. `npm run test:browser` builds then runs `test/browser/**/*.test.js`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "gt-feedback-harness",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "description": "Embed a GuidedTrack program, annotate screenshots, and send feedback to the developer.",
  "scripts": {
    "build": "node build.mjs",
    "watch": "node build.mjs --watch",
    "test": "npm run test:unit && npm run test:browser",
    "test:unit": "node --test \"test/unit/**/*.test.js\"",
    "test:browser": "npm run build && node --test --test-concurrency=1 \"test/browser/**/*.test.js\"",
    "format": "prettier --write ."
  },
  "dependencies": {
    "modern-screenshot": "^4.7.0"
  },
  "devDependencies": {
    "esbuild": "^0.28.0",
    "prettier": "^3.3.3"
  }
}
```

- [ ] **Step 2: Write `.prettierrc` and update `.gitignore`**

`.prettierrc`:

```json
{
  "semi": false,
  "arrowParens": "avoid"
}
```

Append to `.gitignore` so it reads:

```
.env
node_modules
temp
dist
test/fixtures/build
spikes/out
```

- [ ] **Step 3: Write `build.mjs`**

```js
import * as esbuild from "esbuild"

const watch = process.argv.includes("--watch")

const builds = [
  { entryPoints: ["src/main.js"], outdir: "dist" },
  { entryPoints: ["test/fixtures/entry.js"], outdir: "test/fixtures/build" },
]

for (const build of builds) {
  const options = {
    ...build,
    bundle: true,
    format: "esm",
    sourcemap: true,
    target: ["es2020"],
    logLevel: "info",
  }

  if (watch) {
    const context = await esbuild.context(options)
    await context.watch()
  } else {
    await esbuild.build(options)
  }
}
```

- [ ] **Step 4: Write `index.html`, `src/main.js`, `src/styles.css`, `test/fixtures/entry.js`**

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <title>GuidedTrack Feedback Harness</title>
    <link rel="stylesheet" href="dist/main.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="dist/main.js"></script>
  </body>
</html>
```

`src/main.js` (placeholder until Task 15 wires the screens):

```js
import "./styles.css"

document.getElementById("app").textContent = "GuidedTrack Feedback Harness"
```

`src/styles.css` (starting point; later tasks append):

```css
:root {
  --harness-accent: #1e88e5;
  --harness-danger: #e53935;
  --harness-text: #222;
  --harness-bg: #fff;
}

body {
  margin: 0;
  background: var(--harness-bg);
  color: var(--harness-text);
  font-family: system-ui, sans-serif;
}
```

`test/fixtures/entry.js` (exposes modules for fixture pages; later tasks add exports):

```js
import "../../src/styles.css"

window.harness = {}
```

- [ ] **Step 5: Write the failing scaffold test**

`test/unit/scaffold.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync } from "node:fs"

test("build output exists after npm run build", () => {
  assert.ok(existsSync("dist/main.js"), "dist/main.js missing: run npm run build")
  assert.ok(existsSync("dist/main.css"), "dist/main.css missing")
  assert.ok(existsSync("test/fixtures/build/entry.js"), "fixture bundle missing")
})
```

- [ ] **Step 6: Install and run the test to verify it fails**

Run: `cd /home/ubuntu/workspace && npm install && npm run test:unit`

Expected: `npm install` succeeds and writes `package-lock.json`; the test FAILS with "dist/main.js missing: run npm run build".

- [ ] **Step 7: Build and run the test to verify it passes**

Run: `npm run build && npm run test:unit`

Expected: esbuild prints the four output files; the test PASSES.

- [ ] **Step 8: Format and commit**

```bash
npm run format
git add package.json package-lock.json build.mjs .prettierrc .gitignore index.html src/main.js src/styles.css test/fixtures/entry.js test/unit/scaffold.test.js
git commit -m "Scaffold the feedback harness: esbuild, prettier, node test runner

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Spike A, do public builds carry source line numbers?

This is a throwaway probe. Its output is a finding written to a markdown file, not code anyone keeps. It needs network access to guidedtrack.com.

**Files:**
- Create: `spikes/trace-lines.mjs`, `docs/superpowers/spikes/2026-10-15-phase-1-spikes.md`

**Interfaces:**
- Produces: a written answer to "does `guidedtrack:trace` fire with `{from, to, program}` on the public run page, and do compiled nodes carry `line_number`?" Task 12's context tracker works either way; the finding decides how prominently line numbers appear in later phases.

- [ ] **Step 1: Write the spike script**

`spikes/trace-lines.mjs`:

```js
// THROWAWAY SPIKE. Answers: does the public build expose source line numbers?
// Usage: node spikes/trace-lines.mjs [programKey]
import { chromium } from "playwright"

const key = process.argv[2] || "odwuk6y"
const url = `https://www.guidedtrack.com/programs/${key}/run`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1000, height: 800 } })
page.on("console", message => console.log("[page]", message.text()))

await page.goto(url, { waitUntil: "load" })
await page.waitForFunction(() => window.jQuery && window.program_contents, null, {
  timeout: 30000,
})

const counts = await page.evaluate(() => {
  window.__traces = []
  window.jQuery(window).on("guidedtrack:trace", (_event, options) => {
    window.__traces.push(options)
  })
  return Object.entries(window.program_contents)
    .filter(([, value]) => value && value.nodes)
    .map(([name, program]) => {
      const nodes = Object.values(program.nodes)
      return {
        name,
        nodes: nodes.length,
        withLineNumber: nodes.filter(node => node.line_number != null).length,
      }
    })
})
console.log("compiled nodes with line_number:", JSON.stringify(counts, null, 2))

const button = page
  .locator(".program_container .main button, .program_container .main .btn")
  .first()
if ((await button.count()) > 0) {
  await button.click()
  await page.waitForTimeout(2000)
} else {
  console.log("no button found on the first page; traces below are from page load only")
}

const traces = await page.evaluate(() => window.__traces)
console.log("trace events:", JSON.stringify(traces, null, 2))

await browser.close()
```

- [ ] **Step 2: Run the spike**

Run: `cd /home/ubuntu/workspace && node spikes/trace-lines.mjs`

Expected: two JSON blocks. The question is answered YES if `withLineNumber` is greater than zero for at least one program and the trace array contains objects shaped `{ detail: { from, to, program } }`. Answered NO if `withLineNumber` is 0 everywhere and the trace array is empty. If the page never exposes `program_contents` within 30 seconds, rerun once; if it still fails, record "could not determine" with the error text.

- [ ] **Step 3: Record the finding**

Create `docs/superpowers/spikes/2026-10-15-phase-1-spikes.md` with this structure, filling in the actual numbers from the run (never invent them):

```markdown
# Phase 1 spike findings

## Spike A: source line numbers in the public build

Program tested: `odwuk6y` at https://www.guidedtrack.com/programs/odwuk6y/run

Result: <YES / NO / could not determine>

Evidence: <paste the two JSON blocks printed by spikes/trace-lines.mjs>

Consequence: <If YES: context snapshots will include line ranges; Phase 2 inbox shows them. If NO: the lines field stays empty and the inbox hides it.>

## Spike B: screenshot fidelity

(filled in by Task 3)
```

- [ ] **Step 4: Commit**

```bash
npm run format
git add spikes/trace-lines.mjs docs/superpowers/spikes/2026-10-15-phase-1-spikes.md
git commit -m "Spike: check whether public GT builds expose line numbers

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Spike B, is modern-screenshot's rendering of a GT page acceptable?

Throwaway probe. Output is two PNGs compared by eye, and a written finding.

**Files:**
- Create: `spikes/screenshot-fidelity.mjs`
- Modify: `docs/superpowers/spikes/2026-10-15-phase-1-spikes.md`

**Interfaces:**
- Produces: the decision whether Task 10 uses modern-screenshot (default) or falls back to html2canvas behind the same `captureViewport` interface.

- [ ] **Step 1: Write the spike script**

`spikes/screenshot-fidelity.mjs`:

```js
// THROWAWAY SPIKE. Compares modern-screenshot's DOM rendering of a GT page
// against a real browser screenshot. Writes spikes/out/real.png and spikes/out/dom.png.
// Usage: node spikes/screenshot-fidelity.mjs [programKey]
import { chromium } from "playwright"
import { mkdirSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const libraryPath = require.resolve("modern-screenshot/dist/index.js")

const key = process.argv[2] || "odwuk6y"
const url = `https://www.guidedtrack.com/programs/${key}/run`
mkdirSync("spikes/out", { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1000, height: 800 } })
await page.goto(url, { waitUntil: "load" })
await page.waitForFunction(() => window.jQuery && window.program_contents, null, {
  timeout: 30000,
})
await page.waitForTimeout(2000)

await page.screenshot({ path: "spikes/out/real.png" })

await page.addScriptTag({ path: libraryPath })
const started = Date.now()
const dataUrl = await page.evaluate(async () => {
  return window.modernScreenshot.domToPng(document.documentElement, {
    scale: 1,
    backgroundColor: "#ffffff",
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  })
})
console.log(`modern-screenshot took ${Date.now() - started} ms`)
writeFileSync("spikes/out/dom.png", Buffer.from(dataUrl.split(",")[1], "base64"))

await browser.close()
console.log("wrote spikes/out/real.png and spikes/out/dom.png")
```

- [ ] **Step 2: Run the spike**

Run: `cd /home/ubuntu/workspace && node spikes/screenshot-fidelity.mjs`

Expected: prints the elapsed time and the two file paths. If `modernScreenshot` is undefined, check `node_modules/modern-screenshot/dist/index.js` begins with an IIFE that assigns `modernScreenshot` to `window`; if it does not, use `index.cjs` wrapped in a tiny shim and rerun.

- [ ] **Step 3: Compare the images**

Open both PNGs (use the Read tool on `spikes/out/real.png` and `spikes/out/dom.png`). Judge: is the text present and readable, are buttons and layout in the right places, are fonts close? Minor spacing differences are acceptable. Missing text, missing buttons, or a blank image are not.

- [ ] **Step 4: Record the finding**

Replace the "(filled in by Task 3)" line in `docs/superpowers/spikes/2026-10-15-phase-1-spikes.md` with:

```markdown
Program tested: `odwuk6y`

Render time: <ms printed by the script>

Result: <ACCEPTABLE / NOT ACCEPTABLE>

What differed: <describe concretely what you saw>

Consequence: <If acceptable: Task 10 uses modern-screenshot. If not: Task 10 installs html2canvas instead and implements the same captureViewport interface with it.>
```

- [ ] **Step 5: Commit**

```bash
npm run format
git add spikes/screenshot-fidelity.mjs docs/superpowers/spikes/2026-10-15-phase-1-spikes.md
git commit -m "Spike: compare modern-screenshot rendering of a GT page to a real screenshot

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Router

**Files:**
- Create: `src/router.js`, `test/unit/router.test.js`

**Interfaces:**
- Produces: `parseRoute(search: string) → { screen: "reviewer", key: string, mode: "run" | "test" } | { screen: "home" }`

- [ ] **Step 1: Write the failing tests**

`test/unit/router.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { parseRoute } from "../../src/router.js"

test("no parameters routes to home", () => {
  assert.deepEqual(parseRoute(""), { screen: "home" })
  assert.deepEqual(parseRoute("?"), { screen: "home" })
})

test("key routes to the reviewer screen in run mode by default", () => {
  assert.deepEqual(parseRoute("?key=abc1234"), {
    screen: "reviewer",
    key: "abc1234",
    mode: "run",
  })
})

test("mode=test is honoured, anything else means run", () => {
  assert.equal(parseRoute("?key=abc1234&mode=test").mode, "test")
  assert.equal(parseRoute("?key=abc1234&mode=run").mode, "run")
  assert.equal(parseRoute("?key=abc1234&mode=banana").mode, "run")
})

test("key is trimmed and an empty key routes home", () => {
  assert.equal(parseRoute("?key=%20abc1234%20").key, "abc1234")
  assert.deepEqual(parseRoute("?key=%20%20"), { screen: "home" })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL, `Cannot find module '.../src/router.js'`.

- [ ] **Step 3: Write the router**

`src/router.js`:

```js
export function parseRoute(search) {
  const params = new URLSearchParams(search)
  const key = (params.get("key") || "").trim()

  if (key) {
    return {
      screen: "reviewer",
      key,
      mode: params.get("mode") === "test" ? "test" : "run",
    }
  }

  return { screen: "home" }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`

Expected: all router tests PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add src/router.js test/unit/router.test.js
git commit -m "Add query-string router

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: Annotation model (pure geometry and history)

**Files:**
- Create: `src/annotations/model.js`, `test/unit/model.test.js`

**Interfaces:**
- Produces (all pure, no DOM):
  - `STYLES = { pen: { width: 4, color: "#e53935", opacity: 1 }, highlight: { width: 24, color: "#ffeb3b", opacity: 0.4 } }`
  - `CALLOUT_DEFAULTS = { width: 180, height: 64, offsetX: 40, offsetY: -110, minWidth: 80, minHeight: 40 }`
  - `createId() → string`
  - `createStroke(type, points) → { id, type, points: [[x, y], ...] }`
  - `createCallout([x, y], imageSize) → { id, type: "callout", anchor: [x, y], box: { x, y, w, h }, text: "" }`
  - `clampBox(box, imageSize) → box`, `clampPoint([x, y], imageSize) → [x, y]`
  - `translateShape(shape, dx, dy) → shape`
  - `strokeBounds(points) → { x, y, w, h }`
  - `thinPath(points, tolerance = 1.5) → points`
  - `nearestPointOnRect([x, y], box) → [x, y]`, `connector(callout) → { x1, y1, x2, y2 }`
  - `pathToD(points) → string`
  - `createHistory(initial) → { push(state), undo() → state | null, length }`
  - `clone(value) → value`
  - `imageSize` is always `{ width, height }`.

- [ ] **Step 1: Write the failing tests**

`test/unit/model.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import {
  CALLOUT_DEFAULTS,
  clampBox,
  clampPoint,
  connector,
  createCallout,
  createHistory,
  createStroke,
  nearestPointOnRect,
  pathToD,
  strokeBounds,
  thinPath,
  translateShape,
} from "../../src/annotations/model.js"

const image = { width: 400, height: 300 }

test("createStroke copies points and assigns an id", () => {
  const points = [[1, 2]]
  const stroke = createStroke("pen", points)
  points[0][0] = 99
  assert.equal(stroke.type, "pen")
  assert.deepEqual(stroke.points, [[1, 2]])
  assert.equal(typeof stroke.id, "string")
  assert.throws(() => createStroke("marker", []))
})

test("createCallout places the box up and to the right of the anchor", () => {
  const callout = createCallout([10, 200], image)
  assert.deepEqual(callout.anchor, [10, 200])
  assert.deepEqual(callout.box, { x: 50, y: 90, w: 180, h: 64 })
  assert.equal(callout.text, "")
})

test("createCallout clamps the box inside the image", () => {
  const callout = createCallout([390, 20], image)
  assert.deepEqual(callout.box, { x: 220, y: 0, w: 180, h: 64 })
})

test("clampBox keeps boxes inside and shrinks oversized ones", () => {
  assert.deepEqual(clampBox({ x: -5, y: -5, w: 50, h: 50 }, { width: 100, height: 100 }), { x: 0, y: 0, w: 50, h: 50 })
  assert.deepEqual(clampBox({ x: 80, y: 80, w: 50, h: 50 }, { width: 100, height: 100 }), { x: 50, y: 50, w: 50, h: 50 })
  assert.deepEqual(clampBox({ x: 10, y: 10, w: 500, h: 500 }, { width: 100, height: 100 }), { x: 0, y: 0, w: 100, h: 100 })
})

test("clampPoint keeps points inside the image", () => {
  assert.deepEqual(clampPoint([-3, 50], image), [0, 50])
  assert.deepEqual(clampPoint([450, 350], image), [400, 300])
})

test("translateShape moves strokes and callouts", () => {
  const stroke = createStroke("pen", [[0, 0], [10, 10]])
  assert.deepEqual(translateShape(stroke, 5, -5).points, [[5, -5], [15, 5]])
  const callout = createCallout([10, 200], image)
  const moved = translateShape(callout, 1, 2)
  assert.deepEqual(moved.anchor, [11, 202])
  assert.deepEqual(moved.box, { x: 51, y: 92, w: 180, h: 64 })
})

test("strokeBounds is the bounding box of the points", () => {
  assert.deepEqual(strokeBounds([[10, 20], [30, 5], [15, 25]]), { x: 10, y: 5, w: 20, h: 20 })
})

test("thinPath drops collinear points and keeps corners", () => {
  assert.deepEqual(thinPath([[0, 0], [1, 1], [2, 2], [3, 3]]), [[0, 0], [3, 3]])
  assert.deepEqual(thinPath([[0, 0], [5, 0.5], [10, 0]]), [[0, 0], [10, 0]])
  assert.deepEqual(thinPath([[0, 0], [5, 0], [10, 10]]), [[0, 0], [5, 0], [10, 10]])
  assert.deepEqual(thinPath([[7, 7]]), [[7, 7]])
})

test("nearestPointOnRect projects outside points onto the edge", () => {
  const box = { x: 10, y: 40, w: 20, h: 20 }
  assert.deepEqual(nearestPointOnRect([0, 50], box), [10, 50])
  assert.deepEqual(nearestPointOnRect([100, 100], box), [30, 60])
  assert.deepEqual(nearestPointOnRect([20, 0], box), [20, 40])
})

test("nearestPointOnRect projects inside points to the closest edge", () => {
  const box = { x: 10, y: 40, w: 20, h: 20 }
  assert.deepEqual(nearestPointOnRect([12, 50], box), [10, 50])
  assert.deepEqual(nearestPointOnRect([20, 58], box), [20, 60])
})

test("connector runs from the box edge to the anchor", () => {
  const callout = { anchor: [0, 50], box: { x: 10, y: 40, w: 20, h: 20 } }
  assert.deepEqual(connector(callout), { x1: 10, y1: 50, x2: 0, y2: 50 })
})

test("pathToD builds an SVG path, with a dot for single points", () => {
  assert.equal(pathToD([]), "")
  assert.equal(pathToD([[3, 4]]), "M 3 4 L 3 4")
  assert.equal(pathToD([[0, 0], [10, 10], [20, 0]]), "M 0 0 L 10 10 L 20 0")
})

test("history undoes to the previous snapshot and stops at the initial state", () => {
  const history = createHistory([])
  history.push([{ id: "a" }])
  history.push([{ id: "a" }, { id: "b" }])
  assert.equal(history.length, 3)
  assert.deepEqual(history.undo(), [{ id: "a" }])
  assert.deepEqual(history.undo(), [])
  assert.equal(history.undo(), null)
})

test("CALLOUT_DEFAULTS are the documented values", () => {
  assert.deepEqual(CALLOUT_DEFAULTS, { width: 180, height: 64, offsetX: 40, offsetY: -110, minWidth: 80, minHeight: 40 })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL, cannot find `src/annotations/model.js`.

- [ ] **Step 3: Write the model**

`src/annotations/model.js`:

```js
export const STYLES = {
  pen: { width: 4, color: "#e53935", opacity: 1 },
  highlight: { width: 24, color: "#ffeb3b", opacity: 0.4 },
}

export const CALLOUT_DEFAULTS = {
  width: 180,
  height: 64,
  offsetX: 40,
  offsetY: -110,
  minWidth: 80,
  minHeight: 40,
}

export function createId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function createStroke(type, points) {
  if (!STYLES[type]) throw new Error(`Unknown stroke type: ${type}`)
  return { id: createId(), type, points: points.map(([x, y]) => [x, y]) }
}

export function createCallout(anchor, imageSize) {
  const d = CALLOUT_DEFAULTS
  const box = clampBox(
    { x: anchor[0] + d.offsetX, y: anchor[1] + d.offsetY, w: d.width, h: d.height },
    imageSize,
  )
  return { id: createId(), type: "callout", anchor: [anchor[0], anchor[1]], box, text: "" }
}

export function clampBox(box, imageSize) {
  const w = Math.min(box.w, imageSize.width)
  const h = Math.min(box.h, imageSize.height)
  const x = Math.min(Math.max(0, box.x), imageSize.width - w)
  const y = Math.min(Math.max(0, box.y), imageSize.height - h)
  return { x, y, w, h }
}

export function clampPoint([x, y], imageSize) {
  return [
    Math.min(Math.max(0, x), imageSize.width),
    Math.min(Math.max(0, y), imageSize.height),
  ]
}

export function translateShape(shape, dx, dy) {
  if (shape.type === "callout") {
    return {
      ...shape,
      anchor: [shape.anchor[0] + dx, shape.anchor[1] + dy],
      box: { ...shape.box, x: shape.box.x + dx, y: shape.box.y + dy },
    }
  }
  return { ...shape, points: shape.points.map(([x, y]) => [x + dx, y + dy]) }
}

export function strokeBounds(points) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const [x, y] of points) {
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
}

// Ramer-Douglas-Peucker simplification.
export function thinPath(points, tolerance = 1.5) {
  if (points.length <= 2) return points.map(([x, y]) => [x, y])
  const first = points[0]
  const last = points[points.length - 1]
  let maxDistance = 0
  let index = 0
  for (let i = 1; i < points.length - 1; i++) {
    const distance = distanceToSegment(points[i], first, last)
    if (distance > maxDistance) {
      maxDistance = distance
      index = i
    }
  }
  if (maxDistance > tolerance) {
    const left = thinPath(points.slice(0, index + 1), tolerance)
    const right = thinPath(points.slice(index), tolerance)
    return left.slice(0, -1).concat(right)
  }
  return [
    [first[0], first[1]],
    [last[0], last[1]],
  ]
}

function distanceToSegment(p, a, b) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const length2 = dx * dx + dy * dy
  if (length2 === 0) return Math.hypot(p[0] - a[0], p[1] - a[1])
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / length2))
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
}

export function nearestPointOnRect(point, box) {
  const x = Math.min(Math.max(point[0], box.x), box.x + box.w)
  const y = Math.min(Math.max(point[1], box.y), box.y + box.h)
  const inside = x === point[0] && y === point[1]
  if (!inside) return [x, y]

  const toLeft = point[0] - box.x
  const toRight = box.x + box.w - point[0]
  const toTop = point[1] - box.y
  const toBottom = box.y + box.h - point[1]
  const nearest = Math.min(toLeft, toRight, toTop, toBottom)
  if (nearest === toLeft) return [box.x, point[1]]
  if (nearest === toRight) return [box.x + box.w, point[1]]
  if (nearest === toTop) return [point[0], box.y]
  return [point[0], box.y + box.h]
}

export function connector(callout) {
  const [x1, y1] = nearestPointOnRect(callout.anchor, callout.box)
  return { x1, y1, x2: callout.anchor[0], y2: callout.anchor[1] }
}

export function pathToD(points) {
  if (points.length === 0) return ""
  if (points.length === 1) {
    const [x, y] = points[0]
    return `M ${x} ${y} L ${x} ${y}`
  }
  return "M " + points.map(([x, y]) => `${x} ${y}`).join(" L ")
}

export function createHistory(initial) {
  const states = [clone(initial)]
  return {
    push(state) {
      states.push(clone(state))
    },
    undo() {
      if (states.length <= 1) return null
      states.pop()
      return clone(states[states.length - 1])
    },
    get length() {
      return states.length
    },
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`

Expected: all model tests PASS. If `thinPath` or `nearestPointOnRect` fail, re-derive the expected value by hand before touching the implementation; the test values above were computed by hand from the definitions.

- [ ] **Step 5: Commit**

```bash
npm run format
git add src/annotations/model.js test/unit/model.test.js
git commit -m "Add pure annotation model: shapes, geometry, path thinning, history

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: Annotation renderer (pure JSON to SVG tree)

**Files:**
- Create: `src/annotations/render.js`, `test/unit/render.test.js`

**Interfaces:**
- Consumes: `STYLES`, `connector`, `pathToD`, `strokeBounds` from `src/annotations/model.js`.
- Produces:
  - `h(tag, attrs, children) → { tag, attrs, children }` (children are trees or strings)
  - `renderTree(annotations, imageSize, { mode: "static" | "live", selectedId, draft }) → tree` whose root is `<svg xmlns viewBox="0 0 W H" width=W height=H data-mode>`
  - `toSvgString(tree) → string` (escaped, serializable, loadable as an `<img>`)
  - `toDom(tree, doc = document) → Element` (SVG namespace; the callout text `div` gets the XHTML namespace)
  - `wrapText(text, maxWidth, fontSize = 14) → string[]`
  - Constants `SVG_NS`, `XHTML_NS`, `CALLOUT_COLOR = "#1e88e5"`, `FONT_SIZE = 14`, `LINE_HEIGHT = 18`, `TEXT_PADDING = 8`
  - Hit-testing contract used by the editor: every shape is a `<g data-id data-type>`; in live mode strokes carry an invisible wide `<path data-role="shape">`, callouts carry `circle[data-role="anchor"]`, `rect[data-role="box"]`, `div[data-role="text"]` inside a `foreignObject` inset by `TEXT_PADDING`, and `rect[data-role="resize"]` in the bottom-right corner. The selected shape gets `[data-role="selection"]`.

- [ ] **Step 1: Write the failing tests**

`test/unit/render.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { renderTree, toSvgString, wrapText, h } from "../../src/annotations/render.js"

const image = { width: 400, height: 300 }
const pen = { id: "p1", type: "pen", points: [[0, 0], [10, 10]] }
const highlight = { id: "h1", type: "highlight", points: [[5, 5], [50, 5]] }
const callout = { id: "c1", type: "callout", anchor: [0, 50], box: { x: 10, y: 40, w: 100, h: 40 }, text: "hello world foo" }

test("root svg has xmlns, viewBox and size", () => {
  const svg = toSvgString(renderTree([], image))
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" data-mode="static">'))
  assert.ok(svg.includes('<marker id="harness-arrow"'))
})

test("static pen stroke is a single styled path", () => {
  const svg = toSvgString(renderTree([pen], image))
  assert.ok(svg.includes('<g data-id="p1" data-type="pen">'))
  assert.ok(svg.includes('d="M 0 0 L 10 10"'))
  assert.ok(svg.includes('stroke="#e53935"'))
  assert.ok(svg.includes('stroke-width="4"'))
  assert.ok(!svg.includes('data-role="shape"'), "static mode has no hit path")
})

test("live pen stroke adds a wide transparent hit path", () => {
  const svg = toSvgString(renderTree([pen], image, { mode: "live" }))
  assert.ok(svg.includes('stroke="transparent" stroke-width="16"'))
  assert.ok(svg.includes('data-role="shape"'))
})

test("highlight is translucent and multiplies", () => {
  const svg = toSvgString(renderTree([highlight], image))
  assert.ok(svg.includes('stroke="#ffeb3b"'))
  assert.ok(svg.includes('stroke-opacity="0.4"'))
  assert.ok(svg.includes("mix-blend-mode: multiply"))
})

test("static callout renders connector, anchor, box and wrapped text", () => {
  const svg = toSvgString(renderTree([callout], image))
  assert.ok(svg.includes('<line x1="10" y1="50" x2="0" y2="50"'))
  assert.ok(svg.includes('marker-end="url(#harness-arrow)"'))
  assert.ok(svg.includes('<circle cx="0" cy="50" r="6"'))
  assert.ok(svg.includes('<rect x="10" y="40" width="100" height="40"'))
  assert.ok(svg.includes("<text "))
  assert.ok(svg.includes("<tspan"))
  assert.ok(!svg.includes("foreignObject"))
})

test("live callout renders an editable div and a resize handle", () => {
  const svg = toSvgString(renderTree([callout], image, { mode: "live" }))
  assert.ok(svg.includes("<foreignObject"))
  assert.ok(svg.includes('contenteditable="true"'))
  assert.ok(svg.includes('data-role="text"'))
  assert.ok(svg.includes('data-role="resize"'))
  assert.ok(svg.includes('data-role="anchor"'))
  assert.ok(svg.includes('data-role="box"'))
})

test("selected shape gets a selection outline and draft is drawn", () => {
  const svg = toSvgString(renderTree([pen], image, { mode: "live", selectedId: "p1", draft: highlight }))
  assert.ok(svg.includes('data-role="selection"'))
  assert.ok(svg.includes('data-id="h1"'))
})

test("text content is escaped", () => {
  const svg = toSvgString(renderTree([{ ...callout, text: "<b>&" }], image))
  assert.ok(svg.includes("&lt;b&gt;&amp;"))
  assert.ok(!svg.includes("<b>"))
})

test("wrapText wraps greedily by estimated character width", () => {
  assert.deepEqual(wrapText("hello world foo", 60), ["hello", "world", "foo"])
  assert.deepEqual(wrapText("", 60), [""])
  assert.deepEqual(wrapText("a\nb", 60), ["a", "b"])
  assert.deepEqual(wrapText("abcdefghijkl", 60), ["abcdefg", "hijkl"])
})

test("h builds a tree node", () => {
  assert.deepEqual(h("g", { id: "x" }, ["t"]), { tag: "g", attrs: { id: "x" }, children: ["t"] })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL, cannot find `src/annotations/render.js`.

- [ ] **Step 3: Write the renderer**

`src/annotations/render.js`:

```js
import { STYLES, connector, pathToD, strokeBounds } from "./model.js"

export const SVG_NS = "http://www.w3.org/2000/svg"
export const XHTML_NS = "http://www.w3.org/1999/xhtml"
export const CALLOUT_COLOR = "#1e88e5"
export const FONT_SIZE = 14
export const LINE_HEIGHT = 18
export const TEXT_PADDING = 8
const HIT_WIDTH = 16
const RESIZE_SIZE = 12
const ANCHOR_RADIUS = 6

export function h(tag, attrs = {}, children = []) {
  return { tag, attrs, children }
}

export function renderTree(
  annotations,
  imageSize,
  { mode = "static", selectedId = null, draft = null } = {},
) {
  const children = [defs()]
  for (const shape of annotations) {
    children.push(renderShape(shape, mode, shape.id === selectedId))
  }
  if (draft) children.push(renderShape(draft, mode, false))
  return h(
    "svg",
    {
      xmlns: SVG_NS,
      viewBox: `0 0 ${imageSize.width} ${imageSize.height}`,
      width: imageSize.width,
      height: imageSize.height,
      "data-mode": mode,
    },
    children,
  )
}

function defs() {
  return h("defs", {}, [
    h(
      "marker",
      {
        id: "harness-arrow",
        viewBox: "0 0 10 10",
        refX: "9",
        refY: "5",
        markerWidth: "8",
        markerHeight: "8",
        orient: "auto-start-reverse",
      },
      [h("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: CALLOUT_COLOR })],
    ),
  ])
}

function renderShape(shape, mode, selected) {
  return shape.type === "callout"
    ? renderCallout(shape, mode, selected)
    : renderStroke(shape, mode, selected)
}

function renderStroke(shape, mode, selected) {
  const style = STYLES[shape.type]
  const d = pathToD(shape.points)
  const children = [
    h("path", {
      d,
      fill: "none",
      stroke: style.color,
      "stroke-width": style.width,
      "stroke-opacity": style.opacity,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      style: shape.type === "highlight" ? "mix-blend-mode: multiply" : "",
    }),
  ]
  if (mode === "live") {
    children.push(
      h("path", {
        d,
        fill: "none",
        stroke: "transparent",
        "stroke-width": Math.max(style.width, HIT_WIDTH),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "data-role": "shape",
      }),
    )
  }
  if (selected) children.push(selectionRect(strokeBounds(shape.points)))
  return h("g", { "data-id": shape.id, "data-type": shape.type }, children)
}

function selectionRect(bounds) {
  return h("rect", {
    x: bounds.x - 4,
    y: bounds.y - 4,
    width: bounds.w + 8,
    height: bounds.h + 8,
    fill: "none",
    stroke: CALLOUT_COLOR,
    "stroke-dasharray": "4 3",
    "pointer-events": "none",
    "data-role": "selection",
  })
}

function renderCallout(shape, mode, selected) {
  const { box, anchor } = shape
  const line = connector(shape)
  const children = [
    h("line", {
      x1: line.x1,
      y1: line.y1,
      x2: line.x2,
      y2: line.y2,
      stroke: CALLOUT_COLOR,
      "stroke-width": 2,
      "marker-end": "url(#harness-arrow)",
    }),
    h("circle", {
      cx: anchor[0],
      cy: anchor[1],
      r: ANCHOR_RADIUS,
      fill: CALLOUT_COLOR,
      "data-role": "anchor",
    }),
    h("rect", {
      x: box.x,
      y: box.y,
      width: box.w,
      height: box.h,
      rx: 4,
      fill: "#fff",
      stroke: CALLOUT_COLOR,
      "stroke-width": selected ? 3 : 2,
      "data-role": "box",
    }),
  ]

  if (mode === "live") {
    children.push(
      h(
        "foreignObject",
        {
          x: box.x + TEXT_PADDING,
          y: box.y + TEXT_PADDING,
          width: Math.max(1, box.w - 2 * TEXT_PADDING),
          height: Math.max(1, box.h - 2 * TEXT_PADDING),
        },
        [
          h(
            "div",
            {
              xmlns: XHTML_NS,
              contenteditable: "true",
              "data-role": "text",
              class: "harness-callout-text",
            },
            [shape.text],
          ),
        ],
      ),
    )
    children.push(
      h("rect", {
        x: box.x + box.w - RESIZE_SIZE,
        y: box.y + box.h - RESIZE_SIZE,
        width: RESIZE_SIZE,
        height: RESIZE_SIZE,
        fill: CALLOUT_COLOR,
        "data-role": "resize",
        style: "cursor: nwse-resize",
      }),
    )
  } else {
    const lines = wrapText(shape.text, box.w - 2 * TEXT_PADDING)
    children.push(
      h(
        "text",
        {
          x: box.x + TEXT_PADDING,
          y: box.y + TEXT_PADDING + FONT_SIZE,
          "font-size": FONT_SIZE,
          "font-family": "sans-serif",
          fill: "#000",
        },
        lines.map((text, index) =>
          h("tspan", { x: box.x + TEXT_PADDING, dy: index === 0 ? 0 : LINE_HEIGHT }, [text]),
        ),
      ),
    )
  }

  return h("g", { "data-id": shape.id, "data-type": "callout" }, children)
}

export function wrapText(text, maxWidth, fontSize = FONT_SIZE) {
  const maxChars = Math.max(1, Math.floor(maxWidth / (fontSize * 0.55)))
  const lines = []
  for (const paragraph of String(text).split("\n")) {
    let line = ""
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const chunks =
        word.length > maxChars ? word.match(new RegExp(`.{1,${maxChars}}`, "g")) : [word]
      for (const chunk of chunks) {
        if (line === "") line = chunk
        else if (line.length + 1 + chunk.length <= maxChars) line += " " + chunk
        else {
          lines.push(line)
          line = chunk
        }
      }
    }
    lines.push(line)
  }
  return lines
}

export function toSvgString(node) {
  if (typeof node === "string") return escapeText(node)
  const attrs = Object.entries(node.attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([name, value]) => ` ${name}="${escapeAttr(String(value))}"`)
    .join("")
  const inner = node.children.map(toSvgString).join("")
  return `<${node.tag}${attrs}>${inner}</${node.tag}>`
}

export function toDom(node, doc = document) {
  if (typeof node === "string") return doc.createTextNode(node)
  const namespace = node.attrs.xmlns === XHTML_NS ? XHTML_NS : SVG_NS
  const element = doc.createElementNS(namespace, node.tag)
  for (const [name, value] of Object.entries(node.attrs)) {
    if (name === "xmlns" || value === undefined || value === null || value === "") continue
    element.setAttribute(name, String(value))
  }
  for (const child of node.children) element.appendChild(toDom(child, doc))
  return element
}

function escapeText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function escapeAttr(text) {
  return escapeText(text).replace(/"/g, "&quot;")
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`

Expected: all render tests PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add src/annotations/render.js test/unit/render.test.js
git commit -m "Add pure SVG renderer for annotations with static and live modes

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: Browser test infrastructure

**Files:**
- Create: `test/helpers/server.js`, `test/helpers/browser.js`, `test/fixtures/smoke.html`, `test/browser/smoke.test.js`

**Interfaces:**
- Produces:
  - `startServer() → Promise<{ url, close() }>`: serves the repository root over HTTP on a random port (so `/dist/...`, `/test/fixtures/...` resolve).
  - `withPage(async ({ page, baseUrl }) => {}, { viewport })`: launches headless Chromium, opens a page, runs the callback, fails the test on any uncaught page error, always closes the browser and server.
  - Fixture pages live at `/test/fixtures/<name>.html` and load `/test/fixtures/build/entry.css` and `/test/fixtures/build/entry.js`, which populates `window.harness`.

- [ ] **Step 1: Write the server helper**

`test/helpers/server.js`:

```js
import http from "node:http"
import { createReadStream, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".map": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
}

export function startServer() {
  return new Promise(resolve => {
    const server = http.createServer((request, response) => {
      const url = new URL(request.url, "http://localhost")
      const file = path.join(ROOT, decodeURIComponent(url.pathname))

      if (!file.startsWith(ROOT)) {
        response.writeHead(403)
        return response.end()
      }

      let stat
      try {
        stat = statSync(file)
      } catch {
        response.writeHead(404)
        return response.end("not found")
      }

      if (stat.isDirectory()) {
        response.writeHead(404)
        return response.end("not found")
      }

      response.writeHead(200, {
        "content-type": TYPES[path.extname(file)] || "application/octet-stream",
      })
      createReadStream(file).pipe(response)
    })

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address()
      resolve({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise(done => server.close(done)),
      })
    })
  })
}
```

- [ ] **Step 2: Write the browser helper**

`test/helpers/browser.js`:

```js
import { startServer } from "./server.js"

const INSTALL_HINT =
  "Playwright 1.49.0 is required for browser tests. Outside the dev container run: " +
  "npm install --no-save playwright@1.49.0 && npx playwright install chromium"

export async function withPage(fn, { viewport = { width: 800, height: 600 } } = {}) {
  let playwright
  try {
    playwright = await import("playwright")
  } catch {
    throw new Error(INSTALL_HINT)
  }

  const server = await startServer()
  const browser = await playwright.chromium.launch()
  const page = await browser.newPage({ viewport })
  const errors = []
  page.on("pageerror", error => errors.push(error))

  try {
    await fn({ page, baseUrl: server.url })
    if (errors.length > 0) throw errors[0]
  } finally {
    await browser.close()
    await server.close()
  }
}

// Drag with the primary mouse button through intermediate points so pointermove fires.
export async function drag(page, from, to, { steps = 8 } = {}) {
  await page.mouse.move(from[0], from[1])
  await page.mouse.down()
  await page.mouse.move(to[0], to[1], { steps })
  await page.mouse.up()
}
```

- [ ] **Step 3: Write the smoke fixture and failing test**

`test/fixtures/smoke.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/test/fixtures/build/entry.css" />
  </head>
  <body>
    <script type="module" src="/test/fixtures/build/entry.js"></script>
  </body>
</html>
```

`test/browser/smoke.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

test("fixture bundle loads and styles apply", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/smoke.html`)
    await page.waitForFunction(() => window.harness !== undefined)
    const margin = await page.evaluate(() => getComputedStyle(document.body).margin)
    assert.equal(margin, "0px")
    const hasVersion = await page.evaluate(() => typeof window.harness.version === "string")
    assert.ok(hasVersion, "entry should expose harness.version")
  })
})
```

- [ ] **Step 4: Run the browser test to verify it fails**

Run: `npm run test:browser`

Expected: the build succeeds, Chromium launches, and the test FAILS on "entry should expose harness.version".

- [ ] **Step 5: Add the version export to the fixture entry**

Replace `test/fixtures/entry.js` with:

```js
import "../../src/styles.css"

window.harness = {
  version: "phase-1",
}
```

- [ ] **Step 6: Run the browser test to verify it passes**

Run: `npm run test:browser`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
npm run format
git add test/helpers/server.js test/helpers/browser.js test/fixtures/smoke.html test/fixtures/entry.js test/browser/smoke.test.js
git commit -m "Add Playwright browser test harness with a local static server

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: Annotation editor (pointer tools)

**Files:**
- Create: `src/annotations/editor.js`, `test/fixtures/editor.html`, `test/browser/editor.test.js`
- Modify: `src/styles.css`, `test/fixtures/entry.js`

**Interfaces:**
- Consumes: model functions from Task 5; `renderTree`, `toDom`, `SVG_NS` from Task 6; `withPage`, `drag` from Task 7.
- Produces: `createEditor({ container, image: { url, width, height }, annotations = [], onChange }) → { setTool(name), getTool(), getAnnotations(), getSelectedId(), deleteSelected(), undo(), destroy() }` and `TOOLS = ["select", "pen", "highlight", "callout"]`. `onChange(annotations)` fires after every committed change and on text input.

- [ ] **Step 1: Write the editor fixture**

`test/fixtures/editor.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/test/fixtures/build/entry.css" />
    <style>
      body {
        margin: 0;
      }
      #editor {
        width: 400px;
      }
    </style>
  </head>
  <body>
    <div id="editor"></div>
    <script type="module">
      import "/test/fixtures/build/entry.js"

      const canvas = document.createElement("canvas")
      canvas.width = 400
      canvas.height = 300
      const context = canvas.getContext("2d")
      context.fillStyle = "#dddddd"
      context.fillRect(0, 0, 400, 300)

      window.changes = []
      window.editor = window.harness.createEditor({
        container: document.getElementById("editor"),
        image: { url: canvas.toDataURL(), width: 400, height: 300 },
        onChange: annotations => window.changes.push(annotations),
      })
      window.editorReady = true
    </script>
  </body>
</html>
```

- [ ] **Step 2: Write the failing browser tests**

`test/browser/editor.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage, drag } from "../helpers/browser.js"

async function openEditor(page, baseUrl) {
  await page.goto(`${baseUrl}/test/fixtures/editor.html`)
  await page.waitForFunction(() => window.editorReady === true)
}

const annotations = page => page.evaluate(() => window.editor.getAnnotations())
const setTool = (page, tool) => page.evaluate(name => window.editor.setTool(name), tool)
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
    assert.deepEqual(rounded(list[0].points), [[50, 50], [150, 50], [150, 150]])
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
    assert.deepEqual(rounded(list[0].points), [[20, 100], [200, 100]])
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

    const focused = await page.evaluate(() => document.activeElement.getAttribute("data-role"))
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
    assert.deepEqual(rounded(stroke.points), [[50, 100], [150, 100]])
    assert.equal(await page.evaluate(() => window.editor.getSelectedId()), stroke.id)
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
    assert.notEqual(await page.evaluate(() => window.editor.getSelectedId()), null)
    await page.mouse.click(300, 250)
    assert.equal(await page.evaluate(() => window.editor.getSelectedId()), null)
    const changes = await page.evaluate(() => window.changes.length)
    assert.equal(changes, 1)
  })
})
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm run test:browser`

Expected: FAIL in every editor test with `window.harness.createEditor is not a function`.

- [ ] **Step 4: Write the editor**

`src/annotations/editor.js`:

```js
import {
  CALLOUT_DEFAULTS,
  clampBox,
  clampPoint,
  clone,
  createCallout,
  createHistory,
  createStroke,
  thinPath,
  translateShape,
} from "./model.js"
import { SVG_NS, renderTree, toDom } from "./render.js"

export const TOOLS = ["select", "pen", "highlight", "callout"]

export function createEditor({ container, image, annotations = [], onChange = () => {} }) {
  let state = clone(annotations)
  let tool = "select"
  let selectedId = null
  let draft = null
  let drag = null
  let textDirty = false
  const history = createHistory(state)

  container.classList.add("harness-annotator")
  container.innerHTML = ""
  container.tabIndex = 0

  const img = document.createElement("img")
  img.src = image.url
  img.width = image.width
  img.height = image.height
  img.alt = "Screenshot"
  img.draggable = false
  container.appendChild(img)

  const svg = document.createElementNS(SVG_NS, "svg")
  svg.classList.add("harness-annotator-svg")
  container.appendChild(svg)

  function render() {
    const tree = toDom(renderTree(state, image, { mode: "live", selectedId, draft }))
    svg.setAttribute("viewBox", tree.getAttribute("viewBox"))
    svg.setAttribute("data-tool", tool)
    svg.replaceChildren(...Array.from(tree.childNodes))
  }

  function toImagePoint(event) {
    const rect = svg.getBoundingClientRect()
    return [
      ((event.clientX - rect.left) * image.width) / rect.width,
      ((event.clientY - rect.top) * image.height) / rect.height,
    ]
  }

  function roleOf(target) {
    return target && target.getAttribute ? target.getAttribute("data-role") : null
  }

  function find(id) {
    return state.find(shape => shape.id === id)
  }

  function replace(shape) {
    state = state.map(existing => (existing.id === shape.id ? shape : existing))
  }

  function commit() {
    history.push(state)
    onChange(clone(state))
  }

  function isEditingText() {
    return roleOf(document.activeElement) === "text"
  }

  function focusText(id) {
    const text = svg.querySelector(`[data-id="${id}"] [data-role="text"]`)
    if (text) text.focus()
  }

  function onPointerDown(event) {
    if (event.button !== 0) return
    const role = roleOf(event.target)
    if (role === "text") return
    container.focus({ preventScroll: true })
    const point = toImagePoint(event)

    if (tool === "pen" || tool === "highlight") {
      draft = createStroke(tool, [point])
      svg.setPointerCapture(event.pointerId)
      render()
      event.preventDefault()
      return
    }

    if (tool === "callout") {
      const callout = createCallout(clampPoint(point, image), image)
      state = [...state, callout]
      selectedId = callout.id
      commit()
      render()
      focusText(callout.id)
      event.preventDefault()
      return
    }

    const group = event.target.closest ? event.target.closest("[data-id]") : null
    if (!group) {
      selectedId = null
      render()
      return
    }

    selectedId = group.getAttribute("data-id")
    drag = { role: role || "shape", last: point, moved: false }
    svg.setPointerCapture(event.pointerId)
    render()
    event.preventDefault()
  }

  function onPointerMove(event) {
    if (draft) {
      draft.points.push(toImagePoint(event))
      render()
      return
    }
    if (!drag) return

    const point = toImagePoint(event)
    const dx = point[0] - drag.last[0]
    const dy = point[1] - drag.last[1]
    drag.last = point
    drag.moved = true
    const shape = find(selectedId)
    if (!shape) return

    if (drag.role === "anchor") {
      replace({
        ...shape,
        anchor: clampPoint([shape.anchor[0] + dx, shape.anchor[1] + dy], image),
      })
    } else if (drag.role === "box") {
      replace({
        ...shape,
        box: clampBox({ ...shape.box, x: shape.box.x + dx, y: shape.box.y + dy }, image),
      })
    } else if (drag.role === "resize") {
      replace({
        ...shape,
        box: clampBox(
          {
            ...shape.box,
            w: Math.max(CALLOUT_DEFAULTS.minWidth, shape.box.w + dx),
            h: Math.max(CALLOUT_DEFAULTS.minHeight, shape.box.h + dy),
          },
          image,
        ),
      })
    } else {
      replace(translateShape(shape, dx, dy))
    }
    render()
  }

  function onPointerUp() {
    if (draft) {
      state = [...state, { ...draft, points: thinPath(draft.points) }]
      draft = null
      commit()
      render()
      return
    }
    if (drag) {
      if (drag.moved) commit()
      drag = null
      render()
    }
  }

  function onInput(event) {
    if (roleOf(event.target) !== "text") return
    const id = event.target.closest("[data-id]").getAttribute("data-id")
    const shape = find(id)
    if (!shape) return
    replace({ ...shape, text: event.target.innerText.replace(/\n$/, "") })
    textDirty = true
    onChange(clone(state))
  }

  function onFocusOut(event) {
    if (roleOf(event.target) !== "text") return
    if (!textDirty) return
    textDirty = false
    commit()
    render()
  }

  function onKeyDown(event) {
    if (isEditingText()) return
    if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
      deleteSelected()
      event.preventDefault()
    } else if (event.key.toLowerCase() === "z" && (event.ctrlKey || event.metaKey)) {
      undo()
      event.preventDefault()
    }
  }

  function deleteSelected() {
    if (!selectedId) return
    state = state.filter(shape => shape.id !== selectedId)
    selectedId = null
    commit()
    render()
  }

  function undo() {
    const previous = history.undo()
    if (!previous) return
    state = previous
    selectedId = null
    draft = null
    drag = null
    onChange(clone(state))
    render()
  }

  svg.addEventListener("pointerdown", onPointerDown)
  svg.addEventListener("pointermove", onPointerMove)
  svg.addEventListener("pointerup", onPointerUp)
  svg.addEventListener("pointercancel", onPointerUp)
  svg.addEventListener("input", onInput)
  svg.addEventListener("focusout", onFocusOut)
  container.addEventListener("keydown", onKeyDown)
  render()

  return {
    setTool(next) {
      if (!TOOLS.includes(next)) throw new Error(`Unknown tool: ${next}`)
      tool = next
      render()
    },
    getTool: () => tool,
    getAnnotations: () => clone(state),
    getSelectedId: () => selectedId,
    deleteSelected,
    undo,
    destroy() {
      container.removeEventListener("keydown", onKeyDown)
      container.innerHTML = ""
      container.classList.remove("harness-annotator")
    },
  }
}
```

- [ ] **Step 5: Add the editor styles**

Append to `src/styles.css`:

```css
/* Annotation editor */
.harness-annotator {
  position: relative;
  display: inline-block;
  line-height: 0;
  touch-action: none;
  user-select: none;
  outline: none;
}

.harness-annotator img {
  display: block;
  max-width: 100%;
  height: auto;
}

.harness-annotator-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.harness-annotator-svg[data-tool="pen"],
.harness-annotator-svg[data-tool="highlight"] {
  cursor: crosshair;
}

.harness-annotator-svg[data-tool="callout"] {
  cursor: copy;
}

.harness-annotator-svg[data-tool="select"] [data-role="shape"],
.harness-annotator-svg[data-tool="select"] [data-role="box"] {
  cursor: move;
}

.harness-annotator-svg[data-tool="select"] [data-role="anchor"] {
  cursor: crosshair;
}

.harness-callout-text {
  font: 14px/18px sans-serif;
  color: #000;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
  user-select: text;
  cursor: text;
  line-height: 18px;
}
```

- [ ] **Step 6: Export the editor from the fixture entry**

Replace `test/fixtures/entry.js` with:

```js
import "../../src/styles.css"
import { createEditor, TOOLS } from "../../src/annotations/editor.js"

window.harness = {
  version: "phase-1",
  createEditor,
  TOOLS,
}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm run test:browser`

Expected: all editor tests PASS. If the "moves a callout box" test fails on the resize step, re-check the arithmetic: after the box drag the box is at x 160, y 110, w 180, h 64, so the 12px resize handle spans x 328 to 340 and y 162 to 174, and the test presses at (334, 168). If a drag test fails because the element under the pointer is the `<img>`, confirm `.harness-annotator-svg` is absolutely positioned over the image with the CSS above.

- [ ] **Step 8: Commit**

```bash
npm run format
git add src/annotations/editor.js src/styles.css test/fixtures/entry.js test/fixtures/editor.html test/browser/editor.test.js
git commit -m "Add the SVG annotation editor with pen, highlighter, callout, select, undo

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: Flatten annotations onto the image as a PNG

**Files:**
- Create: `src/annotations/flatten.js`, `test/fixtures/pixel.js`, `test/fixtures/flatten.html`, `test/browser/flatten.test.js`
- Modify: `test/fixtures/entry.js`

**Interfaces:**
- Consumes: `renderTree`, `toSvgString` from Task 6.
- Produces: `flattenToPng({ imageUrl, imageSize, annotations }) → Promise<Blob>` (type `image/png`, same pixel size as `imageSize`) and `loadImage(url) → Promise<HTMLImageElement>`. Also the test-only helper `pixelAt(blob, x, y) → Promise<{ r, g, b, a, width, height }>` on `window.harness`.

- [ ] **Step 1: Write the pixel helper and the fixture**

`test/fixtures/pixel.js`:

```js
// Test-only helper: read one pixel (and the size) of an image blob.
export async function pixelAt(blob, x, y) {
  const bitmap = await createImageBitmap(blob)
  const canvas = document.createElement("canvas")
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const context = canvas.getContext("2d")
  context.drawImage(bitmap, 0, 0)
  const [r, g, b, a] = context.getImageData(x, y, 1, 1).data
  return { r, g, b, a, width: bitmap.width, height: bitmap.height }
}
```

`test/fixtures/flatten.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/test/fixtures/build/entry.css" />
  </head>
  <body>
    <script type="module">
      import "/test/fixtures/build/entry.js"

      const canvas = document.createElement("canvas")
      canvas.width = 400
      canvas.height = 300
      const context = canvas.getContext("2d")
      context.fillStyle = "#dddddd"
      context.fillRect(0, 0, 400, 300)
      window.imageUrl = canvas.toDataURL()
      window.fixtureReady = true
    </script>
  </body>
</html>
```

- [ ] **Step 2: Write the failing test**

`test/browser/flatten.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

test("flattenToPng draws the image and the annotations into a PNG", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/flatten.html`)
    await page.waitForFunction(() => window.fixtureReady === true)

    const result = await page.evaluate(async () => {
      const { flattenToPng, pixelAt } = window.harness
      const blob = await flattenToPng({
        imageUrl: window.imageUrl,
        imageSize: { width: 400, height: 300 },
        annotations: [
          { id: "p", type: "pen", points: [[0, 150], [400, 150]] },
          {
            id: "c",
            type: "callout",
            anchor: [50, 250],
            box: { x: 200, y: 200, w: 150, h: 60 },
            text: "note",
          },
        ],
      })
      return {
        type: blob.type,
        onStroke: await pixelAt(blob, 200, 150),
        offStroke: await pixelAt(blob, 200, 20),
        inBox: await pixelAt(blob, 330, 250),
      }
    })

    assert.equal(result.type, "image/png")
    assert.equal(result.onStroke.width, 400)
    assert.equal(result.onStroke.height, 300)
    assert.ok(result.onStroke.r > 200 && result.onStroke.g < 100, `stroke pixel ${JSON.stringify(result.onStroke)}`)
    assert.ok(result.offStroke.r > 215 && result.offStroke.r < 227, `background pixel ${JSON.stringify(result.offStroke)}`)
    assert.ok(result.inBox.r > 250 && result.inBox.g > 250 && result.inBox.b > 250, `box pixel ${JSON.stringify(result.inBox)}`)
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm run test:browser`

Expected: FAIL, `flattenToPng is not a function`.

- [ ] **Step 4: Write flatten and export it**

`src/annotations/flatten.js`:

```js
import { renderTree, toSvgString } from "./render.js"

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Could not load image: ${url.slice(0, 80)}`))
    image.src = url
  })
}

export async function flattenToPng({ imageUrl, imageSize, annotations }) {
  const canvas = document.createElement("canvas")
  canvas.width = imageSize.width
  canvas.height = imageSize.height
  const context = canvas.getContext("2d")

  const base = await loadImage(imageUrl)
  context.drawImage(base, 0, 0, imageSize.width, imageSize.height)

  const svgString = toSvgString(renderTree(annotations, imageSize, { mode: "static" }))
  const svgUrl = URL.createObjectURL(new Blob([svgString], { type: "image/svg+xml;charset=utf-8" }))
  try {
    const overlay = await loadImage(svgUrl)
    context.drawImage(overlay, 0, 0)
  } finally {
    URL.revokeObjectURL(svgUrl)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error("Could not encode PNG"))), "image/png")
  })
}
```

Replace `test/fixtures/entry.js` with:

```js
import "../../src/styles.css"
import { createEditor, TOOLS } from "../../src/annotations/editor.js"
import { flattenToPng } from "../../src/annotations/flatten.js"
import { pixelAt } from "./pixel.js"

window.harness = {
  version: "phase-1",
  createEditor,
  TOOLS,
  flattenToPng,
  pixelAt,
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm run test:browser`

Expected: PASS. If the stroke pixel is gray, the SVG overlay did not draw: check that `toSvgString` output starts with `<svg xmlns=` (the `xmlns` attribute is required for an SVG blob to load as an image).

- [ ] **Step 6: Commit**

```bash
npm run format
git add src/annotations/flatten.js test/fixtures/pixel.js test/fixtures/flatten.html test/fixtures/entry.js test/browser/flatten.test.js
git commit -m "Flatten annotations onto the screenshot as a PNG

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: Viewport capture

**Files:**
- Create: `src/capture.js`, `test/fixtures/capture.html`, `test/browser/capture.test.js`
- Modify: `test/fixtures/entry.js`

**Interfaces:**
- Consumes: `domToCanvas` from `modern-screenshot` (or html2canvas if Spike B said so; keep the same signature below).
- Produces: `captureViewport({ scale, exclude = "[data-harness-chrome]", quality = 0.85 }) → Promise<{ blob, url, width, height, scale }>` where `width`/`height` are the image's pixel size (viewport size times `scale`), `url` is an object URL of `blob`, and `blob.type` is `image/webp` in Chromium. `CHROME_SELECTOR = "[data-harness-chrome]"`.

- [ ] **Step 1: Write the fixture**

`test/fixtures/capture.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/test/fixtures/build/entry.css" />
    <style>
      body {
        margin: 0;
      }
      #red {
        position: absolute;
        left: 0;
        top: 0;
        width: 300px;
        height: 200px;
        background: #ff0000;
      }
      #chrome {
        position: fixed;
        left: 0;
        top: 0;
        width: 50px;
        height: 50px;
        background: #0000ff;
      }
      #green {
        position: absolute;
        left: 0;
        top: 1000px;
        width: 300px;
        height: 200px;
        background: #00ff00;
      }
      #spacer {
        height: 1400px;
      }
    </style>
  </head>
  <body>
    <div id="red"></div>
    <div id="chrome" data-harness-chrome></div>
    <div id="green"></div>
    <div id="spacer"></div>
    <script type="module">
      import "/test/fixtures/build/entry.js"
      window.fixtureReady = true
    </script>
  </body>
</html>
```

- [ ] **Step 2: Write the failing tests**

`test/browser/capture.test.js`:

```js
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
    assert.ok(result.corner.r > 200 && result.corner.b < 80, `expected red, got ${JSON.stringify(result.corner)}`)
    assert.ok(result.middle.r > 240 && result.middle.g > 240 && result.middle.b > 240, `expected white, got ${JSON.stringify(result.middle)}`)
  })
})

test("captures the scrolled viewport, not the top of the page", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/capture.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    await page.evaluate(() => window.scrollTo(0, 1000))
    const result = await capture(page)
    assert.ok(result.corner.g > 200 && result.corner.r < 80, `expected green, got ${JSON.stringify(result.corner)}`)
  })
})
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm run test:browser`

Expected: FAIL, `captureViewport is not a function`.

- [ ] **Step 4: Write capture and export it**

`src/capture.js`:

```js
import { domToCanvas } from "modern-screenshot"

export const CHROME_SELECTOR = "[data-harness-chrome]"

export async function captureViewport({
  scale = Math.min(window.devicePixelRatio || 1, 2),
  exclude = CHROME_SELECTOR,
  quality = 0.85,
} = {}) {
  const root = document.documentElement
  const full = await domToCanvas(root, {
    scale,
    backgroundColor: "#ffffff",
    width: root.scrollWidth,
    height: root.scrollHeight,
    filter: node => !(node instanceof Element && node.matches(exclude)),
  })

  const width = Math.round(window.innerWidth * scale)
  const height = Math.round(window.innerHeight * scale)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext("2d")
  context.fillStyle = "#ffffff"
  context.fillRect(0, 0, width, height)
  context.drawImage(
    full,
    Math.round(window.scrollX * scale),
    Math.round(window.scrollY * scale),
    width,
    height,
    0,
    0,
    width,
    height,
  )

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      result => (result ? resolve(result) : reject(new Error("Could not encode screenshot"))),
      "image/webp",
      quality,
    )
  })

  return { blob, url: URL.createObjectURL(blob), width, height, scale }
}
```

Add to `test/fixtures/entry.js` the import `import { captureViewport } from "../../src/capture.js"` and the property `captureViewport` on `window.harness`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run test:browser`

Expected: PASS. If the scrolled test shows red instead of green, the library ignored the `height` option and rendered only the first viewport; pass `document.body` instead of `document.documentElement` and rerun. If the corner is blue, the `filter` did not exclude the chrome element; log the nodes the filter receives to confirm it sees elements, not only text nodes.

- [ ] **Step 6: Commit**

```bash
npm run format
git add src/capture.js test/fixtures/capture.html test/fixtures/entry.js test/browser/capture.test.js
git commit -m "Capture the visible viewport as a WebP, excluding harness chrome

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11: GuidedTrack embed module and the GT stub

**Files:**
- Create: `src/gt-embed.js`, `test/fixtures/gt-stub/jquery_gt.js`, `test/fixtures/gt-stub/bootstrap.min.js`, `test/fixtures/gt-stub/gt_interpreter.js`, `test/fixtures/gt-stub/bootstrap.css`, `test/fixtures/gt-stub/guidedtrack.css`, `test/fixtures/embed.html`, `test/browser/embed.test.js`
- Modify: `test/fixtures/entry.js`

**Interfaces:**
- Produces:
  - `GT_ASSET_BASE = "https://www.guidedtrack.com/assets"`, `REFUSAL_TEXT = "This page is not set up to run this program."`
  - `containerMarkup(key, mode) → string` (verbatim GT container markup)
  - `createEmitter() → { on(name, fn) → unsubscribe, off(name, fn), emit(name, ...args) }` (pure, usable in Node)
  - `mountProgram({ root, key, mode = "run", assetBase = GT_ASSET_BASE, onRefused }) → Promise<{ container, events, unmount() }>`. `events` emits `pageStart`, `append`, `pageEnd`, `done` (no payload) and `trace` with `{ from, to, program }`. Rejects if a GT script fails to load.
  - The stub at `/test/fixtures/gt-stub/` imitates GT: it renders two pages into `.main`, fires the same jQuery events, exposes a fake `window.data`, and renders the refusal text when the key is `refused`.

- [ ] **Step 1: Write the GT stub**

`test/fixtures/gt-stub/jquery_gt.js` (a minimal jQuery that supports only `jQuery(window).on/one/off/trigger`, which is all GT's event relay uses):

```js
;(function () {
  var handlers = {}

  function jQuery() {
    return {
      on: function (name, fn) {
        ;(handlers[name] = handlers[name] || []).push(fn)
        return this
      },
      one: function (name, fn) {
        var self = this
        var wrapped = function () {
          self.off(name, wrapped)
          fn.apply(null, arguments)
        }
        return this.on(name, wrapped)
      },
      off: function (name, fn) {
        if (!fn) {
          delete handlers[name]
          return this
        }
        handlers[name] = (handlers[name] || []).filter(function (h) {
          return h !== fn
        })
        return this
      },
      trigger: function (name, data) {
        var list = (handlers[name] || []).slice()
        var event = { type: name }
        list.forEach(function (fn) {
          fn(event, data)
        })
        return this
      },
    }
  }

  window.jQuery = window.$ = jQuery
})()
```

`test/fixtures/gt-stub/bootstrap.min.js`:

```js
// Stub: the real bootstrap.min.js is not needed by the fake interpreter.
```

`test/fixtures/gt-stub/bootstrap.css` and `test/fixtures/gt-stub/guidedtrack.css`:

```css
/* Stub stylesheet */
```

`test/fixtures/gt-stub/gt_interpreter.js`:

```js
;(function () {
  var $ = window.jQuery
  var container = document.querySelector(".program_container")
  var main = container.querySelector(".main")
  var key = container.id

  var pages = [
    {
      lines: [
        { from: 1, to: 3, program: "main" },
        { from: 10, to: 12, program: "main" },
      ],
      html: '<p>Welcome to the stub program.</p><button class="btn next" type="button">Next</button>',
    },
    {
      lines: [{ from: 20, to: 24, program: "helper" }],
      html: "<p>Second page.</p><p>Thanks!</p>",
    },
  ]

  window.data = {
    get: function (field) {
      return { run_id: "run-123", current_program_name: "main" }[field]
    },
    node: function () {
      return "node-abc"
    },
    export_heap: function () {
      return { name: "Alice", score: 42 }
    },
  }

  function show(index) {
    var page = pages[index]
    $(window).trigger("guidedtrack:pageStart")
    main.innerHTML = page.html
    page.lines.forEach(function (line) {
      $(window).trigger("guidedtrack:trace", { detail: line })
    })
    $(window).trigger("guidedtrack:append")
    var next = main.querySelector(".next")
    if (next) {
      next.addEventListener("click", function () {
        show(index + 1)
      })
    }
    setTimeout(function () {
      $(window).trigger("guidedtrack:pageEnd")
    }, 0)
  }

  if (key === "refused") {
    main.innerHTML =
      '<div class="loading-message">This page is not set up to run this program.</div>'
    return
  }

  main.setAttribute("data-stub-mode", container.dataset.mode || "")
  setTimeout(function () {
    show(0)
  }, 0)
})()
```

- [ ] **Step 2: Write the fixture and the failing tests**

`test/fixtures/embed.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/test/fixtures/build/entry.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import "/test/fixtures/build/entry.js"
      window.fixtureReady = true
    </script>
  </body>
</html>
```

`test/browser/embed.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

async function mount(page, key, mode) {
  return page.evaluate(
    async ({ key, mode }) => {
      window.events = []
      window.refused = 0
      const mounted = await window.harness.mountProgram({
        root: document.getElementById("root"),
        key,
        mode,
        assetBase: "/test/fixtures/gt-stub",
        onRefused: () => window.refused++,
      })
      for (const name of ["pageStart", "trace", "append", "pageEnd"]) {
        mounted.events.on(name, detail => window.events.push({ name, detail: detail ?? null }))
      }
      return mounted.container.outerHTML.slice(0, 200)
    },
    { key, mode },
  )
}

test("mounts the GT container, loads assets, and relays events", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/embed.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    await mount(page, "abc1234", "test")

    await page.waitForSelector(".program_container .main p")
    assert.equal(await page.locator("#abc1234.guidedtrack.program_container[data-mode=test]").count(), 1)
    assert.equal(await page.locator("#program_navigation #back-button").count(), 1)
    assert.equal(await page.locator('link[href="/test/fixtures/gt-stub/guidedtrack.css"]').count(), 1)
    assert.equal(await page.locator('link[href="/test/fixtures/gt-stub/bootstrap.css"]').count(), 1)
    assert.match(await page.locator(".program_container .main").innerText(), /Welcome/)

    await page.waitForFunction(() => window.events.some(e => e.name === "pageEnd"))
    const events = await page.evaluate(() => window.events)
    assert.deepEqual(
      events.map(e => e.name),
      ["pageStart", "trace", "trace", "append", "pageEnd"],
    )
    assert.deepEqual(events[1].detail, { from: 1, to: 3, program: "main" })

    await page.click(".program_container .main .next")
    await page.waitForFunction(() => window.events.filter(e => e.name === "pageEnd").length === 2)
    const second = await page.evaluate(() => window.events.slice(5))
    assert.deepEqual(second.map(e => e.name), ["pageStart", "trace", "append", "pageEnd"])
    assert.deepEqual(second[1].detail, { from: 20, to: 24, program: "helper" })
  })
})

test("run mode omits data-mode", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/embed.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    await mount(page, "abc1234", "run")
    assert.equal(await page.locator("#abc1234.program_container[data-mode]").count(), 0)
    assert.equal(await page.locator("#abc1234.program_container").count(), 1)
  })
})

test("reports a refused embed", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/embed.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    await mount(page, "refused", "test")
    await page.waitForFunction(() => window.refused === 1)
    assert.match(await page.locator(".program_container").innerText(), /not set up to run/)
  })
})

test("rejects when a GT script cannot load", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.goto(`${baseUrl}/test/fixtures/embed.html`)
    await page.waitForFunction(() => window.fixtureReady === true)
    const message = await page.evaluate(async () => {
      try {
        await window.harness.mountProgram({
          root: document.getElementById("root"),
          key: "abc1234",
          assetBase: "/test/fixtures/does-not-exist",
        })
        return "resolved"
      } catch (error) {
        return error.message
      }
    })
    assert.match(message, /Failed to load/)
  })
})
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm run test:browser`

Expected: FAIL, `mountProgram is not a function`.

- [ ] **Step 4: Write the embed module and export it**

`src/gt-embed.js`:

```js
export const GT_ASSET_BASE = "https://www.guidedtrack.com/assets"
export const REFUSAL_TEXT = "This page is not set up to run this program."

const STYLESHEETS = ["bootstrap.css", "guidedtrack.css"]
const SCRIPTS = ["jquery_gt.js", "bootstrap.min.js", "gt_interpreter.js"]
const EVENTS = ["pageStart", "append", "pageEnd", "done", "trace"]

// Copied from temp/guidedtrack-web/app/views/programs/_program_container.html.erb.
export function containerMarkup(key, mode) {
  const modeAttribute = mode === "test" ? ' data-mode="test"' : ""
  return `<div class="guidedtrack program_container" id="${escapeAttr(key)}" data-environment="production"${modeAttribute}>
  <div id="program_navigation" role="banner">
    <div id="back-button"></div>
    <div class="navigation_container" role="navigation"></div>
    <div id="run-menu" role="navigation"></div>
    <div class="points" role="complementary" aria-label="points" aria-live="assertive">
      <div class="total"></div>
      <div class="change"></div>
    </div>
  </div>
  <div class="maintain" role="status" aria-label="note" aria-live="polite"></div>
  <div class="main" role="main" aria-live="polite"></div>
</div>`
}

export function createEmitter() {
  const handlers = {}
  const off = (name, fn) => {
    handlers[name] = (handlers[name] || []).filter(handler => handler !== fn)
  }
  return {
    on(name, fn) {
      ;(handlers[name] ||= []).push(fn)
      return () => off(name, fn)
    },
    off,
    emit(name, ...args) {
      for (const fn of handlers[name] || []) fn(...args)
    },
  }
}

export async function mountProgram({
  root,
  key,
  mode = "run",
  assetBase = GT_ASSET_BASE,
  onRefused = () => {},
}) {
  const events = createEmitter()
  root.innerHTML = containerMarkup(key, mode)
  const container = root.querySelector(".program_container")

  const observer = new MutationObserver(() => {
    if (container.textContent.includes(REFUSAL_TEXT)) {
      observer.disconnect()
      onRefused()
    }
  })
  observer.observe(container, { childList: true, subtree: true, characterData: true })

  for (const file of STYLESHEETS) loadStylesheet(`${assetBase}/${file}`)

  await loadScript(`${assetBase}/${SCRIPTS[0]}`)
  relayEvents(events)
  for (const file of SCRIPTS.slice(1)) await loadScript(`${assetBase}/${file}`)

  return {
    container,
    events,
    unmount() {
      observer.disconnect()
    },
  }
}

function relayEvents(events) {
  const $ = window.jQuery
  for (const name of EVENTS) {
    $(window).on(`guidedtrack:${name}`, (_event, options) => {
      events.emit(name, options && options.detail !== undefined ? options.detail : options)
    })
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = src
    script.async = false
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = href
  document.head.appendChild(link)
}

function escapeAttr(text) {
  return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
}
```

Add to `test/fixtures/entry.js`: `import { mountProgram, createEmitter } from "../../src/gt-embed.js"` and the properties `mountProgram`, `createEmitter` on `window.harness`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run test:browser`

Expected: PASS. If the event order assertion fails because `pageEnd` arrives before `append`, the stub is wrong, not the module: `pageEnd` is deferred with `setTimeout` in the stub exactly because GT defers it too.

- [ ] **Step 6: Commit**

```bash
npm run format
git add src/gt-embed.js test/fixtures/gt-stub test/fixtures/embed.html test/fixtures/entry.js test/browser/embed.test.js
git commit -m "Add the GuidedTrack embed module with event relay, refusal detection, and a test stub

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 12: Context tracker

**Files:**
- Create: `src/context.js`, `test/unit/context.test.js`

**Interfaces:**
- Consumes: an emitter with `on(name, fn)` (Task 11's `createEmitter`).
- Produces: `createContextTracker(events, { getData, getViewport, getUserAgent, now }) → { lines, snapshot() }` where `snapshot()` returns `{ lines: [{ from, to, program }], runId, programName, nodeId, variables, variablesTruncated, viewport: { width, height }, userAgent, capturedAt }`; `capVariables(variables, limit = VARIABLES_LIMIT) → { variables, truncated }`; `VARIABLES_LIMIT = 100000`.

- [ ] **Step 1: Write the failing tests**

`test/unit/context.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { createContextTracker, capVariables, VARIABLES_LIMIT } from "../../src/context.js"
import { createEmitter } from "../../src/gt-embed.js"

const fakeData = {
  get: field => ({ run_id: "run-123", current_program_name: "main" })[field],
  node: () => "node-abc",
  export_heap: () => ({ name: "Alice", score: 42 }),
}

function tracker(events, getData = () => fakeData) {
  return createContextTracker(events, {
    getData,
    getViewport: () => ({ width: 800, height: 600 }),
    getUserAgent: () => "TestAgent/1.0",
    now: () => "2026-10-15T12:00:00.000Z",
  })
}

test("collects trace lines for the current page and resets on pageStart", () => {
  const events = createEmitter()
  const context = tracker(events)
  events.emit("pageStart")
  events.emit("trace", { from: 1, to: 3, program: "main" })
  events.emit("trace", { from: 10, to: 12, program: "main" })
  assert.deepEqual(context.lines, [
    { from: 1, to: 3, program: "main" },
    { from: 10, to: 12, program: "main" },
  ])
  events.emit("pageStart")
  assert.deepEqual(context.lines, [])
})

test("ignores traces without a numeric from", () => {
  const events = createEmitter()
  const context = tracker(events)
  events.emit("trace", undefined)
  events.emit("trace", { program: "main" })
  assert.deepEqual(context.lines, [])
})

test("snapshot assembles run state and environment", () => {
  const events = createEmitter()
  const context = tracker(events)
  events.emit("trace", { from: 1, to: 3, program: "main" })
  assert.deepEqual(context.snapshot(), {
    lines: [{ from: 1, to: 3, program: "main" }],
    runId: "run-123",
    programName: "main",
    nodeId: "node-abc",
    variables: { name: "Alice", score: 42 },
    variablesTruncated: false,
    viewport: { width: 800, height: 600 },
    userAgent: "TestAgent/1.0",
    capturedAt: "2026-10-15T12:00:00.000Z",
  })
})

test("snapshot survives missing or throwing run data", () => {
  const events = createEmitter()
  const missing = tracker(events, () => undefined).snapshot()
  assert.equal(missing.runId, null)
  assert.deepEqual(missing.variables, {})
  const throwing = tracker(events, () => {
    throw new Error("boom")
  }).snapshot()
  assert.equal(throwing.nodeId, null)
})

test("capVariables keeps whole variables until the limit and flags truncation", () => {
  const big = { a: "x".repeat(40), b: "y".repeat(40) }
  assert.deepEqual(capVariables(big, 60), { variables: { a: "x".repeat(40) }, truncated: true })
  assert.deepEqual(capVariables({ a: 1 }, VARIABLES_LIMIT), { variables: { a: 1 }, truncated: false })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL, cannot find `src/context.js`.

- [ ] **Step 3: Write the tracker**

`src/context.js`:

```js
export const VARIABLES_LIMIT = 100000

export function createContextTracker(
  events,
  {
    getData = () => window.data,
    getViewport = () => ({ width: window.innerWidth, height: window.innerHeight }),
    getUserAgent = () => navigator.userAgent,
    now = () => new Date().toISOString(),
  } = {},
) {
  let lines = []

  events.on("pageStart", () => {
    lines = []
  })

  events.on("trace", detail => {
    if (detail && typeof detail.from === "number") {
      lines.push({ from: detail.from, to: detail.to, program: detail.program })
    }
  })

  return {
    get lines() {
      return lines.slice()
    },
    snapshot() {
      const data = safely(getData)
      const heap = safely(() => data.export_heap()) || {}
      const { variables, truncated } = capVariables(heap)
      return {
        lines: lines.slice(),
        runId: safely(() => data.get("run_id")) ?? null,
        programName: safely(() => data.get("current_program_name")) ?? null,
        nodeId: safely(() => data.node()) ?? null,
        variables,
        variablesTruncated: truncated,
        viewport: getViewport(),
        userAgent: getUserAgent(),
        capturedAt: now(),
      }
    },
  }
}

export function capVariables(variables, limit = VARIABLES_LIMIT) {
  const kept = {}
  let size = 2
  let truncated = false
  for (const [name, value] of Object.entries(variables)) {
    const entry = JSON.stringify({ [name]: value }) || "{}"
    if (size + entry.length > limit) {
      truncated = true
      break
    }
    kept[name] = value
    size += entry.length
  }
  return { variables: kept, truncated }
}

function safely(fn) {
  try {
    return fn()
  } catch {
    return undefined
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
npm run format
git add src/context.js test/unit/context.test.js
git commit -m "Track rendered source lines and snapshot run context

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 13: Floating controls and the feedback modal

**Files:**
- Create: `src/controls.js`, `src/feedback-modal.js`, `test/fixtures/modal.html`, `test/browser/modal.test.js`
- Modify: `src/styles.css`, `test/fixtures/entry.js`

**Interfaces:**
- Consumes: `createEditor`, `TOOLS` from Task 8.
- Produces:
  - `createControls({ root, onFeedback, name = null }) → { element, setBusy(boolean), remove() }`. `name` is `{ value, onChange(trimmedValue) }` or `null` to hide the field. The element carries `data-harness-chrome`.
  - `openFeedbackModal({ image: { url, width, height }, onSend, onCancel, root = document.body }) → { close(), editor, element }`. `onSend({ annotations, text })` returns a promise; on rejection the modal stays open, shows the error, and the send button reads "Retry". The overlay carries `data-harness-chrome`.
  - `TOOL_LABELS` and `HINTS` maps keyed by tool name.

- [ ] **Step 1: Write the fixture**

`test/fixtures/modal.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/test/fixtures/build/entry.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import "/test/fixtures/build/entry.js"

      const canvas = document.createElement("canvas")
      canvas.width = 400
      canvas.height = 300
      canvas.getContext("2d").fillRect(0, 0, 400, 300)
      window.image = { url: canvas.toDataURL(), width: 400, height: 300 }

      window.sent = []
      window.cancelled = 0
      window.failNext = false
      window.openModal = () => {
        window.modal = window.harness.openFeedbackModal({
          image: window.image,
          onSend: async payload => {
            window.sent.push(payload)
            if (window.failNext) {
              window.failNext = false
              throw new Error("network down")
            }
          },
          onCancel: () => window.cancelled++,
        })
      }

      window.clicks = 0
      window.names = []
      window.fixtureReady = true
    </script>
  </body>
</html>
```

- [ ] **Step 2: Write the failing tests**

`test/browser/modal.test.js`:

```js
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
    assert.equal(await page.locator(".harness-modal[data-harness-chrome]").count(), 1)
    assert.equal(await page.locator(".harness-toolbar [data-tool]").count(), 4)
    assert.equal(await page.locator('[data-tool="pen"][aria-pressed="true"]').count(), 1)
    assert.equal(await page.locator(".harness-hint").innerText(), "Draw on the screenshot.")
    assert.equal(await page.evaluate(() => window.modal.editor.getTool()), "pen")
  })
})

test("switching tools updates the editor, button state, and hint", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await open(page, baseUrl)
    await page.click('[data-tool="callout"]')
    assert.equal(await page.evaluate(() => window.modal.editor.getTool()), "callout")
    assert.equal(await page.locator('[data-tool="callout"][aria-pressed="true"]').count(), 1)
    assert.equal(await page.locator('[data-tool="pen"][aria-pressed="true"]').count(), 0)
    assert.equal(await page.locator(".harness-hint").innerText(), "Click where the note should point.")
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
    assert.match(await page.locator(".harness-error").innerText(), /network down/)
    assert.equal(await page.locator('[data-action="send"]').innerText(), "Retry")
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
    assert.equal(await page.locator(".harness-controls[data-harness-chrome]").count(), 1)
    assert.match(await page.locator(".harness-feedback-button").innerText(), /Give feedback/)
    await page.click(".harness-feedback-button")
    assert.equal(await page.evaluate(() => window.clicks), 1)

    assert.equal(await page.inputValue(".harness-name input"), "Bob")
    await page.fill(".harness-name input", "  Alice  ")
    await page.press(".harness-name input", "Tab")
    assert.deepEqual(await page.evaluate(() => window.names), ["Alice"])

    await page.evaluate(() => window.controls.setBusy(true))
    assert.equal(await page.locator(".harness-feedback-button:disabled").count(), 1)
  })
})
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm run test:browser`

Expected: FAIL, `openFeedbackModal is not a function`.

- [ ] **Step 4: Write the controls**

`src/controls.js`:

```js
export function createControls({ root, onFeedback, name = null }) {
  const element = document.createElement("div")
  element.className = "harness-controls"
  element.setAttribute("data-harness-chrome", "")
  element.innerHTML = `
    <button type="button" class="harness-feedback-button">
      <span class="harness-feedback-icon" aria-hidden="true">&#x1F4AC;</span>
      <span class="harness-feedback-label">Give feedback</span>
    </button>
    ${
      name
        ? '<label class="harness-name"><span>Your name (optional)</span><input type="text" placeholder="Name" /></label>'
        : ""
    }
  `

  const button = element.querySelector(".harness-feedback-button")
  button.addEventListener("click", () => onFeedback())

  if (name) {
    const input = element.querySelector("input")
    input.value = name.value || ""
    input.addEventListener("change", () => name.onChange(input.value.trim()))
  }

  root.appendChild(element)

  return {
    element,
    setBusy(busy) {
      button.disabled = busy
    },
    remove() {
      element.remove()
    },
  }
}
```

- [ ] **Step 5: Write the modal**

`src/feedback-modal.js`:

```js
import { createEditor, TOOLS } from "./annotations/editor.js"

export const TOOL_LABELS = {
  select: "Select",
  pen: "Pen",
  highlight: "Highlighter",
  callout: "Note",
}

export const HINTS = {
  select: "Click a mark to select it. Drag to move it. Press Delete to remove it.",
  pen: "Draw on the screenshot.",
  highlight: "Drag to highlight.",
  callout: "Click where the note should point.",
}

export function openFeedbackModal({ image, onSend, onCancel = () => {}, root = document.body }) {
  const overlay = document.createElement("div")
  overlay.className = "harness-modal"
  overlay.setAttribute("data-harness-chrome", "")
  overlay.innerHTML = `
    <div class="harness-modal-dialog" role="dialog" aria-modal="true" aria-label="Give feedback">
      <div class="harness-toolbar">
        ${TOOLS.map(
          tool => `<button type="button" data-tool="${tool}" aria-pressed="false">${TOOL_LABELS[tool]}</button>`,
        ).join("")}
        <span class="harness-toolbar-spacer"></span>
        <button type="button" data-action="undo">Undo</button>
        <button type="button" data-action="delete">Delete</button>
      </div>
      <p class="harness-hint"></p>
      <div class="harness-editor"></div>
      <textarea class="harness-text" rows="3" placeholder="Anything else? Type your feedback here."></textarea>
      <p class="harness-error" hidden></p>
      <div class="harness-actions">
        <button type="button" data-action="cancel">Cancel</button>
        <button type="button" data-action="send" class="harness-primary">Send feedback</button>
      </div>
    </div>`
  root.appendChild(overlay)

  const editor = createEditor({ container: overlay.querySelector(".harness-editor"), image })
  const hint = overlay.querySelector(".harness-hint")
  const error = overlay.querySelector(".harness-error")
  const sendButton = overlay.querySelector('[data-action="send"]')
  const textarea = overlay.querySelector(".harness-text")

  function setTool(tool) {
    editor.setTool(tool)
    for (const button of overlay.querySelectorAll("[data-tool]")) {
      button.setAttribute("aria-pressed", String(button.dataset.tool === tool))
    }
    hint.textContent = HINTS[tool]
  }

  function close() {
    editor.destroy()
    overlay.remove()
  }

  for (const button of overlay.querySelectorAll("[data-tool]")) {
    button.addEventListener("click", () => setTool(button.dataset.tool))
  }
  overlay.querySelector('[data-action="undo"]').addEventListener("click", () => editor.undo())
  overlay
    .querySelector('[data-action="delete"]')
    .addEventListener("click", () => editor.deleteSelected())
  overlay.querySelector('[data-action="cancel"]').addEventListener("click", () => {
    close()
    onCancel()
  })

  sendButton.addEventListener("click", async () => {
    sendButton.disabled = true
    sendButton.textContent = "Sending…"
    error.hidden = true
    try {
      await onSend({ annotations: editor.getAnnotations(), text: textarea.value.trim() })
      close()
    } catch (failure) {
      error.textContent = `Could not send: ${failure.message}`
      error.hidden = false
      sendButton.disabled = false
      sendButton.textContent = "Retry"
    }
  })

  setTool("pen")
  return { close, editor, element: overlay }
}
```

- [ ] **Step 6: Add the styles and the fixture exports**

Append to `src/styles.css`:

```css
/* Floating controls */
.harness-controls {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  font-family: system-ui, sans-serif;
}

.harness-feedback-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 0;
  border-radius: 999px;
  background: var(--harness-accent);
  color: #fff;
  font: 600 15px system-ui, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.harness-feedback-button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.harness-name {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  color: #555;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 8px;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.harness-name input {
  font: 14px system-ui, sans-serif;
  padding: 4px 6px;
  border: 1px solid #bbb;
  border-radius: 4px;
  width: 160px;
}

/* Feedback modal */
.harness-modal {
  position: fixed;
  inset: 0;
  z-index: 2147483001;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
}

.harness-modal-dialog {
  background: #fff;
  color: var(--harness-text);
  border-radius: 8px;
  width: 100%;
  max-width: 1100px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  box-sizing: border-box;
}

.harness-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.harness-toolbar-spacer {
  flex: 1;
}

.harness-toolbar button,
.harness-actions button {
  font: 14px system-ui, sans-serif;
  padding: 6px 12px;
  border: 1px solid #bbb;
  border-radius: 6px;
  background: #f6f6f6;
  color: var(--harness-text);
  cursor: pointer;
}

.harness-toolbar button[aria-pressed="true"],
.harness-primary {
  background: var(--harness-accent);
  border-color: var(--harness-accent);
  color: #fff;
}

.harness-actions button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.harness-hint {
  margin: 0;
  font-size: 13px;
  color: #555;
  min-height: 1.2em;
}

.harness-editor {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background: #eee;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.harness-editor .harness-annotator {
  max-width: 100%;
}

.harness-text {
  font: 14px system-ui, sans-serif;
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 6px;
  resize: vertical;
}

.harness-error {
  margin: 0;
  color: var(--harness-danger);
  font-size: 13px;
}

.harness-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

@media (max-width: 600px) {
  .harness-feedback-label,
  .harness-name span {
    display: none;
  }

  .harness-feedback-button {
    padding: 12px;
  }

  .harness-name input {
    width: 110px;
  }

  .harness-modal {
    padding: 0;
  }

  .harness-modal-dialog {
    border-radius: 0;
    max-height: 100vh;
  }

  .harness-text {
    height: 2.4em;
  }

  .harness-text:focus {
    height: 6em;
  }
}
```

Add to `test/fixtures/entry.js`: `import { createControls } from "../../src/controls.js"`, `import { openFeedbackModal } from "../../src/feedback-modal.js"`, and the properties `createControls`, `openFeedbackModal` on `window.harness`.

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm run test:browser`

Expected: PASS. If the "controls" test's name assertion fails, confirm the `change` event fires: Playwright's `press("Tab")` moves focus, which commits the change.

- [ ] **Step 8: Commit**

```bash
npm run format
git add src/controls.js src/feedback-modal.js src/styles.css test/fixtures/entry.js test/fixtures/modal.html test/browser/modal.test.js
git commit -m "Add the floating feedback controls and the annotation modal

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 14: Reviewer and home screens, local send, app entry

**Files:**
- Create: `src/screens/reviewer.js`, `src/screens/home.js`, `src/send-local.js`, `test/unit/send-local.test.js`, `test/unit/reviewer.test.js`, `test/fixtures/reviewer.html`, `test/browser/reviewer.test.js`, `test/browser/home.test.js`
- Modify: `src/main.js`, `src/styles.css`, `test/fixtures/entry.js`

**Interfaces:**
- Consumes: `mountProgram` (Task 11), `createContextTracker` (Task 12), `createControls` and `openFeedbackModal` (Task 13), `captureViewport` (Task 10), `flattenToPng` (Task 9), `parseRoute` (Task 4).
- Produces:
  - `mountReviewer({ root, route, sendFeedback, assetBase, storage = window.localStorage }) → Promise<void>`. `sendFeedback(item)` receives `{ key, mode, image: { url, width, height, blob }, annotations, text, context, reviewerName }` and returns a promise. Phase 2 swaps `sendFeedback` for the Supabase store without touching this screen.
  - `harnessPageUrl(location) → string` (origin plus path, with a trailing `index.html` removed), `renderRefusalBanner(root, url)`, `renderErrorBanner(root, message)`, `NAME_KEY = "harness:reviewer-name"`.
  - `mountHome({ root })`.
  - `feedbackSidecar(item, now) → { createdAt, key, mode, reviewerName, text, annotations, context, imageSize }`, `downloadFeedback(item) → Promise<void>`, `download(blob, filename)`.

- [ ] **Step 1: Write the failing unit tests**

`test/unit/send-local.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { feedbackSidecar } from "../../src/send-local.js"

test("feedbackSidecar keeps everything except the image bytes", () => {
  const item = {
    key: "abc1234",
    mode: "test",
    reviewerName: "Alice",
    text: "Button is misaligned",
    annotations: [{ id: "p", type: "pen", points: [[0, 0]] }],
    context: { lines: [{ from: 1, to: 3, program: "main" }] },
    image: { url: "blob:x", width: 800, height: 600, blob: {} },
  }
  assert.deepEqual(feedbackSidecar(item, () => "2026-10-15T12:00:00.000Z"), {
    createdAt: "2026-10-15T12:00:00.000Z",
    key: "abc1234",
    mode: "test",
    reviewerName: "Alice",
    text: "Button is misaligned",
    annotations: [{ id: "p", type: "pen", points: [[0, 0]] }],
    context: { lines: [{ from: 1, to: 3, program: "main" }] },
    imageSize: { width: 800, height: 600 },
  })
})

test("feedbackSidecar defaults the reviewer name to an empty string", () => {
  const item = { key: "k", mode: "run", text: "", annotations: [], context: {}, image: { width: 1, height: 1 } }
  assert.equal(feedbackSidecar(item).reviewerName, "")
})
```

`test/unit/reviewer.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { harnessPageUrl } from "../../src/screens/reviewer.js"

test("harnessPageUrl is the origin plus path without index.html", () => {
  assert.equal(
    harnessPageUrl({ origin: "https://user.github.io", pathname: "/repo/index.html" }),
    "https://user.github.io/repo/",
  )
  assert.equal(harnessPageUrl({ origin: "https://user.github.io", pathname: "/repo/" }), "https://user.github.io/repo/")
  assert.equal(harnessPageUrl({ origin: "http://localhost:3000", pathname: "/" }), "http://localhost:3000/")
})
```

- [ ] **Step 2: Run the unit tests to verify they fail**

Run: `npm run test:unit`

Expected: FAIL, cannot find `src/send-local.js` and `src/screens/reviewer.js`.

- [ ] **Step 3: Write send-local**

`src/send-local.js`:

```js
import { flattenToPng } from "./annotations/flatten.js"

export function feedbackSidecar(item, now = () => new Date().toISOString()) {
  return {
    createdAt: now(),
    key: item.key,
    mode: item.mode,
    reviewerName: item.reviewerName || "",
    text: item.text,
    annotations: item.annotations,
    context: item.context,
    imageSize: { width: item.image.width, height: item.image.height },
  }
}

// Phase 1 "send": save the flattened PNG and a JSON sidecar to the reviewer's computer.
export async function downloadFeedback(item) {
  const sidecar = feedbackSidecar(item)
  const stamp = sidecar.createdAt.replace(/[:.]/g, "-")
  const png = await flattenToPng({
    imageUrl: item.image.url,
    imageSize: sidecar.imageSize,
    annotations: item.annotations,
  })
  download(png, `feedback-${item.key}-${stamp}.png`)
  download(
    new Blob([JSON.stringify(sidecar, null, 2)], { type: "application/json" }),
    `feedback-${item.key}-${stamp}.json`,
  )
}

export function download(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}
```

- [ ] **Step 4: Write the reviewer screen**

`src/screens/reviewer.js`:

```js
import { mountProgram } from "../gt-embed.js"
import { createContextTracker } from "../context.js"
import { createControls } from "../controls.js"
import { captureViewport } from "../capture.js"
import { openFeedbackModal } from "../feedback-modal.js"

export const NAME_KEY = "harness:reviewer-name"

export async function mountReviewer({
  root,
  route,
  sendFeedback,
  assetBase,
  storage = window.localStorage,
}) {
  root.innerHTML = '<div class="harness-program"></div>'
  const programRoot = root.querySelector(".harness-program")

  let mounted
  try {
    mounted = await mountProgram({
      root: programRoot,
      key: route.key,
      mode: route.mode,
      assetBase,
      onRefused: () => renderRefusalBanner(programRoot),
    })
  } catch (error) {
    renderErrorBanner(programRoot, `Could not load GuidedTrack: ${error.message}`)
    return
  }

  const context = createContextTracker(mounted.events)
  const controls = createControls({
    root,
    onFeedback: giveFeedback,
    name: { value: readName(storage), onChange: value => saveName(storage, value) },
  })

  async function giveFeedback() {
    controls.setBusy(true)
    let image
    try {
      image = await captureViewport()
    } catch (error) {
      console.error("[harness] capture failed", error)
      image = placeholderImage()
    }
    controls.setBusy(false)

    const snapshot = context.snapshot()
    openFeedbackModal({
      image,
      onSend: ({ annotations, text }) =>
        sendFeedback({
          key: route.key,
          mode: route.mode,
          image,
          annotations,
          text,
          context: snapshot,
          reviewerName: readName(storage),
        }),
    })
  }
}

export function harnessPageUrl(location = window.location) {
  return location.origin + location.pathname.replace(/index\.html$/, "")
}

export function renderRefusalBanner(root, url = harnessPageUrl()) {
  root.innerHTML = `
    <div class="harness-banner" role="alert">
      <h2>This program isn't set up for the harness yet</h2>
      <p>On GuidedTrack, open the program's <strong>Publish</strong> page and add this URL to the list of pages allowed to run it:</p>
      <pre class="harness-url"></pre>
      <p>Then <button type="button" class="harness-reload">reload this page</button>.</p>
    </div>`
  root.querySelector(".harness-url").textContent = url
  root.querySelector(".harness-reload").addEventListener("click", () => window.location.reload())
}

export function renderErrorBanner(root, message) {
  root.innerHTML = `
    <div class="harness-banner" role="alert">
      <h2>Something went wrong</h2>
      <p class="harness-message"></p>
    </div>`
  root.querySelector(".harness-message").textContent = message
}

function readName(storage) {
  try {
    return storage.getItem(NAME_KEY) || ""
  } catch {
    return ""
  }
}

function saveName(storage, value) {
  try {
    storage.setItem(NAME_KEY, value)
  } catch {
    // Private mode or blocked storage: the name simply isn't remembered.
  }
}

function placeholderImage() {
  const canvas = document.createElement("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const context = canvas.getContext("2d")
  context.fillStyle = "#e0e0e0"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = "#555"
  context.font = "16px sans-serif"
  context.fillText("Screenshot unavailable. You can still type feedback below.", 20, 40)
  return { url: canvas.toDataURL(), width: canvas.width, height: canvas.height, blob: null }
}
```

- [ ] **Step 5: Write the home screen and the entry**

`src/screens/home.js`:

```js
export function mountHome({ root }) {
  root.innerHTML = `
    <main class="harness-home">
      <h1>GuidedTrack Feedback Harness</h1>
      <p>Enter a program key to run it inside the harness. This version saves each piece of feedback to your computer as a PNG and a JSON file.</p>
      <form class="harness-home-form">
        <label>Program key <input name="key" required pattern="[A-Za-z0-9]+" placeholder="abc1234" autocomplete="off" /></label>
        <fieldset>
          <legend>Mode</legend>
          <label><input type="radio" name="mode" value="test" checked /> Test (a fresh run every load)</label>
          <label><input type="radio" name="mode" value="run" /> Run (continues like a real participant)</label>
        </fieldset>
        <button type="submit">Open</button>
      </form>
    </main>`

  root.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
    const form = new FormData(event.target)
    const params = new URLSearchParams({
      key: String(form.get("key")).trim(),
      mode: String(form.get("mode")),
    })
    window.location.search = `?${params}`
  })
}
```

Replace `src/main.js` with:

```js
import "./styles.css"
import { parseRoute } from "./router.js"
import { mountReviewer } from "./screens/reviewer.js"
import { mountHome } from "./screens/home.js"
import { downloadFeedback } from "./send-local.js"

const root = document.getElementById("app")
const route = parseRoute(window.location.search)

if (route.screen === "reviewer") {
  mountReviewer({ root, route, sendFeedback: downloadFeedback })
} else {
  mountHome({ root })
}
```

Append to `src/styles.css`:

```css
/* Home and banners */
.harness-home {
  max-width: 640px;
  margin: 48px auto;
  padding: 0 16px;
}

.harness-home-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.harness-home-form input[name="key"] {
  font: 16px monospace;
  padding: 6px 8px;
  margin-left: 8px;
}

.harness-home-form fieldset {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.harness-home-form button {
  align-self: flex-start;
  font: 15px system-ui, sans-serif;
  padding: 8px 16px;
  border: 0;
  border-radius: 6px;
  background: var(--harness-accent);
  color: #fff;
  cursor: pointer;
}

.harness-banner {
  max-width: 640px;
  margin: 48px auto;
  padding: 16px;
  border: 1px solid #f0c36d;
  border-radius: 8px;
  background: #fff8e1;
}

.harness-banner pre {
  padding: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow-x: auto;
}
```

- [ ] **Step 6: Run the unit tests to verify they pass**

Run: `npm run test:unit`

Expected: PASS.

- [ ] **Step 7: Write the reviewer fixture and the failing browser tests**

`test/fixtures/reviewer.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/test/fixtures/build/entry.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import "/test/fixtures/build/entry.js"

      window.sent = []
      window.mount = (key, mode, assetBase = "/test/fixtures/gt-stub") =>
        window.harness.mountReviewer({
          root: document.getElementById("app"),
          route: { screen: "reviewer", key, mode },
          assetBase,
          sendFeedback: async item => {
            window.sent.push({
              key: item.key,
              mode: item.mode,
              text: item.text,
              annotations: item.annotations,
              context: item.context,
              reviewerName: item.reviewerName,
              imageWidth: item.image.width,
              imageHeight: item.image.height,
              imageType: item.image.blob && item.image.blob.type,
            })
          },
        })
      window.fixtureReady = true
    </script>
  </body>
</html>
```

`test/browser/reviewer.test.js`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

async function openReviewer(page, baseUrl, key, mode, assetBase) {
  await page.goto(`${baseUrl}/test/fixtures/reviewer.html`)
  await page.waitForFunction(() => window.fixtureReady === true)
  await page.evaluate(
    ({ key, mode, assetBase }) => window.mount(key, mode, assetBase),
    { key, mode, assetBase },
  )
}

test("runs the program and sends feedback with context", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openReviewer(page, baseUrl, "abc1234", "test")
    await page.waitForSelector(".program_container .main p")
    assert.equal(await page.locator(".harness-controls").count(), 1)

    await page.fill(".harness-name input", "Alice")
    await page.press(".harness-name input", "Tab")

    await page.click(".harness-feedback-button")
    await page.waitForSelector(".harness-modal")
    assert.equal(await page.locator(".harness-modal img").count(), 1)

    await page.fill(".harness-text", "Button is misaligned")
    await page.click('[data-action="send"]')
    await page.waitForSelector(".harness-modal", { state: "detached" })

    const [item] = await page.evaluate(() => window.sent)
    assert.equal(item.key, "abc1234")
    assert.equal(item.mode, "test")
    assert.equal(item.text, "Button is misaligned")
    assert.deepEqual(item.annotations, [])
    assert.equal(item.reviewerName, "Alice")
    assert.equal(item.imageWidth, 800)
    assert.equal(item.imageHeight, 600)
    assert.equal(item.imageType, "image/webp")
    assert.deepEqual(item.context.lines, [
      { from: 1, to: 3, program: "main" },
      { from: 10, to: 12, program: "main" },
    ])
    assert.equal(item.context.runId, "run-123")
    assert.deepEqual(item.context.variables, { name: "Alice", score: 42 })
    assert.deepEqual(item.context.viewport, { width: 800, height: 600 })

    const stored = await page.evaluate(() => localStorage.getItem("harness:reviewer-name"))
    assert.equal(stored, "Alice")
  })
})

test("shows setup instructions when the embed is refused", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openReviewer(page, baseUrl, "refused", "test")
    await page.waitForSelector(".harness-banner")
    assert.match(await page.locator(".harness-banner h2").innerText(), /isn't set up/)
    assert.match(await page.locator(".harness-url").innerText(), /\/test\/fixtures\/reviewer\.html$/)
  })
})

test("shows an error when GuidedTrack cannot be loaded", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await openReviewer(page, baseUrl, "abc1234", "test", "/test/fixtures/does-not-exist")
    await page.waitForSelector(".harness-banner")
    assert.match(await page.locator(".harness-message").innerText(), /Could not load GuidedTrack/)
  })
})
```

`test/browser/home.test.js` (exercises the real `index.html` and `dist/main.js`; GuidedTrack requests are blocked so the test never touches the network):

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import { withPage } from "../helpers/browser.js"

test("home form opens the reviewer route and main.js mounts it", async () => {
  await withPage(async ({ page, baseUrl }) => {
    await page.route(/guidedtrack\.com/, route => route.abort())
    await page.goto(`${baseUrl}/index.html`)
    await page.waitForSelector(".harness-home-form")

    await page.fill('input[name="key"]', "abc1234")
    await page.check('input[name="mode"][value="run"]')
    await page.click('button[type="submit"]')

    await page.waitForURL(/\?key=abc1234&mode=run$/)
    await page.waitForSelector(".harness-banner")
    assert.match(await page.locator(".harness-message").innerText(), /Could not load GuidedTrack/)
  })
})
```

Add to `test/fixtures/entry.js`: `import { mountReviewer } from "../../src/screens/reviewer.js"` and the property `mountReviewer` on `window.harness`. The final `test/fixtures/entry.js` is:

```js
import "../../src/styles.css"
import { createEditor, TOOLS } from "../../src/annotations/editor.js"
import { flattenToPng } from "../../src/annotations/flatten.js"
import { captureViewport } from "../../src/capture.js"
import { mountProgram, createEmitter } from "../../src/gt-embed.js"
import { createControls } from "../../src/controls.js"
import { openFeedbackModal } from "../../src/feedback-modal.js"
import { mountReviewer } from "../../src/screens/reviewer.js"
import { pixelAt } from "./pixel.js"

window.harness = {
  version: "phase-1",
  createEditor,
  TOOLS,
  flattenToPng,
  captureViewport,
  mountProgram,
  createEmitter,
  createControls,
  openFeedbackModal,
  mountReviewer,
  pixelAt,
}
```

- [ ] **Step 8: Run the browser tests to verify they pass**

Run: `npm run test:browser`

Expected: all PASS. If the reviewer test's `imageType` is `image/png`, Chromium declined WebP encoding; that is acceptable in principle but unexpected in Chromium 131, so investigate before loosening the assertion. If `context.lines` is empty, the tracker was created after the stub fired its first page; confirm `createContextTracker` is called before `pageEnd` fires (it is created right after `mountProgram` resolves, and the stub defers its first page with `setTimeout`, so ordering holds).

- [ ] **Step 9: Commit**

```bash
npm run format
git add src/main.js src/styles.css src/send-local.js src/screens test/unit/send-local.test.js test/unit/reviewer.test.js test/fixtures/entry.js test/fixtures/reviewer.html test/browser/reviewer.test.js test/browser/home.test.js
git commit -m "Wire the reviewer and home screens with a local download send action

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 15: Deployment workflow and README

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md`

**Interfaces:**
- Produces: on every push to `main`, GitHub Actions runs `npm test` and, if green, publishes `index.html` plus `dist/` to GitHub Pages. The harness URL is then `https://<user>.github.io/<repo>/`.

- [ ] **Step 1: Write the workflow**

`.github/workflows/deploy.yml`:

```yaml
name: Test and deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm install --no-save playwright@1.49.0
      - run: npx playwright install --with-deps chromium
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: |
          mkdir -p site
          cp index.html site/
          cp -r dist site/dist
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Write the README**

`README.md`:

```markdown
# GuidedTrack Feedback Harness

Embed a GuidedTrack program, screenshot it, draw on the screenshot, type feedback, and send it to the developer. This version (Phase 1) saves each piece of feedback to the reviewer's computer as a PNG and a JSON file. Later phases store feedback in Supabase, add a developer inbox, and record sessions for replay.

## Using it

1. On GuidedTrack, open the program's **Publish** page and add the harness URL to the list of pages allowed to run the program. The harness URL is the page's own address, for example `https://<user>.github.io/<repo>/`. Adding it once covers every link below.
2. Open the harness, enter the program key, choose **Test** or **Run**, and click **Open**. Or go straight to `?key=<key>&mode=test`.
3. Click **Give feedback** at any point. Draw with the pen or highlighter, add notes that point at parts of the page, type in the box, and click **Send feedback**. Two files download: the annotated PNG and a JSON sidecar with the text, the annotations, and the program lines that were on screen.

"Reset everything" in GuidedTrack's menu works because the harness keeps all its state in the query string.

## Development

Requirements: Node 24. Browser tests need Playwright 1.49.0 and its Chromium. The dev container has both preinstalled; elsewhere run `npm install --no-save playwright@1.49.0 && npx playwright install chromium` once.

- `npm install`
- `npm run build` or `npm run watch`
- `npm test` runs the unit tests, then builds and runs the browser tests
- `npm run format`

Serve the repository root with any static server (for example `npx serve .`) and open `index.html` through it. Opening the file directly from disk does not work because the page uses module scripts.

## Deployment

Every push to `main` runs the tests, builds, and publishes to GitHub Pages through `.github/workflows/deploy.yml`. In the repository settings, set Pages to deploy from **GitHub Actions** once.

## Design

The design spec is `docs/superpowers/specs/2026-10-14-gt-feedback-harness-design.md`. Implementation plans live under `docs/superpowers/plans/`, and spike findings under `docs/superpowers/spikes/`.
```

- [ ] **Step 3: Verify locally**

Run: `npm test`

Expected: all unit and browser tests PASS. The workflow itself cannot run locally; it is verified by the first push to `main`, which is the user's call. Report it as unverified until then.

- [ ] **Step 4: Commit**

```bash
npm run format
git add .github/workflows/deploy.yml README.md
git commit -m "Add GitHub Pages deployment workflow and README

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

## Out of scope for this plan

Everything in the spec that needs a backend or recording is deferred:

- Phase 2 plan: Supabase project, migrations, row-level security policies and pgTAP tests, anonymous and Google auth, the `store` module, share ids and the `?r=` route (replacing `?key=`), session rows, screenshot upload, the developer screens (program list, registration, inbox, session view, resolve, delete, Download PNG), the keep-alive and retention job.
- Phase 3 plan: rrweb recording, chunked uploads, the recording toggle, the replay player with markers.
