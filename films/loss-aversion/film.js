/* 《損失的重量》 · B 寓言 · 前 60 秒（v2：只講一個實驗，每一步都演出來）。分鏡表見同目錄 storyboard.md。
 * 事實：M. K. Chen, V. Lakshminarayanan, L. R. Santos, "How Basic Are Behavioral Biases? Evidence from Capuchin
 *   Monkey Trading Behavior", J. Political Economy 114(3), 2006。捲尾猴用代幣跟實驗員換蘋果片。
 *   其中一組：一個人拿出 1 片、給 1 片；另一個人拿出 2 片、收走 1 片再給。兩邊到手都是 1 片，猴子仍然更常選前者。
 * 示意：猴舍、人、盤子的樣子是畫的；第 7 鏡的交易次數（6 : 1）是示意，論文沒有這個逐次數字。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, fade } = VK;
const K = VKit, A = window.LA, C = A.C, HX = A.HATCH;

const T = { title: 36.4, back: 44.0, card: 44.2, coin: 52.4, big: 60.4, end: 76.5 };
const SUBS = [
  { a: .5,   b: 4.0,  zh: '這隻猴子，會用代幣買蘋果' },
  { a: 4.4,  b: 8.0,  zh: '一枚代幣，換{一塊蘋果}' },
  { a: 8.4,  b: 11.7, zh: '現在，有兩個人在賣' },
  { a: 12.0, b: 15.7, zh: '左邊的人：拿出一塊，給你一塊' },
  { a: 16.0, b: 19.7, zh: '右邊的人：先拿出兩塊——' },
  { a: 20.0, b: 23.7, zh: '{!收走一塊}，再給你剩下那塊' },
  { a: 24.0, b: 27.7, zh: '兩邊拿到的，都是{一塊}' },
  { a: 28.0, b: 31.7, zh: '可猴子，總是跑去左邊' },
  { a: 32.0, b: 35.8, zh: '它不是嫌少，是討厭{!被拿走}' },
  { a: 44.6, b: 48.6, zh: '失去一塊，比得到一塊更痛', tone: 'gold' },
  { a: 49.0, b: 52.2, zh: '心裡的秤，總往{!失去}那邊沉' },
  { a: 52.8, b: 56.4, zh: '換你來：拋一次硬幣' },
  { a: 56.8, b: 60.3, zh: '反面，你{!輸 100}' },
  { a: 60.7, b: 64.4, zh: '正面要贏多少，你才肯賭？' },
  { a: 67.0, b: 71.0, zh: '多數人要說到 {200} 左右' },
  { a: 71.4, b: 75.6, zh: '輸掉的 100，要贏 200 才補得平', tone: 'gold' },
];

/* ---------- 鏡頭：焦點 (x, y) 和縮放 s；縮放在對數空間裡走 ---------- */
const CAM = [[0, 760, 500, 1.42], [8.1, 760, 500, 1.42], [8.9, 960, 540, 1], [11.7, 960, 540, 1.02], [12.4, 700, 500, 1.42], [15.6, 700, 500, 1.45], [16.3, 1220, 500, 1.45], [23.6, 1220, 500, 1.5],
             [24.3, 960, 540, 1], [31.8, 960, 540, 1.03], [35.8, 860, 540, 1.1], [44, 860, 540, 1.1]];
function camAt(t) {
  let i = 0; while (i < CAM.length - 2 && t >= CAM[i + 1][0]) i++;
  const p = CAM[i], q = CAM[i + 1], k = E.io3(seg(t, p[0], q[0]));
  return { x: lerp(p[1], q[1], k), y: lerp(p[2], q[2], k), s: Math.exp(lerp(Math.log(p[3]), Math.log(q[3]), k)) };
}
function shoot(fr, t, fn) { const c = camAt(t); fr.g({ at: [W / 2, H / 2], s: c.s }, () => fr.g({ at: [-c.x, -c.y] }, fn)); }

