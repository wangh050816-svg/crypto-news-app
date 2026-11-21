// Artemis 共同創辦人 Jon Ma 11/21 在 X 稱約一半身家在 Anthropic，持倉截圖 ANT 52.1%、NVDA 11.4%；計畫賣掉 BTC 等其他持倉，只留 Anthropic、Alphabet、Meta、Nebius、Nvidia 五檔；認為 Anthropic 可達 10 兆美元（KuCoin、ChainCatcher、Bloomingbit）
const card=require('./lib-barcard.js');
POST({
  caption:'鏈上數據公司創辦人，賣比特幣全押 Anthropic。',
  theme:'ink',width:1600,height:900,
  title:'加密數據公司創辦人，賣 BTC 押 Anthropic',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['Anthropic',52.1,'52.1%',true],['Nvidia',11.4,'11.4%',false],['其他各檔',8,'各 8% 以下',false]],
    range:[0,60],ticks:[0,20,40,60],fmt:v=>v+'%',
    stats:[['他是誰','Jon Ma','鏈上數據平台 Artemis 共同創辦人'],['接下來','賣掉 BTC','只留 5 檔股票'],['他的目標','10 兆美元','他認為 Anthropic 做得到']],
  }),
});
