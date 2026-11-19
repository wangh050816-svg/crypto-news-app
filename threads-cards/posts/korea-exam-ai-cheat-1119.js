// 韓國稅務師榜首 AI 作弊（同系列版型，左上不放英文；中間照片由使用者提供，臉部已打馬賽克，已轉灰階）
// 查證：
// 第 63 屆稅務師考試榜首自首，承認以微型相機拍題、交給生成式 AI 解答，計算機電路經改裝 — 헤럴드경제、서울경제、코리아타임스、주간경향
// 第一次考試 397.5 / 400（每題 2.5 分、共 160 題 → 只錯 1 題）— 헤럴드경제、aboda
// 11/15 報導自首；產業人力公團提告並啟動合格取消程序 — MTN、뉴스토마토
// 學測（11/19）只准自帶黑色鉛筆，其他文具現場發放；首爾大創鉛筆、削鉛筆機缺貨 — 파이낸셜뉴스、경기일보、아시아경제、TV서울
// 「相機藏在修正帶」僅見使用者提供的 MBC 畫面，圖上文字不寫，修正帶只作插畫道具
const img=f=>'data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/'+f).toString('base64');

// NVDA 收盤 10/12–11/11（背景大線圖用）
const month=[226.32,228.52,221.30,217.23,214.13,217.09,216.47,221.97,212.21,210.96,216.00,217.94,215.38,213.66,204.64,202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51];
const spark=[202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51]; // 11/2–11/11 收盤＋盤後

const DOWN=30; // 前景（標題、時間軸、數據模組）往下移的距離
const photo='data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/korea-exam-cheat-photo.jpg').toString('base64');
POST({
  caption:'考試考到榜首，竟然是靠 AI 作弊？',
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
    // 使用者提供的新聞照片（臉部已打馬賽克），轉灰階、邊緣淡入
    g+=`<defs><linearGradient id="pL" x1="0" x2="1"><stop offset="0" stop-color="${T.bg}"/><stop offset="0.22" stop-color="${T.bg}" stop-opacity="0"/><stop offset="0.8" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient>
      <linearGradient id="pB" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${T.bg}" stop-opacity="0.6"/><stop offset="0.12" stop-color="${T.bg}" stop-opacity="0"/><stop offset="0.75" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient></defs>`;
    g+=`<image href="${photo}" x="560" y="0" width="660" height="880" preserveAspectRatio="xMidYMin slice" opacity="0.9"/>`;
    g+=`<rect x="560" y="0" width="660" height="900" fill="url(#pL)"/><rect x="560" y="0" width="660" height="900" fill="url(#pB)"/>`;
    g+=`<g transform="translate(0,${DOWN})">`; // 前景內容整體下移
    // 標籤與標題
    const L=80;
    g+=`<text x="${L-4}" y="168" class="ti2">考試考到榜首</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2">竟是靠 <tspan fill="${T.fg}"><tspan style="font-family:Inter;font-weight:800">AI</tspan> 作弊</tspan>？</text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    // 時間軸
    const ev=[
      ['成績','160 題只錯 1 題','',0],
      ['手法','微型相機拍題給 AI 解','',0],
      ['計算機','改裝電路收發訊號','',0],
      ['11/15','榜首自首認作弊','',1],
      ['最新狀態','警方調查中','',2],
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
      g+=(k===2||!/\d/.test(d))?`<text x="${NX+44}" y="${y+12}" style="font-weight:700;font-size:32px;fill:${k===2?T.dim:T.text}">${d}</text>`
        :`<text x="${NX+44}" y="${y+(big?20:16)}" style="font-family:Inter;font-weight:800;font-size:${big?58:46}px;fill:${big?T.fg:T.text}">${d}</text>`;
      const tx=NX+(big?250:206);
      g+=`<text x="${tx}" y="${y+12}" class="ev" style="font-size:${big?40:34}px;${big?`fill:${T.text};font-weight:700`:''}">${a}</text>`;
      if(false) g+=`<rect x="${NX+500}" y="${y-18}" width="110" height="36" rx="4" fill="none" stroke="${T.fg}" stroke-width="2"/><text x="${NX+555}" y="${y+9}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:${T.fg};letter-spacing:2px">官方公告</text>`;
    });
    // 右側數據模組
    const RX=1150, RW=400;
    const box=(y,h)=>`<rect x="${RX}" y="${y}" width="${RW}" height="${h}" fill="#0c0d10" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.18"/>`;
    // 1 分數
    let y=150;
    g+=box(y,200)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">稅務師考試榜首</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-size:44px;font-weight:900;fill:${T.fg}"><tspan style="font-family:Inter;font-size:66px;font-weight:800">397.5</tspan> 分</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb" style="fill:${T.text}">滿分 <tspan style="font-family:Inter">400</tspan>（第一次考試）</text>`;
    // 2 學測
    y=375;
    g+=box(y,205);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">韓國學測前夕</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-size:54px;font-weight:900;fill:${T.text}">鉛筆賣到缺貨</text>`;
    g+=`<text x="${RX+28}" y="${y+176}" class="lb">首爾大創削鉛筆機也缺</text>`;
    // 3 規定
    y=605;
    g+=box(y,200);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">學測新規定</text>`;
    g+=`<text x="${RX+26}" y="${y+124}" style="font-size:48px;font-weight:900;fill:${T.text}">只准帶黑色鉛筆</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb">修正帶等文具改現場發</text>`;
    g+=`</g>`;
    g+=`<style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.ev{fill:${T.dim};font-size:31px;font-weight:500}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
