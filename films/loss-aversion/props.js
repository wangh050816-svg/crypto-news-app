/* 《损失的重量》的道具：猴舍、猴子、苹果片、盘子、伸进来的手、代币、秤、硬币。都是现画的扁平插画。
 * 坐标：猴舍是一张 1920×1080 的"世界图"，镜头在 film.js 里推拉。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, hash, rng } = VK;

const C = {
  gold: '#EEC672', red: '#FC593F', ink: '#FFFAEB',
  lab: '#B9C2BC', lab2: '#9DA8A2', beam: '#3B3F3B', mesh: '#2E3330',
  floor: '#B8915E', floor2: '#A27C4C', shelf: '#8A6440', shelf2: '#6B4B2E',
  furA: '#7A5232', furB: '#5E3E25', furC: '#3B271A', cream: '#EBD6B0', cream2: '#F3E4C6', cap: '#33221A',
  skin: '#E2B48C', sleeveL: '#3E6A9A', sleeveR: '#9A4A3E',
  flesh: '#F4E7C6', fleshEdge: '#E6D3A6', peel: '#C8402A',
  plate: '#F1ECE2', plate2: '#D6CEC0',
  silver: '#C9CED6', silver2: '#8E959F',
};
const HATCH = { L: 430, R: 1490, top: 380, bot: 590, shelf: 600 };   // 两个递食口的位置（世界坐标）

/* ---------- 一片苹果：月牙形，上面一道红皮。o: { rot, a, glow: 'gold'|'red', ghost }  ---------- */
function slice(fr, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return;
  fr.g({ at: [x, y], rot: o.rot || 0, s, a }, () => {
    if (o.glow) fr.glow(0, -8, 90, o.glow === 'red' ? C.red : C.gold, .55);
    if (o.ghost) { fr.path('M -46,4 Q 0,-46 46,4 Q 0,-6 -46,4 Z', { color: C.red, w: 4, dash: [10, 8] }); return; }
    fr.ellipse(0, 8, 44, 7, { fill: '#000', a: .18 });
    fr.path('M -46,4 Q 0,-46 46,4 Q 0,-6 -46,4 Z', { fill: C.flesh });
    fr.path('M -46,4 Q 0,-46 46,4 Q 0,-34 -46,4 Z', { fill: C.peel });
    fr.path('M -30,-6 Q 0,-26 30,-6', { color: C.fleshEdge, w: 2, a: .8 });
    fr.ellipse(-6, -8, 4, 6.5, { fill: '#5A3A22', rot: .3 }); fr.ellipse(8, -8, 4, 6.5, { fill: '#5A3A22', rot: -.3 });
    fr.path('M -30,-20 Q -10,-32 10,-33', { color: '#FFFFFF', w: 3, a: .45 });
  });
}

/* ---------- 盘子 ---------- */
function plate(fr, x, y, s = 1, a = 1) {
  fr.g({ at: [x, y], s, a }, () => {
    fr.ellipse(0, 10, 120, 24, { fill: '#000', a: .2 });
    fr.ellipse(0, 0, 118, 28, { fill: C.plate2 });
    fr.ellipse(0, -4, 112, 24, { fill: C.plate });
    fr.ellipse(0, -2, 76, 14, { fill: C.plate2, a: .45 });
  });
}

/* ---------- 代币：一枚银色小圆片 ---------- */
function token(fr, x, y, r, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return;
  fr.g({ at: [x, y], a, s: [o.sx == null ? 1 : o.sx, 1] }, () => {
    fr.circle(0, 0, r, { fill: C.silver2 }); fr.circle(-r * .06, -r * .06, r * .9, { fill: C.silver });
    fr.circle(0, 0, r * .62, { color: C.silver2, w: Math.max(1.5, r * .08) });
    fr.path(`M ${-r * .55},${-r * .45} Q ${-r * .2},${-r * .85} ${r * .35},${-r * .7}`, { color: '#FFFFFF', w: Math.max(1.5, r * .12), a: .7 });
  });
  if (o.glint) fr.glow(x + r * .4, y - r * .4, r * 2.2, '#FFFFFF', .5 * o.glint);
}

/* ---------- 伸进递食口的一只手：袖子 + 手。从 (x0,y0) 伸到 (hx,hy) ---------- */
function arm(fr, x0, y0, hx, hy, sleeve, a = 1) {
  if (a <= 0) return;
  fr.g({ a }, () => {
    fr.line(x0, y0, hx, hy, { w: 64, color: sleeve });
    const ang = Math.atan2(hy - y0, hx - x0);
    fr.g({ at: [hx, hy], rot: ang }, () => {
      fr.rect(-20, -34, 26, 68, { r: 10, fill: '#E8E4DA' });              // 袖口
      fr.ellipse(30, 0, 38, 28, { fill: C.skin });                          // 手掌
      fr.ellipse(56, 8, 18, 10, { fill: C.skin }); fr.ellipse(40, -24, 14, 9, { fill: C.skin, rot: -.4 });
    });
  });
}

