// FT 11/15（Reuters、US News、Yahoo、TheNextWeb 轉載）：黃仁勳正與親信討論回任 Nvidia 執行長；盟友組矽谷高層「作戰室」爭取白宮支持，另一盟友稱獲黃本人支持；FT 稍早報導董事會曾接觸 Arm 執行長 Rene Haas 談接班；回任需通過董事會調查（Wachtell Lipton），他也預計赴國會作證；Nvidia／黃本人未回應
POST({
  caption:'黃仁勳辭職才 4 天，FT 報導他在考慮回鍋。',
  theme:'ink',width:1600,height:900,
  title:'FT：黃仁勳辭職 4 天，考慮回鍋',titleSize:56,titleY:100,
  footer:['',''],
  draw:T=>{
    let g='';
    const rows=[['回鍋派','盟友組矽谷高層「作戰室」','爭取白宮支持，據稱黃本人同意',true],['董事會','曾接觸 Arm 執行長 Rene Haas','討論接班（FT 稍早報導）',false],['關卡','董事會內部調查＋國會作證','調查由 Wachtell Lipton 負責',false]];
    rows.forEach(([a,b,c,hl],i)=>{
      const y=170+i*185;
      g+=`<rect x="110" y="${y}" width="840" height="160" rx="22" fill="${hl?T.fg:T.text}" fill-opacity="${hl?0.14:0.06}" stroke="${hl?T.fg:T.grid}" stroke-opacity="${hl?0.9:0.25}" stroke-width="3"/>`;
      g+=`<text x="150" y="${y+50}" class="sm">${a}</text>`;
      g+=`<text x="150" y="${y+100}" style="font-size:40px;font-weight:700;fill:${hl?T.fg:T.text}">${b}</text>`;
      g+=`<text x="150" y="${y+142}" class="sm">${c}</text>`;
    });
    g+=`<text x="110" y="760" class="sm">Nvidia 與黃仁勳本人都還沒回應</text>`;
    const stats=[['宣布辭職','11/12','距今 4 天'],['臨時執行長','Kress','原財務長'],['Nvidia 財報','11/18 05:00','台灣時間（週三）']];
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
