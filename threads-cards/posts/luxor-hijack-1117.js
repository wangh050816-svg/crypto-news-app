// Luxor 礦機管理軟體 Commander 遭入侵（CoinDesk、Decrypt、Bitcoin.com 11/15–16）：十幾個客戶帳號礦機被短暫導向 OCEAN 礦池；報導稱約 64,000 台、約 13 EH/s；攻擊者約收 0.243 BTC（約 15,700 美元，另有稱約 10,500），截至週一未動；2 小時內修補；Luxor 補償客戶電費；CEO 稱「AI 輔助攻擊」但未說明
POST({
  caption:'駭客竟然劫持了 6 萬多台礦機，卻只賺到 1 萬多美元？',
  theme:'ink',width:1600,height:900,
  title:'劫持 6.4 萬台礦機，只賺 1.5 萬美元？',titleSize:54,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    g+=`<rect x="110" y="170" width="840" height="300" rx="26" fill="${T.fg}" fill-opacity="0.12" stroke="${T.fg}" stroke-opacity="0.8" stroke-width="3"/>`;
    g+=`<text x="150" y="235" class="sm">被劫持的礦機</text>`;
    g+=`<text x="150" y="350" style="font-size:96px;font-weight:700;fill:${T.fg}">約 6.4 萬台</text>`;
    g+=`<text x="150" y="430" style="font-size:38px;font-weight:700;fill:${T.text}">約 13 EH/s，被偷偷導到別的礦池</text>`;
    g+=`<text x="110" y="560" style="font-size:40px;font-weight:700;fill:${T.text}">駭客最後只拿到<tspan fill="${T.fg}">約 0.243 BTC</tspan></text>`;
    g+=`<text x="110" y="620" class="sm">約 1.5 萬美元，而且到現在都還沒動</text>`;
    g+=`<text x="110" y="700" class="sm">礦工白付電費，Luxor 說會補償</text>`;
    const stats=[['出事的軟體','Luxor','礦機管理系統'],['修補時間','2 小時內','官方說法'],['CEO 說','AI 輔助攻擊','但沒說怎麼做到']];
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
