// Glassnode（Cointelegraph、CryptoBriefing、FinanceFeeds）：穩定幣供給 30 天減少約 142 億美元，2022/6 以來最大單月收縮；USDT＋USDC 合計約減 110 億；2022/6 時 30 天減幅接近 300 億
// DefiLlama：11/12 穩定幣總市值約 2,869 億美元，近一個月約減 140 億（獨立來源）
const card=require('./lib-barcard.js');
POST({
  caption:'穩定幣一個月少了 142 億美元。',
  theme:'ink',width:1600,height:900,
  title:'穩定幣 30 天少了 142 億美元',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['2022 年 6 月',-300,'近 -300 億',false],['這次',-142,'-142 億',true]],
    range:[-400,0],ticks:[-400,-300,-200,-100,0],fmt:v=>v+' 億',
    stats:[['規模','2022/6 以來最大','單月收縮'],['USDT＋USDC','約 -110 億','占了大部分'],['穩定幣總市值','約 2,869 億','美元（DefiLlama）']],
  }),
});
