// SoSoValue：美國比特幣現貨 ETF 淨資產 11/18 約 777 億美元，三個月低；今年以來淨流出約 25 億（Bloomingbit）；11 月流出各家 23.5–28.9 億（KuCoin、Bitcoin.com、crypto.news）；11/18 單日約 3.06 億流出、IBIT 1.49 億（Farside、SoSoValue）
const card=require('./lib-textcard.js');
POST({
  caption:'比特幣 ETF 資產三個月新低。',
  theme:'ink',width:1600,height:900,
  title:'比特幣 ETF 資產跌到三個月低點',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['今年到現在',30],['淨流出約 25 億美元',44],['',6],['光是 11 月',30],['就流出超過 23 億',56,true],['',6],['等於一整年的流出，幾乎都在這個月',30]],
    stats:[['ETF 淨資產','約 777 億美元','11/18，三個月低'],['11/18 單日','流出約 3 億','IBIT 占 1.49 億'],['BTC','約 6.38 萬','11/19 傍晚']]}),
});
