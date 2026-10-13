/* 《损失的重量》 · B 寓言 · 前 60 秒。分镜表见同目录 storyboard.md（第 1–15 镜）。
 * 事实：M. K. Chen, V. Lakshminarayanan, L. R. Santos, "How Basic Are Behavioral Biases? Evidence from Capuchin
 *   Monkey Trading Behavior", J. Political Economy 114(3), 2006。卷尾猴用代币跟两个实验员换苹果片：
 *   一个先拿出 1 片、一半时候再加 1 片；另一个先拿出 2 片、一半时候拿走 1 片。平均都是 1.5 片，约 71% 的交易选了前者（二手综述的数，待对原文）。
 *   另一组：两边最后都只给 1 片（一个拿出 1 给 1，一个拿出 2 拿走 1），猴子仍然躲开"拿走"的那个人。
 * 示意：猴舍、人、盘子的样子是画的；第 7 镜那六次交易是示意的记录，不是论文里的逐次数据。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, fade, rng } = VK;
const K = VKit, A = window.LA, C = A.C, HX = A.HATCH;

const T = { title: 31.9, back: 39.8, card: 50.4, coin: 55.0, end: 61.5 };
const SUBS = [
  { a: .5,   b: 3.6,  zh: '两个人，都卖苹果给这只猴子' },
  { a: 3.9,  b: 7.0,  zh: '价钱一样：{一枚代币}' },
  { a: 7.4,  b: 10.2, zh: '左边的人，先拿出一块' },
  { a: 10.5, b: 13.0, zh: '有时候，再{多给一块}' },
  { a: 13.5, b: 16.2, zh: '右边的人，先拿出两块' },
  { a: 16.5, b: 19.0, zh: '有时候，{!拿走一块}' },
  { a: 19.4, b: 22.9, zh: '算下来，两边平均都是一块半' },
  { a: 23.2, b: 26.9, zh: '猴子却一次次，走向左边' },
  { a: 29.0, b: 31.3, zh: '换了你，多半也一样' },
  { a: 40.3, b: 43.4, zh: '再试一次：两边都只给一块' },
  { a: 43.7, b: 46.9, zh: '它还是躲着，那个{!拿走}的人' },
  { a: 47.2, b: 50.2, zh: '它不贪多，它怕被拿走' },
  { a: 50.7, b: 54.8, zh: '失去一块，比得到一块更重', tone: 'gold' },
  { a: 55.4, b: 57.9, zh: '换你来：抛一次硬币' },
  { a: 58.3, b: 61.2, zh: '反面，你{!输 100}' },
];

/* ---------- 镜头：世界坐标里的焦点 (cx, cy) 和缩放 s；缩放在对数空间里走 ---------- */
const CAM = [[0, 960, 540, 1], [6.9, 960, 520, 1.05], [7.7, 690, 500, 1.42], [13.0, 700, 500, 1.46], [13.9, 1230, 500, 1.46], [19.0, 1220, 500, 1.5], [19.9, 960, 540, 1], [29, 960, 540, 1.04],
             [39.5, 960, 540, 1], [46.6, 900, 540, 1.04], [50.4, 760, 560, 1.22]];
function camAt(t) {
  let i = 0; while (i < CAM.length - 2 && t >= CAM[i + 1][0]) i++;
  const p = CAM[i], q = CAM[i + 1], k = E.io3(seg(t, p[0], q[0]));
  const s = Math.exp(lerp(Math.log(p[3]), Math.log(q[3]), k));
  return { x: lerp(p[1], q[1], k), y: lerp(p[2], q[2], k), s };
}
function shoot(fr, t, fn) { const c = camAt(t); fr.g({ at: [W / 2, H / 2], s: c.s }, () => fr.g({ at: [-c.x, -c.y] }, fn)); }