/* ---------- 猴子：位置、朝向、手、嘴裡有沒有東西 ---------- */
const MS = 1.6, MY = 830, TRIPS = [28.3, 29.5, 30.7];
function monkeyState(t) {
  let x = K.track([[0, 1000], [.6, 1000], [1.3, 800], [8.1, 800], [8.8, 960], [28, 960]], t), hop = 0;
  if (t > .6 && t < 1.3) hop = Math.sin(seg(t, .6, 1.3) * Math.PI) * 70;
  if (t > 8.1 && t < 8.8) hop = Math.sin(seg(t, 8.1, 8.8) * Math.PI) * 70;
  if (t > 28) {
    x = 960;
    TRIPS.forEach((t0, i) => { const last = i === TRIPS.length - 1, k = seg(t, t0, t0 + .55), b = seg(t, t0 + .75, t0 + 1.1);
      if (t >= t0) x = lerp(960, 720, E.io3(k)); if (!last && t >= t0 + .75) x = lerp(720, 960, E.io3(b));
      if (k > 0 && k < 1) hop = Math.sin(k * Math.PI) * 80; if (!last && b > 0 && b < 1) hop = Math.sin(b * Math.PI) * 60; });
  }
  const face = clamp(K.track([[0, -1], [9.4, -1], [9.8, 1], [11.0, 1], [11.4, -1], [15.8, -1], [16.2, 1], [27.8, 1], [28.2, -1], [44, -1]], t), -1, 1);
  const food = (t > 3.8 && t < 8.1) || (t > 14.5 && t < 16.0) || (t > 22.5 && t < 28.2) || (t > 31.4);
  const reachK = [[0, .25], [.9, .25], [1.4, 1], [1.9, 1], [2.3, .25], [3.1, .25], [3.5, .85], [3.9, .55], [13.6, .55], [13.9, .85], [14.5, .55], [21.6, .55], [21.9, .85], [22.5, .55]];
  const reach = clamp(K.track(reachK, t));
  return { x, hop, face, food, token: !food && reach < .6 && (t < 1.9 || t > 8.6), reach, chew: food ? t : 0, blink: ss(Math.sin(t * 1.7) * 10, 9.6, 10) };
}
/* 猴子手的位置（世界坐標），蘋果片飛過去要對準它 */
function monkeyHand(m) { const s = (Math.abs(m.face) < .3 ? .3 * Math.sign(m.face || 1) : m.face) * MS, hx = lerp(70, 168, E.io3(m.reach)), hy = lerp(-62, -150, E.io3(m.reach)); return [m.x + hx * s, MY - m.hop + hy * MS]; }

/* ---------- 兩個人的手 ---------- */
function handPos(t, side) {
  const hx = side < 0 ? HX.L : HX.R, rest = [hx + side * 110, HX.shelf - 44], sh = HX.shelf;
  const keys = side < 0
    ? [[0, ...rest], [1.4, ...rest], [1.8, hx + 120, sh - 110], [2.2, ...rest], [2.4, hx, sh - 150], [3.0, hx, sh - 60], [3.4, ...rest], [11.9, ...rest], [12.3, hx, sh - 150], [12.9, hx, sh - 60], [13.4, ...rest]]
    : [[0, ...rest], [15.9, ...rest], [16.3, hx, sh - 150], [16.9, hx, sh - 60], [17.4, ...rest], [20.0, ...rest], [20.3, hx + 48, sh - 70], [21.2, hx + 150, sh - 120], [21.7, ...rest]];
  let i = 0; while (i < keys.length - 2 && t >= keys[i + 1][0]) i++;
  const p = keys[i], q = keys[i + 1], k = E.io3(seg(t, p[0], q[0]));
  return [lerp(p[1], q[1], k), lerp(p[2], q[2], k)];
}
/* 一片蘋果的一生：從手裡放到盤上（place），再飛到猴子手裡（give），或被收走（take） */
function sliceAt(t, m, o) {
  const y = HX.shelf - 18, kp = E.out3(seg(t, o.place, o.place + .6)); if (kp <= 0) return null;
  let x = o.x, yy = lerp(y - 120, y, kp), a = ss(kp, 0, .2), glow = null;
  if (o.give != null) { const kg = E.io3(seg(t, o.give, o.give + .6)); if (kg >= 1) return null; const [mx, my] = monkeyHand(m); x = lerp(x, mx, kg); yy = lerp(yy, my, kg) - Math.sin(kg * Math.PI) * 80; }
  if (o.take != null) { const kt = E.io3(seg(t, o.take, o.take + .9)); x += kt * 120; yy -= kt * 60; a *= 1 - ss(kt, .55, 1); glow = t > o.take - .1 ? 'red' : null; if (a <= 0) return null; }
  return { x, y: yy, a, glow, rot: o.rot || 0 };
}
const SL = [
  { side: -1, x: HX.L, place: 2.4, give: 3.2 },
  { side: -1, x: HX.L, place: 12.3, give: 13.8 },
  { side: 1, x: HX.R - 48, place: 16.3, give: 21.8 },
  { side: 1, x: HX.R + 48, place: 16.3, take: 20.3, rot: .15 },
];

