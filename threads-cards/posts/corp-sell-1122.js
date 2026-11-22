// Lookonchain 11/10 統計：14 家上市公司 2026 年賣約 108,247 BTC（約 80.8 億美元），MARA 40,581、Riot 20,264，合計約 56.2%；數字含估計錢包流出，MARA 10-Q 自報前三季賣約 26,984 BTC（KuCoin、TokenPost、Coinfomania、SEC 10-Q）
const card=require('./lib-barcard.js');
POST({
  caption:'上市公司今年賣了 10 萬顆 BTC。',
  theme:'ink',width:1600,height:900,
  title:'上市公司今年賣了 10.8 萬顆比特幣',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['MARA',40581,'約 4.06 萬',true],['Riot',20264,'約 2.03 萬',false],['其他 12 家',47402,'約 4.74 萬',false]],
    range:[0,50000],ticks:[0,10000,20000,30000,40000,50000],fmt:v=>(v/10000)+' 萬',
    stats:[['合計','約 10.8 萬顆','14 家上市公司'],['MARA＋Riot','占 56%','兩家礦商就過半'],['注意','鏈上估算','MARA 自報前三季 2.7 萬顆']],
  }),
});
