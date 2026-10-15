export function mountHome({ root }) {
  root.innerHTML = `
    <main class="harness-home">
      <h1>GuidedTrack Feedback Harness</h1>
      <p>Enter a program key to run it inside the harness. This version saves each piece of feedback to your computer as a PNG and a JSON file.</p>
      <form class="harness-home-form">
        <label>Program key <input name="key" required pattern="[A-Za-z0-9]+" placeholder="abc1234" autocomplete="off" /></label>
        <fieldset>
          <legend>Mode</legend>
          <label><input type="radio" name="mode" value="test" checked /> Test (a fresh run every load)</label>
          <label><input type="radio" name="mode" value="run" /> Run (continues like a real participant)</label>
        </fieldset>
        <button type="submit">Open</button>
      </form>
    </main>`

  root.querySelector("form").addEventListener("submit", event => {
    event.preventDefault()
    const form = new FormData(event.target)
    const params = new URLSearchParams({
      key: String(form.get("key")).trim(),
      mode: String(form.get("mode")),
    })
    window.location.search = `?${params}`
  })
}
