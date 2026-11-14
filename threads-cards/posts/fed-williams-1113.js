// 紐約 Fed 總裁 Williams 11/13（Stockanalysis、InvestingLive、MPA）：更多升息很可能，政策仍有工作要做，要讓通膨回到 2%；未說何時、升多少
// 12 月 FOMC 12/8–9；11 月 CPI 12/10 公布（情報台 events）
POST({
  caption:'紐約 Fed 總裁 Williams 說，升息還沒結束。',
  theme:'ink',width:1600,height:900,
  title:'Fed 的 Williams：更多升息很可能',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    g+=`<rect x="110" y="170" width="840" height="400" rx="26" fill="${T.fg}" fill-opacity="0.12" stroke="${T.fg}" stroke-opacity="0.8" stroke-width="3"/>`;
    g+=`<text x="150" y="240" class="sm">紐約 Fed 總裁 John Williams</text>`;
    g+=`<text x="150" y="340" style="font-size:60px;font-weight:700;fill:${T.fg}">更多升息很可能</text>`;
    g+=`<text x="150" y="430" style="font-size:42px;font-weight:700;fill:${T.text}">政策還有工作要做</text>`;
    g+=`<text x="150" y="510" style="font-size:42px;font-weight:700;fill:${T.text}">目標是讓通膨回到 2%</text>`;
    g+=`<text x="110" y="660" style="font-size:40px;font-weight:700;fill:${T.text}">他<tspan fill="${T.fg}">沒說</tspan>什麼時候升、升多少</text>`;
    g+=`<text x="110" y="716" class="sm">這週 CPI 偏熱後的表態</text>`;
    const stats=[['下次 FOMC','12/8–9','台灣時間 12/10 凌晨'],['隔天就有','11 月 CPI','12/10 公布'],['本週數據','CPI 偏熱','PPI 年增 6.5%']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:56px;font-weight:700}</style>`;
    return g;
  },
});
