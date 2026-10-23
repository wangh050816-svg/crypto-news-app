// 用法：node photo-cards/render.js photo-cards/posts/rich-vs-most.js [--refresh]
// 輸出：photo-cards/out/<post名稱>/1.png ... N.png（1080×1350）、sheet.png（總覽）、caption.txt
// 照片從 Unsplash 搜尋（需要環境變數 UNSPLASH_ACCESS_KEY），選中的照片記在 posts/<名稱>.photos.json，
// 之後重跑不會再搜尋；改了某格的 q 或 pick 才會重抓那一格，--refresh 全部重抓。
const fs=require('fs'),path=require('path');
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const postFile=path.resolve(process.argv[2]||'');
if(!fs.existsSync(postFile)){console.error('請指定 post 檔，例如 node photo-cards/render.js photo-cards/posts/rich-vs-most.js');process.exit(1)}
const refresh=process.argv.includes('--refresh');
const name=path.basename(postFile,'.js'), out=path.join(__dirname,'out',name);
const lockFile=postFile.replace(/\.js$/,'.photos.json');
fs.mkdirSync(out,{recursive:true});

let spec;global.POST=s=>{spec=s};require(postFile);
const KEY=process.env.UNSPLASH_ACCESS_KEY;
const lock=!refresh&&fs.existsSync(lockFile)?JSON.parse(fs.readFileSync(lockFile,'utf8')):{};
const cacheFile=path.join(out,'search-cache.json');
const cache=fs.existsSync(cacheFile)?JSON.parse(fs.readFileSync(cacheFile,'utf8')):{};
const used={},W=1080,H=1350;
const save=()=>fs.writeFileSync(lockFile,JSON.stringify(used,null,1)+'\n');

async function api(url){
  if(!KEY) throw new Error('沒有 UNSPLASH_ACCESS_KEY，無法搜尋新照片');
  const r=await fetch(url,{headers:{Authorization:'Client-ID '+KEY,'Accept-Version':'v1'}});
  if(!r.ok) throw new Error(`Unsplash ${r.status}：${await r.text()}`);
  api.left=r.headers.get('x-ratelimit-remaining');
  return r.json();
}
// 每一格：用 q 搜尋，pick 選第幾張（從 0 起算），也可以直接給 id 指定照片
async function photo(slot,p,h){
  const want={q:p.q,pick:p.pick||0,id:p.id||null};
  const old=lock[slot];
  if(old&&old.q===want.q&&old.pick===want.pick&&old.id===want.id) return used[slot]=old;
  let ph;
  if(p.id) ph=await api(`https://api.unsplash.com/photos/${p.id}`);
  else{
    // 搜尋結果存在 out/ 裡，換 pick 不用再搜一次
    const url=`https://api.unsplash.com/search/photos?query=${encodeURIComponent(p.q)}&per_page=${Math.max(10,want.pick+1)}&orientation=${h>=H?'portrait':'landscape'}&content_filter=high`;
    const res=cache[url]&&cache[url].results.length>want.pick?cache[url]:(cache[url]=await api(url));
    fs.writeFileSync(cacheFile,JSON.stringify(cache));
    ph=res.results[want.pick];
    if(!ph) throw new Error(`「${p.q}」找不到第 ${want.pick} 張照片`);
  }
  // Unsplash 規範：實際使用照片時要觸發 download 端點
  await api(ph.links.download_location);
  return used[slot]={...want,photo:ph.id,raw:ph.urls.raw,by:ph.user.name,link:ph.links.html};
}
const src=(f,h,p)=>`${f.raw}&w=${W}&h=${h}&fit=crop&crop=${p.crop||'faces,entropy'}&q=85`;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

// 一格照片：底部漸層壓暗，英文大字＋中文副標
function panel(f,p,h){
  return `<div class="pn" style="height:${h}px">
  <img src="${src(f,h,p)}" style="filter:brightness(${p.bright??0.92})">
  <div class="sh"></div>
  <div class="tx"><b>${esc(p.en)}</b><span>${esc(p.zh)}</span></div></div>`;
}

