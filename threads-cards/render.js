// 用法：node threads-cards/render.js threads-cards/posts/btc-supply.js
// 輸出：threads-cards/out/<post名稱>/card.png（1080×900）和 caption.txt
const fs=require('fs'),path=require('path');
let chromium;
try{({chromium}=require('playwright'))}catch(e){({chromium}=require('/opt/node22/lib/node_modules/playwright'))}
const postFile=path.resolve(process.argv[2]||'');
if(!fs.existsSync(postFile)){console.error('請指定 post 檔，例如 node threads-cards/render.js threads-cards/posts/btc-supply.js');process.exit(1)}
const name=path.basename(postFile,'.js'), out=path.join(__dirname,'out',name);
fs.mkdirSync(out,{recursive:true});

// 配色：bg 卡片底色、fg 主線和強調字、fill 區塊填色
const THEMES={
  wine:{page:'#2a1412',bg:'#5a2a26',fg:'#e4554c',fill:'rgba(228,85,76,.55)',text:'#f3e6e4',dim:'#d9bcb8',grid:'#e9d3d0'},
  navy:{page:'#0f1626',bg:'#1c2a46',fg:'#5aa9ff',fill:'rgba(90,169,255,.45)',text:'#e8eef8',dim:'#b8c6dc',grid:'#d0dbec'},
  forest:{page:'#0f1a14',bg:'#1e3528',fg:'#55d68a',fill:'rgba(85,214,138,.42)',text:'#e6f3eb',dim:'#b6d3c1',grid:'#cfe6d8'},
  ink:{page:'#0b0b0b',bg:'#1b1b1d',fg:'#f2a33a',fill:'rgba(242,163,58,.45)',text:'#f1f1f1',dim:'#bdbdbd',grid:'#d8d8d8'},
};

let spec;global.POST=s=>{spec=s};require(postFile);
const T=THEMES[spec.theme||'wine'];
const W=1080,H=900,PL=150,PR=60,PT=150,PB=190; // 圖表區的邊界
const cw=W-PL-PR, ch=H-PT-PB;
const {x,y}=spec;
const sx=v=>PL+(v-x.min)/(x.max-x.min)*cw, sy=v=>PT+ch-(v-y.min)/(y.max-y.min)*ch;
const pts=p=>p.map(([a,b])=>`${sx(a).toFixed(1)},${sy(b).toFixed(1)}`).join(' ');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
// 文字裡用 *粗體強調* 標出要上色的字
const rich=s=>esc(s).replace(/\*(.+?)\*/g,`<tspan fill="${T.fg}" font-weight="700">$1</tspan>`);

let svg='';
// 外框和刻度
svg+=`<rect x="${PL}" y="${PT}" width="${cw}" height="${ch}" fill="none" stroke="${T.grid}" stroke-opacity=".8" stroke-width="2"/>`;
for(const t of x.ticks){svg+=`<line x1="${sx(t)}" x2="${sx(t)}" y1="${PT+ch}" y2="${PT+ch-10}" stroke="${T.grid}" stroke-width="2"/>`;
  if(x.labels?.[t]!==undefined||!x.labels) svg+=`<text x="${sx(t)}" y="${PT+ch+38}" class="ax" text-anchor="middle">${esc(x.labels?x.labels[t]:t)}</text>`}
for(const t of y.ticks){svg+=`<line x1="${PL}" x2="${PL+10}" y1="${sy(t)}" y2="${sy(t)}" stroke="${T.grid}" stroke-width="2"/>`;
  if(y.labels?.[t]!==undefined||!y.labels) svg+=`<text x="${PL-16}" y="${sy(t)+9}" class="ax" text-anchor="end">${esc(y.labels?y.labels[t]:t)}</text>`}
if(x.title) svg+=`<text x="${PL+cw/2}" y="${PT+ch+72}" class="ax" text-anchor="middle">${esc(x.title)}</text>`;
if(y.title) y.title.split('\n').forEach((l,i,a)=>svg+=`<text x="${PL-16}" y="${PT+ch*0.68+i*28}" class="ax" text-anchor="end">${esc(l)}</text>`);
// 兩條線之間上色（像原圖「理性 vs 實際」的差距）
if(spec.between){const [a,b]=spec.between.map(n=>spec.series.find(s=>s.name===n).points);
  svg+=`<polygon points="${pts(a)} ${pts([...b].reverse())}" fill="${T.fill}"/>`}
for(const s of spec.series){
  if(s.area) svg+=`<polygon points="${pts([[s.points[0][0],y.min],...s.points,[s.points.at(-1)[0],y.min]])}" fill="${T.fill}"/>`;
  svg+=`<polyline points="${pts(s.points)}" fill="none" stroke="${s.color==='light'?T.text:T.fg}" stroke-width="${s.width||4}" ${s.dashed?'stroke-dasharray="10 8"':''} stroke-linejoin="round"/>`;
  if(s.label){const [lx,ly,rot=0]=s.label.at;
    svg+=`<text transform="translate(${sx(lx)},${sy(ly)}) rotate(${rot})" class="sl" fill="${s.color==='light'?T.text:T.fg}">${esc(s.label.text)}</text>`}
}
for(const m of spec.markers||[]){svg+=`<line x1="${sx(m.x)}" x2="${sx(m.x)}" y1="${PT}" y2="${PT+ch}" stroke="${T.text}" stroke-opacity=".7" stroke-width="2" stroke-dasharray="6 6"/>`;
  if(m.dot!==undefined) svg+=`<circle cx="${sx(m.x)}" cy="${sy(m.dot)}" r="9" fill="${T.text}" stroke="${T.bg}" stroke-width="3"/>`;
  if(m.label) svg+=`<text x="${sx(m.x)+12}" y="${PT+ch-18}" class="sl" fill="${T.text}">${esc(m.label)}</text>`}
for(const n of spec.notes||[]) n.lines.forEach((l,i)=>svg+=`<text x="${sx(n.at[0])}" y="${sy(n.at[1])+i*40}" class="nt" text-anchor="${n.anchor||'start'}">${rich(l)}</text>`);

const html=`<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet">
<style>body{margin:0;background:${T.page}}#card{width:${W}px;height:${H}px;background:${T.bg};border-radius:44px;overflow:hidden}
svg{font-family:Inter,"Noto Sans TC","DejaVu Sans",sans-serif}.ax{fill:${T.dim};font-size:22px}.sl{font-size:22px;font-weight:600;letter-spacing:.5px}
.nt{fill:${T.text};font-size:32px}.ti{fill:${T.text};font-size:38px;font-weight:700}.ft{fill:${T.dim};font-size:21px}</style></head><body>
<div id="card"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<text x="${W/2}" y="86" class="ti" text-anchor="middle">${esc(spec.title)}</text>${svg}
<text x="40" y="${H-36}" class="ft">${esc(spec.footer?.[0]||'')}</text><text x="${W-40}" y="${H-36}" class="ft" text-anchor="end">${esc(spec.footer?.[1]||'')}</text>
</svg></div></body></html>`;

(async()=>{
  const b=await chromium.launch(),p=await b.newPage({viewport:{width:W,height:H}});
  await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  await p.locator('#card').screenshot({path:path.join(out,'card.png'),omitBackground:true});
  await b.close();
  fs.writeFileSync(path.join(out,'caption.txt'),spec.caption.trim()+'\n');
  console.log(`完成 → ${out}/card.png\n\n${spec.caption.trim()}`);
})();
