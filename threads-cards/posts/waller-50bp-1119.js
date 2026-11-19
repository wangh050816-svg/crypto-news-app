// Fed 理事 Waller（CNBC 訪問）：12 月應升 2 碼，或升 1 碼並明確預告 1 月再升；可能需要讓人「嚇一跳」；CME FedWatch 仍約 95% 押 1 碼（Decrypt、Yahoo Finance、Seeking Alpha、BeInCrypto）
// 11/18 收盤：S&P 500 7,323.63（-0.23%，連 5 跌、跌破 200 日線），道瓊 50,198.17（-1.11%）（Closing Look、Fool、Vista）；BTC 62,772（CoinGecko 11/19 08:30，24h -2.95%）
const card=require('./lib-textcard.js');
POST({
  caption:'Fed 理事喊升兩碼。',
  theme:'ink',width:1600,height:900,
  title:'Fed 理事 Waller：12 月可能要升兩碼',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({y0:200,lines:[['Waller 的說法',30],['升 2 碼',64,true],['或升 1 碼＋預告 1 月再升',38],['',10],['要讓大家「嚇一跳」',40],['別把 3% 通膨當正常',36]],
    stats:[['市場押注','約 95% 升 1 碼','交易員還不買單'],['S&P 500','連跌 5 天','跌破 200 日線'],['BTC','約 6.28 萬','24 小時跌約 3%']]}),
});
