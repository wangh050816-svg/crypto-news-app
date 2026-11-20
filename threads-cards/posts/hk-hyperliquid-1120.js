// 香港證監會 11/18 把「Hyperliquid / Hyperliquid Hong Kong」（app.hyperliquid.xyz）列入可疑虛擬資產交易平台名單：未獲證監會發牌、涉嫌在港經營或向港人推廣；未指控詐騙；未宣布封鎖網站或暫停交易；Hyperliquid 未回應（Finance Magnates、CoinMarketCap、BeInCrypto、Crypto Briefing）
const card=require('./lib-textcard.js');
POST({
  caption:'香港把 Hyperliquid 列入可疑平台。',
  theme:'ink',width:1600,height:900,
  title:'香港證監會把 Hyperliquid 列為可疑平台',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['理由',30],['沒有香港牌照',44],['涉嫌向香港人推廣',52,true],['',10],['名單上寫的網址',30],['app.hyperliquid.xyz',40]],
    stats:[['名單','可疑交易平台','11/18 加入'],['有沒有說詐騙','沒有','只說沒牌照'],['會不會封網站','還沒宣布','Hyperliquid 沒回應']]}),
});
