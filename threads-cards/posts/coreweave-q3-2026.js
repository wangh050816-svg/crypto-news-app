// CoreWeave Q3 2026（SEC 8-K、CNBC 11/10）：營收 36.6 億美元（約 +168%），預估約 35.5 億；去年同期 13.6 億；全年營收財測上調至 130–133 億；在手訂單約 1,325 億美元；淨虧損擴大
const card=require('./lib-barcard.js');
POST({
  caption:'AI 基礎設施股最近很不好過，CoreWeave 的財報先替它講話了。',
  theme:'ink',width:1600,height:900,
  title:'CoreWeave 營收一年翻了一倍多',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['去年 Q3',13.6,'13.6 億',false],['市場預估',35.5,'35.5 億',false],['今年 Q3',36.6,'36.6 億',true]],
    range:[0,45],ticks:[0,10,20,30,40],fmt:v=>v+' 億',
    stats:[['營收年增','約 +168%','單位：美元'],['全年營收財測','130–133 億','上調'],['在手訂單','約 1,325 億','但淨虧損擴大']],
  }),
});
