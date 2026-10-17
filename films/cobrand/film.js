/* 聯名宣傳 · 你的品牌 × OURBIT 萬聖節狂歡夜 · 直式 9:16 · 28 秒。
 * 結構：品牌開場（暗場玫瑰金，B Logo 被光擦出）→ 聯名畫面（B × OURBIT）→ 萬聖節活動（標題、PKM 卡牌、30% 返利、四大福利）→ 結尾雙 Logo + 行動呼籲。
 * 活動素材全部是從海報精準摳出的透明圖（cutout.py）；品牌開場沿用 brand-logo 的五層畫面。每一幀只由 t 決定：draw(t)。 */
(function () {
'use strict';
const W = 1080, H = 1920, DUR = 28.0, S = W / 941;
const cv = document.getElementById('c'), x = cv.getContext('2d');
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a)), sm = k => k * k * (3 - 2 * k), ss = (t, a, b) => sm(seg(t, a, b));
const outBack = k => { const c = 1.70158; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
const outExpo = k => k >= 1 ? 1 : 1 - Math.pow(2, -10 * k), io = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2, outQuint = k => 1 - Math.pow(1 - k, 5);
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const GREEN = '#3DF0A0', ROSE = '#E8B9A0';
/* 時間表 */
const T = { beamIn: .2, bullIn: .8, lineIn: 2.2, bIn: 2.6, bSet: 3.9, cobrand: 5.2, toCampaign: 8.2, title: 8.6, pack: 12.6, rebate: 16.2, cards: 19.8, end: 24.6 };

const NAMES = ['bg', 'brand_beam', 'brand_bull', 'brand_line', 'brand_logo', 'brand_bottom', 'brandmark', 'logo', 'title', 'ribbon', 'sign', 'pack', 'paper', 'badge', 'card1', 'card2', 'card3', 'card4'];
const IMG = {}; let pending = NAMES.length + 1; const done = () => { if (--pending === 0) window.READY = true; };
NAMES.forEach(n => { const im = new Image(); im.onload = done; im.src = 'assets/' + n + (n === 'bg' ? '.jpg' : '.png'); IMG[n] = im; });
document.fonts.load('900 60px Sans').then(() => document.fonts.load('500 30px Sans')).then(done);

/* ---------- 共用工具 ---------- */
const off = document.createElement('canvas'), ox = off.getContext('2d');
function img(n, cx, cy, h, o = {}) {
  const im = IMG[n], a = o.a == null ? 1 : o.a; if (a <= 0 || !im.width) return;
  const w = h * im.width / im.height;
  x.save(); x.globalAlpha = a; if (o.add) x.globalCompositeOperation = 'lighter'; x.translate(cx, cy); if (o.rot) x.rotate(o.rot);
  if (o.glow) { x.shadowColor = o.glowColor || GREEN; x.shadowBlur = o.glow; }
  if (o.shine != null && o.shine > 0 && o.shine < 1) {
    off.width = Math.ceil(w); off.height = Math.ceil(h); ox.clearRect(0, 0, off.width, off.height); ox.drawImage(im, 0, 0, w, h);
    ox.globalCompositeOperation = 'source-atop'; const p = lerp(-.4, 1.4, o.shine) * (w + h);
    const g = ox.createLinearGradient(p - 180, 0, p + 180, h * .6); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,240,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ox.fillStyle = g; ox.fillRect(0, 0, w, h); ox.globalCompositeOperation = 'source-over'; x.drawImage(off, -w / 2, -h / 2);
  } else x.drawImage(im, -w / 2, -h / 2, w, h);
  x.restore();
}
function glowBlob(cx, cy, r, rgb, a) { if (a <= 0) return; const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`); x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); x.restore(); }
function text(s, cx, cy, size, col, o = {}) { x.save(); x.globalAlpha = o.a == null ? 1 : o.a; x.font = `${o.w || 800} ${size}px Sans`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (o.track) x.letterSpacing = o.track + 'px'; if (o.glow) { x.shadowColor = o.glowColor || col; x.shadowBlur = o.glow; } x.fillStyle = o.grad || col; x.fillText(s, cx + (o.track ? o.track / 2 : 0), cy); x.restore(); }
function pill(cx, cy, w, h, fill, a, stroke) { x.save(); x.globalAlpha = a; x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, h / 2); x.fillStyle = fill; x.fill(); if (stroke) { x.lineWidth = 3; x.strokeStyle = stroke; x.stroke(); } x.restore(); }
function star(cx, cy, r, a) {
  if (a <= 0) return; x.save(); x.globalCompositeOperation = 'lighter'; x.translate(cx, cy);
  let g = x.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, `rgba(255,236,214,${a})`); g.addColorStop(.25, `rgba(255,190,150,${a * .5})`); g.addColorStop(1, 'rgba(255,160,120,0)'); x.fillStyle = g; x.fillRect(-r, -r, r * 2, r * 2);
  for (const [sx, sy] of [[r * 3.2, r * .06], [r * .06, r * 2.2]]) { const m = Math.max(sx, sy); g = x.createRadialGradient(0, 0, 0, 0, 0, m); g.addColorStop(0, `rgba(255,240,225,${a})`); g.addColorStop(1, 'rgba(255,200,170,0)'); x.fillStyle = g; x.save(); x.scale(sx / m, sy / m); x.beginPath(); x.arc(0, 0, m, 0, 6.283); x.fill(); x.restore(); }
  x.restore();
}
/* 品牌五層：先在暫存畫布上用遮罩留下要顯示的部分，再用加法疊上去 */
const off2 = document.createElement('canvas'); off2.width = W; off2.height = H; const o2 = off2.getContext('2d');
function layer(name, alpha, mask) {
  if (alpha <= 0) return; o2.globalCompositeOperation = 'source-over'; o2.clearRect(0, 0, W, H); o2.drawImage(IMG[name], 0, 0);
  if (mask) { o2.globalCompositeOperation = 'destination-in'; mask(o2); }
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = alpha; x.drawImage(off2, 0, 0); x.restore();
}
function wipe(c, x0, y0, x1, y1, k, soft) {
  const len = Math.hypot(x1 - x0, y1 - y0), p = lerp(-soft, len + soft, k), g = c.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, '#000'); g.addColorStop(clamp((p - soft) / len), '#000'); g.addColorStop(clamp(p / len), 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
}
const P = (px, py) => [px * S, py * S];

/* ---------- A. 品牌開場（0–5.2 秒）：天光 → 公牛 → 光線 → B 被光擦出，3.9 秒落定 ---------- */
function brandIntro(t) {
  const a = 1 - ss(t, T.cobrand - .2, T.cobrand + .6); if (a <= 0) return;
  x.save(); x.globalAlpha = a;
  const kb = io(seg(t, T.beamIn, T.beamIn + 1.0));
  layer('brand_beam', ss(t, T.beamIn, T.beamIn + .5) * a, c => wipe(c, 0, 0, 0, 700 * S, kb, 260));
  layer('brand_bull', a, c => wipe(c, 40 * S, 900 * S, 930 * S, 600 * S, io(seg(t, T.bullIn, T.bullIn + 1.6)), 220));
  layer('brand_logo', .18 * a * io(seg(t, T.bullIn + .6, T.bullIn + 1.6)), c => { c.fillStyle = '#000'; c.fillRect(0, 0, W, H); wipe(c, 0, 660 * S, 0, 1110 * S, io(seg(t, T.bIn, T.bSet)), 120); });
  const kl = outQuint(seg(t, T.lineIn, T.lineIn + .6)), [lx, ly] = P(463, 1183);
  layer('brand_line', a, c => { c.fillStyle = '#000'; c.fillRect(lx - kl * 480 * S, ly - 40 * S, kl * 960 * S, 80 * S); });
  layer('brand_bottom', ss(t, 2.6, 3.6) * a);
  const [bx, by] = P(475, 900), pop = t >= T.bSet ? lerp(1.04, 1, outQuint(seg(t, T.bSet, T.bSet + .18))) : 1;
  x.save(); x.translate(bx, by); x.scale(pop, pop); x.translate(-bx, -by);
  layer('brand_logo', a, c => wipe(c, 0, 1110 * S, 0, 660 * S, io(seg(t, T.bIn, T.bSet)), 120));
  x.restore();
  const [sx, sy] = P(463, 805); star(sx, sy, 80, a * (t >= T.bSet ? Math.exp(-(t - T.bSet) * 2.2) : 0));
  const [h1x, h1y] = P(700, 492), [h2x, h2y] = P(903, 512); star(h1x, h1y, 36, a * .8 * Math.sin(seg(t, 2.1, 2.6) * Math.PI)); star(h2x, h2y, 40, a * .8 * Math.sin(seg(t, 2.3, 2.8) * Math.PI));
  x.restore();
}

/* ---------- B. 聯名畫面（5.2–8.6 秒）：B 往左、細線畫出 ×、OURBIT 從右邊進來 ---------- */
function cobrand(t) {
  const a = ss(t, T.cobrand, T.cobrand + .5) * (1 - ss(t, T.toCampaign, T.toCampaign + .5)); if (a <= 0) return;
  const k = io(seg(t, T.cobrand, T.cobrand + .9)), cy = 860;
  glowBlob(W / 2, cy, 620, '232,185,160', .18 * a);
  img('brandmark', lerp(W / 2, 285, k), lerp(900, cy, k), lerp(560, 330, k), { a, add: true });
  /* × ：兩條細線畫出來 */
  const kx = io(seg(t, T.cobrand + .7, T.cobrand + 1.2)), L = 46;
  x.save(); x.globalAlpha = a; x.strokeStyle = ROSE; x.lineWidth = 4; x.lineCap = 'round'; x.shadowColor = ROSE; x.shadowBlur = 16;
  x.beginPath(); x.moveTo(W / 2 - L, cy - L); x.lineTo(W / 2 - L + 2 * L * kx, cy - L + 2 * L * kx); x.moveTo(W / 2 + L, cy - L); x.lineTo(W / 2 + L - 2 * L * kx, cy - L + 2 * L * kx); x.stroke(); x.restore();
  const ko = outExpo(seg(t, T.cobrand + 1.0, T.cobrand + 1.7));
  img('logo', lerp(W + 300, 790, ko), cy, 80, { a: a * ss(t, T.cobrand + 1.0, T.cobrand + 1.3), glow: 18 });
  /* 一條細線 + 文字 */
  const kt = ss(t, T.cobrand + 1.6, T.cobrand + 2.2);
  x.save(); x.globalAlpha = a * kt; const g = x.createLinearGradient(140, 0, W - 140, 0); g.addColorStop(0, 'rgba(232,185,160,0)'); g.addColorStop(.5, 'rgba(232,185,160,.9)'); g.addColorStop(1, 'rgba(61,240,160,0)'); x.fillStyle = g; x.fillRect(140, cy + 200, W - 280, 2); x.restore();
  text('攜手呈獻', W / 2, cy + 270, 40, '#F2E2D6', { a: a * kt, w: 500, track: 18 });
  text('萬聖節狂歡夜', W / 2, cy + 350, 64, '#FFFFFF', { a: a * ss(t, T.cobrand + 1.9, T.cobrand + 2.4), w: 900, track: 10, glow: 24, glowColor: 'rgba(61,240,160,.6)' });
}

/* ---------- 活動段的背景：模糊的海報 + 壓暗 + 綠橘光暈 + 餘燼 ---------- */
function campaignBg(t, a) {
  if (a <= 0) return; x.save(); x.globalAlpha = a;
  const s = 1.18 + .04 * Math.sin(t * .2); x.save(); x.translate(W / 2 + Math.sin(t * .13) * 30, H / 2 + Math.cos(t * .11) * 40); x.scale(s, s); x.drawImage(IMG.bg, -W / 2, -H / 2, W, H); x.restore();
  x.fillStyle = 'rgba(6,8,10,.8)'; x.fillRect(0, 0, W, H); x.restore();
  glowBlob(W * .2, H * .28, 700, '61,240,160', (.10 + .04 * Math.sin(t * 1.3)) * a); glowBlob(W * .85, H * .62, 650, '255,140,40', (.09 + .04 * Math.sin(t * 1.7 + 1)) * a);
  x.save(); x.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 80; i++) {
    const sp = 40 + hash(i * 3) * 90, life = H + 200, y0 = H + 100 - ((t * sp + hash(i) * life) % life), x0 = hash(i * 7) * W + Math.sin(t * (.5 + hash(i)) + i) * 30;
    const r = 1.5 + hash(i * 5) * 3.5, col = hash(i * 11) < .35 ? '61,240,160' : '255,170,70', al = (.35 + .5 * hash(i * 13)) * (.6 + .4 * Math.sin(t * 3 + i)) * a;
    const g = x.createRadialGradient(x0, y0, 0, x0, y0, r * 4); g.addColorStop(0, `rgba(${col},${al})`); g.addColorStop(1, `rgba(${col},0)`); x.fillStyle = g; x.fillRect(x0 - r * 4, y0 - r * 4, r * 8, r * 8);
  }
  x.restore();
}
/* 頂端常駐的小聯名條：B × OURBIT */
function topBar(t) {
  const a = ss(t, T.title, T.title + .6) * (1 - ss(t, T.end, T.end + .4)); if (a <= 0) return;
  img('brandmark', W / 2 - 150, 130, 92, { a, add: true }); text('×', W / 2 - 62, 130, 36, ROSE, { a, w: 300 }); img('logo', W / 2 + 110, 130, 46, { a });
}

/* 衝擊：震動 + 一閃 */
const HITS = [T.title + .45, T.rebate + .95];
function shakeAt(t) { let s = 0; for (const h of HITS) { const k = t - h; if (k >= 0 && k < .45) s = Math.max(s, (1 - k / .45) * 20); } return [Math.sin(t * 97) * s, Math.cos(t * 83) * s]; }
function flash(t) { for (const h of HITS) { const k = t - h; if (k >= 0 && k < .35) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(120,255,190,${.4 * (1 - k / .35)})`; x.fillRect(0, 0, W, H); x.restore(); } } }

