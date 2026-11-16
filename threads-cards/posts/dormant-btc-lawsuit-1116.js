// 紐約沉睡比特幣訴訟（與 PPI / 麻吉大哥圖同系列版型，依使用者 11/16 文字）
// 查證：
// 案件：ABC Company, XYZ Company & Noah Doe v. John Does 1-39,069（紐約州最高法院 153119/2026，2026/5/1 提起）
//   主張依紐約個人財產法 7-B 章，把 39,069 個錢包視為遺失物 — Cointelegraph、CoinDesk、Lexology
// 約 380 萬顆 BTC — CoinDesk、KuCoin、Cryptotimes（3.7–3.8 百萬）
// 約 110 萬顆與中本聰相關（Patoshi 模式 21,923 個地址、約 109.6 萬顆）— Galaxy Research、Bitcoin Magazine
// 認定門檻：至少 5 年未動（起訴狀；CoinDesk 等多數報導，CCN 寫 6 年屬少數）
// 法院允許以鏈上小額轉帳（546 sats）送達通知 — CoinDesk、BTCoin Magazine
// 2011 年至今未動的錢包轉走約 75 BTC（11/12 美東週四晚間）— CoinDesk 11/13、KuCoin、BTCoin Magazine
// 6/5 法院暫停缺席判決（amicus brief 後）— CoinCentral、Blockonomi；目前尚無判決
POST({
  caption:'有人竟然想靠打官司，拿走價值數千億美元的沉睡比特幣？',
  theme:'bulletin',width:1600,height:900,scale:2.4, // 輸出 3840×2160
  footer:['',''],
  draw:T=>{
    let g=`<defs>
      <radialGradient id="halo" cx="0.5" cy="0.45" r="0.5"><stop offset="0" stop-color="#3a3d43" stop-opacity="0.7"/><stop offset="0.6" stop-color="#25272b" stop-opacity="0.4"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
      <radialGradient id="lift" cx="0.25" cy="0.55" r="0.6"><stop offset="0" stop-color="#1c1e22"/><stop offset="1" stop-color="#101114" stop-opacity="0"/></radialGradient>
      <filter id="sh" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.55"/></filter>
      <linearGradient id="og" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${T.fg}"/><stop offset="1" stop-color="#d9861c"/></linearGradient>
      <pattern id="blk" width="34" height="34" patternUnits="userSpaceOnUse"><rect x="3" y="3" width="28" height="28" rx="4" fill="none" stroke="#fff" stroke-width="1.2"/></pattern>
    </defs>`;
    g+=`<rect width="1600" height="900" fill="url(#lift)"/><ellipse cx="960" cy="330" rx="420" ry="380" fill="url(#halo)"/>`;
    // 背景：淡淡的區塊格與比特幣符號（裝飾）
    g+=`<rect x="760" y="40" width="380" height="520" fill="url(#blk)" opacity="0.05"/>`;
    g+=`<text x="960" y="470" text-anchor="middle" style="font-family:Inter;font-size:460px;font-weight:800;fill:#fff;opacity:0.05">₿</text>`;
    // 標籤與標題
    const L=66;
    g+=`<rect x="${L}" y="60" width="7" height="26" rx="3" fill="${T.fg}"/>`;
    g+=`<text x="${L+24}" y="84" style="font-family:Inter;font-size:27px;font-weight:600;letter-spacing:1px;fill:${T.dim}">BITCOIN<tspan dx="14">|</tspan><tspan dx="14">LEGAL WATCH</tspan></text>`;
    g+=`<text x="${L-2}" y="176" style="font-size:68px;font-weight:900;fill:${T.text}">靠打官司拿走沉睡比特幣？</text>`;
    g+=`<text x="${L-2}" y="270" style="font-size:66px;font-weight:900;fill:${T.text}">訴訟鎖定 <tspan style="font-size:80px;fill:${T.fg}"><tspan style="font-family:Inter;font-weight:800">380</tspan> 萬顆 BTC</tspan></text>`;
    // 左側：380 萬顆組成
    const BX=L, BW=980, BY=470, BH=104, sat=1.096/3.8;
    g+=`<text x="${L}" y="420" style="font-size:30px;font-weight:700;fill:${T.dim}">訴訟主張的「遺失」比特幣<tspan dx="16" style="font-weight:500">共 <tspan style="font-family:Inter">39,069</tspan> 個錢包</tspan></text>`;
    g+=`<rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="14" fill="#c9ccd1" fill-opacity="0.85" filter="url(#sh)"/>`;
    g+=`<path d="M${BX+14} ${BY}H${BX+BW*sat}V${BY+BH}H${BX+14}Q${BX} ${BY+BH} ${BX} ${BY+BH-14}V${BY+14}Q${BX} ${BY} ${BX+14} ${BY}Z" fill="url(#og)"/>`;
    g+=`<line x1="${BX+BW*sat}" x2="${BX+BW*sat}" y1="${BY-10}" y2="${BY+BH+10}" stroke="${T.bg}" stroke-width="4"/>`;
    g+=`<text x="${BX}" y="${BY+BH+80}" style="font-size:40px;font-weight:900;fill:${T.fg}">約 <tspan style="font-family:Inter;font-size:60px;font-weight:800">110</tspan> 萬顆</text>`;
    g+=`<text x="${BX}" y="${BY+BH+124}" style="font-size:30px;font-weight:500;fill:${T.text}">被認為與中本聰有關</text>`;
    g+=`<text x="${BX+BW}" y="${BY+BH+80}" text-anchor="end" style="font-size:40px;font-weight:900;fill:#c9ccd1">其餘約 <tspan style="font-family:Inter;font-size:60px;font-weight:800">270</tspan> 萬顆</text>`;
    g+=`<text x="${BX+BW}" y="${BY+BH+124}" text-anchor="end" style="font-size:30px;font-weight:500;fill:${T.dim}">其他沉睡錢包</text>`;
    // 右側卡片
    const RX=1134, RW=438, RH=197;
    const card=y=>`<rect x="${RX}" y="${y}" width="${RW}" height="${RH}" rx="22" fill="#2a2c31" fill-opacity="0.86" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5" filter="url(#sh)"/><rect x="${RX+1}" y="${y+1}" width="${RW-2}" height="60" rx="21" fill="#ffffff" fill-opacity="0.025"/>`;
    let y=134;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">原告的認定門檻</text>`;
    g+=`<text x="${RX+28}" y="${y+130}" style="font-size:52px;font-weight:900;fill:${T.text}"><tspan style="font-family:Inter;font-size:72px;font-weight:800">5</tspan> 年未動</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="lb">法院尚未判決</text>`;
    y=351;
    g+=card(y)+`<text x="${RX+32}" y="${y+52}" class="lb">法院允許的通知方式</text>`;
    g+=`<text x="${RX+28}" y="${y+126}" style="font-size:50px;font-weight:900;fill:${T.text}">鏈上小額轉帳</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="lb">直接把通知打進錢包</text>`;
    y=569;
    g+=card(y)+`<rect x="${RX}" y="${y}" width="${RW}" height="3" rx="1.5" fill="${T.fg}"/><text x="${RX+32}" y="${y+52}" class="lb">沉睡約 <tspan style="font-family:Inter">15</tspan> 年的錢包</text>`;
    g+=`<text x="${RX+28}" y="${y+130}" style="font-size:52px;font-weight:900;fill:${T.fg}">轉走 <tspan style="font-family:Inter;font-size:72px;font-weight:800">75</tspan> BTC</text>`;
    g+=`<text x="${RX+32}" y="${y+174}" class="sb">收到通知數月後</text>`;
    g+=`<style>.lb{fill:#c3c7ce;font-size:29px;font-weight:500}.sb{fill:${T.text};font-size:31px;font-weight:500}</style>`;
    return g;
  },
});
