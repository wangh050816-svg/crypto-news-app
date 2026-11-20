// ANT 11/19 首日：開盤 111.50（+34.3%），低點 92.72，收 97.17（+17%）（Bloomberg、Forbes、Invezz、FinanceFeeds）；同日道瓊 49,097.06（約 -2.2%，6 月以來首次收破 5 萬）、S&P 500 7,175.83（約 -2%）、Nasdaq 23,879.20（-2.25%）（CNBC、Yahoo、Kiplinger）；BTC 11/20 08:31 約 62,051（CoinGecko）
const card=require('./lib-barcard.js');
POST({
  caption:'Anthropic 首日漲 17%，大盤卻重挫。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic 首日漲 17%，大盤卻一片綠',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['IPO 價',83,'83',false],['開盤',111.5,'111.5',false],['盤中最低',92.72,'92.7',false],['收盤',97.17,'97.17',true]],
    range:[0,120],ticks:[0,30,60,90,120],fmt:v=>v+' 美元',
    stats:[['ANT 首日','+17%','開盤一度 +34%'],['道瓊','跌破 5 萬點','6 月以來第一次'],['Nasdaq','-2.25%','AI 股沒被救起來']],
  }),
});