/* 代幣從猴子手裡交出去（第 1 鏡） */
function tokenHandoff(fr, t, m) {
  const k = E.io3(seg(t, 1.4, 1.85)); if (k <= 0 || t > 2.3) return;
  const [mx, my] = monkeyHand(m), [hx, hy] = handPos(t, -1);
  A.token(fr, lerp(mx, hx + 20, k), lerp(my - 14, hy - 10, k) - Math.sin(k * Math.PI) * 40, 26, { a: 1 - ss(t, 2.0, 2.3) });
}

/* 一個深色小牌子 */
function pill(fr, x, y, w, str, a, col = C.ink, size = 36) { if (a <= 0) return; fr.rect(x - w / 2, y - 36, w, 72, { r: 16, fill: '#14100C', a: .82 * a }); fr.text(str, x, y, { font: 'sansh', size, color: col, a }); }

function enclosure(fr, t) {
  const m = monkeyState(t);
  shoot(fr, t, () => {
    A.room(fr, t);
    A.priceTag(fr, HX.L, seg(t, 4.5, 5.5) * (1 - ss(t, 14.0, 14.5)));
    A.priceTag(fr, HX.R, seg(t, 9.6, 10.6) * (1 - ss(t, 22.0, 22.5)));
    for (const side of [-1, 1]) {
      const hx = side < 0 ? HX.L : HX.R, appear = side < 0 ? 1 : ss(t, 8.9, 9.6);
      fr.g({ a: appear }, () => {
        A.plate(fr, hx, HX.shelf - 14, 1.15);
        SL.filter(s => s.side === side).forEach(s => { const it = sliceAt(t, m, s); if (it && (s.give == null || t < s.give)) A.slice(fr, it.x, it.y, 1.3, it); });
        const [px, py] = handPos(t, side); A.arm(fr, hx + side * 175, HX.shelf - 95, px, py, side < 0 ? C.sleeveL : C.sleeveR);
      });
    }
    /* 第 2 鏡：一枚代幣 → 一塊蘋果 */
    const ke = fade(t, 4.6, 8.1, .4, .4);
    if (ke > 0) fr.g({ a: ke }, () => { fr.rect(560, 230, 400, 96, { r: 20, fill: '#14100C', a: .82 }); A.token(fr, 630, 278, 30); fr.text('→', 760, 276, { font: 'sansh', size: 54, color: C.ink }); A.slice(fr, 880, 294, .95); });
    /* 第 6–7 鏡：到手 1 塊 = 1 塊 */
    pill(fr, HX.L, 250, 250, '到手：1 塊', fade(t, 14.6, 28.0, .4, .4));
    pill(fr, HX.R, 250, 250, '到手：1 塊', fade(t, 22.6, 28.0, .4, .4));
    const ke2 = fade(t, 24.4, 28.0, .4, .4); if (ke2 > 0) fr.text('＝', 960, 250, { font: 'sansh', size: 150, color: C.gold, a: ke2, shadow: .5 });
    /* 第 8 鏡：猴子去了幾次（示意） */
    const kt = fade(t, 28.1, 44, .4, .5);
    if (kt > 0) {
      const nL = 3 + TRIPS.filter(t0 => t > t0 + .5).length;
      for (const [hx, n, lab, col] of [[HX.L, nL, '選左邊', C.gold], [HX.R, 1, '選右邊', C.ink]]) {
        fr.rect(hx - 190, 190, 380, 130, { r: 18, fill: '#14100C', a: .82 * kt });
        fr.text(lab, hx, 226, { font: 'sansm', size: 32, color: '#E9DFC8', a: kt });
        for (let i = 0; i < n; i++) A.token(fr, hx - (n - 1) * 26 + i * 52, 280, 20, { a: kt });
      }
    }
    tokenHandoff(fr, t, m);
    SL.forEach(s => { if (s.give == null || t < s.give) return; const it = sliceAt(t, m, s); if (it) A.slice(fr, it.x, it.y, 1.1, it); });   // 飛向猴子的那片，畫在猴子前面
    A.monkey(fr, m.x, MY, MS, Object.assign({}, m, { glint: Math.max(0, Math.sin(t * 2.2)) * (t > 8.6 && t < 12 ? 1 : 0) }));
  });
  const ka = fade(t, 28.4, 35.8, .5, .5);
  if (ka > 0) note(fr, 'Chen, Lakshminarayanan & Santos, 2006 · 次數為示意', ka);
}
function note(fr, str, a) { const w = fr.measure(str, { font: 'sansm', size: 26 }) + 48; fr.rect(W / 2 - w / 2, 28, w, 50, { r: 25, fill: '#14100C', a: .72 * a }); fr.text(str, W / 2, 54, { font: 'sansm', size: 26, color: '#E9DFC8', a }); }

