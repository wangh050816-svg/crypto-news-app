/* OURBIT 萬聖節狂歡夜 · 直式 9:16 行銷短片（約 23 秒）。
 * 素材全部來自活動海報（poster.png → make_assets.py 切成 assets/*.png）。每一幀只由時間 t 決定：draw(t)。
 * 內容不加任何海報以外的承諾；結尾一行「活動詳情以官方公告為準｜加密資產交易具風險」。 */
(function () {
'use strict';
const W = 1080, H = 1920, DUR = 23.0;
const cv = document.getElementById('c'), x = cv.getContext('2d');
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
const seg = (t, a, b) => clamp((t - a) / (b - a)), sm = k => k * k * (3 - 2 * k), ss = (t, a, b) => sm(seg(t, a, b));
const outBack = k => { const c = 1.70158; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
const outExpo = k => k >= 1 ? 1 : 1 - Math.pow(2, -10 * k), io = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const fade = (t, a, b, fi = .4, fo = .4) => Math.min(ss(t, a, a + fi), 1 - ss(t, b - fo, b));
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const GREEN = '#3DF0A0', GOLD = '#F4C860';

/* ---------- 素材 ---------- */
const NAMES = ['bg', 'logo', 'title', 'ribbon', 'sign', 'pack', 'big30', 'badge', 'card1', 'card2', 'card3', 'card4'];
const IMG = {};
let pending = NAMES.length + 1;
const done = () => { if (--pending === 0) window.READY = true; };
NAMES.forEach(n => { const im = new Image(); im.onload = done; im.src = 'assets/' + n + (n === 'bg' ? '.jpg' : '.png'); IMG[n] = im; });
document.fonts.load('900 60px Sans').then(() => document.fonts.load('500 30px Sans')).then(done);

/* 畫一張圖：中心 (cx,cy)，高度 h，o: { a, rot, glow, shine(0..1 掃光位置), sx } */
const off = document.createElement('canvas'), ox = off.getContext('2d');
function img(n, cx, cy, h, o = {}) {
  const im = IMG[n], a = o.a == null ? 1 : o.a; if (a <= 0 || !im.width) return;
  const w = h * im.width / im.height;
  x.save(); x.globalAlpha = a; x.translate(cx, cy); if (o.rot) x.rotate(o.rot); x.scale(o.sx || 1, 1);
  if (o.glow) { x.shadowColor = o.glowColor || GREEN; x.shadowBlur = o.glow; }
  if (o.shine != null && o.shine > 0 && o.shine < 1) {
    off.width = Math.ceil(w); off.height = Math.ceil(h); ox.clearRect(0, 0, off.width, off.height); ox.drawImage(im, 0, 0, w, h);
    ox.globalCompositeOperation = 'source-atop'; const p = lerp(-.4, 1.4, o.shine) * (w + h);
    const g = ox.createLinearGradient(p - 180, 0, p + 180, h * .6); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,240,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ox.fillStyle = g; ox.fillRect(0, 0, w, h); ox.globalCompositeOperation = 'source-over';
    x.drawImage(off, -w / 2, -h / 2);
  } else x.drawImage(im, -w / 2, -h / 2, w, h);
  x.restore();
}
function glowBlob(cx, cy, r, col, a) { if (a <= 0) return; const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); x.restore(); }
function text(s, cx, cy, size, col, o = {}) { x.save(); x.globalAlpha = o.a == null ? 1 : o.a; x.font = `${o.w || 800} ${size}px Sans`; x.textAlign = o.align || 'center'; x.textBaseline = 'middle'; if (o.track) x.letterSpacing = o.track + 'px'; if (o.glow) { x.shadowColor = o.glowColor || col; x.shadowBlur = o.glow; } x.fillStyle = col; x.fillText(s, cx + (o.track ? o.track / 2 : 0), cy); x.restore(); }
function pill(cx, cy, w, h, fill, a, stroke) { x.save(); x.globalAlpha = a; x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, h / 2); x.fillStyle = fill; x.fill(); if (stroke) { x.lineWidth = 3; x.strokeStyle = stroke; x.stroke(); } x.restore(); }

/* ---------- 背景：模糊的海報慢慢飄 + 壓暗 + 綠色光暈 + 往上飄的餘燼 + 霧 ---------- */
function background(t) {
  const s = 1.18 + .04 * Math.sin(t * .2), dx = Math.sin(t * .13) * 30, dy = Math.cos(t * .11) * 40;
  x.save(); x.translate(W / 2 + dx, H / 2 + dy); x.scale(s, s); x.drawImage(IMG.bg, -W / 2, -H / 2, W, H); x.restore();
  x.fillStyle = 'rgba(6,8,10,.78)'; x.fillRect(0, 0, W, H);
  glowBlob(W * .2, H * .28, 700, 'rgba(61,240,160,A)', .10 + .04 * Math.sin(t * 1.3));
  glowBlob(W * .85, H * .62, 650, 'rgba(255,140,40,A)', .10 + .04 * Math.sin(t * 1.7 + 1));
  /* 霧：幾團大而淡的灰綠色 */
  for (let i = 0; i < 5; i++) { const px = ((hash(i) * W + t * (20 + i * 8)) % (W + 800)) - 400, py = 300 + hash(i + 9) * 1400; glowBlob(px, py, 520, 'rgba(160,200,190,A)', .05); }
  /* 餘燼 */
  x.save(); x.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 90; i++) {
    const sp = 40 + hash(i * 3) * 90, life = H + 200, y0 = H + 100 - ((t * sp + hash(i) * life) % life), x0 = hash(i * 7) * W + Math.sin(t * (.5 + hash(i)) + i) * 30;
    const r = 1.5 + hash(i * 5) * 3.5, col = hash(i * 11) < .35 ? '61,240,160' : '255,170,70', a = (.35 + .5 * hash(i * 13)) * (.6 + .4 * Math.sin(t * 3 + i));
    const g = x.createRadialGradient(x0, y0, 0, x0, y0, r * 4); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); x.fillStyle = g; x.fillRect(x0 - r * 4, y0 - r * 4, r * 8, r * 8);
  }
  x.restore();
}
function vignette() { const g = x.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.7)'); x.fillStyle = g; x.fillRect(0, 0, W, H); }

