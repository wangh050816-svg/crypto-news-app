// 用法：node weekly-report/render.js   →  weekly-report/out/weekly-report.png（1080×1350）
// 版本：市場分析回顧（不含正式報單績效）
const fs = require('fs'), path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const D = require('./data.js');
const out = path.join(__dirname, 'out'); fs.mkdirSync(out, { recursive: true });

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const dec = n => { const s = String(n); return s.includes('.') ? s.split('.')[1].length : 0; };
const fmtP = (n, d) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const hitOf = o => (o.result && o.result.startsWith('TP') ? +o.result.slice(2) : 0);

// ── 統計（只數分析結果，不算報酬）
const N = D.ideas.length;
const full = D.ideas.filter(o => hitOf(o) === o.tp.length).length;
const anyTp = D.ideas.filter(o => hitOf(o) > 0).length;
const sl = D.ideas.filter(o => o.result === 'SL').length;
const pending = D.ideas.filter(o => !o.result).length;

// ── 價格階梯：止盈統一畫在上方、止損在下方，方向一致好比較
function ladder(o, hit) {
  const W = 118, H = 236, top = 14, bot = H - 14;
  const long = o.side === '多';
  const all = [o.sl, ...o.entry, ...o.tp], mn = Math.min(...all), mx = Math.max(...all);
  const y = v => { const t = (v - mn) / (mx - mn); return long ? bot - t * (bot - top) : top + t * (bot - top); };
  const x0 = 34, x1 = W - 6;
  const eA = y(o.entry[0]), eB = y(o.entry[1]);
  let s = `<line x1="${x0 + 12}" y1="${top}" x2="${x0 + 12}" y2="${bot}" stroke="var(--line2)" stroke-width="2"/>`;
  s += `<rect x="${x0}" y="${Math.min(eA, eB) - 3}" width="${x1 - x0}" height="${Math.abs(eA - eB) + 6}" fill="rgba(159,214,255,.22)" stroke="var(--ice)" stroke-width="1"/>`;
  s += `<text x="${x0 - 6}" y="${(eA + eB) / 2 + 5}" text-anchor="end" class="lt">進場</text>`;
  s += `<line x1="${x0}" y1="${y(o.sl)}" x2="${x1}" y2="${y(o.sl)}" stroke="var(--neg)" stroke-width="2" stroke-dasharray="5 4"/><text x="${x0 - 6}" y="${y(o.sl) + 5}" text-anchor="end" class="lt" fill="var(--neg)">SL</text>`;
  o.tp.forEach((p, k) => {
    const ok = k < hit;
    s += `<line x1="${x0}" y1="${y(p)}" x2="${x1}" y2="${y(p)}" stroke="${ok ? 'var(--pos)' : 'var(--dim)'}" stroke-width="2"/>`;
    s += `<text x="${x0 - 6}" y="${y(p) + 5}" text-anchor="end" class="lt" fill="${ok ? 'var(--pos)' : 'var(--dim)'}">TP${k + 1}</text>`;
  });
  if (hit) { const yt = y(o.tp[hit - 1]), ym = (eA + eB) / 2;
    s += `<line x1="${x0 + 12}" y1="${ym}" x2="${x0 + 12}" y2="${yt + 6}" stroke="var(--pos)" stroke-width="4"/><path d="M${x0 + 4} ${yt + 12} L${x0 + 12} ${yt} L${x0 + 20} ${yt + 12} Z" fill="var(--pos)"/>`; }
  return `<svg class="lad" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`;
}

