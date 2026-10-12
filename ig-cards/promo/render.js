// 用法：node ig-cards/promo/render.js ig-cards/promo/lottery.html
// 輸出：ig-cards/out/promo/<檔名>.png（1080×1080）
// 截圖素材放在 ig-cards/promo/assets/（已 gitignore，不會 commit）
const fs=require('fs'),path=require('path');
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const file=path.resolve(process.argv[2]||path.join(__dirname,'lottery.html'));
const out=path.join(__dirname,'..','out','promo');fs.mkdirSync(out,{recursive:true});
(async()=>{
  const b=await chromium.launch(),p=await b.newPage({viewport:{width:1080,height:1080}});
  await p.goto('file://'+file,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  const dest=path.join(out,path.basename(file,'.html')+'.png');
  await p.locator('#post').screenshot({path:dest});await b.close();
  console.log('完成 → '+dest);
})();
