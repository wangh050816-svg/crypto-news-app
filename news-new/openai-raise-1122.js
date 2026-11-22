// CNBC（Faber）11/12、Yahoo、Dataconomy：OpenAI 以 1.25 兆估值募約 150 億，原本想募最多 300 億、估值 1.4 兆；10/31 曾降到約 200 億；尚未正式結案。Anthropic 11/19 IPO 募 813.4 億（980M 股 × 83）
const card=require('./lib-barcard.js');
POST({
  caption:'OpenAI 想募 300 億，只拿到一半。',
  theme:'ink',width:1600,height:900,
  title:'OpenAI 想募 300 億，最後只拿到一半',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({
    bars:[['原本目標',300,'300 億',false],['10 月下修',200,'約 200 億',false],['實際募到',150,'約 150 億',true]],
    range:[0,350],ticks:[0,100,200,300],fmt:v=>v+' 億',
    stats:[['估值','1.25 兆','原本開價 1.4 兆'],['同一週 Anthropic','IPO 募 813 億','11/19 上市'],['狀態','還沒正式結案','媒體引述消息來源']],
  }),
});
