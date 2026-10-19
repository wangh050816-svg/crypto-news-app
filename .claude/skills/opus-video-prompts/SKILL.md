---
name: opus-video-prompts
description: 703 viral Opus 5.5 videos (Skillry / awesome-opus5-5-videos) with the exact prompt each creator used, searchable by category and tech, plus the playbook distilled from the strongest ones. Use when the user wants a code-made video, animation, 3D scene, explainer or browser game "like the viral Opus 5.5 videos", asks to write or improve a prompt or brief for one, wants references or ideas for a launch film, motion design, Three.js scene or interactive explainer, or mentions Skillry or that gallery. 使用者說「像網路上那些 Opus 做的影片」「參考 skillry」「幫我寫影片提示詞」「找類似的影片做法」「3D 場景／產品發表片／知識動畫要做得像那樣」時使用。
license: MIT (data from yihui-dev/awesome-opus5-5-videos; see data/LICENSE)
---

# Opus 5.5 video prompts

A library of 703 videos people made with Claude Opus 5.5, each with the prompt as posted, and what the best of them have in common. Use it to find the closest proven recipe for a request, then write a brief in the same shape and build it with the film skills already installed (cinetic, remotion-*, hyperframes, vibe-knowledge-film).

## What is here

| Path | What |
|---|---|
| `data/videos.json` | all 703 entries: slug, author, category, tech tags, the prompt, whether it is partial, links to the post and to Skillry (original and a live remake side by side) |
| `references/index.md` | one table per category: slug, author, tech, structured/partial flags, the opening of the prompt |
| `references/prompts-motion.md` (369) · `prompts-3d.md` (117) · `prompts-explainer.md` (116) · `prompts-interactive.md` (101) | every prompt in full, structured and complete ones first |
| `scripts/search.py` | keyword / category / tech search, `--show <slug>` for one prompt, `--stats` |

Numbers worth knowing: 285 entries have no Skillry page, so their links go to the original post; 207 prompts are partial (cut off in the source); 29 are written in the structured block format below, and those are the most useful to learn from. Tech tags: canvas 267, svg 183, threejs 131, shader 92, gsap 86, css 57, audio 39, playable 22.

## How to use it

1. **Classify the request**: motion graphics (launch film, UI motion, logo, kinetic type), 3D scene (an object or place built in Three.js), explainer (how something works, labelled), or interactive (a game or toy).
2. **Search, don't browse.** `python3 scripts/search.py <words> --category <c> --complete` and `--structured` for the best-written ones. Read 3–5 close matches in full with `--show`. Grep `references/index.md` when you want to scan.
3. **Borrow the structure, not the content.** These are other creators' films. Take the recipe (format, beat map, transition grammar, build method, gotchas); never copy their brands, characters, copy or assets.
4. **Write the brief in the block format** (template below), filled with the user's subject, then build it with the right engine: Remotion/cinetic for a film with a timeline and sound, HyperFrames for HTML/GSAP, Three.js (`@remotion/three` inside Remotion, or one HTML file) for real 3D.
5. **Show before rendering**: the beat map and 4–6 stills, as the best prompts demand, then render and check frame by frame.
6. Point the user at the original with its Skillry link when you borrow a recipe, so they can watch what it should feel like.

## The playbook: what the strongest prompts share

Drawn from the 29 structured prompts and the most-remade complete ones (`--structured` lists them).

**Format first, in numbers.** Size, fps and length in the first line: "A 15-second product launch film, 1920x1080 at 60fps." Square 1440×1440 for social loops; 60 fps whenever UI or the camera moves.

**One continuous take.** "2D only, one continuous take. Every scene is made out of the previous one: nothing fades, blurs or cuts." Transitions are shape changes: text rises out of a mask line, a button expands into the page, a colour floods from one object and contracts into the next, an iris opens onto a photo, a dot grows into a pill. The last frame of one scene is the first frame of the next.

**One persistent object.** "One shape, never cut: every state is the same element morphing its size, radius, colour." A pencil line promoted three times; a cursor that drives every change; a black pill that becomes Ordered ✓ → Printing % → Delivered ✓.

**A banned list.** Every structured prompt names what not to do: crossfades, blur-ins, particles, glows, 3D flips, holds longer than 1 s, camera moves that reverse, "anything that feels like a template".

**A beat map, not adjectives.** "130 BPM, 32 beats. Beat 6, send: … Beat 12, the drop: …" Something happens on every beat; the hero moment lands on the song's drop; quiet ideas sit in the breakdown. "Use hex codes, seconds, damping ratios and pixel sizes instead of adjectives."

