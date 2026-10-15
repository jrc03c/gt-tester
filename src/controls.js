export function createControls({ root, onFeedback, name = null }) {
  const element = document.createElement("div")
  element.className = "harness-controls"
  element.setAttribute("data-harness-chrome", "")
  element.innerHTML = `
    <button type="button" class="harness-feedback-button">
      <span class="harness-feedback-icon" aria-hidden="true">&#x1F4AC;</span>
      <span class="harness-feedback-label">Give feedback</span>
    </button>
    ${
      name
        ? '<label class="harness-name"><span>Your name (optional)</span><input type="text" placeholder="Name" /></label>'
        : ""
    }
  `

  const button = element.querySelector(".harness-feedback-button")
  button.addEventListener("click", () => onFeedback())

  if (name) {
    const input = element.querySelector("input")
    input.value = name.value || ""
    input.addEventListener("change", () => name.onChange(input.value.trim()))
  }

  root.appendChild(element)

  return {
    element,
    setBusy(busy) {
      button.disabled = busy
    },
    remove() {
      element.remove()
    },
  }
}
