/* 《帶傘的人》的道具：人、傘、街道、辦公室、夜裡的房間、手機、想法烏雲、月曆格、紙卡、筆記本、雨。都是現畫的扁平插畫。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, rng, hash } = VK;

const C = {
  gold: '#EEC672', red: '#FC593F', ink: '#FFFAEB', navy: '#2E3A5A', navy2: '#1F2840', warmUmb: '#F2B33D',
  skin: '#F1C9A5', skin2: '#E0AC86', hairA: '#2E2420', hairB: '#6A4428',
  zheShirt: '#7D8FA6', zhePants: '#3E4A5E',
};

/* ---------- 一個人（正面站著）。o: { shirt, pants, hair, skin, mood(-1 皺眉 … 1 笑), umb(0 無 / 1 收著拿在手上 / 2 撐開), umbColor, walking, walk, a, sigh, shake } ---------- */
function person(fr, x, y, s, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return;
  const sw = o.walking ? Math.sin((o.walk || 0) * Math.PI * 2) : 0, bob = o.walking ? Math.abs(sw) * 6 : 0, shake = o.shake ? Math.sin(o.shake * 18) * 10 : 0;
  fr.ellipse(x, y + 4 * s, 90 * s, 14 * s, { fill: '#000', a: .18 * a });
  fr.g({ at: [x, y - bob * s], s, a }, () => {
    const sk = o.skin || C.skin, sh = o.shirt || C.zheShirt, pa = o.pants || C.zhePants;
    fr.rect(-44 + sw * 8, -240, 38, 240, { r: 12, fill: pa }); fr.rect(6 - sw * 8, -240, 38, 240, { r: 12, fill: pa });
    fr.ellipse(-26 + sw * 8, -4, 30, 12, { fill: '#2A2A2A' }); fr.ellipse(26 - sw * 8, -4, 30, 12, { fill: '#2A2A2A' });
    fr.path('M -92,-450 Q -100,-480 -60,-490 L 60,-490 Q 100,-480 92,-450 L 82,-230 L -82,-230 Z', { fill: sh });
    /* 手臂：右手（畫面左邊）拿傘 */
    const umb = o.umb || 0;
    fr.rect(-128, -470, 38, 210, { r: 18, fill: sh, rot: .1 }); fr.circle(-118, -258, 20, { fill: sk });
    if (umb === 2) { fr.rect(86, -500, 38, 170, { r: 18, fill: sh, rot: -.9 }); fr.circle(150, -560, 20, { fill: sk }); }
    else { fr.rect(90, -470, 38, 210, { r: 18, fill: sh, rot: -.1 }); fr.circle(118, -258, 20, { fill: sk }); }
    fr.rect(-22, -520, 44, 40, { fill: sk });
    fr.g({ at: [shake, 0] }, () => {
      fr.circle(0, -572, 60, { fill: sk });
      fr.path('M -62,-572 Q -68,-640 0,-642 Q 68,-640 62,-572 Q 54,-614 0,-616 Q -54,-614 -62,-572 Z', { fill: o.hair || C.hairA });
      const m = o.mood || 0, by = m < 0 ? -m * 4 : 0;
      fr.ellipse(-21, -572 + by, 6, 7, { fill: '#2A1E18' }); fr.ellipse(21, -572 + by, 6, 7, { fill: '#2A1E18' });
      if (m < -.2) { fr.line(-34, -596, -10, -588, { w: 4, color: '#5A3A28' }); fr.line(34, -596, 10, -588, { w: 4, color: '#5A3A28' }); }      // 皺眉
      const mc = -542, cv = m * 10;
      fr.path(`M -16,${mc} Q 0,${mc + cv} 16,${mc}`, { color: '#7A4A3A', w: 4 });
      if (m > .5) { fr.circle(-40, -552, 9, { fill: '#F08A7A', a: .45 }); fr.circle(40, -552, 9, { fill: '#F08A7A', a: .45 }); }
      if (o.sigh) { const k = o.sigh; fr.ellipse(30, -520 + k * 30, 14 + k * 20, 8 + k * 10, { fill: '#FFFFFF', a: .6 * (1 - k) }); }
    });
    if (umb === 1) closedUmbrella(fr, -118, -258, 1, o.umbColor || C.navy);
    if (umb === 2) openUmbrella(fr, 150, -560, 1, o.umbColor || C.navy, o.open == null ? 1 : o.open);
  });
}
/* 收著的傘：從手往下一根，手柄 J 形在上 */
function closedUmbrella(fr, hx, hy, s, col) {
  fr.g({ at: [hx, hy], s }, () => {
    fr.path('M 0,0 Q 0,-34 -24,-34 Q -40,-34 -40,-16', { color: '#5A3A22', w: 9 });
    fr.line(0, 0, 0, 250, { w: 6, color: '#5A5A60' });
    fr.path('M -8,20 Q -26,140 -6,236 L 6,236 Q 26,140 8,20 Z', { fill: col });
    fr.line(-4, 40, -10, 210, { w: 2, color: '#FFFFFF', a: .25 });
    fr.rect(-8, 70, 16, 10, { r: 3, fill: '#C9A861' });
  });
}
/* 撐開的傘：手在 (hx,hy)，傘面在上方。open 0..1 */
function openUmbrella(fr, hx, hy, s, col, open = 1) {
  const k = E.outBack(clamp(open)), r = 250 * k;
  fr.g({ at: [hx, hy], s }, () => {
    fr.line(0, 0, -60, -300, { w: 6, color: '#5A5A60' });
    if (r < 10) return;
    fr.g({ at: [-60, -300], rot: -.2 }, () => {
      let d = `M ${-r},0 Q ${-r},${-r * .95} 0,${-r * .95} Q ${r},${-r * .95} ${r},0`;
      for (let i = 0; i < 6; i++) { const x0 = r - i * r / 3, x1 = r - (i + 1) * r / 3; d += ` Q ${(x0 + x1) / 2},${-r * .14} ${x1},0`; }
      fr.path(d + ' Z', { fill: col });
      for (let i = 1; i < 6; i++) fr.path(`M 0,${-r * .95} Q ${-r + i * r / 3 - (i - 3) * 10},${-r * .5} ${-r + i * r / 3},0`, { color: '#000000', w: 2, a: .15 });
      fr.circle(0, -r * .97, 8, { fill: '#5A5A60' });
    });
  });
}

