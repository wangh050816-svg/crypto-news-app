// 南韓金融委員會 11/12（Cointelegraph、PANews、CryptoTimes 等）：將發出不處分函（no-action letter），允許交易所在「懷疑」遭駭時先暫停出入金；現行規定須確認遭駭才可限制；具體條件尚未公布；配套要求 24 小時監控、提高冷錢包比例、加強保險與準備金；起因之一為 GOPAX 11/6 收到駭客威脅後預防性暫停
POST({
  caption:'南韓要讓交易所「懷疑被駭」就能先停提領。',
  theme:'ink',width:1600,height:900,
  title:'南韓：交易所懷疑被駭，就能先停提領',titleSize:54,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const box=(y,a,b,hl)=>{
      g+=`<rect x="110" y="${y}" width="840" height="190" rx="22" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.14:0.06}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="150" y="${y+62}" class="sm">${a}</text>`;
      g+=`<text x="150" y="${y+142}" style="font-size:50px;font-weight:700;fill:${hl?T.fg:T.text}">${b}</text>`;
    };
    box(170,'原本的規定','確認被駭，才能限制提領',false);
    g+=`<text x="530" y="440" text-anchor="middle" style="font-size:56px;font-weight:700;fill:${T.fg}">↓</text>`;
    box(470,'金融委員會這次放寬','懷疑被駭，就能先暫停',true);
    g+=`<text x="110" y="730" class="sm">形式是<tspan fill="${T.text}" font-weight="700">不處分函</tspan>，具體條件還沒公布</text>`;
    const stats=[['起因之一','GOPAX','11/6 收到駭客威脅後先停'],['配套要求','24 小時監控','做不到就只在上班時間出入金'],['另外還要','冷錢包更多','並加強保險與準備金']];
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
