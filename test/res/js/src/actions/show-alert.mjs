// -----------------------------------------------------------------------------
// <style>
// -----------------------------------------------------------------------------

const css = /* css */ `
  .modal,
  .modal *,
  .modal button {
    --border-radius: 0.5em;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

    --color-danger-dark: hsl(1.7deg, 63.6%, 15%);
    --color-danger-light: hsl(1.7deg, 63.6%, 90%);
    --color-danger-medium: hsl(1.7deg, 63.6%, 60%);
    --color-danger: hsl(1.7deg, 63.6%, 40%);

    --color-info-dark: hsl(207.7deg, 72.1%, 15%);
    --color-info-light: hsl(207.7deg, 72.1%, 90%);
    --color-info-medium: hsl(207.7deg, 72.1%, 60%);
    --color-info: hsl(207.7deg, 72.1%, 40%);

    --color-success-dark: hsl(120deg, 50%, 15%);
    --color-success-light: hsl(120deg, 50%, 90%);
    --color-success-medium: hsl(120deg, 50%, 60%);
    --color-success: hsl(120deg, 50%, 40%);

    --color-warning-dark: hsl(35.2deg, 67.5%, 15%);
    --color-warning-light: hsl(35.2deg, 67.5%, 90%);
    --color-warning-medium: hsl(35.2deg, 67.5%, 60%);
    --color-warning: hsl(35.2deg, 67.5%, 40%);

    --padding: 1.5em;
    font-family: system-ui, sans-serif;
    font-weight: normal;
  }

  .modal,
  .modal-backdrop,
  .modal-body {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    min-width: 100vw;
    max-width: 100vw;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    z-index: 999997;
  }

  .modal-backdrop {
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 999998;
  }

  .modal-body {
    padding: var(--padding);
    box-sizing: border-box;
    z-index: 999999;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }

  .modal-content {
    padding: var(--padding);
    border-radius: var(--border-radius);
    min-width: 384px;
    max-width: 768px;
    max-height: calc(100vh - calc(2 * var(--padding)));
    overflow-y: auto;
    background-color: white;
    box-shadow: var(--box-shadow);
  }

  .modal.alert-level-info .modal-content {
    background-color: var(--color-info-light);
    color: var(--color-info-dark);
  }

  .modal.alert-level-success .modal-content {
    background-color: var(--color-success-light);
    color: var(--color-success-dark);
  }

  .modal.alert-level-warning .modal-content {
    background-color: var(--color-warning-light);
    color: var(--color-warning-dark);
  }

  .modal.alert-level-danger .modal-content {
    background-color: var(--color-danger-light);
    color: var(--color-danger-dark);
  }

  .modal-message {
    margin-bottom: var(--padding);
  }

  .modal-buttons {
    text-align: right;
  }

  button {
    font-size: 1em;
    font-weight: bold !important;
    padding: calc(var(--padding) / 2);
    background-color: rgb(235, 235, 235);
    border: 0;
    border-radius: var(--border-radius);
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    filter: brightness(102.5%);
  }

  button:active {
    filter: brightness(90%);
  }

  button.btn-info {
    background-color: var(--color-info-medium);
    color: var(--color-info-dark);
  }

  button.btn-success {
    background-color: var(--color-success-medium);
    color: var(--color-success-dark);
  }

  button.btn-warning {
    background-color: var(--color-warning-medium);
    color: var(--color-warning-dark);
  }

  button.btn-danger {
    background-color: var(--color-danger-medium);
    color: var(--color-danger-dark);
  }

  @media (max-width: 768px) {
    .modal-body {
      width: 100vw;
      min-width: 100vw;
      max-width: 100vw;
    }

    .modal-content {
      width: calc(100vw - calc(2 * var(--padding)));
      min-width: calc(100vw - calc(2 * var(--padding)));
      max-width: calc(100vw - calc(2 * var(--padding)));
      box-sizing: border-box;
    }
  }
`

// -----------------------------------------------------------------------------
// <template>
// -----------------------------------------------------------------------------

const template = /* html */ `
  <div class="modal">
    <div class="modal-backdrop"></div>

    <div class="modal-body">
      <div class="modal-content">
        <div class="modal-message">
          {{ cleanedMessage }}
        </div>
        
        <div class="modal-buttons">
          <button class="btn">
            Okay
          </button>
        </div>
      </div>
    </div>
  </div>
`

// -----------------------------------------------------------------------------
// <script>
// -----------------------------------------------------------------------------

import { sanitize } from "dompurify"

class AlertComponent extends HTMLElement {
  _eventListeners = []

  constructor(message, level) {
    super()

    this.level = level || "info"

    const cleanedMessage = sanitize(message)
    this.message = cleanedMessage
    console.log("showing alert:", cleanedMessage, level)

    const temp = document.createElement("template")

    temp.innerHTML = `
      <style>${css}</style>
      ${template}
    `

    const deep = true
    const clone = document.importNode(temp.content, deep)
    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(clone)

    const root = shadow.querySelector(".modal")
    root.classList.add("alert-level-" + this.level)

    const messageContainer = root.querySelector(".modal-message")
    messageContainer.innerHTML = cleanedMessage

    const button = root.querySelector(".btn")
    button.classList.add("btn-" + this.level)

    const callback = () => this.parentElement.removeChild(this)
    button.addEventListener("click", callback)
    this._eventListeners.push({ target: button, event: "click", callback })

    document.body.appendChild(this)
  }

  disconnectedCallback() {
    this._eventListeners.forEach(listener => {
      try {
        listener.target.removeEventListener(listener.event, listener.callback)
      } catch (e) {}
    })
  }
}

async function showAlert(message, level) {
  new AlertComponent(message, level)
}

customElements.define("x-alert", AlertComponent)
export { showAlert }