/* ---------- 盘子里此刻有什么：返回 [{ x, y, glow, a, rot }]，两个人的手跟着这些时刻动 ---------- */
const PLACE = (t, t0) => E.out3(seg(t, t0, t0 + .6));              // 手把一片放下：0..1
function leftItems(t) {
  const out = [], y = HX.shelf - 18;
  if (t < 19.6) {
    const k1 = PLACE(t, 7.7); if (k1 > 0) out.push({ x: HX.L - 45, y: lerp(y - 120, y, k1), a: ss(k1, 0, .2) });
    const k2 = PLACE(t, 10.8); if (k2 > 0) out.push({ x: HX.L + 48, y: lerp(y - 120, y - 6, k2), a: ss(k2, 0, .2), glow: t < 13.4 ? 'gold' : null, rot: .15 });
  }
  if (t > 39.6) { const k = PLACE(t, 40.4); if (k > 0) out.push({ x: HX.L, y: lerp(y - 120, y, k), a: ss(k, 0, .2) }); }
  return out;
}
function rightItems(t) {
  const out = [], y = HX.shelf - 18;
  const lift = (t0) => { const k = E.io3(seg(t, t0, t0 + .9)); return { dx: k * 120, dy: -k * 60, a: 1 - ss(k, .55, 1) }; };
  if (t < 19.6) {
    const k = PLACE(t, 13.9);
    if (k > 0) { out.push({ x: HX.R - 45, y: lerp(y - 120, y, k), a: ss(k, 0, .2) }); const l = lift(16.8); if (l.a > 0) out.push({ x: HX.R + 48 + l.dx, y: lerp(y - 120, y - 6, k) + l.dy, a: ss(k, 0, .2) * l.a, glow: t > 16.7 ? 'red' : null, rot: .15 }); }
  }
  if (t > 39.6) {
    const k = PLACE(t, 40.4);
    if (k > 0) { out.push({ x: HX.R - 45, y: lerp(y - 120, y, k), a: ss(k, 0, .2) }); const l = lift(41.4); if (l.a > 0) out.push({ x: HX.R + 48 + l.dx, y: lerp(y - 120, y - 6, k) + l.dy, a: ss(k, 0, .2) * l.a, glow: t > 41.3 ? 'red' : null, rot: .15 }); }
  }
  return out;
}
/* 手：平时搭在盘子边上；放苹果、拿苹果的时候跟着那一片走 */
function handPos(t, side) {
  const hx = side < 0 ? HX.L : HX.R, rest = [hx + side * 110, HX.shelf - 44];
  const keysL = [[0, hx + 120, 500], [1.4, ...rest], [7.3, ...rest], [7.75, hx - 26, HX.shelf - 150], [8.3, hx - 26, HX.shelf - 60], [9.0, ...rest], [10.4, ...rest], [10.85, hx + 30, HX.shelf - 150], [11.4, hx + 30, HX.shelf - 66], [12.1, ...rest], [40.0, ...rest], [40.45, hx, HX.shelf - 150], [41.0, hx, HX.shelf - 60], [41.6, ...rest]];
  const keysR = [[0, hx - 120, 500], [1.4, ...rest], [13.5, ...rest], [13.95, hx, HX.shelf - 150], [14.5, hx, HX.shelf - 60], [15.2, ...rest], [16.3, ...rest], [16.8, hx + 30, HX.shelf - 70], [17.7, hx + 150, HX.shelf - 120], [18.6, ...rest],
                 [40.0, ...rest], [40.45, hx, HX.shelf - 150], [41.0, hx, HX.shelf - 60], [41.4, hx + 30, HX.shelf - 70], [42.3, hx + 150, HX.shelf - 120], [43.0, ...rest]];
  const keys = side < 0 ? keysL : keysR;
  let i = 0; while (i < keys.length - 2 && t >= keys[i + 1][0]) i++;
  const p = keys[i], q = keys[i + 1], k = E.io3(seg(t, p[0], q[0]));
  return [lerp(p[1], q[1], k), lerp(p[2], q[2], k)];
}
function stall(fr, t, side) {
  const hx = side < 0 ? HX.L : HX.R, items = side < 0 ? leftItems(t) : rightItems(t), [px, py] = handPos(t, side);
  const show = 1 - ss(t, 19.2, 19.7) + ss(t, 39.6, 40.1);
  fr.g({ a: clamp(show) }, () => {
    A.plate(fr, hx, HX.shelf - 14, 1.15);
    items.forEach(it => A.slice(fr, it.x, it.y, 1.3, it));
    arm(fr, side, px, py);
  });
}
function arm(fr, side, px, py) { const hx = side < 0 ? HX.L : HX.R; A.arm(fr, hx + side * 175, HX.shelf - 95, px, py, side < 0 ? C.sleeveL : C.sleeveR); }

