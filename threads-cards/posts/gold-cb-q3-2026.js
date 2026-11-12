// WGC Gold Demand Trends Q3 2026：央行淨買 321 噸（+42% YoY；Q3 2025 226.3 噸），五年季均 227 噸；公開申報約 120 噸、未申報估計約 201 噸；前三季約 675 噸
const card=require('./lib-barcard.js');
POST({
  caption:'央行還在買金，而且買得比去年更兇。',
  theme:'ink',width:1600,height:900,
  title:'全球央行第三季買進 321 噸黃金',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['去年 Q3',226.3,'226 噸',false],['五年季均',227,'227 噸',false],['今年 Q3',321,'321 噸',true]],
    range:[0,400],ticks:[0,100,200,300,400],fmt:v=>v+' 噸',
    stats:[['年增','+42%','比去年第三季'],['公開申報 vs 未申報','120 / 201 噸','未申報為 WGC 估計'],['今年前三季累計','約 675 噸','中國、波蘭帶頭公開買進']],
  }),
});
