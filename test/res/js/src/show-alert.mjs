// -----------------------------------------------------------------------------
// <style>
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// <template>
// -----------------------------------------------------------------------------

const template = /* html */ `
  <div :class="'alert-level-' + level + ' gt-tester-modal'">
    <div class="gt-tester-modal-backdrop"></div>

    <div class="gt-tester-modal-body-container">
      <div class="gt-tester-modal-body">
        <div class="gt-tester-modal-message">
          {{ cleanedMessage }}
        </div>
        
        <button :class="'btn btn-' + level" @click="dismiss">
          Okay
        </button>
      </div>
    </div>
  </div>
`

// -----------------------------------------------------------------------------
// <script>
// -----------------------------------------------------------------------------

import { createApp } from "vue/dist/vue.esm-browser.prod.js"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"
import { DOMPurify } from "dompurify"

function showAlert(message, level) {
  const cleanedMessage = DOMPurify.sanitize(message)
  level = level || "info"
  console.log("showing alert:", message, level)

  return new Promise((resolve, reject) => {
    try {
      const container = document.createElement("div")
      container.id = "app"
      document.body.appendChild(container)

      const app = createApp(
        createVueComponentWithCSS({
          template,

          data() {
            return {
              cleanedMessage,
              css,
              level,
            }
          },

          methods: {
            dismiss() {
              app.unmount()
              document.body.removeChild(container)
              return resolve()
            },
          },
        }),
      )

      app.mount(container)
    } catch (e) {
      reject(e)
    }
  })
}

export { showAlert }
