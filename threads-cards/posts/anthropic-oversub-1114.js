// Reuters（Unite.ai、Piq 引述）：Anthropic IPO 路演第一天訂單約 2 倍、第三天約 6 倍；Bloomberg（Stockanalysis）：區間 70–78 美元下認購數倍；FT：承銷商預期定價高於 78；報導稱 11/18 定價、11/19 Nasdaq 交易（代號 ANT）；散戶配售約 20%
const card=require('./lib-barcard.js');
POST({
  caption:'Anthropic 的 IPO 認購，據報導已經超過 6 倍。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic IPO：認購約 6 倍',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['路演第 1 天',2,'約 2 倍',false],['路演第 3 天',6,'約 6 倍',true]],
    range:[0,7],ticks:[0,2,4,6],fmt:v=>v+' 倍',
    stats:[['價格區間','70–78 美元','FT：可能訂在上緣以上'],['預計定價','11/18','11/19 Nasdaq 交易'],['散戶配售','約 20%','一般約 5%–10%']],
  }),
});
