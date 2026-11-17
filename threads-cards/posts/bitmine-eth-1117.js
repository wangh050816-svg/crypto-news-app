// The Block、crypto.news、Crypto Economy 11/16：Bitmine（Tom Lee 任董事長）持有 6,077,745 ETH，占供給 4.97%（以 1.222 億 ETH 計），目標 5%；上週買 7,653 ETH；質押 5,227,037 ETH（約 86%）；Tom Lee 稱 ETH 兩週跌 28% 與基本面背離，歸咎外部流動性（Nvidia、Anthropic IPO）
const card=require('./lib-barcard.js');
POST({
  caption:'ETH 兩週跌 28%，Tom Lee 的公司還在買，已經握有快 5% 的 ETH。',
  theme:'ink',width:1600,height:900,
  title:'Tom Lee 越跌越買：握有 4.97% 的 ETH',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['目前持有占比',4.97,'4.97%',true],['目標',5,'5%',false]],
    range:[0,6],ticks:[0,1,2,3,4,5,6],fmt:v=>v+'%',
    stats:[['持有 ETH','約 608 萬顆','上週再買 7,653 顆'],['拿去質押','約 86%','約 523 萬顆'],['Tom Lee 說','跌勢背離基本面','怪外部資金被抽走']],
  }),
});
