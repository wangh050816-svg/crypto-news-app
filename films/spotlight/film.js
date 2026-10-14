/* 《聚光燈效應》 · B 寓言 · 樣片（約 67 秒）。
 * 事實：T. Gilovich, V. H. Medvec, K. Savitsky, "The Spotlight Effect in Social Judgment", J. Personality and Social Psychology 78(2), 2000。
 *   康乃爾大學的學生穿上事先測過、公認丟臉的巴瑞·曼尼洛（Barry Manilow）T 恤，走進一間正在填問卷的教室，待一下再出來。
 *   穿的人估計約一半的人注意到這件 T 恤；實際上說得出來的約 23%。
 * 示意：教室、人物、T 恤上的圖是畫的；座位圖用 12 人示意（6 人 ≈ 50%，3 人 ≈ 23%）；第 37 秒抬頭看的那三個人是示意。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, fade } = VK;
const K = VKit, S = window.SP, C = S.C;

const T = { title: 20.0, back: 28.0, end: 67.5 };
const SUBS = [
  { a: .5,   b: 4.0,  zh: '你穿了一件很丟臉的 T 恤' },
  { a: 4.4,  b: 8.0,  zh: '走進一間教室' },
  { a: 8.4,  b: 12.1, zh: '一道{聚光燈}，打在你身上' },
  { a: 12.5, b: 16.2, zh: '你覺得，全場都在看你' },
  { a: 16.6, b: 19.3, zh: '真的嗎？' },
  { a: 28.4, b: 32.1, zh: '2000 年，康乃爾大學真的做了實驗' },
  { a: 32.5, b: 36.2, zh: '學生穿上一件公認很丟臉的 T 恤' },
  { a: 36.6, b: 40.2, zh: '走進教室待一會兒，再出來' },
  { a: 40.6, b: 44.2, zh: '問他：你猜幾個人注意到？' },
  { a: 44.6, b: 48.2, zh: '他猜：{大約一半}' },
  { a: 48.6, b: 52.6, zh: '實際上：{!不到四分之一}' },
  { a: 53.0, b: 56.4, zh: '其他人在幹嘛？' },
  { a: 56.8, b: 60.6, zh: '他們在擔心自己' },
  { a: 61.2, b: 65.8, zh: '每個人，都站在自己的聚光燈下', tone: 'gold' },
];

/* ---------- 鏡頭 ---------- */
const CAM = [[0, 250, 560, 1.9], [4.2, 250, 560, 1.9], [5.2, 960, 540, 1], [12.4, 960, 540, 1.03], [16.2, 960, 540, 1.03], [28, 960, 540, 1], [32.3, 960, 540, 1], [32.9, 250, 560, 1.9], [36.2, 250, 560, 1.9], [37.0, 960, 540, 1],
             [60.8, 960, 540, 1], [63.5, 980, 520, .86], [67.5, 980, 520, .84]];
function camAt(t) { let i = 0; while (i < CAM.length - 2 && t >= CAM[i + 1][0]) i++; const p = CAM[i], q = CAM[i + 1], k = E.io3(seg(t, p[0], q[0])); return { x: lerp(p[1], q[1], k), y: lerp(p[2], q[2], k), s: Math.exp(lerp(Math.log(p[3]), Math.log(q[3]), k)) }; }
function shoot(fr, t, fn) { const c = camAt(t); fr.g({ at: [W / 2, H / 2], s: c.s }, () => fr.g({ at: [-c.x, -c.y] }, fn)); }

/* ---------- 穿 T 恤的人：在哪、走不走、看不看人 ---------- */
const FX = 520, FY = 930;
function wearerState(t) {
  /* 開場：站在門口 → 走到教室前面；實驗：門口 → 走進來 → 走出去；結尾：站回前面 */
  let x = null, walking = false, a = 1;
  if (t < 19.8) { x = lerp(250, FX, E.io3(seg(t, 4.6, 7.4))); walking = t > 4.6 && t < 7.4; }
  else if (t > 32.0 && t < 40.6) { const kin = E.io3(seg(t, 36.8, 38.0)), kout = E.io3(seg(t, 39.0, 40.2)); x = lerp(lerp(250, FX, kin), 250, kout); walking = (t > 36.8 && t < 38.0) || (t > 39.0 && t < 40.2); a = 1 - ss(t, 40.0, 40.5); }
  else if (t > 52.8) { x = FX; a = ss(t, 52.8, 53.4); }
  return { x, walking, a, walk: t * 1.6, nervous: ss(t, 12.6, 13.4) * (1 - ss(t, 17.6, 18.4)) };
}
/* 學生看不看左邊：開場想像中全看（一個接一個轉頭）；實驗裡只有三個人瞄一眼 */
const GLANCE = [2, 5, 9];
function lookOf(t, i) {
  const order = [6, 0, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5].indexOf(i);
  const imag = ss(t, 12.6 + order * .12, 12.9 + order * .12) * (1 - ss(t, 17.4, 18.0));
  const real = GLANCE.includes(i) ? ss(t, 37.4 + GLANCE.indexOf(i) * .25, 37.7 + GLANCE.indexOf(i) * .25) * (1 - ss(t, 38.8, 39.2)) : 0;
  return -Math.max(imag, real);
}
const imagining = t => fade(t, 12.5, 18.0, .4, .5);

