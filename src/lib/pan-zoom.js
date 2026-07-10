
export function attachPanZoom(viewportEl, canvasEl) {
  let x = 0, y = 0, scale = 1;
  let dragging = false, lastX = 0, lastY = 0;

  function apply() {
    canvasEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function onPointerDown(e) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    viewportEl.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    x += e.clientX - lastX;
    y += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    apply();
  }

  function onPointerUp() {
    dragging = false;
  }

  function onWheel(e) {
    e.preventDefault();
    const factor = Math.exp(-e.deltaY * 0.0015);
    const newScale = Math.min(Math.max(scale * factor, 0.05), 4);
    const rect = viewportEl.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const ratio = newScale / scale;
    x = px - (px - x) * ratio;
    y = py - (py - y) * ratio;
    scale = newScale;
    apply();
  }

  viewportEl.addEventListener("pointerdown", onPointerDown);
  viewportEl.addEventListener("pointermove", onPointerMove);
  viewportEl.addEventListener("pointerup", onPointerUp);
  viewportEl.addEventListener("pointercancel", onPointerUp);
  viewportEl.addEventListener("pointerleave", onPointerUp);
  viewportEl.addEventListener("wheel", onWheel, { passive: false });

  return {
    sync(camera) {
      if (!camera) return;
      x = camera.x;
      y = camera.y;
      scale = camera.scale;
      apply();
    },
    destroy() {
      viewportEl.removeEventListener("pointerdown", onPointerDown);
      viewportEl.removeEventListener("pointermove", onPointerMove);
      viewportEl.removeEventListener("pointerup", onPointerUp);
      viewportEl.removeEventListener("pointercancel", onPointerUp);
      viewportEl.removeEventListener("pointerleave", onPointerUp);
      viewportEl.removeEventListener("wheel", onWheel);
    },
  };
}