import "./styles.css"
import { parseRoute } from "./router.js"
import { mountReviewer } from "./screens/reviewer.js"
import { mountHome } from "./screens/home.js"
import { downloadFeedback } from "./send-local.js"

const root = document.getElementById("app")
const route = parseRoute(window.location.search)

if (route.screen === "reviewer") {
  mountReviewer({ root, route, sendFeedback: downloadFeedback })
} else {
  mountHome({ root })
}
