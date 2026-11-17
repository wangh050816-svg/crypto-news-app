// OKX 徐明星 vs 幣安 CZ（同系列黑底版型，依使用者 11/17 文字；左上不放英文標籤）
// 查證：
// 徐明星週日在 X 發文，指 CZ 應為兩年 10 月崩盤負責 — Stocktwits、Bitcoin Sistemi、Coinspectator 11/16
// 去年（2025/10/10 崩盤後）他曾批評幣安的 USDe 收益活動推高槓桿 — Stocktwits、Cryptotimes
// 2025/10/10 單日清算約 190 億美元 — Stocktwits 引述研究、CoinGlass 數據（多家媒體）
// CZ 11/15：幣安沒有拋售加密貨幣，自己持續買入（DCA）— The Block、CCN、CoinCentral
// BTC 一度跌至約 6.2 萬美元、四個月低點 — The Block、Cryptonews.com.au
POST({
  caption:'連續兩年 10 月市場大跌，幣安又被點名了？',
  theme:'bulletin',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    let g=`<defs>
      <radialGradient id="lift" cx="0.5" cy="0.6" r="0.7"><stop offset="0" stop-color="#1e2024"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
      <filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.55"/></filter>
    </defs>`;
    g+=`<rect width="1600" height="900" fill="url(#lift)"/>`;
    // 背景：淡淡的下跌 K 線（裝飾）
    let k='';{let s=41,v=0;const r=()=>(s=(s*16807)%2147483647)/2147483647;
      for(let i=0;i<70;i++){const x=20+i*23;v+=(r()-.55)*16;const o=200-v,c=o+(r()-.4)*30,hi=Math.min(o,c)-r()*14,lo=Math.max(o,c)+r()*14;
        k+=`<line x1="${x}" x2="${x}" y1="${hi.toFixed(1)}" y2="${lo.toFixed(1)}" stroke="#fff" stroke-width="2"/><rect x="${x-6}" y="${Math.min(o,c).toFixed(1)}" width="12" height="${Math.max(3,Math.abs(o-c)).toFixed(1)}" fill="#fff"/>`;}}
    g+=`<g opacity="0.045">${k}</g>`;
    // 標題（不放英文標籤）
    const L=66;
    g+=`<rect x="${L}" y="86" width="7" height="156" rx="3" fill="${T.fg}"/>`;
    g+=`<text x="${L+28}" y="140" style="font-size:72px;font-weight:900;fill:${T.text}">連續兩年 <tspan style="font-family:Inter;font-weight:800">10</tspan> 月大跌</text>`;
    g+=`<text x="${L+28}" y="236" style="font-size:72px;font-weight:900;fill:${T.text}"><tspan style="font-size:84px;fill:${T.fg}">幣安</tspan>又被點名？</text>`;
    // 兩張對陣卡
    const Y=300, H=520, W=640, GX=[L, 1600-L-W];
    const card=(x,acc)=>`<rect x="${x}" y="${Y}" width="${W}" height="${H}" rx="24" fill="#2a2c31" fill-opacity="0.88" stroke="#fff" stroke-opacity="0.18" stroke-width="1.5" filter="url(#sh)"/><rect x="${x+24}" y="${Y}" width="${W-48}" height="4" rx="2" fill="${acc}"/>`;
    const side=(x,acc,who,role,pts,statL,statB,statS)=>{
      let s=card(x,acc);
      s+=`<text x="${x+40}" y="${Y+66}" style="font-size:30px;font-weight:500;fill:#c3c7ce">${role}</text>`;
      s+=`<text x="${x+40}" y="${Y+130}" style="font-size:56px;font-weight:900;fill:${acc}">${who}</text>`;
      pts.forEach((p,i)=>{const yy=Y+206+i*56;
        s+=`<circle cx="${x+50}" cy="${yy-11}" r="6" fill="${acc}"/><text x="${x+72}" y="${yy}" style="font-size:33px;font-weight:700;fill:${T.text}">${p}</text>`;});
      s+=`<line x1="${x+40}" x2="${x+W-40}" y1="${Y+H-130}" y2="${Y+H-130}" stroke="#fff" stroke-opacity="0.14"/>`;
      s+=`<text x="${x+40}" y="${Y+H-82}" style="font-size:28px;font-weight:500;fill:#c3c7ce">${statL}</text>`;
      s+=`<text x="${x+40}" y="${Y+H-30}" style="font-size:44px;font-weight:900;fill:${T.text}">${statB}<tspan style="font-size:28px;font-weight:500;fill:#c3c7ce" dx="12">${statS}</tspan></text>`;
      return s;};
    g+=side(GX[0],T.fg,'徐明星','OKX 創辦人',
      ['連兩年 10 月崩盤怪 CZ','質疑事後喊「長期持有」','去年批理財產品推高槓桿'],
      '2025/10/10 單日清算','約 <tspan style="font-family:Inter;font-weight:800">190</tspan> 億美元','');
    g+=side(GX[1],'#e6e8eb','CZ','幣安創辦人',
      ['幣安沒有拋售加密貨幣','自己最近還在買入'],
      '這波 BTC 一度跌到','約 <tspan style="font-family:Inter;font-weight:800">6.2</tspan> 萬美元','四個月低點');
    // 中間 VS
    g+=`<circle cx="800" cy="${Y+H/2}" r="58" fill="${T.bg}" stroke="${T.fg}" stroke-width="3"/>`;
    g+=`<text x="800" y="${Y+H/2+17}" text-anchor="middle" style="font-family:Inter;font-size:46px;font-weight:800;fill:${T.fg}">VS</text>`;
    return g;
  },
});
