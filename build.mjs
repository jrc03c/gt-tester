import * as esbuild from "esbuild"

const watch = process.argv.includes("--watch")

const builds = [
  { entryPoints: ["src/main.js"], outdir: "dist" },
  { entryPoints: ["test/fixtures/entry.js"], outdir: "test/fixtures/build" },
]

for (const build of builds) {
  const options = {
    ...build,
    bundle: true,
    format: "esm",
    sourcemap: true,
    target: ["es2020"],
    logLevel: "info",
  }

  if (watch) {
    const context = await esbuild.context(options)
    await context.watch()
  } else {
    await esbuild.build(options)
  }
}
