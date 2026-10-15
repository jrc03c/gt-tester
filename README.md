# GuidedTrack Feedback Harness

Embed a GuidedTrack program, screenshot it, draw on the screenshot, type feedback, and send it to the developer. This version (Phase 1) saves each piece of feedback to the reviewer's computer as a PNG and a JSON file. Later phases store feedback in Supabase, add a developer inbox, and record sessions for replay.

## Using it

1. On GuidedTrack, open the program's **Publish** page and add the harness URL to the list of pages allowed to run the program. The harness URL is the page's own address, for example `https://<user>.github.io/<repo>/`. Adding it once covers every link below.

2. Open the harness, enter the program key, choose **Test** or **Run**, and click **Open**. Or go straight to `?key=<key>&mode=test`.

3. Click **Give feedback** at any point. Draw with the pen or highlighter, add notes that point at parts of the page, type in the box, and click **Send feedback**. Two files download: the annotated PNG and a JSON sidecar with the text, the annotations, and the program lines that were on screen.

"Reset everything" in GuidedTrack's menu works because the harness keeps all its state in the query string.

## Development

Requirements: Node 24. Browser tests need Playwright 1.49.0 and its Chromium. The dev container has both preinstalled; elsewhere run `npm install --no-save playwright@1.49.0 && npx playwright install chromium` once.

- `npm install`
- `npm run build` or `npm run watch`
- `npm test` runs the unit tests, then builds and runs the browser tests
- `npm run format`

Serve the repository root with any static server (for example `npx serve .`) and open `index.html` through it. Opening the file directly from disk does not work because the page uses module scripts.

## Deployment

Every push to `main` runs the tests, builds, and publishes to GitHub Pages through `.github/workflows/deploy.yml`. In the repository settings, set Pages to deploy from **GitHub Actions** once.

## Design

The design spec is `docs/superpowers/specs/2026-10-14-gt-feedback-harness-design.md`. Implementation plans live under `docs/superpowers/plans/`, and spike findings under `docs/superpowers/spikes/`.
