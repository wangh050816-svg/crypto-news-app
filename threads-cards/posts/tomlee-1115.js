// Tom Lee（BitMine 董事長）11/14 列出加密賣壓可能原因（Phemex、crypto.news、TokenPost、CoinCentral、U.Today）：Nvidia 等 AI 股下跌觸發追繳、尤其亞洲散戶，被迫賣其他資產；投資人先賣幣湊錢認購 Anthropic IPO；幣安被駭返還資金被換成現金或穩定幣；他稱是可能原因、仍看好長線；各家列的數量 3～6 個不等
// BTC 約 65,432（CoinGecko 11/15 17:46）
POST({
  caption:'Tom Lee 說，這波幣價下跌，問題多半不在幣圈。',
  theme:'ink',width:1600,height:900,
  title:'Tom Lee：這波賣壓多半來自幣圈外',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const rows=[['1','Nvidia 等 AI 股大跌','亞洲散戶被追繳，只好賣幣'],['2','搶 Anthropic IPO','先賣幣、賣股湊現金'],['3','63 億駭案的錢退回','用戶換成現金或穩定幣']];
    rows.forEach(([n,a,b],i)=>{
      const y=170+i*185;
      g+=`<rect x="110" y="${y}" width="840" height="160" rx="22" fill="${i===0?T.fg:T.text}" fill-opacity="${i===0?0.14:0.06}" stroke="${i===0?T.fg:T.grid}" stroke-opacity="${i===0?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="160" y="${y+105}" style="font-size:72px;font-weight:700;fill:${T.fg}">${n}</text>`;
      g+=`<text x="250" y="${y+72}" style="font-size:44px;font-weight:700;fill:${T.text}">${a}</text>`;
      g+=`<text x="250" y="${y+124}" class="sm">${b}</text>`;
    });
    g+=`<text x="110" y="760" class="sm">他說這些是「可能原因」，不是確定的結論</text>`;
    const stats=[['說話的人','Tom Lee','BitMine 董事長'],['他的結論','長線仍看好','基本面大致正面'],['BTC 現價','約 6.5 萬','美元']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:54px;font-weight:700}</style>`;
    return g;
  },
});