/* ---------- 第 7 镜的记录：每边六次交易，一列一次。左边：基本 1 片 + 有时多给的金边那片；右边：2 片里有时被拿走的红虚线那片 ---------- */
const LOG_L = [1, 2, 1, 2, 2, 1], LOG_R = [2, 1, 2, 1, 1, 2];
function ledger(fr, t) {
  const a = fade(t, 19.7, 23.6, .5, .5); if (a <= 0) return;
  for (const [hx, log, side] of [[HX.L, LOG_L, -1], [HX.R, LOG_R, 1]]) {
    fr.g({ a }, () => {
      fr.rect(hx - 190, 380, 380, 300, { r: 14, fill: '#F3EAD6', a: .94 }); fr.rect(hx - 190, 380, 380, 300, { r: 14, color: '#8A6440', w: 2 });
      fr.text(side < 0 ? '左边 · 六次交易' : '右边 · 六次交易', hx, 414, { font: 'sansm', size: 26, color: '#5A4634' });
      log.forEach((n, i) => {
        const k = ss(t, 19.9 + i * .28, 20.3 + i * .28), cx = hx - 150 + i * 60;
        A.slice(fr, cx, 560, .52, { a: k });
        if (side < 0 && n === 2) A.slice(fr, cx, 512, .52, { a: k, glow: 'gold' });
        if (side > 0) A.slice(fr, cx, 512, .52, { a: k, ghost: n === 1 });
        fr.text(String(n), cx, 600, { font: 'sansh', size: 28, color: side < 0 && n === 2 ? '#B8892E' : side > 0 && n === 1 ? '#D8452C' : '#5A4634', a: k });
      });
      const ka = ss(t, 21.6, 22.1);
      fr.text('平均 1.5 块', hx, 648, { font: 'sansh', size: 34, color: '#3A2A22', a: ka });
    });
  }
}

/* ---------- 猴子这 60 秒在哪、朝哪、干什么 ---------- */
const TRIPS = [23.5, 24.7, 25.9];                                           // 第 8 镜：一次次跳向左边
function monkeyState(t) {
  let x = 960, face = 1, hop = 0, reach = 0, tok = t < 23.4, food = false, chew = 0;
  /* 第 2 镜：看左边（价签），再看右边 */
  face = clamp(K.track([[0, 1], [3.9, 1], [4.2, -1], [5.3, -1], [5.6, 1], [7.4, 1], [7.6, -1], [13.2, -1], [13.5, 1], [22.9, 1], [23.2, -1], [27, -1]], t), -1, 1);
  if (t > 23.2 && t < 31) {
    x = 960; for (const t0 of TRIPS) { const k = seg(t, t0, t0 + .55), b = seg(t, t0 + .7, t0 + 1.1); x = Math.min(x, lerp(960, 700, E.io3(k)) + (b > 0 && t0 !== TRIPS[TRIPS.length - 1] ? lerp(0, 260, E.io3(b)) : 0)); if (k > 0 && k < 1) hop = Math.sin(k * Math.PI) * 90; if (b > 0 && b < 1 && t0 !== TRIPS[TRIPS.length - 1]) hop = Math.sin(b * Math.PI) * 60; }
    if (t > 26.6) { food = true; chew = t; }
    reach = t > 26.5 ? .55 : 0;
  }
  if (t > 39.5) {
    tok = true;
    face = clamp(K.track([[39.5, 1], [43.6, 1], [44.0, 1], [44.4, -1], [60, -1]], t), -1, 1);
    const k = seg(t, 44.6, 45.4); x = lerp(960, 700, E.io3(k)); hop = Math.sin(k * Math.PI) * 80;
  }
  return { x, face, hop, reach: reach || (t < 7 ? .25 : 0), token: tok, food, chew, blink: ss(Math.sin(t * 1.7) * 10, 9.6, 10) };
}

