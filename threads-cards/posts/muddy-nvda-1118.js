// 渾水 11/17 揭露放空 Nvidia，質疑前高管 Ajay Puri 與 Super Micro 前成長長 Cenly Chen 關係（合照人物是否同一人）；3 月起訴書：Super Micro 相關 3 人經東南亞空殼公司把至少 25 億美元含 Nvidia GPU 伺服器賣給中國客戶；Chen 未被起訴；未指控 Nvidia 犯罪（Muddy Waters 官網、Crypto Briefing、TokenPost、KuCoin）
const card=require('./lib-textcard.js');
POST({
  caption:'渾水放空 Nvidia，關鍵是一張合照。',
  theme:'ink',width:1600,height:900,
  title:'做空大鱷渾水，公開放空 Nvidia',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['渾水的核心問題',30],['一張合照',64,true],['',10],['照片裡的女生',40],['是不是 Super Micro',40],['前高管 Cenly Chen？',40]],
    stats:[['走私案','至少 25 億美元','含 Nvidia GPU 伺服器賣到中國'],['被點名','前高管 Puri','Nvidia 前銷售主管'],['目前','Chen 未被起訴','也沒指控 Nvidia 犯罪']]}),
});
