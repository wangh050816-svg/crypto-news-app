# Usage: python3 build_snapshot.py <dbdump_dir> <index.html>
# Embeds posts/events/latest brief from an ArtifactData out_dir dump into the page between SNAP markers.
import json, sys, glob, os, datetime
dump, page = sys.argv[1], sys.argv[2]
def load(col):
    out=[]
    for f in sorted(glob.glob(os.path.join(dump,col,'*.json'))):
        d=json.load(open(f)); d['id']=os.path.basename(f)[:-5]; out.append(d)
    return out
briefs=sorted(load('briefs'), key=lambda b:b.get('date',''), reverse=True)
snap={'updatedAt':datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%m/%d %H:%M 台北'),
      'posts':load('posts'),'events':load('events'),'brief':briefs[0] if briefs else None}
js=json.dumps(snap,ensure_ascii=False).replace('</','<\\/')
html=open(page,encoding='utf-8').read()
a,b='<script id="snap" type="application/json">','</script><!--/snap-->'
i=html.index(a)+len(a); j=html.index(b)
open(page,'w',encoding='utf-8').write(html[:i]+js+html[j:])
print('snapshot',len(snap['posts']),'posts',len(snap['events']),'events', 'brief' if snap['brief'] else 'no brief')
