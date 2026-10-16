/* 《帶傘的人》 · B 寓言 · 約 128 秒。一個悲觀的人和他的傘；結尾給三個改變的方法。
 * 故事是虛構的（阿哲、三年只用到幾次傘都是示意）。
 * 心理學：M. E. P. Seligman《Learned Optimism》(1990)：悲觀的解釋風格把壞事看成永久、全面、個人的。
 *   「三件好事」練習：Seligman, Steen, Park & Peterson, "Positive Psychology Progress", American Psychologist 60(5), 2005。 */
(function () {
'use strict';
const { W, H, clamp, lerp, seg, ss, E, fade } = VK;
const K = VKit, U = window.UM, C = U.C;

const T = { title: 53.6, end: 128.0 };
const sub = (a, b, zh, o = {}) => Object.assign({ a, b, zh }, o);
const SUBS = [
  sub(.5, 4.0, '阿哲每天出門，都帶著一把傘'),
  sub(4.4, 8.0, '就算天氣預報說，今天是大晴天'),
  sub(8.4, 11.8, '「萬一下雨呢？」'),
  sub(12.6, 16.2, '同事約他一起參加提案比賽'),
  sub(16.6, 20.2, '「一定選不上，何必浪費時間。」'),
  sub(20.6, 24.2, '後來，同事拿了{第二名}'),
  sub(24.6, 28.2, '他鬆了口氣：還好我沒去'),
  sub(29.0, 32.6, '朋友約他，週末去爬山'),
  sub(33.0, 36.6, '他想到：{!塞車、下雨、扭到腳}'),
  sub(37.0, 40.6, '「你們去就好。」'),
  sub(41.0, 44.6, '晚上，他滑著山頂的夕陽，吃泡麵'),
  sub(45.0, 48.6, '悲觀的人，永遠不會失望'),
  sub(49.0, 52.8, '但也，永遠不會{驚喜}'),
  sub(62.0, 65.6, '他帶了三年的傘，一千多天'),
  sub(66.0, 69.6, '真正用到的，一隻手數得出來'),
  sub(70.0, 73.6, '躲掉失望的同時，也躲掉了驚喜'),
  sub(74.4, 78.0, '心理學家塞利格曼發現'),
  sub(78.4, 82.0, '悲觀的人，常把壞事想成「{!永遠}」'),
  sub(82.4, 86.0, '試著，只改一個詞'),
  sub(86.4, 90.0, '壞事，就只是{這一次}'),
  sub(90.4, 94.0, '每天睡前，寫下三件好事'),
  sub(94.4, 98.0, '不等有信心，先做一件小事'),
  sub(98.4, 102.0, '帶傘可以，別因為怕下雨就不出門', { tone: 'gold' }),
  sub(102.4, 106.0, '那天，他第一次沒帶傘出門'),
  sub(106.4, 110.0, '中午，果然下起了小雨'),
  sub(110.4, 114.0, '旁邊的人笑著說：要不要一起撐？'),
  sub(114.4, 118.0, '壞事會發生，好事也會'),
  sub(118.4, 122.4, '只要你，願意走出門', { tone: 'gold' }),
];

/* 每個場景：[開始, 結束, 函數]，相鄰場景重疊 0.6 秒交叉淡入淡出 */
const SC = { street1: [0, 12.4], office: [12.2, 28.6], night: [28.4, 53.4], cal: [61.0, 74.2], psy: [74.0, 90.3], tips: [90.2, 102.3], street2: [102.2, 123.4] };
const vis = (t, k) => fade(t, SC[k][0], SC[k][1], .6, .6);
function cam(fr, s, fx, fy, fn) { fr.g({ at: [W / 2, H / 2], s }, () => fr.g({ at: [-fx, -fy] }, fn)); }

/* ---------- 1. 晴天的街上，他拿著傘走出來 ---------- */
function street1(fr, t) {
  const a = vis(t, 'street1'); if (a <= 0) return;
  fr.g({ a }, () => cam(fr, lerp(1, 1.08, seg(t, 0, 12)), 900, 560, () => {
    U.street(fr, t, {});
    const x = lerp(-120, 760, E.out3(seg(t, .3, 4.0)));
    U.person(fr, x, 930, .9, { umb: 1, walking: t < 4.0, walk: t * 1.5, mood: t > 8.4 ? -.4 : 0 });
    /* 天氣預報：手機上一個大太陽 */
    U.phone(fr, 1240, 430, .55, fade(t, 4.5, 12.4, .4, .5), (fr) => { fr.rect(-172, -336, 344, 672, { fill: '#8FC8EE' }); fr.circle(0, -80, 90, { fill: '#FFD84A' }); fr.glow(0, -80, 180, '#FFE68A', .5); fr.text('晴', 0, 90, { font: 'sansh', size: 80, color: '#FFFFFF' }); fr.text('降雨機率 0%', 0, 180, { font: 'sansm', size: 34, color: '#FFFFFF' }); });
    U.worry(fr, x + 230, 300, 1.1, 0, ss(t, 8.6, 9.2), t);
  }));
}
/* ---------- 2. 辦公室 ---------- */
function officeScene(fr, t) {
  const a = vis(t, 'office'); if (a <= 0) return;
  fr.g({ a }, () => cam(fr, 1, 960, 540, () => {
    U.office(fr, t);
    U.desk(fr, 560, 760); U.desk(fr, 1380, 760);
    U.trophy(fr, 1500, 744, 1, seg(t, 20.8, 21.6));
    const cx = lerp(1700, 1080, E.io3(seg(t, 12.6, 14.2)));
    U.person(fr, cx, 960, .82, { shirt: '#C98A6B', pants: '#4A4A52', hair: C.hairB, mood: t > 20.6 ? .9 : .6, walking: t > 12.6 && t < 14.2, walk: t * 1.5 });
    U.person(fr, 400, 960, .82, { umb: 1, mood: t > 16.4 && t < 24.4 ? -.6 : t > 24.6 ? .1 : 0, shake: t > 16.8 && t < 17.8 ? t : 0, sigh: seg(t, 24.8, 26.2) * (t < 26.2 ? 1 : 0) });
    /* 同事手上的傳單 */
    const kf = fade(t, 13.4, 20.4, .4, .4);
    if (kf > 0) fr.g({ a: kf, at: [900, 420], rot: -.06 }, () => { fr.rect(-120, -150, 240, 300, { r: 6, fill: '#FFFFFF' }); fr.rect(-120, -150, 240, 90, { r: 6, fill: '#F2B33D' }); fr.text('提案比賽', 0, -104, { font: 'sansh', size: 40, color: '#FFFFFF' }); for (let i = 0; i < 4; i++) fr.rect(-90, -20 + i * 40, 180 - (i % 2) * 50, 14, { r: 6, fill: '#D9D3C6' }); });
    U.worry(fr, 560, 280, 1.15, 3, fade(t, 16.8, 20.4, .3, .5), t);
    if (t > 20.8) for (let i = 0; i < 26; i++) { const k = seg(t, 20.8 + (i % 7) * .05, 23.5), px = 1500 + Math.sin(i * 2.3) * 260 * k, py = 560 - 260 * Math.sin(k * Math.PI) + 300 * k * k; if (k > 0 && k < 1) fr.rect(px, py, 12, 18, { fill: ['#F28B82', '#F7C873', '#8FC3E8', '#B7E08A'][i % 4], a: 1 - k }); }
    const kr = fade(t, 25.0, 28.6, .4, .4);
    if (kr > 0) { fr.rect(420, 300, 330, 80, { r: 22, fill: '#FFFFFF', a: .9 * kr }); fr.text('還好我沒去…', 585, 340, { font: 'sansm', size: 36, color: '#3A2A22', a: kr }); }
  }));
}
/* ---------- 3. 夜裡的房間：手機上的邀約、三朵烏雲、山頂夕陽、泡麵 ---------- */
function night(fr, t) {
  const a = vis(t, 'night'); if (a <= 0) return;
  const dim = ss(t, 45.0, 51.5);                                          // 片名前：房間暗下去，只剩那把傘
  fr.g({ a }, () => cam(fr, lerp(1, 1.06, seg(t, 28.4, 45)), 960, 540, () => {
    U.room(fr, t);
    fr.rect(160, 720, 900, 30, { r: 6, fill: '#6E5238' });
    U.person(fr, 560, 1160, .9, { umb: 0, mood: t > 41 ? -.5 : -.2 });
    U.closedUmbrella(fr, 1000, 470, 1.15, C.navy);
    U.noodles(fr, 860, 716, 1, t);
    const kp = fade(t, 29.2, 45.4, .4, .5);
    U.phone(fr, 1420, 470, .82, kp, (fr) => {
      fr.rect(-172, -336, 344, 90, { fill: '#EDE7DB' }); fr.text('爬山小隊（4）', 0, -282, { font: 'sansm', size: 28, color: '#3A2A22' });
      U.chat(fr, -180, '週末去爬山？', false, ss(t, 29.4, 29.8));
      U.chat(fr, -100, '你們去就好。', true, ss(t, 38.0, 38.4));
      if (t > 41.0) { const k = ss(t, 41.0, 41.6); fr.g({ a: k }, () => { U.sunsetPhoto(fr, -150, -20, 300, 220); fr.text('山頂好美！', 0, 236, { font: 'sans', size: 26, color: '#3A2A22' }); }); }
    });
    for (let i = 0; i < 3; i++) U.worry(fr, 300 + i * 260, 260 - (i % 2) * 40, .9, [1, 0, 2][i], fade(t, 33.2 + i * .5, 40.6, .3, .5), t);
  }));
  if (dim > 0) {
    fr.rect(0, 0, W, H, { fill: '#0B0806', a: .92 * dim * a });
    const k = ss(t, 49.0, 52.6), ux = lerp(lerp(W / 2 + (1000 - 960) * 1.05, W / 2, k), W / 2, 0), uy = lerp(520, 470, k);
    fr.glow(ux, uy + 120, 320, '#FFE9A8', .35 * dim);
    U.closedUmbrella(fr, ux, uy, 1.15 + .3 * k, C.navy);
  }
}
/* ---------- 片名：傘在暗裡，片名在它上方浮出來 ---------- */
function title(fr, t) {
  const lt = t - T.title, a = ss(t, 52.6, 53.6) * (1 - ss(t, 60.6, 61.4)); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#0B0806', a });
  fr.g({ a }, () => { fr.glow(W / 2, 640, 320, '#FFE9A8', .3); U.closedUmbrella(fr, W / 2, 520, 1.45, C.navy); });
  K.titleGilt(fr, lt, { la: 'THE MAN WITH THE UMBRELLA', zh: '帶傘的人', tag: '最壞的事，其實很少發生', a, cy: 300, size: 160, tagDy: 140, rays: 0, specks: .25 });
}
/* ---------- 4. 三年的月曆：一千多天，只用到幾次傘 ---------- */
const RAINY = [137, 402, 611, 850, 1013];
function calendar(fr, t) {
  const a = vis(t, 'cal'); if (a <= 0) return;
  fr.g({ a }, () => {
    fr.rect(0, 0, W, H, { fill: '#1A1824' });
    const cols = 45, rows = 25, cw = 30, x0 = W / 2 - cols * cw / 2, y0 = 120, n = Math.floor(1095 * E.io3(seg(t, 62.2, 65.4)));
    for (let i = 0; i < Math.min(n, cols * rows); i++) {
      const r = Math.floor(i / cols), c = i % cols, rainy = RAINY.includes(i) && t > 66.2;
      fr.rect(x0 + c * cw, y0 + r * cw, cw - 6, cw - 6, { r: 4, fill: rainy ? '#5AA6E8' : '#E9DFC8', a: rainy ? 1 : (t > 66.2 ? .35 : .8) });
      if (rainy) fr.glow(x0 + c * cw + 12, y0 + r * cw + 12, 50, '#5AA6E8', .5 * ss(t, 66.2, 67));
    }
    fr.text(`${Math.min(n, 1095)} 天`, W / 2 - 280, 70, { font: 'sansh', size: 46, color: C.ink, a: ss(t, 62.2, 62.6) });
    if (t > 66.4) fr.text('真正下雨：5 天', W / 2 + 260, 70, { font: 'sansh', size: 46, color: '#7FC0F2', a: ss(t, 66.4, 67) });
    U.closedUmbrella(fr, 160, 380, 1.1, C.navy);
    const ke = fade(t, 70.2, 74.2, .4, .4); if (ke > 0) fr.text('（故事示意）', W - 140, 840 - 34, { font: 'sans', size: 24, color: '#8A8478', a: ke });
  });
}
/* ---------- 5. 心理學：三張紙卡，各改一個詞 ---------- */
function psych(fr, t) {
  const a = vis(t, 'psy'); if (a <= 0) return;
  fr.g({ a }, () => {
    fr.rect(0, 0, W, H, { fill: '#2A2430' });
    const kn = fade(t, 74.6, 90.2, .4, .4);
    if (kn > 0) { fr.text('Martin Seligman · 《學習樂觀》1990 · 解釋風格', W / 2, 90, { font: 'sansm', size: 30, color: '#D8CFBF', a: kn }); }
    const cards = [['我', '永遠', '這次', '都這麼倒楣'], ['我', '什麼都', '這件事', '做不好'], ['', '都是我太爛', '這次運氣不好', '']];
    cards.forEach((c, i) => {
      const k = ss(t, 78.6 + i * .35, 79.1 + i * .35), sw = seg(t, 86.6 + i * .5, 87.6 + i * .5);
      U.wordCard(fr, W / 2 + (i - 1) * 20, 300 + i * 170, 760, c[0], c[1], c[2], c[3], sw, k, (i - 1) * .02);
    });
    const ktag = fade(t, 79.6, 90.2, .4, .4);
    if (ktag > 0) ['永久', '全面', '怪自己'].forEach((s, i) => fr.text(s, W / 2 - 480, 300 + i * 170, { font: 'sansm', size: 30, color: t > 87 + i * .5 ? C.gold : '#F0705A', a: ktag }));
  });
}
/* ---------- 6. 三個方法：筆記本、先回一句「好」、帶傘出門 ---------- */
function tips(fr, t) {
  const a = vis(t, 'tips'); if (a <= 0) return;
  fr.g({ a }, () => {
    fr.rect(0, 0, W, H, { fill: '#2B3150' });
    U.notebook(fr, W / 2, 440, 3 * ss(t, 90.8, 93.8), ['同事請我喝咖啡', '捷運剛好有位子', '泡麵加了一顆蛋'], fade(t, 90.2, 94.6, .5, .5));
    U.phone(fr, W / 2, 440, .82, fade(t, 94.2, 98.6, .5, .5), (fr) => {
      fr.rect(-172, -336, 344, 90, { fill: '#EDE7DB' }); fr.text('爬山小隊（4）', 0, -282, { font: 'sansm', size: 28, color: '#3A2A22' });
      U.chat(fr, -180, '下週再去一次？', false, 1); U.chat(fr, -90, '好，我去！', true, ss(t, 95.6, 96.0));
      if (t > 96.3) fr.text('出發！', 0, 60, { font: 'sansh', size: 56, color: '#F2B33D', a: ss(t, 96.3, 96.7) });
    });
    const kd = fade(t, 98.2, 102.3, .5, .5);
    if (kd > 0) fr.g({ a: kd }, () => { fr.rect(W / 2 - 160, 140, 320, 560, { r: 14, fill: '#6E5238' }); fr.rect(W / 2 - 140, 160, 280, 540, { fill: lerp(0, 1, ss(t, 99.4, 100.6)) > .5 ? '#FFE9A8' : '#8A6A48' }); fr.glow(W / 2, 430, 380, '#FFE9A8', .5 * ss(t, 99.4, 100.6)); U.closedUmbrella(fr, W / 2 - 220, 420, 1, C.navy); });
  });
}
/* ---------- 7. 結尾：沒帶傘出門，下雨，有人一起撐 ---------- */
function street2(fr, t) {
  const a = vis(t, 'street2'); if (a <= 0) return;
  const rainK = ss(t, 106.4, 107.6) * (1 - ss(t, 118.6, 120.6));
  fr.g({ a }, () => cam(fr, lerp(1, 1.06, seg(t, 102, 123)), 960, 560, () => {
    U.street(fr, t, { rain: rainK, arcade: 960, rainbow: ss(t, 119.2, 121) });
    const x = lerp(-120, 820, E.out3(seg(t, 102.4, 105.6)));
    U.person(fr, x, 930, .9, { umb: 0, walking: t < 105.6, walk: t * 1.5, mood: t > 110.8 ? .9 : t > 106.6 ? -.3 : .3 });
    const sx = lerp(2100, 1150, E.out3(seg(t, 109.6, 111.0)));
    U.person(fr, sx, 930, .9, { shirt: '#8BAF8A', pants: '#4A4A52', hair: '#1E1A1A', mood: .9, umb: 2, umbColor: C.warmUmb, open: ss(t, 109.6, 110.6) + (t < 109.6 ? 1 : 0) });
    U.rain(fr, t, rainK);
  }));
}
/* 片尾：片名 + 文獻 */
function endCard(fr, t) {
  const a = ss(t, 122.8, 123.6) * (1 - ss(t, T.end - 1.2, T.end - .1)); if (a <= 0) return;
  fr.rect(0, 0, W, H, { fill: '#0B0806', a });
  fr.text('帶傘的人', W / 2, 400, { font: 'serifh', size: 96, track: 14, grad: [[0, '#F7E8C2'], [.5, '#E2C07A'], [1, '#B98A3E']], a });
  fr.text('Seligman, M. E. P. (1990). Learned Optimism.', W / 2, 560, { font: 'latin', size: 30, color: '#C4BBB1', a });
  fr.text('Seligman, Steen, Park & Peterson (2005). Positive Psychology Progress. American Psychologist, 60(5).', W / 2, 606, { font: 'latini', size: 25, color: '#94908B', a });
  fr.text('故事為虛構示意', W / 2, 690, { font: 'sans', size: 22, color: '#77756F', a });
}

VK.film({
  dur: T.end, theme: 'flat', meta: { title: '帶傘的人', root: 0 },
  draw(fr, t) {
    fr.look.bgo = { color: '#17121E' };
    street1(fr, t); officeScene(fr, t); night(fr, t); title(fr, t); calendar(fr, t); psych(fr, t); tips(fr, t); street2(fr, t); endCard(fr, t);
    const x = fr.x, g = x.createRadialGradient(W / 2, 520, H * .55, W / 2, 520, W * .72); g.addColorStop(0, 'rgba(20,10,10,0)'); g.addColorStop(1, 'rgba(20,10,10,.35)'); fr.rect(0, 0, W, H, { fill: g });
    const b = x.createLinearGradient(0, 820, 0, H); b.addColorStop(0, 'rgba(18,12,20,0)'); b.addColorStop(.5, 'rgba(18,12,20,.7)'); b.addColorStop(1, 'rgba(18,12,20,.88)'); fr.rect(0, 820, W, 260, { fill: b });
    K.subs(fr, t, SUBS, 'flat');
  },
});
})();
