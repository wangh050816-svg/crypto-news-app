// 韓國第 63 屆稅務師考試榜首韓元碩承認用微型相機拍題、傳給 AI、用手機看答案；160 題只錯 1 題；已自首（Bloomberg、Korea Times、JoongAng、Fortune）
// 教育部 11/18 宣布學測（11/19）只准帶黑色鉛筆，防微型相機藏在修正帶、橡皮擦；Daiso app「鉛筆」搜尋增約 90%，首爾多處鉛筆缺貨（JoongAng、SBS、京鄉）
const card=require('./lib-textcard.js');
POST({
  caption:'AI 作弊考榜首，學測只准帶黑色鉛筆。',
  theme:'ink',width:1600,height:900,
  title:'AI 作弊考上榜首，韓國學測只准帶鉛筆',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['稅務師考試榜首',30],['160 題只錯 1 題',44],['靠微型相機＋AI',56,true],['',10],['學測前一天',30],['只准帶黑色鉛筆',44],['鉛筆直接賣到缺貨',36]],
    stats:[['榜首','160 題錯 1 題','已經自首'],['學測新規','只准黑色鉛筆','防相機藏在文具裡'],['Daiso app 搜尋','鉛筆 +90%','首爾多處缺貨']]}),
});
