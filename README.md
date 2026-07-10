# node-graph

A mdx component that adds a node viewer for Hytale Node Editor json files.
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

- `src`: path to the actual node json file.
- `steps-src`: path to the step src json, see https://github.com/Voronoi-Studios/Node-Graph/blob/ea381ebf53ce895dc1662a3f6831fa63017a6668/sample-steps.json
- `start-step`: default is 0, which means it shows the full graph. if a step file is provided then it will show with that step focused when the user first loads the component
- `can-step`: defines if the user can use the buttons to step trough the node tree. Can be usefull if more of a step by step explaninaition is the goal where the component only should show what is relevant to that step and it allways fits what the text surrounding the component says.

> [!IMPORTANT]
> Currently, only paths from these whitelisted hosts are allowed:\
> `raw.githubusercontent.com`\
> `github.com`\
> `githubusercontent.com`\
> `cdn.discordapp.com` (only works for files posted in public Discords)\
> `cdn.jsdelivr.net`\
> `wiki.hytalemodding.dev`

