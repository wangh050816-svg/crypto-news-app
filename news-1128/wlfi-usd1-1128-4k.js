// 資料：Binance 現貨 K 線（data-api.binance.vision）WLFI/USDT 15 分、USD1/USDT 5 分，11/28 19:35（台灣）抓取
// WLFI：11/27 08:00 開 0.0423 → 11/28 13:45 低 0.0158 → 現 0.0193；USD1：11/28 15:00 低 0.9400，現約 0.999
const data=require('./wlfi-data-1128.json');
const tw=ms=>new Date(ms+8*3600e3);
POST({caption:'WLFI 一天腰斬，USD1 跟著脫錨',theme:'bulletin',width:1600,height:900,scale:2.4,footer:['',''],
draw:T=>{
  let g=`<defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity="0.035"/></pattern>
  <linearGradient id="fillA" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${T.red}" stop-opacity="0.28"/><stop offset="1" stop-color="${T.red}" stop-opacity="0"/></linearGradient></defs>
  <rect width="1600" height="900" fill="url(#grid)"/>`;
  g+=`<text x="76" y="110" class="ti">WLFI 一天<tspan fill="${T.fg}">腰斬</tspan>，USD1 一度<tspan fill="${T.fg}">脫錨</tspan></text>`;
  g+=`<text x="80" y="160" class="sub">市場價格走勢（台灣時間）</text>`;
  // 左：WLFI
  const ax={x0:110,x1:1000,y0:740,y1:250,lo:0.014,hi:0.045};
  const xs=data.w.map(d=>d[0]),xmin=xs[0],xmax=xs[xs.length-1];
  const X=t=>ax.x0+(t-xmin)/(xmax-xmin)*(ax.x1-ax.x0), Y=v=>ax.y0-(v-ax.lo)/(ax.hi-ax.lo)*(ax.y0-ax.y1);
  g+=`<text x="${ax.x0}" y="${ax.y1-30}" class="ph">WLFI 價格（美元）</text>`;
  for(const v of [0.02,0.03,0.04]){g+=`<line x1="${ax.x0}" x2="${ax.x1}" y1="${Y(v)}" y2="${Y(v)}" stroke="#fff" stroke-opacity="0.08"/><text x="${ax.x0-14}" y="${Y(v)+9}" class="ax" text-anchor="end">${v.toFixed(2)}</text>`;}
  for(let dday=24;dday<=28;dday++){const t=Date.UTC(2026,10,dday,0,0)-8*3600e3; if(t<xmin)continue; g+=`<line x1="${X(t)}" x2="${X(t)}" y1="${ax.y0}" y2="${ax.y0+10}" stroke="#fff" stroke-opacity="0.4"/><text x="${X(t)}" y="${ax.y0+42}" class="ax" text-anchor="middle">11/${dday}</text>`;}
  const pts=data.w.map(d=>`${X(d[0]).toFixed(1)},${Y(d[1]).toFixed(1)}`);
  g+=`<polygon points="${X(xmin)},${ax.y0} ${pts.join(' ')} ${X(xmax)},${ax.y0}" fill="url(#fillA)"/>`;
  g+=`<polyline points="${pts.join(' ')}" fill="none" stroke="${T.red}" stroke-width="4" stroke-linejoin="round"/>`;
  const lo=data.w.reduce((a,b)=>b[2]<a[2]?b:a), hi=data.w.reduce((a,b)=>b[3]>a[3]?b:a), last=data.w[data.w.length-1];
  g+=`<circle cx="${X(hi[0])}" cy="${Y(hi[3])}" r="9" fill="${T.text}"/><text x="${X(hi[0])}" y="${Y(hi[3])-24}" class="an" text-anchor="middle">高點 ${hi[3]}</text>`;
  g+=`<circle cx="${X(lo[0])}" cy="${Y(lo[2])}" r="10" fill="${T.fg}"/><text x="${X(lo[0])-24}" y="${Y(lo[2])+10}" class="an" style="fill:${T.fg}" text-anchor="end">11/28 低點 ${lo[2]}</text>`;
  g+=`<text x="${ax.x1}" y="${Y(0.027)}" class="an" text-anchor="end">最新價 ${last[1]}</text><line x1="${X(last[0])}" x2="${X(last[0])}" y1="${Y(0.027)+12}" y2="${Y(last[1])-10}" stroke="#fff" stroke-opacity="0.4" stroke-dasharray="4 6"/>`;
  // 右：USD1
  const bx={x0:1130,x1:1540,y0:740,y1:250,lo:0.93,hi:1.01};
  const us=data.u.map(d=>d[0]),umin=us[0],umax=us[us.length-1];
  const X2=t=>bx.x0+(t-umin)/(umax-umin)*(bx.x1-bx.x0), Y2=v=>bx.y0-(v-bx.lo)/(bx.hi-bx.lo)*(bx.y0-bx.y1);
  g+=`<text x="${bx.x0}" y="${bx.y1-30}" class="ph">USD1 穩定幣（錨定 1 美元）</text>`;
  for(const v of [0.94,0.96,0.98,1.00]){g+=`<line x1="${bx.x0}" x2="${bx.x1}" y1="${Y2(v)}" y2="${Y2(v)}" stroke="#fff" stroke-opacity="${v===1?0.35:0.08}" ${v===1?'stroke-dasharray="8 8"':''}/><text x="${bx.x0-12}" y="${Y2(v)+9}" class="ax" text-anchor="end">${v.toFixed(2)}</text>`;}
  for(const [lab,t] of [['11/28 00:00',Date.UTC(2026,10,27,16)],['12:00',Date.UTC(2026,10,28,4)]]){if(t<umin||t>umax)continue;g+=`<text x="${X2(t)}" y="${bx.y0+42}" class="ax" text-anchor="middle">${lab}</text>`;}
  g+=`<polyline points="${data.u.map(d=>`${X2(d[0]).toFixed(1)},${Y2(d[2]).toFixed(1)}`).join(' ')}" fill="none" stroke="${T.fg}" stroke-width="3.5" stroke-linejoin="round"/>`;
  const ul=data.u.reduce((a,b)=>b[2]<a[2]?b:a);
  g+=`<circle cx="${X2(ul[0])}" cy="${Y2(ul[2])}" r="10" fill="${T.fg}"/><text x="${X2(ul[0])-18}" y="${Y2(ul[2])+12}" class="an" style="fill:${T.fg}" text-anchor="end">一度 ${ul[2].toFixed(2)}</text>`;
  g+=`<text x="80" y="860" class="src">數據截至 11/28 19:35（台灣時間）</text>`;
  g+=`<style>.ti{fill:${T.text};font-size:62px;font-weight:900}.sub{fill:${T.dim};font-size:28px}.ph{fill:${T.text};font-size:30px;font-weight:700}.ax{fill:${T.dim};font-size:24px;font-family:Inter}.an{fill:${T.text};font-size:28px;font-weight:700;font-family:Inter,'Noto Sans TC'}.src{fill:${T.dim};font-size:20px;opacity:.7}</style>`;
  return g;
}});
