# Node Graph

A framework-agnostic Web Component (custom element) that renders Hytale Node Editor JSON files. It is implemented as a native custom element (class NodeGraph extends HTMLElement) and can be used from plain HTML, MDX, or any framework that can render custom elements.


`<script type="module" src="https://cdn.jsdelivr.net/gh/Voronoi-Studios/Node-Graph@latest/dist/node-graph.js"></script>` to add it.


If used somwhere like the [HytaleModding's Wiki](https://wiki.hytalemodding.dev/) this might be needed as well to make sure when the Markdown gets sanitized it does not strip out or stuff:
```js
DOMPurify.sanitize(html, {
    ADD_TAGS: ['node-graph'],
    ADD_ATTR: ['src', 'steps-src', 'start-step', 'can-step'],
});
```

## Features:
- Browse Hytale Node trees directly in the browser.
- Groups of nodes can be faded out or highlighted for educational purposes.

## Usage:
### Example
```html
<node-graph
  src="path/graph.json"
  steps-src="path/steps.json"
  start-step="0"
  can-step="true">
</node-graph>
```
### Explanation
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

$${\color{gray}\begin{gathered}
AI \space Notice:\\
A \space first \space draft \space was \space initially \space created \space with \space AI \space assistance,\\
since \space then \space my \space stance \space on \space AI \space has \space strongly \space shifted, \space so \space I \\
removed \space or \space rewrote \space those \space parts \space to \space my \space best \space ability.
\end{gathered}}$$
