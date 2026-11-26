// FCC 11/25 有條件核准 SpaceX「Starmind」最多 100 萬顆衛星作為太空 AI 資料中心；FCC 稱為美國首例；Amazon、Viasat、美國天文學會反對；SpaceX 稱最快 2028 年開始部署；部分豁免請求未核准（CNBC、NBC、CBS、FCC DA 26-113）
const card=require('./lib-textcard.js');
POST({
  caption:'100 萬顆衛星，要在太空跑 AI。',
  theme:'ink',width:1600,height:900,
  title:'SpaceX 拿到 100 萬顆衛星執照，要在太空跑 AI',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['FCC 有條件核准',44,true],
    ['美國第一個太空資料中心星系',32,false],
    ['計畫名稱：Starmind',44,false],
    ['最快 2028 年開始部署',44,false],
    ['Amazon、天文學會都反對過',32,false],
  ],
  stats:[['衛星數量','最多 100 萬顆','11/25 核准'],['用途','AI 運算','太空資料中心'],['對手','Google、藍色起源','也在申請']]}),
});
