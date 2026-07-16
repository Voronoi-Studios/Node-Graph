var q=`:host {\r
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
}`;var T=`<div class="ng-head">\r
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
</div>`;var C=class{constructor({wrapEl:t,walklinkEl:e,stepperEl:n,prevBtn:s,nextBtn:i,stepcountEl:r,steptextEl:p,canStep:l,updateCam:h}){this._wrapEl=t,this._walklinkEl=e,this._stepperEl=n,this._prevBtn=s,this._nextBtn=i,this._stepcountEl=r,this._steptextEl=p,this._canStep=l,this._updateCam=h,this.steps=[],this.mode="none",this.currentStep=0,this._allIds=[],this._walklinkEl.addEventListener("click",()=>this._startWalkthrough()),this._prevBtn.addEventListener("click",()=>this._goStep(-1)),this._nextBtn.addEventListener("click",()=>this._goStep(1))}get activeIds(){return this.mode==="stepping"?this.steps[this.currentStep]?.ids||[]:this._allIds}init(t,e,n=[]){this.steps=t,this._allIds=n,t.length?e===0?(this.mode="whole",this._clearDim(),this._updateCam(this._allIds)):(this.mode="stepping",this.currentStep=Math.min(Math.max(e-1,0),t.length-1),this._applyDim(t[this.currentStep].ids),this._updateCam(t[this.currentStep].ids)):(this.mode="none",this._clearDim(),this._updateCam(this._allIds)),this._syncUI()}_applyDim(t){this._wrapEl.querySelectorAll(".ng-node").forEach(e=>{e.classList.toggle("ng-dim",!t.includes(e.dataset.nodeId))}),this._wrapEl.querySelectorAll(".ng-edge").forEach(e=>{let n=t.includes(e.dataset.from)&&t.includes(e.dataset.to);e.style.opacity=n?"1":"0.25"})}_clearDim(){this._wrapEl.querySelectorAll(".ng-node").forEach(t=>t.classList.remove("ng-dim")),this._wrapEl.querySelectorAll(".ng-edge").forEach(t=>t.style.opacity="1")}_syncUI(){if(this.mode==="none"){this._walklinkEl.hidden=!0,this._stepperEl.hidden=!0;return}if(this.mode==="whole"){let n=this._canStep();this._walklinkEl.hidden=!n,this._stepperEl.hidden=!0;return}this._walklinkEl.hidden=!0,this._stepperEl.hidden=!1;let t=this.steps[this.currentStep];this._stepcountEl.textContent=`step ${this.currentStep+1} of ${this.steps.length}`,this._steptextEl.textContent=t.label||"";let e=this._canStep();this._prevBtn.disabled=!e,this._nextBtn.disabled=!e||this.currentStep===this.steps.length-1}_startWalkthrough(){this.mode="stepping",this.currentStep=0,this._applyDim(this.steps[0].ids),this._updateCam(this.steps[0].ids),this._syncUI()}_exitToWhole(){this.mode="whole",this._clearDim(),this._updateCam(this._allIds),this._syncUI()}_goStep(t){let e=this.currentStep+t;if(e<0){this._exitToWhole();return}e>this.steps.length-1||(this.currentStep=e,this._applyDim(this.steps[this.currentStep].ids),this._updateCam(this.steps[this.currentStep].ids),this._syncUI())}};var M=class{constructor({hostEl:t,onExpanded:e,onCollapsed:n}){this._host=t,this._placeholder=null,this._expanded=!1,this._onExpanded=e||null,this._onCollapsed=n||null,this._escHandler=s=>{s.key==="Escape"&&this.collapse()}}get expanded(){return this._expanded}expand(){if(this._expanded)return;this._expanded=!0;let t=this._host,e=t.getBoundingClientRect(),n=document.createElement("div");n.style.width=e.width+"px",n.style.height=e.height+"px",t.parentNode.insertBefore(n,t),this._placeholder=n;let s=Math.min(window.innerWidth*.96,window.innerWidth-32),i=Math.min(window.innerHeight*.96,window.innerHeight-32),r=(window.innerWidth-s)/2,p=(window.innerHeight-i)/2,l=e.width/s,h=e.height/i,d=e.left-r,u=e.top-p;Object.assign(t.style,{position:"fixed",margin:"0",zIndex:"500",left:r+"px",top:p+"px",width:s+"px",height:i+"px",transformOrigin:"0 0",transition:"none",willChange:"transform",transform:`translate(${d}px, ${u}px) scale(${l}, ${h})`}),document.body.appendChild(t),t.getBoundingClientRect(),requestAnimationFrame(()=>{t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.transform="none"}),t.addEventListener("transitionend",()=>{t.style.transition="",t.style.willChange="",this._onExpanded&&this._onExpanded()},{once:!0}),document.addEventListener("keydown",this._escHandler)}collapse(){if(!this._expanded)return;let t=this._host,e=t.getBoundingClientRect(),n=this._placeholder.getBoundingClientRect(),s=n.width/e.width,i=n.height/e.height,r=n.left-e.left,p=n.top-e.top;t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.willChange="transform",t.style.transform=`translate(${r}px, ${p}px) scale(${s}, ${i})`,t.addEventListener("transitionend",()=>{this._placeholder.replaceWith(t),this._placeholder=null,Object.assign(t.style,{position:"",margin:"",zIndex:"",left:"",top:"",width:"",height:"",transformOrigin:"",transition:"",willChange:"",transform:""}),this._expanded=!1,document.removeEventListener("keydown",this._escHandler),this._onCollapsed&&this._onCollapsed()},{once:!0})}};function j(o,t,e){let{offsetX:n,offsetY:s,canvasW:i,canvasH:r}=e,p=[`<svg width="${i}" height="${r}" style="position:absolute;top:0;left:0;pointer-events:none" xmlns="http://www.w3.org/2000/svg"><g stroke="#f0f0f0" stroke-width="3" fill="none">`];return o.forEach(l=>{let h=t[l.from],d=t[l.to];if(!h||!d)return;let u=h.pos.x+n+h.width+11,f=h.pos.y+s+h.outputs[l.via],x=d.pos.x+n+10,g=d.pos.y+s+d.inputs["input-0"],m=Math.abs(x-u)*.2;p.push(`<path class="ng-edge" data-from="${l.from}" data-to="${l.to}" d="M${u} ${f} C${u+m} ${f} ${x-m} ${g} ${x} ${g}"/>`)}),p.push("</g></svg>"),p.join("")}function R(o,t){let e=0,n=0,s=1,i=!1,r=0,p=0,l=new Map,h=0,d=1,u=0,f=0;o.style.touchAction="none";function x(){t.style.transition="none",t.style.willChange="transform"}function g(){t.style.transition="",t.style.willChange=""}let m=!1;function w(){m||(m=!0,requestAnimationFrame(()=>{m=!1,t.style.transform=`translate(${e}px, ${n}px) scale(${s})`}))}function y(){return Array.from(l.values())}function I(a,c){return Math.hypot(a.x-c.x,a.y-c.y)}function B(a,c){return{x:(a.x+c.x)/2,y:(a.y+c.y)/2}}function H(a){if(o.setPointerCapture(a.pointerId),l.set(a.pointerId,{x:a.clientX,y:a.clientY}),l.size===1)i=!0,r=a.clientX,p=a.clientY,x();else if(l.size===2){i=!1;let[c,v]=y();h=I(c,v)||1,d=s;let b=o.getBoundingClientRect(),_=B(c,v);u=_.x-b.left,f=_.y-b.top,x()}}function Y(a){if(l.has(a.pointerId)){if(l.set(a.pointerId,{x:a.clientX,y:a.clientY}),l.size===2){let[c,v]=y(),b=I(c,v)||1,_=Math.min(Math.max(d*(b/h),.05),4),E=o.getBoundingClientRect(),k=B(c,v),X=k.x-E.left,A=k.y-E.top,F=(u-e)/s,U=(f-n)/s;e=X-F*_,n=A-U*_,s=_,u=X,f=A,w();return}i&&(e+=a.clientX-r,n+=a.clientY-p,r=a.clientX,p=a.clientY,w())}}function S(a){if(l.delete(a.pointerId),l.size===1){let[c]=y();i=!0,r=c.x,p=c.y}else l.size===0&&(i=!1,g())}o.addEventListener("pointerdown",H),o.addEventListener("pointermove",Y),o.addEventListener("pointerup",S),o.addEventListener("pointercancel",S),o.addEventListener("pointerleave",S),o.addEventListener("wheel",z,{passive:!1});function z(a){a.preventDefault();let c=Math.exp(-a.deltaY*.0015),v=Math.min(Math.max(s*c,.05),4),b=o.getBoundingClientRect(),_=a.clientX-b.left,E=a.clientY-b.top,k=v/s;e=_-(_-e)*k,n=E-(E-n)*k,s=v,w()}return{sync(a){a&&(e=a.x,n=a.y,s=a.scale,w())},destroy(){o.removeEventListener("pointerdown",H),o.removeEventListener("pointermove",Y),o.removeEventListener("pointerup",S),o.removeEventListener("pointercancel",S),o.removeEventListener("pointerleave",S),o.removeEventListener("wheel",z),g()}}}function W(o){let t=Object.values(o);if(!t.length)return{minX:0,minY:0,maxX:0,maxY:0};let e=1/0,n=1/0,s=-1/0,i=-1/0;return t.forEach(r=>{e=Math.min(e,r.pos.x),n=Math.min(n,r.pos.y),s=Math.max(s,r.pos.x+(r.width||160)),i=Math.max(i,r.pos.y+(r.height||90))}),{minX:e,minY:n,maxX:s,maxY:i}}function D(o,t,e,n){let s=Object.fromEntries(e.map(y=>[y,t[y]]).filter(([,y])=>y)),{minX:i,minY:r,maxX:p,maxY:l}=W(s),h=60;i+=n.offsetX-h,r+=n.offsetY-h,p+=n.offsetX+h,l+=n.offsetY+h;let d=p-i,u=l-r,f=o.clientWidth,x=o.clientHeight;if(!d||!u||!f||!x)return null;let g=Math.min(f/d,x/u);g=Math.min(g,1.5);let m=(i+p)/2,w=(r+l)/2;return{x:f/2-m*g,y:x/2-w*g,scale:g}}function O(o,t){t&&(o.style.transform=`translate(${t.x}px, ${t.y}px) scale(${t.scale})`)}function P(o){let{minX:t,minY:e,maxX:n,maxY:s}=W(o),i=60;return t-=i,e-=i,n+=i,s+=i,{offsetX:-t,offsetY:-e,canvasW:n-t,canvasH:s-e}}var V={"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',maximize:`
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
  `};function $(o,t=14){let e=V[o];return e?`<svg class="ng-icon" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`:""}var L=class extends HTMLElement{static get observedAttributes(){return["src","start-step","can-step","force-expand","width","height"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=T;let t=document.createElement("style");t.textContent=q,this._root.prepend(t),this._root.querySelectorAll(".ng-icon-slot").forEach(e=>{e.outerHTML=$(e.dataset.icon)}),this._titleEl=this._root.querySelector(".ng-title-text"),this._wrap=this._root.querySelector(".ng-wrap"),this._statusEl=this._root.querySelector(".ng-status"),this._stepping=new C({wrapEl:this._wrap,walklinkEl:this._root.querySelector(".ng-walklink"),stepperEl:this._root.querySelector(".ng-stepper"),prevBtn:this._root.querySelector(".ng-prev"),nextBtn:this._root.querySelector(".ng-next"),stepcountEl:this._root.querySelector(".ng-stepcount"),steptextEl:this._root.querySelector(".ng-steptext"),canStep:()=>this.canStep,updateCam:e=>this._applyCameraFit(e)}),this._panZoom=null,this._expandBtnEl=this._root.querySelector(".ng-expand-btn"),this._overlay=new M({hostEl:this,onExpanded:()=>{this._expandBtnEl.innerHTML=`${$("x")}Close`,this._panZoom=R(this._wrap,this._canvas),this._applyCameraFit(this._stepping.activeIds)},onCollapsed:()=>{this._expandBtnEl.innerHTML=`${$("maximize")}Expand`,this._panZoom?.destroy(),this._panZoom=null,this._applySize(),this._applyCameraFit(this._stepping.activeIds)}}),this._expandBtnEl.addEventListener("click",()=>{this._overlay.expanded?this._overlay.collapse():this._overlay.expand()}),this._applySize()}_applyCameraFit(t){if(!this._canvas||!this._visuals||!this._bounds)return;let e=D(this._wrap,this._visuals,t,this._bounds);O(this._canvas,e),this._panZoom?.sync(e)}connectedCallback(){this._hasRenderedOnce||this._scheduleRender()}attributeChangedCallback(t,e,n){if(e!==n){if(t==="width"||t==="height"){this._applySize();return}this._scheduleRender()}}_scheduleRender(){this._renderScheduled||(this._renderScheduled=!0,this._hasRenderedOnce=!0,queueMicrotask(()=>{this._renderScheduled=!1,this.isConnected&&this._render()}))}get src(){return this.getAttribute("src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="true"||!1}get forceExpand(){return this.getAttribute("force-expand")==="true"||!1}get width(){return this.getAttribute("width")||"100%"}get height(){return this.getAttribute("height")||"350px"}_applySize(){this.style.width=this.width,this.style.height=this.height}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,e=await fetch(t).then(n=>n.json());this._applyResult(e)}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}setData(t){this._titleEl.textContent="node graph";try{this._applyResult(t)}catch(e){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(e)}</div>`,console.error("[node-graph]",e)}}_applyResult(t){let e=typeof t=="object"&&t!==null?t:null;this._visuals=e?.visuals||{},this._connections=e?.connections||{},this._steps=e?.steps||[],this._bounds=P(this._visuals),this._wrap.innerHTML="",this._canvas=document.createElement("div"),this._canvas.className="ng-canvas",this._canvas.style.width=this._bounds.canvasW+"px",this._canvas.style.height=this._bounds.canvasH+"px",this._canvas.insertAdjacentHTML("beforeend",j(this._connections,this._visuals,this._bounds)),this._statusEl.textContent=`
        Loaded graph with ${this._visuals?Object.keys(this._visuals).length:"?"} visuals. 
        ${this._connections?Object.keys(this._connections).length:"?"} connections. 
        ${this._steps.length} steps. 
        Start step: ${this.startStep}. 
        Can step: ${this.canStep}.
      `,Object.entries(this._visuals).forEach(([n,s])=>{let i=document.createElement("div");i.className="ng-node",i.dataset.nodeId=n,i.style.left=s.pos.x+this._bounds.offsetX+"px",i.style.top=s.pos.y+this._bounds.offsetY+"px",i.innerHTML=s.svg,this._canvas.appendChild(i)}),this._wrap.appendChild(this._canvas),this._stepping.init(this._steps,this.startStep,Object.keys(this._visuals)),this.forceExpand&&this._overlay.expand(),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:this._visuals,steps:this._steps,startStep:this.startStep,canStep:this.canStep,forceExpand:this.forceExpand},bubbles:!0,composed:!0}))}};customElements.define("node-graph",L);export{L as NodeGraph};
//# sourceMappingURL=node-graph.js.map
