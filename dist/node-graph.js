var d=`:host {\r
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
    font-size: 14px;\r
    padding: 8px 16px;\r
    border-radius: 8px;\r
    border: 1px solid var(--ring);\r
    background: transparent;\r
    color: #ccc;\r
    transition: background 0.15s, transform 0.1s;\r
}\r
\r
.ng-expand-btn:hover {\r
    background: rgba(255,255,255,0.08);\r
}\r
\r
.ng-walklink {\r
    font-size: 14px;\r
    padding: 8px 16px;\r
    border-radius: 8px;\r
    border: 1px solid var(--ring);\r
    background: transparent;\r
    color: #ccc;\r
    transition: background 0.15s, transform 0.1s;\r
}\r
\r
.ng-walklink:hover {\r
    text-decoration: underline;\r
    background: rgba(255,255,255,0.08);\r
}\r
\r
.ng-stepbtn {\r
    padding: 4px 12px;\r
    border-radius: 8px;\r
    border: 1px solid var(--ring);\r
    background: transparent;\r
    color: #ccc;\r
    line-height: 1;\r
    font-size: 14px;\r
    transition: background 0.15s, transform 0.1s;\r
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
    height: 10px;\r
}\r
\r
.ng-wrap {\r
    width: 100%;\r
    height: 100%;\r
    overflow: auto;\r
    position: relative;\r
    background: var(--card);\r
    flex: auto;\r
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
}`;var c=class{constructor({wrapEl:e,centerEl:t,canStep:s}){this._wrapEl=e,this._centerEl=t,this._canStep=s,this.steps=[],this.mode="none",this.currentStep=0}init(e,t){this.steps=e,e.length?t===0?(this.mode="whole",this._clearDim()):(this.mode="stepping",this.currentStep=Math.min(Math.max(t-1,0),e.length-1),this._applyDim(e[this.currentStep].ids)):this.mode="none",this._renderCenter()}_applyDim(e){this._wrapEl.querySelectorAll(".ng-node").forEach(t=>{t.classList.toggle("ng-dim",!e.includes(t.dataset.nodeId))}),this._wrapEl.querySelectorAll(".ng-edge").forEach(t=>{let s=e.includes(t.dataset.from)&&e.includes(t.dataset.to);t.style.opacity=s?"1":"0.25"})}_clearDim(){this._wrapEl.querySelectorAll(".ng-node").forEach(e=>e.classList.remove("ng-dim")),this._wrapEl.querySelectorAll(".ng-edge").forEach(e=>e.style.opacity="1")}_renderCenter(){if(this._centerEl.innerHTML="",this.mode==="none")return;if(this.mode==="whole"){if(!this._canStep())return;let r=document.createElement("button");r.className="ng-walklink",r.type="button",r.textContent="Start walkthrough \u2192",r.addEventListener("click",()=>this._startWalkthrough()),this._centerEl.appendChild(r);return}let e=this.steps[this.currentStep],t=document.createElement("button");t.className="ng-stepbtn",t.type="button",t.textContent="\u2039",t.setAttribute("aria-label","Previous step");let s=document.createElement("span");s.className="ng-steplabel",s.innerHTML=`<span class="ng-stepcount">step ${this.currentStep+1} of ${this.steps.length}</span>${e.label||""}`;let n=document.createElement("button");n.className="ng-stepbtn",n.type="button",n.textContent="\u203A",n.setAttribute("aria-label","Next step"),n.disabled=this.currentStep===this.steps.length-1,this._canStep()?(t.addEventListener("click",()=>this._goStep(-1)),n.addEventListener("click",()=>this._goStep(1))):(t.disabled=!0,n.disabled=!0),this._centerEl.append(t,s,n)}_startWalkthrough(){this.mode="stepping",this.currentStep=0,this._applyDim(this.steps[0].ids),this._renderCenter()}_exitToWhole(){this.mode="whole",this._clearDim(),this._renderCenter()}_goStep(e){let t=this.currentStep+e;if(t<0){this._exitToWhole();return}t>this.steps.length-1||(this.currentStep=t,this._applyDim(this.steps[this.currentStep].ids),this._renderCenter())}};var l=class extends HTMLElement{static get observedAttributes(){return["src","steps-src","start-step","can-step"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=`
      <style>${d}</style>
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
    `,this._titleEl=this._root.querySelector(".ng-title"),this._wrap=this._root.querySelector(".ng-wrap"),this._stepping=new c({wrapEl:this._wrap,centerEl:this._root.querySelector(".ng-center"),canStep:()=>this.canStep})}connectedCallback(){this._render()}attributeChangedCallback(e,t,s){t!==s&&this.isConnected&&this._render()}get src(){return this.getAttribute("src")||""}get stepsSrc(){return this.getAttribute("steps-src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="false"||!0}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let e=this.stepsSrc?await fetch(this.stepsSrc).then(i=>i.json()):null,t=Array.isArray(e?.steps)?e.steps:[],s=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,n=await fetch(s).then(i=>i.json()),r=typeof n=="object"&&n!==null?n:null,o=computeBounds(graph);this._wrap.innerHTML="";let a=document.createElement("div");a.className="ng-canvas",a.style.width=o.canvasW+"px",a.style.height=o.canvasH+"px",a.textContent=`Loaded graph with ${r?Object.keys(r).length:"?"} visuals. ${t.length} steps. Start step: ${this.startStep}. Can step: ${this.canStep}.`,r.forEach((i,g)=>{let p=document.createElement("div");p.className="ng-node",p.dataset.nodeId=g,p.style.left=i.pos.x+o.offsetX+"px",p.style.top=i.pos.y+o.offsetY+"px",p.innerHTML=i.svg,a.appendChild(p)}),this._wrap.appendChild(a),this._stepping.init(t,this.startStep),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:r,steps:t,startStep:this.startStep,canStep:this.canStep},bubbles:!0,composed:!0}))}catch(e){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(e)}</div>`,console.error("[node-graph]",e)}}computeBounds(e){let t=Array.from(e.values()).map(i=>i.x),s=Array.from(e.values()).map(i=>i.y),n=t.length?Math.min(...t):0,r=s.length?Math.min(...s):0,o=t.length?Math.max(...t):0,a=s.length?Math.max(...s):0;return{offsetX:-n+PAD,offsetY:-r+PAD,canvasW:o-n+PAD*2,canvasH:a-r+PAD*2}}};customElements.define("node-graph",l);export{l as NodeGraph};
//# sourceMappingURL=node-graph.js.map
