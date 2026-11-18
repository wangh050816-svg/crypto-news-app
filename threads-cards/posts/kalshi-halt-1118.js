// CFTC 暫停 Kalshi 川普「會說什麼」合約認證，Kalshi 11/17 表示遵守；CFTC 稱可能易遭操縱；12/11 前回覆（CoinDesk、CNBC、The Hill、Quartz）
// 背景：白宮提詞機操作員利用講稿交易遭 CFTC 罰；9 月 CFTC 員工警告 mention 合約
POST({
  caption:'Kalshi 的川普發言賭盤被叫停。',
  theme:'ink',width:1600,height:900,
  title:'賭川普會說什麼？Kalshi 被監管叫停',titleSize:54,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const X0=150,X1=930,Y=420,pts=[[0,'8 月','提詞機案'],[0.33,'9 月','CFTC 警告'],[0.67,'11/17','Kalshi 下架'],[1,'12/11','回覆期限']];
    const x=t=>X0+t*(X1-X0);
    g+=`<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="8" stroke-linecap="round"/>`;
    pts.forEach(([t,a,b],i)=>{
      const hl=i===2,c=hl?T.fg:T.text,an=i===0?'start':i===3?'end':'middle',tx=i===0?x(t)-18:i===3?x(t)+18:x(t);
      g+=`<circle cx="${x(t)}" cy="${Y}" r="20" fill="${c}" stroke="${T.bg}" stroke-width="5"/>`;
      g+=`<text x="${tx}" y="${Y-56}" text-anchor="${an}" style="font-size:40px;font-weight:700;fill:${c}">${a}</text>`;
      g+=`<text x="${tx}" y="${Y+76}" text-anchor="${an}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="660" style="font-size:40px;font-weight:700;fill:${T.text}">CFTC：這類合約<tspan fill="${T.fg}">可能被操縱</tspan></text>`;
    g+=`<text x="${X0-20}" y="716" class="sm">副總統 Vance 的發言合約還在</text>`;
    const stats=[['被下架','川普發言合約','綽號、話題、點名誰'],['理由','可能被操縱','CFTC 暫停認證'],['什麼時候恢復','還不知道','12/11 前要回覆']];
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
