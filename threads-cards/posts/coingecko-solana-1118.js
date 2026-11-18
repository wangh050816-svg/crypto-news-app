// 11/17 Breakpoint：Solana 基金會支持 CoinGecko，CoinGecko 產品長 Vibhu Norby 稱基金會持有多數權益；未公布金額與持股比例；CoinGecko 用 backed（Cointelegraph、CoinDesk、FinanceFeeds、Solana Compass）
const card=require('./lib-textcard.js');
POST({
  caption:'CoinGecko 的大股東變成 Solana 基金會。',
  theme:'ink',width:1600,height:900,
  title:'查幣價的 CoinGecko，大股東變成 Solana',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:220,lines:[['獨立經營 12 年',40,false],['現在多數權益',40,false],['歸 Solana 基金會',60,true],['',10],['產品長在 X 上親口說',30],['金額、持股比例都沒公布',30]],
    stats:[['新大股東','Solana 基金會','11/17 Breakpoint 宣布'],['CoinGecko 說法','獲得支持','官方沒用「收購」'],['之後要做','鏈上交易功能','跟 Solana 合作']]}),
});