function classroom(fr, t) {
  const w = wearerState(t);
  const door = Math.max(1 - ss(t, 7.0, 7.8), ss(t, 32.0, 32.4) * (1 - ss(t, 40.4, 41.0)));
  shoot(fr, t, () => {
    S.room(fr, t, { door: t < 19.8 ? door : t > 32 && t < 41 ? door : 0 });
    S.SEATS.forEach(st => {
      S.student(fr, st.x, st.y, st.s, st.i, { look: lookOf(t, st.i) });
      /* 每個人自己的擔心 */
      const kb = ss(t, 57.0 + st.i * .18, 57.4 + st.i * .18) * (t < T.end ? 1 : 0);
      S.bubble(fr, st.x + 70 * st.s, st.y - 230 * st.s, st.s * .85, st.i % 4, kb);
    });
    /* 視線：想像裡每個人都盯著你；實驗裡只有三個人瞄了一眼 */
    if (w.x != null) S.SEATS.forEach(st => { const lk = -lookOf(t, st.i); if (lk < .05) return; const hx = st.x - 10 * st.s, hy = st.y - 128 * st.s;
      fr.line(hx, hy, lerp(hx, w.x, lk), lerp(hy, FY - 420, lk), { w: 4, color: C.gold, a: .85 * lk, dash: [16, 10] });
      if (t > 30) fr.text('！', hx + 40 * st.s, hy - 70 * st.s, { font: 'sansh', size: 44 * st.s, color: C.gold, a: lk, shadow: .4 }); });
    const endDark = ss(t, 61.0, 62.0); if (endDark > 0) fr.rect(-400, -400, W + 800, H + 800, { fill: '#0A080E', a: .5 * endDark });
    /* 結尾：每個人頭上都有一盞燈，一盞一盞亮起來 */
    S.SEATS.forEach((st, j) => { const k = ss(t, 61.4 + j * .16, 61.7 + j * .16); S.spotlight(fr, st.x, st.y + 10 * st.s, 100 * st.s, k * .9, { top: -120, lamp: false }); });
    /* 你自己的那盞 */
    const kMine = Math.max(ss(t, 8.6, 9.0) * (1 - ss(t, 19.4, 19.9)), ss(t, 53.2, 53.8));
    if (w.x != null) S.spotlight(fr, w.x, FY, 210, kMine, { top: -120 });
    if (w.x != null) S.wearer(fr, w.x, FY, 1.0, { walking: w.walking, walk: w.walk, a: w.a, nervous: w.nervous, look: w.walking ? 0 : .5 });
  });
  /* 聚光燈亮的時候，其他地方暗下去（結尾每人一盞，整體只暗一點） */
  const dark = Math.max(.5 * ss(t, 8.6, 9.2) * (1 - ss(t, 19.4, 19.9)), .42 * ss(t, 53.2, 53.8) * (1 - ss(t, 61.0, 62.0)));
  if (dark > 0) { const c = camAt(t), sx = W / 2 + (FX - c.x) * c.s, sy = H / 2 + (650 - c.y) * c.s; const x = fr.x, g = x.createRadialGradient(sx, sy, 120 * c.s, sx, sy, 520 * c.s); g.addColorStop(0, 'rgba(10,8,14,0)'); g.addColorStop(1, `rgba(10,8,14,${dark})`); fr.rect(0, 0, W, H, { fill: g }); }
}
function pill(fr, str, a, y = 54) { if (a <= 0) return; const w = fr.measure(str, { font: 'sansm', size: 28 }) + 52; fr.rect(W / 2 - w / 2, y - 27, w, 54, { r: 27, fill: '#14100C', a: .78 * a }); fr.text(str, W / 2, y, { font: 'sansm', size: 28, color: '#E9DFC8', a }); }

