// Anthropic IPO（Stockanalysis／Bloomberg、FinanceFeeds、TipRanks、CNBC）：散戶分配最多約 20%，一般 IPO 約 5%～10%；Robinhood、SoFi、Schwab、Fidelity、E*Trade 等 6 家券商承銷給散戶；認購約 6 倍（Reuters）；承銷銀行拒收或勸退中國大陸、香港訂單（Bloomberg、The Decoder）；報導稱 11/18 定價、11/19 交易
const card=require('./lib-barcard.js');
POST({
  caption:'這檔 AI IPO，散戶分得到，中國資金卻買不到。',
  theme:'ink',width:1600,height:900,
  title:'Anthropic IPO：散戶分 20%，中國買不到',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['一般 IPO',10,'5–10%',false],['Anthropic',20,'約 20%',true]],
    range:[0,25],ticks:[0,5,10,15,20,25],fmt:v=>v+'%',
    stats:[['認購倍數','約 6 倍','路演第三天'],['中國、香港','幾乎買不到','銀行拒收訂單'],['預計交易','11/19','Nasdaq，代號 ANT']],
  }),
});
