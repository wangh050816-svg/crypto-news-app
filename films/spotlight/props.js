/* 《聚光燈效應》的道具：教室、學生、穿 T 恤的人、聚光燈、座位圖、想法泡泡。都是現畫的扁平插畫。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, rng } = VK;

const C = {
  gold: '#EEC672', red: '#FC593F', ink: '#FFFAEB',
  wall: '#E6D9BE', wall2: '#D6C6A6', floor: '#B98F5E', floor2: '#A57C4D', win: '#A9C6D6', winF: '#8A6A48',
  desk: '#9C7148', desk2: '#7E5838', paper: '#F7F2E6',
  skin: ['#F1C9A5', '#E0AC86', '#C98F67', '#F5D3B5'], hair: ['#2E2420', '#5A3A26', '#1E1A1A', '#8A5A30', '#3A2A20'],
  shirts: ['#6E8FB5', '#8BAF8A', '#C98A6B', '#A68BB8', '#D4B060', '#7FA8A8', '#B5726E', '#8C9BA8'],
  tee: '#FFD84A', door: '#8A5E3A', door2: '#6E4A2C',
};

/* 12 個座位：三排，後排小、前排大。返回 [{ x, y, s, i }] */
const SEATS = (() => { const out = []; const rows = [[610, .98, 810, 200], [820, 1.22, 700, 216]];        // 兩排各 6 人，前後錯開半格
  rows.forEach(([y, s, x0, dx]) => { for (let c = 0; c < 6; c++) out.push({ x: x0 + c * dx, y, s, i: out.length }); });
  return out; })();

/* ---------- 教室：後牆、窗、黑板邊、地板、門 ---------- */
function room(fr, t, o = {}) {
  const x = fr.x, g = x.createLinearGradient(0, 0, 0, 640); g.addColorStop(0, C.wall); g.addColorStop(1, C.wall2); fr.rect(-300, -300, W + 600, 940, { fill: g });
  for (const wx of [820, 1240, 1660]) { fr.rect(wx - 130, 120, 260, 230, { r: 6, fill: C.winF }); fr.rect(wx - 116, 134, 232, 202, { fill: C.win }); fr.line(wx, 134, wx, 336, { w: 8, color: C.winF }); fr.line(wx - 116, 235, wx + 116, 235, { w: 8, color: C.winF }); fr.rect(wx - 116, 134, 232, 60, { fill: '#FFFFFF', a: .25 }); }
  fr.rect(-300, 600, W + 600, 40, { fill: '#C9B590' });
  const fg = x.createLinearGradient(0, 640, 0, H); fg.addColorStop(0, C.floor2); fg.addColorStop(1, C.floor); fr.rect(-300, 640, W + 600, 800, { fill: fg });
  for (let i = -6; i < 20; i++) fr.line(i * 160, 640, i * 160 - 260, H + 300, { w: 2, color: C.floor2, a: .5 });
  /* 門：左邊；open 0..1 */
  const op = o.door || 0;
  fr.rect(90, 200, 300, 440, { fill: '#3A2A20' });
  fr.rect(104, 214, 272 * (1 - .8 * op), 426, { fill: C.door }); fr.rect(104 + 272 * (1 - .8 * op) - 14, 214, 14, 426, { fill: C.door2 });
  if (op < .6) fr.circle(104 + 272 * (1 - .8 * op) - 40, 430, 10, { fill: '#D9B45A' });
  fr.rect(76, 190, 328, 16, { fill: C.door2 });
}

/* ---------- 一張書桌（前板），學生的上半身在它後面 ---------- */
function desk(fr, x, y, s) {
  fr.g({ at: [x, y], s }, () => {
    fr.rect(-120, -14, 240, 20, { r: 4, fill: C.desk });
    fr.rect(-110, 6, 220, 90, { fill: C.desk2 });
    fr.rect(-30, -20, 70, 10, { fill: C.paper, rot: -.05 });
  });
}
/* ---------- 一個學生：look -1 看左邊（門口那人）… 0 低頭看卷子；bubble 是頭上的想法（函數） ---------- */
function student(fr, x, y, s, i, o = {}) {
  const look = o.look || 0, sk = C.skin[i % 4], hr = C.hair[(i * 3) % 5], sh = C.shirts[i % 8];
  const down = 1 - Math.abs(look);
  fr.g({ at: [x, y], s }, () => {
    fr.path('M -70,0 Q -70,-90 0,-96 Q 70,-90 70,0 Z', { fill: sh });                          // 肩膀
    fr.g({ at: [look * 8, -128 + down * 6], rot: look * .12 }, () => {
      fr.circle(0, 0, 42, { fill: sk });
      fr.path(i % 2 ? 'M -44,-4 Q -46,-50 0,-50 Q 46,-50 44,-4 Q 30,-30 0,-30 Q -30,-30 -44,-4 Z' : 'M -44,6 Q -50,-52 0,-52 Q 50,-52 44,6 Q 40,-20 10,-26 Q -30,-24 -44,6 Z', { fill: hr });
      const ex = look * 14, ey = 2 + down * 8;
      fr.ellipse(-15 + ex, ey, 5, down > .7 ? 2.5 : 5.5, { fill: '#2A1E18' }); fr.ellipse(15 + ex, ey, 5, down > .7 ? 2.5 : 5.5, { fill: '#2A1E18' });
      if (o.mouth) fr.ellipse(ex * .6, 22, 6, 4, { fill: '#7A4A3A' });
    });
  });
  desk(fr, x, y + 4 * s, s);
}

