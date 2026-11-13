// 用法：node weekly-report/render.js   →  weekly-report/out/weekly-report.png（1080×1350）
const fs = require('fs'), path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const D = require('./data.js');
const out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const dash = '—';
const fmtR = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2) + 'R';
const dec = n => { const s = String(n); return s.includes('.') ? s.split('.')[1].length : 0; };
const fmtP = (n, d) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

// ── 正式績效（只從 trades 計算）
const T = D.trades, n = T.length;
const wins = T.filter(t => t.r > 0).length, losses = T.filter(t => t.r < 0).length;
const total = T.reduce((a, t) => a + t.r, 0);
const M = {
  total: n ? fmtR(total) : dash,
  count: n ? String(n) : dash,
  win: n ? Math.round(wins / n * 100) + '%' : dash,
  wins: n ? String(wins) : dash,
  losses: n ? String(losses) : dash,
  avg: n ? fmtR(total / n) : dash,
};

// ── 逐筆 R 長條圖
function chart() {
  const W = 944, H = n ? Math.min(210, n * 34 + 12) : 118;
  if (!n) return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <line x1="${W / 2}" y1="8" x2="${W / 2}" y2="${H - 8}" class="axis"/>
    ${[0.25, 0.75].map(f => `<line x1="${W * f}" y1="8" x2="${W * f}" y2="${H - 8}" class="grid"/>`).join('')}
    ${[0, 1, 2].map(i => `<rect x="${W / 2 - (i % 2 ? 150 : 230) + (i % 3) * 60}" y="${14 + i * 34}" width="${[150, 90, 200, 120, 170][i]}" height="22" rx="3" class="ghost"/>`).join('')}
    <rect x="${W / 2 - 230}" y="${H / 2 - 28}" width="460" height="56" rx="8" class="empty-bg"/>
    <text x="${W / 2}" y="${H / 2 + 9}" text-anchor="middle" class="empty">本週正式報單紀錄待補入</text></svg>`;
  const max = Math.max(1, ...T.map(t => Math.abs(t.r)));
  const rowH = Math.min(34, (H - 10) / n), cx = 600, half = (W - cx - 90);
  const sc = v => v / max * Math.min(half, cx - 320);
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <line x1="${cx}" y1="0" x2="${cx}" y2="${H}" class="axis"/>
    ${T.map((t, i) => { const y = 5 + i * rowH, w = Math.abs(sc(t.r)), x = t.r >= 0 ? cx : cx - w;
      return `<text x="0" y="${y + rowH * .62}" class="lbl">${esc(t.pair)} · ${esc(t.side)}</text>
      <rect x="${x}" y="${y + 4}" width="${Math.max(w, 2)}" height="${rowH - 10}" rx="2" class="${t.r >= 0 ? 'pos' : 'neg'}"/>
      <text x="${t.r >= 0 ? x + w + 10 : x - 10}" y="${y + rowH * .62}" text-anchor="${t.r >= 0 ? 'start' : 'end'}" class="val ${t.r >= 0 ? 'tpos' : 'tneg'}">${fmtR(t.r)}</text>`; }).join('')}
  </svg>`;
}

// ── 分析機會卡（規劃盈虧比：以進場區間中值、止損距離 = 1R）
function idea(o, i) {
  const d = Math.max(dec(o.entry[0]), dec(o.entry[1]), dec(o.sl), ...o.tp.map(dec));
  const mid = (o.entry[0] + o.entry[1]) / 2, risk = Math.abs(mid - o.sl);
  const lo = Math.min(...o.entry), hi = Math.max(...o.entry);
  const long = o.side === '多';
  const hit = o.result && o.result.startsWith('TP') ? +o.result.slice(2) : 0;
  const status = o.result ? (o.result === 'SL' ? ['neg', '觸及止損'] : o.result === '未觸發' ? ['mute', '未觸發進場'] : ['pos', +o.result.slice(2) === o.tp.length ? `止盈全數達標 TP1–TP${o.tp.length}` : '觸及 ' + o.result])
                          : ['mute', '後續走勢待確認'];
  return `<div class="idea">
    <div class="ih"><span class="idx">0${i + 1}</span><span class="side ${long ? 'long' : 'short'}">${long ? 'LONG 做多' : 'SHORT 做空'}</span></div>
    <div class="pair">${esc(o.pair.replace('USDT', ''))}<small>/USDT</small></div>
    <div class="lev">市價 · ${o.lev}x · 倉位 5%</div>
    <div class="row"><span>進場</span><b>${fmtP(lo, d)}–${fmtP(hi, d)}</b></div>
    <div class="row"><span>止損</span><b class="tneg">${fmtP(o.sl, d)}</b></div>
    <div class="tps">${o.tp.map((p, k) => `<div class="row${k < hit ? ' hit' : ''}"><span>TP${k + 1}</span><b>${fmtP(p, d)}${k < hit ? ' <i>✓</i>' : ''}</b><em>${(Math.abs(p - mid) / risk).toFixed(2)}R</em></div>`).join('')}</div>
    <div class="st ${status[0]}">● ${status[1]}</div>
  </div>`;
}

