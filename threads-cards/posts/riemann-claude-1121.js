// Anthropic 數學家 Levent Alpöge 11/20 宣稱與 Claude 證明黎曼猜想：個人網站 4 頁說明，Claude 的證明超過 25 萬頁，另發 Lean 形式化版本；驗證仍在進行；Clay 數學研究所仍列為未解；Anthropic 未正式公告（Scientific American、SiliconANGLE、MLQ）
const card=require('./lib-textcard.js');
POST({
  caption:'Anthropic 數學家宣稱用 Claude 證明黎曼猜想。',
  theme:'ink',width:1600,height:900,
  title:'用 AI 證明黎曼猜想？證明有 25 萬頁',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['Anthropic 數學家 Alpöge 宣稱',30],['和 Claude 一起',44],['證明黎曼猜想',60,true],['',10],['數學界懸賞百萬美元的難題',34],['目前還在驗證中',34]],
    stats:[['證明長度','超過 25 萬頁','人類很難逐頁讀'],['驗證方式','Lean 程式','機器檢查還沒跑完'],['官方','還列為未解','Clay 研究所']]}),
});
