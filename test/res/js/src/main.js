const getElementContainingText = require("./get-element-containing-text.js")
const getTextInputElements = require("./get-text-input-elements.js")
const pause = require("./pause.js")
const showAlert = require("./show-alert.js")

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

  for (let i = 0; i < events.length; i++) {
    const event = events[i]

    // enter text
    if (event.type === "enter-text") {
      const textInputs = getTextInputElements()

      if (textInputs.length === 0) {
        console.warn(
          "No text input fields were found in which to put value:",
          event.value
        )

        continue
      }

      const input = textInputs[0]
      textInputs.splice(0, 1)
      input.value = event.value.toString()
      $(input).trigger("input")
      console.log("entering text:", event.value.toString())
    }

    // click something
    else if (event.type === "click") {
      const value = event.value ? event.value.toString() : null
      const whichClass = event.class ? event.class : null

      let options = []

      if (whichClass) {
        const els = Array.from(document.getElementsByClassName(whichClass))
        options = options.concat(els)
      } else if (value) {
        const el = getElementContainingText(value)
        if (el) options.push(el)
      }

      if (options.length === 0) {
        let message = "No clickable elements were found"
        if (value) message += ` containing the value "${value}"`
        if (whichClass) message += ` with class "${whichClass}"`
        message += "!"
        console.warn(message)
        continue
      }

      if (value) {
        options = options.filter(el => el.textContent.includes(value))
      }

      if (options.length > 0) {
        const input = options[0]
        $(input).trigger("click")

        console.log(
          [
            "clicking on element",
            value ? `with value "${value}"` : "",
            whichClass ? `with class "${whichClass}"` : "",
          ]
            .join(" ")
            .trim() + "..."
        )
      } else {
        console.warn("Couldn't find a clickable element for this event:", event)
      }
    }

    // pause temporarily
    else if (event.type === "pause") {
      const ms = parseInt(event.value)
      console.log("pausing for milliseconds:", ms)
      await pause(ms)
    }

    // show an alert
    else if (event.type === "alert") {
      console.log("showing alert:", event.value, event.level || "info")
      await showAlert(event.value, event.level)
    }

    // submit responses
    else if (event.type === "submit") {
      console.log("submitting responses...")

      let defaultButtons = Array.from(
        document.getElementsByClassName("btn-default")
      )

      let primaryButtons = Array.from(
        document.getElementsByClassName("btn-primary")
      )

      if (defaultButtons.length === 0 && primaryButtons.length === 0) {
        console.warn("No 'submit' buttons were found!")
        continue
      }

      const button =
        defaultButtons.length > 0
          ? defaultButtons[defaultButtons.length - 1]
          : primaryButtons[primaryButtons.length - 1]

      $(button).click()
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
