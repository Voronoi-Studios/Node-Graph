var X=`:host {\r
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
}`;var A=`<div class="ng-head">\r
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
</div>`;var C=class{constructor({wrapEl:t,walklinkEl:e,stepperEl:n,prevBtn:s,nextBtn:a,stepcountEl:r,steptextEl:p,canStep:l,updateCam:h}){this._wrapEl=t,this._walklinkEl=e,this._stepperEl=n,this._prevBtn=s,this._nextBtn=a,this._stepcountEl=r,this._steptextEl=p,this._canStep=l,this._updateCam=h,this.steps=[],this.mode="none",this.currentStep=0,this._allIds=[],this._walklinkEl.addEventListener("click",()=>this._startWalkthrough()),this._prevBtn.addEventListener("click",()=>this._goStep(-1)),this._nextBtn.addEventListener("click",()=>this._goStep(1))}get activeIds(){return this.mode==="stepping"?this.steps[this.currentStep]?.ids||[]:this._allIds}init(t,e,n=[]){this.steps=t,this._allIds=n,t.length?e===0?(this.mode="whole",this._clearDim(),this._updateCam(this._allIds)):(this.mode="stepping",this.currentStep=Math.min(Math.max(e-1,0),t.length-1),this._applyDim(t[this.currentStep].ids),this._updateCam(t[this.currentStep].ids)):(this.mode="none",this._clearDim(),this._updateCam(this._allIds)),this._syncUI()}_applyDim(t){this._wrapEl.querySelectorAll(".ng-node").forEach(e=>{e.classList.toggle("ng-dim",!t.includes(e.dataset.nodeId))}),this._wrapEl.querySelectorAll(".ng-edge").forEach(e=>{let n=t.includes(e.dataset.from)&&t.includes(e.dataset.to);e.style.opacity=n?"1":"0.25"})}_clearDim(){this._wrapEl.querySelectorAll(".ng-node").forEach(t=>t.classList.remove("ng-dim")),this._wrapEl.querySelectorAll(".ng-edge").forEach(t=>t.style.opacity="1")}_syncUI(){if(this.mode==="none"){this._walklinkEl.hidden=!0,this._stepperEl.hidden=!0;return}if(this.mode==="whole"){let n=this._canStep();this._walklinkEl.hidden=!n,this._stepperEl.hidden=!0;return}this._walklinkEl.hidden=!0,this._stepperEl.hidden=!1;let t=this.steps[this.currentStep];this._stepcountEl.textContent=`step ${this.currentStep+1} of ${this.steps.length}`,this._steptextEl.textContent=t.label||"";let e=this._canStep();this._prevBtn.disabled=!e,this._nextBtn.disabled=!e||this.currentStep===this.steps.length-1}_startWalkthrough(){this.mode="stepping",this.currentStep=0,this._applyDim(this.steps[0].ids),this._updateCam(this.steps[0].ids),this._syncUI()}_exitToWhole(){this.mode="whole",this._clearDim(),this._updateCam(this._allIds),this._syncUI()}_goStep(t){let e=this.currentStep+t;if(e<0){this._exitToWhole();return}e>this.steps.length-1||(this.currentStep=e,this._applyDim(this.steps[this.currentStep].ids),this._updateCam(this.steps[this.currentStep].ids),this._syncUI())}};var M=class{constructor({hostEl:t,onExpanded:e,onCollapsed:n}){this._host=t,this._placeholder=null,this._expanded=!1,this._onExpanded=e||null,this._onCollapsed=n||null,this._escHandler=s=>{s.key==="Escape"&&this.collapse()}}get expanded(){return this._expanded}expand(){if(this._expanded)return;this._expanded=!0;let t=this._host,e=t.getBoundingClientRect(),n=document.createElement("div");n.style.width=e.width+"px",n.style.height=e.height+"px",t.parentNode.insertBefore(n,t),this._placeholder=n;let s=Math.min(window.innerWidth*.96,window.innerWidth-32),a=Math.min(window.innerHeight*.96,window.innerHeight-32),r=(window.innerWidth-s)/2,p=(window.innerHeight-a)/2,l=e.width/s,h=e.height/a,d=e.left-r,u=e.top-p;Object.assign(t.style,{position:"fixed",margin:"0",zIndex:"500",left:r+"px",top:p+"px",width:s+"px",height:a+"px",transformOrigin:"0 0",transition:"none",transform:`translate(${d}px, ${u}px) scale(${l}, ${h})`}),document.body.appendChild(t),t.getBoundingClientRect(),requestAnimationFrame(()=>{t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.transform="none"}),t.addEventListener("transitionend",()=>{t.style.transition="",this._onExpanded&&this._onExpanded()},{once:!0}),document.addEventListener("keydown",this._escHandler)}collapse(){if(!this._expanded)return;let t=this._host,e=t.getBoundingClientRect(),n=this._placeholder.getBoundingClientRect(),s=n.width/e.width,a=n.height/e.height,r=n.left-e.left,p=n.top-e.top;t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.transform=`translate(${r}px, ${p}px) scale(${s}, ${a})`,t.addEventListener("transitionend",()=>{this._placeholder.replaceWith(t),this._placeholder=null,Object.assign(t.style,{position:"",margin:"",zIndex:"",left:"",top:"",width:"",height:"",transformOrigin:"",transition:"",transform:""}),this._expanded=!1,document.removeEventListener("keydown",this._escHandler),this._onCollapsed&&this._onCollapsed()},{once:!0})}};function j(o,t,e){let{offsetX:n,offsetY:s,canvasW:a,canvasH:r}=e,p=[`<svg width="${a}" height="${r}" style="position:absolute;top:0;left:0;pointer-events:none" xmlns="http://www.w3.org/2000/svg"><g stroke="#f0f0f0" stroke-width="3" fill="none">`];return o.forEach(l=>{let h=t[l.from],d=t[l.to];if(!h||!d)return;let u=h.pos.x+n+h.width+11,f=h.pos.y+s+h.outputs[l.via],g=d.pos.x+n+10,x=d.pos.y+s+d.inputs["input-0"],m=Math.abs(g-u)*.2;p.push(`<path class="ng-edge" data-from="${l.from}" data-to="${l.to}" d="M${u} ${f} C${u+m} ${f} ${g-m} ${x} ${g} ${x}"/>`)}),p.push("</g></svg>"),p.join("")}function q(o,t){let e=0,n=0,s=1,a=!1,r=0,p=0,l=new Map,h=0,d=1,u=0,f=0;o.style.touchAction="none";function g(){t.style.transform=`translate(${e}px, ${n}px) scale(${s})`}function x(){return Array.from(l.values())}function m(i,c){return Math.hypot(i.x-c.x,i.y-c.y)}function k(i,c){return{x:(i.x+c.x)/2,y:(i.y+c.y)/2}}function y(i){if(o.setPointerCapture(i.pointerId),l.set(i.pointerId,{x:i.clientX,y:i.clientY}),l.size===1)a=!0,r=i.clientX,p=i.clientY;else if(l.size===2){a=!1;let[c,_]=x();h=m(c,_)||1,d=s;let v=k(c,_);u=v.x,f=v.y}}function I(i){if(l.has(i.pointerId)){if(l.set(i.pointerId,{x:i.clientX,y:i.clientY}),l.size===2){let[c,_]=x(),v=m(c,_)||1,w=Math.min(Math.max(d*(v/h),.05),4),E=o.getBoundingClientRect(),S=k(c,_),z=u-E.left,H=f-E.top,Y=w/s;e=z-(z-e)*Y,n=H-(H-n)*Y,e+=S.x-u,n+=S.y-f,s=w,g();return}a&&(e+=i.clientX-r,n+=i.clientY-p,r=i.clientX,p=i.clientY,g())}}function b(i){if(l.delete(i.pointerId),l.size===1){let[c]=x();a=!0,r=c.x,p=c.y}else l.size===0&&(a=!1)}o.addEventListener("pointerdown",y),o.addEventListener("pointermove",I),o.addEventListener("pointerup",b),o.addEventListener("pointercancel",b),o.addEventListener("pointerleave",b),o.addEventListener("wheel",B,{passive:!1});function B(i){i.preventDefault();let c=Math.exp(-i.deltaY*.0015),_=Math.min(Math.max(s*c,.05),4),v=o.getBoundingClientRect(),w=i.clientX-v.left,E=i.clientY-v.top,S=_/s;e=w-(w-e)*S,n=E-(E-n)*S,s=_,g()}return{sync(i){i&&(e=i.x,n=i.y,s=i.scale,g())},destroy(){o.removeEventListener("pointerdown",y),o.removeEventListener("pointermove",I),o.removeEventListener("pointerup",b),o.removeEventListener("pointercancel",b),o.removeEventListener("pointerleave",b),o.removeEventListener("wheel",B)}}}function T(o){let t=Object.values(o);if(!t.length)return{minX:0,minY:0,maxX:0,maxY:0};let e=1/0,n=1/0,s=-1/0,a=-1/0;return t.forEach(r=>{e=Math.min(e,r.pos.x),n=Math.min(n,r.pos.y),s=Math.max(s,r.pos.x+(r.width||160)),a=Math.max(a,r.pos.y+(r.height||90))}),{minX:e,minY:n,maxX:s,maxY:a}}function W(o,t,e,n){let s=Object.fromEntries(e.map(y=>[y,t[y]]).filter(([,y])=>y)),{minX:a,minY:r,maxX:p,maxY:l}=T(s),h=60;a+=n.offsetX-h,r+=n.offsetY-h,p+=n.offsetX+h,l+=n.offsetY+h;let d=p-a,u=l-r,f=o.clientWidth,g=o.clientHeight;if(!d||!u||!f||!g)return null;let x=Math.min(f/d,g/u);x=Math.min(x,1.5);let m=(a+p)/2,k=(r+l)/2;return{x:f/2-m*x,y:g/2-k*x,scale:x}}function R(o,t){t&&(o.style.transform=`translate(${t.x}px, ${t.y}px) scale(${t.scale})`)}function D(o){let{minX:t,minY:e,maxX:n,maxY:s}=T(o),a=60;return t-=a,e-=a,n+=a,s+=a,{offsetX:-t,offsetY:-e,canvasW:n-t,canvasH:s-e}}var F={"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',maximize:`
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
  `};function $(o,t=14){let e=F[o];return e?`<svg class="ng-icon" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`:""}var L=class extends HTMLElement{static get observedAttributes(){return["src","start-step","can-step","force-expand","width","height"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=A;let t=document.createElement("style");t.textContent=X,this._root.prepend(t),this._root.querySelectorAll(".ng-icon-slot").forEach(e=>{e.outerHTML=$(e.dataset.icon)}),this._titleEl=this._root.querySelector(".ng-title-text"),this._wrap=this._root.querySelector(".ng-wrap"),this._statusEl=this._root.querySelector(".ng-status"),this._stepping=new C({wrapEl:this._wrap,walklinkEl:this._root.querySelector(".ng-walklink"),stepperEl:this._root.querySelector(".ng-stepper"),prevBtn:this._root.querySelector(".ng-prev"),nextBtn:this._root.querySelector(".ng-next"),stepcountEl:this._root.querySelector(".ng-stepcount"),steptextEl:this._root.querySelector(".ng-steptext"),canStep:()=>this.canStep,updateCam:e=>this._applyCameraFit(e)}),this._panZoom=null,this._expandBtnEl=this._root.querySelector(".ng-expand-btn"),this._overlay=new M({hostEl:this,onExpanded:()=>{this._expandBtnEl.innerHTML=`${$("x")}Close`,this._panZoom=q(this._wrap,this._canvas),this._applyCameraFit(this._stepping.activeIds)},onCollapsed:()=>{this._expandBtnEl.innerHTML=`${$("maximize")}Expand`,this._panZoom?.destroy(),this._panZoom=null,this._applySize(),this._applyCameraFit(this._stepping.activeIds)}}),this._expandBtnEl.addEventListener("click",()=>{this._overlay.expanded?this._overlay.collapse():this._overlay.expand()}),this._applySize()}_applyCameraFit(t){if(!this._canvas||!this._visuals||!this._bounds)return;let e=W(this._wrap,this._visuals,t,this._bounds);R(this._canvas,e),this._panZoom?.sync(e)}connectedCallback(){this._hasRenderedOnce||this._scheduleRender()}attributeChangedCallback(t,e,n){if(e!==n){if(t==="width"||t==="height"){this._applySize();return}this._scheduleRender()}}_scheduleRender(){this._renderScheduled||(this._renderScheduled=!0,this._hasRenderedOnce=!0,queueMicrotask(()=>{this._renderScheduled=!1,this.isConnected&&this._render()}))}get src(){return this.getAttribute("src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="true"||!1}get forceExpand(){return this.getAttribute("force-expand")==="true"||!1}get width(){return this.getAttribute("width")||"100%"}get height(){return this.getAttribute("height")||"350px"}_applySize(){this.style.width=this.width,this.style.height=this.height}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,e=await fetch(t).then(s=>s.json()),n=typeof e=="object"&&e!==null?e:null;this._visuals=n?.visuals||{},this._connections=n?.connections||{},this._steps=n?.steps||[],this._bounds=D(this._visuals),this._wrap.innerHTML="",this._canvas=document.createElement("div"),this._canvas.className="ng-canvas",this._canvas.style.width=this._bounds.canvasW+"px",this._canvas.style.height=this._bounds.canvasH+"px",this._canvas.insertAdjacentHTML("beforeend",j(this._connections,this._visuals,this._bounds)),this._statusEl.textContent=`
        Loaded graph with ${this._visuals?Object.keys(this._visuals).length:"?"} visuals. 
        ${this._connections?Object.keys(this._connections).length:"?"} connections. 
        ${this._steps.length} steps. 
        Start step: ${this.startStep}. 
        Can step: ${this.canStep}.
      `,Object.entries(this._visuals).forEach(([s,a])=>{let r=document.createElement("div");r.className="ng-node",r.dataset.nodeId=s,r.style.left=a.pos.x+this._bounds.offsetX+"px",r.style.top=a.pos.y+this._bounds.offsetY+"px",r.innerHTML=a.svg,this._canvas.appendChild(r)}),this._wrap.appendChild(this._canvas),this._stepping.init(this._steps,this.startStep,Object.keys(this._visuals)),this.forceExpand&&(this._overlay.expand(),this._expandBtnEl.style.visibility="hidden"),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:this._visuals,steps:this._steps,startStep:this.startStep,canStep:this.canStep,forceExpand:this.forceExpand},bubbles:!0,composed:!0}))}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}};customElements.define("node-graph",L);export{L as NodeGraph};
//# sourceMappingURL=node-graph.js.map
