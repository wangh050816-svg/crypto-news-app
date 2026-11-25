// Protos 11/24、MLQ、Investing.com：Bravemorning（Weike Sun 獨資、孫宇晨之父）11/19 以每股 1.65 美元賣 69,741,000 股、約 1.15 億美元給 Core Tide、Digital Century Technology、Digital Zentech 各 23,247,000 股（各約 4.9%）；賣後持約 73.8%；Digital Century 董事 Jinmei Li，與孫宇晨母親在過往申報文件中的名字相同，未證實為同一人；TRON Inc. 轉型 TRX 財庫後市值跌約 87%
const card=require('./lib-barcard.js');
POST({
  caption:'孫爸賣股，買家董事跟孫媽同名。',
  theme:'ink',width:1600,height:900,
  title:'孫宇晨爸爸賣 Tron 股票，買家董事跟他媽媽同名',titleSize:50,titleY:100,
  footer:['@zqqnc',''],
  draw:card({
    bars:[['孫爸公司（賣後）',73.8,'73.8%',false],['買家 A',4.9,'4.9%',true],['買家 B',4.9,'4.9%',true],['買家 C',4.9,'4.9%',true]],
    range:[0,85],ticks:[0,20,40,60,80],fmt:v=>v+'%',
    stats:[['成交','1.15 億美元','每股 1.65 美元'],['每家剛好','4.9%','低於 5% 申報門檻'],['買家 B 的董事','Jinmei Li','與孫媽同名，未證實']],
  }),
});
