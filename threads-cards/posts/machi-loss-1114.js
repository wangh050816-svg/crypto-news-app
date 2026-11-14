// 麻吉大哥（黃立成）累計虧損（與 PPI / 黃仁勳圖同系列版型，依使用者 11/14 文字）
// 查證：
// Papertrade 遭清算超過 2,100 次、虧損 222 萬美元（Lookonchain；ChainCatcher、BlockTempo）
//   註：222 萬為未扣平台獎勵的虧損；扣掉約 51.4 萬美元獎勵後約虧 171 萬（BlockTempo）
// Hyperliquid 累計虧損 3,746 萬美元（Ember；BlockTempo、OKX Orbit）
// 合計 3,746 + 222 = 3,968 萬美元；新台幣 11/11 收盤約 32.85（自由財經、uanalyze）→ 約 13.0 億元
// 背景只有石墨灰柔光，無裝飾圖
POST({
  caption:'麻吉大哥到底有多愛交易？光是在 Papertrade 就被清算超過 2,100 次。',
  theme:'bulletin',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    let g=`<defs>
      <radialGradient id="halo" cx="0.5" cy="0.45" r="0.5"><stop offset="0" stop-color="#3a3d43" stop-opacity="0.7"/><stop offset="0.6" stop-color="#25272b" stop-opacity="0.4"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
      <radialGradient id="lift" cx="0.25" cy="0.55" r="0.6"><stop offset="0" stop-color="#1c1e22"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
      <filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.55"/></filter>
      <linearGradient id="barA" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${T.fg}"/><stop offset="1" stop-color="#d9861c"/></linearGradient>
    </defs>`;
    g+=`<rect width="1600" height="900" fill="url(#lift)"/><ellipse cx="1000" cy="420" rx="460" ry="430" fill="url(#halo)"/>`;
    // 背景：中央偏右一段下跌 K 線（裝飾）
    let k='';{let s=23,v=0;const r=()=>(s=(s*16807)%2147483647)/2147483647;
      for(let i=0;i<24;i++){const x=900+i*9;v+=(r()-.28)*20;const o=360+v,c=o+(r()-.35)*30,hi=Math.min(o,c)-r()*12,lo=Math.max(o,c)+r()*12,up=c<o;
        k+=`<line x1="${x}" x2="${x}" y1="${hi.toFixed(1)}" y2="${lo.toFixed(1)}" stroke="${up?'#fff':T.red}" stroke-width="1.5"/><rect x="${x-3}" y="${Math.min(o,c).toFixed(1)}" width="6" height="${Math.max(3,Math.abs(o-c)).toFixed(1)}" fill="${up?'#fff':T.red}"/>`;}}
    // （K 線裝飾已停用）
    // 標籤與標題
    const L=66;
    g+=`<rect x="${L}" y="60" width="7" height="26" rx="3" fill="${T.fg}"/>`;
    g+=`<text x="${L+24}" y="84" style="font-family:Inter;font-size:27px;font-weight:600;letter-spacing:1px;fill:${T.dim}">CRYPTO<tspan dx="14">|</tspan><tspan dx="14">ON-CHAIN WATCH</tspan></text>`;
    g+=`<text x="${L-2}" y="176" style="font-size:72px;font-weight:900;fill:${T.text}">麻吉大哥虧近 <tspan style="font-family:Inter;font-weight:800">4,000</tspan> 萬美元</text>`;
    g+=`<text x="${L-2}" y="270" style="font-size:66px;font-weight:900;fill:${T.text}">到底什麼時候<tspan style="font-size:80px;fill:${T.fg}">停手</tspan>？</text>`;
    // 柱狀圖：兩平台累計虧損（萬美元）
    const X0=168, X1=870, B=746, top=360, max=4000, yv=v=>B-v/max*(B-top);
    [0,1000,2000,3000,4000].forEach(t=>{
      g+=`<line x1="${X0}" x2="${X1}" y1="${yv(t)}" y2="${yv(t)}" stroke="${T.text}" stroke-opacity="${t===0?0.45:0.16}" stroke-width="${t===0?2:1.2}"/>`;
      g+=`<text x="${X0-20}" y="${yv(t)+9}" text-anchor="end" style="font-family:Inter;font-size:24px;fill:${T.dim}">${t.toLocaleString('en-US')}</text>`;
    });
    g+=`<text x="${X0-20}" y="${top-36}" text-anchor="end" style="font-size:22px;fill:${T.dim}">萬美元</text>`;
    const bar=(x,w,y,fill)=>{const r=14,h=B-y,rr=Math.min(r,h/2);return `<path filter="url(#sh)" d="M${x} ${B}V${y+rr}Q${x} ${y} ${x+rr} ${y}H${x+w-rr}Q${x+w} ${y} ${x+w} ${y+rr}V${B}Z" fill="${fill}"/>`;};
    [[3746,'3,746 萬','Hyperliquid','',249,208,'url(#barA)',T.fg],[222,'222 萬','Papertrade','（未扣平台獎勵）',572,222,'#8d8f94',T.text]].forEach(([v,lab,a,b,x,w,fill,col])=>{
      const y=yv(v);
      g+=bar(x,w,y,fill);
      g+=`<text x="${x+w/2}" y="${y-22}" text-anchor="middle" style="font-size:46px;font-weight:900;fill:${col}"><tspan style="font-family:Inter;font-weight:700">${lab.split(' ')[0]}</tspan> ${lab.split(' ')[1]}</text>`;
      g+=`<text x="${x+w/2}" y="${B+46}" text-anchor="middle" style="font-family:Inter;font-size:31px;font-weight:600;fill:${T.text}">${a}</text>`;
      if(b) g+=`<text x="${x+w/2}" y="${B+84}" text-anchor="middle" style="font-size:24px;fill:${T.dim}">${b}</text>`;
    });
    // 右側卡片
    const RX=1134, RW=438, RH=197;
    const card=y=>`<rect x="${RX}" y="${y}" width="${RW}" height="${RH}" rx="22" fill="#2a2c31" fill-opacity="0.86" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5" filter="url(#sh)"/><rect x="${RX+1}" y="${y+1}" width="${RW-2}" height="60" rx="21" fill="#ffffff" fill-opacity="0.025"/>`;
    let y=134;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">Papertrade 被清算</text>`;
    g+=`<text x="${RX+28}" y="${y+130}" style="font-size:48px;font-weight:900;fill:${T.fg}"><tspan style="font-family:Inter;font-size:72px;font-weight:800">2,100+</tspan> 次</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="sb">還在繼續下單</text>`;
    y=351;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">兩平台合計虧損</text>`;
    g+=`<text x="${RX+28}" y="${y+130}" style="font-size:44px;font-weight:900;fill:${T.text}">約 <tspan style="font-family:Inter;font-size:70px;font-weight:700">3,968</tspan> 萬</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="lb">美元</text>`;
    y=569;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">換算新台幣</text>`;
    g+=`<text x="${RX+30}" y="${y+130}" style="font-size:44px;font-weight:900;fill:${T.text}">約 <tspan style="font-family:Inter;font-size:70px;font-weight:700">13</tspan> 億元</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="lb">以匯率約 <tspan style="font-family:Inter">32.8</tspan> 計算</text>`;
    g+=`<style>.lb{fill:#c3c7ce;font-size:29px;font-weight:500}.sb{fill:${T.text};font-size:31px;font-weight:500}</style>`;
    return g;
  },
});
