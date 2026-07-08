# node-graph

A dependency-free Web Component (`<node-graph-embed>`) shipped as a single
bundled JS file and distributed via jsDelivr straight off GitHub tags — no
npm publish, no build pipeline required.

## 1. First-time setup

```bash
npm install
```

This installs esbuild as the only dev dependency.

## 2. Local development

Build once:

```bash
npm run build
```

Rebuild on every save:

```bash
npm run watch
```

Serve the demo page locally (in a second terminal, while `watch` is running):

```bash
npm run serve
```

Then open `http://localhost:8080/../demo.html` — or simplest, just open
`demo.html` directly in a browser (double-click it). Since the component
fetches `sample-graph.json` via `fetch()`, some browsers block that on
`file://` URLs — if you see a CORS/fetch error, use `npm run serve` and
browse to `http://localhost:8080` with `demo.html` and the JSON alongside it,
or run any static server from the repo root (e.g. `npx http-server .`).

## 3. Editing the component

All the real logic lives in `src/node-graph-embed.js`. It's currently a
skeleton that:
- reads `src`, `steps-src`, `start-step` attributes
- fetches the JSON at `src`
- renders a placeholder and fires a `node-graph:ready` custom event

Replace the placeholder rendering in `_render()` with your actual graph
drawing code (canvas, SVG, whatever you're already using in the mockup).
Everything else (attribute plumbing, lifecycle, event dispatch) is ready
to build on.

## 4. Cutting a release

**Important: `dist/` must be committed to git** (it's not gitignored) —
jsDelivr serves files directly from your GitHub repo's tree at a given tag,
so the built file has to actually exist in that commit.

```bash
npm run build
git add -A
git commit -m "Release v0.1.0"
git tag v0.1.0
git push origin main --tags
```

## 5. The jsDelivr URL

Once pushed, your bundle is available at:

```
https://cdn.jsdelivr.net/gh/<your-github-username>/node-graph@v0.1.0/dist/node-graph.js
```

Always pin to a specific tag (`@v0.1.0`), never `@latest` or `@main` — that
way the wiki stays stable until you and whoever maintains the wiki agree to
bump the version.

To release a new version later: bump the code, rebuild, commit, tag as
`v0.2.0`, push — and update the URL on the wiki side when you're ready.

## 6. Wiki-side integration

### Option A — plain HTML/Blade page (no framework)

```html
<node-graph-embed
  src="/data/my-graph.json"
  steps-src="/data/my-steps.json"
  start-step="0"
></node-graph-embed>

<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/<user>/node-graph@v0.1.0/dist/node-graph.js"
></script>
```

That's it — no wrapper needed if you're just dropping it into a Blade view.

### Option B — React/MDX wrapper (client-only, dodges SSR)

Custom elements need `window`/DOM, so if the wiki renders this through
React/Next inside MDX, wrap it in a client-only component:

```jsx
// NodeGraph.jsx
"use client";
import { useEffect, useRef } from "react";

const BUNDLE_URL =
  "https://cdn.jsdelivr.net/gh/<user>/node-graph@v0.1.0/dist/node-graph.js";

let loadPromise;
function loadBundle() {
  if (!loadPromise) {
    loadPromise = import(/* webpackIgnore: true */ BUNDLE_URL);
  }
  return loadPromise;
}

export default function NodeGraph({ src, stepsSrc, startStep = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    loadBundle();
  }, []);

  return (
    <node-graph-embed
      ref={ref}
      src={src}
      steps-src={stepsSrc}
      start-step={String(startStep)}
    />
  );
}
```

Use it in MDX as `<NodeGraph src="..." stepsSrc="..." />`. This wrapper is
the only place React touches the component at all — everything else is
plain custom-element behavior.

## 7. Versioning

No `package.json` semver ritual needed for consumers — git tags are the
only version identifier that matters, since that's what the jsDelivr URL
pins to.