/* ---------- 規則卡上的秤，再縮到左上角，成為全片的「心裡的秤」 ---------- */
const HUD = { x: 46, y: 36, w: 420, h: 300 };
const goldSlice = (fr, x, y) => A.slice(fr, x, y - 10, .9, { glow: 'gold' });
const redSlice = (fr, x, y) => A.slice(fr, x, y - 10, .9, { glow: 'red' });
function ruleCard(fr, t) {
  const lt = t - T.card, a = fade(t, T.card, T.coin + .4, .5, .7); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#17121E', a: ss(lt, 0, .5) * .85 });
  const shrink = E.io3(seg(t, T.coin - .9, T.coin)), cardA = 1 - ss(t, T.coin - 1.3, T.coin - .8);
  fr.g({ at: [W / 2, 450], rot: -.017, a: a * cardA, s: E.outBack(ss(lt, 0, .6)) * .2 + .8 }, () => {
    fr.rect(-470, -330, 940, 640, { r: 6, fill: '#D4CABA' });
    for (let i = 0; i < 9; i++) fr.line(-430, -230 + i * 62, 430, -230 + i * 62, { w: 1.2, color: '#A99D88', a: .5 });
    fr.text('規則', 0, -276, { font: 'serif', size: 40, track: 12, color: '#5A4634' });
    fr.text('得到一塊', -250, 270, { font: 'sansh', size: 36, color: '#B8892E' }); fr.text('被拿走一塊', 250, 270, { font: 'sansh', size: 36, color: '#C8402A' });
  });
  const tilt = E.outBack(seg(t, T.card + 1.2, T.card + 2.6)) * .62;
  const cx = lerp(W / 2, HUD.x + HUD.w / 2, shrink), cy = lerp(300, HUD.y + 78, shrink), s = lerp(1.15, .62, shrink);
  if (t < T.coin) A.balance(fr, cx, cy, s, tilt, { color: '#5A4634', L: goldSlice, R: redSlice, a: a * (1 - shrink) + shrink });
}
function hud(fr, t, o) {
  const a = o.a; if (a <= 0) return;
  fr.g({ a }, () => {
    fr.rect(HUD.x, HUD.y, HUD.w, HUD.h, { r: 16, fill: '#14100C', a: .82 }); fr.rect(HUD.x, HUD.y, HUD.w, HUD.h, { r: 16, color: '#6E5F47', w: 1.2, a: .5 });
    A.balance(fr, HUD.x + HUD.w / 2, HUD.y + 78, .62, o.tilt, { color: '#C9A861', L: o.L, R: o.R });
    fr.text('得', HUD.x + 44, HUD.y + 266, { font: 'sansh', size: 30, color: C.gold }); fr.text('失', HUD.x + HUD.w - 44, HUD.y + 266, { font: 'sansh', size: 30, color: C.red });
    fr.text('心裡的秤', HUD.x + HUD.w / 2, HUD.y + 266, { font: 'sans', size: 28, track: 6, color: '#E9DFC8' });
  });
}

