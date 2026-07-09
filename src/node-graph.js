// node-graph.js
// How to use: <node-graph src="..." steps-src="..." start-step="0" can-step="true"></node-graph>

import STYLES from "./styles.css";
import TEMPLATE from "./template.html";
import { SteppingController } from "./lib/stepping.js";
import { computeFit, applyCamera, computeBounds } from "./lib/camera.js";
import { icon } from "./lib/icons.js";

class NodeGraph extends HTMLElement {
  static get observedAttributes() {
    return ["src", "steps-src", "start-step", "can-step", "width", "height"];
  }


  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._root.innerHTML = TEMPLATE;

    const styleEl = document.createElement("style");
    styleEl.textContent = STYLES;
    this._root.prepend(styleEl);

    this._root.querySelectorAll(".ng-icon-slot").forEach((slot) => {
      slot.outerHTML = icon(slot.dataset.icon);
    });

    this._titleEl = this._root.querySelector(".ng-title");
    this._wrap = this._root.querySelector(".ng-wrap");
    this._statusEl = this._root.querySelector(".ng-status");

    this._stepping = new SteppingController({
      wrapEl: this._wrap,
      walklinkEl: this._root.querySelector(".ng-walklink"),
      stepperEl: this._root.querySelector(".ng-stepper"),
      prevBtn: this._root.querySelector(".ng-prev"),
      nextBtn: this._root.querySelector(".ng-next"),
      stepcountEl: this._root.querySelector(".ng-stepcount"),
      steptextEl: this._root.querySelector(".ng-steptext"),
      canStep: () => this.canStep,
      updateCam: (ids) => {
        if (!this._canvas || !this._visuals || !this._bounds) return;
        const camera = computeFit(this._wrap, this._visuals, ids, this._bounds);
        applyCamera(this._canvas, camera);
      },
    });

    this._applySize();
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === "width" || name === "height") this._applySize();
    else if (this.isConnected) this._render();
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

  get width() {
    return this.getAttribute("width") || "100%";
  }
 
  get height() {
    return this.getAttribute("height") || "350px";
  }



  _applySize() {
    this.style.width = this.width;
    this.style.height = this.height;
  }

  async _render() {
    this._titleEl.textContent = this.src.split("/").pop() || "node graph";

    if (!this.src) {
      this._wrap.innerHTML = `<div class="ng-status">No src provided.</div>`;
      return;
    }

    try {
      const stepsFile = this.stepsSrc ? await fetch(this.stepsSrc).then((src) => src.json()) : null;
      const steps = Array.isArray(stepsFile?.steps) ? stepsFile.steps : [];

      const srcUrl = !this.src.startsWith("https://voronoi.ch/graph.php?src=") ? `https://voronoi.ch/graph.php?src=${this.src}` : this.src;
      const visualsFile = await fetch(srcUrl).then((src) => src.json());
      this._visuals = (typeof visualsFile === "object" && visualsFile !== null) ? visualsFile : null;

      this._bounds = computeBounds(this._visuals);

      this._wrap.innerHTML = "";
      this._canvas = document.createElement("div");
      this._canvas.className = "ng-canvas";
      this._canvas.style.width = this._bounds.canvasW + "px";
      this._canvas.style.height = this._bounds.canvasH + "px";
      //canvas.insertAdjacentHTML("beforeend", buildEdgesSvg(connections, graph, bounds));

      this._statusEl.textContent = `Loaded graph with ${
        this._visuals ? Object.keys(this._visuals).length : "?"
      } visuals. ${steps.length} steps. Start step: ${this.startStep}. Can step: ${this.canStep}.`;
      
      Object.entries(this._visuals).forEach(([nodeKey, n]) => {
        const div = document.createElement("div");
        div.className = "ng-node";
        div.dataset.nodeId = nodeKey;
        div.style.left = n.pos.x + this._bounds.offsetX + "px";
        div.style.top = n.pos.y + this._bounds.offsetY + "px";
        div.innerHTML = n.svg;
        this._canvas.appendChild(div);
      });

      this._wrap.appendChild(this._canvas);

      this._stepping.init(steps, this.startStep, Object.keys(this._visuals));

      this.dispatchEvent(
        new CustomEvent("node-graph:ready", {
          detail: { visuals: this._visuals, steps, startStep: this.startStep, canStep: this.canStep },
          bubbles: true,
          composed: true,
        })
      );
    } catch (err) {
      this._wrap.innerHTML = `<div class="ng-status">Failed to load: ${String(err)}</div>`;
      console.error("[node-graph]", err);
    }
  }
}

customElements.define("node-graph", NodeGraph);

export { NodeGraph };
