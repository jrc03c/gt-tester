import { test } from "node:test"
import assert from "node:assert/strict"
import { harnessPageUrl } from "../../src/screens/reviewer.js"

test("harnessPageUrl is the origin plus path without index.html", () => {
  assert.equal(
    harnessPageUrl({
      origin: "https://user.github.io",
      pathname: "/repo/index.html",
    }),
    "https://user.github.io/repo/",
  )
  assert.equal(
    harnessPageUrl({ origin: "https://user.github.io", pathname: "/repo/" }),
    "https://user.github.io/repo/",
  )
  assert.equal(
    harnessPageUrl({ origin: "http://localhost:3000", pathname: "/" }),
    "http://localhost:3000/",
  )
})
