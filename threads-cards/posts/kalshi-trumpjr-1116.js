// Reuters 獨家 11/12（Investing.com、US News）：Kalshi 結束小川普顧問合約，因其創投 1789 Capital 領投 Polymarket 10 億美元新一輪、估值 210 億、出資約 3 億；小川普 2025/1 任 Kalshi 策略顧問；Kalshi 估值 400 億
// DeFiLlama（KuCoin 引述）：Kalshi 30 天成交 177 億 vs Polymarket 59 億；Polymarket 確認裁員（CoinDesk、Fox Business），否認 30% 說法
const card=require('./lib-barcard.js');
POST({
  caption:'川普長子被 Kalshi 解約，因為他的基金投了對手。',
  theme:'ink',width:1600,height:900,
  title:'川普長子被解約：預測市場打內戰',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['Kalshi',177,'177 億',true],['Polymarket',59,'59 億',false]],
    range:[0,200],ticks:[0,50,100,150,200],fmt:v=>v+' 億',
    stats:[['小川普的基金','領投 10 億','Polymarket 估值 210 億'],['Kalshi 估值','400 億美元','隨即結束他的顧問合約'],['Polymarket','剛裁員','成交量被拉開 3 倍']],
  }),
});
