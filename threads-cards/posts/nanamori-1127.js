// 元すとぷりリーダー ななもり。（柏原真人）11/19 報告以 Anthropic IPO 取得 24 萬股、約 31.79 億日圓；11/26 在 X 公開上市首日幾乎全賣，利益約 11 億日圓出頭；限價單從承銷價 +10% 起每 0.5 美元掛到 116 美元（Sponichi/Yahoo、livedoor、yutura）
const card=require('./lib-textcard.js');
POST({
  caption:'偶像買 IPO，一天賺 11 億日圓。',
  theme:'ink',width:1600,height:900,
  title:'日本偶像前團長買 Anthropic，一天賺 11 億日圓',titleSize:50,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['用承銷價買進 24 萬股',44,false],
    ['投入約 31.8 億日圓',32,false],
    ['上市第一天幾乎全賣',44,true],
    ['自己公開獲利約 11 億日圓',44,false],
    ['限價單一路掛到 116 美元',32,false],
  ],
  stats:[['本人','すとぷり前團長','ななもり。'],['獲利','約 11 億日圓','本人在 X 公開'],['之後','Anthropic 破發','11/24 收 81.91']]}),
});
