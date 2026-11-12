// Anthropic IPO（公司 roadshow 公告、CNBC、TechCrunch、Fortune 11/10）：每股 70–78 美元、8.25 億股；上緣完全稀釋估值約 1.404 兆、中位約 1.33 兆；先前傳聞目標約 2 兆；CNBC 消息來源稱 11/18 定價、11/19 開始交易；上緣募資約 643.5 億美元（Bloomberg 稱目標 644 億）
const card=require('./lib-barcard.js');
POST({
  caption:'AI 股最近賣壓不小，但一檔超大型的 AI IPO 還是要來了。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic IPO：估值最高約 1.4 兆美元',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['先前傳聞',2.0,'約 2 兆',false],['區間中位',1.33,'1.33 兆',false],['區間上緣',1.404,'1.4 兆',true]],
    range:[0,2.5],ticks:[0,0.5,1,1.5,2,2.5],fmt:v=>v+' 兆',
    stats:[['每股價格區間','70–78 美元','發行 8.25 億股'],['以上緣計算','約 644 億','美元募資規模'],['預計開始交易','11/19','CNBC 引述消息來源']],
  }),
});
