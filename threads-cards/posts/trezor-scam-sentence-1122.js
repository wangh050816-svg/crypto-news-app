// 加拿大男子 Trenton Johnston 假冒客服騙走 185 BTC（同系列版型，左上不放英文；無授權照片，中間不放圖（使用者覺得圖太多））
// 查證：
// 2026/3 與共犯假冒 Google 技術支援、Trezor 人員，騙走加州受害者約 185 BTC（當時約 1,300 萬美元）— Yahoo News Canada、Coin Edition、Crypto Times、KuCoin
// 用來買藍寶堅尼 Aventador SVJ、兩台 BMW、珠寶、租私人飛機；在 Discord 炫耀 — Yahoo、ICObench、KuCoin
// 2026/3 在北邁阿密被捕（坐在勞斯萊斯裡）；交出約 380 萬美元 BTC 與 ETH — Yahoo、Coin Edition
// 認罪洗錢共謀，邁阿密聯邦法官判 25 個月（10/26 或 10/29，各報導不一）；同意遣返加拿大 — Crypto Times、Yahoo、KuCoin
const img=f=>'data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/'+f).toString('base64');

// NVDA 收盤 10/12–11/11（背景大線圖用）
const month=[226.32,228.52,221.30,217.23,214.13,217.09,216.47,221.97,212.21,210.96,216.00,217.94,215.38,213.66,204.64,202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51];
const spark=[202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51]; // 11/2–11/11 收盤＋盤後

const DOWN=30; // 前景（標題、時間軸、數據模組）往下移的距離
POST({
  caption:'騙走 1,300 萬美元的比特幣，結果還在網路上炫耀？',
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
    // 中間不放圖，只留背景
    g+=`<g transform="translate(0,${DOWN})">`; // 前景內容整體下移
    // 標籤與標題
    const L=80;
    g+=`<text x="${L-4}" y="168" class="ti2">騙走 <tspan style="font-family:Inter;font-weight:800">1,300</tspan> 萬美元</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2">只關 <tspan fill="${T.fg}"><tspan style="font-family:Inter;font-weight:800">25</tspan> 個月</tspan>？</text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    // 時間軸
    const ev=[
      ['手法','假冒 Google、Trezor 客服','',0],
      ['得手','約 185 顆 BTC','',0],
      ['花在','藍寶堅尼、BMW、珠寶','',0],
      ['判決','洗錢共謀，25 個月','',1],
      ['最新狀態','同意遣返加拿大','',2],
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
      g+=(k===2||!/\d/.test(d))?`<text x="${NX+44}" y="${y+12}" style="font-weight:700;font-size:${k===1?38:32}px;fill:${k===2?T.dim:k===1?T.fg:T.text}">${d}</text>`
        :`<text x="${NX+44}" y="${y+(big?20:16)}" style="font-family:Inter;font-weight:800;font-size:${big?58:46}px;fill:${big?T.fg:T.text}">${d}</text>`;
      const tx=NX+(big?250:206);
      g+=`<text x="${tx}" y="${y+12}" class="ev" style="font-size:${big?40:34}px;${big?`fill:${T.text};font-weight:700`:''}">${a}</text>`;
      if(false) g+=`<rect x="${NX+500}" y="${y-18}" width="110" height="36" rx="4" fill="none" stroke="${T.fg}" stroke-width="2"/><text x="${NX+555}" y="${y+9}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:${T.fg};letter-spacing:2px">官方公告</text>`;
    });
    // 右側數據模組
    const RX=1150, RW=400;
    const box=(y,h)=>`<rect x="${RX}" y="${y}" width="${RW}" height="${h}" fill="#0c0d10" fill-opacity="0.72"/><line x1="${RX}" x2="${RX+RW}" y1="${y}" y2="${y}" stroke="${T.text}" stroke-opacity="0.18"/>`;
    // 1 人物
    let y=150;
    g+=box(y,200)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">加拿大男子 Johnston</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-size:50px;font-weight:900;fill:${T.fg}"><tspan style="font-family:Inter;font-size:66px;font-weight:800">20</tspan> 歲</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb" style="fill:${T.text}">在 Discord 炫耀犯案</text>`;
    // 2 被害
    y=375;
    g+=box(y,205);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">加州受害者被騙</text>`;
    g+=`<text x="${RX+24}" y="${y+126}" style="font-size:48px;font-weight:900;fill:${T.text}">約 <tspan style="font-family:Inter;font-size:66px;font-weight:800">185</tspan> BTC</text>`;
    g+=`<text x="${RX+28}" y="${y+176}" class="lb">當時約 <tspan style="font-family:Inter">1,300</tspan> 萬美元</text>`;
    // 3 刑期
    y=605;
    g+=box(y,200);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">邁阿密聯邦法院判決</text>`;
    g+=`<text x="${RX+26}" y="${y+126}" style="font-size:48px;font-weight:900;fill:${T.text}"><tspan style="font-family:Inter;font-size:66px;font-weight:800">25</tspan> 個月</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb">認罪洗錢共謀</text>`;
    g+=`</g>`;
    g+=`<style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.ev{fill:${T.dim};font-size:31px;font-weight:500}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
