// 波克夏 Q3 13F（11/16；TradingView/Seeking Alpha、24/7 Wall St、MLQ、Yahoo）：唯一新建倉 Bending Spoons（AOL、Evernote、Vimeo 母公司）2,070 萬股約 6.89 億美元；美銀由 4.834 億股減至 4.559 億股（約 -5.7%），剩約 248 億美元；Lennar 約翻倍至 2,600 萬股；Delta 5,730 萬→6,450 萬股；VeriSign 賣約三分之一
const card=require('./lib-barcard.js');
POST({
  caption:'巴菲特的波克夏，這季只買了一家新公司，而且你可能沒聽過。',
  theme:'ink',width:1600,height:900,
  title:'波克夏唯一新買：Bending Spoons',titleSize:56,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['美國銀行（前）',483.4,'4.83 億股',false],['美國銀行（後）',455.9,'4.56 億股',true]],
    range:[0,500],ticks:[0,100,200,300,400,500],fmt:v=>v+'',
    stats:[['新建倉','約 6.89 億','美元，AOL、Evernote 母公司'],['Lennar 建商','約翻倍','持股 2,600 萬股'],['Delta 航空','加碼','5,730 萬→6,450 萬股']],
  }),
});