/* ---------- 拋硬幣：先正面朝上擺著，拋起來，落下反面；"−100" 落進秤的右盤 ---------- */
const LAND = 4.0;
function coinToss(fr, t) {
  const lt = t - T.coin, a = ss(lt, 0, .5) * (1 - ss(t, T.end - 1.1, T.end - .1)); if (a <= 0) return;
  const coinA = 1 - ss(t, T.big, T.big + .6);
  fr.g({ a }, () => {
    const x = fr.x, g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2B2230'); g.addColorStop(.62, '#3A2C26'); g.addColorStop(.63, '#5A4034'); g.addColorStop(1, '#3E2C24'); fr.rect(0, 0, W, H, { fill: g });
    fr.glow(960, 300, 700, '#FFD9A0', .16);
    const fly = seg(lt, 1.2, LAND);
    const y = 640 - Math.sin(fly * Math.PI) * 360, phase = E.io3(fly) * Math.PI * 9;               // 9π：落下來反面朝上
    fr.g({ a: coinA }, () => { fr.ellipse(960, 690, 170 * (1 - Math.sin(fly * Math.PI) * .5), 22, { fill: '#000', a: .3 }); A.coin(fr, 960, y, 150, phase); });
    bigBalance(fr, t);
    const kt = ss(lt, LAND + .3, LAND + .7), go = E.io3(seg(lt, LAND + 1.4, LAND + 2.0));
    if (kt > 0 && go < 1) fr.text('−100', lerp(960, HUD.x + HUD.w / 2 + 140, go), lerp(420, HUD.y + 205, go), { font: 'sansh', size: lerp(120, 30, go), color: C.red, a: kt, shadow: .5 });
  });
}

/* ---------- 秤回到畫面中間：右盤 −100；左盤一枚一枚加金幣，加到 200 才放平 ---------- */
const COIN_T = [64.6, 65.2, 65.7, 66.15, 66.55, 66.9, 67.25, 67.6];                 // 每一枚 +25，第 8 枚 = 200
function gains(t) { return 25 * COIN_T.filter(c => t >= c).length; }
function tiltFor(t) {                                                            // 右盤 100，左盤 v：v 越接近 200 越平
  const v = gains(t), k = E.out3(seg(t, COIN_T[Math.max(0, COIN_T.filter(c => t >= c).length - 1)], COIN_T[Math.max(0, COIN_T.filter(c => t >= c).length - 1)] + .35));
  const prev = Math.max(0, v - 25), tv = x => .95 * (1 - Math.min(1, x / 200));
  return v === 0 ? .95 : lerp(tv(prev), tv(v), k);
}
function bigBalance(fr, t) {
  const k = E.io3(seg(t, T.big, T.big + .8)); if (k <= 0) return;
  const cx = lerp(HUD.x + HUD.w / 2, W / 2, k), cy = lerp(HUD.y + 78, 250, k), s = lerp(.62, 1.25, k), v = gains(t);
  const L = (fr2, x, y) => {
    if (v === 0) { const bl = .5 + .5 * Math.sin((t - T.big) * 6); fr2.text('+？', x, y - 26, { font: 'sansh', size: 56, color: C.gold, a: ss(t, T.big + .9, T.big + 1.3) * (.4 + .6 * bl) }); return; }
    const n = v / 25; for (let i = 0; i < n; i++) { const c = COIN_T[i], kk = E.out3(seg(t, c, c + .3)); fr2.ellipse(x + (i % 2 ? 6 : -6), y - 8 - i * 11 - (1 - kk) * 60, 46, 12, { fill: '#E2C07A', a: kk }); fr2.ellipse(x + (i % 2 ? 6 : -6), y - 10 - i * 11 - (1 - kk) * 60, 46, 10, { color: '#A8843F', w: 2, a: kk }); }
    fr2.text('+' + v, x, y - 40 - n * 11, { font: 'sansh', size: 50, color: C.gold });
  };
  const R = (fr2, x, y) => fr2.text('−100', x, y - 26, { font: 'sansh', size: 56, color: C.red });
  A.balance(fr, cx, cy, s, tiltFor(t), { color: '#C9A861', L, R, a: ss(k, 0, .3) });
  if (v >= 200) { K.ripple(fr, t, COIN_T[7] + .35, cx, cy, { r0: 40, r1: 520, dur: 1.4, color: '#F4D48A' }); fr.text('放平了', W / 2, 700, { font: 'sansh', size: 44, track: 8, color: C.gold, a: ss(t, COIN_T[7] + .4, COIN_T[7] + .9) }); }
  const kn = fade(t, 67.4, 75.6, .5, .5); if (kn > 0) note(fr, '問法出自 Kahneman《快思慢想》第 26 章 · 常見答案約 200', kn);
}

