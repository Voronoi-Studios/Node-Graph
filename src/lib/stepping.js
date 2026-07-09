export class SteppingController {
    constructor({
        wrapEl,
        walklinkEl,
        stepperEl,
        prevBtn,
        nextBtn,
        stepcountEl,
        steptextEl,
        canStep,
        onActiveIds,
    }) {
        this._wrapEl = wrapEl;
        this._walklinkEl = walklinkEl;
        this._stepperEl = stepperEl;
        this._prevBtn = prevBtn;
        this._nextBtn = nextBtn;
        this._stepcountEl = stepcountEl;
        this._steptextEl = steptextEl;
        this._canStep = canStep;
        this._onActiveIds = onActiveIds || null; // (ids) => void, camera fit lives here

        this.steps = [];
        this.mode = "none";
        this.currentStep = 0;
        this._allIds = [];

        this._walklinkEl.addEventListener("click", () => this._startWalkthrough());
        this._prevBtn.addEventListener("click", () => this._goStep(-1));
        this._nextBtn.addEventListener("click", () => this._goStep(1));
    }

    _notify(ids) {
        if (this._onActiveIds) this._onActiveIds(ids);
    }


    /** Called once per _render() with the freshly-loaded steps, the
     * requested start step (1-indexed attribute value; 0 means "whole"),
     * and every node id currently on screen (used to fit the camera to the
     * whole graph in "whole"/"none" modes).*/ 
    init(steps, startStep, allIds = []) {
        this.steps = steps;
        this._allIds = allIds;
    
        if (!steps.length) {
            this.mode = "none";
            this._clearDim();
            this._notify(this._allIds);
        } else if (startStep === 0) {
            this.mode = "whole";
            this._clearDim();
            this._notify(this._allIds);
        } else {
            this.mode = "stepping";
            this.currentStep = Math.min(Math.max(startStep - 1, 0), steps.length - 1);
            this._applyDim(steps[this.currentStep].ids);
            this._notify(steps[this.currentStep].ids);
        }
    
        this._syncUI();
    }


    _applyDim(ids) {
        this._wrapEl.querySelectorAll(".ng-node").forEach((el) => {
            el.classList.toggle("ng-dim", !ids.includes(el.dataset.nodeId));
        });
        this._wrapEl.querySelectorAll(".ng-edge").forEach((el) => {
            const on = ids.includes(el.dataset.from) && ids.includes(el.dataset.to);
            el.style.opacity = on ? "1" : "0.25";
        });
    }

    _clearDim() {
        this._wrapEl.querySelectorAll(".ng-node").forEach((el) => el.classList.remove("ng-dim"));
        this._wrapEl.querySelectorAll(".ng-edge").forEach((el) => (el.style.opacity = "1"));
    }

    /** Toggles which static block is visible and refreshes its text/disabled
     * state — the only DOM work this controller does after construction. */
    _syncUI() {
        if (this.mode === "none") {
        this._walklinkEl.hidden = true;
        this._stepperEl.hidden = true;
        return;
        }
    
        if (this.mode === "whole") {
        const show = this._canStep(); // manual stepping disabled: static, nothing shown
        this._walklinkEl.hidden = !show;
        this._stepperEl.hidden = true;
        return;
        }
    
        // mode === "stepping"
        this._walklinkEl.hidden = true;
        this._stepperEl.hidden = false;
    
        const step = this.steps[this.currentStep];
        this._stepcountEl.textContent = `step ${this.currentStep + 1} of ${this.steps.length}`;
        this._steptextEl.textContent = step.label || "";
    
        const canStep = this._canStep();
        this._prevBtn.disabled = !canStep;
        this._nextBtn.disabled = !canStep || this.currentStep === this.steps.length - 1;
    }
    
    _startWalkthrough() {
        this.mode = "stepping";
        this.currentStep = 0;
        this._applyDim(this.steps[0].ids);
        this._notify(this.steps[0].ids);
        this._syncUI();
    }
    
    _exitToWhole() {
        this.mode = "whole";
        this._clearDim();
        this._notify(this._allIds);
        this._syncUI();
    }
    
    _goStep(delta) {
        const next = this.currentStep + delta;
        if (next < 0) {
        this._exitToWhole();
        return;
        }
        if (next > this.steps.length - 1) return;
        this.currentStep = next;
        this._applyDim(this.steps[this.currentStep].ids);
        this._notify(this.steps[this.currentStep].ids);
        this._syncUI();
    }
}