const metric = (k, en, v) => `<div class="m"><div class="mk">${k}<span>${en}</span></div><div class="mv${v === dash ? ' na' : ''}">${v}</div></div>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a1120;--panel:#101a2c;--line:#22314a;--line2:#2c3d5a;--text:#e6ecf5;--dim:#8b99b0;--mute:#5d6b82;--acc:#4fd1c5;--ice:#9fd6ff;--pos:#4fd1c5;--neg:#e07a7a}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:var(--bg);color:var(--text);font-family:'Inter','Noto Sans TC',sans-serif;overflow:hidden}
#c{position:relative;width:1080px;height:1350px;padding:48px 68px 0;
  background:radial-gradient(900px 500px at 100% 0%,rgba(79,209,197,.07),transparent 60%),radial-gradient(700px 600px at 0% 100%,rgba(159,214,255,.05),transparent 60%),var(--bg)}
#c::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:36px 36px;pointer-events:none}
.mono{font-family:'IBM Plex Mono',monospace}
.sec{display:flex;align-items:center;gap:14px;font-size:15px;letter-spacing:.18em;color:var(--dim);font-weight:500;margin-bottom:14px}
.sec b{font-family:'IBM Plex Mono';color:var(--acc);font-weight:500;letter-spacing:.05em}
.sec i{flex:1;height:1px;background:var(--line)}
/* header */
.hd{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:22px;border-bottom:1px solid var(--line2);margin-bottom:26px}
.brand{display:flex;align-items:center;gap:12px;font-family:'Noto Sans TC';font-weight:700;font-size:22px;letter-spacing:.32em;color:var(--text);margin-bottom:14px}
.brand svg{display:block}
h1{font-family:'Noto Sans TC';font-weight:900;font-size:60px;letter-spacing:.06em;line-height:1}
.en{font-size:16px;letter-spacing:.42em;color:var(--ice);margin-top:14px;font-weight:600}
.meta{text-align:right;font-size:15px;color:var(--dim);line-height:1.9;letter-spacing:.06em}
.meta b{display:block;font-family:'IBM Plex Mono';font-size:24px;color:var(--text);font-weight:500;letter-spacing:.02em}
/* core */
.core{display:grid;grid-template-columns:400px 1fr;gap:0;border:1px solid var(--line);background:rgba(16,26,44,.7);border-radius:4px;margin-bottom:22px}
.big{padding:24px 34px;border-right:1px solid var(--line)}
.big .lab{font-size:18px;color:var(--dim);letter-spacing:.12em;font-family:'Noto Sans TC'}
.big .lab span{display:block;font-size:13px;letter-spacing:.3em;color:var(--mute);margin-top:6px;font-family:'Inter'}
.big .num{font-family:'IBM Plex Mono';font-weight:600;font-size:104px;line-height:1;margin-top:18px;color:var(--acc);letter-spacing:-.03em}
.big .num.na{color:var(--mute)}
.big .note{font-size:15px;color:var(--mute);margin-top:16px;line-height:1.5}
.grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:1fr 1fr}
.m{padding:16px 24px;border-bottom:1px solid var(--line);border-right:1px solid var(--line)}
.m:nth-child(3n){border-right:0}.m:nth-child(n+4){border-bottom:0}
.mk{font-size:17px;color:var(--dim);font-family:'Noto Sans TC'}
.mk span{display:block;font-family:'Inter';font-size:11px;letter-spacing:.24em;color:var(--mute);margin-top:4px}
.mv{font-family:'IBM Plex Mono';font-size:40px;font-weight:500;margin-top:6px;color:var(--text)}
.mv.na{color:var(--mute)}
/* chart */
.chart{border:1px solid var(--line);border-radius:4px;padding:16px 24px 14px;background:rgba(16,26,44,.45);margin-bottom:22px}
.chart .axis{stroke:var(--line2);stroke-width:1.5}.chart .grid{stroke:var(--line);stroke-dasharray:3 5}
.chart .ghost{fill:rgba(139,153,176,.06)}
.chart .empty-bg{fill:var(--bg);stroke:var(--line2)}
.chart .empty{fill:var(--dim);font:500 24px 'Noto Sans TC';letter-spacing:.12em}
.chart .pos{fill:var(--pos)}.chart .neg{fill:var(--neg)}
.chart .lbl{fill:var(--dim);font:500 18px 'IBM Plex Mono'}.chart .val{font:600 18px 'IBM Plex Mono'}
.tpos{fill:var(--pos);color:var(--pos)}.tneg{fill:var(--neg);color:var(--neg)!important}
.legend{display:flex;gap:26px;font-size:14px;color:var(--mute);margin-top:8px;letter-spacing:.06em}
.legend i{display:inline-block;width:12px;height:12px;border-radius:2px;margin-right:8px;vertical-align:-1px}
/* ideas */
.secnote{font-size:14px;color:var(--mute);margin:-4px 0 12px;letter-spacing:.04em}
.ideas{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.idea{border:1px dashed var(--line2);border-radius:4px;padding:16px 16px 14px;background:rgba(10,17,32,.6)}
.ih{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.idx{font-family:'IBM Plex Mono';font-size:14px;color:var(--mute)}
.side{font-size:12px;font-weight:600;letter-spacing:.08em;padding:3px 8px;border-radius:2px}
.side.long{color:var(--pos);border:1px solid rgba(79,209,197,.5)}.side.short{color:var(--neg);border:1px solid rgba(224,122,122,.5)}
.pair{font-family:'IBM Plex Mono';font-size:30px;font-weight:600;line-height:1}
.pair small{font-size:15px;color:var(--mute);font-weight:400}
.lev{font-size:13px;color:var(--dim);margin:8px 0 10px}
.row{display:flex;align-items:baseline;font-size:15px;padding:4px 0;border-top:1px solid var(--line)}
.row span{color:var(--dim);width:42px;flex:none}
.row b{font-family:'IBM Plex Mono';font-weight:500;font-size:16px;color:var(--text);flex:1}
.row em{font-style:normal;font-family:'IBM Plex Mono';font-size:14px;color:var(--ice)}
.row.hit b i{font-style:normal;color:var(--pos);font-size:14px;margin-left:4px}
.tps .row:first-child{border-top:1px solid var(--line2)}
.st{font-size:13px;margin-top:10px;letter-spacing:.04em}
.st.mute{color:var(--mute)}.st.pos{color:var(--pos)}.st.neg{color:var(--neg)}
/* footer */
.ft{position:absolute;left:68px;right:68px;bottom:34px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid var(--line2);padding-top:16px;font-size:15px;color:var(--dim);line-height:1.7}
.ft b{color:var(--text);font-weight:500}
.ft .r{text-align:right;color:var(--mute);font-size:13px;letter-spacing:.1em}
</style></head><body><div id="c">
  <div class="hd">
    <div>
      <div class="brand"><svg width="30" height="30" viewBox="0 0 30 30"><path d="M3 22 C 9 22, 9 8, 15 8 S 21 22, 27 22" fill="none" stroke="#4fd1c5" stroke-width="2.4"/><circle cx="27" cy="22" r="2.6" fill="#9fd6ff"/></svg>纏道漫長</div>
      <h1>每週交易觀察</h1>
      <div class="en">WEEKLY MARKET REVIEW</div>
    </div>
    <div class="meta">統計期間<b>${D.period ? esc(D.period) : '待確認'}</b>${D.issue ? esc(D.issue) + ' · 週報' : ''}</div>
  </div>

  <div class="sec"><b>01</b>本週核心數據<i></i>正式報單</div>
  <div class="core">
    <div class="big">
      <div class="lab">正式交易總 R 值<span>TOTAL REALIZED R</span></div>
      <div class="num${n ? '' : ' na'}">${M.total}</div>
      <div class="note">${n ? '1R = 單筆止損距離 · 含所有獲利與虧損' : '尚未提供本週正式報單結果'}</div>
    </div>
    <div class="grid">
      ${metric('交易筆數', 'TRADES', M.count)}${metric('勝率', 'WIN RATE', M.win)}${metric('平均 R 值', 'AVG R', M.avg)}
      ${metric('獲利筆數', 'WINS', M.wins)}${metric('虧損筆數', 'LOSSES', M.losses)}${metric('最大回撤', 'MAX DD', dash)}
    </div>
  </div>

  <div class="sec"><b>02</b>逐筆 R 值分布<i></i>R PER TRADE</div>
  <div class="chart">${chart()}
    <div class="legend"><span><i style="background:var(--pos)"></i>獲利</span><span><i style="background:var(--neg)"></i>虧損</span><span>中線為 0R</span></div>
  </div>

  <div class="sec"><b>03</b>本週市場分析機會<i></i>未正式報單 · 不計入績效</div>
  <div class="secnote">${(()=>{const done=D.ideas.filter(o=>o.result&&+o.result.slice(2)===o.tp.length).length;return done?`後續走勢：<b style="color:var(--acc);font-weight:600">${done}/${D.ideas.length} 筆觸及最終止盈</b>　·　`:''})()}右側 R 為規劃盈虧比（進場區間中值，止損距離 = 1R）</div>
  <div class="ideas">${D.ideas.map(idea).join('')}</div>

  <div class="ft">
    <div>每筆分析皆附<b>進場依據、止盈止損與風險規劃</b>。<br>歷史績效不代表未來表現，本內容不構成投資建議。</div>
    <div class="r">纏道漫長<br>WEEKLY MARKET REVIEW</div>
  </div>
</div></body></html>`;

fs.writeFileSync(path.join(out, 'weekly-report.html'), html);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(out, 'weekly-report.png') }); await b.close();
  console.log('→', path.join(out, 'weekly-report.png'));
})();
