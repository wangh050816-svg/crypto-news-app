// 巴拉圭國營電力 ANDE（CoinDesk、CryptoBriefing、Coinpedia、TFTC）：礦工特別電力合約約 943.8 MW，2027/12/31 到期且現行規定下不續約；預期 2026 年向礦工收 3.5 億美元（2025 年 2.95 億）；礦工電價約 30 美元/MWh，AI／HPC 資料中心 15 年合約約 49 美元/MWh；最大一筆 Kuntur 最高 286 MW；巴拉圭約占全球算力 4%（Hashrate Index Q2）
const card=require('./lib-barcard.js');
POST({
  caption:'巴拉圭要把便宜的電，從比特幣礦工轉給 AI。',
  theme:'ink',width:1600,height:900,
  title:'巴拉圭：便宜電力從礦工轉給 AI',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['礦工電價',30,'約 30',false],['AI 資料中心',49,'約 49',true]],
    range:[0,60],ticks:[0,20,40,60],fmt:v=>v+'',
    stats:[['礦工特別合約','2027 年底到期','現行規定下不續約'],['涉及電力','約 943.8 MW','巴拉圭約占全球算力 4%'],['單位','美元／MWh','AI 合約長達 15 年']],
  }),
});
