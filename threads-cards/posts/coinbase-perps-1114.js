// Coinbase 執行長 Armstrong 11/13 在 X 表示，股票永續合約將透過 Coinbase Pro 進入美國（PANews、Phemex、Stocktwits/TradingView）；已在 3 月對美國以外客戶推出；已向 SEC 提交兩份通知；Capital Markets Alliance Association（成員含 Cboe、Citadel Securities）在紐約聯邦法院告 CFTC，要推翻單一股票永續合約的核准（The Block、Stocktwits）；美國上線日期未公布
POST({
  caption:'Coinbase 要把股票永續合約帶進美國。',
  theme:'ink',width:1600,height:900,
  title:'Coinbase：股票永續合約要進美國',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const X0=150,X1=930,Y=400,x=t=>X0+t*(X1-X0);
    g+=`<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    [[0,'今年 3 月','美國以外先上線','start',false],[0.5,'11/13','執行長宣布進美國','middle',false],[1,'尚未公布','美國上線日期','end',true]].forEach(([t,a,b,an,hl])=>{
      const c=hl?T.fg:T.text,tx=an==='start'?x(t)-18:an==='end'?x(t)+18:x(t);
      g+=`<circle cx="${x(t)}" cy="${Y}" r="20" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      g+=`<text x="${tx}" y="${Y-56}" text-anchor="${an}" style="font-size:40px;font-weight:700;fill:${c}">${a}</text>`;
      g+=`<text x="${tx}" y="${Y+76}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="640" style="font-size:40px;font-weight:700;fill:${T.text}">傳統券商陣營<tspan fill="${T.fg}">已提告</tspan>反對</text>`;
    g+=`<text x="${X0-20}" y="696" class="sm">成員包括 Cboe、Citadel Securities</text>`;
    const stats=[['上線管道','Coinbase Pro','執行長說即將推出'],['監管','SEC＋CFTC','已提交兩份 SEC 通知'],['被告的是','CFTC','要推翻永續合約核准']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:54px;font-weight:700}</style>`;
    return g;
  },
});
