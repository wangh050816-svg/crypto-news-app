// Nvidia 董事會傳出準備撤換黃仁勳（國際財經媒體風格，依使用者 11/12 文字）
// 查證：
// 11/8（週日）董事會宣布啟動獨立調查；黃仁勳向員工承認不忠 — CNBC、Reuters（NST 轉載）、Tribune
// 11/9 股東提起擬議集體訴訟 — Reuters（Daily Guardian 轉載）、Yahoo Finance live
// 11/11 WSJ：董事會準備撤換黃仁勳 — CNBC、TechCrunch、CBS、MarketScreener(Reuters)
// 盤後跌逾 8% 至 159.51 美元 — CBS、BNO News；11/11 收盤 173.73（Yahoo Finance），159.51 為 -8.2%
// 11/17 美東盤後公布 FY27 Q3 財報 — Nvidia 10/28 公告（CME Group 轉述）
// 1993 年共同創辦 — nvidia.com 董事會介紹
// 走勢線：NVDA 日收盤 11/2–11/11（Yahoo Finance）＋ 11/11 盤後 159.51
// 人物照：Jensen Huang Stanford 2026-04-30 010 (cropped)，攝影 Anderseidesvik，CC BY-SA 4.0（Wikimedia Commons），已轉灰階、壓暗
const img=f=>'data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/'+f).toString('base64');
const face=img('jensen-huang-stanford-2026.jpg');
// NVDA 收盤 10/12–11/11（背景大線圖用）
const month=[226.32,228.52,221.30,217.23,214.13,217.09,216.47,221.97,212.21,210.96,216.00,217.94,215.38,213.66,204.64,202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51];
const spark=[202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51]; // 11/2–11/11 收盤＋盤後

