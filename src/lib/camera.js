/** Fits the bounding box of the given node ids inside the viewport, then
* centers it.*/ 
export function computeFit(viewportEl, visuals, ids, bounds) {
    const items = ids.map((id) => visuals[id]).filter(Boolean);
    if (!items.length) return null;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    items.forEach((n) => {
        const x = n.pos.x + bounds.offsetX;
        const y = n.pos.y + bounds.offsetY;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + (n.width || 160));
        maxY = Math.max(maxY, y + (n.height || 90));
    });

    const pad = 60;
    minX -= pad;
    minY -= pad;
    maxX += pad;
    maxY += pad;

    const boxW = maxX - minX;
    const boxH = maxY - minY;
    const vw = viewportEl.clientWidth;
    const vh = viewportEl.clientHeight;
    if (!boxW || !boxH || !vw || !vh) return null;

    let scale = Math.min(vw / boxW, vh / boxH);
    scale = Math.min(Math.max(scale, 0.25), 1.5);

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