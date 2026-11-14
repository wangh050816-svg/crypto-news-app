// AP（Washington Post、KRMG 轉載）11/13 收盤：S&P 500 -0.4% 至 7,561.67；道瓊 +0.1% 至 52,347.55；Nasdaq -0.9% 至 25,136.27
// 本週：S&P +2.5%、道瓊 +2.1%、Nasdaq +2.3%，10 月初以來第一個上漲週（AP；TheStreet、247WallSt 同步報導收盤）
const card=require('./lib-barcard.js');
POST({
  caption:'美股這週漲了，但週五收得不太漂亮。',
  theme:'ink',width:1600,height:900,
  title:'美股本週上漲，10 月以來第一次',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['S&P 500',2.5,'+2.5%',true],['道瓊',2.1,'+2.1%',false],['Nasdaq',2.3,'+2.3%',false]],
    range:[0,3],ticks:[0,1,2,3],fmt:v=>v+'%',
    stats:[['週五 S&P 500','-0.4%','收 7,561.67'],['週五 Nasdaq','-0.9%','科技股拖累'],['本週','10 月以來首漲','第一個上漲週']],
  }),
});
