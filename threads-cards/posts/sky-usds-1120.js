// Inca Digital 追蹤約 5.18 億美元經 Sky PSM（USDC↔USDS/DAI），約 1.019 億歸因北韓（Crypto Briefing 另寫 900 萬）；報告後 USDS 供給縮約 35%（各家 30–38%），超過 15 億美元流出 PSM 準備；PSM 單一地址約 27 億 USDC，Circle 可凍結；USDS 維持掛鉤，未傳出凍結（CoinDesk、Crypto Briefing、MLQ、FinanceFeeds、Coinpaper）
const card=require('./lib-barcard.js');
POST({
  caption:'北韓駭客用過 Sky 的兌換機制，USDS 縮水 35%。',
  theme:'ink',width:1600,height:900,
  title:'北韓駭客用過 Sky，USDS 一口氣縮水 35%',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['被追蹤到的金額',5.18,'5.18 億',false],['流出準備',15,'超過 15 億',true],['可能被凍結',27,'約 27 億',false]],
    range:[0,30],ticks:[0,10,20,30],fmt:v=>v+' 億',
    stats:[['USDS 供給','少了約 35%','報告出來後'],['北韓相關','約 1 億美元','Inca Digital 追蹤'],['掛鉤','還維持 1 美元','目前沒傳出凍結']],
  }),
});
