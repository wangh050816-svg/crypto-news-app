// 西班牙官方公報刊登皇家法令：金融情報單位 Sepblac 懷疑洗錢或資恐時可先暫停加密帳戶，最長 5 個工作日，不需法官；過去只能應外國金融情報單位要求才暫停；業者不配合會被罰（CoinDesk、Cointelegraph、動區 11/26）
const card=require('./lib-textcard.js');
POST({
  caption:'不用法官就能凍結。',
  theme:'ink',width:1600,height:900,
  title:'西班牙：不用法官，就能先凍結你的加密帳戶',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['懷疑洗錢就能先暫停',44,true],
    ['由金融情報單位 Sepblac 決定',32,false],
    ['最長 5 個工作日',44,false],
    ['不需要法官同意',44,false],
    ['以前只能應外國單位要求',32,false],
  ],
  stats:[['凍結期限','最長 5 個工作日','暫停帳戶使用'],['誰決定','Sepblac','不用法院'],['業者不配合','會被罰','皇家法令']]}),
});
