// 台灣《虛擬資產服務法》：金管會證期局副局長 11/11 表示預計 2027 Q1 與子法同步上路（實際日期由行政院公告）；第 55 條：既有業者上路後 12 個月內申請、21 個月內取得牌照（可延長一次 3 個月）；第 48 條：無照經營最高 7 年、罰金 1 億元以下；交易所實收資本至少 1 億元（子法草案）；穩定幣首度納管（動區 11/11）
POST({
  caption:'台灣的加密專法時程，終於比較清楚了。',
  theme:'ink',width:1600,height:900,
  title:'台灣加密專法：交易所的倒數計時',
  footer:['@zqqnc',''],
  draw:T=>{
    let g='';
    const X0=140,X1=980,Y=430,steps=[[0,'明年 Q1','專法上路（預計）'],[12,'上路後 12 個月','現有業者要提出申請'],[21,'上路後 21 個月','要拿到牌照']];
    const x=m=>X0+m/21*(X1-X0);
    g+=`<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${T.grid}" stroke-opacity="0.5" stroke-width="6" stroke-linecap="round"/>`;
    g+=`<line x1="${X0}" x2="${X1}" y1="${Y}" y2="${Y}" stroke="${T.fg}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 18"/>`;
    steps.forEach(([m,a,b],i)=>{
      const cx=x(m);
      g+=`<circle cx="${cx}" cy="${Y}" r="20" fill="${i===2?T.fg:T.text}" stroke="${T.bg}" stroke-width="5"/>`;
      const anchor=i===0?'start':i===2?'end':'middle', tx=i===0?cx-20:i===2?cx+20:cx;
      g+=`<text x="${tx}" y="${Y-50}" text-anchor="${anchor}" style="font-size:36px;font-weight:700;fill:${i===2?T.fg:T.text}">${a}</text>`;
      g+=`<text x="${tx}" y="${Y+70}" text-anchor="${anchor}" class="sm">${b}</text>`;
    });
    g+=`<text x="${X0-20}" y="640" class="nt">沒拿到牌照，就不能繼續營運</text>`;
    g+=`<text x="${X0-20}" y="690" class="sm">必要時可延長一次 3 個月；實際上路日期由行政院公告</text>`;
    const stats=[['無照經營','最高 7 年','罰金 1 億元以下'],['交易所實收資本','至少 1 億元','另需 3,000 萬保證金'],['首度納管','穩定幣、借貸','穩定幣只能 1:1 掛鉤單一法幣']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1060,yy=150+i*200,w=490,h=175;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+50}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+118}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+156}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:23px}.big{font-size:50px;font-weight:700}</style>`;
    return g;
  },
});
