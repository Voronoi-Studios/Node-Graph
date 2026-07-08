// node-graph.js
// How to use: <node-graph src="..." steps-src="..." start-step="0" can-step="true"></node-graph>

import STYLES from "./styles.css";

class NodeGraph extends HTMLElement {
  static get observedAttributes() {
    return ["src", "steps-src", "start-step", "can-step"];
  }

  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = `
      <style>${STYLES}</style>
      <div class="ng-head">
        <span class="ng-title"></span>
        <div class="ng-center"></div>
        <div class="ng-right">
          <button class="ng-expand-btn" type="button">Expand</button>
        </div>
      </div>
      <div class="ng-wrap">
        <div class="ng-status">Loading node graph…</div>
      </div>
    `;
    this._titleEl = this._root.querySelector(".ng-title");
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
    return this.getAttribute("can-step") === "false" || true;
  }

  async _render() {
    this._titleEl.textContent = this.src.split("/").pop() || "node graph";

    if (!this.src) {
      this._wrap.innerHTML = `<div class="ng-status">No src provided.</div>`;
      return;
    }

    try {
      // TO-DO: replace with actual graph loading/rendering logic.
      const stepsFile = this.stepsSrc ? await fetch(this.stepsSrc).then((src) => src.json()) : null;
      const steps = Array.isArray(stepsFile?.steps) ? stepsFile.steps : [];

      const srcUrl = !this.src.startsWith("https://voronoi.ch/graph.php?src=") ? `https://voronoi.ch/graph.php?src=${this.src}` : this.src;
      const visualsFile = await fetch(srcUrl).then((src) => src.json());
      const visuals = Array.isArray(visualsFile) ? visualsFile : null;

      this._wrap.innerHTML = "";
      const canvas = document.createElement("div");
      canvas.textContent = `Loaded graph with ${
        Array.isArray(visuals) ? visuals.length : "?"
      } visuals. Start step: ${this.startStep}. Can step: ${this.canStep}.`;
      this._wrap.appendChild(canvas);

      this.dispatchEvent(
        new CustomEvent("node-graph:ready", {
          detail: { visuals, steps, startStep: this.startStep, canStep: this.canStep },
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
