// Functional test of the page: (1) public snapshot mode, (2) logged-in mode with an in-memory mock db.
const {chromium}=require('playwright');
const page_url='file://'+__dirname+'/chandao/index.html';
const MOCK = `(() => {
  const store = {}; const subs = [];
  const snapDocs = col => Object.entries(store[col]||{}).map(([id,d])=>({id,exists:true,data:()=>d,metadata:{fromCache:false}}));
  const fire = col => subs.filter(s=>s.col===col).forEach(s=>s.fn({docs:snapDocs(col),metadata:{fromCache:false},empty:!snapDocs(col).length}));
  const coll = col => { const q = {orderBy:()=>q, limit:()=>q, where:()=>q,
      onSnapshot:(fn)=>{ subs.push({col,fn}); setTimeout(()=>fn({docs:snapDocs(col),metadata:{fromCache:false},empty:!snapDocs(col).length}),50); return ()=>{}; } }; return q; };
  const doc = path => { const [col,id]=path.split('/'); return {
      update: async d => { store[col][id] = Object.assign({}, store[col][id], d); window.__writes.push([path,'update',d]); fire(col); },
      set: async d => { (store[col]=store[col]||{})[id]=d; window.__writes.push([path,'set',d]); fire(col); },
      delete: async () => { delete store[col][id]; window.__writes.push([path,'delete']); fire(col); } }; };
  window.__writes = [];
  window.__seed = S => { store.posts={}; (S.posts||[]).forEach(p=>store.posts[p.id]=p); store.events={}; (S.events||[]).forEach(p=>store.events[p.id]=p);
     store.briefs={}; if(S.brief) store.briefs[S.brief.id]=S.brief; store.stories={}; (S.stories||[]).forEach(p=>store.stories[p.id]=p); store.favorites={}; store.runs={}; };
  window.claude = { use: async name => name==='db' ? { collection: coll, doc } : null };
  document.addEventListener('DOMContentLoaded', () => { try{ window.__seed(JSON.parse(document.getElementById('snap').textContent)); }catch(e){} });
})();`;
(async()=>{
  const b=await chromium.launch();
  // 1) public mode
  for (const w of [400,1280]){
    const p=await b.newPage({viewport:{width:w,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.goto(page_url); await p.waitForTimeout(800);
    const t = await p.$$eval('.tile', a=>a.map(x=>x.innerText.replace(/\n/g,' ')));
    console.log(`[public ${w}] tiles`, t);
    console.log(`[public ${w}] sched`, await p.$$eval('#sched > div', a=>a.map(x=>x.innerText.replace(/\n/g,' | '))));
    console.log(`[public ${w}] radar items`, (await p.$$('#brief .bi')).length, 'picks', (await p.$$('#post article')).length, 'preheat', (await p.$$('#preheat article')).length, 'stories', (await p.$$('#stories .story')).length);
    await p.click('#fTime button[data-v="24"]'); await p.waitForTimeout(100);
    console.log(`[public ${w}] radar 24h items`, (await p.$$('#brief .bi')).length);
    await p.click('#fTime button[data-v="0"]');
    await p.click('#brief .bi button[data-act="read"]'); await p.check('#fUnread'); await p.waitForTimeout(100);
    console.log(`[public ${w}] unread-only after marking one read`, (await p.$$('#brief .bi')).length);
    console.log(`[public ${w}] next`, (await p.$eval('#next', e=>e.innerText)).replace(/\n/g,' | '));
    await p.fill('#aq','波克夏'); await p.waitForTimeout(100);
    console.log(`[public ${w}] archive search 波克夏`, (await p.$$('#archive .arow')).length);
    console.log(`[public ${w}] perf`, (await p.$eval('#perf', e=>e.innerText)).slice(0,120).replace(/\n/g,' | '));
    console.log(`[public ${w}] errors`, errs, 'scrollWidth', await p.evaluate(()=>document.documentElement.scrollWidth));
    if(w===1280) await p.screenshot({path:__dirname+'/v21-top.png'});
    await p.close();
  }
  // 2) logged-in mode with mock db
  const p=await b.newPage({viewport:{width:1280,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(MOCK); await p.goto(page_url); await p.waitForTimeout(800);
  console.log('[db] sumUpd', await p.$eval('#sumUpd', e=>e.textContent));
  await p.click('#brief .bi button[data-act="fav"]'); await p.waitForTimeout(150);
  await p.click('#tabFav'); console.log('[db] favourites', (await p.$$('#favs .fav')).length);
  await p.click('#tabArc');
  // perf form on a published pick
  const sel = '#post article[data-id="2026-11-09-btc-five-week-streak"]';
  await p.$eval(sel+' details:last-of-type', d=>d.open=true);
  console.log('[db] perf inputs', await p.$$eval(sel+' .perfform input', a=>a.map(x=>x.name)));
  for (const [n,v] of [['views','1200'],['likes','45'],['replies','8'],['reposts','3'],['url','https://www.threads.net/@demo/post/abc']]) await p.locator(sel+` input[name="${n}"]`).fill(v);
  await p.$eval(sel+' input[name="publishedAt"]', e=>e.value='2026-11-09T12:00');
  await p.locator(sel+' button[data-act="perf"]').click(); await p.waitForTimeout(200);
  console.log('[db] perf rows', (await p.$$('#perf tbody tr')).length, '|', (await p.$eval('#perf', e=>e.innerText)).slice(0,160).replace(/\n/g,' | '));
  // status on berkshire (待審) -> 已發布 keeps original
  const bk = await p.$('#post article[data-id="2026-11-09-berkshire-buyback"] button[data-s="已發布"]'); await bk.click(); await p.waitForTimeout(150);
  const w = await p.evaluate(()=>window.__writes.map(x=>x[0]+' '+x[1]+' '+Object.keys(x[2]||{}).join(',')));
  console.log('[db] writes', w);
  console.log('[db] errors', errs);
  await p.screenshot({path:__dirname+'/v21-db.png', fullPage:true});
  await b.close();
})();
