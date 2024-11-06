import { click } from "./actions/click.mjs"
import { enterText } from "./actions/enter-text.mjs"
import { pause } from "@jrc03c/pause"
import { selectSliderValue } from "./actions/select-slider-value.mjs"
import { showAlert } from "./actions/show-alert.mjs"
import { submitResponses } from "./actions/submit-responses.mjs"

// NOTE: This event is unofficial and may change! It may be better in the long
// run to watch for the point in time where everything "settles down" and the
// page no longer loads in new content.
const GUIDEDTRACK_PAGE_END_EVENT = "guidedtrack:pageEnd"

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

  console.log("events:", data.events)
  const events = data.events
  const timeBetweenEvents = 100

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

    // select a slider value
    else if (event.type === "select-slider-value") {
      console.log("getting ready to invoke the selectSliderValue function...")
      await selectSliderValue(event.value, event.selector)
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
    else if (event.type === "submit-responses") {
      await submitResponses()
    }

    await pause(timeBetweenEvents)
  }
}

let canRun = false

let interval = setInterval(() => {
  if (!$) {
    console.log("waiting for jquery to load...")
    return
  }

  clearInterval(interval)
  console.log("jquery finished loading!")

  $(window).on(GUIDEDTRACK_PAGE_END_EVENT, () => {
    canRun = true
  })

  $(window).on("gt-test", async (event, data) => {
    while (!canRun) {
      await pause(10)
    }

    run(event, data)
  })
}, 1)
