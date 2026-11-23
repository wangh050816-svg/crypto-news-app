// Adobe 9 月預測：美國線上假期（11/1–12/31）消費 2,751 億美元、年增 6.7%；黑五線上 129 億、+9.2%；網購星期一 151 億、+6.2%；黑五「先買後付」約 8.07 億；行動裝置占 57.4%（Adobe 新聞稿、Retail TouchPoints、Digital Commerce 360）
const card=require('./lib-barcard.js');
POST({
  caption:'黑五預估網購 129 億，分期 8 億。',
  theme:'ink',width:1600,height:900,
  title:'黑色星期五預估網購 129 億，有 8 億靠分期',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['網購星期一',151,'151 億',false],['黑色星期五',129,'129 億',true],['黑五分期付款',8.07,'8.07 億',false]],
    range:[0,160],ticks:[0,40,80,120,160],fmt:v=>v+' 億',
    stats:[['黑五成長','+9.2%','Adobe 9 月預估'],['整個假期','2,751 億美元','線上消費、年增 6.7%'],['手機下單','57.4%','比去年再高一點']],
  }),
});
