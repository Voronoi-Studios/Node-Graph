// node-graph.js
// How to use: <node-graph src="..." steps-src="..." start-step="0" can-step="true"></node-graph>

import STYLES from "./styles.css";
import { SteppingController } from "./lib/stepping.js";

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

    this._stepping = new SteppingController({
      wrapEl: this._wrap,
      centerEl: this._root.querySelector(".ng-center"),
      canStep: () => this.canStep,
    });
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
      const visuals = (typeof visualsFile === "object" && visualsFile !== null) ? visualsFile : null;

      const bounds = this._computeBounds(visuals);

      this._wrap.innerHTML = "";
      const canvas = document.createElement("div");
      canvas.className = "ng-canvas";
      canvas.style.width = bounds.canvasW + "px";
      canvas.style.height = bounds.canvasH + "px";
      //canvas.insertAdjacentHTML("beforeend", buildEdgesSvg(connections, graph, bounds));

      canvas.textContent = `Loaded graph with ${
        visuals ? Object.keys(visuals).length : "?"
      } visuals. ${steps.length} steps. Start step: ${this.startStep}. Can step: ${this.canStep}.`;
      
      visuals.forEach((n, nodeKey) => {
        const div = document.createElement("div");
        div.className = "ng-node";
        div.dataset.nodeId = nodeKey;
        div.style.left = n.pos.x + bounds.offsetX + "px";
        div.style.top = n.pos.y + bounds.offsetY + "px";
        div.innerHTML = n.svg;
        canvas.appendChild(div);
      });

      this._wrap.appendChild(canvas);

      this._stepping.init(steps, this.startStep);

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

  _computeBounds(visuals) {
    const xs = Object.values(visuals).map((n) => n.pos.x);
    const ys = Object.values(visuals).map((n) => n.pos.y);
    const minX = xs.length ? Math.min(...xs) : 0;
    const minY = ys.length ? Math.min(...ys) : 0;
    const maxX = xs.length ? Math.max(...xs) : 0;
    const maxY = ys.length ? Math.max(...ys) : 0;

    return {
      offsetX: -minX + PAD,
      offsetY: -minY + PAD,
      canvasW: maxX - minX + PAD * 2,
      canvasH: maxY - minY + PAD * 2,
    };
  }
}

customElements.define("node-graph", NodeGraph);

export { NodeGraph };