/* ---------- 片名 ---------- */
function title(fr, t) {
  const lt = t - T.title, a = ss(lt, -.5, 0) * (1 - ss(t, T.back - .7, T.back)); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#0B0806', a });
  K.titleGilt(fr, lt, { la: 'LOSS AVERSION', zh: '損失的重量', tag: '為什麼跌了的幣，你捨不得賣', a, cy: 430, size: 178, tagDy: 330,
    motif: (fr, lt, aa) => { const k = ss(lt, 1.2, 2.2); A.balance(fr, W / 2, 560, .42, E.outBack(seg(lt, 2.0, 3.0)) * .5, { color: '#C9A861', a: k * aa }); } });
}

VK.film({
  dur: T.end, theme: 'flat', meta: { title: '損失的重量', root: 0 },
  draw(fr, t) {
    fr.look.bgo = { color: '#17121E' };
    const encA = Math.min(ss(t, 0, .6), 1 - ss(t, 35.9, 36.4)) + ss(t, T.back - .4, T.back + .2) * (1 - ss(t, T.card + .2, T.card + .8));
    if (encA > 0) fr.g({ a: clamp(encA) }, () => {
      enclosure(fr, t);
      const x = fr.x, g = x.createRadialGradient(W / 2, 520, H * .55, W / 2, 520, W * .72); g.addColorStop(0, 'rgba(20,10,10,0)'); g.addColorStop(1, 'rgba(20,10,10,.45)'); fr.rect(0, 0, W, H, { fill: g });
    });
    title(fr, t);
    ruleCard(fr, t);
    coinToss(fr, t);
    const drop = E.outBack(seg(t, T.coin + LAND + 2.0, T.coin + LAND + 2.8));
    hud(fr, t, { a: ss(t, T.coin - .3, T.coin + .1) * (t < T.big + .05 ? 1 : 0), tilt: drop * .95, R: drop > 0 ? (fr2, x, y) => fr2.text('−100', x, y - 22, { font: 'sansh', size: 64, color: C.red }) : null });
    const x = fr.x, b = x.createLinearGradient(0, 820, 0, H); b.addColorStop(0, 'rgba(18,12,20,0)'); b.addColorStop(.5, 'rgba(18,12,20,.7)'); b.addColorStop(1, 'rgba(18,12,20,.88)'); fr.rect(0, 820, W, 260, { fill: b });
    K.flash(fr, t, T.title, { rise: .3, fall: .4 });
    /* 聲音 */
    fr.sfx(1.8, 'tick', { pitch: 7, gain: .5 }); fr.sfx(2.9, 'soft'); fr.sfx(3.7, 'soft', { gain: .4 });
    fr.sfx(5.0, 'tick', { pitch: 7, gain: .4 }); fr.sfx(10.1, 'tick', { pitch: 7, gain: .4 });
    fr.sfx(12.8, 'soft'); fr.sfx(14.3, 'soft', { gain: .4 }); fr.sfx(16.8, 'soft'); fr.sfx(20.4, 'tock', { pitch: -3, gain: .7 }); fr.sfx(22.3, 'soft', { gain: .4 });
    fr.sfx(24.5, 'shimmer', { gain: .4 });
    TRIPS.forEach(t0 => fr.sfx(t0 + .5, 'tick', { pitch: 5, gain: .35 }));
    fr.sfx(T.title, 'bloom', { root: 0, gain: .8 }); fr.sfx(T.card + 1.2, 'thud', { gain: .7 });
    fr.sfx(T.coin + 1.2, 'rise', { dur: 2.8, gain: .4 }); fr.sfx(T.coin + LAND, 'thud', { gain: .8 }); fr.sfx(T.coin + LAND + 2.0, 'thud', { gain: .9 }); fr.sfx(T.big + .9, 'rise', { dur: 2.4, gain: .3 });
    COIN_T.forEach((c, i) => fr.sfx(c, 'tick', { pitch: 4 + i, gain: .45 })); fr.sfx(COIN_T[7] + .35, 'chord', { root: 0, gain: .7 });
    K.subs(fr, t, SUBS, 'flat');
  },
});
})();
