export function parseRoute(search) {
  const params = new URLSearchParams(search)
  const key = (params.get("key") || "").trim()

  if (key) {
    return {
      screen: "reviewer",
      key,
      mode: params.get("mode") === "test" ? "test" : "run",
    }
  }

  return { screen: "home" }
}