/* ---------- 街道：天空（晴 0…雨 1）、遠處樓房、騎樓柱子、人行道 ---------- */
function street(fr, t, o = {}) {
  const rain = o.rain || 0, x = fr.x;
  const g = x.createLinearGradient(0, 0, 0, 700);
  const top = rain ? lerpC('#7FB6E2', '#7C8794', rain) : '#7FB6E2', bot = rain ? lerpC('#CFE6F3', '#B5BCC4', rain) : '#CFE6F3';
  g.addColorStop(0, top); g.addColorStop(1, bot); fr.rect(-300, -300, W + 600, 1000, { fill: g });
  if (rain < .9) { fr.glow(1560, 170, 260, '#FFF1B8', .5 * (1 - rain)); fr.circle(1560, 170, 70, { fill: '#FFE68A', a: 1 - rain }); }
  if (o.rainbow) { for (const [r, c] of [[520, '#F28B82'], [495, '#F7C873'], [470, '#B7E08A'], [445, '#8FC3E8']]) fr.arc(1300, 760, r, Math.PI, Math.PI * 2, { color: c, w: 26, a: .55 * o.rainbow }); }
  const r0 = rng(17); for (let i = 0; i < 4; i++) { const cx = (r0() * W * 1.2 + t * 8 * (i + 1)) % (W + 400) - 200, cy = 90 + r0() * 160; cloud(fr, cx, cy, .8 + r0() * .5, lerpC('#FFFFFF', '#8A939E', rain), .9); }
  const blds = [[-200, 420, 300, '#C9B8A6'], [120, 360, 240, '#B9A898'], [380, 460, 280, '#D3C3B2'], [700, 330, 260, '#BCAE9E'], [980, 400, 300, '#CDBCA9'], [1300, 350, 260, '#C2B2A0'], [1580, 430, 320, '#D0BFAD'], [1900, 380, 300, '#BCAE9E']];
  for (const [bx, by, bw, bc] of blds) { fr.rect(bx, by, bw, 700 - by, { fill: lerpC(bc, '#8F959C', rain * .6) }); for (let wy = by + 30; wy < 640; wy += 70) for (let wx = bx + 30; wx < bx + bw - 40; wx += 70) fr.rect(wx, wy, 34, 40, { r: 3, fill: '#F2EADF', a: .55 }); }
  fr.rect(-300, 700, W + 600, 500, { fill: lerpC('#C9C2B6', '#8D8C88', rain) });
  fr.rect(-300, 700, W + 600, 14, { fill: '#A79F92' });
  for (let i = -3; i < 16; i++) fr.line(i * 160, 714, i * 160 - 120, 1200, { w: 2, color: '#A79F92', a: .6 });
  if (o.arcade) { const ax = o.arcade; fr.rect(ax - 40, 120, 80, 600, { fill: '#B07A5A' }); fr.rect(ax - 600, 80, 1300, 60, { fill: '#9A6A4C' }); fr.rect(ax + 560, 120, 80, 600, { fill: '#B07A5A' }); }
}
function lerpC(a, b, k) { const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16)); return '#' + pa.map((v, i) => Math.round(lerp(v, pb[i], clamp(k))).toString(16).padStart(2, '0')).join(''); }
function cloud(fr, x, y, s, col, a = 1) { fr.g({ at: [x, y], s, a }, () => { fr.ellipse(0, 0, 90, 40, { fill: col }); fr.circle(-40, -18, 40, { fill: col }); fr.circle(26, -30, 50, { fill: col }); fr.circle(70, -6, 34, { fill: col }); }); }
/* 雨：細長的雨絲，位置只由時間決定 */
function rain(fr, t, k, area = [-200, -200, W + 400, 1300]) {
  if (k <= 0) return; const n = Math.round(260 * k), x = fr.x; x.save(); x.strokeStyle = 'rgba(220,232,245,.55)'; x.lineWidth = 2; x.beginPath();
  for (let i = 0; i < n; i++) { const sp = 1400 + hash(i * 3.1) * 600, x0 = area[0] + hash(i * 7.7) * area[2], y0 = ((hash(i * 1.3) * area[3] + t * sp) % area[3]) + area[1]; x.moveTo(x0, y0); x.lineTo(x0 - 8, y0 + 34); }
  x.stroke(); x.restore();
}

