// 8MarketCap：ETH 11/21 跌出全球資產市值前 100，排第 105，市值約 1,903 億美元，被麥當勞等超越（KuCoin、ChainCatcher、TechFlow）；以太坊基金會相關錢包 0x5CBC 轉出 2,500 ETH（約 388 萬，Lookonchain，未確認賣出）；11 月前已賣 4,000 ETH；美國 ETH 現貨 ETF 11 月淨流出約 6.96 億（SoSoValue）；CoinGecko 11/21 17:45 約 1,638
const card=require('./lib-textcard.js');
POST({
  caption:'以太坊市值被麥當勞超過。',
  theme:'ink',width:1600,height:900,
  title:'以太坊市值跌出全球前 100，被麥當勞超車',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['全球資產市值排名',30],['以太坊掉到第 105 名',48],['被麥當勞超車',60,true],['',10],['市值約 1,903 億美元',36],['ETF 這個月流出約 7 億',36]],
    stats:[['ETH 排名','第 105 名','跌出全球前 100'],['基金會錢包','又轉出 2,500 顆','還沒確認是不是賣'],['ETH 價格','約 1,638 美元','11/21 傍晚']]}),
});
