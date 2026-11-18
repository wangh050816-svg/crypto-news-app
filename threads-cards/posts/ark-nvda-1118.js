// ARK 11/16 賣 543,092 股 NVDA 約 8,480 萬美元（收盤 156.14），同日最大買進 SpaceX 約 5,270 萬（Yahoo Finance/24/7 Wall St、Cointelegraph、Invezz）
// Nvidia Q3 FY27 官方新聞稿：營收 1,158 億（預估約 1,093 億）、資料中心 1,076 億、下季指引 1,300 億 ±3% 不含中國資料中心；盤後上漲（CoinDesk、StockTitan）
const card=require('./lib-barcard.js');
POST({
  caption:'木頭姐財報前一天賣掉 Nvidia。',
  theme:'ink',width:1600,height:900,
  title:'木頭姐財報前賣 Nvidia，財報卻超預期',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['賣出 Nvidia',8480,'8,480 萬',true],['買進 SpaceX',5270,'5,270 萬',false]],
    range:[0,10000],ticks:[0,2500,5000,7500,10000],fmt:v=>(v/10000)+' 億',
    stats:[['Q3 營收','1,158 億美元','市場預估約 1,093 億'],['下季指引','1,300 億美元','上下 3%'],['中國資料中心','指引算 0','財報後股價盤後上漲']],
  }),
});
