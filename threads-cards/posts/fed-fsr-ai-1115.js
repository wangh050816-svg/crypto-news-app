// Fed 金融穩定報告 11/13（CNBC、MLQ、CryptoBriefing）：市場聯絡人調查 87% 把 AI 列為顯著風險，春季為 50%；受訪約 23 位，紐約 Fed 9–10 月調查；第二名風險資產修正 52%、長期利率上升 48%、網攻 43%（MLQ）
const card=require('./lib-barcard.js');
POST({
  caption:'Fed 最新報告：AI 變成金融系統的頭號風險。',
  theme:'ink',width:1600,height:900,
  title:'Fed 調查：87% 把 AI 列為頭號風險',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['今年春季',50,'50%',false],['今年秋季',87,'87%',true]],
    range:[0,100],ticks:[0,25,50,75,100],fmt:v=>v+'%',
    stats:[['第二名','風險資產修正','52% 受訪者提到'],['第三名','長期利率上升','48%'],['受訪對象','約 23 位','紐約 Fed 市場聯絡人']],
  }),
});
