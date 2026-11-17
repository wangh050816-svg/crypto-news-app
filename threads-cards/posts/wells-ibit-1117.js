// 富國銀行 Q3 13F（11/17 申報）：9/30 持有約 4,958 萬股 IBIT，約 23.5 億美元；Q2 約 2,440 萬股、約 8.12 億美元（TFTC、Bloomingbit、KuCoin）
// Alex Thorn：約 85% 記在旗下兩家券商的客戶部位（Yahoo Finance）；增幅含價格上漲
const card=require('./lib-barcard.js');
POST({
  caption:'富國銀行的 IBIT 部位，三個月翻倍。',
  theme:'ink',width:1600,height:900,
  title:'富國銀行 IBIT 部位，三個月翻倍',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['6 月底',8.12,'8.1 億',false],['9 月底',23.5,'23.5 億',true]],
    range:[0,25],ticks:[0,5,10,15,20,25],fmt:v=>v+' 億',
    stats:[['持有股數','約 4,958 萬股','6 月底約 2,440 萬股'],['約 85%','客戶部位','記在旗下兩家券商'],['資料時間','9 月 30 日','之後 BTC 已跌到 6.4 萬']],
  }),
});
