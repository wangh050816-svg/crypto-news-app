// 曼哈頓聯邦法官 Jessica Clarke 11/16 判 Peraire-Bueno 兄弟無罪（電匯詐欺、共謀、洗錢共謀）；稱以太坊是「沒有使用條款」的高度對抗環境；2023/4 8 筆誘餌交易，檢方稱夾子機器人損失約 2,500 萬美元；2025/11 首審流審（CoinDesk、Protos、Yahoo、KuCoin）
const card=require('./lib-textcard.js');
POST({
  caption:'法官：以太坊沒有使用條款。',
  theme:'ink',width:1600,height:900,
  title:'MIT 兄弟反夾機器人 2,500 萬，法官判無罪',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:210,lines:[['法官怎麼說',30],['以太坊',44],['「沒有使用條款」',64,true],['',10],['送進公開交易池',36],['不等於承諾怎麼執行',36]],
    stats:[['機器人損失','約 2,500 萬美元','檢方說法'],['手法','8 筆誘餌交易','2023 年 4 月'],['結果','判決無罪','首審 2025 年流審']]}),
});
