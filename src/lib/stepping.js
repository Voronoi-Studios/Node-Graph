export class SteppingController {
    constructor({ wrapEl, centerEl, canStep }) {
        this._wrapEl = wrapEl;
        this._centerEl = centerEl;
        this._canStep = canStep;

        this.steps = [];
        this.mode = "none";
        this.currentStep = 0;
    }

    // Called once per _render() with the freshly-loaded steps + the
    // requested start step (1-indexed attribute value; 0 means "whole").
    init(steps, startStep) {
        this.steps = steps;

        if (!steps.length) {
        this.mode = "none";
        } else if (startStep === 0) {
        this.mode = "whole";
        this._clearDim();
        } else {
        this.mode = "stepping";
        this.currentStep = Math.min(Math.max(startStep - 1, 0), steps.length - 1);
        this._applyDim(steps[this.currentStep].ids);
        }

        this._renderCenter();
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

    _renderCenter() {
        this._centerEl.innerHTML = "";

        if (this.mode === "none") return;

        if (this.mode === "whole") {
        if (!this._canStep()) return; // manual stepping disabled: static, no text
        const btn = document.createElement("button");
        btn.className = "ng-walklink";
        btn.type = "button";
        btn.textContent = "Start walkthrough →";
        btn.addEventListener("click", () => this._startWalkthrough());
        this._centerEl.appendChild(btn);
        return;
        }

        // mode === "stepping"
        const step = this.steps[this.currentStep];

        const prev = document.createElement("button");
        prev.className = "ng-stepbtn";
        prev.type = "button";
        prev.textContent = "‹";
        prev.setAttribute("aria-label", "Previous step");

        const label = document.createElement("span");
        label.className = "ng-steplabel";
        label.innerHTML = `<span class="ng-stepcount">step ${this.currentStep + 1} of ${this.steps.length}</span>${step.label || ""}`;

        const next = document.createElement("button");
        next.className = "ng-stepbtn";
        next.type = "button";
        next.textContent = "›";
        next.setAttribute("aria-label", "Next step");
        next.disabled = this.currentStep === this.steps.length - 1;

        if (this._canStep()) {
        prev.addEventListener("click", () => this._goStep(-1));
        next.addEventListener("click", () => this._goStep(1));
        } else {
        prev.disabled = true;
        next.disabled = true;
        }

        this._centerEl.append(prev, label, next);
    }

    _startWalkthrough() {
        this.mode = "stepping";
        this.currentStep = 0;
        this._applyDim(this.steps[0].ids);
        this._renderCenter();
    }

    _exitToWhole() {
        this.mode = "whole";
        this._clearDim();
        this._renderCenter();
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
        this._renderCenter();
    }
}