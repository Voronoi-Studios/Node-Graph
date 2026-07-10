var S=`:host {\r
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
    /*transform-origin: 0 0;*/\r
    transform-origin: center center;\r
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
}`;var k=`<div class="ng-head">\r
    <span class="ng-title">\r
        <span style="top: 6px;">\r
            <span class="ng-icon-slot" data-icon="git-branch"> </span>\r
        </span>\r
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
        <span class="ng-icon-slot" data-icon="maximize"></span>\r
        Expand\r
        </button>\r
    </div>\r
</div>\r
<div class="ng-wrap">\r
    <div class="ng-status">Loading node graph\u2026</div>\r
</div>`;var m=class{constructor({wrapEl:t,walklinkEl:e,stepperEl:n,prevBtn:s,nextBtn:o,stepcountEl:a,steptextEl:p,canStep:l,updateCam:h}){this._wrapEl=t,this._walklinkEl=e,this._stepperEl=n,this._prevBtn=s,this._nextBtn=o,this._stepcountEl=a,this._steptextEl=p,this._canStep=l,this._updateCam=h,this.steps=[],this.mode="none",this.currentStep=0,this._allIds=[],this._walklinkEl.addEventListener("click",()=>this._startWalkthrough()),this._prevBtn.addEventListener("click",()=>this._goStep(-1)),this._nextBtn.addEventListener("click",()=>this._goStep(1))}get activeIds(){return this.mode==="stepping"?this.steps[this.currentStep]?.ids||[]:this._allIds}init(t,e,n=[]){this.steps=t,this._allIds=n,t.length?e===0?(this.mode="whole",this._clearDim(),this._updateCam(this._allIds)):(this.mode="stepping",this.currentStep=Math.min(Math.max(e-1,0),t.length-1),this._applyDim(t[this.currentStep].ids),this._updateCam(t[this.currentStep].ids)):(this.mode="none",this._clearDim(),this._updateCam(this._allIds)),this._syncUI()}_applyDim(t){this._wrapEl.querySelectorAll(".ng-node").forEach(e=>{e.classList.toggle("ng-dim",!t.includes(e.dataset.nodeId))}),this._wrapEl.querySelectorAll(".ng-edge").forEach(e=>{let n=t.includes(e.dataset.from)&&t.includes(e.dataset.to);e.style.opacity=n?"1":"0.25"})}_clearDim(){this._wrapEl.querySelectorAll(".ng-node").forEach(t=>t.classList.remove("ng-dim")),this._wrapEl.querySelectorAll(".ng-edge").forEach(t=>t.style.opacity="1")}_syncUI(){if(this.mode==="none"){this._walklinkEl.hidden=!0,this._stepperEl.hidden=!0;return}if(this.mode==="whole"){let n=this._canStep();this._walklinkEl.hidden=!n,this._stepperEl.hidden=!0;return}this._walklinkEl.hidden=!0,this._stepperEl.hidden=!1;let t=this.steps[this.currentStep];this._stepcountEl.textContent=`step ${this.currentStep+1} of ${this.steps.length}`,this._steptextEl.textContent=t.label||"";let e=this._canStep();this._prevBtn.disabled=!e,this._nextBtn.disabled=!e||this.currentStep===this.steps.length-1}_startWalkthrough(){this.mode="stepping",this.currentStep=0,this._applyDim(this.steps[0].ids),this._updateCam(this.steps[0].ids),this._syncUI()}_exitToWhole(){this.mode="whole",this._clearDim(),this._updateCam(this._allIds),this._syncUI()}_goStep(t){let e=this.currentStep+t;if(e<0){this._exitToWhole();return}e>this.steps.length-1||(this.currentStep=e,this._applyDim(this.steps[this.currentStep].ids),this._updateCam(this.steps[this.currentStep].ids),this._syncUI())}};var y=class{constructor({hostEl:t,onExpanded:e,onCollapsed:n}){this._host=t,this._placeholder=null,this._expanded=!1,this._onExpanded=e||null,this._onCollapsed=n||null,this._escHandler=s=>{s.key==="Escape"&&this.collapse()}}get expanded(){return this._expanded}expand(){if(this._expanded)return;this._expanded=!0;let t=this._host,e=t.getBoundingClientRect(),n=document.createElement("div");n.style.width=e.width+"px",n.style.height=e.height+"px",t.parentNode.insertBefore(n,t),this._placeholder=n;let s=Math.min(window.innerWidth*.96,window.innerWidth-32),o=Math.min(window.innerHeight*.96,window.innerHeight-32),a=(window.innerWidth-s)/2,p=(window.innerHeight-o)/2,l=e.width/s,h=e.height/o,d=e.left-a,c=e.top-p;Object.assign(t.style,{position:"fixed",margin:"0",zIndex:"500",left:a+"px",top:p+"px",width:s+"px",height:o+"px",transformOrigin:"0 0",transition:"none",transform:`translate(${d}px, ${c}px) scale(${l}, ${h})`}),document.body.appendChild(t),t.getBoundingClientRect(),requestAnimationFrame(()=>{t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.transform="none"}),t.addEventListener("transitionend",()=>{t.style.transition="",this._onExpanded&&this._onExpanded()},{once:!0}),document.addEventListener("keydown",this._escHandler)}collapse(){if(!this._expanded)return;let t=this._host,e=t.getBoundingClientRect(),n=this._placeholder.getBoundingClientRect(),s=n.width/e.width,o=n.height/e.height,a=n.left-e.left,p=n.top-e.top;t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.transform=`translate(${a}px, ${p}px) scale(${s}, ${o})`,t.addEventListener("transitionend",()=>{this._placeholder.replaceWith(t),this._placeholder=null,Object.assign(t.style,{position:"",margin:"",zIndex:"",left:"",top:"",width:"",height:"",transformOrigin:"",transition:"",transform:""}),this._expanded=!1,document.removeEventListener("keydown",this._escHandler),this._onCollapsed&&this._onCollapsed()},{once:!0})}};function C(i,t,e){let{offsetX:n,offsetY:s,canvasW:o,canvasH:a}=e,p=[`<svg width="${o}" height="${a}" style="position:absolute;top:0;left:0;pointer-events:none" xmlns="http://www.w3.org/2000/svg"><g stroke="#f0f0f0" stroke-width="3" fill="none">`];return i.forEach(l=>{let h=t[l.from],d=t[l.to];if(!h||!d)return;let c=h.pos.x+n+h.width+11,u=h.pos.y+s+h.outputs[l.via],r=d.pos.x+n+10,g=d.pos.y+s+d.inputs["input-0"],_=Math.abs(r-c)*.2;p.push(`<path class="ng-edge" data-from="${l.from}" data-to="${l.to}" d="M${c} ${u} C${c+_} ${u} ${r-_} ${g} ${r} ${g}"/>`)}),p.push("</g></svg>"),p.join("")}function $(i,t){let e=0,n=0,s=1,o=!1,a=0,p=0;function l(){t.style.transform=`translate(${e}px, ${n}px) scale(${s})`}function h(r){o=!0,a=r.clientX,p=r.clientY,i.setPointerCapture(r.pointerId)}function d(r){o&&(e+=r.clientX-a,n+=r.clientY-p,a=r.clientX,p=r.clientY,l())}function c(){o=!1}function u(r){r.preventDefault();let g=Math.exp(-r.deltaY*.0015),_=Math.min(Math.max(s*g,.05),4),f=i.getBoundingClientRect(),x=r.clientX-f.left,w=r.clientY-f.top,E=_/s;e=x-(x-e)*E,n=w-(w-n)*E,s=_,l()}return i.addEventListener("pointerdown",h),i.addEventListener("pointermove",d),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c),i.addEventListener("pointerleave",c),i.addEventListener("wheel",u,{passive:!1}),{sync(r){r&&(e=r.x,n=r.y,s=r.scale,l())},destroy(){i.removeEventListener("pointerdown",h),i.removeEventListener("pointermove",d),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),i.removeEventListener("pointerleave",c),i.removeEventListener("wheel",u)}}}function L(i){let t=Object.values(i);if(!t.length)return{minX:0,minY:0,maxX:0,maxY:0};let e=1/0,n=1/0,s=-1/0,o=-1/0;return t.forEach(a=>{e=Math.min(e,a.pos.x),n=Math.min(n,a.pos.y),s=Math.max(s,a.pos.x+(a.width||160)),o=Math.max(o,a.pos.y+(a.height||90))}),{minX:e,minY:n,maxX:s,maxY:o}}function M(i,t,e,n){let s=Object.fromEntries(e.map(x=>[x,t[x]]).filter(([,x])=>x)),{minX:o,minY:a,maxX:p,maxY:l}=L(s),h=60;o+=n.offsetX-h,a+=n.offsetY-h,p+=n.offsetX+h,l+=n.offsetY+h;let d=p-o,c=l-a,u=i.clientWidth,r=i.clientHeight;if(!d||!c||!u||!r)return null;let g=Math.min(u/d,r/c);g=Math.min(g,1.5);let _=(o+p)/2,f=(a+l)/2;return{x:u/2-_,y:r/2-f,scale:g}}function H(i,t){t&&(i.style.transform=`translate(${t.x}px, ${t.y}px) scale(${t.scale})`)}function B(i){let{minX:t,minY:e,maxX:n,maxY:s}=L(i),o=60;return t-=o,e-=o,n+=o,s+=o,{offsetX:-t,offsetY:-e,canvasW:n-t,canvasH:s-e}}var z={"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',maximize:`
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  `,x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',"git-branch":`
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M5 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	<path d="M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	<path d="M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
	<path d="M7 8l0 8" />
	<path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
	<path d="M14 14l3 -3l3 3" />
  `};function v(i,t=14){let e=z[i];return e?`<svg class="ng-icon" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`:""}var b=class extends HTMLElement{static get observedAttributes(){return["src","steps-src","start-step","can-step","width","height"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=k;let t=document.createElement("style");t.textContent=S,this._root.prepend(t),this._root.querySelectorAll(".ng-icon-slot").forEach(e=>{e.outerHTML=v(e.dataset.icon)}),this._titleEl=this._root.querySelector(".ng-title-text"),this._wrap=this._root.querySelector(".ng-wrap"),this._statusEl=this._root.querySelector(".ng-status"),this._stepping=new m({wrapEl:this._wrap,walklinkEl:this._root.querySelector(".ng-walklink"),stepperEl:this._root.querySelector(".ng-stepper"),prevBtn:this._root.querySelector(".ng-prev"),nextBtn:this._root.querySelector(".ng-next"),stepcountEl:this._root.querySelector(".ng-stepcount"),steptextEl:this._root.querySelector(".ng-steptext"),canStep:()=>this.canStep,updateCam:e=>this._applyCameraFit(e)}),this._panZoom=null,this._expandBtnEl=this._root.querySelector(".ng-expand-btn"),this._overlay=new y({hostEl:this,onExpanded:()=>{this._expandBtnEl.innerHTML=`${v("x")}Close`,this._panZoom=$(this._wrap,this._canvas),this._applyCameraFit(this._stepping.activeIds)},onCollapsed:()=>{this._expandBtnEl.innerHTML=`${v("maximize")}Expand`,this._panZoom?.destroy(),this._panZoom=null,this._applySize(),this._applyCameraFit(this._stepping.activeIds)}}),this._expandBtnEl.addEventListener("click",()=>{this._overlay.expanded?this._overlay.collapse():this._overlay.expand()}),this._applySize()}_applyCameraFit(t){if(!this._canvas||!this._visuals||!this._bounds)return;let e=M(this._wrap,this._visuals,t,this._bounds);H(this._canvas,e),this._panZoom?.sync(e)}connectedCallback(){this._hasRenderedOnce||this._scheduleRender()}attributeChangedCallback(t,e,n){if(e!==n){if(t==="width"||t==="height"){this._applySize();return}this._scheduleRender()}}_scheduleRender(){this._renderScheduled||(this._renderScheduled=!0,this._hasRenderedOnce=!0,queueMicrotask(()=>{this._renderScheduled=!1,this.isConnected&&this._render()}))}get src(){return this.getAttribute("src")||""}get stepsSrc(){return this.getAttribute("steps-src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="false"||!0}get width(){return this.getAttribute("width")||"100%"}get height(){return this.getAttribute("height")||"350px"}_applySize(){this.style.width=this.width,this.style.height=this.height}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=this.stepsSrc?await fetch(this.stepsSrc).then(a=>a.json()):null,e=Array.isArray(t?.steps)?t.steps:[],n=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,s=await fetch(n).then(a=>a.json()),o=typeof s=="object"&&s!==null?s:null;this._visuals=o?.visuals||{},this._connections=o?.connections||{},this._bounds=B(this._visuals),this._wrap.innerHTML="",this._canvas=document.createElement("div"),this._canvas.className="ng-canvas",this._canvas.style.width=this._bounds.canvasW+"px",this._canvas.style.height=this._bounds.canvasH+"px",this._canvas.insertAdjacentHTML("beforeend",C(this._connections,this._visuals,this._bounds)),this._statusEl.textContent=`
        Loaded graph with ${this._visuals?Object.keys(this._visuals).length:"?"} visuals. 
        ${this._connections?Object.keys(this._connections).length:"?"} connections. 
        ${e.length} steps. 
        Start step: ${this.startStep}. 
        Can step: ${this.canStep}.
      `,Object.entries(this._visuals).forEach(([a,p])=>{let l=document.createElement("div");l.className="ng-node",l.dataset.nodeId=a,l.style.left=p.pos.x+this._bounds.offsetX+"px",l.style.top=p.pos.y+this._bounds.offsetY+"px",l.innerHTML=p.svg,this._canvas.appendChild(l)}),this._wrap.appendChild(this._canvas),this._stepping.init(e,this.startStep,Object.keys(this._visuals)),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:this._visuals,steps:e,startStep:this.startStep,canStep:this.canStep},bubbles:!0,composed:!0}))}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}};customElements.define("node-graph",b);export{b as NodeGraph};
//# sourceMappingURL=node-graph.js.map
