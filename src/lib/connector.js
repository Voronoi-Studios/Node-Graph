
export function buildConnectionsSvg(connections, visuals, bounds) {
  const { offsetX, offsetY, canvasW, canvasH } = bounds;
  const parts = [
    `<svg width="${canvasW}" height="${canvasH}" style="position:absolute;top:0;left:0;pointer-events:none" xmlns="http://www.w3.org/2000/svg"><g stroke="#f0f0f0" stroke-width="3" fill="none">`,
  ];

  connections.forEach((c) => {
    const visualA = visuals.get(c.from);
    const visualB = visuals.get(c.to);
    if (!visualA || !visualB) return;

    const index = visualA.outputs.indexOf(c.via);
    const outIndex = index === -1 ? 0 : index;

    const x1 = visualA.x + offsetX + visualA.width + 11;
    const y1 = visualA.y + offsetY + HEADER_HEIGHT + TOP_PAD + PIN_RADIUS - 2 + outIndex * ROW_PITCH;
    const x2 = visualB.x + offsetX + 10;
    const y2 = visualB.y + offsetY + HEADER_HEIGHT + TOP_PAD + PIN_RADIUS - 2;
    const dx = Math.abs(x2 - x1) * 0.2;

    parts.push(
      `<path class="ng-edge" data-from="${c.from}" data-to="${c.to}" d="M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}"/>`
    );
  });

  parts.push("</g></svg>");
  return parts.join("");
}