// 列日大學 Jacquot、Donnet 研究：故意重複使用簽章 nonce 的錢包放入少量 BTC，機器人幾秒內就來搶；掃描 6 條鏈至 2024/6/30 找到 3,620 把私鑰（BTC 3,278）；約 1.06 億美元為理論上限（CoinDesk、KuCoin、Bloomingbit）
const card=require('./lib-barcard.js');
POST({
  caption:'錢包簽名出錯，機器人幾秒就來搶。',
  theme:'ink',width:1600,height:900,
  title:'錢包簽名出錯，機器人幾秒內就來搶',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['6 條鏈合計',3620,'3,620 把',false],['比特幣',3278,'3,278 把',true]],
    range:[0,4000],ticks:[0,1000,2000,3000,4000],fmt:v=>v,
    stats:[['被算出的私鑰','3,620 把','掃描到 2024 年 6 月'],['機器人反應','幾秒','誘餌一放就有人搶'],['理論風險','最多 1.06 億美元','實際被偷多少不確定']],
  }),
});