/* ---------- 辦公室：牆、窗、兩張桌子 ---------- */
function office(fr, t, o = {}) {
  const x = fr.x, g = x.createLinearGradient(0, 0, 0, 700); g.addColorStop(0, '#E9E2D2'); g.addColorStop(1, '#D9CFBC'); fr.rect(-300, -300, W + 600, 1000, { fill: g });
  fr.rect(1240, 110, 520, 340, { r: 8, fill: '#8A7A66' }); fr.rect(1256, 126, 488, 308, { fill: '#BFDDF0' }); fr.rect(1256, 126, 488, 80, { fill: '#FFFFFF', a: .3 }); fr.line(1500, 126, 1500, 434, { w: 10, color: '#8A7A66' });
  fr.rect(160, 140, 260, 180, { r: 6, fill: '#F4EFE4' }); fr.rect(160, 140, 260, 180, { r: 6, color: '#B9AC96', w: 3 });
  for (let i = 0; i < 4; i++) fr.rect(190, 175 + i * 32, 140 + (i % 2) * 50, 12, { r: 4, fill: '#C9BFAE' });
  fr.rect(-300, 700, W + 600, 500, { fill: '#A99A86' }); fr.rect(-300, 700, W + 600, 10, { fill: '#8F806C' });
}
function desk(fr, x, y, s = 1) {
  fr.g({ at: [x, y], s }, () => {
    fr.rect(-220, -20, 440, 26, { r: 6, fill: '#8C6A4A' }); fr.rect(-200, 6, 30, 200, { fill: '#6E5238' }); fr.rect(170, 6, 30, 200, { fill: '#6E5238' });
    fr.rect(-90, -170, 180, 120, { r: 8, fill: '#2A2E36' }); fr.rect(-80, -160, 160, 100, { r: 4, fill: '#7FB3D6' }); fr.rect(-14, -50, 28, 30, { fill: '#2A2E36' });
  });
}
function trophy(fr, x, y, s, a) {
  if (a <= 0) return;
  fr.g({ at: [x, y], s: s * E.outBack(clamp(a)), a: clamp(a * 2) }, () => {
    fr.rect(-40, -10, 80, 22, { r: 4, fill: '#6E5238' });
    fr.path('M -50,-130 L 50,-130 Q 46,-50 0,-40 Q -46,-50 -50,-130 Z', { fill: '#E2C07A' });
    fr.path('M -50,-118 Q -86,-110 -70,-80 Q -60,-66 -40,-70', { color: '#E2C07A', w: 8 }); fr.path('M 50,-118 Q 86,-110 70,-80 Q 60,-66 40,-70', { color: '#E2C07A', w: 8 });
    fr.rect(-8, -42, 16, 34, { fill: '#C9A861' });
    fr.text('2', 0, -90, { font: 'sansh', size: 44, color: '#8A6420' });
  });
}

