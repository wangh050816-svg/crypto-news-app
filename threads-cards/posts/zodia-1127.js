// 渣打旗下加密託管 Zodia Custody 資料外洩：部分客戶與員工姓名、email 外流，週一（11/23）發現，公司稱無未授權交易（CoinDesk、Cointelegraph 11/26）
const card=require('./lib-textcard.js');
POST({
  caption:'銀行級託管也外洩。',
  theme:'ink',width:1600,height:900,
  title:'渣打的加密託管公司，客戶名單外洩了',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['Zodia Custody 資料外洩',44,true],
    ['渣打銀行旗下的加密託管',32,false],
    ['客戶、員工姓名外流',44,false],
    ['email 也一起外流',44,false],
    ['公司說沒有未授權交易',32,false],
  ],
  stats:[['發現時間','11/23 週一','CEO 證實'],['外流內容','姓名、email','部分客戶與員工'],['資產','沒被動到','公司說法']]}),
});
