var i=`
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
`,n=class extends HTMLElement{static get observedAttributes(){return["src","steps-src","start-step","can-step"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=`
      <style>${i}</style>
      <div class="ng-wrap">
        <div class="ng-status">Loading node graph\u2026</div>
      </div>
    `,this._wrap=this._root.querySelector(".ng-wrap")}connectedCallback(){this._render()}attributeChangedCallback(t,s,e){s!==e&&this.isConnected&&this._render()}get src(){return this.getAttribute("src")||""}get stepsSrc(){return this.getAttribute("steps-src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="true"}async _render(){if(!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=await fetch(this.src).then(r=>r.json()),s=this.stepsSrc?await fetch(this.stepsSrc).then(r=>r.json()):null;this._wrap.innerHTML="";let e=document.createElement("div");e.textContent=`Loaded graph with ${Array.isArray(t?.nodes)?t.nodes.length:"?"} nodes. Start step: ${this.startStep}. Can step: ${this.canStep}.`,this._wrap.appendChild(e),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{data:t,steps:s,startStep:this.startStepm,canStep:this.canStep},bubbles:!0,composed:!0}))}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}};customElements.define("node-graph",n);export{n as NodeGraph};
//# sourceMappingURL=node-graph.js.map