/* ---------- 夜裡的房間 ---------- */
function room(fr, t) {
  const x = fr.x, g = x.createLinearGradient(0, 0, 0, 760); g.addColorStop(0, '#2B3150'); g.addColorStop(1, '#3B3E5C'); fr.rect(-300, -300, W + 600, 1060, { fill: g });
  fr.rect(220, 120, 420, 320, { r: 8, fill: '#1E2238' }); fr.rect(236, 136, 388, 288, { fill: '#121630' });
  for (let i = 0; i < 22; i++) fr.circle(250 + hash(i) * 360, 150 + hash(i + 40) * 260, 1.8, { fill: '#FFFFFF', a: .5 + .4 * Math.sin(t * 2 + i) });
  fr.circle(540, 210, 34, { fill: '#F4EBC8' }); fr.circle(554, 200, 30, { fill: '#121630' });
  fr.line(430, 136, 430, 424, { w: 8, color: '#1E2238' });
  fr.rect(-300, 760, W + 600, 400, { fill: '#4A3A34' });
  fr.glow(1420, 300, 360, '#FFD9A0', .18); fr.path('M 1380,150 L 1460,150 L 1490,230 L 1350,230 Z', { fill: '#E8C98A' }); fr.line(1420, 230, 1420, 560, { w: 6, color: '#5A4A40' });
}
/* 泡麵：杯子 + 熱氣 */
function noodles(fr, x, y, s, t) {
  fr.g({ at: [x, y], s }, () => {
    fr.path('M -60,-90 L 60,-90 L 46,0 L -46,0 Z', { fill: '#F4EFE4' }); fr.rect(-60, -100, 120, 16, { r: 4, fill: '#D84A3A' });
    fr.path('M -40,-60 L 40,-60', { color: '#D84A3A', w: 8 }); fr.line(20, -100, 70, -170, { w: 5, color: '#C9A861' }); fr.line(30, -100, 84, -164, { w: 5, color: '#C9A861' });
    for (let i = 0; i < 3; i++) { const ph = t * 1.2 + i * 2.1; fr.path(`M ${-24 + i * 22},-110 Q ${-34 + i * 22 + Math.sin(ph) * 10},-150 ${-24 + i * 22},-190`, { color: '#FFFFFF', w: 4, a: .35 }); }
  });
}

