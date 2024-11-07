import { click } from "./actions/click.mjs"
import { enterText } from "./actions/enter-text.mjs"
import { pause } from "@jrc03c/pause"
import { selectSliderValue } from "./actions/select-slider-value.mjs"
import { showAlert } from "./actions/show-alert.mjs"
import { submitResponses } from "./actions/submit-responses.mjs"

console.log("showing alert...")
showAlert(
  `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum urna eu diam maximus fermentum nec at nibh. Vivamus luctus vitae nibh ac lacinia. Sed lobortis ultrices maximus. Nulla eu ex non nunc dignissim interdum. Fusce elementum velit id diam dapibus, nec lacinia est placerat. Nunc ornare tincidunt lectus, a feugiat sapien fringilla quis. Nam porta purus purus, in consequat justo rutrum nec.</p>

<p>Vivamus posuere nulla dui, sit amet euismod nunc egestas hendrerit. Donec nulla metus, vulputate nec nulla non, posuere elementum urna. Vestibulum non ipsum velit. Fusce ante dui, rutrum sit amet magna sed, consectetur dignissim est. Duis felis eros, eleifend pretium pharetra sed, dictum sed mi. Quisque porttitor consectetur lorem, euismod fermentum nulla scelerisque ac. Praesent viverra bibendum urna, non maximus purus sollicitudin nec. Sed et volutpat purus. Sed est tortor, efficitur at nulla id, blandit tristique purus. Nulla vel tincidunt sapien. Donec est lacus, sagittis nec mollis eu, feugiat quis ex. Aliquam non magna nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam diam orci, luctus nec leo nec, lobortis scelerisque metus.</p>

<p>Nam non elit lectus. Duis laoreet imperdiet mauris, ac accumsan risus volutpat dictum. Vivamus consequat condimentum sodales. Aliquam volutpat est sit amet mauris posuere viverra. Nam ac dolor feugiat, sodales risus sit amet, rhoncus neque. Mauris neque diam, tristique ac tincidunt in, sagittis eget mauris. Curabitur feugiat orci non eros tempus, vitae condimentum massa consequat. Curabitur pretium nisl lacus, sit amet aliquam diam rhoncus et. Maecenas nunc ipsum, consectetur id orci eget, consequat feugiat nunc.</p>

<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sed nisi lacinia, finibus libero vitae, tempus sapien. Duis vulputate ultrices aliquet. Donec mollis leo nunc, sit amet bibendum nunc tristique ut. In hac habitasse platea dictumst. Nullam nec tortor sed ex ultrices congue. Praesent et velit ut metus faucibus dapibus quis et ipsum. Vivamus pharetra ultricies semper. Quisque a nunc nec nisl mollis efficitur. Sed lobortis augue sed lacus bibendum, nec laoreet magna aliquam. Donec vitae viverra metus, a vestibulum risus. Ut nisl ipsum, egestas vel vulputate et, molestie ut risus. Curabitur sollicitudin, ipsum ut condimentum aliquam, leo libero tincidunt libero, sed hendrerit enim lacus nec leo. Cras rhoncus justo arcu, in semper neque lobortis a.</p>

<p>Nulla tincidunt ex eget mi porttitor, rutrum scelerisque velit eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam tincidunt consectetur nibh, id scelerisque magna consectetur eu. Pellentesque aliquet sollicitudin velit ut molestie. Sed ac dolor ut diam sodales convallis. Aliquam at eros non tellus rutrum interdum vel a leo. Cras cursus, libero lacinia pellentesque faucibus, nunc ipsum ultrices orci, lobortis dapibus eros magna et purus. Aenean vel augue erat. Nunc nec mauris eget felis elementum rhoncus non vitae turpis.</p>  
`,
  "danger",
)

// // NOTE: This event is unofficial and may change! It may be better in the long
// // run to watch for the point in time where everything "settles down" and the
// // page no longer loads in new content.
// const GUIDEDTRACK_PAGE_END_EVENT = "guidedtrack:pageEnd"

// const container = document.getElementById("REPLACE-ME")
// const search = window.location.search
// const params = new URLSearchParams(search)
// const id = params.get("id")
// const mode = params.get("mode") || "preview"

// if (!id) {
//   // window.location.href = window.location.protocol + "//" + window.location.host
// } else {
//   container.id = id
//   localStorage.setItem("last-id", id)
// }

// if (mode === "preview") {
//   container.setAttribute("data-mode", "test")
//   document.getElementById("mode").innerHTML = "🚧&nbsp; PREVIEW MODE &nbsp;🚧"
//   localStorage.setItem("last-mode", "preview")
// } else {
//   document.getElementById("mode").innerHTML = "🏁&nbsp; RUN MODE &nbsp;🏁"
//   localStorage.setItem("last-mode", "run")
// }

// async function run(_, data) {
//   canRun = false

//   console.log("events:", data.events)
//   const events = data.events
//   const timeBetweenEvents = 100

//   for (let i = 0; i < events.length; i++) {
//     const event = events[i]

//     // enter text
//     if (event.type === "enter-text") {
//       await enterText(event.value)
//     }

//     // click something
//     else if (event.type === "click") {
//       await click(event.value, event.class)
//     }

//     // select a slider value
//     else if (event.type === "select-slider-value") {
//       await selectSliderValue(event.value, event.selector)
//     }

//     // pause temporarily
//     else if (event.type === "pause") {
//       const ms = parseInt(event.value)
//       console.log("pausing for milliseconds:", ms)
//       await pause(ms)
//     }

//     // show an alert
//     else if (event.type === "show-alert") {
//       await showAlert(event.value, event.level)
//     }

//     // submit responses
//     else if (event.type === "submit-responses") {
//       await submitResponses()
//     }

//     await pause(timeBetweenEvents)
//   }
// }

// let canRun = false

// let interval = setInterval(() => {
//   if (!$) {
//     console.log("waiting for jquery to load...")
//     return
//   }

//   clearInterval(interval)
//   console.log("jquery finished loading!")

//   $(window).on(GUIDEDTRACK_PAGE_END_EVENT, () => {
//     canRun = true
//   })

//   $(window).on("gt-test", async (event, data) => {
//     while (!canRun) {
//       await pause(10)
//     }

//     run(event, data)
//   })
// }, 1)
