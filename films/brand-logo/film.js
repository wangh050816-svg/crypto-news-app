/* 品牌 Logo 開場 · 9:16 · 9 秒。一個手法：光的遮罩把每一層「擦」出來；Logo 揭露 1.8 秒，6.0 秒落定（對齊「叮」）。
 * 五層（assets/*.png）是原圖 × 遮罩、畫在黑底上，用加法疊回去；全部亮滿時畫面就是原圖。draw(t) 只由 t 決定。 */
(function () {
'use strict';
const W = 1080, H = 1920, DUR = 9.0, S = W / 941;
const cv = document.getElementById('c'), x = cv.getContext('2d');
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a)), sm = k => k * k * (3 - 2 * k), ss = (t, a, b) => sm(seg(t, a, b));
const io = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2, outQuint = k => 1 - Math.pow(1 - k, 5);
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const P = (px, py) => [px * S, py * S];                              // 原圖座標 → 畫面
const T = { beam: .3, bull: 1.6, line: 3.6, logo: 4.2, settle: 6.0, shine: 7.0 };

const NAMES = ['beam', 'bull', 'line', 'logo', 'bottom'], IMG = {};
let pending = NAMES.length;
NAMES.forEach(n => { const im = new Image(); im.onload = () => { if (--pending === 0) window.READY = true; }; im.src = 'assets/' + n + '.png'; IMG[n] = im; });

/* 一層：先畫到暫存畫布，用遮罩函數（在暫存畫布上畫出不透明的地方）留下要顯示的部分，再用加法疊到主畫面 */
const off = document.createElement('canvas'); off.width = W; off.height = H; const ox = off.getContext('2d');
function layer(name, alpha, mask) {
  if (alpha <= 0) return;
  ox.globalCompositeOperation = 'source-over'; ox.globalAlpha = 1; ox.clearRect(0, 0, W, H); ox.drawImage(IMG[name], 0, 0);
  if (mask) { ox.globalCompositeOperation = 'destination-in'; mask(ox); }
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = alpha; x.drawImage(off, 0, 0); x.restore();
}
/* 軟邊擦除：沿著某個方向，進度 k（0..1）把畫面從一端擦到另一端，邊緣寬 soft 像素 */
function wipe(c, x0, y0, x1, y1, k, soft) {
  const len = Math.hypot(x1 - x0, y1 - y0), p = lerp(-soft, len + soft, k), g = c.createLinearGradient(x0, y0, x1, y1);
  const a = clamp((p - soft) / len), b = clamp(p / len); g.addColorStop(0, '#000'); g.addColorStop(a, '#000'); g.addColorStop(b, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
}
/* 星芒：小白核 + 十字長光 + 暖色光暈 */
function star(cx, cy, r, a, rot = 0) {
  if (a <= 0) return; x.save(); x.globalCompositeOperation = 'lighter'; x.translate(cx, cy); x.rotate(rot);
  let g = x.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, `rgba(255,236,214,${a})`); g.addColorStop(.25, `rgba(255,190,150,${a * .5})`); g.addColorStop(1, 'rgba(255,160,120,0)'); x.fillStyle = g; x.fillRect(-r, -r, r * 2, r * 2);
  for (const [sx, sy] of [[r * 3.2, r * .06], [r * .06, r * 2.2]]) { g = x.createRadialGradient(0, 0, 0, 0, 0, Math.max(sx, sy)); g.addColorStop(0, `rgba(255,240,225,${a})`); g.addColorStop(1, 'rgba(255,200,170,0)'); x.fillStyle = g; x.save(); x.scale(sx / Math.max(sx, sy), sy / Math.max(sx, sy)); x.beginPath(); x.arc(0, 0, Math.max(sx, sy), 0, 6.283); x.fill(); x.restore(); }
  x.restore();
}
/* 天光裡的浮塵 */
function dust(t, a) {
  if (a <= 0) return; x.save(); x.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 70; i++) {
    const u = hash(i), v = hash(i + 50), yy = ((v * 700 + t * (8 + u * 14)) % 700) * S, xx = lerp(150, 470, u) * S + yy * .32 + Math.sin(t * .7 + i) * 8;
    const r = 1 + hash(i + 9) * 2.2, tw = .4 + .6 * Math.sin(t * 2 + i * 1.7) ** 2, al = a * tw * (1 - yy / (720 * S)) * .7;
    const g = x.createRadialGradient(xx, yy, 0, xx, yy, r * 3); g.addColorStop(0, `rgba(255,220,190,${al})`); g.addColorStop(1, 'rgba(255,220,190,0)'); x.fillStyle = g; x.fillRect(xx - r * 3, yy - r * 3, r * 6, r * 6);
  }
  x.restore();
}

