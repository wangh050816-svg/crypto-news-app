// Decrypt 11/19、Cybersecurity Dive、Reuters 引述：勒索集團 n0n 公開 Visa、Mastercard、摩根大通客戶資料；三家都說是外包廠商被駭、自家系統沒事；Visa 稱無卡號外洩、亞太廠商；Mastercard 為特定權益方案部分持卡人 email；摩根大通為行銷資料，可能含姓名與 email；稱三家沒在 48 小時內付贖金
const card=require('./lib-textcard.js');
POST({
  caption:'Visa、萬事達、摩根大通，同一週被同一個勒索集團公開資料。',
  theme:'ink',width:1600,height:900,
  title:'Visa、萬事達、摩根大通客戶資料，被勒索集團公開',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({lines:[['三家都說：',44,false],['自家系統沒被駭',58,false],['被駭的是外包廠商',58,true],['勒索集團 n0n：沒在 48 小時內付錢，就公開',32,false]],y0:220,gap:40,
    stats:[['Visa','沒有卡號外洩','亞太地區外包廠商'],['萬事達','部分持卡人 email','特定權益方案'],['摩根大通','姓名、email','外包廠商的行銷資料']]}),
});
