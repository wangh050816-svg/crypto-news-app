// 用法：node ig-carousel/render.js ig-carousel/sets/<名稱>.js
// 輸出：ig-carousel/out/<名稱>/1.png ... N.png（1080×1350）和 sheet.png（總覽）
const fs=require('fs'),path=require('path');
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const dir=__dirname, setFile=path.resolve(process.argv[2]||'');
if(!fs.existsSync(setFile)){console.error('請指定 set 檔，例如 node ig-carousel/render.js ig-carousel/sets/binance-hack.js');process.exit(1)}
const name=path.basename(setFile,'.js'), out=path.join(dir,'out',name);
fs.mkdirSync(out,{recursive:true});
const read=f=>fs.readFileSync(f,'utf8');
const html=`<!doctype html>${read(path.join(dir,'template.html'))}<div id="root"></div><script>
function CAROUSEL({tag,source,slides}){
  const n=slides.length;
  const top=i=>\`<div class="top"><div class="tag"><span class="dot"></span>\${tag}</div><div class="pg">\${String(i+1).padStart(2,'0')} / \${String(n).padStart(2,'0')}</div></div>\`;
  const foot=i=>\`<div class="foot"><span>\${source||''}</span><span class="swipe">\${i<n-1?'向左滑看更多 →':'收藏・分享給朋友'}</span></div>\`;
  document.getElementById('root').innerHTML=slides.map((s,i)=>{
    let mid='';
    if(s.type==='cover') mid=\`<div class="kicker">\${s.kicker}</div><div class="big">\${s.big}</div><h1>\${s.title}</h1><div class="sub">\${s.sub}</div>\`;
    else if(s.type==='point') mid=\`<div class="num">\${s.num}</div><h2>\${s.title}</h2>\${s.viz?'<div class="viz">'+s.viz+'</div>':''}<div class="body">\${s.body}</div>\`;
    else if(s.type==='end') mid=\`<h2>\${s.title}</h2><div style="margin-top:30px">\${s.points.map((p,j)=>'<div class="tk"><i>'+String(j+1).padStart(2,'0')+'</i><div>'+p+'</div></div>').join('')}</div><div class="ask">\${s.ask}<span>\${s.askSub||''}</span></div>\${s.note?'<div class="note">'+s.note+'</div>':''}\`;
    else throw new Error('未知的 slide type: '+s.type);
    return \`<div class="slide \${s.type}" id="s\${i+1}">\${top(i)}\${mid}\${foot(i)}</div>\`;
  }).join('');
}
${read(setFile)}
</script></body></html>`;
const tmp=path.join(out,'_page.html');fs.writeFileSync(tmp,html);
(async()=>{
  const b=await chromium.launch(),p=await b.newPage({viewport:{width:1080,height:1400}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+tmp,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  if(errs.length){console.error(errs.join('\n'));await b.close();process.exit(1)}
  const n=await p.locator('.slide').count();
  // 檢查內容是否超出版面（foot 被擠出去或文字溢出）
  const over=await p.evaluate(()=>[...document.querySelectorAll('.slide')].map((el,i)=>el.scrollHeight>el.clientHeight+1?i+1:0).filter(Boolean));
  if(over.length) console.warn('⚠ 內容溢出：第 '+over.join(', ')+' 張');
  for(let i=1;i<=n;i++) await p.locator('#s'+i).screenshot({path:path.join(out,i+'.png')});
  const imgs=[...Array(n)].map((_,i)=>'data:image/png;base64,'+fs.readFileSync(path.join(out,(i+1)+'.png')).toString('base64'));
  await p.setContent(`<body style="margin:0;background:#000;display:grid;grid-template-columns:repeat(3,540px);gap:6px;width:1632px">${imgs.map(s=>`<img src="${s}" width="540">`).join('')}</body>`);
  await p.screenshot({path:path.join(out,'sheet.png'),fullPage:true});
  await b.close();fs.unlinkSync(tmp);
  console.log(`完成 ${n} 張 → ${out}`);
})();
