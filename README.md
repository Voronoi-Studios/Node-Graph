# node-graph

A mdx commponent that adds a node viewer for Hytale Node Editor json files.
Browse them directly in the browser.

Also allows for a steps json, so groups of nodes can be faded out or highlighted for educational purposes.

Usage:
```html
<node-graph
  src="path/graph.json"
  steps-src="path/steps.json"
  start-step="0"
  can-step="true">
</node-graph>
```

Currently, only paths from these whitelisted hosts are allowed:
- raw.githubusercontent.com
- github.com
- githubusercontent.com
- cdn.discordapp.com (only works for files posted in public Discords)
- cdn.jsdelivr.net
- wiki.hytalemodding.dev

