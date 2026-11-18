// 川普、習近平、普丁首次三方會談（與黃仁勳圖同系列版型，左上不放英文，依使用者 11/18 文字）
// 查證：
// 11/19（週四）於深圳 APEC 場邊舉行首次三方會談，白宮、克宮確認 — Al Jazeera、Washington Post、CBS、NPR
// 中方說法：就「維護世界和平、推動大國關係戰略穩定」深入交流 — Al Jazeera
// 川普想談削減核武；白宮官員說不談烏克蘭，川普之後說會談 — Al Jazeera、CBS
// 分析師：恐怕只是拍照行程、難有重大突破（Al Jazeera 引述 Bratersky、AP）；「幾乎 100%」的說法查無來源，圖上不採用
// 克宮發言人 Peskov：會中協議不能強加於他國 — Al Jazeera
// 人物照：川普 Official Presidential Portrait (2025)，Daniel Torok／白宮，公有領域；
//   習近平 Prime Minister Keir Starmer visits China (55066713683)，Simon Dawson / No 10 Downing Street，CC BY 4.0；
//   普丁 Vladimir Putin (2026 02 23)，Kremlin.ru，CC BY 4.0；皆已去背、轉灰階
const img=f=>'data:image/jpeg;base64,'+require('fs').readFileSync(__dirname+'/../assets/'+f).toString('base64');
const pic=n=>'data:image/png;base64,'+require('fs').readFileSync(__dirname+'/../assets/'+n+'-cutout.png').toString('base64');
const trump=pic('trump'), xi=pic('xi'), putin=pic('putin');
// NVDA 收盤 10/12–11/11（背景大線圖用）
const month=[226.32,228.52,221.30,217.23,214.13,217.09,216.47,221.97,212.21,210.96,216.00,217.94,215.38,213.66,204.64,202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51];
const spark=[202.06,206.69,200.13,181.60,186.64,178.67,168.89,173.73,159.51]; // 11/2–11/11 收盤＋盤後

const DOWN=30; // 前景（標題、時間軸、數據模組）往下移的距離
POST({
  caption:'三個最難搞的男人竟然要坐同一桌？',
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
    g+=`<ellipse cx="900" cy="360" rx="470" ry="420" fill="url(#halo2)"/>`;
    g+=`<image href="${trump}" x="610" y="200" width="290" height="362" opacity="0.82"/>`;
    g+=`<image href="${putin}" x="900" y="190" width="285" height="392" opacity="0.82"/>`;
    g+=`<image href="${xi}" x="745" y="150" width="320" height="426" opacity="0.95"/>`;
    g+=`<defs><linearGradient id="trioB" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${T.bg}" stop-opacity="0"/><stop offset="1" stop-color="${T.bg}"/></linearGradient></defs><rect x="560" y="440" width="700" height="190" fill="url(#trioB)"/>`;
    g+=`<g transform="translate(0,${DOWN})">`; // 前景內容整體下移
    // 標籤與標題
    const L=80;
    g+=`<text x="${L-4}" y="168" class="ti2">三個最難搞的男人</text>`;
    g+=`<text x="${L-4}" y="252" class="ti2">竟要<tspan fill="${T.fg}">同坐一桌</tspan>？</text>`;
    g+=`<line x1="${L}" x2="${L+120}" y1="292" y2="292" stroke="${T.fg}" stroke-width="3"/>`;
    // 時間軸
    const ev=[
      ['11/19','週四首次三方會談','',1],
      ['中方','主題是「世界和平」','',0],
      ['川普','想談核武','',0],
      ['烏克蘭','美方說不談，川普說要談','',0],
      ['分析師','恐怕只是拍照行程','',2],
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
    // 1 時間地點
    let y=150;
    g+=box(y,200)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" fill="${T.fg}"/>`;
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">會談地點</text>`;
    g+=`<text x="${RX+24}" y="${y+126}" style="font-size:64px;font-weight:900;fill:${T.fg}">深圳</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb" style="fill:${T.text}">APEC 峰會場邊</text>`;
    // 2 性質
    y=375;
    g+=box(y,205);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">克宮說法</text>`;
    g+=`<text x="${RX+24}" y="${y+124}" style="font-size:50px;font-weight:900;fill:${T.text}">協議不強加他國</text>`;
    g+=`<text x="${RX+28}" y="${y+176}" class="lb">美中俄領袖首次同桌</text>`;
    // 3 市場
    y=605;
    g+=box(y,200);
    g+=`<text x="${RX+28}" y="${y+48}" class="lb">市場關注</text>`;
    g+=`<text x="${RX+26}" y="${y+124}" style="font-size:54px;font-weight:900;fill:${T.text}">關稅、油價</text>`;
    g+=`<text x="${RX+28}" y="${y+172}" class="lb">拍完照會不會動？</text>`;
    g+=`</g>`;
    g+=`<style>.ti2{fill:${T.text};font-size:76px;font-weight:900;letter-spacing:1px}.ev{fill:${T.dim};font-size:31px;font-weight:500}.lb{fill:${T.dim};font-size:29px;font-weight:500}</style>`;
    return g;
  },
});
