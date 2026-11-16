// 11/14 難度調整（block 975744）下修 9.13%，約 148.36T → 134.82T（cryptonews.net、World Today News）；11 月前兩週算力少約 100 EH/s、礦工關機，出塊時間逾 10 分鐘（cryptonews.net；DCForecasts 稱出塊約 10.7 分鐘、預估下修約 6.8%）；hashprice 約 32 美元/PH/日（11/12），6 月月低約 27.7；歷史高點約 156T（2025/10）
const card=require('./lib-barcard.js');
POST({
  caption:'比特幣挖礦難度一口氣降了 9%，礦工在關機。',
  theme:'ink',width:1600,height:900,
  title:'挖礦難度大降 9%，礦工在關機',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['歷史高點',156,'約 156T',false],['調整前',148.36,'148.4T',false],['11/14 調整後',134.82,'134.8T',true]],
    range:[100,160],ticks:[100,120,140,160],fmt:v=>v+'T',
    stats:[['難度下修','-9.13%','11/14 調整'],['全網算力','少約 100 EH/s','11 月前兩週'],['出塊時間','超過 10 分鐘','正常是 10 分鐘']],
  }),
});
