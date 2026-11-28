// 11/28：World Liberty Financial 代幣 WLFI 單日跌約 50–56%、創新低；項目相關儲備錢包賣出約 1.2 萬枚 ETH（約 2,000 萬美元、估虧約 1,900 萬）；USD1 在 Binance 一度跌到約 0.94、Gate 一度 0.84；孫宇晨指控詐欺、呼籲下架；WLFI 未回應（CoinDesk、TokenPost、Crypto Briefing、Coingape、動區）
const card=require('./lib-textcard.js');
POST({
  caption:'川普家族的穩定幣脫錨了。',
  theme:'ink',width:1600,height:900,
  title:'川普家族的幣腰斬，穩定幣 USD1 跟著脫錨',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['WLFI 一天跌掉一半',44,true],
    ['跌到歷史新低',32,false],
    ['項目錢包賣出約 2,000 萬美元 ETH',44,false],
    ['USD1 在幣安跌到 0.94',44,false],
    ['孫宇晨跳出來喊下架',32,false],
  ],
  stats:[['WLFI','跌約 50%','11/28'],['USD1 最低','約 0.94 美元','幣安盤中低點'],['官方','還沒回應','鏈上資料先曝光']]}),
});
