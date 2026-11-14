// Payward（Kraken 母公司）2026 Q3（CoinDesk、TokenPost、Crypto Times、cryptonews）：總平台利潤（TPM）4.87 億美元，年減 12%、季增 12%；交易型 2.34 億、資產型 1.28 億、接取型 1.25 億；非交易占比 52%（去年同期 46%）；調整後 EBITDA 6,000 萬、年減 67%；交易量 3,530 億、年減 30%；有資金帳戶 710 萬、年增 37%
const card=require('./lib-barcard.js');
POST({
  caption:'Kraken 這季有一半以上的收入，已經不是靠交易手續費。',
  theme:'ink',width:1600,height:900,
  title:'Kraken：過半收入不靠交易了',titleSize:58,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['交易',2.34,'2.34 億',false],['資產',1.28,'1.28 億',true],['產品服務',1.25,'1.25 億',true]],
    range:[0,2.8],ticks:[0,0.5,1,1.5,2,2.5],fmt:v=>v+' 億',
    stats:[['非交易收入占比','52%','去年同期 46%'],['總平台利潤','4.87 億美元','年減 12%'],['交易量','3,530 億','年減 30%']],
  }),
});
