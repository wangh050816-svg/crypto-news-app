// S&P 11/18 維持 USDT 穩定性評估 5（最低「弱」）；高風險資產（黃金、BTC、股票、擔保貸款、公司債）占流通量 28%（9/30）；未揭露託管與交易對手、季度證明；Tether 回應「問題在 S&P 的框架」並引用《大賣空》；BDO 9/30：資產約 1,915 億、負債約 1,835 億（Cointelegraph、TokenPost、The Block、Yahoo）
const card=require('./lib-barcard.js');
POST({
  caption:'Tether 用《大賣空》回嗆 S&P。',
  theme:'ink',width:1600,height:900,
  title:'S&P 給 USDT 最低分，Tether 搬出《大賣空》',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['資產',1915,'1,915 億',false],['負債',1835,'1,835 億',false],['多出來的',80,'約 80 億',true]],
    range:[0,2000],ticks:[0,500,1000,1500,2000],fmt:v=>v+' 億',
    stats:[['S&P 評分','5 分（最低）','穩定性「弱」'],['高風險資產','占 28%','黃金、BTC、股票、貸款'],['Tether 回嗆','《大賣空》','問題在 S&P 的框架']],
  }),
});
