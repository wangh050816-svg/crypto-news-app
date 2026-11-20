// FTX 破產財團 2024 年分兩批賣出 44,539,240 股 Anthropic B 輪優先股，約 8.84 億＋4.52 億＝約 13.4 億美元（CNBC 2024、Crypto Briefing）；Alameda 2022 年投約 5 億；2026/9 一拆十後約 4.45 億股，按 IPO 價 83 美元約 370 億，按首日收盤 97.17 約 433 億（Sovereign Magazine、Nacionale、KuCoin）；收益歸買方，FTX 債權人拿不到
const card=require('./lib-barcard.js');
POST({
  caption:'FTX 當年賣掉的 Anthropic，現在值 433 億。',
  theme:'ink',width:1600,height:900,
  title:'FTX 賣掉的 Anthropic 股票，現在值 433 億',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['2022 年投入',5,'約 5 億',false],['2024 年賣掉',13.4,'約 13.4 億',false],['首日收盤值',433,'約 433 億',true]],
    range:[0,500],ticks:[0,100,200,300,400,500],fmt:v=>v+' 億',
    stats:[['持股','約 4.45 億股','一拆十之後'],['按 IPO 價 83 美元','約 370 億','首日收盤算約 433 億'],['賺到的人','當年的買家','FTX 債權人拿不到']],
  }),
});
