// 知識動畫影片引擎：每一格畫面都是 frame(t) 算出來的 HTML/SVG，render.js 逐格截圖再交給 ffmpeg 合成 mp4。
// 畫布 1920×1080，黑底。影片檔（videos/*.js）呼叫 VIDEO({title, scenes:[{dur, draw(lt,d)}]})。
const W=1920,H=1080;
const C={bg:'#0d0c0e',line:'#f2efe9',dim:'#6b6670',faint:'#2a272c',y:'#f5b83d',r:'#e8423f',en:'#8a8590'};

// ---- 數學工具 ----
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,p)=>a+(b-a)*p;
const prog=(t,a,b)=>clamp((t-a)/(b-a));                 // t 在 a→b 之間的進度 0..1
const ease={out:p=>1-Math.pow(1-p,3),inOut:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,
  back:p=>{const c=1.7;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2)}};
function rand(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

// ---- 文字 ----
// 標記語法：{y:黃字} {r:紅字}。reveal 0..1 控制逐字打出。
function rich(s,reveal=1){
  const segs=[];s.replace(/\{(\w):([^}]*)\}|([^{]+)/g,(m,c,t,plain)=>{segs.push(plain!=null?{t:plain}:{t,c})});
  const total=segs.reduce((n,g)=>n+[...g.t].length,0);let left=Math.round(total*reveal),out='';
  for(const g of segs){const ch=[...g.t].slice(0,Math.max(0,left));left-=[...g.t].length;
    if(ch.length) out+=g.c?`<span style="color:${C[g.c]}">${ch.join('')}</span>`:ch.join('')}
  return out;
}
// 底部字幕：中文逐字打出，英文淡入
function cap(lt,zh,en,start=.3,cps=14,y=860){
  const n=[...zh.replace(/\{\w:|\}/g,'')].length,r=prog(lt,start,start+n/cps),eo=prog(lt,start+n/cps*.6,start+n/cps+.3);
  return `<div class="cap" style="top:${y}px"><b>${rich(zh,r)}</b><i style="opacity:${eo}">${en}</i></div>`;
}
const txt=(x,y,s,size,o={})=>`<div class="t" style="left:${x}px;top:${y}px;font-size:${size}px;color:${o.c||C.line};opacity:${o.op??1};font-weight:${o.w||900};letter-spacing:${o.ls||0}px;transform:translate(-50%,-50%) scale(${o.sc??1});${o.f?`font-family:${o.f};`:''}">${s}</div>`;
const svg=inner=>`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:0">${inner}</svg>`;

// ---- 角色：小幣（線條硬幣臉） ----
// mood: smile | happy | sad | wow ；blink 0..1
function coin(x,y,s=1,mood='smile',o={}){
  const L=C.line,sw=4/s;let f='';
  if(mood==='happy') f=`<path d="M-24,-8 Q-16,-18 -8,-8 M8,-8 Q16,-18 24,-8" fill="none" stroke="${L}" stroke-width="${sw}" stroke-linecap="round"/><path d="M-14,10 Q0,26 14,10" fill="none" stroke="${L}" stroke-width="${sw}" stroke-linecap="round"/>`;
  else{const ey=o.blink?1.5:9;
    f=`<ellipse cx="-16" cy="-8" rx="5" ry="${ey}" fill="${L}"/><ellipse cx="16" cy="-8" rx="5" ry="${ey}" fill="${L}"/>`;
    f+=mood==='sad'?`<path d="M-12,22 Q0,12 12,22" fill="none" stroke="${L}" stroke-width="${sw}" stroke-linecap="round"/>`
      :mood==='wow'?`<ellipse cx="0" cy="18" rx="7" ry="9" fill="none" stroke="${L}" stroke-width="${sw}"/>`
      :`<path d="M-10,12 Q0,20 10,12" fill="none" stroke="${L}" stroke-width="${sw}" stroke-linecap="round"/>`;
    if(mood!=='sad') f+=`<ellipse cx="-34" cy="8" rx="8" ry="5" fill="${C.y}" opacity=".35"/><ellipse cx="34" cy="8" rx="8" ry="5" fill="${C.y}" opacity=".35"/>`;
    if(mood==='sad') f+=`<path d="M40,-30 Q48,-16 43,-10 Q35,-10 40,-30Z" fill="none" stroke="${L}" stroke-width="${sw*.8}"/>`;
  }
  return `<g transform="translate(${x},${y}) scale(${s}) rotate(${o.rot||0})">
    <ellipse cx="0" cy="66" rx="${44*(o.shadow??1)}" ry="7" fill="#000" opacity=".5"/>
    <circle r="56" fill="${C.bg}" stroke="${L}" stroke-width="${sw}"/>
    <circle r="45" fill="none" stroke="${o.ring||C.dim}" stroke-width="${sw*.7}" stroke-dasharray="3 7"/>${f}</g>`;
}

// ---- 時間軸 ----
let VID=null;
function VIDEO(v){VID=v;let t=0;v.scenes.forEach(s=>{s.start=t;t+=s.dur});v.duration=t;window.DURATION=t;window.FPS=v.fps||30}
window.renderFrame=function(t){
  let html='';
  for(const s of VID.scenes){
    if(t<s.start-.001||t>=s.start+s.dur) continue;
    const lt=t-s.start,fade=s.fade??.35;
    const op=Math.min(s===VID.scenes[0]?1:prog(lt,0,fade),s===VID.scenes.at(-1)?prog(s.dur-lt,0,.6):prog(s.dur-lt,0,fade));
    html+=`<div class="scene" style="opacity:${op}">${s.draw(lt,s.dur)}</div>`;
  }
  document.getElementById('stage').innerHTML=html;
};
