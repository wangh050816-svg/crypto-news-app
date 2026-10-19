#!/usr/bin/env python3
"""Rebuild references/index.md and references/prompts-<category>.md from data/videos.json.

Usage: python3 scripts/build_refs.py   (after replacing data/videos.json with a newer copy)
"""
import collections
import json
import os
import re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
CAT = {'motion': 'Motion graphics', '3d': '3D scenes', 'explainer': 'Explainers', 'interactive': 'Games & interactive'}


def structured(x):
    return bool(re.search(r'<(direction|structure|build)>', x['prompt']))


def link(x):
    """The Skillry page (original and remake side by side) when there is one, else the original post."""
    return x.get('skillry_url') or x['post_url']


def order(xs):
    return sorted(xs, key=lambda x: (not structured(x), x['prompt_partial'], -len(x['prompt'])))


def main():
    v = json.load(open(os.path.join(ROOT, 'data', 'videos.json'), encoding='utf-8'))
    by = collections.defaultdict(list)
    for x in v:
        by[x['category']].append(x)
    idx = [f'# Index: {len(v)} Opus 5.5 videos and their prompts', '',
           'Source: [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) (MIT), mirrored on [Skillry](https://skillry.dev/ai-videos/opus-5-5). Watch any entry at its Skillry link (original and a live remake side by side).', '',
           'Columns: **S** = structured prompt (has `<direction>`/`<structure>`/`<build>` blocks), **P** = the prompt is partial (cut off in the source). Full text: `references/prompts-<category>.md` or `python3 scripts/search.py --show <slug>`.', '']
    for c, name in CAT.items():
        xs = order(by[c])
        idx += [f'## {name} ({len(xs)})', '', '| slug | author | tech | S | P | prompt (start) |', '|---|---|---|---|---|---|']
        for x in xs:
            snip = re.sub(r'\s+', ' ', x['prompt']).replace('|', '\\|')[:110]
            idx.append(f"| [{x['slug']}]({link(x)}) | {x['author']} | {', '.join(x['tech_tags'])} | {'S' if structured(x) else ''} | {'P' if x['prompt_partial'] else ''} | {snip} |")
        idx.append('')
        full = [f'# {name}: full prompts ({len(xs)})', '', 'Structured and complete prompts first. Each entry: author, tech, links, then the prompt exactly as posted.', '']
        for x in xs:
            full += [f"## {x['slug']}", '', f"@{x['author']} · {', '.join(x['tech_tags'])} · [watch]({link(x)}) · [post]({x['post_url']})" + (' · **partial prompt**' if x['prompt_partial'] else ''), '', '````text', x['prompt'].rstrip(), '````', '']
        open(os.path.join(ROOT, 'references', f'prompts-{c}.md'), 'w', encoding='utf-8').write('\n'.join(full))
    open(os.path.join(ROOT, 'references', 'index.md'), 'w', encoding='utf-8').write('\n'.join(idx))
    print(f'rebuilt references from {len(v)} entries')


if __name__ == '__main__':
    main()
