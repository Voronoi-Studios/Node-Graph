// <node-graph src="..." steps-src="..." start-step="0" can-step="true"></node-graph>
//
// A dependency-free custom element. No React, no build-time framework —
// just DOM APIs, so this stays a single portable bundle.

const STYLES = `
  :host {
    display: block;
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
    font-family: system-ui, sans-serif;
  }
  .ng-wrap {
    width: 100%;
    height: 100%;
  }
  .ng-status {
    padding: 1rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

class NodeGraph extends HTMLElement {
  static get observedAttributes() {
    return ["src", "steps-src", "start-step", "can-step"];
  }

  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
      <style>${STYLES}</style>
      <div class="ng-wrap">
        <div class="ng-status">Loading node graph…</div>
      </div>
    `;
    this._wrap = this._root.querySelector(".ng-wrap");
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(_name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (this.isConnected) this._render();
  }

  get src() {
    return this.getAttribute("src") || "";
  }

  get stepsSrc() {
    return this.getAttribute("steps-src") || "";
  }

  get startStep() {
    return Number(this.getAttribute("start-step") || 0);
  }

  get canStep() {
    return this.getAttribute("can-step") === "true";
  }

  async _render() {
    if (!this.src) {
      this._wrap.innerHTML = `<div class="ng-status">No src provided.</div>`;
      return;
    }

    try {
      // TODO: replace with your actual graph loading/rendering logic.
      // This is just a placeholder that proves the attribute plumbing works.
      const data = await fetch(this.src).then((r) => r.json());
      const steps = this.stepsSrc
        ? await fetch(this.stepsSrc).then((r) => r.json())
        : null;

      this._wrap.innerHTML = "";
      const canvas = document.createElement("div");
      canvas.textContent = `Loaded graph with ${
        Array.isArray(data?.nodes) ? data.nodes.length : "?"
      } nodes. Start step: ${this.startStep}. Can step: ${this.canStep}.`;
      this._wrap.appendChild(canvas);

      this.dispatchEvent(
        new CustomEvent("node-graph:ready", {
          detail: { data, steps, startStep: this.startStepm, canStep: this.canStep },
          bubbles: true,
          composed: true,
        })
      );
    } catch (err) {
      this._wrap.innerHTML = `<div class="ng-status">Failed to load: ${String(
        err
      )}</div>`;
      console.error("[node-graph]", err);
    }
  }
}

customElements.define("node-graph", NodeGraph);

export { NodeGraph };
