// Vanda Research：Anthropic 首日散戶成交 7.72 億美元、淨買入約 6,000 萬；SpaceX 6 月首日約 1.18 億；Coinbase 2021 年首日 9,200 萬；Vanda 原預估約 2.5 億；Vanda 歸因全球避險情緒（Yahoo Finance、Cointelegraph、KuCoin）
const card=require('./lib-barcard.js');
POST({
  caption:'史上最大 IPO，散戶淨買只有 SpaceX 一半。',
  theme:'ink',width:1600,height:900,
  title:'史上最大 IPO，散戶卻只買了 SpaceX 一半',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['預估',2.5,'2.5 億',false],['SpaceX',1.18,'1.18 億',false],['Coinbase',0.92,'0.92 億',false],['Anthropic',0.6,'0.6 億',true]],
    range:[0,3],ticks:[0,1,2,3],fmt:v=>v+' 億',
    stats:[['散戶成交','7.72 億美元','買賣都很熱'],['淨買入','約 6,000 萬','只有 SpaceX 一半'],['原因','全球避險','大盤同一天重挫']],
  }),
});
