// Public Citizen：川普迷因幣晚宴 130 個入選錢包中 66 個的 TRUMP 來自限制美國用戶的交易所（Binance 國際站、Bybit、BloFin）；VIP 29 個中 15 個；14 個錢包疑似同一人或團體控制；第一名為新加坡相關平台 FastX，11/16 快照持有約 165 萬美元 TRUMP；TRUMP 距高點 75.35 跌約 98.8%（Cointelegraph、KuCoin、The Currency Analytics、CoinCentral）
const card=require('./lib-barcard.js');
POST({
  caption:'川普晚宴名單，一半錢包的幣來自美國用不了的交易所。',
  theme:'ink',width:1600,height:900,
  title:'川普迷因幣晚宴，一半錢包來自海外交易所',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['入選錢包',130,'130',false],['來自海外交易所',66,'66',true],['VIP 錢包',29,'29',false],['VIP 來自海外',15,'15',true]],
    range:[0,140],ticks:[0,35,70,105,140],fmt:v=>v,
    stats:[['疑似同一人','14 個錢包','10 月各從幣安拿約 3,700 顆'],['第一名','FastX','新加坡相關平台'],['TRUMP 幣','跌了 98.8%','距離高點 75.35']],
  }),
});