/* ---------- 穿丟臉 T 恤的人（正面站著）。walk 0..1 走路相位；a 透明度 ---------- */
function wearer(fr, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return; const sw = Math.sin((o.walk || 0) * Math.PI * 2) * (o.walking ? 1 : 0);
  fr.ellipse(x, y + 4 * s, 80 * s, 14 * s, { fill: '#000', a: .2 * a });
  fr.g({ at: [x, y], s, a }, () => {
    fr.rect(-44 + sw * 6, -230, 36, 230, { r: 12, fill: '#3E4E6A' }); fr.rect(8 - sw * 6, -230, 36, 230, { r: 12, fill: '#3E4E6A' });   // 腿
    fr.ellipse(-26 + sw * 6, -4, 30, 12, { fill: '#2A2A2A' }); fr.ellipse(26 - sw * 6, -4, 30, 12, { fill: '#2A2A2A' });
    fr.path('M -92,-440 Q -100,-470 -60,-480 L 60,-480 Q 100,-470 92,-440 L 80,-220 L -80,-220 Z', { fill: C.tee });   // T 恤
    fr.rect(-118, -470, 40, 120, { r: 18, fill: C.tee, rot: .2 }); fr.rect(78, -470, 40, 120, { r: 18, fill: C.tee, rot: -.2 });
    fr.rect(-128, -360, 34, 130, { r: 16, fill: C.skin[0], rot: .12 }); fr.rect(94, -360, 34, 130, { r: 16, fill: C.skin[0], rot: -.12 });
    tee(fr, 0, -340, 1);
    fr.rect(-22, -510, 44, 40, { fill: C.skin[0] });
    fr.circle(0, -560, 58, { fill: C.skin[0] });
    fr.path('M -60,-560 Q -66,-626 0,-628 Q 66,-626 60,-560 Q 50,-600 0,-602 Q -50,-600 -60,-560 Z', { fill: C.hair[1] });
    const look = o.look || 0, wide = o.nervous || 0;
    fr.ellipse(-20 + look * 8, -560, 6, 7 + wide * 3, { fill: '#2A1E18' }); fr.ellipse(20 + look * 8, -560, 6, 7 + wide * 3, { fill: '#2A1E18' });
    fr.path(wide > .3 ? 'M -14,-526 Q 0,-534 14,-526' : 'M -14,-530 Q 0,-522 14,-530', { color: '#7A4A3A', w: 4 });
    if (wide > .3) { fr.circle(-40, -540, 8, { fill: '#F08A7A', a: .6 * wide }); fr.circle(40, -540, 8, { fill: '#F08A7A', a: .6 * wide }); fr.path('M 62,-600 Q 70,-584 62,-572 Q 54,-584 62,-600 Z', { fill: '#8FC3E8', a: wide }); }
  });
}
/* T 恤上的圖：一位過氣歌手的大頭像（捲髮、大笑、閃光），丟臉就在這裡 */
function tee(fr, x, y, s) {
  fr.g({ at: [x, y], s }, () => {
    fr.circle(0, 0, 70, { fill: '#F06A9A' });
    fr.circle(0, -6, 44, { fill: '#F3C9A2' });
    for (let i = 0; i < 9; i++) { const an = Math.PI * (1.05 + i * .11); fr.circle(Math.cos(an) * 46, -10 + Math.sin(an) * 46, 16, { fill: '#7A4A26' }); }
    fr.ellipse(-14, -10, 5, 6, { fill: '#2A1E18' }); fr.ellipse(14, -10, 5, 6, { fill: '#2A1E18' });
    fr.path('M -20,10 Q 0,32 20,10 Z', { fill: '#C83A4A' });
    for (const [sx, sy] of [[-62, -52], [58, -46], [64, 40]]) fr.path(`M ${sx},${sy - 14} L ${sx + 4},${sy - 4} L ${sx + 14},${sy} L ${sx + 4},${sy + 4} L ${sx},${sy + 14} L ${sx - 4},${sy + 4} L ${sx - 14},${sy} L ${sx - 4},${sy - 4} Z`, { fill: '#FFFFFF' });
    fr.text('♥ ♥ ♥', 0, 92, { font: 'sansh', size: 26, color: '#E0457A' });
  });
}

