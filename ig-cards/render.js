// 用法：node ig-cards/render.js ig-cards/sets/crypto-survival.js
// 輸出：ig-cards/out/<set名稱>/1.png ... 6.png（1080×1350）和 sheet.png（總覽）
const fs=require('fs'),path=require('path');
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const dir=__dirname, setFile=path.resolve(process.argv[2]||'');
if(!fs.existsSync(setFile)){console.error('請指定 set 檔，例如 node ig-cards/render.js ig-cards/sets/crypto-survival.js');process.exit(1)}
const name=path.basename(setFile,'.js'), out=path.join(dir,'out',name);
fs.mkdirSync(out,{recursive:true});
const read=f=>fs.readFileSync(f,'utf8');
const scenes=fs.readdirSync(path.join(dir,'scenes')).filter(f=>f.endsWith('.js')).map(f=>read(path.join(dir,'scenes',f))).join('\n');
const html=`<!doctype html>${read(path.join(dir,'template-head.html'))}<div id="root"></div><script>
${read(path.join(dir,'engine.js'))}
${scenes}
function SET({title,cards}){
  document.getElementById('root').innerHTML=cards.map(([k,a,ae,b,be],i)=>{
    if(!S[k+'Top']||!S[k+'Bot']) throw new Error('找不到場景 '+k+'Top / '+k+'Bot');
    return \`<div class="card" id="card\${i+1}"><h1>\${title}</h1>\${S[k+'Top']()}<div class="cap"><b>\${a}</b><span>\${ae}</span></div>\${S[k+'Bot']()}<div class="cap"><b>\${b}</b><span>\${be}</span></div></div>\`}).join('');
}
${read(setFile)}
</script></body></html>`;
const tmp=path.join(out,'_page.html');fs.writeFileSync(tmp,html);
(async()=>{
  const b=await chromium.launch(),p=await b.newPage({viewport:{width:1080,height:1400}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+tmp,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  if(errs.length){console.error(errs.join('\n'));await b.close();process.exit(1)}
  const n=await p.locator('.card').count();
  for(let i=1;i<=n;i++) await p.locator('#card'+i).screenshot({path:path.join(out,i+'.png')});
  // 總覽圖：3 欄縮小排在一起，方便一次檢查
  const imgs=[...Array(n)].map((_,i)=>'data:image/png;base64,'+fs.readFileSync(path.join(out,(i+1)+'.png')).toString('base64'));
  await p.setContent(`<body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(3,540px);gap:6px;width:1632px">${imgs.map(s=>`<img src="${s}" width="540">`).join('')}</body>`);
  await p.screenshot({path:path.join(out,'sheet.png'),fullPage:true});
  await b.close();fs.unlinkSync(tmp);
  console.log(`完成 ${n} 張 → ${out}`);
})();
