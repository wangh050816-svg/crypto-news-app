// The film's one typeface, bundled with it: Noto Sans TC (variable, 100-900, OFL; public/fonts/OFL.txt).
// No network at render time. Browser-only, so only FontGate imports this file.
import { staticFile } from 'remotion';

if (typeof document !== 'undefined' && !document.getElementById('noto-tc')) {
  const style = document.createElement('style');
  style.id = 'noto-tc';
  style.textContent = `@font-face { font-family: "Noto Sans TC"; src: url("${staticFile('fonts/NotoSansTC.ttf')}") format("truetype"); font-weight: 100 900; font-display: block; }`;
  document.head.appendChild(style);
}
