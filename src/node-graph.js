// node-graph.js
// How to use: <node-graph src="..." start-step="0" can-step="true"></node-graph>

import STYLES from "./styles.css";
import TEMPLATE from "./template.html";
import { SteppingController } from "./lib/stepping.js";
import { ExpandOverlay } from "./lib/expand-overlay.js";
import { buildConnectionsSvg } from "./lib/connector.js";
import { attachPanZoom } from "./lib/pan-zoom.js";
import { computeFit, applyCamera, computeBounds } from "./lib/camera.js";
import { icon } from "./lib/icons.js";

class NodeGraph extends HTMLElement {
  static get observedAttributes() {
    return ["src", "start-step", "can-step", "force-expand", "width", "height"];
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

    this._titleEl = this._root.querySelector(".ng-title-text");
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
      updateCam: (ids) => this._applyCameraFit(ids),
    });

    this._panZoom = null;
    this._expandBtnEl = this._root.querySelector(".ng-expand-btn");

    this._overlay = new ExpandOverlay({
      hostEl: this,
      onExpanded: () => {
        this._expandBtnEl.innerHTML = `${icon("x")}Close`;
        // pan/zoom only ever exists while expanded, the small preview stays non-interactive on purpose
        this._panZoom = attachPanZoom(this._wrap, this._canvas);
        this._applyCameraFit(this._stepping.activeIds);
      },
      onCollapsed: () => {
        this._expandBtnEl.innerHTML = `${icon("maximize")}Expand`;
        this._panZoom?.destroy();
        this._panZoom = null;
        this._applySize(); // restore attribute-driven width/height
        this._applyCameraFit(this._stepping.activeIds);
      },
    });
 
    this._expandBtnEl.addEventListener("click", () => {
      if (this._overlay.expanded) this._overlay.collapse();
      else this._overlay.expand();
    });

    this._applySize();
  }

  _applyCameraFit(ids) {
    if (!this._canvas || !this._visuals || !this._bounds) return;
    const camera = computeFit(this._wrap, this._visuals, ids, this._bounds);
    applyCamera(this._canvas, camera);
    this._panZoom?.sync(camera);
  }

  connectedCallback() {
    if (this._hasRenderedOnce) return;
    this._scheduleRender();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === "width" || name === "height") { 
      this._applySize(); return; 
    }
    this._scheduleRender();
  }

  _scheduleRender() {
    if (this._renderScheduled) return;
    this._renderScheduled = true;
    this._hasRenderedOnce = true;
    queueMicrotask(() => {
      this._renderScheduled = false;
      if (this.isConnected) this._render();
    });
  }


  get src() {
    return this.getAttribute("src") || "";
  }

  get startStep() {
    return Number(this.getAttribute("start-step") || 0);
  }

  get canStep() {
    return this.getAttribute("can-step") === "true" || false;
  }

  get forceExpand() {
    return this.getAttribute("force-expand") === "true" || false;
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
      const srcUrl = !this.src.startsWith("https://voronoi.ch/graph.php?src=") ? `https://voronoi.ch/graph.php?src=${this.src}` : this.src;
      const resultFile = await fetch(srcUrl).then((src) => src.json());
      const result = (typeof resultFile === "object" && resultFile !== null) ? resultFile : null;
      
      this._visuals = result?.visuals || {};
      this._connections = result?.connections || {};
      this._steps = result?.steps || [];

      this._bounds = computeBounds(this._visuals);

      this._wrap.innerHTML = "";
      this._canvas = document.createElement("div");
      this._canvas.className = "ng-canvas";
      this._canvas.style.width = this._bounds.canvasW + "px";
      this._canvas.style.height = this._bounds.canvasH + "px";
      this._canvas.insertAdjacentHTML("beforeend", buildConnectionsSvg(this._connections, this._visuals, this._bounds));

      this._statusEl.textContent = `
        Loaded graph with ${this._visuals ? Object.keys(this._visuals).length : "?"} visuals. 
        ${this._connections ? Object.keys(this._connections).length : "?"} connections. 
        ${this._steps.length} steps. 
        Start step: ${this.startStep}. 
        Can step: ${this.canStep}.
      `;
      
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

      this._stepping.init(this._steps, this.startStep, Object.keys(this._visuals));

      if (this.forceExpand) { 
        this._overlay.expand();
        this._expandBtnEl.visibility = 'hidden'; 
      }

      this.dispatchEvent(
        new CustomEvent("node-graph:ready", {
          detail: { visuals: this._visuals, steps: this._steps, startStep: this.startStep, canStep: this.canStep, forceExpand: this.forceExpand },
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
