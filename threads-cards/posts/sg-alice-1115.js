// 新加坡內政部否認 WSJ 報導，稱未以間諜嫌疑調查 Alice Huang（黃樂）（Bloomberg、Wccftech、Yahoo Singapore）；新加坡 2 月禁止她再入境，理由是她就 Megaspeed 職務提供不實資訊，起訴證據不足；Megaspeed 調查仍在進行（新加坡警方）
// CNN：美國情報目前蒐集的證據不足以證明她替北京從事間諜活動，官員對風險看法分歧（CryptoBriefing 引述）
// Nvidia 財報：美東 11/17 盤後＝台灣 11/18 06:00
POST({
  caption:'黃仁勳辭職的關鍵指控，被新加坡政府打臉了。',
  theme:'ink',width:1600,height:900,
  title:'新加坡打臉 WSJ：沒查過黃樂當間諜',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const box=(y,a,b,hl)=>{
      g+=`<rect x="110" y="${y}" width="840" height="190" rx="22" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.14:0.06}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="150" y="${y+62}" class="sm">${a}</text>`;
      g+=`<text x="150" y="${y+142}" style="font-size:46px;font-weight:700;fill:${hl?T.fg:T.text}">${b}</text>`;
    };
    box(170,'WSJ 報導','新加坡曾以間諜嫌疑調查她',false);
    g+=`<text x="530" y="438" text-anchor="middle" style="font-size:52px;font-weight:700;fill:${T.fg}">VS</text>`;
    box(470,'新加坡內政部','沒有做過間諜調查',true);
    g+=`<text x="110" y="730" class="sm">她被禁止入境，是因為對 Megaspeed 職務說法不實</text>`;
    const stats=[['美國情報（CNN）','證據不足','無法證明她是間諜'],['Megaspeed','調查還在進行','新加坡警方'],['Nvidia 財報','11/18 06:00','台灣時間（週三）']];
    stats.forEach(([a,b,c],i)=>{
      const xx=1040,yy=150+i*205,w=520,h=185;
      g+=`<rect x="${xx}" y="${yy}" width="${w}" height="${h}" rx="22" fill="${T.text}" fill-opacity="0.07" stroke="${T.grid}" stroke-opacity="0.25"/>`;
      g+=`<text x="${xx+32}" y="${yy+48}" class="sm">${a}</text>`;
      g+=`<text x="${xx+32}" y="${yy+122}" class="big" fill="${i===0?T.fg:T.text}">${b}</text>`;
      g+=`<text x="${xx+32}" y="${yy+164}" class="sm">${c}</text>`;
    });
    g+=`<style>.sm{fill:${T.dim};font-size:29px}.big{font-size:52px;font-weight:700}</style>`;
    return g;
  },
});