**Exact look.** Hex palette with a job per colour, one typeface with weights and tracking, real photos or footage where the subject is real (Pexels, the user's own), "one accent colour".

**Deterministic build.** "Compute every style from time inside seek(t): no CSS transitions, timers or state carried between frames." Closed-form spring step responses (a value with many targets is a sum of springs). One camera transform keyed by [time, zoom, x, y], zoom interpolated in log space. Shared elements carry content across handoffs.

**Sound placed by measurement.** One sound per event (typing, send, drop impact, swoosh, click, success), each placed by its measured peak; the song starts so its drop meets the hero; loudnorm to −14 LUFS. Commercial-use licences only (Mixkit, Pexels, Openverse CC0).

**Render and QA like film.** Playwright at 60 fps with 4–8 subframes per frame blended (ffmpeg tmix) for motion blur; check 5 frames around every beat; scan for single-frame pops (frame-difference spikes 3× their neighbours) before the final render.

**Ask, then show.** `<inputs>`: ask for the product, the one sentence a user types, photos, a song with a drop, the logo, with defaults if skipped. `<start>`: "Ask me for the inputs, then show me the beat map and 4 stills before you write the full film."

**3D scenes** follow their own recipe: "Build me a [mechanical watch / camera lens / human heart] in interactive 3D, in one HTML file with Three.js. Make it look real: [the materials you see], and inside it the parts you never get to see: [named parts]. [What moves and how]. I can drag to orbit around it and scroll to zoom. Add an Explode button: every part slides apart and is labelled." Procedural geometry and shaders, no downloaded models, is a point of pride.

**Explainers** label every stage and make the verb happen on screen ("suck, squeeze, bang, blow, every stage labelled"; "the fan pulls in a huge mass of air…").

## Gotchas collected from the prompts

- No `will-change` on anything the camera scales: text renders blurry.
- Text that swaps inside a morphing shape needs its own mask and its own enter/exit timing, or old and new labels overlap.
- A flood must overscale past the corners and take about 0.3 s with a soft start, or half the screen changes in one frame; let it finish before the next scene starts.
- Ease a closing iris by area, not radius, or its first frames jump.
- Counters read the frame's time, not the subframe's, or the digits smear under motion blur.
- 4 subframes ghost on fast whips; use 8.
- A pattern that rotates one notch per beat reads as stutter: rotate continuously and pick speeds that land on the same pattern at the loop point.
- For loops, match the last frame to the first exactly, cursor position and velocity included (`t - L*floor(t/L)`).
- Never set opacity or filter on a `preserve-3d` element (it flattens, both faces show); fade its wrapper.
- `backdrop-filter: url()` misreads displacement maps in Chromium: clone the scene instead.
- Footage: re-encode all-intra (`ffmpeg -g 1`), load as a blob URL, await `seeked` per frame; `python http.server` cannot range-seek.
- A helper that sets `globalAlpha` must restore it, or fading cards pop.
- Keep cursor speed under about 65 px/frame and aim it at where the target will be when it lands.

## Brief template

```text
<inputs>
Ask me for: [product / subject], [the one line a user types or the one question it answers], [N photos or clips I own], a royalty-free song around [BPM] with a clear drop (Mixkit, free for commercial use), and my logo for the end card. If I skip anything, use these defaults: [...].
</inputs>

<direction>
A [length]-second [kind of film], [W]x[H] at 60fps. [2D only / real 3D], one continuous take: every scene is made out of the previous one. [The persistent object and how it transforms.]
Look: [canvas #hex], [ink #hex], [accent #hex and what it means]. [Typeface, weights, tracking]. [Real photography / footage for X].
Banned: crossfades, blur-ins, particles, glows, holds longer than 1s, camera moves that reverse, anything that feels like a template.
</direction>

<structure>
[BPM], [N] beats. Something happens on every beat.
Beats 0-6, [name]: [what the picture does, exact copy in quotes].
Beat [n], the drop: [the hero moment].
...
Last beats, outro: [how the persistent object becomes the logo; the end card line].
</structure>

<build>
1. One [HTML file / Remotion project], [W]x[H]. Every style computed from time inside seek(t); no transitions, timers or carried state.
2. One camera transform keyed by [time, zoom, x, y], eased segments, zoom in log space.
3. Closed-form springs for every pop and settle; shared elements across every handoff.
4. Sound: one effect per event, placed by its measured peak; the drop on the hero; loudnorm to -14 LUFS.
5. Render at 60fps with 8 subframes per frame blended; check 5 frames around every beat; scan for single-frame pops.
</build>

<gotchas>
[the relevant lines from the list above]
</gotchas>

<start>
Ask me for the inputs, then show me the beat map and [4-6] stills before you write the full film.
</start>
```

## Notes

- Entries are third-party posts; a prompt marked partial was cut off where it was published, so read the remake on Skillry to see the rest of the idea.
- Prompts are in several languages (English, Chinese, Japanese and others); search in English first, then try the user's language.
- Data snapshot: `yihui-dev/awesome-opus5-5-videos` at commit `92aee2f` (MIT). To refresh: clone it and replace `data/videos.json`, then run `python3 scripts/build_refs.py`.
