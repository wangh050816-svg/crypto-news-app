// 美國 10 月 PPI 前瞻（投行研究報告風格，依使用者 11/12 文字）
// 查證：
// 9 月 PPI 月增 1.3%（BLS 10/15 公布；fxmacrodata、finobird）
// 10 月 PPI 月增預估 0.4%、年增預估 6.6%（Dow Jones 共識：stocktitan、CoinEdition、TradingKey）；另有日曆列年增 6.1%，屬少數
// 9 月 PPI 年增 6.3%（fxmacrodata、finobird）
// 核心 PPI 月增預估 0.3%（CoinEdition、TradingKey、Investing.com）
// 公布時間 11/13（五）8:30 ET = 台灣 21:30（financecalendar、thriveinmarkets 13:30 UTC）
// Waller 11/10：核心通膨月增約 0.3% 或更高，12 月應考慮升息 50bp（Yahoo Finance、Seeking Alpha、investingLive）
// 10 月核心 CPI 月增 0.3%（stocktitan、TradingKey）
// 人物照（Christopher Waller）：檔案放在 assets/christopher-waller.jpg 就會自動套用（需先轉灰階、壓暗，做法同 jensen-huang-stanford-2026.jpg）
const fs=require('fs'), facePath=__dirname+'/../assets/christopher-waller.jpg';
const face=fs.existsSync(facePath)?'data:image/jpeg;base64,'+fs.readFileSync(facePath).toString('base64'):null;
POST({
  caption:'美國 10 月 PPI 明晚公布，市場關注通膨是否降溫、聯準會 12 月是否升息兩碼。',
  theme:'research',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    const L=80;
    let g=`<defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/></pattern>
      <linearGradient id="barA" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${T.fg}"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.75"/></linearGradient>
      <linearGradient id="barB" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c9ced6"/><stop offset="1" stop-color="#c9ced6" stop-opacity="0.6"/></linearGradient>
    </defs>`;
    // 背景：網格、裝飾性行情線（非數據）
    g+=`<rect width="1600" height="900" fill="url(#grid)"/>`;
    const wave=(seed,y0,amp,op,col)=>{let s=seed,pts=[],v=0;const r=()=>(s=(s*16807)%2147483647)/2147483647;
      for(let x=0;x<=1600;x+=16){v+=(r()-.5)*amp;v*=.94;pts.push(`${x},${(y0+v).toFixed(1)}`)}
      return `<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-opacity="${op}" stroke-width="2"/>`;};
    g+=wave(11,520,46,0.06,T.text)+wave(29,610,38,0.05,T.fg)+wave(53,700,30,0.04,T.text);
    // 人物（中間偏右、低透明度）
    if(face){
      g+=`<defs><linearGradient id="fL" x1="0" x2="1"><stop offset="0" stop-color="${T.bg}"/><stop offset="0.4" stop-color="${T.bg}" stop-opacity="0"/></linearGradient>
        <linearGradient id="fR" x1="0" x2="1"><stop offset="0.65" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient>
        <linearGradient id="fB" x1="0" x2="0" y1="0" y2="1"><stop offset="0.55" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient></defs>`;
      g+=`<image href="${face}" x="640" y="-10" width="660" height="880" preserveAspectRatio="xMidYMid slice" opacity="0.5"/>`;
      ['fL','fR','fB'].forEach(id=>g+=`<rect x="640" y="0" width="660" height="900" fill="url(#${id})"/>`);
    }
    // 標籤與標題
    g+=`<rect x="${L}" y="58" width="6" height="26" fill="${T.fg}"/>`;
    g+=`<text x="${L+20}" y="80" style="font-family:Inter;font-size:24px;font-weight:700;letter-spacing:4px;fill:${T.dim}">US INFLATION WATCH<tspan fill="${T.fg}" dx="12">|</tspan><tspan dx="12">FED POLICY</tspan></text>`;
    g+=`<text x="${L-4}" y="160" style="font-size:66px;font-weight:900;fill:${T.text}">明晚 <tspan style="font-family:Inter;font-weight:800">PPI</tspan> 要來了</text>`;
    g+=`<text x="${L-4}" y="256" style="font-size:66px;font-weight:900;fill:${T.text}"><tspan style="font-size:86px;fill:${T.fg}">升息兩碼</tspan>討論再升溫？</text>`;
    // 左側柱狀圖
    const X0=L+70, X1=880, B=730, top=370, max=2.0, yv=v=>B-v/max*(B-top);
    [0,0.5,1.0,1.5,2.0].forEach(t=>{
      g+=`<line x1="${X0}" x2="${X1}" y1="${yv(t)}" y2="${yv(t)}" stroke="${T.text}" stroke-opacity="${t===0?0.5:0.12}" stroke-width="${t===0?2:1}" ${t?'stroke-dasharray="2 6"':''}/>`;
      g+=`<text x="${X0-14}" y="${yv(t)+9}" text-anchor="end" style="font-family:Inter;font-size:24px;fill:${T.dim}">${t.toFixed(1)}%</text>`;
    });
    const bars=[[1.3,'+1.3%','9 月實際','','url(#barA)',T.fg,96],[0.4,'+0.4%','10 月預估','','url(#barB)','#d6dae0',76]];
    bars.forEach(([v,lab,a,b,fill,col,fs],i)=>{
      const cx=X0+190+i*330, w=190, y=yv(v);
      g+=`<rect x="${cx-w/2}" y="${y}" width="${w}" height="${B-y}" fill="${fill}"/>`;
      if(i===1) g+=`<rect x="${cx-w/2}" y="${y}" width="${w}" height="${B-y}" fill="none" stroke="#d6dae0" stroke-opacity="0.5" stroke-dasharray="6 6"/>`;
      g+=`<text x="${cx}" y="${y-22}" text-anchor="middle" style="font-family:Inter;font-size:${fs}px;font-weight:800;fill:${col}">${lab}</text>`;
      g+=`<text x="${cx}" y="${B+46}" text-anchor="middle" style="font-size:30px;font-weight:700;fill:${T.text}">${a}<tspan style="font-weight:500;fill:${T.dim}">${b}</tspan></text>`;
    });
    g+=`<text x=\"${L}\" y=\"${top-40}\" text-anchor=\"start\" style=\"font-size:26px;font-weight:700;fill:${T.dim}\">PPI 月增率</text>`;
    // 右側資訊卡
    const RX=1110, RW=430, P=26;
    const card=(y,h)=>`<rect x="${RX}" y="${y}" width="${RW}" height="${h}" fill="${T.grid}" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.22"/>`;
    let y=110;
    g+=card(y,160)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
    g+=`<text x="${RX+P}" y="${y+44}" class="lb">公布時間</text>`;
    g+=`<text x="${RX+P-3}" y="${y+108}" style="font-family:Inter;font-size:62px;font-weight:800;fill:${T.fg}">11/13<tspan dx="20">21:30</tspan></text>`;
    g+=`<text x="${RX+P}" y="${y+146}" class="lb" style="fill:${T.text}">台灣時間（週五）</text>`;
    y=282;
    g+=card(y,125);
    g+=`<text x="${RX+P}" y="${y+44}" class="lb">年增預估</text>`;
    g+=`<text x="${RX+P-3}" y="${y+110}" style="font-family:Inter;font-size:62px;font-weight:800;fill:${T.text}">6.6%</text>`;
    g+=`<text x="${RX+RW-P}" y="${y+106}" text-anchor="end" class="lb">9 月為 <tspan style="font-family:Inter;font-weight:700;fill:${T.text}">6.3%</tspan></text>`;
    y=419;
    g+=card(y,150);
    g+=`<text x="${RX+P}" y="${y+44}" class="lb">核心 PPI 預估</text>`;
    g+=`<text x="${RX+P-3}" y="${y+98}" style="font-size:40px;font-weight:900;fill:${T.text}">月增 <tspan style="font-family:Inter;font-size:56px;font-weight:800">0.3%</tspan></text>`;
    g+=`<text x="${RX+P}" y="${y+136}" class="lb">扣除食品與能源</text>`;
    // 政策觀察
    y=590;const H=262;
    g+=`<line x1="${RX}" x2="${RX}" y1="${y}" y2="${y+H}" stroke="${T.fg}" stroke-width="3"/>`;
    g+=`<text x="${RX+P}" y="${y+28}" style="font-family:Inter;font-size:22px;font-weight:700;letter-spacing:3px;fill:${T.fg}">POLICY WATCH</text>`;
    const lines=[
      'Waller 近日表示，若核心',
      'CPI 月增約 <b>0.3%</b> 或更高，',
      '12 月應考慮升息 <o>50 個基點</o>。',
      '',
      '本週核心 CPI 月增為 <b>0.3%</b>，',
      '接下來市場將觀察 PPI',
      '是否再度偏熱。'];
    let ly=y+64;
    lines.forEach(t=>{ if(!t){ly+=12;return;}
      t=t.replace(/<b>(.+?)<\/b>/g,`<tspan style="font-family:Inter;font-weight:700;fill:${T.text}">$1</tspan>`).replace(/<o>(.+?)<\/o>/g,`<tspan style="font-weight:700;fill:${T.fg}">$1</tspan>`);
      g+=`<text x="${RX+P}" y="${ly}" class="pw">${t}</text>`;ly+=35;});
    g+=`<style>.lb{fill:${T.dim};font-size:29px;font-weight:500}.pw{fill:${T.dim};font-size:28px;font-weight:500}</style>`;
    return g;
  },
});
