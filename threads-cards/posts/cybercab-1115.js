// Tesla 11/13 開放部分美國客戶訂購個人用 Cybercab（Electrek、Not a Tesla App、Notebookcheck）：稅前 29,990 美元、1,000 美元不退訂金；需每月 299 美元 Autonomy 訂閱才能動，Tesla 可提前一個月調價或停用；只能在德州、佛州 Robotaxi 服務區行駛；預計 12 月在 Austin 交車；馬斯克上線約 7 小時後稱月費太高、應接近 115 美元（未正式調整）
const card=require('./lib-barcard.js');
POST({
  caption:'Tesla 開賣 3 萬美元的 Cybercab，但不付月費它不會動。',
  theme:'ink',width:1600,height:900,
  title:'Cybercab 開賣：3 萬美元，不付月費不會動',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['車價',29990,'29,990',false],['5 年訂閱（估算）',17940,'17,940',true]],
    range:[0,35000],ticks:[0,10000,20000,30000],fmt:v=>(v/10000)+' 萬',
    stats:[['每月訂閱','299 美元','馬斯克說應接近 115'],['只能開在','德州、佛州','Robotaxi 服務區內'],['預計交車','12 月','Austin']],
  }),
});
