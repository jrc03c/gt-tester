const getInteractiveElements = require("./get-interactive-elements.js")
const getElementContainingText = require("./get-element-containing-text.js")
const pause = require("./pause.js")

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
  const inputs = getInteractiveElements()

  const textInputs = inputs.filter(input => {
    const tagName = input.tagName.toLowerCase()
    const validTags = ["input", "textarea"]
    return validTags.indexOf(tagName) > -1
  })

  const clickableInputs = inputs.filter(input => textInputs.indexOf(input) < 0)

  window.textInputs = textInputs
  window.clickableInputs = clickableInputs

  for (let i = 0; i < events.length; i++) {
    const event = events[i]

    // enter text
    if (event.type === "enter-text") {
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
        while (options.length === 0) {
          const els = Array.from(document.getElementsByClassName(whichClass))
          options = options.concat(els)
          await pause(10)
        }
      } else if (value) {
        while (options.length === 0) {
          options.push(getElementContainingText(value))
          await pause(10)
        }
      }

      if (value) {
        options = options.filter(el => el.textContent.includes(value))
      }

      if (options.length > 0) {
        const input = options[0]
        $(input).trigger("click")
        console.log("clicking on element:", input)
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

    // submit responses
    else if (event.type === "submit") {
      console.log("submitting responses...")

      const defaultButtons = Array.from(
        document.getElementsByClassName("btn-default")
      )
      const primaryButtons = Array.from(
        document.getElementsByClassName("btn-primary")
      )

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