/* 屏上的出处小字：底部字幕区上方，一条深色底 */
function note(fr, str, a) { const w = fr.measure(str, { font: 'sansm', size: 26 }) + 48; fr.rect(W / 2 - w / 2, 28, w, 50, { r: 25, fill: '#14100C', a: .72 * a }); fr.text(str, W / 2, 54, { font: 'sansm', size: 26, color: '#E9DFC8', a }); }
function enclosure(fr, t) {
  shoot(fr, t, () => {
    A.room(fr, t);
    A.priceTag(fr, HX.L, seg(t, 4.0, 5.0) * (1 - ss(t, 19.2, 19.6)));
    A.priceTag(fr, HX.R, seg(t, 5.5, 6.5) * (1 - ss(t, 19.2, 19.6)));
    stall(fr, t, -1); stall(fr, t, 1);
    ledger(fr, t);
    const m = monkeyState(t);
    A.monkey(fr, m.x, 830, 1.6, Object.assign({}, m, { glint: Math.max(0, Math.sin(t * 2.2)) * (t < 7 ? 1 : 0) }));
    /* 第 8 镜的计数：左 71 : 右 29 */
    const kc = E.out3(seg(t, 23.5, 26.6)), ac = fade(t, 23.3, 29.4, .4, .5);
    if (ac > 0) {
      for (const [hx, v, col, lab] of [[HX.L, 71, C.gold, '选左边'], [HX.R, 29, C.ink, '选右边']]) {
        fr.rect(hx - 150, 160, 300, 200, { r: 18, fill: '#14100C', a: .8 * ac });
        fr.text(lab, hx, 205, { font: 'sansm', size: 32, color: '#E9DFC8', a: ac });
        fr.text(String(Math.round(v * kc)) + '%', hx, 295, { font: 'sansh', size: 104, color: col, a: ac });
      }
    }
    /* 第 10 镜：两边到手都是 1 块 */
    const k1 = fade(t, 42.4, 47.0, .4, .5);
    if (k1 > 0) for (const hx of [HX.L, HX.R]) { fr.rect(hx - 120, 250, 240, 70, { r: 14, fill: '#14100C', a: .8 * k1 }); fr.text('到手：1 块', hx, 286, { font: 'sansh', size: 36, color: C.ink, a: k1 }); }
  });
  /* 屏上小字（不随镜头）：出处 */
  const ka = fade(t, 23.6, 29.2, .5, .5);
  if (ka > 0) note(fr, 'Chen, Lakshminarayanan & Santos, 2006 · 约 71% 的交易选了左边', ka);
  const kb = fade(t, 44.2, 50.2, .5, .5);
  if (kb > 0) note(fr, 'Chen, Lakshminarayanan & Santos, 2006', kb);
}

