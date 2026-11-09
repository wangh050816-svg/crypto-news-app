# Usage: python3 build_snapshot.py <dbdump_dir> <index.html>
# Embeds every collection exported by ArtifactData list (out_dir) into the page's snapshot block.
# briefs -> only the newest one, as "brief". Other collections are embedded whole.
import json, sys, glob, os, datetime
dump, page = sys.argv[1], sys.argv[2]
def load(col):
    out=[]
    for f in sorted(glob.glob(os.path.join(dump,col,'*.json'))):
        d=json.load(open(f)); d['id']=os.path.basename(f)[:-5]; out.append(d)
    return out
snap={'updatedAt':datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%m/%d %H:%M 台灣時間')}
for col in sorted(os.listdir(dump)):
    if not os.path.isdir(os.path.join(dump,col)): continue
    rows=load(col)
    if col=='briefs':
        rows.sort(key=lambda b:b.get('date',''), reverse=True); snap['brief']=rows[0] if rows else None
    else:
        snap[col]=rows
js=json.dumps(snap,ensure_ascii=False).replace('</','<\\/')
html=open(page,encoding='utf-8').read()
a,b='<script id="snap" type="application/json">','</script><!--/snap-->'
i=html.index(a)+len(a); j=html.index(b)
open(page,'w',encoding='utf-8').write(html[:i]+js+html[j:])
print('snapshot:', ', '.join(f"{k} {len(v)}" for k,v in snap.items() if isinstance(v,list)), '| brief', 'yes' if snap.get('brief') else 'no')
