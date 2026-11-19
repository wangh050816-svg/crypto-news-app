// CZ 11/18 在 X 宣布：代幣化 ANT 將在 IPO 第一天透過 bStocks、Ondo、xStocks 上 BNB Chain；持有人沒有股東權利（投票、股利）；Binance Wallet IPO 前活動認購達 5 億 USDC（認購承諾，不保證配到）；發放時間至少在 Nasdaq 開盤 2 小時後（CoinDesk、CZ X、Cryptowisser、Bitbase）
const card=require('./lib-textcard.js');
POST({
  caption:'Anthropic 上市第一天，鏈上也能買。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic 上市當天，幣安鏈也能買',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['CZ 宣布',30],['代幣化 ANT',44],['IPO 第一天上 BNB Chain',48,true],['',10],['買到的是追蹤股價的代幣',36],['沒有投票權、沒有股利',36]],
    stats:[['發行管道','3 家','bStocks、Ondo、xStocks'],['幣安錢包認購','5 億 USDC','只是認購，不保證配到'],['上線時間','開盤 2 小時後','確切時間還沒公布']]}),
});
