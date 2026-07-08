import * as esbuild from "esbuild";

const watch = process.argv.includes("--watch");

const options = {
  entryPoints: ["src/node-graph.js"],
  bundle: true,
  minify: !watch,
  sourcemap: true,
  format: "esm",
  target: ["es2020"],
  outfile: "dist/node-graph.js",
  logLevel: "info",
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build(options);
}
