// 11/23：Nvidia 收 165.05（+31.48%），2003 年以來最佳單日，市值增加近 1 兆美元（Motley Fool、Yahoo、MLQ）；Nasdaq +6.51% 約 24,090（2025/4 以來最佳）、S&P 500 +4.73%、道瓊 +3.01%；S&P 結束連 7 跌；比特幣市值 CoinGecko 11/24 08:3x 約 1.231 兆
const card=require('./lib-barcard.js');
POST({
  caption:'Nvidia 一天漲出快 1 兆美元。',
  theme:'ink',width:1600,height:900,
  title:'Nvidia 一天漲出 1 兆，快追上比特幣總市值',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['比特幣總市值',1.23,'約 1.23 兆',false],['Nvidia 一天增加',1.0,'近 1 兆',true]],
    range:[0,1.5],ticks:[0,0.5,1,1.5],fmt:v=>v+' 兆',
    stats:[['Nvidia','+31.48%','2003 年以來最大單日漲幅'],['Nasdaq','+6.51%','2025 年 4 月以來最好的一天'],['S&P 500','+4.73%','結束連 7 跌']],
  }),
});
