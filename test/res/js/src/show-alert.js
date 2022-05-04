const DOMPurify = require("dompurify")
const Vue = require("vue")

function showAlert(message, level) {
  const cleanedMessage = DOMPurify.sanitize(message)
  level = level || "info"
  console.log("showing alert:", message, level)

  return new Promise((resolve, reject) => {
    try {
      const container = document.createElement("div")
      container.id = "app"
      document.body.appendChild(container)

      const app = Vue.createApp({
        template: /* html */ `
          <div :class="'gt-tester-modal alert-level-' + level">
            <div
              class="gt-tester-modal-backdrop"
              @click="dismiss">
            </div>

            <div class="gt-tester-modal-body-container">
              <div class="gt-tester-modal-body">
                <div class="gt-tester-modal-message">
                  {{ cleanedMessage }}
                </div>
                
                <button @click="dismiss" :class="'btn btn-' + level">
                  Okay
                </button>
              </div>
            </div>
          </div>
        `,

        data() {
          return { cleanedMessage, level }
        },

        methods: {
          dismiss() {
            app.unmount()
            document.body.removeChild(container)
            return resolve()
          },
        },
      })

      app.mount(container)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = showAlert
