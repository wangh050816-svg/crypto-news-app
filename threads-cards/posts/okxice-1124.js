// OKXICE（OKX 與 ICE 合資）11/23 上線代幣化證券平台，確認 113 檔分階段上架，首日 6 檔：Coinbase、Robinhood、Strategy、Circle、Securitize、BitGo，以 USDC 計價、24 小時交易；67 家公司提出反對（含 Apple、Nvidia、Tesla、Amazon），反對即不能代幣化；CNBC 曾報初期 62 家目標中 56 家反對；僅限 OKX Inc. 合格美國客戶（Unchained、CoinMarketCap、crypto.news、MLQ）
const card=require('./lib-barcard.js');
POST({
  caption:'代幣化美股上線，67 家公司說不要。',
  theme:'ink',width:1600,height:900,
  title:'紐交所母公司做代幣化美股，67 家公司說不要',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['確認要上',113,'113 檔',false],['公司反對',67,'67 家',true],['第一天能交易',6,'6 檔',false]],
    range:[0,120],ticks:[0,40,80,120],fmt:v=>v,
    stats:[['首日 6 檔','都是幣圈股','Coinbase、Robinhood 等'],['反對名單','Apple、Nvidia','Tesla、Amazon 也在內'],['交易時間','24 小時','用 USDC 買']],
  }),
});
