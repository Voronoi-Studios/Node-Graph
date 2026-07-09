
const PATHS = {
  "chevron-left": `<polyline points="15 18 9 12 15 6"/>`,
  "chevron-right": `<polyline points="9 18 15 12 9 6"/>`,
  "play": `<polygon points="6 3 20 12 6 21 6 3"/>`,
  "maximize-2": `
    <polyline points="15 3 21 3 21 9"/>
    <polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/>
    <line x1="3" y1="21" x2="10" y2="14"/>
  `,
  "git-branch": `
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  `,
};
 
// Returns an inline <svg> string.
export function icon(name, size = 14) {
  const inner = PATHS[name];
  if (!inner) return "";
  return `<svg class="ng-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