/* ---------- 一只卷尾猴（侧身坐着，面朝右；face<0 朝左）。
 * o: { face(-1..1), hop(像素，往上跳的高度), reach(0..1 胳膊伸出), chew, token(手里拿着代币), blink, a } ---------- */
function monkey(fr, x, y, s, o = {}) {
  const f = o.face == null ? 1 : o.face, sx = (Math.abs(f) < .3 ? .3 * (f < 0 ? -1 : 1) : f) * s, a = o.a == null ? 1 : o.a;
  const hop = o.hop || 0, reach = o.reach || 0;
  fr.ellipse(x, y + 4 * s, 90 * s * (1 - Math.min(.4, hop / 300)), 14 * s, { fill: '#000', a: .22 * a });
  fr.g({ at: [x, y - hop], s: [sx, s], a }, () => {
    fr.path('M -40,-50 C -120,-40 -150,10 -150,-50 C -150,-110 -100,-120 -95,-80', { color: C.furB, w: 18 });     // 尾巴
    fr.ellipse(-6, -96, 64, 82, { fill: C.furA, rot: .12 });                                                   // 身子
    fr.ellipse(-16, -34, 58, 36, { fill: C.furB });                                                             // 后腿
    fr.ellipse(34, -8, 34, 11, { fill: C.furC });                                                               // 脚
    fr.ellipse(32, -122, 36, 44, { fill: C.cream, rot: .2 });                                                   // 胸口那片浅毛
    const hx = lerp(70, 168, E.io3(reach)), hy = lerp(-62, -150, E.io3(reach));
    fr.line(34, -126, hx, hy, { w: 22, color: C.furB });                                                        // 胳膊
    fr.circle(hx, hy, 15, { fill: C.furC });
    if (o.token) token(fr, hx + 10, hy - 14, 20, { glint: o.glint || 0 });
    if (o.food) fr.g({ at: [hx + 8, hy - 18], rot: -.5 }, () => slice(fr, 0, 0, .55));
    /* 头：浅色的脸，深色的"帽子"——卷尾猴的名字就从这顶帽子来 */
    const chew = o.chew ? Math.max(0, Math.sin(o.chew * 14)) : 0;
    fr.circle(-4, -196, 18, { fill: C.cream });                                                                 // 耳朵
    fr.circle(-4, -196, 9, { fill: '#C9A57A' });
    fr.ellipse(40, -194, 50, 46, { fill: C.cream });
    fr.path('M -6,-206 C -6,-250 70,-262 84,-214 C 66,-226 40,-232 22,-214 C 12,-222 0,-218 -6,-206 Z', { fill: C.cap });
    fr.ellipse(70, -176 + chew * 3, 26, 20 + chew * 3, { fill: C.cream2 });                                     // 嘴巴一圈
    fr.circle(86, -184, 3.2, { fill: '#5A3A28' }); fr.circle(80, -182, 3.2, { fill: '#5A3A28' });             // 鼻孔
    const bl = o.blink ? 1 - o.blink : 1;
    fr.ellipse(58, -200, 8.5, 9 * bl, { fill: '#2A1A12' }); if (bl > .5) fr.circle(61, -203, 2.8, { fill: '#FFFFFF' });
    fr.path('M 50,-214 Q 60,-220 70,-214', { color: '#8A6A48', w: 3 });                                         // 眉
  });
}

/* ---------- 秤：一根立柱、一根横梁、两个吊盘。tilt > 0 = 右边（失去）沉下去。
 * L / R 是在盘子上画东西的函数 (fr, 盘心x, 盘心y)。o: { color, w, a, pan } ---------- */
function balance(fr, cx, cy, s, tilt, o = {}) {
  const col = o.color || '#C9A861', a = o.a == null ? 1 : o.a, len = 230, ang = clamp(tilt, -1, 1) * .32;
  fr.g({ at: [cx, cy], s, a }, () => {
    fr.line(0, -10, 0, 250, { w: 10, color: col }); fr.path('M -90,262 L 90,262 L 60,240 L -60,240 Z', { fill: col });
    fr.circle(0, -14, 16, { fill: col });
    const ex = Math.cos(ang) * len, ey = Math.sin(ang) * len;
    fr.line(-ex, -ey, ex, ey, { w: 9, color: col });
    for (const [px, py, side] of [[-ex, -ey, -1], [ex, ey, 1]]) {
      const panY = py + 150;
      fr.line(px, py, px - 70, panY, { w: 2.5, color: col, a: .85 }); fr.line(px, py, px + 70, panY, { w: 2.5, color: col, a: .85 });
      fr.path(`M ${px - 96},${panY} Q ${px},${panY + 52} ${px + 96},${panY} Z`, { fill: col });
      const fn = side < 0 ? o.L : o.R; if (fn) fn(fr, px, panY - 6);
    }
  });
}