/* ---------- 聚光燈：從上方打下來的一道光錐 + 地上一圈亮 ---------- */
function spotlight(fr, x, yFloor, w, k, o = {}) {
  if (k <= 0) return; const top = o.top == null ? -60 : o.top, col = o.color || '#FFE9A8', xx = fr.x;
  xx.save(); xx.globalCompositeOperation = 'lighter';
  const g = xx.createLinearGradient(0, top, 0, yFloor); g.addColorStop(0, `rgba(255,236,170,${.30 * k})`); g.addColorStop(1, `rgba(255,236,170,${.12 * k})`);
  xx.fillStyle = g; xx.beginPath(); xx.moveTo(x - w * .12, top); xx.lineTo(x + w * .12, top); xx.lineTo(x + w, yFloor); xx.lineTo(x - w, yFloor); xx.closePath(); xx.fill();
  xx.restore();
  fr.ellipse(x, yFloor, w, w * .16, { fill: col, a: .35 * k, add: true });
  if (o.lamp !== false) { fr.rect(x - 34, top - 40, 68, 46, { r: 8, fill: '#2A2A30', a: k }); fr.ellipse(x, top + 6, 30, 8, { fill: '#FFF4CC', a: k }); }
}

/* ---------- 座位圖：12 顆頭，lit 個亮金色。標題 + 百分比 ---------- */
function seatGrid(fr, cx, cy, lit, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return;
  fr.g({ a }, () => {
    fr.rect(cx - 260, cy - 210, 520, 420, { r: 22, fill: '#14100C', a: .86 });
    fr.text(o.title, cx, cy - 160, { font: 'sansm', size: 36, color: '#E9DFC8' });
    for (let i = 0; i < 12; i++) {
      const r = Math.floor(i / 4), c = i % 4, px = cx - 165 + c * 110, py = cy - 70 + r * 88, on = i < lit;
      if (on) fr.glow(px, py, 60, C.gold, .25);
      fr.circle(px, py - 12, 22, { fill: on ? C.gold : '#5A524A' });
      fr.path(`M ${px - 32},${py + 32} Q ${px - 30},${py + 6} ${px},${py + 6} Q ${px + 30},${py + 6} ${px + 32},${py + 32} Z`, { fill: on ? C.gold : '#5A524A' });
    }
    fr.text(o.value, cx, cy + 178, { font: 'sansh', size: 46, color: o.valueColor || C.gold });
  });
}

/* ---------- 想法泡泡：頭上一朵雲，裡面一個小圖示（頭髮 / 痘痘 / 卷子 / 手機） ---------- */
function bubble(fr, x, y, s, kind, a) {
  if (a <= 0) return;
  fr.g({ at: [x, y], s: s * (.6 + .4 * E.outBack(clamp(a))), a: clamp(a) }, () => {
    fr.circle(-30, 52, 8, { fill: '#FFFFFF' }); fr.circle(-18, 34, 12, { fill: '#FFFFFF' });
    fr.ellipse(0, 0, 70, 46, { fill: '#FFFFFF' });
    if (kind === 0) { for (let i = 0; i < 4; i++) fr.path(`M ${-26 + i * 16},18 Q ${-36 + i * 16},-4 ${-22 + i * 16},-24`, { color: '#5A3A26', w: 5 }); fr.text('！', 30, 0, { font: 'sansh', size: 34, color: C.red }); }
    if (kind === 1) { fr.circle(0, 0, 28, { fill: C.skin[0] }); fr.circle(10, 6, 7, { fill: C.red }); fr.ellipse(-10, -6, 3, 4, { fill: '#2A1E18' }); }
    if (kind === 2) { fr.rect(-22, -28, 44, 56, { r: 4, fill: '#F7F2E6' }); fr.rect(-22, -28, 44, 56, { r: 4, color: '#8A7A60', w: 2 }); fr.text('?', 0, 2, { font: 'sansh', size: 34, color: '#C8402A' }); }
    if (kind === 3) { fr.rect(-18, -30, 36, 60, { r: 6, fill: '#2A2A30' }); fr.rect(-13, -22, 26, 40, { fill: '#8FC3E8' }); fr.text('…', 0, -4, { font: 'sansh', size: 22, color: '#FFFFFF' }); }
  });
}

window.SP = { C, SEATS, room, desk, student, wearer, tee, spotlight, seatGrid, bubble };
})();