/* ---------- 手機：外框 + 一個畫螢幕內容的函數 (fr, 寬, 高) ---------- */
function phone(fr, x, y, s, a, screen) {
  if (a <= 0) return;
  fr.g({ at: [x, y], s, a }, () => {
    fr.rect(-190, -360, 380, 720, { r: 46, fill: '#1A1A20' }); fr.rect(-172, -336, 344, 672, { r: 30, fill: '#F7F4EE' });
    fr.rect(-50, -326, 100, 18, { r: 9, fill: '#1A1A20' });
    const x0 = fr.x; x0.save(); x0.beginPath(); x0.roundRect ? x0.roundRect(-172, -336, 344, 672, 30) : x0.rect(-172, -336, 344, 672); x0.clip(); screen(fr, 344, 672); x0.restore();
  });
}
/* 聊天氣泡（在手機螢幕座標裡） */
function chat(fr, y, str, mine, a = 1) {
  if (a <= 0) return; const w = Math.min(300, fr.measure(str, { font: 'sans', size: 26 }) + 40), x = mine ? 160 - w : -160;
  fr.g({ a: clamp(a) }, () => { fr.rect(x, y - 30, w, 60, { r: 22, fill: mine ? '#9DE07A' : '#FFFFFF' }); if (!mine) fr.rect(x, y - 30, w, 60, { r: 22, color: '#D9D3C6', w: 2 }); fr.text(str, x + w / 2, y, { font: 'sans', size: 26, color: '#2A2420' }); });
}
/* 山頂夕陽照片 */
function sunsetPhoto(fr, x, y, w, h) {
  const xx = fr.x, g = xx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#F28B5B'); g.addColorStop(.6, '#F7C873'); g.addColorStop(1, '#F7D9A0'); fr.rect(x, y, w, h, { fill: g });
  fr.circle(x + w * .6, y + h * .55, w * .12, { fill: '#FFF1C8' });
  fr.path(`M ${x},${y + h} L ${x + w * .3},${y + h * .5} L ${x + w * .55},${y + h * .8} L ${x + w * .8},${y + h * .45} L ${x + w},${y + h * .7} L ${x + w},${y + h} Z`, { fill: '#6A4A5A' });
  for (let i = 0; i < 3; i++) { const px = x + w * (.25 + i * .08), py = y + h * .62; fr.circle(px, py - 18, 8, { fill: '#3A2A30' }); fr.rect(px - 7, py - 10, 14, 24, { r: 5, fill: '#3A2A30' }); fr.line(px, py - 8, px + (i - 1) * 12, py - 34, { w: 4, color: '#3A2A30' }); }
}

/* ---------- 想法烏雲：一朵灰雲 + 裡面一個小圖示（0 雨 / 1 車 / 2 扭到腳 / 3 叉叉） ---------- */
function worry(fr, x, y, s, kind, a, t = 0) {
  if (a <= 0) return;
  fr.g({ at: [x, y + Math.sin(t * 2 + kind) * 6], s: s * (.5 + .5 * E.outBack(clamp(a))), a: clamp(a) }, () => {
    fr.circle(-46, 70, 9, { fill: '#5A6270' }); fr.circle(-30, 52, 13, { fill: '#5A6270' });
    fr.ellipse(0, 0, 110, 58, { fill: '#5A6270' }); fr.circle(-50, -24, 46, { fill: '#5A6270' }); fr.circle(26, -40, 56, { fill: '#5A6270' }); fr.circle(78, -8, 40, { fill: '#5A6270' });
    if (kind === 0) for (let i = 0; i < 4; i++) fr.line(-36 + i * 24, 6, -46 + i * 24, 36, { w: 5, color: '#9FC6EA' });
    if (kind === 1) { fr.rect(-40, -16, 80, 30, { r: 10, fill: C.red }); fr.rect(-24, -34, 46, 22, { r: 8, fill: C.red }); fr.circle(-22, 16, 9, { fill: '#2A2A2A' }); fr.circle(22, 16, 9, { fill: '#2A2A2A' }); fr.text('…', 70, -30, { font: 'sansh', size: 30, color: '#FFFFFF' }); }
    if (kind === 2) { fr.path('M -14,-40 L 14,-40 L 14,10 L 40,10 L 40,30 L -14,30 Z', { fill: C.skin }); fr.rect(-16, -10, 32, 18, { fill: '#FFFFFF' }); fr.text('！', 50, -24, { font: 'sansh', size: 34, color: C.red }); }
    if (kind === 3) { fr.line(-26, -26, 26, 26, { w: 9, color: C.red }); fr.line(26, -26, -26, 26, { w: 9, color: C.red }); }
  });
}

