import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync } from "node:fs"

test("build output exists after npm run build", () => {
  assert.ok(
    existsSync("dist/main.js"),
    "dist/main.js missing: run npm run build",
  )
  assert.ok(existsSync("dist/main.css"), "dist/main.css missing")
  assert.ok(
    existsSync("test/fixtures/build/entry.js"),
    "fixture bundle missing",
  )
})
