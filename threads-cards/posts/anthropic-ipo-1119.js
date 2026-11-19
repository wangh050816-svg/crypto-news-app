// Anthropic 11/18 定價每股 83 美元，高於 70–78 區間；CNBC：募資逾 813 億美元、史上最大 IPO 超越 SpaceX（擴大至 9.8 億股，AlphaSignal）；Fortune：估值約 1.5 兆（完全稀釋），以原 8.25 億股計至少 685 億；7 家策略夥伴（含 Google、Nvidia）另以 IPO 價買 260 億美元無投票權股；11/19 Nasdaq 交易 ANT（CNBC、Fortune、ABC、Motley Fool）
const card=require('./lib-barcard.js');
POST({
  caption:'Anthropic 定價 83 美元，史上最大 IPO。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic 定價 83 美元，史上最大 IPO',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['區間下緣',70,'70',false],['區間上緣',78,'78',false],['最終定價',83,'83',true]],
    range:[0,100],ticks:[0,20,40,60,80,100],fmt:v=>v+' 美元',
    stats:[['募資','逾 813 億美元','超越 SpaceX，史上最大'],['估值','約 1.5 兆美元','完全稀釋計算'],['策略夥伴','另買 260 億','Google、Nvidia 等 7 家']],
  }),
});