/* ---------- C. 標題重擊 → 標語帶 → 日期 ---------- */
function titleScene(t) {
  const a = ss(t, T.title, T.title + .2) * (1 - ss(t, T.pack - .5, T.pack)); if (a <= 0) return;
  const k = seg(t, T.title, T.title + .45), s = k < 1 ? lerp(2.0, 1, outExpo(k)) : 1 + .012 * Math.sin((t - T.title) * 2), lift = -io(seg(t, T.pack - .5, T.pack)) * 200;
  const gl = t > T.title + .45 && t < T.title + .75 ? (1 - (t - T.title - .45) / .3) * 14 : 0;
  glowBlob(W / 2, 700 + lift, 600, '61,240,160', .22 * a);
  if (gl > 0) { img('title', W / 2 - gl, 700 + lift, 470 * s, { a: .5 * a }); img('title', W / 2 + gl, 700 + lift, 470 * s, { a: .5 * a }); }
  img('title', W / 2, 700 + lift, 470 * s, { a, glow: 20, shine: seg(t, T.title + 1.8, T.title + 2.8) });
  const kr = outBack(seg(t, T.title + 1.2, T.title + 1.65));
  img('ribbon', lerp(-500, W / 2, kr), 1040 + lift, 150, { a: a * ss(t, T.title + 1.2, T.title + 1.4), rot: lerp(-.25, 0, kr) });
  const kd = ss(t, T.title + 2.0, T.title + 2.5);
  pill(W / 2, 1210 + lift + (1 - kd) * 40, 640, 86, 'rgba(10,14,12,.75)', a * kd, 'rgba(61,240,160,.8)');
  text('活動時間  10/16 – 10/31（UTC+8）', W / 2, 1210 + lift + (1 - kd) * 40, 38, '#EFFFF7', { a: a * kd, w: 700 });
}
/* ---------- D. 卡包升起 + 牌子晃下來 ---------- */
function packScene(t) {
  const a = ss(t, T.pack, T.pack + .3) * (1 - ss(t, T.rebate - .5, T.rebate)); if (a <= 0) return;
  const k = outBack(seg(t, T.pack, T.pack + .9)), out = io(seg(t, T.rebate - .5, T.rebate));
  const cy = lerp(1550, 1080, k) - out * 120, rot = lerp(-.2, -.02, k) + Math.sin(t * 1.4) * .015, h = lerp(700, 960, k) * (1 + out * .15);
  glowBlob(W / 2, cy, 700, '244,200,96', .3 * a);
  x.save(); x.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 26; i++) { const an = hash(i) * 6.28 + t * .3, r = 380 + hash(i + 3) * 160, tw = Math.max(0, Math.sin(t * 4 + i * 2.1)); const px = W / 2 + Math.cos(an) * r, py = cy + Math.sin(an) * r * 1.2; const g = x.createRadialGradient(px, py, 0, px, py, 14); g.addColorStop(0, `rgba(255,230,160,${.9 * tw * a})`); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(px - 14, py - 14, 28, 28); }
  x.restore();
  const sh = Math.max(seg(t, T.pack + 1.1, T.pack + 2.0), t > T.pack + 2.5 ? seg(t, T.pack + 2.5, T.pack + 3.2) : 0);
  img('pack', W / 2, cy, h, { a, rot, shine: sh || null, glow: 40, glowColor: 'rgba(244,200,96,.55)' });
  const ks = seg(t, T.pack + 1.3, T.pack + 1.7), swing = t > T.pack + 1.3 ? Math.sin((t - T.pack - 1.3) * 7) * .3 * Math.exp(-(t - T.pack - 1.3) * 2.2) : 0;
  if (ks > 0) { x.save(); x.translate(W * .7, 420 - (1 - outBack(ks)) * 420); x.rotate(swing + .05); x.strokeStyle = 'rgba(200,190,170,.7)'; x.lineWidth = 3; x.beginPath(); x.moveTo(-100, -190); x.lineTo(-100, -80); x.moveTo(100, -190); x.lineTo(100, -80); x.stroke(); img('sign', 0, 20, 250, { a: a * ss(t, T.pack + 1.3, T.pack + 1.45) }); x.restore(); }
}
/* ---------- E. 數字跳到 30% → 撕紙重擊 → 加碼徽章 ---------- */
function rebateScene(t) {
  const a = ss(t, T.rebate, T.rebate + .2) * (1 - ss(t, T.cards - .5, T.cards)); if (a <= 0) return;
  if (t < T.rebate + .95) { const n = Math.round(30 * io(seg(t, T.rebate + .05, T.rebate + .85))); text(n + '%', W / 2, 860, 300, GREEN, { a: a * ss(t, T.rebate, T.rebate + .2), w: 900, glow: 50 }); return; }
  const k = seg(t, T.rebate + .95, T.rebate + 1.25), s = k < 1 ? lerp(1.6, 1, outExpo(k)) : 1 + .012 * Math.sin((t - T.rebate) * 2.5);
  glowBlob(W / 2, 860, 650, '61,240,160', .28 * a);
  img('paper', W / 2, 860, 470 * s, { a, rot: -.02, shine: seg(t, T.rebate + 1.6, T.rebate + 2.5), glow: 30, glowColor: 'rgba(0,0,0,.5)' });
  const kb = outBack(seg(t, T.rebate + 1.7, T.rebate + 2.3));
  if (kb > 0) img('badge', W / 2, 1380, 420 * kb, { a: a * ss(t, T.rebate + 1.7, T.rebate + 1.9), rot: (1 - kb) * 2.5 + Math.sin(t * 1.5) * .04 });
}
/* ---------- F. 四張福利卡：一張張放大，再排成 2×2 ---------- */
const SLOTS = [[330, 780], [750, 780], [330, 1400], [750, 1400]], CT = [0, 1.15, 2.3, 3.45].map(v => T.cards + .1 + v);
function cardsScene(t) {
  const a = ss(t, T.cards, T.cards + .2) * (1 - ss(t, T.end - .4, T.end + .1)); if (a <= 0) return;
  CT.forEach((c0, i) => {
    if (t < c0) return;
    const kin = outBack(seg(t, c0, c0 + .35)), kf = io(seg(t, c0 + .85, c0 + 1.2));
    const cx = lerp(lerp(W + 500, W / 2, kin), SLOTS[i][0], kf), cy = lerp(1050, SLOTS[i][1], kf), h = lerp(1060, 580, kf), rot = lerp(lerp(.25, -.02, kin), 0, kf);
    const hl = i === 2 && t > CT[3] + 1.3 ? .5 + .5 * Math.sin((t - CT[3] - 1.3) * 6) : 0;
    img('card' + (i + 1), cx, cy, h, { a, rot, glow: 24 + hl * 50, glowColor: hl ? GREEN : 'rgba(0,0,0,.6)', shine: seg(t, c0 + .3, c0 + .85) });
  });
}
/* ---------- G. 結尾：雙 Logo、標題、日期、立即註冊 ---------- */
function endScene(t) {
  const a = ss(t, T.end, T.end + .5) * (1 - ss(t, DUR - .6, DUR)); if (a <= 0) return;
  const kl = outExpo(seg(t, T.end + .1, T.end + .8));
  glowBlob(W / 2 - 200, 380, 360, '232,185,160', .15 * a); glowBlob(W / 2 + 200, 380, 360, '61,240,160', .12 * a);
  img('brandmark', lerp(W / 2, W / 2 - 230, kl), 390, 260, { a: a * ss(t, T.end, T.end + .4), add: true });
  text('×', W / 2 - 20, 390, 54, ROSE, { a: a * kl, w: 300 }); img('logo', lerp(W / 2, W / 2 + 230, kl), 390, 66, { a: a * kl });
  img('title', W / 2, 820, 400 * (.9 + .1 * outBack(seg(t, T.end + .5, T.end + 1.0))), { a: a * ss(t, T.end + .5, T.end + .9), glow: 18 });
  text('10/16 – 10/31（UTC+8）', W / 2, 1100, 44, '#EFFFF7', { a: a * ss(t, T.end + .9, T.end + 1.3), w: 700, track: 4 });
  const kb = outBack(seg(t, T.end + 1.2, T.end + 1.7)), pulse = 1 + .04 * Math.sin((t - T.end - 1.7) * 6) * (t > T.end + 1.7 ? 1 : 0);
  if (kb > 0) { x.save(); x.translate(W / 2, 1300); x.scale(kb * pulse, kb * pulse); x.shadowColor = GREEN; x.shadowBlur = 40; pill(0, 0, 620, 130, GREEN, a); x.shadowBlur = 0; text('立即註冊 領取福利', 0, 2, 56, '#062014', { a, w: 900 }); x.restore(); }
  text('註冊免費送 PKM 卡牌｜最高 30% 儲值返利', W / 2, 1460, 34, '#CFEFE2', { a: a * ss(t, T.end + 1.6, T.end + 2.0), w: 500 });
  text('活動詳情以 OURBIT 官方公告為準｜加密資產交易具風險', W / 2, 1830, 26, 'rgba(220,230,225,.6)', { a: a * ss(t, T.end + .8, T.end + 1.3), w: 400 });
}