function card(o, i) {
  const d = Math.max(dec(o.entry[0]), dec(o.entry[1]), dec(o.sl), ...o.tp.map(dec));
  const mid = (o.entry[0] + o.entry[1]) / 2, risk = Math.abs(mid - o.sl);
  const lo = Math.min(...o.entry), hi = Math.max(...o.entry);
  const long = o.side === '多', hit = hitOf(o);
  const st = !o.result ? ['mute', '後續走勢待確認'] : o.result === 'SL' ? ['neg', '觸及止損'] : o.result === '未觸發' ? ['mute', '未觸發進場']
           : ['pos', hit === o.tp.length ? `止盈全數達標 · TP1–TP${o.tp.length}` : `觸及 TP1–TP${hit}`];
  return `<div class="card">
    <div class="ch"><span class="idx">0${i + 1}</span><span class="side ${long ? 'long' : 'short'}">${long ? 'LONG 做多' : 'SHORT 做空'}</span></div>
    <div class="body"><div class="info">
      <div class="pair">${esc(o.pair.replace('USDT', ''))}<small>/USDT</small></div>
      <div class="lev">市價 · ${o.lev}x · 倉位 5%</div>
      <div class="row"><span>進場</span><b>${fmtP(lo, d)}–${fmtP(hi, d)}</b></div>
      <div class="row"><span>止損</span><b class="neg">${fmtP(o.sl, d)}</b></div>
      ${o.tp.map((p, k) => `<div class="row"><span>TP${k + 1}</span><b>${fmtP(p, d)}${k < hit ? '<i>✓</i>' : ''}</b><em>${(Math.abs(p - mid) / risk).toFixed(2)}R</em></div>`).join('')}
    </div>${ladder(o, hit)}</div>
    <div class="st ${st[0]}">● ${st[1]}</div>
  </div>`;
}

const kpi = (k, en, v, cls = '') => `<div class="k"><div class="kv ${cls}">${v}</div><div class="kk">${k}<span>${en}</span></div></div>`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a1120;--line:#22314a;--line2:#2c3d5a;--text:#e6ecf5;--dim:#8b99b0;--mute:#5d6b82;--acc:#4fd1c5;--ice:#9fd6ff;--pos:#4fd1c5;--neg:#e07a7a}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:var(--bg);color:var(--text);font-family:'Inter','Noto Sans TC',sans-serif;overflow:hidden}
#c{position:relative;width:1080px;height:1350px;padding:48px 64px 0;
  background:radial-gradient(900px 500px at 100% 0%,rgba(79,209,197,.07),transparent 60%),radial-gradient(700px 600px at 0% 100%,rgba(159,214,255,.05),transparent 60%),var(--bg)}
