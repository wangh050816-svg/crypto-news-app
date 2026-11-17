// 中國外交部 11/16 確認習近平、川普、普丁 11/19（週四）於深圳舉行首次三方會談，APEC 期間；中方稱談「世界和平」（Al Jazeera、HKFP、Japan Times、France 24、CNBC、AA）
// 川普稱想談核武庫存；美方官員稱會談伊朗戰爭；分析師稱「幾乎 100% 是拍照」
POST({
  caption:'習近平、川普、普丁要在深圳同桌。',
  theme:'ink',width:1600,height:900,
  title:'習近平、川普、普丁，首次三方同桌',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const names=[['習近平','中國','主場'],['川普','美國','想談核武'],['普丁','俄羅斯','克里姆林宮先宣布']];
    names.forEach(([a,b,c],i)=>{
      const cx=290+i*300,cy=430,hl=i===1;
      g+=`<circle cx="${cx}" cy="${cy}" r="118" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.9:0.08}" stroke="${T.grid}" stroke-opacity="0.3" stroke-width="3"/>`;
      g+=`<text x="${cx}" y="${cy+18}" text-anchor="middle" style="font-size:48px;font-weight:700;fill:${hl?T.bg:T.text}">${a}</text>`;
      g+=`<text x="${cx}" y="${cy+180}" text-anchor="middle" style="font-size:34px;font-weight:700;fill:${T.text}">${b}</text>`;
      g+=`<text x="${cx}" y="${cy+224}" text-anchor="middle" class="sm">${c}</text>`;
    });
    g+=`<text x="140" y="250" class="sm">11/19 週四・深圳・APEC 期間</text>`;
    const stats=[['會談時間','11/19 週四','中國外交部確認'],['官方主題','世界和平','中方說法'],['分析師看法','多半是拍照','具體成果恐有限']];
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
