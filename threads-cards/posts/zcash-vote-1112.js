// Zcash 提案（CoinDesk 11/12、PANews、Cryptowisser）：11/16–11/30 由持幣者投票，從 Zcash Community Grants 金庫 91,453 ZEC 中移除 50,000 ZEC（約 55%），透過未來挖礦獎勵釋出；另將 8% 新發行分配給開發與法律防禦基金；草案估計資金可撐年限由約 13 年降至約 6 年
// ZEC 約 989 美元（CoinGecko 11/12），11/11 跌破 1,000 美元為 9 月以來首次（Cointelegraph）
const card=require('./lib-barcard.js');
POST({
  caption:'Zcash 要投票拿走補助金庫一半以上的幣。',
  theme:'ink',width:1600,height:900,
  title:'Zcash 投票：補助金庫要拿走 55%',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['目前金庫',91453,'91,453',false],['提案通過後',41453,'41,453',true]],
    range:[0,100000],ticks:[0,25000,50000,75000,100000],fmt:v=>(v/10000)+' 萬',
    stats:[['投票期間','11/16–11/30','由持幣者投票'],['資金可撐','13 年→6 年','草案估計'],['ZEC 現價','約 989 美元','11/11 跌破 1,000']],
  }),
});
