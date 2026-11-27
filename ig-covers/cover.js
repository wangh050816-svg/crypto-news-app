// IG 封面（1080×1350，4:5）：人物去背照＋黃色小標＋兩行白色大標
// 用法：node ig-covers/cover.js ig-covers/<名稱>.json → ig-covers/out/<名稱>.png
const fs=require('fs'),path=require('path');
let chromium;try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const f=path.resolve(process.argv[2]),c=JSON.parse(fs.readFileSync(f,'utf8')),dir=path.dirname(f);
const img=p=>'data:image/png;base64,'+fs.readFileSync(path.join(dir,p)).toString('base64');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const people=(c.people||[]).map(p=>`<img class="pp" src="${img(p.src)}" style="left:${p.x}px;bottom:${p.bottom||330}px;height:${p.h||1000}px;${p.flip?'transform:scaleX(-1);':''}">`).join('');
const html=`<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&family=Inter:wght@800&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}body{width:1080px;height:1350px;overflow:hidden;background:#0b0c0f;font-family:'Noto Sans TC',sans-serif}
.bg{position:absolute;inset:0;background:radial-gradient(70% 55% at 50% 38%,${c.glow||'#3a2a12'} 0%,#14151a 55%,#0b0c0f 100%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:60px 60px}
.pp{position:absolute;filter:contrast(1.08) brightness(1.02)}
.fade{position:absolute;left:0;right:0;bottom:0;height:640px;background:linear-gradient(180deg,rgba(11,12,15,0) 0%,rgba(11,12,15,.85) 38%,#0b0c0f 62%)}
.txt{position:absolute;left:64px;right:64px;bottom:150px}
.k{color:#FFD21F;font-weight:900;font-size:54px;line-height:1.25;margin-bottom:22px;letter-spacing:1px}
.t{color:#fff;font-weight:900;font-size:76px;line-height:1.22;letter-spacing:1px;white-space:nowrap}.k{white-space:nowrap}
.t span,.k span{font-family:Inter,'Noto Sans TC';font-weight:800}
.tag{position:absolute;left:64px;bottom:64px;border:2px solid #ffffffcc;color:#fff;border-radius:40px;padding:6px 22px;font-size:26px;font-weight:700}
.cr{position:absolute;right:40px;bottom:30px;color:#ffffff59;font-size:16px;text-align:right;max-width:640px}
</style></head><body><div class="bg"></div><div class="grid"></div>${people}<div class="fade"></div>
<div class="txt"><div class="k">${esc(c.kicker)}</div>${c.title.map(l=>`<div class="t">${esc(l)}</div>`).join('')}</div>
<div class="tag">@zqqnc</div><div class="cr">${esc(c.credit||'')}</div></body></html>`;
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:2});
await p.setContent(html,{waitUntil:'networkidle'});await p.waitForTimeout(400);
await p.evaluate(()=>{for(const el of document.querySelectorAll('.t,.k')){let fs=parseFloat(getComputedStyle(el).fontSize);while(el.scrollWidth>952&&fs>30){fs-=2;el.style.fontSize=fs+'px'}}});
fs.mkdirSync(path.join(dir,'out'),{recursive:true});const o=path.join(dir,'out',path.basename(f,'.json')+'.png');
await p.screenshot({path:o});await b.close();console.log(o)})();
