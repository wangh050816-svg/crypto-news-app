// 每張 slide：type = cover | point | end
// point 的 viz 可放任意 HTML/SVG 小圖卡
const stat=(v,l,c='var(--text)')=>`<div style="flex:1;background:var(--panel);border:2px solid var(--line);border-radius:28px;padding:34px 36px"><div style="font-family:Inter;font-weight:900;font-size:96px;line-height:1;color:${c};letter-spacing:-2px">${v}</div><div style="font-size:30px;color:var(--muted);margin-top:16px;font-weight:700">${l}</div></div>`;
const case_=(y,n,v,c)=>`<div style="flex:1;background:var(--panel);border:2px solid ${c};border-radius:24px;padding:28px 30px;text-align:center"><div style="font-size:26px;color:var(--muted);font-weight:700;font-family:Inter">${y}</div><div style="font-size:44px;font-weight:900;margin-top:6px">${n}</div><div style="font-family:Inter;font-size:56px;font-weight:900;color:${c};margin-top:6px">${v}</div></div>`;

CAROUSEL({
  tag:'CRYPTO NEWS｜幣圈快訊',
  source:'資料來源：FBI、Binance 公開聲明',
  slides:[
    {type:'cover',kicker:'重大資安事件',big:'$6.3B<small>約 63 億美元加密資產遭竊</small>',
     title:'幣安遭竊<br>震撼幣圈',
     sub:'FBI 揭露：竟與 Bybit 駭客<br>來自<span class="hl">同一組織</span>'},

    {type:'point',num:'01',title:'20 分鐘內<br>63 億美元遭轉走',
     viz:`<div style="display:flex;gap:28px">${stat('$6.3B','遭非法轉出','var(--accent)')}${stat('≈20<span style="font-size:48px"> min</span>','主要資金轉移時間','var(--gold)')}</div>`,
     body:'全球最大交易所幣安於 <b>10 月 29 日</b>發生重大資安事件，成為加密史上最大的盜竊案之一。幣安初步調查指出，可能與<b>內部工程師電腦遭入侵</b>有關，完整手法仍待釐清。'},

    {type:'point',num:'02',title:'FBI 指認北韓<br>與 Bybit 駭客有關',
     viz:`<div style="text-align:center"><div style="display:inline-block;background:var(--accent);color:#fff;border-radius:20px;padding:22px 40px"><div style="font-family:Inter;font-weight:900;font-size:50px">TraderTraitor</div><div style="font-size:26px;font-weight:700;opacity:.9">北韓駭客組織</div></div>
       <svg width="912" height="70" viewBox="0 0 912 70" style="display:block"><path d="M456,4 V30 H230 V66 M456,30 H682 V66" fill="none" stroke="#ff4d4f" stroke-width="4" stroke-dasharray="10 8"/></svg>
       <div style="display:flex;gap:28px">${case_('2025','Bybit','≈ $1.5B','var(--gold)')}${case_('2026.10','Binance','≈ $6.3B','var(--accent)')}</div></div>`,
     body:'FBI 於 <b>10 月 31 日</b>正式將攻擊歸因於北韓組織 TraderTraitor，該組織也曾被指涉及 2025 年 Bybit 盜竊案。但目前<b>無法確認</b>實際執行攻擊的是否為同一批成員。'},

    {type:'point',num:'03',title:'追回資產之外<br>交易所安全再受考驗',
     viz:`<div style="background:var(--panel);border:2px solid var(--line);border-radius:28px;padding:34px 36px">
       <div style="display:flex;justify-content:space-between;font-size:28px;font-weight:700;color:var(--muted)"><span>遭竊總額 ≈ 63 億美元</span><span style="font-family:Inter">100%</span></div>
       <div style="display:flex;height:64px;border-radius:14px;overflow:hidden;margin-top:18px"><div style="width:47.6%;background:var(--gold)"></div><div style="flex:1;background:repeating-linear-gradient(135deg,#ff4d4f 0 14px,#c73a3c 14px 28px)"></div></div>
       <div style="display:flex;justify-content:space-between;margin-top:20px;font-size:30px;font-weight:900"><span style="color:var(--gold)">已凍結 ≈ 30 億</span><span style="color:var(--accent)">未凍結 ≈ 33 億</span></div></div>`,
     body:'FBI 表示部分資產正被換成 <b>ETH</b>，並可能透過 DeFi 服務進一步轉移。幣安已凍結約 30 億美元，並<b>承諾由公司承擔損失</b>。即使是大型交易所，資安風控仍是市場焦點。'},

    {type:'end',title:'一分鐘看懂<br>這起事件',
     points:['<b>63 億美元</b>約 20 分鐘內遭轉出，史上最大之一',
             'FBI 指向北韓 <b>TraderTraitor</b>，與 Bybit 案同一組織',
             '已凍結約 30 億，幣安<b>承諾自行承擔損失</b>'],
     ask:'你的幣放交易所，還是自己保管？',askSub:'留言告訴我們你的做法 👇',
     note:'本文僅為新聞整理，不構成任何投資建議。調查仍在進行中，細節以官方後續公告為準。'},
  ],
});
