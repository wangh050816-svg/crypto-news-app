// 11/25 收盤：KOSPI −6.16% 至 4,697.5；三星電子 −9.9%、SK 海力士 −11.1%；日經 −2.78% 至 57,011.62；軟銀 −14.8%、Kioxia −14.2%；恒生 −1.2%（TradingKey、S Ziņas、investingLive）
const card=require('./lib-barcard.js');
POST({
  caption:'韓股一天跌 6%。',
  theme:'ink',width:1600,height:900,
  title:'韓股一天跌 6%，記憶體雙雄跌最兇',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['KOSPI',-6.16,'-6.16%',true],['三星電子',-9.9,'-9.9%',false],['SK 海力士',-11.1,'-11.1%',false],['日經 225',-2.78,'-2.78%',false]],
    range:[-14,0],ticks:[-14,-12,-10,-8,-6,-4,-2,0],fmt:v=>v+'%',
    stats:[['KOSPI 收盤','4,697.5','11/25 收盤'],['日本','軟銀 -14.8%','Kioxia -14.2%'],['原因','AI 疑慮','美股晶片股先跌']],
  }),
});
