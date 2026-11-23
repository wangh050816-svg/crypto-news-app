// Ackman 11/22 在 X：Fed 12/9 可能「又犯錯」；SpaceX 擔保債利率 8.259%，IPO 時無擔保債低於 6%；股市下跌推高股權融資成本；主張通膨目標從 2% 改 3%，追 2% 可能引發衰退；未說明想要的利率路徑（investingLive、Benzinga、The Tribune、Stocktwits）
const card=require('./lib-barcard.js');
POST({
  caption:'Ackman：Fed 12 月又要犯錯了。',
  theme:'ink',width:1600,height:900,
  title:'億萬富翁 Ackman：Fed 12/9 又要犯錯',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['SpaceX IPO 時（無擔保）',6,'低於 6%',false],['SpaceX 現在（有擔保）',8.259,'8.259%',true]],
    range:[0,10],ticks:[0,2,4,6,8,10],fmt:v=>v+'%',
    stats:[['Ackman 說','別再升息','12/9 升息會是錯誤'],['他的主張','通膨目標改 3%','追 2% 可能衰退'],['他的證據','借錢變貴','連 SpaceX 都要付 8% 以上']],
  }),
});