(async()=>{
  const cards=[];
  for(const [i,s] of spec.slides.entries()){
    // 純文字頁（例如結尾），黑底不用照片
    if(s.text){cards.push(`<div class="tp"><b>${esc(s.text.en)}</b><span>${esc(s.text.zh)}</span></div>`);continue}
    if(s.full){cards.push(panel(await photo(`${i+1}full`,s.full,H),s.full,H));continue}
    const h=H/2-1;
    cards.push(panel(await photo(`${i+1}top`,s.top,h),s.top,h)+'<div class="ln"></div>'+panel(await photo(`${i+1}bot`,s.bot,h),s.bot,h));
  }
  save();
  if(api.left) console.log('Unsplash 本小時剩餘額度：'+api.left);

  const html=`<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&family=Noto+Serif+TC:wght@500;700&display=swap" rel="stylesheet">
<style>
body{margin:0;background:#000}
.card{width:${W}px;height:${H}px;position:relative;overflow:hidden;background:#000;margin-bottom:20px}
.pn{position:relative;width:${W}px;overflow:hidden}
.pn img{width:100%;height:100%;object-fit:cover;display:block}
.sh{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0) 45%,rgba(0,0,0,.55) 80%,rgba(0,0,0,.7))}
.tx{position:absolute;left:60px;right:60px;bottom:56px;text-align:center;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.55)}
.tx b{display:block;font-family:"Source Serif 4",serif;font-weight:700;font-size:62px;line-height:1.12;letter-spacing:-.3px;text-wrap:balance}
.tx span{display:block;font-family:"Noto Serif TC",serif;font-weight:500;font-size:38px;margin-top:12px;letter-spacing:2px}
.tp{height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;padding:0 90px}
.tp b{font-family:"Source Serif 4",serif;font-weight:700;font-size:72px;line-height:1.15;white-space:pre-line;text-wrap:balance}
.tp span{font-family:"Noto Serif TC",serif;font-size:42px;margin-top:28px;letter-spacing:2px;white-space:pre-line;color:rgba(255,255,255,.85)}
.ln{height:2px;background:rgba(255,255,255,.85)}
.au{position:absolute;right:40px;bottom:26px;color:rgba(255,255,255,.85);font-family:"Source Serif 4",serif;font-size:28px;text-shadow:0 1px 8px rgba(0,0,0,.6)}
</style></head><body>
${cards.map((c,i)=>`<div class="card" id="card${i+1}">${c}${spec.author?`<div class="au">${esc(spec.author)}</div>`:''}</div>`).join('\n')}
</body></html>`;

  const b=await chromium.launch(),pg=await b.newPage({viewport:{width:W,height:H}});
  await pg.setContent(html,{waitUntil:'networkidle',timeout:90000});
  await pg.evaluate(()=>document.fonts.ready);
  const broken=await pg.$$eval('img',a=>a.filter(i=>!i.naturalWidth).map(i=>i.src));
  if(broken.length){console.error('照片載入失敗：\n'+broken.join('\n'));await b.close();process.exit(1)}
  const n=cards.length;
  for(let i=1;i<=n;i++) await pg.locator('#card'+i).screenshot({path:path.join(out,i+'.png')});
  // 總覽圖：5 欄縮小排在一起，方便一次檢查
  const imgs=[...Array(n)].map((_,i)=>'data:image/png;base64,'+fs.readFileSync(path.join(out,(i+1)+'.png')).toString('base64'));
  await pg.setViewportSize({width:1824,height:100});
  await pg.setContent(`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(5,360px);align-items:start;gap:6px;width:1824px">${imgs.map(s=>`<img src="${s}" width="360" style="display:block">`).join('')}</body>`);
  await pg.screenshot({path:path.join(out,'sheet.png'),fullPage:true});
  await b.close();

  // 貼文文案；攝影師名單另存 credits.txt（Unsplash 授權不強制標示，想標再貼）
  const by=[...new Set(Object.values(used).map(v=>v.by))];
  const caption=spec.caption.trim()+'\n';
  fs.writeFileSync(path.join(out,'caption.txt'),caption);
  fs.writeFileSync(path.join(out,'credits.txt'),'📷 Unsplash：'+by.join('、')+'\n');
  console.log(`完成 ${n} 張 → ${out}\n\n${caption}`);
})().catch(e=>{
  // 中途額度用完也先存下已選的照片，下次接著抓
  if(Object.keys(used).length) save();
  console.error(e.message);process.exit(1)});
