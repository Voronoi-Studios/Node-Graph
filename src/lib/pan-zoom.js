export function attachPanZoom(viewportEl, canvasEl) {
  let x = 0, y = 0, scale = 1;
  let dragging = false, lastX = 0, lastY = 0;

  // Track all active pointers for multi-touch (pinch) support
  const pointers = new Map();
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let pinchStartMidX = 0, pinchStartMidY = 0;

  // Prevent the browser's native touch scroll/zoom from fighting our handlers
  viewportEl.style.touchAction = "none";

  function apply() {
    canvasEl.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function getPointsArray() {
    return Array.from(pointers.values());
  }

  function dist(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  }

  function midpoint(p1, p2) {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  }

  function onPointerDown(e) {
    viewportEl.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 1) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    } else if (pointers.size === 2) {
      // Starting a pinch: stop single-finger dragging
      dragging = false;
      const [p1, p2] = getPointsArray();
      pinchStartDist = dist(p1, p2) || 1;
      pinchStartScale = scale;
      const mid = midpoint(p1, p2);
      pinchStartMidX = mid.x;
      pinchStartMidY = mid.y;
    }
  }

  function onPointerMove(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      const [p1, p2] = getPointsArray();
      const newDist = dist(p1, p2) || 1;
      const newScale = Math.min(
        Math.max(pinchStartScale * (newDist / pinchStartDist), 0.05),
        4
      );

      const rect = viewportEl.getBoundingClientRect();
      const mid = midpoint(p1, p2);
      const px = pinchStartMidX - rect.left;
      const py = pinchStartMidY - rect.top;

      // Zoom anchored at the pinch midpoint, then pan by any midpoint drift
      const ratio = newScale / scale;
      x = px - (px - x) * ratio;
      y = py - (py - y) * ratio;
      x += mid.x - pinchStartMidX;
      y += mid.y - pinchStartMidY;

      scale = newScale;
      apply();
      return;
    }

    if (!dragging) return;
    x += e.clientX - lastX;
    y += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    apply();
  }

  function onPointerUp(e) {
    pointers.delete(e.pointerId);

    if (pointers.size === 1) {
      // Dropped from pinch back to a single finger: resume drag from here
      const [p] = getPointsArray();
      dragging = true;
      lastX = p.x;
      lastY = p.y;
    } else if (pointers.size === 0) {
      dragging = false;
    }
  }

  viewportEl.addEventListener("pointerdown", onPointerDown);
  viewportEl.addEventListener("pointermove", onPointerMove);
  viewportEl.addEventListener("pointerup", onPointerUp);
  viewportEl.addEventListener("pointercancel", onPointerUp);
  viewportEl.addEventListener("pointerleave", onPointerUp);
  viewportEl.addEventListener("wheel", onWheel, { passive: false });

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