/* ---------- 紙卡：一句話，可以換掉其中一個詞（swap 0..1） ---------- */
function wordCard(fr, x, y, w, pre, oldW, newW, post, swap, a, rot = 0) {
  if (a <= 0) return;
  fr.g({ at: [x, y], rot, a: clamp(a), s: .85 + .15 * E.outBack(clamp(a)) }, () => {
    fr.rect(-w / 2 + 8, -70 + 10, w, 140, { r: 8, fill: '#000', a: .25 });
    fr.rect(-w / 2, -70, w, 140, { r: 8, fill: '#E9E0CF' });
    const o = { font: 'sansh', size: 46 };
    const wPre = fr.measure(pre, o), wPost = fr.measure(post, o), wOld = fr.measure(oldW, o), wNew = fr.measure(newW, o), wMid = lerp(wOld, wNew, E.io3(swap));
    let cx = -(wPre + wMid + wPost) / 2;
    fr.text(pre, cx, 0, Object.assign({ color: '#3A2A22', align: 'l' }, o)); cx += wPre;
    if (swap < 1) { fr.text(oldW, cx + wMid / 2, -40 * E.in2(swap), Object.assign({ color: '#C8402A', a: 1 - ss(swap, .2, .6) }, o)); if (swap > .3) fr.line(cx, -2, cx + wOld, -2, { w: 5, color: '#C8402A', a: (1 - ss(swap, .5, .8)) }); }
    if (swap > .3) fr.text(newW, cx + wMid / 2, 40 * (1 - E.out3(seg(swap, .3, 1))), Object.assign({ color: '#B07A10', a: ss(swap, .3, .7) }, o));
    cx += wMid; fr.text(post, cx, 0, Object.assign({ color: '#3A2A22', align: 'l' }, o));
  });
}

/* ---------- 筆記本：三行字一行一行寫出來（k 0..3） ---------- */
function notebook(fr, x, y, k, lines, a) {
  if (a <= 0) return;
  fr.g({ at: [x, y], a: clamp(a), rot: -.02 }, () => {
    fr.rect(-380, -260, 760, 520, { r: 10, fill: '#000', a: .25 });
    fr.rect(-390, -270, 760, 520, { r: 10, fill: '#F7F2E6' });
    for (let i = 0; i < 7; i++) fr.line(-350, -170 + i * 64, 340, -170 + i * 64, { w: 2, color: '#B9CCE0', a: .7 });
    fr.line(-300, -270, -300, 250, { w: 2, color: '#E8A0A0', a: .8 });
    fr.text('今天的三件好事', -260, -210, { font: 'sansm', size: 36, color: '#5A4634', align: 'l' });
    lines.forEach((ln, i) => { const kk = clamp(k - i); if (kk <= 0) return; const cs = Array.from(ln), n = Math.ceil(cs.length * kk);
      fr.text(`${i + 1}. ` + cs.slice(0, n).join(''), -260, -120 + i * 110, { font: 'sans', size: 40, color: '#2A3A6A', align: 'l' }); });
  });
}

window.UM = { C, person, closedUmbrella, openUmbrella, street, cloud, rain, office, desk, trophy, room, noodles, phone, chat, sunsetPhoto, worry, wordCard, notebook, lerpC };
})();
