// DTCC 11/12 宣布代幣化服務將接上 Solana，目標 2027 下半年，涵蓋 DTC 託管的合格股票、指數 ETF、美債（The Block、Decrypt、CoinMarketCap）
// 路線圖：2026/10/28 在 Canton 與 DTCC 私有 Besu 上線；Stellar 預計 2027 上半年；未公布確切日期與首批證券
POST({
  caption:'美國證券結算龍頭 DTCC 要把代幣化證券放上 Solana。',
  theme:'ink',width:1600,height:900,
  title:'DTCC：代幣化證券 2027 要上 Solana',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const X0=150,X1=930,Y=420,pts=[[0,'2026/10/28','Canton、Besu 上線'],[0.5,'2027 上半年','Stellar'],[1,'2027 下半年','Solana']];
    const x=t=>X0+t*(X1-X0);
    g+=`<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    pts.forEach(([t,a,b],i)=>{
      const hl=i===2,c=hl?T.fg:T.text,an=i===0?'start':i===2?'end':'middle',tx=i===0?x(t)-18:i===2?x(t)+18:x(t);
      g+=`<circle cx="${x(t)}" cy="${Y}" r="20" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      g+=`<text x="${tx}" y="${Y-56}" text-anchor="${an}" style="font-size:40px;font-weight:700;fill:${c}">${a}</text>`;
      g+=`<text x="${tx}" y="${Y+76}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="660" style="font-size:40px;font-weight:700;fill:${T.text}">投資人保障與<tspan fill="${T.fg}">傳統持有相同</tspan></text>`;
    g+=`<text x="${X0-20}" y="716" class="sm">確切日期與首批證券都還沒公布</text>`;
    const stats=[['涵蓋資產','股票、ETF、美債','DTC 託管的合格證券'],['目標時間','2027 下半年','DTCC 稱路線圖僅供參考'],['SOL 持有者','直接受益未知','公告沒提交易量與收入']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:50px;font-weight:700}</style>`;
    return g;
  },
});
