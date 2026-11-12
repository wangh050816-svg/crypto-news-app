// SoSoValue 11/11（TokenPost、CryptoBriefing 引述）：美國現貨 BTC ETF 單日淨流出約 2.999 億美元；IBIT 流出 2.6973 億、GBTC 流出 3,913 萬
// 2026 年累計淨流出已超過 11 億美元（Bitcoin.com、Crypto Economy），若年底仍為負，將是 2024/1 上市以來第一個淨流出年度（CryptoBriefing）
// BTC 約 73,300 美元（CoinGecko 11/12 17:50 台北時間）
const card=require('./lib-barcard.js');
POST({
  caption:'BTC ETF 今年可能第一次全年淨流出。',
  theme:'ink',width:1600,height:900,
  title:'BTC ETF 今年可能第一次全年淨流出',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['GBTC',-0.39,'-0.39 億',false],['IBIT',-2.70,'-2.70 億',true],['全部合計',-3.00,'-3.00 億',false]],
    range:[-3.5,0],ticks:[-3,-2,-1,0],fmt:v=>v+' 億',
    stats:[['2026 年累計','淨流出逾 11 億','美元'],['11/11 單日','IBIT 占九成','自己就流出 2.7 億美元'],['BTC 現價','約 7.3 萬','美元']],
  }),
});
