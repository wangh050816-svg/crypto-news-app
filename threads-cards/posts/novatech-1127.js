// 紐約州法院 11/26 判 NovaTech／AWS Mining 創辦人 Cynthia、Eddy Petion 須付 13.7 億美元（AG 10/22 請求約 13.67 億：返還約 11.3 億＋利息 2.325 億）；受害者數十萬人，含 1.1 萬名紐約人；透過禱告群、WhatsApp 鎖定海地裔社群；夫婦據稱已出國（CoinDesk、Cointelegraph、The Block、Decrypt）
const card=require('./lib-textcard.js');
POST({
  caption:'判了 13.7 億，人卻找不到。',
  theme:'ink',width:1600,height:900,
  title:'判賠 13.7 億美元，被告夫婦早就出國了',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['NovaTech 加密龐氏騙局',44,true],
    ['靠禱告群、WhatsApp 拉人',32,false],
    ['鎖定海地裔移民社群',44,false],
    ['紐約受害者約 1.1 萬人',44,false],
    ['判了，但錢要追得回來才算',32,false],
  ],
  stats:[['判賠金額','13.7 億美元','11/26 紐約州法院'],['組成','返還＋利息','利息就 2.3 億'],['創辦人','據稱已出國','一直沒出庭']]}),
});
