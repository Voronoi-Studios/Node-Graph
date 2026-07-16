var T=`:host {\r
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
}`;var j=`<div class="ng-head">\r
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
</div>`;var C=class{constructor({wrapEl:t,walklinkEl:e,stepperEl:n,prevBtn:i,nextBtn:s,stepcountEl:r,steptextEl:p,canStep:l,updateCam:h}){this._wrapEl=t,this._walklinkEl=e,this._stepperEl=n,this._prevBtn=i,this._nextBtn=s,this._stepcountEl=r,this._steptextEl=p,this._canStep=l,this._updateCam=h,this.steps=[],this.mode="none",this.currentStep=0,this._allIds=[],this._walklinkEl.addEventListener("click",()=>this._startWalkthrough()),this._prevBtn.addEventListener("click",()=>this._goStep(-1)),this._nextBtn.addEventListener("click",()=>this._goStep(1))}get activeIds(){return this.mode==="stepping"?this.steps[this.currentStep]?.ids||[]:this._allIds}init(t,e,n=[]){this.steps=t,this._allIds=n,t.length?e===0?(this.mode="whole",this._clearDim(),this._updateCam(this._allIds)):(this.mode="stepping",this.currentStep=Math.min(Math.max(e-1,0),t.length-1),this._applyDim(t[this.currentStep].ids),this._updateCam(t[this.currentStep].ids)):(this.mode="none",this._clearDim(),this._updateCam(this._allIds)),this._syncUI()}_applyDim(t){this._wrapEl.querySelectorAll(".ng-node").forEach(e=>{e.classList.toggle("ng-dim",!t.includes(e.dataset.nodeId))}),this._wrapEl.querySelectorAll(".ng-edge").forEach(e=>{let n=t.includes(e.dataset.from)&&t.includes(e.dataset.to);e.style.opacity=n?"1":"0.25"})}_clearDim(){this._wrapEl.querySelectorAll(".ng-node").forEach(t=>t.classList.remove("ng-dim")),this._wrapEl.querySelectorAll(".ng-edge").forEach(t=>t.style.opacity="1")}_syncUI(){if(this.mode==="none"){this._walklinkEl.hidden=!0,this._stepperEl.hidden=!0;return}if(this.mode==="whole"){let n=this._canStep();this._walklinkEl.hidden=!n,this._stepperEl.hidden=!0;return}this._walklinkEl.hidden=!0,this._stepperEl.hidden=!1;let t=this.steps[this.currentStep];this._stepcountEl.textContent=`step ${this.currentStep+1} of ${this.steps.length}`,this._steptextEl.textContent=t.label||"";let e=this._canStep();this._prevBtn.disabled=!e,this._nextBtn.disabled=!e||this.currentStep===this.steps.length-1}_startWalkthrough(){this.mode="stepping",this.currentStep=0,this._applyDim(this.steps[0].ids),this._updateCam(this.steps[0].ids),this._syncUI()}_exitToWhole(){this.mode="whole",this._clearDim(),this._updateCam(this._allIds),this._syncUI()}_goStep(t){let e=this.currentStep+t;if(e<0){this._exitToWhole();return}e>this.steps.length-1||(this.currentStep=e,this._applyDim(this.steps[this.currentStep].ids),this._updateCam(this.steps[this.currentStep].ids),this._syncUI())}};var M=class{constructor({hostEl:t,onExpanded:e,onCollapsed:n}){this._host=t,this._placeholder=null,this._expanded=!1,this._onExpanded=e||null,this._onCollapsed=n||null,this._escHandler=i=>{i.key==="Escape"&&this.collapse()}}get expanded(){return this._expanded}expand(){if(this._expanded)return;this._expanded=!0;let t=this._host,e=t.getBoundingClientRect(),n=document.createElement("div");n.style.width=e.width+"px",n.style.height=e.height+"px",t.parentNode.insertBefore(n,t),this._placeholder=n;let i=Math.min(window.innerWidth*.96,window.innerWidth-32),s=Math.min(window.innerHeight*.96,window.innerHeight-32),r=(window.innerWidth-i)/2,p=(window.innerHeight-s)/2,l=e.width/i,h=e.height/s,d=e.left-r,u=e.top-p;Object.assign(t.style,{position:"fixed",margin:"0",zIndex:"500",left:r+"px",top:p+"px",width:i+"px",height:s+"px",transformOrigin:"0 0",transition:"none",willChange:"transform",transform:`translate(${d}px, ${u}px) scale(${l}, ${h})`}),document.body.appendChild(t),t.getBoundingClientRect(),requestAnimationFrame(()=>{t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.transform="none"}),t.addEventListener("transitionend",()=>{t.style.transition="",t.style.willChange="",this._onExpanded&&this._onExpanded()},{once:!0}),document.addEventListener("keydown",this._escHandler)}collapse(){if(!this._expanded)return;let t=this._host,e=t.getBoundingClientRect(),n=this._placeholder.getBoundingClientRect(),i=n.width/e.width,s=n.height/e.height,r=n.left-e.left,p=n.top-e.top;t.style.transition="transform .35s cubic-bezier(.22,.8,.2,1)",t.style.willChange="transform",t.style.transform=`translate(${r}px, ${p}px) scale(${i}, ${s})`,t.addEventListener("transitionend",()=>{this._placeholder.replaceWith(t),this._placeholder=null,Object.assign(t.style,{position:"",margin:"",zIndex:"",left:"",top:"",width:"",height:"",transformOrigin:"",transition:"",willChange:"",transform:""}),this._expanded=!1,document.removeEventListener("keydown",this._escHandler),this._onCollapsed&&this._onCollapsed()},{once:!0})}};function R(a,t,e){let{offsetX:n,offsetY:i,canvasW:s,canvasH:r}=e,p=[`<svg width="${s}" height="${r}" style="position:absolute;top:0;left:0;pointer-events:none" xmlns="http://www.w3.org/2000/svg"><g stroke="#f0f0f0" stroke-width="3" fill="none">`];return a.forEach(l=>{let h=t[l.from],d=t[l.to];if(!h||!d)return;let u=h.pos.x+n+h.width+11,f=h.pos.y+i+h.outputs[l.via],x=d.pos.x+n+10,g=d.pos.y+i+d.inputs["input-0"],_=Math.abs(x-u)*.2;p.push(`<path class="ng-edge" data-from="${l.from}" data-to="${l.to}" d="M${u} ${f} C${u+_} ${f} ${x-_} ${g} ${x} ${g}"/>`)}),p.push("</g></svg>"),p.join("")}function W(a,t){let e=0,n=0,i=1,s=!1,r=0,p=0,l=new Map,h=0,d=1,u=0,f=0;a.style.touchAction="none";function x(){t.style.transition="none",t.style.willChange="transform"}function g(){t.style.transition="",t.style.willChange=""}let _=!1;function b(){_||(_=!0,requestAnimationFrame(()=>{_=!1,t.style.transform=`translate(${e}px, ${n}px) scale(${i})`}))}function m(){return Array.from(l.values())}function I(o,c){return Math.hypot(o.x-c.x,o.y-c.y)}function B(o,c){return{x:(o.x+c.x)/2,y:(o.y+c.y)/2}}function H(o){if(a.setPointerCapture(o.pointerId),l.set(o.pointerId,{x:o.clientX,y:o.clientY}),l.size===1)s=!0,r=o.clientX,p=o.clientY;else if(l.size===2){s=!1;let[c,y]=m();h=I(c,y)||1,d=i;let v=B(c,y);u=v.x,f=v.y,x()}}function z(o){if(l.has(o.pointerId)){if(l.set(o.pointerId,{x:o.clientX,y:o.clientY}),l.size===2){let[c,y]=m(),v=I(c,y)||1,S=Math.min(Math.max(d*(v/h),.05),4),E=a.getBoundingClientRect(),k=B(c,y),A=u-E.left,X=f-E.top,q=S/i;e=A-(A-e)*q,n=X-(X-n)*q,e+=k.x-u,n+=k.y-f,i=S,b();return}s&&(e+=o.clientX-r,n+=o.clientY-p,r=o.clientX,p=o.clientY,b())}}function w(o){if(l.delete(o.pointerId),l.size===1){let[c]=m();s=!0,r=c.x,p=c.y}else l.size===0&&(s=!1,g())}a.addEventListener("pointerdown",H),a.addEventListener("pointermove",z),a.addEventListener("pointerup",w),a.addEventListener("pointercancel",w),a.addEventListener("pointerleave",w),a.addEventListener("wheel",Y,{passive:!1});function Y(o){o.preventDefault();let c=Math.exp(-o.deltaY*.0015),y=Math.min(Math.max(i*c,.05),4),v=a.getBoundingClientRect(),S=o.clientX-v.left,E=o.clientY-v.top,k=y/i;e=S-(S-e)*k,n=E-(E-n)*k,i=y,b()}return{sync(o){o&&(e=o.x,n=o.y,i=o.scale,b())},destroy(){a.removeEventListener("pointerdown",H),a.removeEventListener("pointermove",z),a.removeEventListener("pointerup",w),a.removeEventListener("pointercancel",w),a.removeEventListener("pointerleave",w),a.removeEventListener("wheel",Y),g()}}}function D(a){let t=Object.values(a);if(!t.length)return{minX:0,minY:0,maxX:0,maxY:0};let e=1/0,n=1/0,i=-1/0,s=-1/0;return t.forEach(r=>{e=Math.min(e,r.pos.x),n=Math.min(n,r.pos.y),i=Math.max(i,r.pos.x+(r.width||160)),s=Math.max(s,r.pos.y+(r.height||90))}),{minX:e,minY:n,maxX:i,maxY:s}}function O(a,t,e,n){let i=Object.fromEntries(e.map(m=>[m,t[m]]).filter(([,m])=>m)),{minX:s,minY:r,maxX:p,maxY:l}=D(i),h=60;s+=n.offsetX-h,r+=n.offsetY-h,p+=n.offsetX+h,l+=n.offsetY+h;let d=p-s,u=l-r,f=a.clientWidth,x=a.clientHeight;if(!d||!u||!f||!x)return null;let g=Math.min(f/d,x/u);g=Math.min(g,1.5);let _=(s+p)/2,b=(r+l)/2;return{x:f/2-_*g,y:x/2-b*g,scale:g}}function P(a,t){t&&(a.style.transform=`translate(${t.x}px, ${t.y}px) scale(${t.scale})`)}function F(a){let{minX:t,minY:e,maxX:n,maxY:i}=D(a),s=60;return t-=s,e-=s,n+=s,i+=s,{offsetX:-t,offsetY:-e,canvasW:n-t,canvasH:i-e}}var N={"chevron-left":'<polyline points="15 18 9 12 15 6"/>',"chevron-right":'<polyline points="9 18 15 12 9 6"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',maximize:`
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
  `};function $(a,t=14){let e=N[a];return e?`<svg class="ng-icon" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`:""}var L=class extends HTMLElement{static get observedAttributes(){return["src","start-step","can-step","force-expand","width","height"]}constructor(){super(),this._root=this.attachShadow({mode:"open"}),this._root.innerHTML=j;let t=document.createElement("style");t.textContent=T,this._root.prepend(t),this._root.querySelectorAll(".ng-icon-slot").forEach(e=>{e.outerHTML=$(e.dataset.icon)}),this._titleEl=this._root.querySelector(".ng-title-text"),this._wrap=this._root.querySelector(".ng-wrap"),this._statusEl=this._root.querySelector(".ng-status"),this._stepping=new C({wrapEl:this._wrap,walklinkEl:this._root.querySelector(".ng-walklink"),stepperEl:this._root.querySelector(".ng-stepper"),prevBtn:this._root.querySelector(".ng-prev"),nextBtn:this._root.querySelector(".ng-next"),stepcountEl:this._root.querySelector(".ng-stepcount"),steptextEl:this._root.querySelector(".ng-steptext"),canStep:()=>this.canStep,updateCam:e=>this._applyCameraFit(e)}),this._panZoom=null,this._expandBtnEl=this._root.querySelector(".ng-expand-btn"),this._overlay=new M({hostEl:this,onExpanded:()=>{this._expandBtnEl.innerHTML=`${$("x")}Close`,this._panZoom=W(this._wrap,this._canvas),this._applyCameraFit(this._stepping.activeIds)},onCollapsed:()=>{this._expandBtnEl.innerHTML=`${$("maximize")}Expand`,this._panZoom?.destroy(),this._panZoom=null,this._applySize(),this._applyCameraFit(this._stepping.activeIds)}}),this._expandBtnEl.addEventListener("click",()=>{this._overlay.expanded?this._overlay.collapse():this._overlay.expand()}),this._applySize()}_applyCameraFit(t){if(!this._canvas||!this._visuals||!this._bounds)return;let e=O(this._wrap,this._visuals,t,this._bounds);P(this._canvas,e),this._panZoom?.sync(e)}connectedCallback(){this._hasRenderedOnce||this._scheduleRender()}attributeChangedCallback(t,e,n){if(e!==n){if(t==="width"||t==="height"){this._applySize();return}this._scheduleRender()}}_scheduleRender(){this._renderScheduled||(this._renderScheduled=!0,this._hasRenderedOnce=!0,queueMicrotask(()=>{this._renderScheduled=!1,this.isConnected&&this._render()}))}get src(){return this.getAttribute("src")||""}get startStep(){return Number(this.getAttribute("start-step")||0)}get canStep(){return this.getAttribute("can-step")==="true"||!1}get forceExpand(){return this.getAttribute("force-expand")==="true"||!1}get width(){return this.getAttribute("width")||"100%"}get height(){return this.getAttribute("height")||"350px"}_applySize(){this.style.width=this.width,this.style.height=this.height}async _render(){if(this._titleEl.textContent=this.src.split("/").pop()||"node graph",!this.src){this._wrap.innerHTML='<div class="ng-status">No src provided.</div>';return}try{let t=this.src.startsWith("https://voronoi.ch/graph.php?src=")?this.src:`https://voronoi.ch/graph.php?src=${this.src}`,e=await fetch(t).then(n=>n.json());this._applyResult(e)}catch(t){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(t)}</div>`,console.error("[node-graph]",t)}}setData(t){this._titleEl.textContent="node graph";try{this._applyResult(t)}catch(e){this._wrap.innerHTML=`<div class="ng-status">Failed to load: ${String(e)}</div>`,console.error("[node-graph]",e)}}_applyResult(t){let e=typeof t=="object"&&t!==null?t:null;this._visuals=e?.visuals||{},this._connections=e?.connections||{},this._steps=e?.steps||[],this._bounds=F(this._visuals),this._wrap.innerHTML="",this._canvas=document.createElement("div"),this._canvas.className="ng-canvas",this._canvas.style.width=this._bounds.canvasW+"px",this._canvas.style.height=this._bounds.canvasH+"px",this._canvas.insertAdjacentHTML("beforeend",R(this._connections,this._visuals,this._bounds)),this._statusEl.textContent=`
        Loaded graph with ${this._visuals?Object.keys(this._visuals).length:"?"} visuals. 
        ${this._connections?Object.keys(this._connections).length:"?"} connections. 
        ${this._steps.length} steps. 
        Start step: ${this.startStep}. 
        Can step: ${this.canStep}.
      `,Object.entries(this._visuals).forEach(([n,i])=>{let s=document.createElement("div");s.className="ng-node",s.dataset.nodeId=n,s.style.left=i.pos.x+this._bounds.offsetX+"px",s.style.top=i.pos.y+this._bounds.offsetY+"px",s.innerHTML=i.svg,this._canvas.appendChild(s)}),this._wrap.appendChild(this._canvas),this._stepping.init(this._steps,this.startStep,Object.keys(this._visuals)),this.forceExpand&&(this._overlay.expand(),this._expandBtnEl.style.visibility="hidden"),this.dispatchEvent(new CustomEvent("node-graph:ready",{detail:{visuals:this._visuals,steps:this._steps,startStep:this.startStep,canStep:this.canStep,forceExpand:this.forceExpand},bubbles:!0,composed:!0}))}};customElements.define("node-graph",L);export{L as NodeGraph};
//# sourceMappingURL=node-graph.js.map
