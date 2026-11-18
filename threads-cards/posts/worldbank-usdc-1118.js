// 世界銀行集團 11/17 宣布與 Citi、Circle 探索以 USDC 撥款；建立在 FundsChain（追蹤 96 國、350+ 專案）；先從允許數位資產的借款國、中介式模式開始；2023 年世銀曾警告穩定幣普及可能取代本國貨幣（The Block、Cointelegraph、CoinMarketCap）
const card=require('./lib-textcard.js');
POST({
  caption:'世界銀行要試用 USDC 撥款。',
  theme:'ink',width:1600,height:900,
  title:'世界銀行找 Citi、Circle，試用 USDC 撥款',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:220,lines:[['2023 年',30],['警告穩定幣可能取代本國貨幣',40],['',10],['2026 年',30],['自己要試 USDC',60,true]],
    stats:[['合作','Citi＋Circle','銀行通路＋USDC'],['平台','96 國','FundsChain 追蹤 350+ 專案'],['階段','先測試','從允許數位資產的國家開始']]}),
});
