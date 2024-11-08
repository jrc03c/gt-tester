// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
  .controls {
    position: fixed;
    right: var(--padding);
    bottom: var(--padding);
    z-index: 999996;
    background-color: var(--color-primary);
    padding: 4px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }

  button {
    font-size: 1.5em;
    width: 2em;
    min-width: 2em;
    max-width: 2em;
    height: 2em;
    min-height: 2em;
    max-height: 2em;
    border: 0;
    border-radius: calc(var(--border-radius) / 1.5);
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 0.25em;
    background-color: var(--color-grey-light);
    cursor: pointer;
  }

  button:hover {
    filter: var(--button-hover-filter);
  }

  button:active {
    filter: var(--button-active-filter);
  }

  i.las {
    font-size: 1.5em;
  }
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <div class="controls">
    <button id="play-pause-button">
      <i class="las la-pause"></i>
    </button>

    <button id="settings-button">
      <i class="las la-cog"></i>
    </button>
  </div>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BaseComponent } from "@jrc03c/base-web-component"

class ControlsComponent extends BaseComponent {
  static css = BaseComponent.css + css
  static template = template

  isPlaying = false

  constructor(options) {
    const allCss = [BaseComponent.css, css]
    const stylesheets = Array.from(document.styleSheets)

    const lineAwesomeStylesheet = stylesheets.find(sheet =>
      sheet.href.includes("line-awesome"),
    )

    if (lineAwesomeStylesheet) {
      allCss.push(
        Array.from(lineAwesomeStylesheet.cssRules)
          .map(rule => rule.cssText)
          .join("\n"),
      )
    }

    options.css = [options.css || ""].concat(allCss).join("\n")
    super(options)
  }

  mount() {
    const out = super.mount(...arguments)

    const playPauseButton = this.shadowRoot.querySelector("#play-pause-button")
    this.on(playPauseButton, "click", this.togglePlayPause.bind(this))

    const settingsButton = this.shadowRoot.querySelector("#settings-button")
    this.on(settingsButton, "click", this.showSettingsModal.bind(this))

    return out
  }

  showSettingsModal() {
    alert("This button doesn't do anything useful yet!")
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying

    const playPauseButton = this.shadowRoot.querySelector("#play-pause-button")
    const icon = playPauseButton.querySelector(".las")

    if (this.isPlaying) {
      console.log("playing!")
      icon.classList.remove("la-pause")
      icon.classList.add("la-play")
    } else {
      console.log("paused!")
      icon.classList.add("la-pause")
      icon.classList.remove("la-play")
    }
  }
}

customElements.define("x-controls", ControlsComponent)
export { ControlsComponent }