window.draw = function (t) {
  x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.fillStyle = '#000'; x.fillRect(0, 0, W, H);
  campaignBg(t, ss(t, T.toCampaign, T.toCampaign + .8));
  brandIntro(t); cobrand(t);
  /* 品牌 → 活動的轉場：一道玫瑰金到綠色的光掃過 */
  const kt = seg(t, T.toCampaign - .1, T.toCampaign + .7);
  if (kt > 0 && kt < 1) { x.save(); x.globalCompositeOperation = 'lighter'; const p = lerp(-400, H + 400, io(kt)), g = x.createLinearGradient(0, p - 300, 0, p + 300); g.addColorStop(0, 'rgba(232,185,160,0)'); g.addColorStop(.45, 'rgba(232,185,160,.35)'); g.addColorStop(.55, 'rgba(61,240,160,.35)'); g.addColorStop(1, 'rgba(61,240,160,0)'); x.fillStyle = g; x.fillRect(0, 0, W, H); x.restore(); }
  const [sx, sy] = shakeAt(t); x.save(); x.translate(sx, sy);
  titleScene(t); packScene(t); rebateScene(t); cardsScene(t); endScene(t); topBar(t);
  x.restore();
  flash(t);
  const v = x.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .75); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.65)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  const fin = ss(t, 0, .3); if (fin < 1) { x.fillStyle = `rgba(0,0,0,${1 - fin})`; x.fillRect(0, 0, W, H); }
};
window.DUR = DUR;
})();
