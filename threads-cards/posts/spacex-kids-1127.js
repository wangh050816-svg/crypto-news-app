// 馬斯克 11/26（感恩節）在 X 宣布每年再送全美兒童一股 SpaceX；原本承諾每人兩股（SpaceX、馬斯克各一股），SpaceX 那股下個月轉、馬斯克那股 2027/6 解禁後轉；發放方式未說明；美國未滿 18 歲約 7,300 萬人（Bloomberg、Teslarati、Moneywise、CNN）
const card=require('./lib-textcard.js');
POST({
  caption:'每個美國小孩，每年一股 SpaceX。',
  theme:'ink',width:1600,height:900,
  title:'馬斯克：每年送全美國小孩一股 SpaceX',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['原本承諾：每人兩股',44,false],
    ['SpaceX 一股、馬斯克一股',32,false],
    ['感恩節加碼：每年再一股',44,true],
    ['怎麼發還沒說',44,false],
    ['美國未滿 18 歲約 7,300 萬人',32,false],
  ],
  stats:[['宣布時間','11/26 感恩節','馬斯克發文'],['第一股','下個月轉','SpaceX 送的'],['馬斯克那股','2027/6','解禁後才轉']]}),
});
