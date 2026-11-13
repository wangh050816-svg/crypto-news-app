// BLS 10 月 PPI（11/13 8:30 ET；Stocktitan、MLQ、Seeking Alpha、Riotimes、CNBC 引述）：最終需求月增 0.3%（預估 0.4%）、年增 6.5%（預估 6.6%，2022/11 以來最高）；核心（扣食品能源）月增 0.3%（符合預期）、年增 5.0%
// 反應：CoinGecko 5 分鐘線 BTC 21:25 約 69,165 → 21:35 約 69,839，22:40 回到約 69,200；CNBC：公布後 10 年期約 5.14%
const card=require('./lib-barcard.js');
POST({
  caption:'PPI 月增比預期低一點，年增卻是 2022 年以來最高。',
  theme:'ink',width:1600,height:900,
  title:'10 月 PPI：月增放緩，年增 6.5%',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['月增預估',0.4,'+0.4%',false],['月增實際',0.3,'+0.3%',true]],
    range:[0,0.5],ticks:[0,0.1,0.2,0.3,0.4,0.5],fmt:v=>v.toFixed(1)+'%',
    stats:[['年增率','6.5%','2022/11 以來最高，預估 6.6%'],['核心 PPI','月增 0.3%','年增 5.0%，符合預期'],['10 年期殖利率','約 5.14%','公布後仍在 5% 以上']],
  }),
});
