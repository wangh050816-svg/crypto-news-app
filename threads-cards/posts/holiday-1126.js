// NYSE 2026：11/26 感恩節休市；11/27 13:00 ET 提早收盤（平常 16:00，台灣 11/28 週六 02:00），美債 SIFMA 14:00 ET（NYSE、FINRA、AARP）；2023 黑色星期五美股成交 49.7 億股 vs 前 20 日均量 104.9 億股；2022 S&P 500 量低於 30 日均量 46%（Bloomberg、Inquirer/Reuters）
const card=require('./lib-barcard.js');
POST({
  caption:'華爾街放假，幣圈不放。',
  theme:'ink',width:1600,height:900,
  title:'美股放假一天半，黑色星期五成交量只剩一半',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['平常（20 日均量）',104.9,'104.9 億股',false],['2023 黑色星期五',49.7,'49.7 億股',true]],
    range:[0,120],ticks:[0,30,60,90,120],fmt:v=>v,
    stats:[['11/26 感恩節','整天休市','美股、美債都休'],['11/27 美股','提早 3 小時收','台灣週六 02:00'],['加密貨幣','照常 24 小時','沒有人放假']],
  }),
});
