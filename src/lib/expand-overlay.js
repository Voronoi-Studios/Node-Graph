
export class ExpandOverlay {
  constructor({ hostEl, onExpanded, onCollapsed }) {
    this._host = hostEl;
    this._placeholder = null;
    this._expanded = false;
    this._onExpanded = onExpanded || null;
    this._onCollapsed = onCollapsed || null;
    this._escHandler = (e) => {
      if (e.key === "Escape") this.collapse();
    };
  }

  get expanded() {
    return this._expanded;
  }

  expand() {
    if (this._expanded) return;
    this._expanded = true;

    const host = this._host;
    const rect = host.getBoundingClientRect();

    // same-sized placeholder so the surrounding page doesn't reflow/jump
    const placeholder = document.createElement("div");
    placeholder.style.width = rect.width + "px";
    placeholder.style.height = rect.height + "px";
    host.parentNode.insertBefore(placeholder, host);
    this._placeholder = placeholder;

    const targetW = Math.min(window.innerWidth * 0.96, window.innerWidth - 32);
    const targetH = Math.min(window.innerHeight * 0.96, window.innerHeight - 32);
    const targetLeft = (window.innerWidth - targetW) / 2;
    const targetTop = (window.innerHeight - targetH) / 2;

    // Set to final size but animate.
    const sx = rect.width / targetW;
    const sy = rect.height / targetH;
    const tx = rect.left - targetLeft;
    const ty = rect.top - targetTop;

    Object.assign(host.style, {
      position: "fixed",
      margin: "0",
      zIndex: "500",
      left: targetLeft + "px",
      top: targetTop + "px",
      width: targetW + "px",
      height: targetH + "px",
      transformOrigin: "0 0",
      transition: "none",
      transform: `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`,
    });

    document.body.appendChild(host);
    void host.getBoundingClientRect(); // get the starting transform before animating

    requestAnimationFrame(() => {
      host.style.transition = "transform .35s cubic-bezier(.22,.8,.2,1)";
      host.style.transform = "none";
    });

    host.addEventListener(
      "transitionend",
      () => {
        host.style.transition = "";
        if (this._onExpanded) this._onExpanded();
      },
      { once: true }
    );

    document.addEventListener("keydown", this._escHandler);
  }

  collapse() {
    if (!this._expanded) return;

    const host = this._host;
    const currentRect = host.getBoundingClientRect();
    const placeholderRect = this._placeholder.getBoundingClientRect();

    const sx = placeholderRect.width / currentRect.width;
    const sy = placeholderRect.height / currentRect.height;
    const tx = placeholderRect.left - currentRect.left;
    const ty = placeholderRect.top - currentRect.top;

    host.style.transition = "transform .35s cubic-bezier(.22,.8,.2,1)";
    host.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;

    host.addEventListener(
      "transitionend",
      () => {
        this._placeholder.replaceWith(host);
        this._placeholder = null;

        Object.assign(host.style, {
          position: "",
          margin: "",
          zIndex: "",
          left: "",
          top: "",
          width: "",
          height: "",
          transformOrigin: "",
          transition: "",
          transform: "",
        });

        this._expanded = false;
        document.removeEventListener("keydown", this._escHandler);
        if (this._onCollapsed) this._onCollapsed();
      },
      { once: true }
    );
  }
}