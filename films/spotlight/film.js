/* 《聚光燈效應》 · B 寓言 · 樣片（約 95 秒；v2：片名從聚光燈裡浮出來，結尾加五句收尾）。
 * 事實：T. Gilovich, V. H. Medvec, K. Savitsky, "The Spotlight Effect in Social Judgment", J. Personality and Social Psychology 78(2), 2000。
 *   康乃爾大學的學生穿上事先測過、公認丟臉的巴瑞·曼尼洛（Barry Manilow）T 恤，走進一間正在填問卷的教室，待一下再出來。
 *   穿的人估計約一半的人注意到這件 T 恤；實際上說得出來的約 23%。
 * 示意：教室、人物、T 恤上的圖是畫的；座位圖用 12 人示意（6 人 ≈ 50%，3 人 ≈ 23%）；第 37 秒抬頭看的那三個人是示意。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, fade } = VK;
const K = VKit, S = window.SP, C = S.C;

/* 時間分兩層：t 是成片時間；tt 是"故事時間"（教室裡發生的事）。片名那 11 秒故事停住，之後故事時間比成片晚 3 秒。 */
const SHIFT = 3.0, BRIDGE = 19.6, BACK = 31.0;
const storyT = t => t < BRIDGE ? t : t < BACK ? 19.3 : t - SHIFT;
const T = { title: 23.6, end: 95.0, endStory: 92.0 };
const sub = (a, b, zh, o = {}) => Object.assign({ a, b, zh }, o);
const SUBS = [
  sub(.5, 4.0, '你穿了一件很丟臉的 T 恤'),
  sub(4.4, 8.0, '走進一間教室'),
  sub(8.4, 12.1, '一道{聚光燈}，打在你身上'),
  sub(12.5, 16.2, '你覺得，全場都在看你'),
  sub(16.6, 19.3, '真的嗎？'),
  sub(19.7, 23.3, '這種錯覺，心理學家給了它一個名字'),
  /* 以下寫故事時間，下面統一加 SHIFT */
  ...[
    sub(28.4, 32.1, '2000 年，康乃爾大學真的做了實驗'),
    sub(32.5, 36.2, '學生穿上一件公認很丟臉的 T 恤'),
    sub(36.6, 40.2, '走進教室待一會兒，再出來'),
    sub(40.6, 44.2, '問他：你猜幾個人注意到？'),
    sub(44.6, 48.2, '他猜：{大約一半}'),
    sub(48.6, 52.6, '實際上：{!不到四分之一}'),
    sub(53.0, 56.4, '其他人在幹嘛？'),
    sub(56.8, 60.6, '他們在擔心自己'),
    sub(61.2, 65.8, '每個人，都站在自己的聚光燈下', { tone: 'gold' }),
    sub(66.2, 69.8, '你記得的尷尬，別人轉頭就忘了'),
    sub(70.2, 73.8, '因為每個人，都忙著照顧自己的那盞燈'),
    sub(74.2, 77.8, '所以，不必急著躲開那道光'),
    sub(78.2, 81.8, '穿你想穿的，說你想說的'),
    sub(82.2, 86.2, '聚光燈，其實只亮在你心裡', { tone: 'gold' }),
  ].map(x => Object.assign(x, { a: x.a + SHIFT, b: x.b + SHIFT })),
];

const FX = 520, FY = 930;
/* ---------- 鏡頭 ---------- */
const CAM = [[0, 250, 560, 1.9], [4.2, 250, 560, 1.9], [5.2, 960, 540, 1], [12.4, 960, 540, 1.03], [16.2, 960, 540, 1.03], [28, 960, 540, 1], [32.3, 960, 540, 1], [32.9, 250, 560, 1.9], [36.2, 250, 560, 1.9], [37.0, 960, 540, 1],
             [60.8, 960, 540, 1], [63.5, 980, 520, .86], [82.0, 980, 520, .86], [85.0, 960, 540, 1], [92, 960, 540, 1]];