/* ---------- 秤：规则卡上画一次，再缩到左上角，成为全片的「心里的秤」 ---------- */
const HUD = { x: 46, y: 36, w: 420, h: 300 };
const goldSlice = (fr, x, y) => A.slice(fr, x, y - 10, .9, { glow: 'gold' });
const redSlice = (fr, x, y) => A.slice(fr, x, y - 10, .9, { glow: 'red' });
function ruleCard(fr, t) {
  const lt = t - T.card, a = fade(t, T.card, T.coin + .4, .5, .7); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#17121E', a: ss(lt, 0, .5) * .85 });
  const shrink = E.io3(seg(t, T.coin - .8, T.coin)), cardA = 1 - ss(t, T.coin - 1.1, T.coin - .6);
  fr.g({ at: [W / 2, 450], rot: -.017, a: a * cardA, s: E.outBack(ss(lt, 0, .6)) * .2 + .8 }, () => {
        fr.rect(-470, -330, 940, 640, { r: 6, fill: '#D4CABA' });
    for (let i = 0; i < 9; i++) fr.line(-430, -230 + i * 62, 430, -230 + i * 62, { w: 1.2, color: '#A99D88', a: .5 });
    fr.text('规则', 0, -276, { font: 'serif', size: 40, track: 12, color: '#5A4634' });
    fr.text('得到', -230, 270, { font: 'sansh', size: 34, color: '#B8892E' }); fr.text('失去', 230, 270, { font: 'sansh', size: 34, color: '#C8402A' });
  });
  /* 秤本身：从卡片中间缩到左上角的面板里 */
  const tilt = E.outBack(seg(t, T.card + .9, T.card + 2.2)) * .62;
  const cx = lerp(W / 2, HUD.x + HUD.w / 2, shrink), cy = lerp(300, HUD.y + 78, shrink), s = lerp(1.15, .62, shrink);
  if (t < T.coin) A.balance(fr, cx, cy, s, tilt, { color: '#5A4634', L: goldSlice, R: redSlice, a: a * (1 - shrink) + shrink });
  if (lt > .9 && lt < 1.1) fr.sfx(T.card + .9, 'thud', { gain: .7 });
}
/* 左上角面板：心里的秤。tilt、两个盘里的东西、下面一行"对象" */
function hud(fr, t, o) {
  const a = o.a; if (a <= 0) return;
  fr.g({ a }, () => {
    fr.rect(HUD.x, HUD.y, HUD.w, HUD.h, { r: 16, fill: '#14100C', a: .82 }); fr.rect(HUD.x, HUD.y, HUD.w, HUD.h, { r: 16, color: '#6E5F47', w: 1.2, a: .5 });
    A.balance(fr, HUD.x + HUD.w / 2, HUD.y + 78, .62, o.tilt, { color: '#C9A861', L: o.L, R: o.R });
    fr.text('得', HUD.x + 44, HUD.y + 266, { font: 'sansh', size: 30, color: C.gold }); fr.text('失', HUD.x + HUD.w - 44, HUD.y + 266, { font: 'sansh', size: 30, color: C.red });
    fr.text('心里的秤', HUD.x + HUD.w / 2, HUD.y + 266, { font: 'sans', size: 28, track: 6, color: '#E9DFC8' });
  });
  if (o.caption) fr.text(o.caption, HUD.x + HUD.w / 2, HUD.y + HUD.h + 30, { font: 'sansm', size: 26, track: 2, color: '#F3EBDA', a, shadow: .7 });
}

/* ---------- 第 14–15 镜：抛硬币。反面朝上，"−100" 落进秤的右盘 ---------- */
function coinToss(fr, t) {
  const lt = t - T.coin, a = ss(lt, 0, .5); if (a <= 0) return;
  fr.g({ a }, () => {
    const x = fr.x, g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2B2230'); g.addColorStop(.62, '#3A2C26'); g.addColorStop(.63, '#5A4034'); g.addColorStop(1, '#3E2C24'); fr.rect(0, 0, W, H, { fill: g });
    fr.glow(960, 300, 700, '#FFD9A0', .16);
    const fly = seg(lt, .8, 3.2), land = 3.2;
    const y = lt < land ? lerp(640, 640, fly) - Math.sin(fly * Math.PI) * 360 : 640;
    const phase = lt < land ? E.io3(fly) * Math.PI * 9 : Math.PI * 9;                         // 9π：落下来反面朝上
    fr.ellipse(960, 690, 170 * (1 - Math.sin(fly * Math.PI) * .5), 22, { fill: '#000', a: .3 });
    A.coin(fr, 960, y, 150, phase);
    /* 反面写着：输 100 */
    const kt = ss(lt, land + .2, land + .6), go = E.io3(seg(lt, land + 1.0, land + 1.6));
    if (kt > 0 && go < 1) fr.text('−100', lerp(960, HUD.x + HUD.w / 2 + 140, go), lerp(420, HUD.y + 205, go), { font: 'sansh', size: lerp(120, 30, go), color: C.red, a: kt, shadow: .5 });
    if (lt > land - .05 && lt < land + .1) fr.sfx(T.coin + land, 'thud', { gain: .8 });
    if (lt > .75 && lt < .9) fr.sfx(T.coin + .8, 'rise', { dur: 2.6, gain: .4 });
  });
}

