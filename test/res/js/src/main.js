const container = document.getElementById("REPLACE-ME")
const search = window.location.search
const params = new URLSearchParams(search)
const id = params.get("id")

if (!id) {
  window.location.href = window.location.protocol + "//" + window.location.host
} else {
  container.id = id
}