window.draw = function (t) {
  x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.fillStyle = '#000'; x.fillRect(0, 0, W, H);
  /* 整體鏡頭：極慢推近，8 秒停 */
  const cam = 1 + .025 * io(seg(t, 0, 8)), [lcx, lcy] = P(475, 900);
  x.save(); x.translate(lcx, lcy); x.scale(cam, cam); x.translate(-lcx, -lcy);
  /* 1. 天光：從上往下灑下來，帶一點呼吸 */
  const kb = io(seg(t, T.beam, T.beam + 1.5)), breath = 1 + .05 * Math.sin(t * 1.3);
  layer('beam', ss(t, T.beam, T.beam + .6) * breath, c => wipe(c, 0, 0, 0, 700 * S, kb, 260));
  dust(t, ss(t, .8, 2.2));
  /* 2. 公牛：一道光由左往右掃過，牛從暗處浮出；掃過的那一刻邊緣亮一下 */
  const kbu = io(seg(t, T.bull, T.bull + 2.0));
  layer('bull', 1, c => wipe(c, 40 * S, 900 * S, 930 * S, 600 * S, kbu, 220));
  if (kbu > 0 && kbu < 1) layer('bull', .9 * Math.sin(kbu * Math.PI), c => { const p = lerp(0, 1, kbu); const g = c.createLinearGradient(40 * S, 900 * S, 930 * S, 600 * S); g.addColorStop(clamp(p - .08), 'rgba(0,0,0,0)'); g.addColorStop(clamp(p), '#000'); g.addColorStop(clamp(p + .02), 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  const [h1x, h1y] = P(700, 492), [h2x, h2y] = P(903, 512);
  star(h1x, h1y, 40, .9 * Math.sin(seg(t, 3.3, 3.9) * Math.PI)); star(h2x, h2y, 46, .9 * Math.sin(seg(t, 3.5, 4.1) * Math.PI));
  /* 3. 底部光線：從中心往兩側展開 */
  const kl = outQuint(seg(t, T.line, T.line + .8)), [lx, ly] = P(463, 1183);
  layer('line', 1, c => { c.fillStyle = '#000'; c.fillRect(lx - kl * 480 * S, ly - 40 * S, kl * 960 * S, 80 * S); });
  star(lx, ly, 60, .8 * Math.sin(seg(t, T.line - .1, T.line + .9) * Math.PI));
  layer('bottom', ss(t, 4.3, 5.6), c => wipe(c, 0, 1215 * S, 0, H, io(seg(t, 4.3, 5.6)), 200));
  /* 4. Logo：從下往上被光擦出來（1.8 秒），6.0 秒落定：1.04 → 1.00 */
  const kg = io(seg(t, T.logo, T.settle)), [bx, by] = P(475, 900);
  const pop = t >= T.settle ? lerp(1.04, 1, outQuint(seg(t, T.settle, T.settle + .18))) : 1;
  x.save(); x.translate(bx, by); x.scale(pop, pop); x.translate(-bx, -by);
  /* 還沒被照亮的 B：很暗的金屬剪影，跟著公牛一起浮現，避免牛身上出現 B 形的洞 */
  layer('logo', .18 * io(seg(t, T.bull + .8, T.bull + 2.0)), c => { c.fillStyle = '#000'; c.fillRect(0, 0, W, H); wipe(c, 0, 660 * S, 0, 1110 * S, kg, 120); });
  layer('logo', 1, c => wipe(c, 0, 1110 * S, 0, 660 * S, kg, 120));
  /* 擦除的光邊：一條沿著揭露邊緣移動的亮帶 */
  if (kg > 0 && kg < 1) layer('logo', 1.4 * Math.sin(kg * Math.PI), c => { const g = c.createLinearGradient(0, 1110 * S, 0, 660 * S); g.addColorStop(clamp(kg - .06), 'rgba(0,0,0,0)'); g.addColorStop(clamp(kg), '#000'); g.addColorStop(clamp(kg + .02), 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  /* 7.0 秒：一道光澤斜斜掃過 Logo */
  const ksh = seg(t, T.shine, T.shine + .9);
  if (ksh > 0 && ksh < 1) layer('logo', .9, c => { const g = c.createLinearGradient(290 * S, 700 * S, 670 * S, 1100 * S), p = ksh; g.addColorStop(clamp(p - .12), 'rgba(0,0,0,0)'); g.addColorStop(clamp(p), '#000'); g.addColorStop(clamp(p + .12), 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); });
  x.restore();
  const [sx, sy] = P(463, 805), [mx, my] = P(468, 1058);
  star(sx, sy, 80, 1.0 * Math.exp(-Math.max(0, t - T.settle) * 2.2) * (t >= T.settle ? 1 : 0));
  star(mx, my, 50, .8 * Math.exp(-Math.max(0, t - T.settle - .1) * 2.5) * (t >= T.settle + .1 ? 1 : 0));
  x.restore();
  const fin = ss(t, 0, .3); if (fin < 1) { x.fillStyle = `rgba(0,0,0,${1 - fin})`; x.fillRect(0, 0, W, H); }
};
window.DUR = DUR;
})();
