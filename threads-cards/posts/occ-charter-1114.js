// Coinbase 國家信託公司 11/9 獲 OCC 最終核准（4 月為有條件初步核准）（GNCrypto、coin-turk、BigGo）；OCC 有條件核准約 9 家加密信託執照，含 Coinbase、Ripple、Circle、Fidelity Digital Assets、Paxos（Banking Dive）；Warren 質疑可能超出《國家銀行法》並索取紀錄；銀行公會也反對；Kraken 母公司 5/8 已申請
POST({
  caption:'Coinbase 拿到美國國家信託執照的最終核准。',
  theme:'ink',width:1600,height:900,
  title:'Coinbase 拿到 OCC 信託執照最終核准',titleSize:54,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const names=['Coinbase','Ripple','Circle','Fidelity','Paxos'];
    g+=`<text x="110" y="200" class="sm">已拿到 OCC 有條件核准的部分業者</text>`;
    names.forEach((n,i)=>{
      const x=110+(i%3)*285,y=230+Math.floor(i/3)*130,hl=i===0;
      g+=`<rect x="${x}" y="${y}" width="265" height="105" rx="20" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.16:0.07}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="${x+132}" y="${y+66}" text-anchor="middle" style="font-size:38px;font-weight:700;fill:${hl?T.fg:T.text}">${n}</text>`;
    });
    g+=`<text x="110" y="560" style="font-size:40px;font-weight:700;fill:${T.text}">Coinbase <tspan fill="${T.fg}">11/9 拿到最終核准</tspan></text>`;
    g+=`<text x="110" y="620" class="sm">4 月先拿到有條件的初步核准</text>`;
    g+=`<text x="110" y="700" style="font-size:36px;font-weight:700;fill:${T.text}">Warren 質疑：可能超出《國家銀行法》</text>`;
    const stats=[['有條件核准','約 9 家','加密信託執照'],['反對的人','參議員＋銀行公會','要求調閱審查紀錄'],['還在排隊','Kraken','母公司 5/8 已申請']];
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
