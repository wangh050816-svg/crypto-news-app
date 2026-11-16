// Nvidia FY27 Q3 財測：營收 1,080 億美元 ±2%、毛利率 74.0% ±50bp；共識約 1,090 億（LSEG 1,092 億、Visible Alpha 1,093 億、MarketBeat 1,088 億）（Invezz、Oanda、CryptoBriefing 等）；美東 11/17 盤後＝台灣 11/18 05:00（依慣例），Kress 主持
const card=require('./lib-barcard.js');
POST({
  caption:'Nvidia 週三清晨公布財報，這次台上沒有黃仁勳。',
  theme:'ink',width:1600,height:900,
  title:'Nvidia 財報：沒有黃仁勳的第一次',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['公司財測',1080,'1,080 億',false],['市場共識',1090,'約 1,090 億',true]],
    range:[1000,1120],ticks:[1000,1040,1080,1120],fmt:v=>v+' 億',
    stats:[['毛利率財測','74%','上下 0.5 個百分點'],['公布時間','11/18 清晨','台灣時間（週三）'],['主持人','Kress','臨時執行長']],
  }),
});
