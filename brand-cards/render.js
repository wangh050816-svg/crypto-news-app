// 用法：node brand-cards/render.js
// 輸出：brand-cards/out/1.png ...（1080×1350）和 sheet.png（總覽）
const fs=require('fs'),path=require('path');
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const out=path.join(__dirname,'out');fs.mkdirSync(out,{recursive:true});
(async()=>{
  const b=await chromium.launch(),p=await b.newPage({viewport:{width:1080,height:1350}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(__dirname,'cards.html'),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  if(errs.length){console.error(errs.join('\n'));await b.close();process.exit(1)}
  const n=await p.locator('.card').count();
  for(let i=1;i<=n;i++) await p.locator('.card').nth(i-1).screenshot({path:path.join(out,i+'.png')});
  const imgs=[...Array(n)].map((_,i)=>'data:image/png;base64,'+fs.readFileSync(path.join(out,(i+1)+'.png')).toString('base64'));
  await p.setContent(`<body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(3,540px);gap:6px;width:1632px">${imgs.map(s=>`<img src="${s}" width="540">`).join('')}</body>`);
  await p.screenshot({path:path.join(out,'sheet.png'),fullPage:true});
  await b.close();console.log(`完成 ${n} 張 → ${out}`);
})();