/* ---------- 片名 ---------- */
function title(fr, t) {
  const lt = t - T.title, a = (ss(lt, -.5, 0)) * (1 - ss(t, T.back - .7, T.back)); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#0B0806', a });
  K.titleGilt(fr, lt, { la: 'LOSS AVERSION', zh: '损失的重量', tag: '为什么跌了的币，你舍不得卖', a, cy: 430, size: 178, tagDy: 330,
    motif: (fr, lt, aa) => { const k = ss(lt, 1.2, 2.2); A.balance(fr, W / 2, 560, .42, E.outBack(seg(lt, 2.0, 3.0)) * .5, { color: '#C9A861', a: k * aa }); } });
}

VK.film({
  dur: T.end, theme: 'flat', meta: { title: '损失的重量', root: 0 },
  draw(fr, t) {
    fr.look.bgo = { color: '#17121E' };
    /* 猴舍：开场 0.6s 亮起；片名前压暗；片名后回来；规则卡时压在底下 */
    const encA = Math.min(ss(t, 0, .6), 1 - ss(t, 30.0, 31.6)) + ss(t, T.back - .4, T.back + .4) * (1 - ss(t, T.coin - .2, T.coin + .4));
    if (encA > 0) fr.g({ a: clamp(encA) }, () => {
      enclosure(fr, t);
      const x = fr.x, g = x.createRadialGradient(W / 2, 520, H * .55, W / 2, 520, W * .72); g.addColorStop(0, 'rgba(20,10,10,0)'); g.addColorStop(1, 'rgba(20,10,10,.45)'); fr.rect(0, 0, W, H, { fill: g });
    });
    title(fr, t);
    ruleCard(fr, t);
    coinToss(fr, t);
    /* 心里的秤：55 秒起常驻。先是空的、放平；"−100" 落进右盘后猛地往右沉 */
    const drop = E.outBack(seg(t, T.coin + 4.8, T.coin + 5.6));
    hud(fr, t, { a: ss(t, T.coin - .3, T.coin + .1), tilt: drop * .95, R: drop > 0 ? (fr2, x, y) => fr2.text('−100', x, y - 22, { font: 'sansh', size: 64, color: C.red }) : null, caption: t > T.coin + .3 ? '对象：一次抛硬币' : null });
    /* 字幕区压暗 */
    const x = fr.x, b = x.createLinearGradient(0, 820, 0, H); b.addColorStop(0, 'rgba(18,12,20,0)'); b.addColorStop(.5, 'rgba(18,12,20,.7)'); b.addColorStop(1, 'rgba(18,12,20,.88)'); fr.rect(0, 820, W, 260, { fill: b });
    K.flash(fr, t, T.title, { rise: .3, fall: .4 });
    /* 声音 */
    fr.sfx(4.2, 'tick', { pitch: 7, gain: .5 }); fr.sfx(5.7, 'tick', { pitch: 7, gain: .5 });
    fr.sfx(8.1, 'soft'); fr.sfx(11.2, 'shimmer', { gain: .5 }); fr.sfx(14.3, 'soft'); fr.sfx(17.0, 'tock', { pitch: -3, gain: .6 });
    for (let i = 0; i < 6; i++) fr.sfx(19.9 + i * .28, 'tick', { pitch: 2 + i, gain: .3 });
    TRIPS.forEach(t0 => fr.sfx(t0 + .5, 'soft', { gain: .4 }));
    fr.sfx(T.title, 'bloom', { root: 0, gain: .8 }); fr.sfx(40.6, 'soft'); fr.sfx(41.6, 'tock', { pitch: -3, gain: .6 });
    fr.sfx(T.coin + 4.8, 'thud', { gain: .9 });
    K.subs(fr, t, SUBS, 'flat');
  },
});
})();