#c::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:36px 36px;pointer-events:none}
.hd{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:22px;border-bottom:1px solid var(--line2);margin-bottom:24px}
.brand{display:flex;align-items:center;gap:12px;font-family:'Noto Sans TC';font-weight:700;font-size:22px;letter-spacing:.32em;margin-bottom:14px}
h1{font-family:'Noto Sans TC';font-weight:900;font-size:60px;letter-spacing:.06em;line-height:1}
.en{font-size:16px;letter-spacing:.42em;color:var(--ice);margin-top:14px;font-weight:600}
.meta{text-align:right;font-size:15px;color:var(--dim);line-height:1.9;letter-spacing:.06em}
.meta b{display:block;font-family:'IBM Plex Mono';font-size:24px;color:var(--text);font-weight:500}
.sec{display:flex;align-items:center;gap:14px;font-size:15px;letter-spacing:.18em;color:var(--dim);font-weight:500;margin-bottom:14px}
.sec b{font-family:'IBM Plex Mono';color:var(--acc);font-weight:500;letter-spacing:.05em}
.sec i{flex:1;height:1px;background:var(--line)}
.kpis{display:grid;grid-template-columns:1.25fr 1fr 1fr 1fr;border:1px solid var(--line);border-radius:4px;background:rgba(16,26,44,.7);margin-bottom:12px}
.k{padding:18px 22px;border-right:1px solid var(--line)}.k:last-child{border-right:0}
.kv{font-family:'IBM Plex Mono';font-size:54px;font-weight:600;line-height:1;color:var(--text)}
.kv small{font-size:28px;color:var(--mute);font-weight:500}
.kv.acc{color:var(--acc)}.kv.neg{color:var(--neg)}.kv.mute{color:var(--mute)}
.kk{font-family:'Noto Sans TC';font-size:17px;color:var(--dim);margin-top:12px}
.kk span{display:block;font-family:'Inter';font-size:11px;letter-spacing:.24em;color:var(--mute);margin-top:4px}
.disc{font-size:14px;color:var(--mute);margin-bottom:22px;letter-spacing:.03em}
.disc b{color:var(--dim);font-weight:500}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.card{border:1px solid var(--line);border-radius:4px;padding:18px 20px 16px;background:rgba(16,26,44,.55)}
.ch{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.idx{font-family:'IBM Plex Mono';font-size:15px;color:var(--mute)}
.side{font-size:13px;font-weight:700;letter-spacing:.08em;padding:4px 10px;border-radius:2px}
.side.long{color:var(--pos);border:1px solid rgba(79,209,197,.55)}.side.short{color:var(--neg);border:1px solid rgba(224,122,122,.55)}
.body{display:flex;gap:10px;align-items:flex-start}.info{flex:1}
.pair{font-family:'IBM Plex Mono';font-size:40px;font-weight:600;line-height:1}
.pair small{font-size:17px;color:var(--mute);font-weight:400}
.lev{font-size:14px;color:var(--dim);margin:8px 0 10px}
.row{display:flex;align-items:baseline;font-size:15px;padding:5px 0;border-top:1px solid var(--line)}
.row span{color:var(--dim);width:44px;flex:none}
.row b{font-family:'IBM Plex Mono';font-weight:500;font-size:18px;flex:1}
.row b.neg{color:var(--neg)}
.row b i{font-style:normal;color:var(--pos);font-size:15px;margin-left:6px}
.row em{font-style:normal;font-family:'IBM Plex Mono';font-size:14px;color:var(--ice)}
.lad .lt{font:500 12px 'IBM Plex Mono';fill:var(--dim)}
.st{font-size:15px;margin-top:10px;padding-top:10px;border-top:1px solid var(--line2);letter-spacing:.04em;font-weight:500}
.st.mute{color:var(--mute)}.st.pos{color:var(--pos)}.st.neg{color:var(--neg)}
.ft{position:absolute;left:64px;right:64px;bottom:34px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid var(--line2);padding-top:16px;font-size:15px;color:var(--dim);line-height:1.7}
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

  <div class="sec"><b>01</b>本週市場分析回顧<i></i>ANALYSIS REVIEW</div>
  <div class="kpis">
    ${kpi('觸及最終止盈', 'FINAL TP REACHED', `${full}<small>/${N}</small>`, 'acc')}
    ${kpi('分析機會', 'SETUPS', N)}
    ${kpi('觸及止盈', 'TP HIT', anyTp, anyTp ? 'acc' : 'mute')}
    ${kpi(pending ? '待確認' : '觸及止損', pending ? 'PENDING' : 'STOP HIT', pending || sl, sl ? 'neg' : 'mute')}
  </div>
  <div class="disc">以下為社群公開之分析規劃與後續走勢，<b>非正式報單、不代表實際交易報酬</b>。卡片 R 值為規劃盈虧比（進場區間中值，止損距離 = 1R）。</div>

  <div class="grid">${D.ideas.map(card).join('')}</div>

  <div class="ft">
    <div>每筆分析皆附<b>進場依據、止盈止損與風險規劃</b>。<br>歷史績效不代表未來表現，本內容不構成投資建議。</div>
    <div class="r">纏道漫長<br>WEEKLY MARKET REVIEW</div>
  </div>
</div></body></html>`;

fs.writeFileSync(path.join(out, 'weekly-report.html'), html);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.setContent(html, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const [g, f] = await p.evaluate(() => [document.querySelector('.grid').getBoundingClientRect().bottom, document.querySelector('.ft').getBoundingClientRect().top]);
  if (g > f - 10) console.warn(`⚠ 卡片區 (${g}) 壓到底部資訊 (${f})`);
  await p.screenshot({ path: path.join(out, 'weekly-report.png') }); await b.close();
  console.log('→', path.join(out, 'weekly-report.png'), `grid bottom ${g} / footer ${f}`);
})();
