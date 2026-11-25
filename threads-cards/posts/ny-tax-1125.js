// 紐約州參議員 Jeremy Cooney 11/23 提出 FUTURES Act（S10748）：對預測市場在紐約的淨交易手續費加收 10%，存入 Futures Fund for Early Education 給學前教育；禁止民選官員交易、要求年齡驗證；Kalshi 所屬聯盟表態支持；尚在委員會（Prediction News、RG.org、Cryptowisser）
const card=require('./lib-textcard.js');
POST({
  caption:'下注的手續費拿去辦幼兒園。',
  theme:'ink',width:1600,height:900,
  title:'紐約想把預測市場手續費，拿去辦幼兒園',titleSize:52,titleY:100,
  footer:['',''],
  draw:card({y0:230,gap:26,lines:[
    ['手續費收入加收 10%',44,true],
    ['只算在紐約發生的交易',32,false],
    ['錢進學前教育基金',44,false],
    ['民選官員不能下注',44,false],
    ['還要年齡驗證、防沉迷',32,false],
  ],
  stats:[['法案','FUTURES Act','11/23 提出'],['業者','表態支持','含 Kalshi 的聯盟'],['進度','還在委員會','還不是法律']]}),
});
