var f=`:host {\r
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
}`;var y=`<div class="ng-head">\r
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
</div>`;var d=class{constructor({wrapEl:t,walklinkEl:e,stepperEl:s,prevBtn:r,nextBtn:i,stepcountEl:n,steptextEl:o,canStep:p,updateCam:l}){this._wrapEl=t,this._walklinkEl=e,this._stepperEl=s,this._prevBtn=r,this._nextBtn=i,this._stepcountEl=n,this._steptextEl=o,this._canStep=p,this._updateCam=l,this.steps=[],this.mode="none",this.currentStep=0,this._allIds=[],this._walklinkEl.addEventListener("click",()=>this._startWalkthrough()),this._prevBtn.addEventListener("click",()=>this._goStep(-1)),this._nextBtn.addEventListener("click",()=>this._goStep(1))}init(t,e,s=[]){this.steps=t,this._allIds=s,t.length?e===0?(this.mode="whole",this._clearDim(),this._updateCam(this._allIds)):(this.mode="stepping",this.currentStep=Math.min(Math.max(e-1,0),t.length-1),this._applyDim(t[this.currentStep].ids),this._updateCam(t[this.currentStep].ids)):(this.mode="none",this._clearDim(),this._updateCam(this._allIds)),this._syncUI()}_applyDim(t){this._wrapEl.querySelectorAll(".ng-node").forEach(e=>{e.classList.toggle("ng-dim",!t.includes(e.dataset.nodeId))}),this._wrapEl.querySelectorAll(".ng-edge").forEach(e=>{let s=t.includes(e.dataset.from)&&t.includes(e.dataset.to);e.style.opacity=s?"1":"0.25"})}_clearDim(){this._wrapEl.querySelectorAll(".ng-node").forEach(t=>t.classList.remove("ng-dim")),this._wrapEl.querySelectorAll(".ng-edge").forEach(t=>t.style.opacity="1")}_syncUI(){if(this.mode==="none"){this._walklinkEl.hidden=!0,this._stepperEl.hidden=!0;return}if(this.mode==="whole"){let s=this._canStep();this._walklinkEl.hidden=!s,this._stepperEl.hidden=!0;return}this._walklinkEl.hidden=!0,this._stepperEl.hidden=!1;let t=this.steps[this.currentStep];this._stepcountEl.textContent=`step ${this.currentStep+1} of ${this.steps.length}`,this._steptextEl.textContent=t.label||"";let e=this._canStep();this._prevBtn.disabled=!e,this._nextBtn.disabled=!e||this.currentStep===this.steps.length-1}_startWalkthrough(){this.mode="stepping",this.currentStep=0,this._applyDim(this.steps[0].ids),this._updateCam(this.steps[0].ids),this._syncUI()}_exitToWhole(){this.mode="whole",this._clearDim(),this._updateCam(this._allIds),this._syncUI()}_goStep(t){let e=this.currentStep+t;if(e<0){this._exitToWhole();return}e>this.steps.length-1||(this.currentStep=e,this._applyDim(this.steps[this.currentStep].ids),this._updateCam(this.steps[this.currentStep].ids),this._syncUI())}};function v(a){let t=Object.values(a);if(!t.length)return{minX:0,minY:0,maxX:0,maxY:0};let e=1/0,s=1/0,r=-1/0,i=-1/0;return t.forEach(n=>{e=Math.min(e,n.pos.x),s=Math.min(s,n.pos.y),r=Math.max(r,n.pos.x+(n.width||160)),i=Math.max(i,n.pos.y+(n.height||90))}),{minX:e,minY:s,maxX:r,maxY:i}}function b(a,t,e,s){let r=Object.fromEntries(e.map(c=>[c,t[c]]).filter(([,c])=>c)),{minX:i,minY:n,maxX:o,maxY:p}=v(r),l=60;i+=s.offsetX-l,n+=s.offsetY-l,o+=s.offsetX+l,p+=s.offsetY+l;let _=o-i,m=p-n,g=a.clientWidth,u=a.clientHeight;if(!_||!m||!g||!u)return null;let h=Math.min(g/_,u/m);h=Math.min(Math.max(h,.25),1.5);let k=(i+o)/2,C=(n+p)/2;return{x:g/2-k*h,y:u/2-C*h,scale:h}}function w(a,t){t&&(a.style.transform=`translate(${t.x}px, ${t.y}px) scale(${t.scale})`)}function S(a){let{minX:t,minY:e,maxX:s,maxY:r}=v(a),i=60;return t-=i,e-=i,s+=i,r+=i,{offsetX:-t,offsetY:-e,canvasW:s-t,canvasH:r-e}}var I={"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',"maximize-2":`
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  `,"git-branch":`
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  `};function E(a,t=14){let e=I[a];return e?`<svg class="ng-icon" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`:""}var x=class extends HTMLElement{static get observedAttributes(){return["src","steps-src","start-step","can-step","width","height"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=y;let t=document.createElement("style");t.textContent=f,this._root.prepend(t),this._root.querySelectorAll(".ng-icon-slot").forEach(e=>{e.outerHTML=E(e.dataset.icon)}),this._titleEl=this._root.querySelector(".ng-title"),this._wrap=this._root.querySelector(".ng-wrap"),this._statusEl=this._root.querySelector(".ng-status"),this._stepping=new d({wrapEl:this._wrap,walklinkEl:this._root.querySelector(".ng-walklink"),stepperEl:this._root.querySelector(".ng-stepper"),prevBtn:this._root.querySelector(".ng-prev"),nextBtn:this._root.querySelector(".ng-next"),stepcountEl:this._root.querySelector(".ng-stepcount"),steptextEl:this._root.querySelector(".ng-steptext"),canStep:()=>this.canStep,updateCam:e=>{if(!this._canvas||!this._visuals||!this._bounds)return;let s=b(this._wrap,this._visuals,e,this._bounds);w(this._canvas,s)}}),this._applySize()}connectedCallback(){this._render()}attributeChangedCallback(t,e,s){e!==s&&(t==="width"||t==="height"?this._applySize():this.isConnected&&this._render())}get src(){return this.getAttribute("src")||""}get stepsSrc(){return this.getAttribute("steps-src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="false"||!0}get width(){return this.getAttribute("width")||"100%"}get height(){return this.getAttribute("height")||"350px"}_applySize(){this.style.width=this.width,this.style.height=this.height}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=this.stepsSrc?await fetch(this.stepsSrc).then(i=>i.json()):null,e=Array.isArray(t?.steps)?t.steps:[],s=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,r=await fetch(s).then(i=>i.json());this._visuals=typeof r=="object"&&r!==null?r:null,this._bounds=S(this._visuals),this._wrap.innerHTML="",this._canvas=document.createElement("div"),this._canvas.className="ng-canvas",this._canvas.style.width=this._bounds.canvasW+"px",this._canvas.style.height=this._bounds.canvasH+"px",this._statusEl.textContent=`Loaded graph with ${this._visuals?Object.keys(this._visuals).length:"?"} visuals. ${e.length} steps. Start step: ${this.startStep}. Can step: ${this.canStep}.`,Object.entries(this._visuals).forEach(([i,n])=>{let o=document.createElement("div");o.className="ng-node",o.dataset.nodeId=i,o.style.left=n.pos.x+this._bounds.offsetX+"px",o.style.top=n.pos.y+this._bounds.offsetY+"px",o.innerHTML=n.svg,this._canvas.appendChild(o)}),this._wrap.appendChild(this._canvas),this._stepping.init(e,this.startStep,Object.keys(this._visuals)),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:this._visuals,steps:e,startStep:this.startStep,canStep:this.canStep},bubbles:!0,composed:!0}))}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}};customElements.define("node-graph",x);export{x as NodeGraph};
//# sourceMappingURL=node-graph.js.map
