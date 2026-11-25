// TechCrunch 11/24、WIRED（經動區轉述）、ChainCatcher：黃仁勳回任後首場全員大會，說每天心理治療一個半小時；「這輩子第二難的會，最難的是跟太太談」。11/12 辭職、11/23 回任。CoinDesk、Cointelegraph、紐約郵報：川普 11/24 說必要時願意特赦，「但我不認為會需要」。WSJ：司法部稱黃仁勳不是調查對象
const card=require('./lib-textcard.js');
POST({
  caption:'黃仁勳每天心理治療 1.5 小時，川普先準備好特赦。',
  theme:'ink',width:1600,height:900,
  title:'黃仁勳回鍋：每天心理治療 1.5 小時，川普說願意特赦',titleSize:48,titleY:100,
  footer:['@zqqnc',''],
  draw:card({lines:[['「這是我這輩子',50,false],['第二難的會議。',50,false],['最難的那場，',50,false],['是跟我太太談。」',56,true],['黃仁勳，回任後第一場員工大會',30,false]],y0:190,gap:36,
    stats:[['每天心理治療','1.5 小時','他在員工大會上說'],['辭職到回任','11 天','11/12 辭職、11/23 回任'],['川普','願意特赦','「但我不認為會需要」']]}),
});
