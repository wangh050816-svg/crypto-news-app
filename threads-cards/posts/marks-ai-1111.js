// Howard Marks 11/11 備忘錄 "A Layman Thinks About AI"（Oaktree 官網 PDF；Benzinga、Seeking Alpha）：AI 每年約需 1 兆美元新資金；高盛數據 2026 全球 AI 相關發債近 6,000 億美元、其中美國投資級約 4,000 億；42 家 AI 公司約占 2024/1 以來 S&P 500 漲幅三分之二；回本「很大程度是信仰問題」，但未稱泡沫
const card=require('./lib-barcard.js');
POST({
  caption:'橡樹資本的霍華．馬克斯又寫備忘錄了，這次講 AI 的錢。',
  theme:'ink',width:1600,height:900,
  title:'霍華．馬克斯：AI 每年要燒約 1 兆美元',titleSize:54,titleY:100,
  footer:['',''],
  draw:card({
    bars:[['美國投資級',400,'約 4,000 億',false],['全球合計',600,'近 6,000 億',true]],
    range:[0,800],ticks:[0,200,400,600,800],fmt:v=>v+' 億',
    stats:[['AI 每年新資金需求','約 1 兆美元','部分要靠發債'],['42 家 AI 公司','約 2/3','2024 年以來 S&P 500 漲幅'],['能不能回本','信仰問題','但他沒說這是泡沫']],
  }),
});
