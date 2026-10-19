#!/usr/bin/env python3
"""Search the 703 Opus 5.5 video prompts (data/videos.json).

Usage:
  python3 scripts/search.py launch logo                 # keyword search (all words must match, any case)
  python3 scripts/search.py orbit --category 3d         # motion | 3d | explainer | interactive
  python3 scripts/search.py --tech threejs --complete   # tech tag; skip partial prompts
  python3 scripts/search.py --structured                # only prompts with <direction>/<structure>/<build> blocks
  python3 scripts/search.py --show twoclipping-496100   # print one prompt in full, with its links
  python3 scripts/search.py --stats                     # counts by category and tech tag

Results are ranked: structured, then complete, then longer prompts first. --limit N (default 15).
"""
import argparse
import collections
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'data', 'videos.json')


def structured(v):
    return bool(re.search(r'<(direction|structure|build)>', v['prompt']))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('words', nargs='*', help='keywords; every one must appear in the prompt, author or tags')
    ap.add_argument('--category', choices=['motion', '3d', 'explainer', 'interactive'])
    ap.add_argument('--tech', help='a tech tag: canvas, svg, threejs, shader, gsap, css, audio, playable, particles, pixel, webgl, physics, ai-image')
    ap.add_argument('--complete', action='store_true', help='skip prompts the source marks as partial')
    ap.add_argument('--structured', action='store_true', help='only prompts written in <direction>/<structure>/<build> blocks')
    ap.add_argument('--show', metavar='SLUG', help='print one prompt in full')
    ap.add_argument('--stats', action='store_true')
    ap.add_argument('--limit', type=int, default=15)
    a = ap.parse_args()

    videos = json.load(open(DATA, encoding='utf-8'))

    if a.stats:
        print(f'{len(videos)} videos, {sum(v["prompt_partial"] for v in videos)} partial prompts, {sum(structured(v) for v in videos)} structured')
        print('by category:', dict(collections.Counter(v['category'] for v in videos)))
        print('by tech:', dict(collections.Counter(t for v in videos for t in v['tech_tags']).most_common()))
        return

    if a.show:
        v = next((v for v in videos if v['slug'] == a.show), None)
        if not v:
            sys.exit(f'no video "{a.show}"')
        print(f"# {v['slug']}  @{v['author']}  [{v['category']}] {', '.join(v['tech_tags'])}" + ('  (PARTIAL prompt)' if v['prompt_partial'] else ''))
        print(f"watch: {v.get('skillry_url') or '(not on Skillry)'}\npost:  {v['post_url']}\n")
        print(v['prompt'])
        return

    out = []
    for v in videos:
        if a.category and v['category'] != a.category:
            continue
        if a.tech and a.tech not in v['tech_tags']:
            continue
        if a.complete and v['prompt_partial']:
            continue
        if a.structured and not structured(v):
            continue
        hay = (v['prompt'] + ' ' + v['author'] + ' ' + ' '.join(v['tech_tags'])).lower()
        if all(w.lower() in hay for w in a.words):
            out.append(v)
    out.sort(key=lambda v: (not structured(v), v['prompt_partial'], -len(v['prompt'])))
    print(f'{len(out)} match' + ('es' if len(out) != 1 else '') + (f', showing {a.limit}' if len(out) > a.limit else ''))
    for v in out[: a.limit]:
        flags = ('S' if structured(v) else '-') + ('P' if v['prompt_partial'] else '-')
        snip = re.sub(r'\s+', ' ', v['prompt'])[:140]
        print(f"{flags} {v['slug']:<28} [{v['category']}] {','.join(v['tech_tags'])}\n     {snip}")


if __name__ == '__main__':
    main()
