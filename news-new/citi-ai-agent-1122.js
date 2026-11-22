// TechCrunch 11/18、Decrypt：Citi 11 月新條款，外部 AI 代理用你的帳密做的事都算你授權，帳密外洩也一樣；Citi 自家 AI 不適用；JPM、BofA 10 月類似，PNC 11/18 改約，Citizens 寄信警告
const card=require('./lib-textcard.js');
POST({
  caption:'花旗：AI 代理亂轉帳，算你的。',
  theme:'ink',width:1600,height:900,
  title:'花旗新條款：外部 AI 代理做的事，都算你授權',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({lines:[['AI 不聽指令',60,false],['AI 超出權限',60,false],['帳密被駭外洩',60,false],['→ 一樣算你自己的',64,true],['花旗自家的 AI 工具不適用',32,false]],y0:200,gap:40,
    stats:[['同樣立場','至少 5 家','摩根大通、美銀、PNC 等'],['條款生效','11 月','花旗線上使用者協議'],['銀行保留','隨時封鎖','外部 AI 存取，不用通知']]}),
});
