// CNBC 11/14：波克夏創歷史新高，第四季至今漲 19%，被視為躲 AI 跌勢的避風港；CNBC 11/7：Q3 回購 96 億美元（Q2 45 億）；現金 3,774 億美元（Q2 3,655 億）（CNBC、Insurance Journal、GV Wire）；13F 截止 11/16（美東）
const card=require('./lib-barcard.js');
POST({
  caption:'AI 股在崩，巴菲特的波克夏卻創新高。',
  theme:'ink',width:1600,height:900,
  title:'AI 股在崩，波克夏卻創新高',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['Q2 回購',45,'45 億',false],['Q3 回購',96,'96 億',true]],
    range:[0,120],ticks:[0,30,60,90,120],fmt:v=>v+' 億',
    stats:[['第四季至今','+19%','創歷史新高'],['帳上現金','約 3,774 億','美元，比 Q2 還多'],['13F 持股報告','美國今天截止','台灣週二看得到']],
  }),
});
