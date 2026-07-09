var v=`:host {\r
    display: flex;\r
    flex-direction: column;\r
    width: 100%;\r
    height: 350px;\r
    font-family: system-ui, sans-serif;\r
    \r
    border: 0.5px solid var(--border) !important;\r
    border-radius: 12px;\r
    background: var(--secondary);\r
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
.ng-icon {\r
    flex: none;\r
    vertical-align: middle;\r
    position: relative;\r
    top: -1px;\r
}\r
\r
\r
.ng-title {\r
    justify-self: start;\r
    display: flex;\r
    align-items: center;\r
    gap: 6px;\r
    white-space: nowrap;\r
    overflow: hidden;\r
\r
}\r
\r
.ng-title-text {\r
    overflow: hidden;\r
    text-overflow: ellipsis;\r
}\r
\r
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
    display: inline-flex;\r
    align-items: center;\r
    gap: 6px;\r
    font-size: 14px;\r
    padding: 8px 16px;\r
    border-radius: 8px;\r
    border: 1px solid var(--ring);\r
    background: transparent;\r
    color: #ccc;\r
    transition: background 0.15s, transform 0.1s;\r
}\r
\r
\r
.ng-expand-btn:hover {\r
    background: rgba(255,255,255,0.08);\r
}\r
\r
.ng-walklink {\r
    display: inline-flex;\r
    align-items: center;\r
    gap: 6px;\r
    font-size: 14px;\r
    padding: 8px 16px;\r
    border-radius: 8px;\r
    border: 1px solid var(--ring);\r
    background: transparent;\r
    color: #ccc;\r
    transition: background 0.15s, transform 0.1s;\r
}\r
\r
\r
.ng-walklink:hover {\r
    text-decoration: underline;\r
    background: rgba(255,255,255,0.08);\r
}\r
\r
.ng-stepper {\r
    display: flex;\r
    align-items: center;\r
    gap: 8px;\r
}\r
\r
.ng-walklink[hidden],\r
.ng-stepper[hidden] {\r
    display: none;\r
}\r
\r
\r
.ng-stepbtn {\r
    display: inline-flex;\r
    align-items: center;\r
    justify-content: center;\r
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
    overflow: hidden;\r
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
    transform-origin: 0 0;\r
    transition: transform .4s cubic-bezier(.22, .8, .2, 1);\r
}\r
\r
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
}`;var b=`<div class="ng-head">\r
  <span class="ng-title">\r
    <span class="ng-icon-slot" data-icon="git-branch"></span>\r
    <span class="ng-title-text"></span>\r
  </span>\r
  <div class="ng-center">\r
    <button class="ng-walklink" type="button" hidden>\r
      <span class="ng-icon-slot" data-icon="play"></span>\r
      <span>Start walkthrough \u2192</span>\r
    </button>\r
    <div class="ng-stepper" hidden>\r
      <button class="ng-stepbtn ng-prev" type="button" aria-label="Previous step">\r
        <span class="ng-icon-slot" data-icon="chevron-left"></span>\r
      </button>\r
      <span class="ng-steplabel">\r
        <span class="ng-stepcount"></span>\r
        <span class="ng-steptext"></span>\r
      </span>\r
      <button class="ng-stepbtn ng-next" type="button" aria-label="Next step">\r
        <span class="ng-icon-slot" data-icon="chevron-right"></span>\r
      </button>\r
    </div>\r
  </div>\r
  <div class="ng-right">\r
    <button class="ng-expand-btn" type="button">\r
      <span class="ng-icon-slot" data-icon="maximize-2"></span>\r
      Expand\r
    </button>\r
  </div>\r
</div>\r
<div class="ng-wrap">\r
  <div class="ng-status">Loading node graph\u2026</div>\r
</div>`;var g=class{constructor({wrapEl:t,walklinkEl:e,stepperEl:s,prevBtn:r,nextBtn:i,stepcountEl:a,steptextEl:n,canStep:o,updateCam:p}){this._wrapEl=t,this._walklinkEl=e,this._stepperEl=s,this._prevBtn=r,this._nextBtn=i,this._stepcountEl=a,this._steptextEl=n,this._canStep=o,this._updateCam=p,this.steps=[],this.mode="none",this.currentStep=0,this._allIds=[],this._walklinkEl.addEventListener("click",()=>this._startWalkthrough()),this._prevBtn.addEventListener("click",()=>this._goStep(-1)),this._nextBtn.addEventListener("click",()=>this._goStep(1))}init(t,e,s=[]){this.steps=t,this._allIds=s,t.length?e===0?(this.mode="whole",this._clearDim(),this._updateCam(this._allIds)):(this.mode="stepping",this.currentStep=Math.min(Math.max(e-1,0),t.length-1),this._applyDim(t[this.currentStep].ids),this._updateCam(t[this.currentStep].ids)):(this.mode="none",this._clearDim(),this._updateCam(this._allIds)),this._syncUI()}_applyDim(t){this._wrapEl.querySelectorAll(".ng-node").forEach(e=>{e.classList.toggle("ng-dim",!t.includes(e.dataset.nodeId))}),this._wrapEl.querySelectorAll(".ng-edge").forEach(e=>{let s=t.includes(e.dataset.from)&&t.includes(e.dataset.to);e.style.opacity=s?"1":"0.25"})}_clearDim(){this._wrapEl.querySelectorAll(".ng-node").forEach(t=>t.classList.remove("ng-dim")),this._wrapEl.querySelectorAll(".ng-edge").forEach(t=>t.style.opacity="1")}_syncUI(){if(this.mode==="none"){this._walklinkEl.hidden=!0,this._stepperEl.hidden=!0;return}if(this.mode==="whole"){let s=this._canStep();this._walklinkEl.hidden=!s,this._stepperEl.hidden=!0;return}this._walklinkEl.hidden=!0,this._stepperEl.hidden=!1;let t=this.steps[this.currentStep];this._stepcountEl.textContent=`step ${this.currentStep+1} of ${this.steps.length}`,this._steptextEl.textContent=t.label||"";let e=this._canStep();this._prevBtn.disabled=!e,this._nextBtn.disabled=!e||this.currentStep===this.steps.length-1}_startWalkthrough(){this.mode="stepping",this.currentStep=0,this._applyDim(this.steps[0].ids),this._updateCam(this.steps[0].ids),this._syncUI()}_exitToWhole(){this.mode="whole",this._clearDim(),this._updateCam(this._allIds),this._syncUI()}_goStep(t){let e=this.currentStep+t;if(e<0){this._exitToWhole();return}e>this.steps.length-1||(this.currentStep=e,this._applyDim(this.steps[this.currentStep].ids),this._updateCam(this.steps[this.currentStep].ids),this._syncUI())}};function w(l,t,e,s){let r=e.map(c=>t[c]).filter(Boolean);if(!r.length)return null;let i=1/0,a=1/0,n=-1/0,o=-1/0;r.forEach(c=>{let y=c.pos.x+s.offsetX,f=c.pos.y+s.offsetY;i=Math.min(i,y),a=Math.min(a,f),n=Math.max(n,y+(c.width||160)),o=Math.max(o,f+(c.height||90))});let p=60;i-=p,a-=p,n+=p,o+=p;let h=n-i,m=o-a,u=l.clientWidth,x=l.clientHeight;if(!h||!m||!u||!x)return null;let d=Math.min(u/h,x/m);d=Math.min(Math.max(d,.25),1.5);let E=(i+n)/2,C=(a+o)/2;return{x:u/2-E*d,y:x/2-C*d,scale:d}}function S(l,t){t&&(l.style.transform=`translate(${t.x}px, ${t.y}px) scale(${t.scale})`)}var I={"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',"maximize-2":`
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  `,"git-branch":`
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  `};function k(l,t=14){let e=I[l];return e?`<svg class="ng-icon" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`:""}var _=class extends HTMLElement{static get observedAttributes(){return["src","steps-src","start-step","can-step","width","height"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=b;let t=document.createElement("style");t.textContent=v,this._root.prepend(t),this._root.querySelectorAll(".ng-icon-slot").forEach(e=>{e.outerHTML=k(e.dataset.icon)}),this._titleEl=this._root.querySelector(".ng-title"),this._wrap=this._root.querySelector(".ng-wrap"),this._statusEl=this._root.querySelector(".ng-status"),this._stepping=new g({wrapEl:this._wrap,walklinkEl:this._root.querySelector(".ng-walklink"),stepperEl:this._root.querySelector(".ng-stepper"),prevBtn:this._root.querySelector(".ng-prev"),nextBtn:this._root.querySelector(".ng-next"),stepcountEl:this._root.querySelector(".ng-stepcount"),steptextEl:this._root.querySelector(".ng-steptext"),canStep:()=>this.canStep,updateCam:e=>{if(!this._canvas||!this._visuals||!this._bounds)return;let s=w(this._wrap,this._visuals,e,this._bounds);S(this._canvas,s)}}),this._applySize()}connectedCallback(){this._render()}attributeChangedCallback(t,e,s){e!==s&&(t==="width"||t==="height"?this._applySize():this.isConnected&&this._render())}get src(){return this.getAttribute("src")||""}get stepsSrc(){return this.getAttribute("steps-src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="false"||!0}get width(){return this.getAttribute("width")||"100%"}get height(){return this.getAttribute("height")||"350px"}_applySize(){this.style.width=this.width,this.style.height=this.height}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=this.stepsSrc?await fetch(this.stepsSrc).then(i=>i.json()):null,e=Array.isArray(t?.steps)?t.steps:[],s=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,r=await fetch(s).then(i=>i.json());this._visuals=typeof r=="object"&&r!==null?r:null,this._bounds=this._computeBounds(this._visuals),this._wrap.innerHTML="",this._canvas=document.createElement("div"),this._canvas.className="ng-canvas",this._canvas.style.width=this._bounds.canvasW+"px",this._canvas.style.height=this._bounds.canvasH+"px",this._statusEl.textContent=`Loaded graph with ${this._visuals?Object.keys(this._visuals).length:"?"} visuals. ${e.length} steps. Start step: ${this.startStep}. Can step: ${this.canStep}.`,Object.entries(this._visuals).forEach(([i,a])=>{let n=document.createElement("div");n.className="ng-node",n.dataset.nodeId=i,n.style.left=a.pos.x+this._bounds.offsetX+"px",n.style.top=a.pos.y+this._bounds.offsetY+"px",n.innerHTML=a.svg,this._canvas.appendChild(n)}),this._wrap.appendChild(this._canvas),this._stepping.init(e,this.startStep,Object.keys(this._visuals)),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:this._visuals,steps:e,startStep:this.startStep,canStep:this.canStep},bubbles:!0,composed:!0}))}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}_computeBounds(t){let e=Object.values(t).map(h=>h.pos.x),s=Object.values(t).map(h=>h.pos.y),r=0,i=0,a=e.length?Math.min(...e):0,n=s.length?Math.min(...s):0,o=e.length&&r.length?Math.max(...e)+Math.max(...r):0,p=s.length&&i.length?Math.max(...s)+Math.max(...i):0;return{offsetX:-a+20,offsetY:-n+20,canvasW:o-a+20*2,canvasH:p-n+20*2}}};customElements.define("node-graph",_);export{_ as NodeGraph};
//# sourceMappingURL=node-graph.js.map