/* ---------- 硬币：正面"正"、反面"反"。phase 是翻了多少（弧度），朝上的那面由 cos 的正负决定 ---------- */
function coin(fr, x, y, r, phase, a = 1) {
  const c = Math.cos(phase), sy = Math.max(.06, Math.abs(c)), heads = c >= 0;
  fr.g({ at: [x, y], a }, () => {
    fr.ellipse(0, r * .08, r, r * sy + r * .05, { fill: '#8E6A2F' });                 // 币的厚度
    fr.ellipse(0, 0, r, r * sy, { fill: heads ? '#E2C07A' : '#C9A861' });
    fr.ellipse(0, 0, r * .84, r * .84 * sy, { color: '#A8843F', w: r * .04 });
    if (sy > .25) fr.g({ s: [1, sy] }, () => fr.text(heads ? '正' : '反', 0, 0, { font: 'serifh', size: r * .9, color: '#7A5A22' }));
    fr.path(`M ${-r * .6},${-r * .5 * sy} Q ${-r * .1},${-r * .95 * sy} ${r * .5},${-r * .72 * sy}`, { color: '#FFF4D2', w: r * .06, a: .6 });
  });
}

/* ---------- 猴舍：外面实验室的墙 → 两个人的剪影 → 铁网和两个递食口 → 木板地 ---------- */
function room(fr, t, o = {}) {
  const x = fr.x, g = x.createLinearGradient(0, 0, 0, 800); g.addColorStop(0, C.lab); g.addColorStop(1, C.lab2); fr.rect(-200, -200, W + 400, 1100, { fill: g });
  fr.rect(-200, 160, W + 400, 6, { fill: '#8D9893', a: .5 });
  /* 两个人：只画身子（头在画外），左边蓝衣服，右边砖红衣服 */
  for (const [hx, col] of [[HATCH.L, C.sleeveL], [HATCH.R, C.sleeveR]]) {
    fr.path(`M ${hx - 210},900 L ${hx - 200},120 Q ${hx - 190},-40 ${hx},-60 Q ${hx + 190},-40 ${hx + 200},120 L ${hx + 210},900 Z`, { fill: col, a: .82 });
    fr.rect(hx - 40, -60, 80, 120, { fill: col, a: .5 });
  }
  /* 铁网：菱形格子，挖掉两个递食口 */
  x.save(); x.beginPath(); x.rect(-200, -200, W + 400, 1000);
  for (const hx of [HATCH.L, HATCH.R]) x.rect(hx - 150, HATCH.top, 300, HATCH.bot - HATCH.top);   // 两个洞
  x.clip('evenodd');
  fr.rect(-200, -200, W + 400, 1000, { fill: '#1E2220', a: .12 });
  for (let i = -30; i < 60; i++) { const px = i * 46; fr.line(px, -200, px + 900, 800, { w: 2.2, color: C.mesh, a: .55 }); fr.line(px + 900, -200, px, 800, { w: 2.2, color: C.mesh, a: .55 }); }
  x.restore();
  for (const px of [-40, 960, 1960]) fr.rect(px - 18, -200, 36, 1000, { fill: C.beam });
  fr.rect(-200, 60, W + 400, 26, { fill: C.beam });
  for (const hx of [HATCH.L, HATCH.R]) {
    fr.rect(hx - 156, HATCH.top - 8, 312, 10, { fill: C.beam }); fr.rect(hx - 158, HATCH.top - 8, 10, HATCH.bot - HATCH.top + 8, { fill: C.beam }); fr.rect(hx + 148, HATCH.top - 8, 10, HATCH.bot - HATCH.top + 8, { fill: C.beam });
  }
  /* 地 */
  fr.rect(-200, 700, W + 400, 500, { fill: C.floor }); fr.rect(-200, 700, W + 400, 10, { fill: C.floor2 });
  const r = rng(5); for (let i = 0; i < 140; i++) { const px = r() * (W + 300) - 150, py = 720 + r() * 360; fr.ellipse(px, py, 10 + r() * 14, 3 + r() * 3, { fill: r() < .5 ? C.floor2 : '#CFA772', rot: r() * 3, a: .8 }); }
  /* 两块搁板 */
  for (const hx of [HATCH.L, HATCH.R]) { fr.rect(hx - 180, HATCH.shelf, 360, 24, { r: 4, fill: C.shelf }); fr.rect(hx - 180, HATCH.shelf + 20, 360, 8, { fill: C.shelf2 }); }
}

/* ---------- 价签：挂在递食口上沿，"1 枚代币" ---------- */
function priceTag(fr, hx, k) {
  if (k <= 0) return; const sw = Math.sin((1 - k) * 9) * (1 - k) * .3;
  fr.g({ at: [hx, HATCH.top - 150], rot: sw, a: ss(k, 0, .3) }, () => {
    fr.line(-40, 0, -40, 40, { w: 2, color: '#2A2420' }); fr.line(40, 0, 40, 40, { w: 2, color: '#2A2420' });
    fr.rect(-110, 40, 220, 74, { r: 8, fill: '#F3EAD6' }); fr.rect(-110, 40, 220, 74, { r: 8, color: '#8A6440', w: 2 });
    token(fr, -66, 77, 22, {});
    fr.text('1 枚代币', 22, 79, { font: 'sansh', size: 32, color: '#3A2A22' });
  });
}

window.LA = { C, HATCH, slice, plate, token, arm, monkey, balance, coin, room, priceTag };
})();