/* 衝擊：畫面震動 + 一閃 */
const HITS = [3.25, 10.95];
function shakeAt(t) { let s = 0; for (const h of HITS) { const k = t - h; if (k >= 0 && k < .45) s = Math.max(s, (1 - k / .45) * 22); } return [Math.sin(t * 97) * s, Math.cos(t * 83) * s]; }
function flash(t) { for (const h of HITS) { const k = t - h; if (k >= 0 && k < .35) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(120,255,190,${.45 * (1 - k / .35)})`; x.fillRect(0, 0, W, H); x.restore(); } } }

/* ---------- 0. Logo：發光浮現，再縮到頂端常駐 ---------- */
function logo(t) {
  const kin = ss(t, .3, 1.4), up = io(seg(t, 2.3, 3.0)), endBig = io(seg(t, 19.3, 20.1)), out = 1 - ss(t, 22.4, 23);
  let cy = lerp(H * .45, 150, up), h = lerp(lerp(70, 150, kin), 64, up);
  cy = lerp(cy, 560, endBig); h = lerp(h, 120, endBig);
  if (t < 2.6) glowBlob(W / 2, cy, 520, 'rgba(61,240,160,A)', .35 * kin * (1 - up));
  img('logo', W / 2, cy, h, { a: kin * out, glow: 30 * (1 - up) + 10, shine: seg(t, 1.0, 2.0) });
  if (t < 2.8) text('HALLOWEEN  2026', W / 2, cy + 130, 30, '#CFEFE2', { a: ss(t, 1.0, 1.6) * (1 - ss(t, 2.2, 2.6)), w: 300, track: 18 });
}
/* ---------- 1. 標題重擊進場 → 標語 → 日期 ---------- */
function titleScene(t) {
  const a = ss(t, 2.8, 3.0) * (1 - ss(t, 6.0, 6.5)); if (a <= 0) return;
  const k = seg(t, 2.8, 3.25), s = k < 1 ? lerp(2.2, 1, outExpo(k)) : 1 + .015 * Math.sin((t - 3.25) * 2), lift = -io(seg(t, 6.0, 6.5)) * 200;
  const glitch = t > 3.25 && t < 3.55 ? (1 - (t - 3.25) / .3) * 14 : 0;
  glowBlob(W / 2, 640 + lift, 600, 'rgba(61,240,160,A)', .25 * a);
  if (glitch > 0) { img('title', W / 2 - glitch, 640 + lift, 440 * s, { a: .5 * a, glow: 0 }); img('title', W / 2 + glitch, 640 + lift, 440 * s, { a: .5 * a }); }
  img('title', W / 2, 640 + lift, 440 * s, { a, glow: 24, shine: seg(t, 4.6, 5.6) });
  const kr = outBack(seg(t, 4.0, 4.45));
  img('ribbon', lerp(-500, W / 2, kr), 1000 + lift, 150, { a: a * ss(t, 4.0, 4.2), rot: lerp(-.3, -.03, kr) });
  const kd = ss(t, 4.8, 5.3);
  pill(W / 2, 1160 + lift + (1 - kd) * 40, 640, 86, 'rgba(10,14,12,.75)', a * kd, 'rgba(61,240,160,.8)');
  text('活動時間  10/16 – 10/31（UTC+8）', W / 2, 1160 + lift + (1 - kd) * 40, 38, '#EFFFF7', { a: a * kd, w: 700 });
}
/* ---------- 2. 寶可夢卡包升起 + 金光掃過 + 牌子晃進來 ---------- */
function packScene(t) {
  const a = ss(t, 6.3, 6.6) * (1 - ss(t, 9.6, 10.1)); if (a <= 0) return;
  const k = outBack(seg(t, 6.3, 7.2)), out = io(seg(t, 9.6, 10.1));
  const cy = lerp(1500, 1050, k) - out * 120, rot = lerp(-.22, -.05, k) + Math.sin(t * 1.4) * .015, h = lerp(700, 980, k) * (1 + out * .15);
  glowBlob(W / 2, cy, 700, 'rgba(244,200,96,A)', .32 * a);
  /* 卡包四周的金色閃點 */
  x.save(); x.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 26; i++) { const an = hash(i) * 6.28 + t * .3, r = 380 + hash(i + 3) * 160, tw = Math.max(0, Math.sin(t * 4 + i * 2.1)); const px = W / 2 + Math.cos(an) * r, py = cy + Math.sin(an) * r * 1.2; const g = x.createRadialGradient(px, py, 0, px, py, 14); g.addColorStop(0, `rgba(255,230,160,${.9 * tw * a})`); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(px - 14, py - 14, 28, 28); }
  x.restore();
  img('pack', W / 2, cy, h, { a, rot, shine: Math.max(seg(t, 7.4, 8.3), seg(t, 8.8, 9.5) * (t > 8.8 ? 1 : 0)) || null, glow: 40, glowColor: 'rgba(244,200,96,.6)' });
  /* 牌子：從上面晃下來（阻尼擺） */
  const ks = seg(t, 7.6, 8.0), swing = t > 7.6 ? Math.sin((t - 7.6) * 7) * .35 * Math.exp(-(t - 7.6) * 2.2) : 0;
  if (ks > 0) { x.save(); x.translate(W * .72, 380 - (1 - outBack(ks)) * 400); x.rotate(swing + .06); x.strokeStyle = 'rgba(200,190,170,.7)'; x.lineWidth = 3; x.beginPath(); x.moveTo(-90, -160); x.lineTo(-90, -40); x.moveTo(90, -160); x.lineTo(90, -40); x.stroke(); img('sign', 0, 60, 230, { a: a * ss(t, 7.6, 7.75) }); x.restore(); }
}
/* ---------- 3. 數字跳到 30% → 「最高 30% 儲值返利」重擊 → 加碼徽章 ---------- */
function rebateScene(t) {
  const a = ss(t, 10.0, 10.2) * (1 - ss(t, 13.3, 13.8)); if (a <= 0) return;
  const kc = seg(t, 10.05, 10.85);
  if (t < 10.95) { const n = Math.round(30 * io(kc)); text(n + '%', W / 2, 860, 300, GREEN, { a: a * ss(t, 10.0, 10.2), w: 900, glow: 50 }); }
  else {
    const k = seg(t, 10.95, 11.25), s = k < 1 ? lerp(1.6, 1, outExpo(k)) : 1 + .012 * Math.sin((t - 11) * 2.5);
    glowBlob(W / 2, 860, 650, 'rgba(61,240,160,A)', .3 * a);
    img('big30', W / 2, 860, 520 * s, { a, rot: -.02, shine: seg(t, 11.6, 12.5), glow: 30 });
    const kb = outBack(seg(t, 11.7, 12.3));
    if (kb > 0) img('badge', W / 2, 1360, 380 * kb, { a: a * ss(t, 11.7, 11.9), rot: (1 - kb) * 2.5 + Math.sin(t * 1.5) * .04 });
  }
}
/* ---------- 4. 四張福利卡：一張張放大介紹，再飛到 2×2 ---------- */
const SLOTS = [[330, 760], [750, 760], [330, 1380], [750, 1380]], CARD_T = [13.7, 14.95, 16.2, 17.45];
function cardsScene(t) {
  const a = ss(t, 13.6, 13.8) * (1 - ss(t, 19.2, 19.7)); if (a <= 0) return;
  CARD_T.forEach((c0, i) => {
    if (t < c0) return;
    const kin = outBack(seg(t, c0, c0 + .35)), kfly = io(seg(t, c0 + .95, c0 + 1.3));
    const big = [lerp(W + 500, W / 2, kin), 1020], slot = SLOTS[i];
    const cx = lerp(big[0], slot[0], kfly), cy = lerp(big[1], slot[1], kfly), h = lerp(1080, 580, kfly), rot = lerp(lerp(.25, -.02, kin), 0, kfly);
    const hl = i === 2 && t > 18.9 ? .5 + .5 * Math.sin((t - 18.9) * 6) : 0;
    img('card' + (i + 1), cx, cy, h, { a, rot, glow: 20 + hl * 50, glowColor: hl ? GREEN : 'rgba(0,0,0,.6)', shine: seg(t, c0 + .3, c0 + .95) });
  });
}
/* ---------- 5. 結尾：Logo、標題、日期、立即註冊 ---------- */
function endScene(t) {
  const a = ss(t, 19.5, 20.0) * (1 - ss(t, 22.4, 23)); if (a <= 0) return;
  glowBlob(W / 2, 900, 700, 'rgba(61,240,160,A)', .22 * a);
  img('title', W / 2, 900, 440 * (.9 + .1 * outBack(seg(t, 19.6, 20.2))), { a: a * ss(t, 19.6, 20.0), glow: 20 });
  text('10/16 – 10/31（UTC+8）', W / 2, 1200, 44, '#EFFFF7', { a: a * ss(t, 20.0, 20.4), w: 700, track: 4 });
  const kb = outBack(seg(t, 20.3, 20.8)), pulse = 1 + .04 * Math.sin((t - 20.8) * 6) * (t > 20.8 ? 1 : 0);
  if (kb > 0) {
    x.save(); x.translate(W / 2, 1400); x.scale(kb * pulse, kb * pulse);
    x.shadowColor = GREEN; x.shadowBlur = 40; pill(0, 0, 620, 130, GREEN, a); x.shadowBlur = 0;
    text('立即註冊 領取福利', 0, 2, 56, '#062014', { a, w: 900 });
    x.restore();
  }
  text('註冊免費送 PKM 卡牌｜最高 30% 儲值返利', W / 2, 1560, 34, '#CFEFE2', { a: a * ss(t, 20.8, 21.2), w: 500 });
  text('活動詳情以 OURBIT 官方公告為準｜加密資產交易具風險', W / 2, 1830, 26, 'rgba(220,230,225,.6)', { a: a * ss(t, 20.0, 20.5), w: 400 });
}

window.draw = function (t) {
  x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
  x.fillStyle = '#000'; x.fillRect(0, 0, W, H);
  background(t);
  const [sx, sy] = shakeAt(t); x.save(); x.translate(sx, sy);
  titleScene(t); packScene(t); rebateScene(t); cardsScene(t); endScene(t); logo(t);
  x.restore();
  flash(t); vignette();
  const fin = ss(t, 0, .4) * (1 - ss(t, DUR - .5, DUR)); if (fin < 1) { x.fillStyle = `rgba(0,0,0,${1 - fin})`; x.fillRect(0, 0, W, H); }
};
window.DUR = DUR;
})();
