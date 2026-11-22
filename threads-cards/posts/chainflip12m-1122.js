// Chainflip Labs 11/22 確認被盜約 1,200 萬美元（122.86 BTC、520.22 ETH、325 萬 USDC、758,141 USDT），早先報導 486 萬；提供 10% 賞金（約 120 萬），要求 11/23 18:38 UTC 前歸還 90%，視為白帽並撤回報案；已找出取得金鑰的方式；稱有攻擊者識別資訊、監控 Tornado Cash 提領（KuCoin、Forklog、Bitcoinist、MLQ）
const card=require('./lib-barcard.js');
POST({
  caption:'Chainflip 被盜金額從 486 萬變 1,200 萬。',
  theme:'ink',width:1600,height:900,
  title:'Chainflip 被盜上修到 1,200 萬，開價 10% 求還錢',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['昨天報導',486,'486 萬',false],['官方確認',1200,'約 1,200 萬',true]],
    range:[0,1400],ticks:[0,400,800,1200],fmt:v=>v+' 萬',
    stats:[['賞金','10%','約 120 萬美元'],['期限','11/24 凌晨','台灣時間 02:38'],['被偷的','4 種資產','含 122.86 顆 BTC']],
  }),
});
