// 共用版型：4K「快報」時間軸卡（與 trezor-scam-sentence-1122、mev-brothers-acquitted-1118 同系列）
// 左：兩行大標題＋時間軸（5 列），右：三格數據模組；背景網格、電路紋理、淡走勢線；中間不放圖
// 用法：POST({...require('./lib-bulletin.js')({t1,t2,events,boxes,seed}), caption})
//   t1/t2：標題兩行，*文字* 為橘色；數字自動用 Inter
//   events：[[左欄標籤, 說明, 類型]]，類型 0 一般、1 重點（橘色高亮）、2 最新狀態（灰色虛線）
//   boxes：[[小標, 大字, 說明]]，第一格頂端有橘線、大字橘色
const num=(s,size)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/[+\-]?\d[\d,.]*%?/g,m=>`<tspan style="font-family:Inter;font-weight:800${size?`;font-size:${size}px`:''}">${m}</tspan>`);
const rich=(s,T)=>num(s).replace(/\*(.+?)\*/g,`<tspan fill="${T.fg}">$1</tspan>`);
module.exports=({t1,t2,events,boxes,seed=7})=>({
  theme:'bulletin',width:1600,height:900,scale:2.4,footer:['',''],
  draw:T=>{
    let g=`<defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/></pattern>
      <linearGradient id="hl" x1="0" x2="1"><stop offset="0" stop-color="${T.fg}" stop-opacity="0.16"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.02"/></linearGradient>
      <linearGradient id="tl" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="330" y2="680"><stop offset="0" stop-color="${T.fg}" stop-opacity="0.35"/><stop offset="0.7" stop-color="${T.fg}"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.15"/></linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
      <radialGradient id="halo2" cx="0.5" cy="0.4" r="0.5"><stop offset="0" stop-color="#3a3d43" stop-opacity="0.8"/><stop offset="0.6" stop-color="#25272b" stop-opacity="0.45"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
    </defs>`;
    g+=`<rect width="1600" height="900" fill="url(#grid)"/>`;
    const rnd=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(seed);
    let c='';
    for(let i=0;i<26;i++){let x=40+rnd()*1520,y=40+rnd()*820,d=`M${x|0} ${y|0}`;
      for(let k=0;k<3;k++){const L=40+rnd()*120;rnd()<.5?x+=(rnd()<.5?-L:L):y+=(rnd()<.5?-L:L);d+=` L${x|0} ${y|0}`;}
      c+=`<path d="${d}" fill="none" stroke="#ffffff" stroke-width="1.5"/><circle cx="${x|0}" cy="${y|0}" r="4" fill="none" stroke="#ffffff" stroke-width="1.5"/>`;}
    g+=`<g opacity="0.05">${c}</g>`;
    let v=0.5,pts=[];for(let i=0;i<24;i++){v+=(rnd()-0.5)*0.18;v=Math.max(0.1,Math.min(0.9,v));pts.push(`${(60+i/23*1480).toFixed(1)},${(380+v*420).toFixed(1)}`);}
    g+=`<polyline points="${pts.join(' ')}" fill="none" stroke="${T.fg}" stroke-opacity="0.045" stroke-width="4" stroke-linejoin="round"/>`;
    g+=`<ellipse cx="985" cy="380" rx="420" ry="420" fill="url(#halo2)"/>`;
    g+=`<g transform="translate(0,30)">`;
    const L=80;
    g+=`<text x="${L-4}" y="168" class="ti2">${rich(t1,T)}</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2">${rich(t2,T)}</text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    const NX=L+18,Y0=356,DY=98,n=events.length,last=events[n-1][2]===2;
    g+=`<line x1="${NX}" x2="${NX}" y1="${Y0}" y2="${Y0+DY*(last?n-2:n-1)}" stroke="url(#tl)" stroke-width="4"/>`;
    if(last) g+=`<line x1="${NX}" x2="${NX}" y1="${Y0+DY*(n-2)}" y2="${Y0+DY*(n-1)}" stroke="${T.dim}" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>`;
    events.forEach(([d,a,k],i)=>{
      const y=Y0+i*DY,big=k===1;
      if(big){
        g+=`<rect x="${NX-38}" y="${y-48}" width="760" height="96" fill="url(#hl)"/><rect x="${NX-38}" y="${y-48}" width="4" height="96" fill="${T.fg}"/>`;
        g+=`<circle cx="${NX}" cy="${y}" r="20" fill="${T.fg}" opacity="0.55" filter="url(#glow)"/><circle cx="${NX}" cy="${y}" r="15" fill="${T.fg}" stroke="${T.bg}" stroke-width="4"/>`;
      }else if(k===2) g+=`<circle cx="${NX}" cy="${y}" r="11" fill="${T.bg}" stroke="${T.dim}" stroke-width="3"/>`;
      else g+=`<circle cx="${NX}" cy="${y}" r="11" fill="${T.text}" stroke="${T.bg}" stroke-width="4"/>`;
      const isDate=/^\d+\/\d+$/.test(d);
      g+=isDate?`<text x="${NX+44}" y="${y+(big?20:16)}" style="font-family:Inter;font-weight:800;font-size:${big?58:46}px;fill:${big?T.fg:T.text}">${d}</text>`
        :`<text x="${NX+44}" y="${y+12}" style="font-weight:700;font-size:${big?38:32}px;fill:${k===2?T.dim:big?T.fg:T.text}">${num(d)}</text>`;
      g+=`<text x="${NX+(big?250:206)}" y="${y+12}" class="ev" style="font-size:${big?40:34}px;${big?`fill:${T.text};font-weight:700`:''}">${num(a)}</text>`;
    });
    const RX=1150,RW=400,ys=[150,375,605],hs=[200,205,200];
    boxes.forEach(([a,b,cc],i)=>{
      const y=ys[i];
      g+=`<rect x="${RX}" y="${y}" width="${RW}" height="${hs[i]}" fill="#0c0d10" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.18"/>`;
      if(i===0) g+=`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
      g+=`<text x="${RX+28}" y="${y+48}" class="lb">${num(a)}</text>`;
      g+=`<text x="${RX+24}" y="${y+124}" style="font-size:48px;font-weight:900;fill:${i===0?T.fg:T.text}">${num(b,66)}</text>`;
      g+=`<text x="${RX+28}" y="${y+174}" class="lb"${i===0?` style="fill:${T.text}"`:''}>${num(cc)}</text>`;
    });
    g+=`</g><style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.ev{fill:${T.dim};font-size:31px;font-weight:500}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
