var p=`:host {\r
    display: flex;\r
    flex-direction: column;\r
    width: 100%;\r
    min-height: 300px;\r
    /* box-sizing: border-box; */\r
    font-family: system-ui, sans-serif;\r
    \r
    border: 0.5px solid var(--border) !important;\r
    border-radius: 12px;\r
    background: var(--secondary);\r
    /* margin: 20px 0; */\r
    overflow: hidden;\r
}\r
\r
\r
.ng-head {\r
    display: grid;\r
    grid-template-columns: 1fr auto 1fr;\r
    align-items: center;\r
    column-gap: 8px;\r
    padding: 8px 12px;\r
    border-bottom: 1px solid rgba(255,255,255,0.12);\r
    font-size: 13px;\r
    color: #ccc;\r
}\r
\r
.ng-title {\r
    justify-self: start;\r
    white-space: nowrap;\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
}\r
\r
.ng-center {\r
    justify-self: center;\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
}\r
\r
.ng-right {\r
    justify-self: end;\r
}\r
\r
.ng-expand-btn {\r
    font-size: 13px;\r
    padding: 5px 10px;\r
    border-radius: 4px;\r
    border: 1px solid rgba(255,255,255,0.25);\r
    background: transparent;\r
    color: #ccc;\r
    cursor: pointer;\r
}\r
\r
.ng-expand-btn:hover {\r
    background: rgba(255,255,255,0.08);\r
}\r
\r
.ng-walklink {\r
    font-size: 13px;\r
    color: #7fb2ff;\r
    background: none;\r
    border: none;\r
    cursor: pointer;\r
    padding: 4px 6px;\r
}\r
\r
.ng-walklink:hover {\r
    text-decoration: underline;\r
}\r
\r
.ng-stepbtn {\r
    width: 22px;\r
    height: 22px;\r
    border-radius: 50%;\r
    border: 1px solid rgba(255,255,255,0.25);\r
    background: transparent;\r
    color: #ccc;\r
    cursor: pointer;\r
    line-height: 1;\r
    font-size: 13px;\r
}\r
\r
.ng-stepbtn:hover {\r
    background: rgba(255,255,255,0.08);\r
}\r
\r
.ng-stepbtn[disabled] {\r
    opacity: 0.3;\r
    pointer-events: none;\r
}\r
\r
.ng-steplabel {\r
    font-size: 12px;\r
    text-align: center;\r
    min-width: 140px;\r
    white-space: nowrap;\r
}\r
\r
.ng-stepcount {\r
    font-size: 10px;\r
    color: #888;\r
    display: block;\r
}\r
\r
.ng-wrap {\r
    width: 100%;\r
    height: 100%;\r
    overflow: auto;\r
    position: relative;\r
}\r
\r
.ng-status {\r
    padding: 1rem;\r
    color: #666;\r
    font-size: 0.9rem;\r
}\r
\r
.ng-canvas {\r
    position: relative;\r
}\r
\r
.ng-node {\r
    position: absolute;\r
    transition: opacity .2s ease;\r
}\r
\r
.ng-node.ng-dim {\r
    opacity: 0.28;\r
}\r
\r
.ng-edge {\r
    transition: opacity .2s ease;\r
}`;var o=class extends HTMLElement{static get observedAttributes(){return["src","steps-src","start-step","can-step"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=`
      <style>${p}</style>
      <div class="ng-head">
        <span class="ng-title"></span>
        <div class="ng-center"></div>
        <div class="ng-right">
          <button class="ng-expand-btn" type="button">Expand</button>
        </div>
      </div>
      <div class="ng-wrap">
        <div class="ng-status">Loading node graph\u2026</div>
      </div>
    `,this._titleEl=this._root.querySelector(".ng-title"),this._wrap=this._root.querySelector(".ng-wrap")}connectedCallback(){this._render()}attributeChangedCallback(t,e,s){e!==s&&this.isConnected&&this._render()}get src(){return this.getAttribute("src")||""}get stepsSrc(){return this.getAttribute("steps-src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="false"||!0}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=this.stepsSrc?await fetch(this.stepsSrc).then(i=>i.json()):null,e=Array.isArray(t?.steps)?t.steps:[],s=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,r=await fetch(s).then(i=>i.json()),n=typeof r=="object"&&r!==null?r:null;this._wrap.innerHTML="";let a=document.createElement("div");a.textContent=`Loaded graph with ${n?Object.keys(n).length:"?"} visuals. ${e.length} steps. Start step: ${this.startStep}. Can step: ${this.canStep}.`,this._wrap.appendChild(a),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:n,steps:e,startStep:this.startStep,canStep:this.canStep},bubbles:!0,composed:!0}))}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}};customElements.define("node-graph",o);export{o as NodeGraph};
//# sourceMappingURL=node-graph.js.map