function camAt(t) { let i = 0; while (i < CAM.length - 2 && t >= CAM[i + 1][0]) i++; const p = CAM[i], q = CAM[i + 1], k = E.io3(seg(t, p[0], q[0])); return { x: lerp(p[1], q[1], k), y: lerp(p[2], q[2], k), s: Math.exp(lerp(Math.log(p[3]), Math.log(q[3]), k)) }; }
/* 片名前：鏡頭慢慢推到那盞燈底下，燈在畫面正中 */
function camFor(t, tt) { const c = camAt(tt); if (t < BRIDGE || t >= BACK) return c; const k = E.io3(seg(t, BRIDGE, 23.2)); return { x: lerp(c.x, FX, k), y: lerp(c.y, 560, k), s: Math.exp(lerp(Math.log(c.s), Math.log(1.1), k)) }; }
function shoot(fr, c, fn) { fr.g({ at: [W / 2, H / 2], s: c.s }, () => fr.g({ at: [-c.x, -c.y] }, fn)); }

/* ---------- 穿 T 恤的人：在哪、走不走、看不看人 ---------- */
function wearerState(t) {
  /* 開場：站在門口 → 走到教室前面；實驗：門口 → 走進來 → 走出去；結尾：站回前面 */
  let x = null, walking = false, a = 1;
  if (t < 19.8) { x = lerp(250, FX, E.io3(seg(t, 4.6, 7.4))); walking = t > 4.6 && t < 7.4; }
  else if (t > 32.0 && t < 40.6) { const kin = E.io3(seg(t, 36.8, 38.0)), kout = E.io3(seg(t, 39.0, 40.2)); x = lerp(lerp(250, FX, kin), 250, kout); walking = (t > 36.8 && t < 38.0) || (t > 39.0 && t < 40.2); a = 1 - ss(t, 40.0, 40.5); }
  else if (t > 52.8) { x = FX; a = ss(t, 52.8, 53.4); }
  return { x, walking, a, walk: t * 1.6, nervous: ss(t, 12.6, 13.4) * (1 - ss(t, 17.6, 18.4)) + .6 * ss(t, 66.2, 67) * (1 - ss(t, 74.4, 75.4)) };
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

function classroom(fr, t, c) {
  const w = wearerState(t), calm = 1 - ss(t, 82.4, 84.4);
  const door = Math.max(1 - ss(t, 7.0, 7.8), ss(t, 32.0, 32.4) * (1 - ss(t, 40.4, 41.0)));
  shoot(fr, c, () => {
    S.room(fr, t, { door: t < 19.8 ? door : t > 32 && t < 41 ? door : 0 });
    S.SEATS.forEach(st => {
      S.student(fr, st.x, st.y, st.s, st.i, { look: lookOf(t, st.i) });
      /* 每個人自己的擔心 */
      const kb = ss(t, 57.0 + st.i * .18, 57.4 + st.i * .18) * (1 - ss(t, 66.8 + st.i * .12, 67.3 + st.i * .12));      // 66 秒起一個個散掉：別人轉頭就忘了
      S.bubble(fr, st.x + 70 * st.s, st.y - 230 * st.s, st.s * .85, st.i % 4, kb);
    });
    /* 視線：想像裡每個人都盯著你；實驗裡只有三個人瞄了一眼 */
    if (w.x != null) S.SEATS.forEach(st => { const lk = -lookOf(t, st.i); if (lk < .05) return; const hx = st.x - 10 * st.s, hy = st.y - 128 * st.s;
      fr.line(hx, hy, lerp(hx, w.x, lk), lerp(hy, FY - 420, lk), { w: 4, color: C.gold, a: .85 * lk, dash: [16, 10] });
      if (t > 30) fr.text('！', hx + 40 * st.s, hy - 70 * st.s, { font: 'sansh', size: 44 * st.s, color: C.gold, a: lk, shadow: .4 }); });
    const endDark = ss(t, 61.0, 62.0) * calm; if (endDark > 0) fr.rect(-400, -400, W + 800, H + 800, { fill: '#0A080E', a: .5 * endDark });
    /* 結尾：每個人頭上都有一盞燈，一盞一盞亮起來 */
    S.SEATS.forEach((st, j) => { const k = ss(t, 61.4 + j * .16, 61.7 + j * .16) * calm * (t > 70.2 && t < 74 ? .85 + .15 * Math.sin(t * 5 + j * 1.7) : 1); S.spotlight(fr, st.x, st.y + 10 * st.s, 100 * st.s, k * .9, { top: -120, lamp: false }); });
    /* 你自己的那盞 */
    const kMine = Math.max(ss(t, 8.6, 9.0) * (1 - ss(t, 19.4, 19.9)), ss(t, 53.2, 53.8)) * calm;
    if (w.x != null) S.spotlight(fr, w.x, FY, 210 + 50 * ss(t, 74.4, 75.6), kMine, { top: -120 });
    /* 他自己的那朵泡泡：還在想那件 T 恤（66–78 秒） */
    if (w.x != null) S.bubble(fr, w.x + 160, FY - 690, 1.5, 4, fade(t, 66.6, 78.6, .5, .6));
    if (t > 78.2 && t < 82) fr.glow(w.x || FX, FY - 340, 220, C.gold, .35 * Math.sin(seg(t, 78.2, 82) * Math.PI));
    if (w.x != null) S.wearer(fr, w.x, FY, 1.0, { walking: w.walking, walk: w.walk, a: w.a, nervous: w.nervous, look: w.walking ? 0 : .5 });
  });
  /* 聚光燈亮的時候，其他地方暗下去（結尾每人一盞，整體只暗一點） */
  const dark = Math.max(.5 * ss(t, 8.6, 9.2) * (1 - ss(t, 19.4, 19.9)), .42 * ss(t, 53.2, 53.8) * (1 - ss(t, 61.0, 62.0)));
  if (dark > 0) { const sx = W / 2 + (FX - c.x) * c.s, sy = H / 2 + (650 - c.y) * c.s; const x = fr.x, g = x.createRadialGradient(sx, sy, 120 * c.s, sx, sy, 520 * c.s); g.addColorStop(0, 'rgba(10,8,14,0)'); g.addColorStop(1, `rgba(10,8,14,${dark})`); fr.rect(0, 0, W, H, { fill: g }); }
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

/* ---------- 片名：教室暗到只剩那盞燈，人淡出，片名在光裡浮出來 ---------- */
function title(fr, t) {
  const lt = t - T.title, a = ss(t, 23.0, 24.4) * (1 - ss(t, BACK - .9, BACK)); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#0B0806', a });
  fr.g({ a }, () => S.spotlight(fr, W / 2, 1000, 300, 1, { top: -40 }));
  K.titleGilt(fr, lt, { la: 'THE SPOTLIGHT EFFECT', zh: '聚光燈效應', tag: '為什麼你總覺得，大家都在看你', a, cy: 470, size: 168, tagDy: 160, rays: 0, specks: .25 });
}
/* 片尾：片名 + 文獻 */
function endCard(fr, t) {
  const a = ss(t, T.endStory - 5.4 + SHIFT, T.endStory - 4.6 + SHIFT) * (1 - ss(t, T.end - 1.2, T.end - .1)); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#0B0806', a });
  fr.text('聚光燈效應', W / 2, 430, { font: 'serifh', size: 96, track: 14, grad: [[0, '#F7E8C2'], [.5, '#E2C07A'], [1, '#B98A3E']], a });
  fr.text('THE SPOTLIGHT EFFECT', W / 2, 520, { font: 'latinl', size: 26, track: 14, color: '#94908B', a });
  fr.text('Gilovich, T., Medvec, V. H., & Savitsky, K. (2000).', W / 2, 640, { font: 'latin', size: 30, color: '#C4BBB1', a });
  fr.text('The spotlight effect in social judgment. Journal of Personality and Social Psychology, 78(2).', W / 2, 684, { font: 'latini', size: 26, color: '#94908B', a });
  fr.text('示意：教室、人物與座位圖為繪製；12 人座位圖由約 50% / 約 23% 換算', W / 2, 760, { font: 'sans', size: 22, color: '#77756F', a });
}

VK.film({
  dur: T.end, theme: 'flat', meta: { title: '聚光燈效應', root: 0 },
  draw(fr, t) {
    fr.look.bgo = { color: '#17121E' };
    const tt = storyT(t), cam = camFor(t, tt);
    const ca = Math.min(ss(t, 0, .6), 1 - ss(t, 24.0, 24.6)) + ss(t, BACK - .9, BACK);
    if (ca > 0) fr.g({ a: clamp(ca) }, () => {
      classroom(fr, tt, cam);
      /* 片名前：除了那盞燈，全暗下去 */
      const kd = ss(t, BRIDGE, 23.2) * (t < BACK ? 1 : 0);
      if (kd > 0) { const x = fr.x, g = x.createRadialGradient(W / 2, 640, 160, W / 2, 640, 620); g.addColorStop(0, 'rgba(11,8,6,0)'); g.addColorStop(1, `rgba(11,8,6,${.95 * kd})`); fr.rect(0, 0, W, H, { fill: g }); }
      const x = fr.x, g = x.createRadialGradient(W / 2, 520, H * .55, W / 2, 520, W * .72); g.addColorStop(0, 'rgba(20,10,10,0)'); g.addColorStop(1, 'rgba(20,10,10,.4)'); fr.rect(0, 0, W, H, { fill: g });
      pill(fr, '你的想像', imagining(tt));
      pill(fr, 'Gilovich, Medvec & Savitsky, 2000 · 康乃爾大學', fade(tt, 28.6, 32.2, .4, .4));
      pill(fr, '實驗用的那件：巴瑞·曼尼洛（Barry Manilow）T 恤', fade(tt, 33.0, 36.2, .4, .4));
      pill(fr, '12 人示意 · 約 23% 的人說得出那件 T 恤', fade(tt, 50.6, 52.8, .4, .4), 720);
    });
    if (t >= BACK) grids(fr, tt);
    title(fr, t);
    endCard(fr, t);
    const x = fr.x, b = x.createLinearGradient(0, 820, 0, H); b.addColorStop(0, 'rgba(18,12,20,0)'); b.addColorStop(.5, 'rgba(18,12,20,.7)'); b.addColorStop(1, 'rgba(18,12,20,.88)'); fr.rect(0, 820, W, 260, { fill: b });
    /* 聲音 */
    fr.sfx(7.6, 'soft', { gain: .4 }); fr.sfx(8.6, 'thud', { gain: .8 });
    for (let i = 0; i < 12; i++) fr.sfx(12.6 + i * .12, 'tick', { pitch: 3 + i % 5, gain: .3 });
    fr.sfx(16.6, 'rise', { dur: 2.2, gain: .35 });
    fr.sfx(24.0, 'bloom', { root: 0, gain: .7 });
    GLANCE.forEach((g, i) => fr.sfx(SHIFT + 37.4 + i * .25, 'tick', { pitch: 5, gain: .3 }));
    fr.sfx(SHIFT + 44.8, 'shimmer', { gain: .4 }); fr.sfx(SHIFT + 49.6, 'tock', { pitch: -2, gain: .6 });
    for (let i = 0; i < 12; i++) fr.sfx(SHIFT + 57.0 + i * .18, 'soft', { gain: .25 });
    for (let i = 0; i < 12; i++) fr.sfx(SHIFT + 61.4 + i * .16, 'tick', { pitch: 4 + i % 6, gain: .35 });
    fr.sfx(SHIFT + 63.6, 'chord', { root: 0, gain: .7 });
    for (let i = 0; i < 12; i++) fr.sfx(SHIFT + 66.8 + i * .12, 'tick', { pitch: 9 - i % 4, gain: .18 });
    fr.sfx(SHIFT + 82.4, 'bloom', { root: 5, gain: .6 });
    K.subs(fr, t, SUBS, 'flat');
  },
});
})();
