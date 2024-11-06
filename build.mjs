import { execSync } from "node:child_process"
import { watch } from "@jrc03c/watch"

function rebuild() {
  console.log("-----")
  console.log(`\nRebuilding... (${new Date().toLocaleString()})`)

  try {
    const commands = [
      `npx esbuild test/res/js/src/main.mjs --bundle --minify --platform=node --outfile=test/res/js/bundle.require.cjs`,
      `npx esbuild test/res/js/src/main.mjs --bundle --minify --outfile=test/res/js/bundle.standalone.cjs`,
      `npx esbuild test/res/js/src/main.mjs --bundle --minify --format=esm --outfile=test/res/js/bundle.import.mjs`,
    ]

    commands.forEach(command => {
      execSync(command, { encoding: "utf8" })
    })

    console.log("\nDone! 🎉\n")
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.includes("--watch") || process.argv.includes("-w")) {
  watch({
    target: "test/res/js/src",
    exclude: ["bundle.js", "node_modules"],
    created: rebuild,
    modified: rebuild,
    deleted: rebuild,
  })
}

rebuild()
