// ZachXBT 11/17：印度警方把 Merlin Chain 跨鏈橋地址誤認為詐騙地址，凍結中國投資人 Gate 帳戶；凍結時約 300 萬美元、現約 150 萬；近 16 個月無法動用；法院命令全數轉給報案人；Gate 稱尚未移交、內部追查路線不同（crypto.news、Cryptopolitan、PANews、Cryptotimes）
const card=require('./lib-barcard.js');
POST({
  caption:'ZachXBT：印度警方把跨鏈橋當成詐騙地址。',
  theme:'ink',width:1600,height:900,
  title:'跨鏈橋被當詐騙，300 萬美元凍結近 16 個月',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['凍結時',300,'約 300 萬',true],['現在',150,'約 150 萬',false]],
    range:[0,400],ticks:[0,100,200,300,400],fmt:v=>v+' 萬',
    stats:[['ZachXBT 說','認錯地址','Merlin Chain 跨鏈橋'],['凍結','快 16 個月','用戶完全不能動'],['法院','轉給報案人','Gate 說還沒移交']],
  }),
});
