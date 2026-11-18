// MEV 兄弟案無罪（與黃仁勳圖同系列版型，左上不放英文；兩人無授權照片，中間改用 12 秒計時環）
// 查證：
// 2023/4 以誘餌交易攻擊 MEV 機器人，約 12 秒取得約 2,500 萬美元 — Protos、FinanceFeeds、Crowdfund Insider
// 2024/5 遭起訴（電匯詐欺等）；2025/11 陪審團三天未達共識，宣告審判無效 — DL News、CCN、Cointelegraph
// 11/16 法官 Jessica Clarke 裁定無罪：檢方未能證明重大虛假陳述或欺騙；免於重審 — Protos、FinanceFeeds、mlq.ai、Crowdfund Insider
// 新台幣：2,500 萬 × 約 32.85 ≈ 8.2 億元
const img=f=>'data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/'+f).toString('base64');

// NVDA 收盤 10/12–11/11（背景大線圖用）
const month=[226.32,228.52,221.30,217.23,214.13,217.09,216.47,221.97,212.21,210.96,216.00,217.94,215.38,213.66,204.64,202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51];
const spark=[202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51]; // 11/2–11/11 收盤＋盤後

const DOWN=30; // 前景（標題、時間軸、數據模組）往下移的距離
POST({
  caption:'12 秒拿走 2,500 萬美元，最後竟然無罪？',
  theme:'bulletin',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    let g=`<defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/></pattern>
      <linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${T.bg}"/><stop offset="0.45" stop-color="${T.bg}" stop-opacity="0"/></linearGradient>
      <linearGradient id="fadeB" y1="0" y2="1" x1="0" x2="0"><stop offset="0.55" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient>
      <linearGradient id="fadeR" x1="0" x2="1"><stop offset="0.7" stop-color="#101114" stop-opacity="0"/><stop offset="1" stop-color="#101114"/></linearGradient>
      <linearGradient id="hl" x1="0" x2="1"><stop offset="0" stop-color="${T.fg}" stop-opacity="0.16"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.02"/></linearGradient>
      <linearGradient id="tl" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="330" y2="680"><stop offset="0" stop-color="${T.fg}" stop-opacity="0.35"/><stop offset="0.7" stop-color="${T.fg}"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.15"/></linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>`;
    // 背景：網格、電路紋理、一個月股價線
    g+=`<rect width="1600" height="900" fill="url(#grid)"/>`;
    let c='';const rnd=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(7);
    for(let i=0;i<26;i++){let x=40+rnd()*1520,y=40+rnd()*820,d=`M${x|0} ${y|0}`;
      for(let k=0;k<3;k++){const L=40+rnd()*120;rnd()<.5?x+=(rnd()<.5?-L:L):y+=(rnd()<.5?-L:L);d+=` L${x|0} ${y|0}`;}
      c+=`<path d="${d}" fill="none" stroke="#ffffff" stroke-width="1.5"/><circle cx="${x|0}" cy="${y|0}" r="4" fill="none" stroke="#ffffff" stroke-width="1.5"/>`;}
    g+=`<g opacity="0.05">${c}</g>`;
    const mx=i=>60+i/(month.length-1)*1480, my=v=>380+(240-v)/(240-150)*420;
    g+=`<polyline points="${month.map((v,i)=>`${mx(i).toFixed(1)},${my(v).toFixed(1)}`).join(' ')}" fill="none" stroke="${T.fg}" stroke-opacity="0.045" stroke-width="4" stroke-linejoin="round"/>`;
    // 人物
    g+=`<defs><radialGradient id="halo2" cx="0.5" cy="0.4" r="0.5"><stop offset="0" stop-color="#3a3d43" stop-opacity="0.8"/><stop offset="0.6" stop-color="#25272b" stop-opacity="0.45"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient></defs>`;
    g+=`<ellipse cx="985" cy="380" rx="420" ry="420" fill="url(#halo2)"/>`;
    {const cx=935, cy=455, r=165;
      let t='';for(let i=0;i<60;i++){const a=-Math.PI/2+i*Math.PI/30, l=i%5===0?26:12;
        t+=`<line x1="${(cx+(r-l)*Math.cos(a)).toFixed(1)}" y1="${(cy+(r-l)*Math.sin(a)).toFixed(1)}" x2="${(cx+r*Math.cos(a)).toFixed(1)}" y2="${(cy+r*Math.sin(a)).toFixed(1)}" stroke="#fff" stroke-opacity="${i<12?0.9:0.22}" stroke-width="${i%5===0?4:2}"/>`;}
      const a1=-Math.PI/2, a2=-Math.PI/2+12*Math.PI/30, rr=r+22;
      g+=`<circle cx="${cx}" cy="${cy}" r="${r+22}" fill="none" stroke="#fff" stroke-opacity="0.08" stroke-width="10"/>`;
      g+=`<path d="M${cx+rr*Math.cos(a1)} ${cy+rr*Math.sin(a1)} A${rr} ${rr} 0 0 1 ${(cx+rr*Math.cos(a2)).toFixed(1)} ${(cy+rr*Math.sin(a2)).toFixed(1)}" fill="none" stroke="${T.fg}" stroke-width="10" stroke-linecap="round"/>`;
      g+=t;
      g+=`<text x="${cx}" y="${cy+44}" text-anchor="middle" style="font-family:Inter;font-size:150px;font-weight:800;fill:${T.text}">12</text>`;
      g+=`<text x="${cx}" y="${cy+100}" text-anchor="middle" style="font-size:40px;font-weight:900;fill:${T.fg}">秒</text>`;
      // 淡淡的以太坊菱形（裝飾）
      g+=`<g opacity="0.06" transform="translate(${cx} ${cy+300}) scale(0.7)"><path d="M0 -120 L74 0 L0 44 L-74 0Z" fill="#fff"/><path d="M0 60 L74 16 L0 120 L-74 16Z" fill="#fff"/></g>`;}
    g+=`<g transform="translate(0,${DOWN})">`; // 前景內容整體下移
    // 標籤與標題
    const L=80;
    g+=`<text x="${L-4}" y="168" class="ti2"><tspan style="font-family:Inter;font-weight:800">12</tspan> 秒拿走 <tspan style="font-family:Inter;font-weight:800">2,500</tspan> 萬美元</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2">最後竟然<tspan fill="${T.fg}">無罪</tspan>？</text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    // 時間軸
    const ev=[
      ['2023/4','誘餌交易，12 秒得手','',0],
      ['2024/5','遭起訴電匯詐欺','',0],
      ['2025/11','陪審團僵局，審判無效','',0],
      ['11/16','法官裁定無罪','',1],
      ['最新狀態','免於重審','',2],
    ];
    const NX=L+18, Y0=356, DY=98;
    g+=`<line x1="${NX}" x2="${NX}" y1="${Y0}" y2="${Y0+DY*3}" stroke="url(#tl)" stroke-width="4"/>`;
    g+=`<line x1="${NX}" x2="${NX}" y1="${Y0+DY*3}" y2="${Y0+DY*4}" stroke="${T.dim}" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>`;
    ev.forEach(([d,a,b,k],i)=>{
      const y=Y0+i*DY;
      if(k===1){
        g+=`<rect x="${NX-38}" y="${y-48}" width="660" height="96" fill="url(#hl)"/><rect x="${NX-38}" y="${y-48}" width="4" height="96" fill="${T.fg}"/>`;
        g+=`<circle cx="${NX}" cy="${y}" r="20" fill="${T.fg}" opacity="0.55" filter="url(#glow)"/>`;
        g+=`<circle cx="${NX}" cy="${y}" r="15" fill="${T.fg}" stroke="${T.bg}" stroke-width="4"/>`;
      }else if(k===2){
        g+=`<circle cx="${NX}" cy="${y}" r="11" fill="${T.bg}" stroke="${T.dim}" stroke-width="3"/>`;
      }else{
        g+=`<circle cx="${NX}" cy="${y}" r="11" fill="${T.text}" stroke="${T.bg}" stroke-width="4"/>`;
      }
      const big=k===1;
      g+=k===2?`<text x="${NX+44}" y="${y+12}" style="font-weight:700;font-size:32px;fill:${T.dim}">${d}</text>`
        :`<text x="${NX+44}" y="${y+(big?20:13)}" style="font-family:Inter;font-weight:800;font-size:${big?58:(d.length>5?36:46)}px;fill:${big?T.fg:T.text}">${d}</text>`;
      const tx=NX+(big?250:206);
      g+=`<text x="${tx}" y="${y+12}" class="ev" style="font-size:${big?40:34}px;${big?`fill:${T.text};font-weight:700`:''}">${a}</text>`;
      if(false) g+=`<rect x="${NX+500}" y="${y-18}" width="110" height="36" rx="4" fill="none" stroke="${T.fg}" stroke-width="2"/><text x="${NX+555}" y="${y+9}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:${T.fg};letter-spacing:2px">官方公告</text>`;
    });
    // 右側數據模組
    const RX=1150, RW=400;
    const box=(y,h)=>`<rect x="${RX}" y="${y}" width="${RW}" height="${h}" fill="#0c0d10" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.18"/>`;
    // 1 金額
    let y=150;
    g+=box(y,200)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">取得金額</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-size:40px;font-weight:900;fill:${T.fg}">約 <tspan style="font-family:Inter;font-size:58px;font-weight:800">2,500</tspan> 萬美元</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb" style="fill:${T.text}">約新台幣 <tspan style="font-family:Inter">8.2</tspan> 億元</text>`;
    // 2 手法
    y=375;
    g+=box(y,205);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">攻擊對象</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-family:Inter;font-size:58px;font-weight:800;fill:${T.text}">MEV <tspan style="font-family:'Noto Sans TC';font-weight:900">機器人</tspan></text>`;
    g+=`<text x="${RX+28}" y="${y+176}" class="lb">以太坊套利程式</text>`;
    // 3 判決
    y=605;
    g+=box(y,200);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">無罪關鍵</text>`;
    g+=`<text x="${RX+26}" y="${y+124}" style="font-size:46px;font-weight:900;fill:${T.text}">無重大虛假陳述</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb">檢方無法證明詐欺要件</text>`;
    g+=`</g>`;
    g+=`<style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.ev{fill:${T.dim};font-size:31px;font-weight:500}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
