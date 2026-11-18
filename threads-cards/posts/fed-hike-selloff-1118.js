// 還沒升息就先跌（與 PPI 圖同系列版型，左上不放英文，依使用者 11/18 文字）
// 查證：
// CME FedWatch（11/16，使用者截圖）：12/9 會議 400–425bp 機率 95.7%、425–450bp 4.3%，目前 375–400bp
// Waller：12 月支持至少升息一碼，核心通膨若約 0.3% 以上應考慮兩碼 — Yahoo Finance、Seeking Alpha、investingLive
// 11/17 道瓊跌 848 點（-1.6%）；那斯達克跌 0.74% 收 24,329.34，S&P 500 與那斯達克連跌四天 — BNN Bloomberg、Yahoo Finance、MSN
// AI 類股賣壓（輝達財報前）— BNN Bloomberg、Yahoo Finance
// 人物照：Federal Reserve Board 2022 (52379257721).jpg（2022/9/23 Fed Listens 活動，Federalreserve Flickr，Wikimedia Commons，公有領域），裁出 Waller；已轉灰階
// 背景 K 線與星點為裝飾，不是數據
const face='data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/christopher-waller-fedlistens.jpg').toString('base64');
POST({
  caption:'升息都還沒升，怎麼就先跌成這樣？',
  theme:'bulletin',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    let g=`<defs>
      <linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${T.bg}"/><stop offset="0.3" stop-color="${T.bg}" stop-opacity="0"/></linearGradient>
      <linearGradient id="fadeB" y1="0" y2="1" x1="0" x2="0"><stop offset="0.72" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient>
      <linearGradient id="fadeR" x1="0" x2="1"><stop offset="0.8" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}" stop-opacity="0.85"/></linearGradient>
      <radialGradient id="halo" cx="0.5" cy="0.4" r="0.5"><stop offset="0" stop-color="#3a3d43" stop-opacity="0.85"/><stop offset="0.6" stop-color="#25272b" stop-opacity="0.5"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
      <radialGradient id="lift" cx="0.25" cy="0.55" r="0.6"><stop offset="0" stop-color="#1c1e22"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
      <filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.55"/></filter>
    </defs>`;
    g+=`<rect width="1600" height="900" fill="url(#lift)"/><ellipse cx="1010" cy="360" rx="470" ry="440" fill="url(#halo)"/>`;
    // 背景：左下 K 線、右上星點（裝飾）
    let k='';{let s=17,v=0;const r=()=>(s=(s*16807)%2147483647)/2147483647;
      for(let i=0;i<34;i++){const x=20+i*18;v+=(r()-.42)*14;const o=870-v-i*1.2,c=o-(r()-.45)*26,hi=Math.min(o,c)-r()*14,lo=Math.max(o,c)+r()*14;
        k+=`<line x1="${x}" x2="${x}" y1="${hi.toFixed(1)}" y2="${lo.toFixed(1)}" stroke="#fff" stroke-width="1.5"/><rect x="${x-5}" y="${Math.min(o,c).toFixed(1)}" width="10" height="${Math.max(3,Math.abs(o-c)).toFixed(1)}" fill="#fff"/>`;}}
    g+=`<g opacity="0.06">${k}</g>`;
    const star=(cx,cy,R)=>{let p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?R*0.42:R;p.push(`${(cx+rr*Math.cos(a)).toFixed(1)},${(cy+rr*Math.sin(a)).toFixed(1)}`)}return `<polygon points="${p.join(' ')}" fill="#fff"/>`;};
    let st='';[[1180,40],[1250,92],[1330,34],[1410,80],[1490,36],[1560,90],[1300,150]].forEach(([x,y])=>st+=star(x,y,16));
    // 人物
    g+=`<image href="${face}" x="700" y="0" width="620" height="900" preserveAspectRatio="xMidYMin slice" opacity="1"/>`;
    ['fadeL','fadeB','fadeR'].forEach(id=>g+=`<rect x="700" y="0" width="620" height="900" fill="url(#${id})"/>`);
    g+=`<g opacity="0.08">${st}</g>`;
    // 標籤與標題
    const L=66;
    g+=`<text x="${L-2}" y="150" style="font-size:72px;font-weight:900;fill:${T.text}">還沒升息就先跌？</text>`;
    g+=`<text x="${L-2}" y="246" style="font-size:66px;font-weight:900;fill:${T.text}">美股<tspan style="font-size:80px;fill:${T.fg}">先跌一波</tspan></text>`;
    // 柱狀圖
    const X0=168, X1=870, B=746, top=420, max=100, yv=v=>B-v/max*(B-top);
    g+=`<text x="${L}" y="318" style="font-size:30px;font-weight:700;fill:${T.dim}">12 月會議利率機率</text>`;
    [0,25,50,75,100].forEach(t=>{
      g+=`<line x1="${X0}" x2="${X1}" y1="${yv(t)}" y2="${yv(t)}" stroke="${T.text}" stroke-opacity="${t===0?0.45:0.16}" stroke-width="${t===0?2:1.2}"/>`;
      g+=`<text x="${X0-20}" y="${yv(t)+9}" text-anchor="end" style="font-family:Inter;font-size:26px;fill:${T.dim}">${t}%</text>`;
    });
    const bar=(x,w,y,fill)=>{const r=Math.min(14,(B-y)/2);return `<path filter="url(#sh)" d="M${x} ${B}V${y+r}Q${x} ${y} ${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${B}Z" fill="${fill}"/>`;};
    [[95.7,'95.7%','升息一碼',249,208,T.fg,T.fg],[4.3,'4.3%','升息兩碼',572,222,'#8d8f94',T.text]].forEach(([v,lab,a,x,w,fill,col])=>{
      const y=yv(v);
      g+=bar(x,w,y,fill);
      g+=`<text x="${x+w/2}" y="${y-22}" text-anchor="middle" style="font-family:Inter;font-size:46px;font-weight:700;fill:${col}">${lab}</text>`;
      g+=`<text x="${x+w/2}" y="${B+50}" text-anchor="middle" style="font-size:31px;font-weight:500;fill:${T.text}">${a}</text>`;
    });
    // 右側卡片
    const RX=1134, RW=438, RH=197;
    const card=y=>`<rect x="${RX}" y="${y}" width="${RW}" height="${RH}" rx="22" fill="#2a2c31" fill-opacity="0.86" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5" filter="url(#sh)"/><rect x="${RX+1}" y="${y+1}" width="${RW-2}" height="60" rx="21" fill="#ffffff" fill-opacity="0.025"/>`;
    let y=134;
    g+=card(y)+`<rect x="${RX+24}" y="${y}" width="${RW-48}" height="4" rx="2" fill="${T.red}"/><text x="${RX+32}" y="${y+52}" class="lb">道瓊 <tspan style="font-family:Inter">11/17</tspan></text>`;
    g+=`<text x="${RX+28}" y="${y+128}" style="font-size:50px;font-weight:900;fill:${T.fg}">跌 <tspan style="font-family:Inter;font-size:70px;font-weight:800">848</tspan> 點</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="sb">單日 <tspan style="font-family:Inter">-1.6%</tspan></text>`;
    y=351;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">那斯達克</text>`;
    g+=`<text x="${RX+28}" y="${y+128}" style="font-size:50px;font-weight:900;fill:${T.text}">連跌 <tspan style="font-family:Inter;font-size:70px;font-weight:800">4</tspan> 天</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="lb">AI 類股賣壓加重</text>`;
    y=569;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">聯準會理事 Waller</text>`;
    g+=`<text x="${RX+30}" y="${y+126}" style="font-size:50px;font-weight:900;fill:${T.text}">傾向升息一碼</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="sb">通膨偏高可考慮兩碼</text>`;
    g+=`<style>.lb{fill:#c3c7ce;font-size:29px;font-weight:500}.sb{fill:${T.text};font-size:31px;font-weight:500}</style>`;
    return g;
  },
});
