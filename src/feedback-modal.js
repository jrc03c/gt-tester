import { createEditor, TOOLS } from "./annotations/editor.js"

export const TOOL_LABELS = {
  select: "Select",
  pen: "Pen",
  highlight: "Highlighter",
  callout: "Note",
}

export const HINTS = {
  select:
    "Click a mark to select it. Drag to move it. Press Delete to remove it.",
  pen: "Draw on the screenshot.",
  highlight: "Drag to highlight.",
  callout: "Click where the note should point.",
}

export function openFeedbackModal({
  image,
  onSend,
  onCancel = () => {},
  root = document.body,
}) {
  const overlay = document.createElement("div")
  overlay.className = "harness-modal"
  overlay.setAttribute("data-harness-chrome", "")
  overlay.innerHTML = `
    <div class="harness-modal-dialog" role="dialog" aria-modal="true" aria-label="Give feedback">
      <div class="harness-toolbar">
        ${TOOLS.map(
          tool =>
            `<button type="button" data-tool="${tool}" aria-pressed="false">${TOOL_LABELS[tool]}</button>`,
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

  const editor = createEditor({
    container: overlay.querySelector(".harness-editor"),
    image,
  })
  const hint = overlay.querySelector(".harness-hint")
  const error = overlay.querySelector(".harness-error")
  const sendButton = overlay.querySelector('[data-action="send"]')
  const textarea = overlay.querySelector(".harness-text")

  function setTool(tool) {
    editor.setTool(tool)
    for (const button of overlay.querySelectorAll(
      ".harness-toolbar [data-tool]",
    )) {
      button.setAttribute("aria-pressed", String(button.dataset.tool === tool))
    }
    hint.textContent = HINTS[tool]
  }

  function close() {
    editor.destroy()
    overlay.remove()
  }

  for (const button of overlay.querySelectorAll(
    ".harness-toolbar [data-tool]",
  )) {
    button.addEventListener("click", () => setTool(button.dataset.tool))
  }
  overlay
    .querySelector('[data-action="undo"]')
    .addEventListener("click", () => editor.undo())
  overlay
    .querySelector('[data-action="delete"]')
    .addEventListener("click", () => editor.deleteSelected())
  overlay
    .querySelector('[data-action="cancel"]')
    .addEventListener("click", () => {
      close()
      onCancel()
    })

  sendButton.addEventListener("click", async () => {
    sendButton.disabled = true
    sendButton.textContent = "Sending…"
    error.hidden = true
    try {
      await onSend({
        annotations: editor.getAnnotations(),
        text: textarea.value.trim(),
      })
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
