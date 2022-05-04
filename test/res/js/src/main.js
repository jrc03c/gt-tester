const click = require("./click.js")
const getEnterTextFunction = require("./get-enter-text-function.js")
const pause = require("./pause.js")
const showAlert = require("./show-alert.js")
const submit = require("./submit.js")

const container = document.getElementById("REPLACE-ME")
const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get("id")

if (!id) {
  window.location.href = window.location.protocol + "//" + window.location.host
} else {
  container.id = id
}

async function run(_, data) {
  canRun = false

  const events = data.events
  const timeBetweenEvents = 100
  const enterText = getEnterTextFunction()

  for (let i = 0; i < events.length; i++) {
    const event = events[i]

    // enter text
    if (event.type === "enter-text") {
      await enterText(event.value)
    }

    // click something
    else if (event.type === "click") {
      await click(event.value, event.class)
    }

    // pause temporarily
    else if (event.type === "pause") {
      const ms = parseInt(event.value)
      console.log("pausing for milliseconds:", ms)
      await pause(ms)
    }

    // show an alert
    else if (event.type === "alert") {
      await showAlert(event.value, event.level)
    }

    // submit responses
    else if (event.type === "submit") {
      await submit()
    }

    await pause(timeBetweenEvents)
  }
}

let canRun = false

let interval = setInterval(() => {
  if (!$) return
  clearInterval(interval)

  $(window).on("guidedtrack:pageEnd", () => {
    canRun = true
  })

  $(window).on("gt-test", async (event, data) => {
    while (!canRun) {
      await pause(10)
    }

    run(event, data)
  })
}, 1)
