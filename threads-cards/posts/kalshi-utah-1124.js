// Kalshi 11/23 暫停猶他州營運（聯邦法院判猶他勝、第十巡迴法院拒擋執法；州政府對兩名高層提重罪指控；約 17.7 萬猶他用戶）；同日紐約州法官 Crane 駁回檢察長 James 的暫時禁制令申請，1 月再開庭（The Block、Fox13、Cryptopolitan、CryptoTimes）
POST({
  caption:'Kalshi 同一天輸一州、躲過一州。',
  theme:'ink',width:1600,height:900,
  title:'同一天，Kalshi 在猶他關門、在紐約躲過',titleSize:52,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const col=(x,head,c,rows)=>{
      g+=`<text x="${x}" y="290" style="font-size:60px;font-weight:700;fill:${c}">${head}</text>`;
      rows.forEach((r,i)=>g+=`<text x="${x}" y="${380+i*64}" class="sm" style="font-size:34px">${r}</text>`);
    };
    col(110,'猶他：關門',T.fg,['聯邦法院判州政府勝','上訴法院不擋執法','兩名高層被提重罪']);
    col(560,'紐約：先躲過',T.text,['法官駁回暫時禁令','沒說 Kalshi 合法','1 月再開庭']);
    g+=`<line x1="520" x2="520" y1="230" y2="560" stroke="${T.grid}" stroke-opacity="0.4" stroke-width="3"/>`;
    g+=`<text x="110" y="700" style="font-size:40px;font-weight:700;fill:${T.text}">猶他用戶 <tspan fill="${T.fg}">約 17.7 萬人</tspan> 暫時不能交易</text>`;
    const stats=[['猶他','暫停營運','11/23 宣布'],['紐約','禁令被駁回','檢察長想先叫停'],['下一關','1 月聽證','紐約初步禁制令']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:50px;font-weight:700}</style>`;
    return g;
  },
});