POST({
  caption:'Nvidia 董事會傳出準備撤換黃仁勳？目前仍是媒體報導，董事會尚未正式宣布。',
  theme:'bulletin',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    let g=`<defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/></pattern>
      <linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="${T.bg}"/><stop offset="0.45" stop-color="${T.bg}" stop-opacity="0"/></linearGradient>
      <linearGradient id="fadeB" y1="0" y2="1" x1="0" x2="0"><stop offset="0.55" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient>
      <linearGradient id="fadeR" x1="0" x2="1"><stop offset="0.7" stop-color="#101114" stop-opacity="0"/><stop offset="1" stop-color="#101114"/></linearGradient>
      <linearGradient id="hl" x1="0" x2="1"><stop offset="0" stop-color="${T.fg}" stop-opacity="0.16"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.02"/></linearGradient>
      <linearGradient id="tl" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="340" y2="620"><stop offset="0" stop-color="${T.fg}" stop-opacity="0.35"/><stop offset="0.7" stop-color="${T.fg}"/><stop offset="1" stop-color="${T.fg}" stop-opacity="0.15"/></linearGradient>
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
    g+=`<image href="${face}" x="610" y="-10" width="660" height="880" preserveAspectRatio="xMidYMid slice" opacity="0.62"/>`;
    g+=`<rect x="610" y="0" width="660" height="900" fill="url(#fadeL)"/><rect x="610" y="0" width="660" height="900" fill="url(#fadeB)"/><rect x="610" y="0" width="660" height="900" fill="url(#fadeR)"/>`;
    // 標籤與標題
    const L=80;
    g+=`<rect x="${L}" y="58" width="6" height="26" fill="${T.fg}"/>`;
    g+=`<text x="${L+20}" y="80" style="font-family:Inter;font-size:24px;font-weight:700;letter-spacing:4px;fill:${T.dim}">NVIDIA<tspan fill="${T.fg}" dx="12">|</tspan><tspan dx="12">CORPORATE NEWS</tspan></text>`;
    g+=`<text x="${L-4}" y="168" class="ti2">NVIDIA 董事會傳出</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2">準備<tspan fill="${T.fg}">撤換黃仁勳</tspan>？</text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    // 時間軸
    const ev=[
      ['11/8','婚外情曝光','董事會啟動調查',0],
      ['11/9','傳出股東','提起集體訴訟',0],
      ['11/11','WSJ 報導：董事會','可能要求他下台',1],
      ['11/17','預定公布財報','（美東盤後）',2],
    ];
    const NX=L+18, Y0=370, DY=118;
    g+=`<line x1="${NX}" x2="${NX}" y1="${Y0}" y2="${Y0+DY*2}" stroke="url(#tl)" stroke-width="4"/>`;
    g+=`<line x1="${NX}" x2="${NX}" y1="${Y0+DY*2}" y2="${Y0+DY*3}" stroke="${T.dim}" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>`;
    ev.forEach(([d,a,b,k],i)=>{
      const y=Y0+i*DY;
      if(k===1){
        g+=`<rect x="${NX-38}" y="${y-58}" width="660" height="116" fill="url(#hl)"/><rect x="${NX-38}" y="${y-58}" width="4" height="116" fill="${T.fg}"/>`;
        g+=`<circle cx="${NX}" cy="${y}" r="20" fill="${T.fg}" opacity="0.55" filter="url(#glow)"/>`;
        g+=`<circle cx="${NX}" cy="${y}" r="15" fill="${T.fg}" stroke="${T.bg}" stroke-width="4"/>`;
      }else if(k===2){
        g+=`<circle cx="${NX}" cy="${y}" r="11" fill="${T.bg}" stroke="${T.dim}" stroke-width="3"/>`;
      }else{
        g+=`<circle cx="${NX}" cy="${y}" r="11" fill="${T.text}" stroke="${T.bg}" stroke-width="4"/>`;
      }
      const big=k===1;
      g+=`<text x="${NX+44}" y="${y+(big?20:16)}" style="font-family:Inter;font-weight:800;font-size:${big?58:46}px;fill:${big?T.fg:k===2?T.dim:T.text}">${d}</text>`;
      const tx=NX+(big?250:206);
      g+=`<text x="${tx}" y="${y-6}" class="ev" ${big?`style="fill:${T.text};font-weight:700"`:''}>${a}</text>`;
      g+=`<text x="${tx}" y="${y+36}" class="ev" ${big?`style="fill:${T.text};font-weight:700"`:''}>${b}</text>`;
      if(big) g+=`<rect x="${NX+500}" y="${y-76}" width="110" height="36" rx="4" fill="none" stroke="${T.fg}" stroke-width="2"/><text x="${NX+555}" y="${y-49}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:${T.fg};letter-spacing:2px">媒體報導</text>`;
    });
    // 右側數據模組
    const RX=1150, RW=400;
    const box=(y,h)=>`<rect x="${RX}" y="${y}" width="${RW}" height="${h}" fill="#0c0d10" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.18"/>`;
    // 1 股價
    let y=150;
    g+=box(y,200)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.red}"/>`;
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">傳出報導後盤後股價</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-size:66px;font-weight:900;fill:${T.fg}">跌逾 8%</text>`;
    g+=`<text x="${RX+28}" y="${y+174}" class="lb" style="fill:${T.text}"><tspan style="font-family:Inter;font-weight:700">159.51</tspan> 美元</text>`;
    const sx0=RX+270,sw=105,sy0=y+138,sh=50,lo=155,hi=210;
    const sp=spark.map((v,i)=>[sx0+i/(spark.length-1)*sw, sy0+(hi-v)/(hi-lo)*sh]);
    g+=`<polyline points="${sp.map(p=>p.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="${T.red}" stroke-width="3" stroke-linejoin="round"/>`;
    g+=`<circle cx="${sp.at(-1)[0]}" cy="${sp.at(-1)[1]}" r="5" fill="${T.red}"/>`;
    // 2 創辦
    y=375;
    g+=box(y,180);
    g+=`<text x="${RX+24}" y="${y+86}" style="font-family:Inter;font-size:72px;font-weight:800;fill:${T.text}">1993</text>`;
    g+=`<text x="${RX+28}" y="${y+146}" class="lb">黃仁勳共同創辦 NVIDIA</text>`;
    // 3 接班狀態
    y=580;
    g+=box(y,200);
    g+=`<rect x="${RX+28}" y="${y+26}" width="148" height="38" rx="4" fill="${T.text}" fill-opacity="0.1" stroke="${T.dim}" stroke-opacity="0.6"/>`;
    g+=`<circle cx="${RX+48}" cy="${y+45}" r="6" fill="${T.dim}"/><text x="${RX+64}" y="${y+54}" style="font-size:24px;font-weight:700;fill:${T.dim};letter-spacing:2px">官方狀態</text>`;
    g+=`<text x="${RX+26}" y="${y+124}" style="font-size:46px;font-weight:900;fill:${T.text}">接班安排未公開</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb">董事會尚未正式宣布</text>`;
    g+=`<style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.ev{fill:${T.dim};font-size:31px;font-weight:500}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
