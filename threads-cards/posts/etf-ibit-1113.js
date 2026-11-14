// SoSoValue（TokenPost、Cointelegraph）：現貨 BTC ETF 11/11 -2.998 億、11/12 -2.841 億、11/13 -1.854 億美元（連 7 個交易日流出）；11/13 IBIT -1.435 億、FBTC -0.419 億
// IBIT 自 10/30 起連 11 個交易日淨流出；連續兩週每週流出逾 10 億美元（Cointelegraph）；「兩週 23.5 億」歸屬各家不一，不採用
const card=require('./lib-barcard.js');
POST({
  caption:'BTC ETF 的流出還沒停，但速度在變慢。',
  theme:'ink',width:1600,height:900,
  title:'IBIT 連 11 天流出，速度開始放慢',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['11/11',-3.00,'-3.00 億',false],['11/12',-2.84,'-2.84 億',false],['11/13',-1.85,'-1.85 億',true]],
    range:[-3.5,0],ticks:[-3,-2,-1,0],fmt:v=>v+' 億',
    stats:[['IBIT 連續流出','11 個交易日','10/30 起'],['現貨 ETF 整體','連 7 天流出','單日金額縮小'],['連續兩週','每週逾 10 億','美元淨流出']],
  }),
});