/* ---------- 座位圖：他猜幾個 vs 實際幾個 ---------- */
function grids(fr, t) {
  const a = fade(t, 40.7, 53.0, .4, .5); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#17121E', a: .55 * a });
  const split = E.io3(seg(t, 48.4, 49.2));
  const nG = Math.floor(6.99 * ss(t, 44.8, 46.2)), nR = Math.floor(3.99 * ss(t, 49.6, 50.6));
  S.seatGrid(fr, lerp(W / 2, 620, split), 430, nG, { a, title: '他猜：幾個人注意到？', value: nG >= 6 ? '約 50%' : '？', valueColor: C.gold });
  S.seatGrid(fr, 1300, 430, nR, { a: a * ss(t, 49.0, 49.5), title: '實際上', value: nR >= 3 ? '約 23%' : '', valueColor: C.ink });
}

/* ---------- 片名 ---------- */
function title(fr, t) {
  const lt = t - T.title, a = ss(lt, -.5, 0) * (1 - ss(t, T.back - .7, T.back)); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#0B0806', a });
  K.titleGilt(fr, lt, { la: 'THE SPOTLIGHT EFFECT', zh: '聚光燈效應', tag: '為什麼你總覺得，大家都在看你', a, cy: 430, size: 178, tagDy: 330,
    motif: (fr, lt, aa) => { const k = ss(lt, 1.2, 2.2) * aa; if (k <= 0) return; fr.g({ a: k }, () => { fr.line(W / 2 - 18, 520, W / 2 - 110, 690, { w: 2, color: '#C9A861' }); fr.line(W / 2 + 18, 520, W / 2 + 110, 690, { w: 2, color: '#C9A861' }); fr.ellipse(W / 2, 692, 110, 16, { color: '#C9A861', w: 2 }); fr.rect(W / 2 - 22, 500, 44, 22, { r: 4, fill: '#C9A861' }); }); } });
}

VK.film({
  dur: T.end, theme: 'flat', meta: { title: '聚光燈效應', root: 0 },
  draw(fr, t) {
    fr.look.bgo = { color: '#17121E' };
    const ca = Math.min(ss(t, 0, .6), 1 - ss(t, 19.4, 19.9)) + ss(t, T.back - .4, T.back + .3);
    if (ca > 0) fr.g({ a: clamp(Math.min(ca, 1 - ss(t, T.end - 1.4, T.end - .2))) }, () => {
      classroom(fr, t);
      const x = fr.x, g = x.createRadialGradient(W / 2, 520, H * .55, W / 2, 520, W * .72); g.addColorStop(0, 'rgba(20,10,10,0)'); g.addColorStop(1, 'rgba(20,10,10,.4)'); fr.rect(0, 0, W, H, { fill: g });
      pill(fr, '你的想像', imagining(t));
      pill(fr, 'Gilovich, Medvec & Savitsky, 2000 · 康乃爾大學', fade(t, 28.6, 32.2, .4, .4));
      pill(fr, '實驗用的那件：巴瑞·曼尼洛（Barry Manilow）T 恤', fade(t, 33.0, 36.2, .4, .4));
      pill(fr, '12 人示意 · 約 23% 的人說得出那件 T 恤', fade(t, 50.6, 52.8, .4, .4), 720);
    });
    grids(fr, t);
    title(fr, t);
    const x = fr.x, b = x.createLinearGradient(0, 820, 0, H); b.addColorStop(0, 'rgba(18,12,20,0)'); b.addColorStop(.5, 'rgba(18,12,20,.7)'); b.addColorStop(1, 'rgba(18,12,20,.88)'); fr.rect(0, 820, W, 260, { fill: b });
    K.flash(fr, t, T.title, { rise: .3, fall: .4 });
    /* 聲音 */
    fr.sfx(7.6, 'soft', { gain: .4 }); fr.sfx(8.6, 'thud', { gain: .8 });
    for (let i = 0; i < 12; i++) fr.sfx(12.6 + i * .12, 'tick', { pitch: 3 + i % 5, gain: .3 });
    fr.sfx(16.6, 'rise', { dur: 2.2, gain: .35 });
    fr.sfx(T.title, 'bloom', { root: 0, gain: .8 });
    GLANCE.forEach((g, i) => fr.sfx(37.4 + i * .25, 'tick', { pitch: 5, gain: .3 }));
    fr.sfx(44.8, 'shimmer', { gain: .4 }); fr.sfx(49.6, 'tock', { pitch: -2, gain: .6 });
    for (let i = 0; i < 12; i++) fr.sfx(57.0 + i * .18, 'soft', { gain: .25 });
    for (let i = 0; i < 12; i++) fr.sfx(61.4 + i * .16, 'tick', { pitch: 4 + i % 6, gain: .35 });
    fr.sfx(63.6, 'chord', { root: 0, gain: .7 });
    K.subs(fr, t, SUBS, 'flat');
  },
});
})();
