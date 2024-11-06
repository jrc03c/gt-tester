import { click } from "./click.mjs"
import { getEnterTextFunction } from "./get-enter-text-function.mjs"
import { pause } from "@jrc03c/pause"
import { showAlert } from "./show-alert.mjs"
import { submit } from "./submit.mjs"

const container = document.getElementById("REPLACE-ME")
const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get("id")
const mode = params.get("mode") || "preview"

if (!id) {
  window.location.href = window.location.protocol + "//" + window.location.host
} else {
  container.id = id
  localStorage.setItem("last-id", id)
}

if (mode === "preview") {
  container.setAttribute("data-mode", "test")
  document.getElementById("mode").innerHTML = "🚧&nbsp; PREVIEW MODE &nbsp;🚧"
  localStorage.setItem("last-mode", "preview")
} else {
  document.getElementById("mode").innerHTML = "🏁&nbsp; RUN MODE &nbsp;🏁"
  localStorage.setItem("last-mode", "run")
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
