// Bitcoin Policy Institute 報告（CoinDesk 11/13、KuCoin、Phemex、TechFlow）：英國電網壅塞管理成本每年逾 10 億英鎊（約 13.2 億美元）；蘇格蘭風電擴張快於南送輸電線，業者被付錢關機、同時付錢給燃氣電廠發電；建議在蘇格蘭與英格蘭交界、輸電瓶頸後方設礦場，請 DESNZ、NESO 評估；報告承認這筆成本不等於挖礦能省下的金額；調查顯示礦場停機時間占 5%～31%
POST({
  caption:'英國每年花超過 10 億英鎊，付錢叫風電廠關機。',
  theme:'ink',width:1600,height:900,
  title:'英國想用多餘風電挖比特幣',titleSize:58,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    g+=`<rect x="110" y="170" width="840" height="300" rx="26" fill="${T.fg}" fill-opacity="0.12" stroke="${T.fg}" stroke-opacity="0.8" stroke-width="3"/>`;
    g+=`<text x="150" y="235" class="sm">英國電網壅塞成本，每年</text>`;
    g+=`<text x="150" y="350" style="font-size:96px;font-weight:700;fill:${T.fg}">逾 10 億英鎊</text>`;
    g+=`<text x="150" y="430" style="font-size:38px;font-weight:700;fill:${T.text}">約 13.2 億美元</text>`;
    g+=`<text x="110" y="560" style="font-size:40px;font-weight:700;fill:${T.text}">風電發太多、線路<tspan fill="${T.fg}">送不到南部</tspan></text>`;
    g+=`<text x="110" y="620" class="sm">只好付錢叫風電關機，再付錢給燃氣電廠發電</text>`;
    g+=`<text x="110" y="700" class="sm">提案：把礦場蓋在蘇格蘭與英格蘭交界的瓶頸後方</text>`;
    const stats=[['提案單位','BPI','比特幣政策研究所'],['報告也承認','不等於能省','成本不是可省下的金額'],['礦場停機','5%–31%','視電網狀況而定']];
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
