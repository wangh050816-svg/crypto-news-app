// 美國 10 月 PPI 前瞻（照使用者 11/12 參考圖版面：圓角卡片、0–1.6% 刻度、大型人像）
// 查證：
// 9 月 PPI 月增 1.3%、年增 6.3%（BLS 10/15 公布；fxmacrodata、finobird）
// 10 月 PPI 月增預估 0.4%、年增預估 6.6%（Dow Jones 共識：stocktitan、CoinEdition、TradingKey）；另有日曆列年增 6.1%，屬少數
// 核心 PPI 月增預估 0.3%（CoinEdition、TradingKey、Investing.com）
// 公布時間 11/13（五）8:30 ET = 台灣 21:30（financecalendar、thriveinmarkets 13:30 UTC）
// 人物照：Christopher J. Waller, Federal Reserve Governor（Fed 理事會官方肖像，Wikimedia Commons，公有領域）；已轉灰階
// 背景 K 線與星點為裝飾，不是數據
const face='data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/christopher-waller-bright.jpg').toString('base64');
POST({
  caption:'美國 10 月 PPI 明晚公布，市場關注通膨是否降溫，以及聯準會 12 月的升息幅度。',
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
    g+=`<rect x="${L}" y="60" width="7" height="26" rx="3" fill="${T.fg}"/>`;
    g+=`<text x="${L+24}" y="84" style="font-family:Inter;font-size:27px;font-weight:600;letter-spacing:1px;fill:${T.dim}">US INFLATION WATCH<tspan dx="14" fill="${T.dim}">|</tspan><tspan dx="14">FED POLICY</tspan></text>`;
    g+=`<text x="${L-2}" y="176" style="font-size:72px;font-weight:900;fill:${T.text}">明晚 <tspan style="font-family:Inter;font-weight:800">PPI</tspan> 要來了</text>`;
    g+=`<text x="${L-2}" y="270" style="font-size:66px;font-weight:900;fill:${T.text}"><tspan style="font-size:80px;fill:${T.fg}">升息幅度</tspan>再成焦點？</text>`;
    // 柱狀圖
    const X0=168, X1=870, B=746, top=340, max=1.6, yv=v=>B-v/max*(B-top);
    [0,0.4,0.8,1.2,1.6].forEach(t=>{
      g+=`<line x1="${X0}" x2="${X1}" y1="${yv(t)}" y2="${yv(t)}" stroke="${T.text}" stroke-opacity="${t===0?0.45:0.16}" stroke-width="${t===0?2:1.2}"/>`;
      g+=`<text x="${X0-20}" y="${yv(t)+9}" text-anchor="end" style="font-family:Inter;font-size:26px;fill:${T.dim}">${t===0?'0':t.toFixed(1)}%</text>`;
    });
    const bar=(x,w,y,fill)=>{const r=14;return `<path filter="url(#sh)" d="M${x} ${B}V${y+r}Q${x} ${y} ${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${B}Z" fill="${fill}"/>`;};
    [[1.3,'+1.3%','9 月實際',249,208,T.fg,T.fg],[0.4,'+0.4%','10 月預估',572,222,'#8d8f94',T.text]].forEach(([v,lab,a,x,w,fill,col])=>{
      const y=yv(v);
      g+=bar(x,w,y,fill);
      g+=`<text x="${x+w/2}" y="${y-22}" text-anchor="middle" style="font-family:Inter;font-size:46px;font-weight:700;fill:${col}">${lab}</text>`;
      g+=`<text x="${x+w/2}" y="${B+50}" text-anchor="middle" style="font-size:31px;font-weight:500;fill:${T.text}">${a}</text>`;
    });
    // 右側卡片
    const RX=1134, RW=438, RH=197;
    const card=y=>`<rect x="${RX}" y="${y}" width="${RW}" height="${RH}" rx="22" fill="#2a2c31" fill-opacity="0.86" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5" filter="url(#sh)"/><rect x="${RX+1}" y="${y+1}" width="${RW-2}" height="60" rx="21" fill="#ffffff" fill-opacity="0.025"/>`;
    let y=134;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">公布時間</text>`;
    g+=`<text x="${RX+28}" y="${y+124}" style="font-family:Inter;font-size:62px;font-weight:700;fill:${T.fg}">11/13<tspan dx="16">21:30</tspan></text>`;
    g+=`<text x="${RX+32}" y="${y+170}" class="sb">台灣時間（週五）</text>`;
    y=351;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">年增預估</text>`;
    g+=`<text x="${RX+28}" y="${y+130}" style="font-family:Inter;font-size:70px;font-weight:700;fill:${T.text}">6.6%</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="lb">9 月為 6.3%</text>`;
    y=569;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">核心 PPI 預估</text>`;
    g+=`<text x="${RX+30}" y="${y+128}" style="font-size:60px;font-weight:900;fill:${T.text}">月增 <tspan style="font-family:Inter;font-size:66px;font-weight:700">0.3%</tspan></text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="sb">扣除食品與能源</text>`;
    g+=`<style>.lb{fill:#c3c7ce;font-size:29px;font-weight:500}.sb{fill:${T.text};font-size:31px;font-weight:500}</style>`;
    return g;
  },
});
