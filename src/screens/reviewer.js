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
    renderErrorBanner(
      programRoot,
      `Could not load GuidedTrack: ${error.message}`,
    )
    return
  }

  const context = createContextTracker(mounted.events)
  const controls = createControls({
    root,
    onFeedback: giveFeedback,
    name: {
      value: readName(storage),
      onChange: value => saveName(storage, value),
    },
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
  root
    .querySelector(".harness-reload")
    .addEventListener("click", () => window.location.reload())
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
  context.fillText(
    "Screenshot unavailable. You can still type feedback below.",
    20,
    40,
  )
  return {
    url: canvas.toDataURL(),
    width: canvas.width,
    height: canvas.height,
    blob: null,
  }
}
