// Gemini 2026 Q3（SEC 8-K 新聞稿 11/12）：營收 4,090 萬美元、年減 19%；淨虧損 5,860 萬；現貨量 45 億、其中機構 39 億（季增 26%）
// Cointelegraph（依財報）：散戶交易量季減約 14% 至約 6 億美元，2023 Q3 以來最低；散戶仍貢獻近四分之三交易所營收
const card=require('./lib-barcard.js');
POST({
  caption:'Gemini 的散戶交易量掉到三年低點。',
  theme:'ink',width:1600,height:900,
  title:'Gemini 散戶交易量，三年來最低',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['機構',39,'39 億',false],['散戶',6,'約 6 億',true]],
    range:[0,45],ticks:[0,10,20,30,40],fmt:v=>v+' 億',
    stats:[['散戶交易量','季減約 14%','2023 Q3 以來最低'],['季度營收','4,090 萬','美元，年減 19%'],['散戶貢獻','近 3/4','交易所營收']],
  }),
});
