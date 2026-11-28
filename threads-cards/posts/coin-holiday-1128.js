// 感恩節 11/26 Nasdaq 休市，OKXICE 上有人以 106.24 USDC/股買代幣化 Coinbase（共 125.49 USDC）；COIN 前一交易日收 103.72 美元、盤後最高 106.91；德國 Tradegate 感恩節成交 142 股、每股 97.50 歐元（約 107 美元）（Cointelegraph、FinScans、PiQ、Coin-Turk）
const card=require('./lib-barcard.js');
POST({
  caption:'美股放假，代幣化股票照樣成交。',
  theme:'ink',width:1600,height:900,
  title:'美股放假，有人照樣用 USDC 買 Coinbase',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['休市前收盤',103.72,'103.72',false],['盤後最高',106.91,'106.91',false],['感恩節代幣成交',106.24,'106.24',true]],
    range:[0,120],ticks:[0,30,60,90,120],fmt:v=>v,
    stats:[['成交地點','OKXICE','代幣化股票平台'],['這筆總額','125.49 USDC','一筆小單'],['德國同天','每股 97.5 歐元','約 107 美元']],
  }),
});
