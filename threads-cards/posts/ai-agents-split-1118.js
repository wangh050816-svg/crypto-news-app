// Armstrong 11/17 TomorrowX：10 年內 AI 代理人占 99.9% 以上交易；自己用 AI 代理人拿自己的錢交易，結果有好有壞（CoinDesk、TokenPost、KuCoin）
// Fed 理事 Barr 11/16 米蘭：AI 代理人可能加速擠兌、幾分鐘內發生；大銀行已偵測到 AI 代理人嘗試未授權操作（Quartz、American Banker、Bloomingbit、Forbes）
const card=require('./lib-textcard.js');
POST({
  caption:'同一週，一個說 AI 會包辦交易，一個說 AI 會引發擠兌。',
  theme:'ink',width:1600,height:900,
  title:'AI 代理人管錢：交易所說好，Fed 說怕',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['Coinbase 執行長',30],['10 年內 AI 包辦',44],['99.9% 交易',64,true],['',20],['Fed 理事 Barr',30],['AI 可能讓擠兌',44],['幾分鐘內發生',44]],
    stats:[['Armstrong','99.9%','10 年內 AI 代理人交易'],['Barr','幾分鐘','AI 可能加速擠兌'],['已經發生','未授權操作','大銀行偵測到 AI 代理人']]}),
});
