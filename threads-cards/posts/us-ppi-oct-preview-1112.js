// 美國 10 月 PPI 前瞻（與 nvda-huang-board-1112.js 同系列版型，依使用者 11/12 文字）
// 查證：
// 9 月 PPI 月增 1.3%、年增 6.3%（BLS 10/15 公布；fxmacrodata、finobird）
// 10 月 PPI 月增預估 0.4%、年增預估 6.6%（Dow Jones 共識：stocktitan、CoinEdition、TradingKey）；另有日曆列年增 6.1%，屬少數
// 核心 PPI 月增預估 0.3%（CoinEdition、TradingKey、Investing.com）
// 公布時間 11/13（五）8:30 ET = 台灣 21:30（financecalendar、thriveinmarkets 13:30 UTC）
// 人物照：Christopher J. Waller, Federal Reserve Governor（Fed 理事會官方肖像，Wikimedia Commons），
//   美國聯準會理事會作品屬公有領域；已轉灰階、壓暗
const face='data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/christopher-waller.jpg').toString('base64');
const DOWN=30; // 前景整體下移，與黃仁勳那張相同
POST({
  caption:'美國 10 月 PPI 明晚公布，市場關注通膨是否降溫，以及聯準會 12 月的升息幅度。',
  theme:'bulletin',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    let g=`<defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/></pattern>
      <linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${T.bg}"/><stop offset="0.45" stop-color="${T.bg}" stop-opacity="0"/></linearGradient>
      <linearGradient id="fadeB" y1="0" y2="1" x1="0" x2="0"><stop offset="0.55" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient>
      <linearGradient id="fadeR" x1="0" x2="1"><stop offset="0.7" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient>
      <linearGradient id="barA" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${T.fg}"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.78"/></linearGradient>
      <linearGradient id="barB" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c9ced6"/><stop offset="1" stop-color="#c9ced6" stop-opacity="0.6"/></linearGradient>
    </defs>`;
    // 背景：網格、電路紋理、裝飾性行情線（非數據）
    g+=`<rect width="1600" height="900" fill="url(#grid)"/>`;
    let c='';const rnd=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(7);
    for(let i=0;i<26;i++){let x=40+rnd()*1520,y=40+rnd()*820,d=`M${x|0} ${y|0}`;
      for(let k=0;k<3;k++){const L=40+rnd()*120;rnd()<.5?x+=(rnd()<.5?-L:L):y+=(rnd()<.5?-L:L);d+=` L${x|0} ${y|0}`;}
      c+=`<path d="${d}" fill="none" stroke="#ffffff" stroke-width="1.5"/><circle cx="${x|0}" cy="${y|0}" r="4" fill="none" stroke="#ffffff" stroke-width="1.5"/>`;}
    g+=`<g opacity="0.05">${c}</g>`;
    {let s=31,v=0,p=[];const r=()=>(s=(s*16807)%2147483647)/2147483647;
     for(let x=60;x<=1540;x+=20){v+=(r()-.5)*40;v*=.95;p.push(`${x},${(560+v).toFixed(1)}`)}
     g+=`<polyline points="${p.join(' ')}" fill="none" stroke="${T.fg}" stroke-opacity="0.045" stroke-width="4" stroke-linejoin="round"/>`;}
    // 人物
    g+=`<image href="${face}" x="600" y="-20" width="700" height="935" preserveAspectRatio="xMidYMid slice" opacity="0.78"/>`;
    ['fadeL','fadeB','fadeR'].forEach(id=>g+=`<rect x="600" y="0" width="700" height="900" fill="url(#${id})"/>`);
    g+=`<g transform="translate(0,${DOWN})">`;
    // 標籤與標題
    const L=80;
    g+=`<rect x="${L}" y="58" width="6" height="26" fill="${T.fg}"/>`;
    g+=`<text x="${L+20}" y="80" style="font-family:Inter;font-size:24px;font-weight:700;letter-spacing:4px;fill:${T.dim}">US INFLATION WATCH<tspan fill="${T.fg}" dx="12">|</tspan><tspan dx="12">FED POLICY</tspan></text>`;
    g+=`<text x="${L-4}" y="168" class="ti2">明晚 <tspan style="font-family:Inter;font-weight:800">PPI</tspan> 要來了</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2"><tspan fill="${T.fg}">升息幅度</tspan>再成焦點？</text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    // 左側柱狀圖
    const X0=L+70, X1=740, B=740, top=400, max=2.0, yv=v=>B-v/max*(B-top);
    g+=`<text x="${L}" y="350" style="font-size:26px;font-weight:700;fill:${T.dim}">PPI 月增率</text>`;
    [0,0.5,1.0,1.5,2.0].forEach(t=>{
      g+=`<line x1="${X0}" x2="${X1}" y1="${yv(t)}" y2="${yv(t)}" stroke="${T.text}" stroke-opacity="${t===0?0.5:0.12}" stroke-width="${t===0?2:1}" ${t?'stroke-dasharray="2 6"':''}/>`;
      g+=`<text x="${X0-14}" y="${yv(t)+8}" text-anchor="end" style="font-family:Inter;font-size:22px;fill:${T.dim}">${t.toFixed(1)}%</text>`;
    });
    [[1.3,'+1.3%','9 月實際','url(#barA)',T.fg,84],[0.4,'+0.4%','10 月預估','url(#barB)','#d6dae0',68]].forEach(([v,lab,a,fill,col,fs],i)=>{
      const cx=X0+150+i*300, w=170, y=yv(v);
      g+=`<rect x="${cx-w/2}" y="${y}" width="${w}" height="${B-y}" fill="${fill}"/>`;
      if(i===1) g+=`<rect x="${cx-w/2}" y="${y}" width="${w}" height="${B-y}" fill="none" stroke="#d6dae0" stroke-opacity="0.5" stroke-dasharray="6 6"/>`;
      g+=`<text x="${cx}" y="${y-20}" text-anchor="middle" style="font-family:Inter;font-size:${fs}px;font-weight:800;fill:${col}">${lab}</text>`;
      g+=`<text x="${cx}" y="${B+44}" text-anchor="middle" style="font-size:31px;font-weight:700;fill:${i?T.dim:T.text}">${a}</text>`;
    });
    // 右側資訊模組（尺寸、位置與黃仁勳那張相同）
    const RX=1150, RW=400;
    const box=(y,h)=>`<rect x="${RX}" y="${y}" width="${RW}" height="${h}" fill="#0c0d10" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.18"/>`;
    let y=150;
    g+=box(y,200)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">公布時間</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-family:Inter;font-size:62px;font-weight:800;fill:${T.fg}">11/13<tspan dx="18">21:30</tspan></text>`;
    g+=`<text x="${RX+28}" y="${y+174}" class="lb" style="fill:${T.text}">台灣時間（週五）</text>`;
    y=375;
    g+=box(y,205);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">年增預估</text>`;
    g+=`<text x="${RX+24}" y="${y+130}" style="font-family:Inter;font-size:80px;font-weight:800;fill:${T.text}">6.6%</text>`;
    g+=`<text x="${RX+28}" y="${y+180}" class="lb">9 月為 <tspan style="font-family:Inter;font-weight:700;fill:${T.text}">6.3%</tspan></text>`;
    y=605;
    g+=box(y,200);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">核心 PPI 預估</text>`;
    g+=`<text x="${RX+26}" y="${y+124}" style="font-size:46px;font-weight:900;fill:${T.text}">月增 <tspan style="font-family:Inter;font-size:64px;font-weight:800">0.3%</tspan></text>`;
    g+=`<text x="${RX+28}" y="${y+174}" class="lb">扣除食品與能源</text>`;
    g+=`</g>`;
    g+=`<style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
