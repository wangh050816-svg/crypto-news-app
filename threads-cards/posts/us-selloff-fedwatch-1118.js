// 11/17 美股收盤：道瓊 50,759.42（-1.64%）、S&P 500 7,340.53（-1.03%，五個月低）、Nasdaq 24,328.38（-0.74%，連 4 跌）（Closing Look、Vista Global、CapitalStreetFX）
// CME FedWatch（使用者截圖）：12/9 會議 400-425 95.7%、425-450 4.3%，目前 375-400
const card=require('./lib-barcard.js');
POST({
  caption:'升息還沒來，賣壓先來。',
  theme:'ink',width:1600,height:900,
  title:'12 月升息機率 100%，美股先跌給你看',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['道瓊',-1.64,'-1.64%',true],['S&P 500',-1.03,'-1.03%',false],['Nasdaq',-0.74,'-0.74%',false]],
    range:[-2,0],ticks:[-2,-1.5,-1,-0.5,0],fmt:v=>v+'%',
    stats:[['升一碼','95.7%','到 4.00%–4.25%'],['升兩碼','4.3%','到 4.25%–4.50%'],['不升','0%','維持 3.75%–4.00%']],
  }),
});
