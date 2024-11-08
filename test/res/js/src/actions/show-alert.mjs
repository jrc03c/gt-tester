// -----------------------------------------------------------------------------
// <style>
// -----------------------------------------------------------------------------

const css = /* css */ `
  .modal,
  .modal *,
  .modal button {
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
    pointer-events: none;
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
    pointer-events: all;
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
    filter: var(--button-hover-filter);
  }

  button:active {
    filter: var(--button-active-filter);
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
          <!-- {{ cleanedMessage }} -->
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

import { BaseComponent } from "@jrc03c/base-web-component"
import { sanitize } from "dompurify"

class AlertComponent extends BaseComponent {
  static css = BaseComponent.css + css
  static template = template

  constructor(options) {
    super(options)
    options = options || {}
    this.level = options.level || "info"

    this.message = sanitize(
      options.message ||
        "[There should be a message here instead of this text!]",
    )

    console.log("showing alert:", this.message, this.level)

    const root = this.shadowRoot.querySelector(".modal")
    root.classList.add("alert-level-" + this.level)

    const messageContainer = root.querySelector(".modal-message")
    messageContainer.innerHTML = this.message

    const button = root.querySelector(".btn")
    button.classList.add("btn-" + this.level)
    this.on(button, "click", () => this.parentElement.removeChild(this))

    const backdrop = root.querySelector(".modal-backdrop")
    this.on(backdrop, "click", () => this.parentElement.removeChild(this))

    this.on(window, "keydown", event => {
      if (event.key === "Escape") {
        this.parentElement.removeChild(this)
      }
    })
  }
}

async function showAlert(message, level) {
  new AlertComponent(message, level)
}

customElements.define("x-alert", AlertComponent)
export { showAlert }
