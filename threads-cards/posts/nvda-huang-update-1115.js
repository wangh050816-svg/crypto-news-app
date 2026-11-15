// 黃仁勳案新進展：新加坡澄清間諜調查、黃仁勳已辭職（與 nvda-huang-board-1112.js 同系列，依使用者 11/15 文字）
// 查證：
// 10/30 新加坡內政部（警察部隊網站刊出）澄清 WSJ 報導："there were no such investigations conducted in respect of Alice Huang"
//   （指未就其與黃仁勳、中國情報的關係調查）— police.gov.sg、wccftech
// 11/12 新加坡內政部補充：曾因 Megaspeed 伺服器轉出口案調查 Alice Huang，調查與間諜無關；證據不足、予以嚴厲警告並禁止入境 — Reuters（GMA 轉載）
// 11/8 董事會宣布啟動獨立調查；黃仁勳向員工承認不忠 — CNBC、Reuters、Al Jazeera
// 11/12 黃仁勳辭去總裁、執行長及董事職務，即日生效；財務長 Colette Kress 任臨時執行長並續任 CFO；
//   Harvey C. Jones 任公司首位董事會主席 — Nvidia 8-K（SEC）、CNBC、NPR、Al Jazeera
// 人物照：Jensen Huang Stanford 2026-04-30 010 (cropped)，攝影 Anderseidesvik，CC BY-SA 4.0（Wikimedia Commons），已轉灰階、壓暗
const img=f=>'data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/'+f).toString('base64');
const face=img('jensen-huang-stanford-2026.jpg');
// NVDA 收盤 10/12–11/11（背景大線圖用）
const month=[226.32,228.52,221.30,217.23,214.13,217.09,216.47,221.97,212.21,210.96,216.00,217.94,215.38,213.66,204.64,202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51];
const spark=[202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51]; // 11/2–11/11 收盤＋盤後

const DOWN=30; // 前景（標題、時間軸、數據模組）往下移的距離
POST({
  caption:'黃仁勳這件事，現在又有新進展了。',
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
    g+=`<image href="${face}" x="610" y="-10" width="660" height="880" preserveAspectRatio="xMidYMid slice" opacity="0.62"/>`;
    g+=`<rect x="610" y="0" width="660" height="900" fill="url(#fadeL)"/><rect x="610" y="0" width="660" height="900" fill="url(#fadeB)"/><rect x="610" y="0" width="660" height="900" fill="url(#fadeR)"/>`;
    g+=`<g transform="translate(0,${DOWN})">`; // 前景內容整體下移
    // 標籤與標題
    const L=80;
    g+=`<rect x="${L}" y="58" width="6" height="26" fill="${T.fg}"/>`;
    g+=`<text x="${L+20}" y="80" style="font-family:Inter;font-size:24px;font-weight:700;letter-spacing:4px;fill:${T.dim}">NVIDIA<tspan fill="${T.fg}" dx="12">|</tspan><tspan dx="12">CORPORATE NEWS</tspan></text>`;
    g+=`<text x="${L-4}" y="168" class="ti2">新加坡否認間諜調查</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2">黃仁勳案<tspan fill="${T.fg}">疑問仍未解</tspan></text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    // 時間軸
    const ev=[
      ['10/30','新加坡內政部澄清','未就間諜疑雲展開調查',0],
      ['11/8','婚外情曝光','董事會啟動調查',0],
      ['11/12','黃仁勳辭去','執行長與董事職務',1],
      ['11/12','新加坡補充：Alice Huang','因 Megaspeed 案受查，非間諜案',0],
      ['最新狀態','董事會獨立調查','結果尚未公布',2],
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
        :`<text x="${NX+44}" y="${y+(big?20:16)}" style="font-family:Inter;font-weight:800;font-size:${big?58:46}px;fill:${big?T.fg:T.text}">${d}</text>`;
      const tx=NX+(big?250:206);
      g+=`<text x="${tx}" y="${y-6}" class="ev" ${big?`style="fill:${T.text};font-weight:700"`:''}>${a}</text>`;
      g+=`<text x="${tx}" y="${y+36}" class="ev" ${big?`style="fill:${T.text};font-weight:700"`:''}>${b}</text>`;
      if(big) g+=`<rect x="${NX+500}" y="${y-18}" width="110" height="36" rx="4" fill="none" stroke="${T.fg}" stroke-width="2"/><text x="${NX+555}" y="${y+9}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:${T.fg};letter-spacing:2px">官方公告</text>`;
    });
    // 右側數據模組
    const RX=1150, RW=400;
    const box=(y,h)=>`<rect x="${RX}" y="${y}" width="${RW}" height="${h}" fill="#0c0d10" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.18"/>`;
    // 1 臨時執行長
    let y=150;
    g+=box(y,200)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">臨時執行長</text>`;
    g+=`<text x="${RX+24}" y="${y+122}" style="font-family:Inter;font-size:54px;font-weight:800;fill:${T.fg}">Colette Kress</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb" style="fill:${T.text}">由財務長兼任</text>`;
    // 2 董事會主席
    y=375;
    g+=box(y,205);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">董事會主席</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-family:Inter;font-size:54px;font-weight:800;fill:${T.text}">Harvey Jones</text>`;
    g+=`<text x="${RX+28}" y="${y+176}" class="lb">NVIDIA 首位董事會主席</text>`;
    // 3 官方狀態
    y=605;
    g+=box(y,200);
    g+=`<rect x="${RX+28}" y="${y+26}" width="148" height="38" rx="4" fill="${T.text}" fill-opacity="0.1" stroke="${T.dim}" stroke-opacity="0.6"/>`;
    g+=`<circle cx="${RX+48}" cy="${y+45}" r="6" fill="${T.dim}"/><text x="${RX+64}" y="${y+54}" style="font-size:24px;font-weight:700;fill:${T.dim};letter-spacing:2px">官方狀態</text>`;
    g+=`<text x="${RX+26}" y="${y+124}" style="font-size:44px;font-weight:900;fill:${T.text}">調查結果<tspan style="font-weight:700;fill:${T.dim}">未公布</tspan></text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb">仍有多項疑問待釐清</text>`;
    g+=`</g>`;
    g+=`<style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.ev{fill:${T.dim};font-size:31px;font-weight:500}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
