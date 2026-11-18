// Grindr Edge AI 方案全球上線，每月 120 美元；CEO George Arison 對 BBC：「我們是資本主義社會」；Business Insider 曾報導測試價 349.99、499.99 美元；不排除再漲（Dexerto、PinkNews、Tech Digest、AOL/BI）
const card=require('./lib-barcard.js');
POST({
  caption:'Grindr 一個月收 120 美元。',
  theme:'ink',width:1600,height:900,
  title:'交友 App 月費 120 美元，CEO：資本主義',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['測試價 A',499.99,'499.99',false],['測試價 B',349.99,'349.99',false],['正式上線',120,'120',true]],
    range:[0,600],ticks:[0,100,200,300,400,500,600],fmt:v=>v+' 美元',
    stats:[['方案','Edge','AI 配對、每月收費'],['CEO 說','資本主義社會','付得起就能用'],['以後','不排除再漲','測試過 499 美元']],
  }),
});
