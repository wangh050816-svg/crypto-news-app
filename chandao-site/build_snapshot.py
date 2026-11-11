# Usage: python3 build_snapshot.py <dbdump_dir> <index.html>
# Embeds every collection exported by ArtifactData list (out_dir) into the page's snapshot block.
# briefs -> only the newest one, as "brief". Other collections are embedded whole.
import json, sys, glob, os, datetime
dump, page = os.path.abspath(sys.argv[1]), sys.argv[2]
def load(col):
    out=[]
    for f in sorted(glob.glob(os.path.join(dump,col,'*.json'))):
        d=json.load(open(f)); d['id']=os.path.basename(f)[:-5]; out.append(d)
    return out
# 先更新 TG 新聞機器人題材（make_feed.py 放在網站原始檔同一個資料夾或 repo 的 chandao-site/）
import subprocess
for mf in [os.path.join(os.path.dirname(os.path.abspath(page)),'make_feed.py'),'/home/user/crypto-news-app/chandao-site/make_feed.py']:
    if os.path.exists(mf):
        os.makedirs(os.path.join(dump,'newsfeed'),exist_ok=True)
        r=subprocess.run(['python3',mf,os.path.join(dump,'newsfeed','latest.json'),os.path.join(dump,'posts')],capture_output=True,text=True,cwd='/home/user/crypto-news-app')
        print('newsfeed:',(r.stdout or r.stderr).strip()[-200:]); break
snap={'updatedAt':datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%m/%d %H:%M 台灣時間')}
for col in sorted(os.listdir(dump)):
    if not os.path.isdir(os.path.join(dump,col)): continue
    rows=load(col)
    if col=='briefs':
        order={'晚報':1,'晨報':0}
        rows.sort(key=lambda b:(b.get('date',''), order.get(b.get('edition','晨報'),0)), reverse=True)
        snap['brief']=rows[0] if rows else None; snap['briefs']=rows[:6]
    else:
        snap[col]=rows
js=json.dumps(snap,ensure_ascii=False).replace('</','<\\/')
html=open(page,encoding='utf-8').read()
a,b='<script id="snap" type="application/json">','</script><!--/snap-->'
i=html.index(a)+len(a); j=html.index(b)
open(page,'w',encoding='utf-8').write(html[:i]+js+html[j:])
print('snapshot:', ', '.join(f"{k} {len(v)}" for k,v in snap.items() if isinstance(v,list)), '| brief', 'yes' if snap.get('brief') else 'no')
