// 泰國證交會 11/12 公布草案（FinanceFeeds、Crypto Times、Blockonomi、CoinReporter）：每位客戶在每家持牌業者，穩定幣存入、提出各自每日上限 500 萬泰銖（約 14.8 萬美元）；限制第三方錢包轉帳、業者須確認錢包為客戶本人；意見徵詢至 11/26；未生效；目的為防洗錢、網路犯罪與規避跨境匯款規定
POST({
  caption:'泰國要限制穩定幣進出，每人每天 500 萬泰銖。',
  theme:'ink',width:1600,height:900,
  title:'泰國擬限穩定幣進出：每天 500 萬泰銖',titleSize:52,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    g+=`<rect x="110" y="170" width="840" height="300" rx="26" fill="${T.fg}" fill-opacity="0.12" stroke="${T.fg}" stroke-opacity="0.8" stroke-width="3"/>`;
    g+=`<text x="150" y="235" class="sm">每人、每家業者、每天</text>`;
    g+=`<text x="150" y="350" style="font-size:96px;font-weight:700;fill:${T.fg}">500 萬泰銖</text>`;
    g+=`<text x="150" y="430" style="font-size:38px;font-weight:700;fill:${T.text}">約 14.8 萬美元，存入、提出各自計算</text>`;
    g+=`<text x="110" y="560" style="font-size:40px;font-weight:700;fill:${T.text}">轉到第三方錢包<tspan fill="${T.fg}">也要管</tspan></text>`;
    g+=`<text x="110" y="620" class="sm">業者要確認錢包真的是客戶本人的</text>`;
    g+=`<text x="110" y="700" class="sm">理由：防洗錢、網路犯罪、規避跨境匯款規定</text>`;
    const stats=[['目前狀態','草案','還沒生效'],['意見徵詢','到 11/26','泰國證交會'],['豁免','本人帳戶互轉','雙方業者都適用旅行規則']];
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
