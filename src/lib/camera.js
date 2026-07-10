
function getVisualBounds(visuals) {
    const nodes = Object.values(visuals);

    if (!nodes.length) {
        return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    nodes.forEach((n) => {
        minX = Math.min(minX, n.pos.x);
        minY = Math.min(minY, n.pos.y);
        maxX = Math.max(maxX, n.pos.x + (n.width || 160));
        maxY = Math.max(maxY, n.pos.y + (n.height || 90));
    });

    return { minX, minY, maxX, maxY };
}

/** Fits the bounding box of the given node ids inside the viewport, then
* centers it.*/ 
export function computeFit(viewportEl, visuals, ids, bounds) {
    const selectedVisuals = Object.fromEntries(ids.map(id => [id, visuals[id]]).filter(([, v]) => v));

    let { minX, minY, maxX, maxY } = getVisualBounds(selectedVisuals);

    const pad = 60;
    minX += bounds.offsetX - pad;
    minY += bounds.offsetY - pad;
    maxX += bounds.offsetX + pad;
    maxY += bounds.offsetY + pad;

    const boxW = maxX - minX;
    const boxH = maxY - minY;

    const vw = viewportEl.clientWidth;
    const vh = viewportEl.clientHeight;

    if (!boxW || !boxH || !vw || !vh) return null;

    let scale = Math.min(vw / boxW, vh / boxH);
    scale = Math.min(scale, 1.5);

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    return {
        x: vw / 2 - cx * scale,
        y: vh / 2 - cy * scale,
        scale,
    };
}

export function applyCamera(canvasEl, camera) {
    if (!camera) return;
    canvasEl.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`;
}

export function computeBounds(visuals) {
    let { minX, minY, maxX, maxY } = getVisualBounds(visuals);

    const pad = 60;
    minX -= pad;
    minY -= pad;
    maxX += pad;
    maxY += pad;

    return {
      offsetX: -minX,
      offsetY: -minY,
      canvasW: maxX - minX,
      canvasH: maxY - minY,
    };
  }