const emitTyping = require("./emit-typing.js")
const emitClick = require("./emit-click.js")

const container = document.getElementById("REPLACE-ME")
const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get("id")

if (!id) {
  window.location.href = window.location.protocol + "//" + window.location.host
} else {
  container.id = id
}

let interval = setInterval(() => {
  if (!$) return
  clearInterval(interval)
  $(window).on("gt-tester-type", emitTyping)
  $(window).on("gt-tester-click", emitClick)
  console.log("listeners added!")
}, 1)
