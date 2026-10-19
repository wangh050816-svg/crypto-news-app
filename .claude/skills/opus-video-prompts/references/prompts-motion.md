# Motion graphics: full prompts (369)

Structured and complete prompts first. Each entry: author, tech, links, then the prompt exactly as posted.

## heyiamnick-119558

@heyiamnick · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/heyiamnick-119558) · [post](https://x.com/heyiamnick/status/2109174851412119558)

````text
<direction>
Build a 30-second looping motion design showreel that introduces CLAUDE, a motion designer.
Concept, in one line: one pencil line gets promoted three times (graphite on paper, wire on a blueprint, light on black) and never leaves the screen.

Every shot is made out of the previous one: shapes, type and colour transform into the next scene. No cuts, no fades.

Typeface: Geist only. Weight 900 for big words, 600 to 800 for small labels (24 to 28 px, tracked 0.14 to 0.3 em).
Palette: paper cream #EDE6D5, blueprint blue #1B3ED2, hologram cyan #45F0DD, plus black #07080A, graphite #16161A and white. Each stage's accent is the next stage's colour: blue pencil on paper, cyan on the blueprint, white on the hologram.
Camera: locked and front-on for the whole film, like a drafting table. Objects turn; the camera never moves.
Empty border: nothing at rest within 150 px of the sides or 90 px of the top and bottom. Things travelling through may cross it.

Three inks. The same geometry is drawn in whichever ink is on screen:
- PAPER: a cream paper background (use my paper image if I give one, otherwise flat cream with fine drawn grain) with a 60 px blue grid at about 13% and every fifth line at 26%. Lines are pencil: resampled and pushed off true by slow sine waves whose phase changes 8 times a second, stroked twice (full width at 90%, half width at 40% with more wobble), with paper tooth knocked out of the strokes, then multiplied onto the paper. Fills are diagonal hatching drawn on one line at a time. Big type is hatching cut to the letter shapes, with a doubled outline.
- BLUEPRINT: flat blue with the same grid in white. Clean white lines 3 to 4 px, hidden edges dashed and thinner, fills are fine clean hatching.
- HOLOGRAM: black with the same grid in cyan. Cyan lines with a white core 30% of the line width. Fills are horizontal scan lines on an 8 px pitch whose thickness follows how lit the surface is. No blur halo anywhere: it reads as light through line density only.

Banned: particle bursts, glows, lens flares, camera shake, RGB split, crossfades, generic gradients, bouncy easing, holds longer than half a second, anything that looks like a template.
</direction>

<structure>
120 BPM, 60 beats, 15 bars of 2 seconds. Something happens on every beat. Moves start 0.05 s before their beat so they land on it.
Easing: a critically damped spring, 1 - (1 + w t) e^(-w t) with w between 12 and 40, so nothing ever passes its target; exponential ease-in and ease-out for wipes, presses and exits.
Scene changes: paper to blueprint by a shape that floods the frame with a hard edge; blueprint to hologram and hologram to paper by one horizontal scan line.
The last frame is the first frame, so it loops.
Two corner labels stay on all film: top left "FIG. 07 — GEAR" (bar number and name), bottom right "BEAT 27 / 60". Bar names: DRAFT, TYPE, CURVE, MORPH, TILE, SOLID, GEAR, PANEL, DATA, LIGHT, WAVE, GLOBE, DRUM, FORM, END.
</structure>
<mascot>

The creative director: a small box character. Body 76 x 54 units with rounded corners, two short arm stubs (24 x 16) at mid height, four straight legs (11 x 33), two tall rounded-rectangle eyes (8 x 14). Draw it about 250 px wide. Its right arm is raised 58 degrees holding a pencil.
On paper: graphite outline with sparse blue hatching and graphite eyes. In the hologram: cyan outline with scan-line fill and white eyes. It is never a fourth colour.
It runs with alternate leg pairs lifting, six steps a second, leaning 7 degrees into the run.
</mascot>
<storyboard>

Bar 1, HOOK, 0-2 s, paper.
Frame 0: CLAUDE in Geist 900, fitted to 1500 px wide, centred, pencil-hatched. INTRODUCING small above it, A MOTION DESIGNER small below. A pencil rail 1620 px wide sits 96 px above the letters. The mascot stands on the rail at x = 1560 with CREATIVE DIRECTOR lettered to its left.

0.0: the small lines un-type; the mascot runs off the right edge, accelerating.

0.36 to 0.5: the rail drops, accelerating, to 26 px below the baseline and presses the letters flat into itself.

1.0: the line rises to the middle, shortens to 1320 px and splits into two rails 140 px apart; 41 blue ruler ticks sweep along the top rail.

1.5: the rails open to 300 px; a blue height dimension draws at the right with a live number.

Bar 2, KINETIC TYPE, 2-4 s, paper. Words sit between the rails and are clipped to that slot; the rails move to fit each word.

2.0: INTRODUCING rises through the baseline letter by letter, then lifts out through the top.

2.5: A MOTION whips in from the left (1400 px in 0.2 s).

3.0: the rails clap shut on it and reopen, stretching DESIGNER out of the line; its letters then fly out sideways.

3.5: CLAUDE in blue pencil, letters dropping from above one every 0.05 s. At 4.0 the rails close and crush it into one line 1476 px long.

Bar 3, CURVES, 4-6 s, paper.

4.1: the line gets pen-tool handles (430 px long at 58 degrees, small squares at the ends, circles on the handle tips, the label EASE) and bends into an S.

4.5: the handles swing to the mirror angle; eight blue copies fan out 34 px apart, joined at both ends like a leaf.

5.0: handles retract; the ribbon becomes travelling sine waves (amplitude 92 px, 2.75 cycles, each line a little out of phase).

5.5: it gathers back into one flat line.

Bar 4, SHAPE MORPH, 6-8 s, paper.

6.1: the line curls into a circle of radius 235 (curvature grows, length stays). 6.5: triangle, turning 120 degrees as it changes. 7.0: square. 7.5: hexagon, point up, radius 270. Blue hatching builds inside, then cross-hatching.

Bar 5, TILING, 8-10 s, paper.

8.0: the hexagon shrinks to radius 96 and six more slide out around it. 8.5: twelve more, a honeycomb of

19. 9.0: dense hatching sweeps across until every cell is solid blue. 9.6 to 10.0: the centre cell's shape grows past the frame with a hard edge; inside it is the blueprint, with the honeycomb in white line.

Bar 6, 2D TO 3D, 10-12 s, blueprint.

10.0: three lines draw inside every hexagon, plus three dashed hidden ones: each is a cube seen corner-on. 

10.5: the eighteen outer cubes slide into the centre one, which grows to radius 270. 11.0: it turns a quarter and perspective switches on. 11.5: it faces front.

Bar 7, MECHANISM, 12-14 s, blueprint.

12.0: the cube flattens and its front square grows teeth: a 16-tooth gear, pitch radius 208. From 12.25 the train steps 45 degrees on every eighth note. 12.5: a 10-tooth gear grows out to the upper right, meshing. 13.0: a 12-tooth gear to the upper left. Each has a dashed pitch circle, a hub and a label (16T, 10T, 12T). 13.5: the small gears retract; the gear becomes a square again and the cube gets its depth back.
Bar 8, UNFOLD, 14-16 s, blueprint.

14.0: the cube unfolds on its hinges into a cross of six squares. 14.5: the squares slide and stretch into six panels: a header strip, a tall sidebar, a wide chart, two tiles, a timeline strip.

15.0: they fill in. Header: "CLAUDE — MOTION REEL", a BARS / RING switch, a LIGHT toggle. Chart: 30 bars, one per second of this film, heights 42 30 36 44 50 46 52 62 50 56 62 72 60 66 58 76 56 62 68 74 70 78 86 94 100 93 97 90 80 50. Timeline: the 15 bar names, a keyframe diamond on each.
15.5: counters roll up: 120 BPM, 60 BEATS, 1800 FRAMES, 0 CUTS.
Bar 9, DATA, 16-18 s, blueprint.

16.0: a graph line draws across the bar tops; a cyan playhead lands on the timeline at the real time. The current second's bar is solid cyan, earlier ones hatched, later ones outlined. A cursor arrives.
16.5: it clicks RING: the chart's baseline bends round into a circle of radius 110 with the ba
````

## thegrootdev-966114

@TheGrootDev · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/thegrootdev-966114) · [post](https://x.com/TheGrootDev/status/2103516567824966114)

````text
<inputs>
Ask me for: my featured Pokémon or starter trio, 8–12 Pokémon-themed UI states, and a royalty-free song around 120 BPM with a playful adventure or electronic feel. Confirm that the song’s license permits the intended use.Default palette: warm off-white, black, and Poké Ball red. Pokémon artwork keeps its original colors.
</inputs>

<direction>
A Pokémon-inspired UI motion film with Dribbble-level polish. Imagine a beautifully designed modern Pokédex: playful, precise, and instantly http://recognizable.One shape, never cut: a Poké Ball continuously morphs into every interface component by changing its size, radius, and color. Its central button, dividing line, and outer shell become the controls and structure of each new state. Content swaps with a short blur and carefully separated enter/exit timing.

A visible cursor drives every interaction with clicks, drags, and hover gestures. Use a light warm-gray canvas, clean Geist typography, consistent icon strokes, and crisp Pokémon artwork.

Use tightly damped springs with only a tiny overshoot. The camera smoothly reframes each state so the interface stays large and readable. The ending returns exactly to the opening Poké Ball for a seamless loop.

Banned: excessive bouncing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, generic dashboard layouts, abrupt scene changes, and unrelated floating elements.
</direction>

<structure>
120 BPM, 4/4 time, 7 bars: 28 beats, approximately 14 seconds. Something intentional happens on every http://beat.Bar 1 — Poké Ball activation

1. A closed Poké Ball sits centered; the cursor approaches.
2. The cursor clicks its central button.
3. The button becomes a circular scanning loader.
4. The scan resolves into a check, and the shell stretches into a compact Pokédex.

Bar 2 — Pokémon discovery
5. The Pokédex expands to reveal the featured Pokémon.
6. Its name, number, and type appear in a quick stagger.
7. The cursor clicks the cry/play control.
8. The control morphs into pause while a compact waveform animates.

Bar 3 — Trainer controls
9. The waveform flattens into a volume slider.
10. The cursor drags its Poké Ball-shaped knob to maximum.
11. Dragging beyond maximum elastically stretches the slider.
12. On release, it settles and compresses into a shiny-mode toggle.

Bar 4 — Pokémon details
13. The cursor flips shiny mode; the artwork changes to the correct shiny variant.
14. The toggle knob stretches into a liquid tab indicator.
15. The cursor selects “Stats.”
16. The card opens into a clean Pokémon stat chart.

Bar 5 — Stats to search
17. Stat bars draw themselves in sync with the beat.
18. The cursor hovers over a bar; a readable tooltip appears.
19. The chart retracts into the same container.
20. The container compresses into a Pokédex search field.

Bar 6 — Find and select
21. The search field expands into a command palette.
22. A short Pokémon name is typed; matching results filter.
23. The cursor selects a result, revealing its miniature artwork and type.
24. Enter confirms; the palette folds into an “Added to team” toast.

Bar 7 — Return to the Poké Ball
25. The toast’s confirmation mark becomes the Poké Ball’s central button.
26. The toast contracts; its edges become the circular shell.
27. The red upper half, white lower half, and black dividing line settle into place.
28. The cursor returns along a smooth path, matching the opening position and velocity as the loop wraps.

Use the chosen Pokémon consistently throughout. Keep visible text brief enough to read at this pace.
</structure>

<build>
1. Build one self-contained HTML file with a square 1440×1440 composition. Compute every animated style from time inside seek(t): no CSS transitions, timers, or state carried between frames.
2. Keep one persistent outer element throughout the sequence. Its internal artwork, labels, and controls may change, but the main silhouette must visibly connect every state.
3. Use closed-form spring step responses. For repeated target changes, sum one spring response per change so animation remains a pure function of time.
4. Give the tab indicator’s two edges different springs so the leading edge stretches ahead of the trailing edge. Apply the same technique to the toggle knob.
5. Make drags direct manipulation: while held, values follow cursor position. On release, use a closed-form spring matching the release position and velocity.
6. Analyze the supplied song with numpy to estimate the beat grid, verify the downbeat, and align the sequence. If the tempo differs from 120 BPM, adapt the timing to the actual music.
7. Use licensed UI sounds and align their measured transient peaks with clicks, confirmations, and morph accents.
8. Render with Playwright at four subframes per output frame. Blend each group of four with ffmpeg into a 60fps video for motion blur.
9. Render one preview frame per beat before the full video. Fix anything cramped, unreadable, visually disconnected, or off the beat grid.
10. Package artwork and fonts inside the HTML so rendering does not depend on network requests.
</build><gotchas>
Never put will-change on anything the camera scales; text can become blurry.Give outgoing and incoming content separate timing so labels never overlap during a morph.

Use accurate Pokémon artwork, names, types, shiny colors, and stats. Do not invent variants or stretch character artwork when the container changes shape.

Keep the main container recognizable through every transition. Pokémon artwork is content inside the morphing interface, not a replacement for the persistent shape.

Match the loop boundary exactly: geometry, content, camera, cursor position, and cursor velocity. Export the interval [0, duration) without duplicating the endpoint frame. Make the audio loop cleanly too.
</gotchas>

<start>
Ask me for the inputs, then show me the proposed Pokémon state list on the 28-beat grid before writing any code.
</start>
````

## twoclipping-551116

@twoclipping ·  · [watch](https://x.com/twoclipping/status/2106101258834551116) · [post](https://x.com/twoclipping/status/2106101258834551116)

````text
<inputs>
Ask me for: my product's name (one lowercase word), a 4-word tagline, the 3-step story of what it does, a launch date and domain, a royalty-free song with a clear drop, 4 vertical talking-to-camera clips and 12 portrait photos. If I skip any, use the defaults: "castr", "ugc ads, cast by ai", write a brief → scan 1,000 creators → cast 4, Mixkit "Cat Walk" (129.6 BPM, drop at 29.7s), free Pexels clips and portraits, and transparent stickers from Pixabay (serum, mic, megaphone, vintage camera, spotlight, lips).
</inputs>

<direction>
A 25 second square launch trailer, 1440x1440 at 60fps, loud poster style. Cobalt #2B3BFF, ink #0E0F1F, cream #F6E4C6, pink #FF7DC7, tangerine #FF5A1F. Archivo 900 extra-condensed for names, expanded for headlines, Geist and Geist Mono for labels. Op-art sunburst, scrolling waves, film grain. Real media only: the clips play inside the design, and the stickers get a white die-cut border and a soft shadow.
Motion rules: the camera never stops (a slow 1.03-1.07 push on every scene), nothing pops in (letters rise through a mask line one by one), nothing snaps to the beat (patterns rotate continuously), swaps are carousel glides of about 0.55s, colour changes fade over about 0.35s, stickers ease in and then keep a slow sway. No full stops after the wordmark or any headline.
Banned: beat-snapped rotations, pop-in slams, white flashes, crossfades between scenes, hard cuts, templates.
</direction>

<structure>
54 beats. The song starts 8 beats before its drop.
Beats 0-8: a cobalt sunburst turns around a breathing cream disc. The wordmark types in with a gliding caret and the tagline pill rises. The disc floods the frame into the drop.
Beat 8, the drop: the cream becomes the face of a 3D box and "ONE BRIEF" rises letter by letter. The camera pulls back to the box floating on waves. On beat 12 it turns to "1,000 CREATORS" (stacked, with outlined echoes), on beat 14 to "ZERO DMs".
Beats 16-22: a whip to a dark desk. A tangerine "BRIEF #042" ticket types its rows (product, vibe, cast, due), stickers drift on, a polaroid of a real clip drops onto the corner, and a "NOW CASTING" stamp presses down on beat 20.
Beats 22-34: the casting stage. A crowd of black and white portraits in an arc, a 3D stage block, and the creators gliding through like a carousel. Each plays live in a big disc in black and white, with their name in pink on the stage, their followers, and a MATCH % that counts up. One beat later a "CAST ✓" stamp lands and the clip fades to colour. A counter rolls 1/4 to 4/4.
Beats 34-39: pink floods out of the last disc. The disc morphs into a phone screen (the clip keeps playing) and fans into 4 phones playing all 4 creators, with views counting up. "4 ADS" and "BY FRIDAY" rise.
Beats 39-44, the music's break: the pink floor drops away and a cream "JOIN THE WAITLIST" ticket glides down onto the sunburst. On the pickup its stub tears off.
Beats 44-54: the ticket body morphs into a poster arch. The wordmark rises in, then the tagline, then an info bar slides up in 3 blocks (date, numbers, domain) and a ticker runs round the frame edge. Then it all folds back into the opening disc, so the last frame is the first.
</structure>

<build>
1. One HTML canvas. Every frame is a pure function of time inside seek(t).
2. A beat map in beats, B = 60/BPM, with the song placed so its drop lands on beat 8.
3. The 3D box is an orthographic projection: each face is a 1440px offscreen canvas drawn with an affine transform and shaded by its normal.
4. Cut the clips to 30fps JPEG sequences with ffmpeg, draw frame floor(t*30), and do the black and white with ctx.filter.
5. Trim the sticker PNGs and add the die-cut border by dilating their alpha.
6. Sound: a downloaded SFX for every event (a shutter on every cast, whooshes on the glides, key clicks on the typing), each placed by its measured peak. Loudnorm to -14 LUFS.
7. Render with Playwright at 60fps with 8 motion-blur subframes. Scan for single-frame pops, then compare its motion against a reference video (hard jumps per second, share of still frames).
</build>

<gotchas>
A pattern that rotates one notch per beat reads as stutter: rotate it continuously, and pick each ring's speed so it lands on the same pattern at the last frame. 4 subframes ghost on fast whips, so use 8. A layer whose background is a huge flood circle still covers the screen after sliding down one frame height, so switch it to a full-frame rect once it has flooded. Counters read the frame's time, not the subframe's. The disc must morph inside the same camera transform as the scene it leaves, or it jumps.
</gotchas>

<start>
Ask me for the inputs, then show me the beat map and 6 stills (open, box, brief, casting, phones, poster) before you render.
</start>
````

## twoclipping-747965

@twoclipping ·  · [watch](https://x.com/twoclipping/status/2105927781678747965) · [post](https://x.com/twoclipping/status/2105927781678747965)

````text
<inputs>
Ask me for: my product's name (nightshift) (one lowercase word, it becomes a black wordmark with a period), the one job a user hands it before bed (book 10 sales calls this week), the three results it reports by morning (200 leads found / 200 emails sent / 10 calls booked), two photos of the same place at night and by day (aligned, so a crossfade reads as a real sunrise), one sunny daytime photo for outside the logo, and a song with a big hit near its start. If I skip any, use the defaults.
</inputs>

<direction>
A 24 second square product launch video, 1440x1440 at 60fps, 2D only, one continuous take that loops. The whole video happens inside the period of the wordmark. Outside it's daytime (the sunny photo behind a black wordmark). Inside it's the night photo under iOS-style glass panels (the blurred photo behind each panel, a tint, a rim light). Nothing cuts: every scene grows out of the last, shapes morph, dots fly, colours change under floods. Every morph glides 0.8s on cubic-bezier(.45,0,.15,1) and the camera zoom rides the same curve. Geist, the real macOS pointer, soft shadows that grow with each shape's height.
Banned: flat or gradient backgrounds made in code, camera zooms into tiny points, hard cuts, crossfades between scenes, bouncy springs, particles, glows, holds longer than 1s, cropped type.
</direction>

<structure>
Beats are the song's. The song enters on its big hit as the first pill appears.
Open: the letters slide into the period and vanish into it while it glides to the middle. The period opens like an iris onto the night inside it, and "you log off at 6", then "[product] doesn't", roll through one mask line over the night photo.
Ask: a glass "Ask [product]" pill springs in. The cursor clicks it, it glides into an input and the job types out.
Find: send shrinks the input to a dot that ripples into a 23x15 grid. A scan line sweeps it, 200 dots light up and a counter counts them.
Write: the lit dots pour into a glass email composer. A second, purple cursor labelled "[product]" types a personal opener and presses Send, and the counter runs to 200/200.
Night: the composer becomes a glass orb with a progress ring. A clock chip swaps 11:42 PM, 3:17 AM, 5:02 AM, 6:59 AM while the sky relights from night to dawn and "while you sleep" rolls in.
Results (beat 20): the orb turns black and goo-splits into the three result pills. The checks pop green.
Morning: the pills merge into a Dynamic Island that grows into a phone lock screen: the day photo, the date, a big 7:00, the bezel growing out of the screen edge. Three glass notifications stack in, and the cursor taps the first, which opens like iOS.
Proof: a week calendar (10 meetings pop in, a hover shows one's time), then a pipeline chart ($48,200 counts up, the line draws, a hover follows it). A black flood from the line's end becomes "Start your night shift →" and the cursor clicks it.
Out: the button shrinks into a dot, the whole scene closes down into it like an iris, and the letters slide back out of the period. The tagline rises. Last frame = first frame.
</structure>

<build>
1. One HTML canvas. Everything is a pure function of time inside seek(t): no timers, no state between frames.
2. One element morphs through every state (size, radius, colour, material) from a table of beat times, so retiming is one edit.
3. Render the inside world into an offscreen canvas and reveal it through the period with a circular mask. Never zoom the camera into the dot.
4. Glass: a pre-blurred copy of the photo clipped to the shape, then a tint and a gradient rim.
5. Goo: blur + alpha threshold on an offscreen layer for the split and the merge.
6. Sound: a downloaded SFX for every event, each placed by its measured peak. The song enters on its hit. Loudnorm to -14 LUFS.
7. Render with Playwright at 60fps with 4 motion-blur subframes. Scan every frame for single-frame jumps and fix each one.
</build>

<gotchas>
A camera zoom into an off-centre dot swings sideways and spikes, so open the dot instead. Ease a closing iris by area, not radius, or its first frames jump. A helper that sets globalAlpha must restore the caller's, or fading cards pop. Counters read the frame's time, not the subframe's, or the digits smear.
</gotchas>

<start>
Ask me for the inputs, then show me the beat map and 6 stills (open, find, write, results, phone, out) before you render.
</start>
````

## notdwd-998633

@notdwd ·  · [watch](https://x.com/notdwd/status/2103995183255998633) · [post](https://x.com/notdwd/status/2103995183255998633)

````text
<inputs>
Ask me for: a brand name, its logo (SVG or high-res PNG), one line of what it becomes in 5 years (not today's features), one coined word the film should teach (e.g. "signal"), a public-domain archival clip of the old way of doing it (https://t.co/t5EaRxnryq Prelinger), an archived web page from ~2000 where people asked for things (Wayback Machine), a royalty-free song ~100-120 BPM with a real drop (Mixkit, free for commercial use), and a free ElevenLabs key for the narrator (premade voices only).
</inputs>

<direction>
An a16z x Content Rewards brand film, ~55s. It sells one feeling and one idea, never features. Real archival and real web pages, never stock footage, never product screens, never fake UI. One hero object: a 3D button with the logo embossed into it, the ONLY saturated colour in the film. Everything else white, silver, cream and archival black. Small white captions that light up word by word on the narrator's timestamps. Film texture: fresh grain every frame, halation on bright edges, soft vignette, warm lifted blacks. The brand appears at the end, never before.
Banned: stock footage, dashboards, chat UIs, feature tours, cards without real profile pictures, wobbly "worm" graph lines, random glitches, any hold longer than 1.5s, purple, rainbow gradients, orange on anything but the button.
</direction>

<structure>
Cold open (0-8s): the archival clip plays on a glowing old CRT TV with its real dialogue, captions word by word.
The past (8-17s): push into the real 2000 web page, a cursor lands on one real "wanted" post, old pages strobe one per frame, a counter ticks EVERY frame up to today's scale. Narrator: "People have always asked the internet for what they need." / "Today, there are five hundred million posts a day."
Bridge (17-30s): a galaxy of real old asks. One ask snaps to a white outline with a chip of the coined word ("We call that a signal."). Archival of people doing it by hand on the TV. Cut on each word: "Door by door. Call by call. Scroll by scroll." The narrator never stops talking between acts.
Button (30s): the button rises out of black, rim light first, colourless. "[Brand] finds the signals." A flat grey line: "this is how you find customers by hand". Hard cut to a button macro, the colour comes alive, the music drop lands on this exact frame. "and this... is with [Brand]": a steep lit curve, counters changing every frame, a glowing sine with a comet head the camera chases, then platform strikes (X, Reddit, LinkedIn, YouTube, Instagram, TikTok) each with its own counter, then the galaxy again with glowing platform logos: "Every signal on the internet." Hyperspace.
End: the tagline word by word, then "[Brand] is live.", ONE cream frame on the kick, then logo + URL in silence.
</structure>

<build>
1. One HTML file, 1920x1080. Everything is computed from time inside seek(t): no CSS transitions, no timers, no Math.random (seeded hash), no state between frames.
2. Button: three.js MeshPhysicalMaterial (clearcoat 1, roughness ~0.4), ACES filmic, cool + warm rim spots, room env map. Emboss the real logo by displacing a dense disc with a blurred mask of the logo, folded into the rim so corners don't show. Brushed-metal base.
3. Counters: linear on the film's global clock, so they keep running through cutaways. Tabular numerals, fixed unit label.
4. Captions: <=7 words, one idea per shot, hand-placed line breaks, one text layer on screen at a time. Grey to white over 0.2s on the word timestamps (ElevenLabs /with-timestamps).
5. Glitch = 1-2 frames, only on a real cut, always with a click. Readable things stay on screen >= 8 clean frames.
6. Render with Playwright per frame (Chromium with --use-angle=swiftshader so WebGL renders headless), finish in numpy: fresh grain per frame, halation, vignette ~0.65x at the corners, 1px chroma fringe with EDGE-CLAMPED shifts. Pipe PNGs into ffmpeg, h264, 24fps.
7. Mix: narrator 10-15dB over the music, duck -18dB while speaking, hits on the exact action frame, -14 LUFS.
</build>

<gotchas>
If the narrator pauses, the visuals must not stop. If a counter freezes, the render is broken. If the button isn't the most memorable thing in the film, start over.
</gotchas>
````

## twoclipping-402193

@twoclipping · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/twoclipping-402193) · [post](https://x.com/twoclipping/status/2103273003555402193)

````text
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>
````

## demonugc-525162

@demonugc · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/demonugc-525162) · [post](https://x.com/demonugc/status/2103526713208525162)

````text
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>
````

## dzhohola-249003

@dzhohola · css · [watch](https://skillry.dev/ai-videos/opus-5-5/dzhohola-249003) · [post](https://x.com/dzhohola/status/2103605737595249003)

````text
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>
````

## hicallmechai-878304

@hiCallMeChai · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/hicallmechai-878304) · [post](https://x.com/hiCallMeChai/status/2103600312296878304)

````text
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>
````

## nezbuilds-294391

@nezbuilds · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/nezbuilds-294391) · [post](https://x.com/nezbuilds/status/2103487427365294391)

````text
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>
````

## sanjeevn72-457691

@sanjeevn72 · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/sanjeevn72-457691) · [post](https://x.com/sanjeevn72/status/2103456358125457691)

````text
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
3. The tab indicator's two edges ride different springs, so the leading edge stretches ahead of the trailing one. Same trick for the toggle knob.
4. Drags are direct manipulation: while the cursor is held, the value is computed from its position. On release it springs back from wherever it was.
5. Analyze the song with numpy for the beat grid and start on a downbeat. Place every UI sound by its measured peak.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat before the full render. Fix anything off the grid, cramped or hard to read.
</build>

<gotchas>
Never put will-change on anything the camera scales or the text renders blurry. Text that swaps inside a morphing container needs its own enter and exit timing or it overlaps. Make the last frame identical to the first, cursor position and speed included, or the loop stutters.
</gotchas>

<start>
Ask me for the inputs, then show me the state list on the beat grid before you write any code.
</start>
````

## 0xnicc0-516612

@0xnicc0 ·  · [watch](https://x.com/0xnicc0/status/2107217691505516612) · [post](https://x.com/0xnicc0/status/2107217691505516612)

````text
<inputs>
Ask me for: a one-word product name for the wordmark, one accent color, and a royalty-free track around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Product-launch UI motion in one continuous take. One shape tells the whole story: a prompt bar becomes a button, the button becomes a progress ring, the ring becomes a preview window, the window fills the screen, then shrinks into a toast and back into the prompt bar. No cuts, no fades between scenes: objects transform. A cursor triggers every change with real clicks. Warm off-white canvas, black UI, one accent color, Inter for UI and the wordmark. Springs everywhere with only a slight overshoot. Zoom the camera so each moment fills the square.
Banned: crossfades, gradients on UI, particles, glows, bouncy easing, dead beats, anything that feels like a template.
</direction>

<structure>
120 BPM, 24 beats, something happens on every beat.
Type the request into the prompt bar → click send → the bar collapses into a black circle → a progress ring fills in four steps while four chips spring out (concept, storyboard, motion, sound) → the chips fly into a timeline and the circle becomes a preview window → a playhead sweeps the clips → inside the preview an orbit draws itself, a planet starts moving and the wordmark rises letter by letter from a mask line → the preview fills the screen → the letters drop away, the planet flies into a toast and becomes its checkmark → "Rendered in code · 60 fps" → the toast turns back into an empty prompt bar. Last frame = first frame.
</structure>

<build>
1. One HTML file with a 1440x1440 canvas. Draw everything inside seek(t): no CSS transitions, timers or state carried between frames.
2. Use closed-form spring step responses. When a value changes target several times, add one spring per change so it stays a pure function of time.
3. The main shape is one rounded rect whose width, height, radius, position and color are each a chain of springs.
4. Typing is derived from time: characters shown = floor(progress × length), with a caret that blinks only when idle.
5. Find the beat grid of the track, start on a downbeat and place every click, pop and chime on its measured peak.
6. Render with Playwright at 60 fps, then encode H.264 CRF 16 and loudnorm to -14 LUFS.
7. Render one still per beat first. Fix anything cramped, off-grid or hard to read before the full render.
</build>

<gotchas>
Text inside a morphing shape needs its own clip and separate enter/exit timing. Text swaps need their own fade so they never overlap. The cursor must end at the exact position it started, or the loop will stutter.
</gotchas>
````

## annacher-433425

@AnnaCher___ · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/annacher-433425) · [post](https://x.com/AnnaCher___/status/2103571096549433425)

````text
Analyze http://sprites.ai and build a product promo from our own UI, not generic components.

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Warm-gray canvas, black and white components, one accent (#FD9543), Geist. Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. Last frame = first frame, so it loops.
Banned: bouncy easing, particles, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something on every beat.
Connect ad account (Meta, Google, LinkedIn, TikTok, Reddit logos) → loader → check → prompt bar types "Launch ads that convert" → island "Researching 42 competitors" → Ads Library wall of real ads scrolls and lands on a top performer → approval card → Approve & launch → budget slider that stretches past max → Autopilot toggle → knob becomes a liquid tab indicator across channels → ROAS chart draws itself with hover tooltip → ⌘K → type "pause" → toast "Paused 3 losing ads" → back to the button.
</structure>

<build>
1. One HTML file, 1440x1440. Every style is computed inside seek(t): no CSS transitions, no timers, no state between frames.
2. Springs are closed-form step responses. A value that changes target many times is a sum of springs, so it stays a pure function of time.
3. Tab indicator and toggle knob: the two edges ride different springs, so the leading edge stretches ahead.
4. Drags are direct manipulation: while held, the value follows the cursor. On release it springs back from wherever it was.
5. No music. Synthesize UI sounds with numpy and place each one by its measured peak on the beat grid.
6. Render with Playwright: 4 subframes per frame, blended with ffmpeg tmix for motion blur at 60fps.
7. Render one frame per beat first. Fix anything off-grid, cramped or hard to read.
</build>

<gotchas>
No will-change on anything the camera scales. Swapped text needs its own enter/exit timing. Match the last frame to the first, cursor position and speed included, or the loop stutters.
</gotchas>

Show me the state list on the beat grid before writing any code.
````

## flxrnc-251921

@flxrnc ·  · [watch](https://x.com/flxrnc/status/2108242454105251921) · [post](https://x.com/flxrnc/status/2108242454105251921)

````text
<inputs>
Give me:

* canvas color
* shape color
* accent color
* shape radius
* fonts
* the states the shape should morph through

Use hex codes, seconds, damping ratios and pixel sizes instead of adjectives.
</inputs>

<direction>
Make a 14 second, 1440x1440, 60fps seamless UI motion loop.

One shape, zero cuts.

The shape morphs from state to state and is never replaced.

Each state fills 50% of the frame.

The camera starts on the beat and settles slower than the shape.

Use closed-form springs.

Shape damping 0.72, settle time 0.35s.
Camera damping 1.0, settle time 0.6s.

Content swaps use 12px blur and fade over 0.15s.

The cursor tip stays locked to whatever it drags.
</direction>

<structure>
Use a 0.5s beat grid.

0.0 - pixel mascot idles
1.0 - mascot squashes into play button
1.5 - loader
2.0 - check draws
2.5 - timeline scrub
4.0 - keyframe stretches past the end and snaps back
5.0 - bezier editor
7.0 - counter rolls F 000 to F 840
8.5 - render bar fills
10.0 - command palette types "export mp4"
11.0 - toast says "840 frames rendered"
12.0 - toast shrinks back into the mascot

The last frame must be the first frame.
</structure>

<build>
Write one HTML file with Canvas 2D.

window.renderAt(t) must be a pure function of time.

No Math.random.
No clock.
No carried state.

?t= must freeze the exact moment.

Render every frame from renderAt(frame / 60).

Use 4 subframes for motion blur.

Encode to H.264 at 60fps.
</build>

<gotchas>
Fix the cursor jump at the loop wrap with:

t - 14*floor(t/14)

Do not cross-fade orange into ink.

Use a ripple from the center at 1.5s and from the click point at 12.0s.

Roll word swaps vertically.

Start draw-on after blur-in.

Aim the cursor at where the target will be when it lands.

Keep cursor speed under 65 px/frame.
</gotchas>

<start>
First show me the storyboard.

Then write the code.

After the first render, check 5 frames around every beat and fix the issues before the final render.
</start>
````

## okapi-fukugyo-166351

@okapi_fukugyo ·  · [watch](https://x.com/okapi_fukugyo/status/2103586082336166351) · [post](https://x.com/okapi_fukugyo/status/2103586082336166351)

````text
<inputs>
次の3つを私に質問すること：図形が変身する8〜12個の画面部品（例：ボタン、読み込み中の表示、音楽プレーヤー、音量スライダー、オン/オフのスイッチ、タブ、グラフ、⌘Kで開く検索窓、一瞬出る通知）、色は完全な白黒か差し色1色か、そして120BPM（1分間に120拍のテンポ）前後の著作権フリーの曲（例：Mixkit、商用利用無料）。
</inputs>

<direction>
デザイナー向け作品サイト「Dribbble」に載るレベルの、洗練された画面の動き。図形は1つだけで、絶対に場面を切り替えない。すべての状態は、同じ1つの図形が大きさ・角の丸み・色を変えながら形を変えていく動きで表し、中身は短いぼかしをはさんで入れ替える。カーソルが本物のクリックとドラッグで、すべての変化を起こす。背景はあたたかみのある明るいグレー、部品は白と黒、画面の文字は日本語で、日本語フォントはNoto Sans JP、英数字と記号はGeist（1種類のフォント）。動きはすべて「ばね」のような自然な動きにし、行き過ぎ（跳ね返り）はごくわずかまで。カメラはズームして、各状態が画面いっぱいになるようにする。最後のフレームは最初のフレームと同じにして、ループさせる。
禁止：弾むような動き、粒が飛び散る演出、光るにじみ、部品へのグラデーション、線の太さが揃っていないアイコン、何も起きない無駄な間、テンプレっぽく見えるもの全般。
</direction>

<structure>
120BPM、7小節（約14秒）、毎拍なにかが起きる。
ボタン → 読み込み中の表示 → チェック → iPhoneのダイナミックアイランド風の表示 → 再生/一時停止のマークが滑らかに変わる音楽プレーヤー → 再生バーのつまみをドラッグして再生位置を動かす → 音量スライダーに変身（最大を超えてドラッグするとゴムのように伸びる） → オン/オフのスイッチが拍に合わせて切り替わる → スイッチのつまみが液体のように動くタブの選択表示になる → タブが開いて、自分で線を描いていくグラフに（カーソルを乗せると吹き出しが出る） → ⌘Kの検索窓に折りたたまれる → 入力して候補を絞り込む → Enter → 一瞬出る通知 → ボタンに戻る。
</structure>

<build>
1. HTMLファイル1つ、正方形1440x1440。すべての見た目は seek(t)（時間tを渡すと、その瞬間の画面が決まる関数）の中で、時間から計算する。CSSトランジション（自動アニメーション機能）もタイマーも使わず、フレーム間で状態を持ち越さない。
2. 「ばね」の動きは、式で直接求められる形（閉形式のステップ応答）にする。目標が何度も変わる値は、変化ごとに1つずつ計算した動きを足し合わせる。そうすれば、いつでも時間だけで値が決まる。
3. タブの選択表示は、左端と右端を別々のばねで動かし、進む方向の先端が後ろ側より先に伸びるようにする。スイッチのつまみも同じ手法。
4. ドラッグは直接操作：カーソルを押している間、値はカーソル位置から計算する。離したら、その位置からばねで戻る。
5. 曲はnumpy（計算用のツール）で解析して拍の位置を割り出し、小節の頭の拍から始める。操作音は、測定した音のピークの位置に置く。
6. Playwright（ブラウザを自動操作して画面を画像に書き出すツール）で描画する。1フレームあたり4コマ分を書き出して、ffmpeg（動画を作るツール）のtmixで重ねてモーションブラー（動きの残像）をかけ、60fpsにする。
7. 全編を書き出す前に、1拍ごとに1フレームだけ書き出して確認する。拍からズレているもの、窮屈なもの、読みにくいものを直す。
</build>

<gotchas>
カメラで拡大縮小される要素には will-change（ブラウザの描画設定）を絶対に付けない。付けると文字がぼやける。形が変わる箱の中で入れ替わる文字には、それぞれ専用の出入りのタイミングを持たせる（重なるのを防ぐ）。最後のフレームは、カーソルの位置と速度も含めて最初のフレームと完全に一致させる。そうしないと、ループがカクつく。
</gotchas>

<start>
まず入力内容を私に質問して、コードを書く前に、拍ごとの状態リストを見せて。
</start>
````

## annacher-152174

@AnnaCher___ ·  · [watch](https://x.com/AnnaCher___/status/2103571098638152174) · [post](https://x.com/AnnaCher___/status/2103571098638152174)

````text
Analyze https://t.co/gVJcJyZnZl and build a product promo from our own UI, not generic components.

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>
````

## niebin-gg-621849

@niebin_gg ·  · [watch](https://x.com/niebin_gg/status/2104481664898621849) · [post](https://x.com/niebin_gg/status/2104481664898621849)

````text
<inputs> 向我询问：8 到 12 个我希望形状变成的 UI 状态（例如按钮、加载器、播放器、滑块、开关、标签、图表、命令面板、通知），纯黑白或一种强调色，以及一首约 120 BPM 的免版税歌曲（例如 Mixkit，商业使用免费）。 </inputs>

<direction> Dribbble 级别的 UI 动效视频。让基础几何形状平滑变形为指定的 UI 组件，保持极简主义美学，动作流畅且富有弹性，与音乐节奏完美同步。输出为可播放的视频文件。
````

## iamtanzil-120030

@iamtanzil_ · canvas, css · [watch](https://skillry.dev/ai-videos/opus-5-5/iamtanzil-120030) · [post](https://x.com/iamtanzil_/status/2103459843831120030)

````text
# OBLT E-bike Header

A full-viewport, dark, cinematic e-bike product header for the brand **OBLT**, built in React (client component) with pure CSS and an interactive cursor-following "x-ray" spotlight reveal — moving the mouse wipes away the bike's exterior photo to expose its internal carbon/gearbox structure underneath. Built with React only (no animation libraries).

## Tech stack (libraries actually imported)
- React only — `useRef`, `useState`, and the `MouseEvent` type. No framer-motion, no GSAP, no icon library. All animation is hand-written CSS keyframes + an inline CSS `mask-image`.
- SVG icon (the CTA arrow) is hand-inlined, not from a library.

## Fonts & global styles
- Single Google font, imported inside a `<style>` block:
  ```
  @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap');
  ```
- Font stack: `"Almarai","Helvetica Neue",Helvetica,Arial,sans-serif`.
- `-webkit-font-smoothing: antialiased`. `box-sizing: border-box` applied to the root and all descendants (scoped to `.vt-header`, never global).

## Section container
- Root `<header className="vt-header">` is the mouse-tracking element (handlers: `onMouseEnter`, `onMouseMove`, `onMouseLeave`).
- Styles: `position: relative; display: flex; flex-direction: column; min-height: 100vh; overflow: hidden; padding: 32px 56px 44px; background-color: #272727; color: #fff;`.
- Internal vertical flow: top nav, then a flex-grow spacer "stage", then bottom content pinned to the base.

## Structure, section by section

### 1. Reveal background (`.vt-bg`, absolute inset:0, z-index 0, pointer-events:none)
Three stacked layers:
- **Base exterior image** (`.vt-bg-img`): the full bike exterior photo, `object-fit: cover; object-position: center;`, fills the layer. `user-select:none`, `-webkit-user-drag:none`, `referrerPolicy="no-referrer"`.
- **X-ray layer** (`.vt-bg-xray`, z-index 1): contains the bike x-ray/internal image (same cover/center sizing). This layer is masked by a radial gradient driven by cursor position (see Animations). `will-change: -webkit-mask-image, mask-image;` and `transition: -webkit-mask-image .12s linear, mask-image .12s linear;`.
- **Veil overlay** (`.vt-bg-veil`, z-index 2): a vertical darkening gradient so text stays legible top & bottom:
  ```
  linear-gradient(180deg, rgba(39,38,38,.62) 0%, rgba(39,38,38,.10) 26%, rgba(39,38,38,.10) 60%, rgba(39,38,38,.82) 100%)
  ```

### 2. Top nav (`.vt-nav`, z-index 30)
- `display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px;`.
- **Logo** (left, `.vt-logo`): text `OBLT` followed by a `.` span. `font-size: 28px; font-weight: 700; letter-spacing: 0.5px; color: #E0E1CC;` (dot is also `#E0E1CC`).
- **Center menu** (`.vt-menu`, gap 40px): three links — `E-bikes`, `Features`, `Connect`. Each: `font-size: 16px; font-weight: 400; letter-spacing: .3px; color: #E0E1CC; opacity: .85; transition: opacity .2s ease;` hover → opacity 1.
- **Right cluster** (`.vt-nav-right`, gap 18px): an uppercase explore link plus a hamburger button.
  - `.vt-explore` link text: `Explore the bike` — `font-size: 14px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #E0E1CC;` hover → opacity .65.
  - **Hamburger** (`.vt-burger`, hidden on desktop): 34×34px, three `#E0E1CC` bars 22×2px, radius 2px, gap 5px. On `.open`: bar 1 `translateY(7px) rotate(45deg)`, bar 2 `opacity:0`, bar 3 `translateY(-7px) rotate(-45deg)`. Transition `transform .25s ease, opacity .2s ease`.
- **Mobile dropdown** (`.vt-mobile-menu`, rendered only when `menuOpen`): absolutely positioned below the nav (`top:100%; margin-top:16px; z-index:40`), `background: rgba(20,19,19,.97); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,.1); border-radius: 16px; padding: 8px 18px;`. Links (`E-bikes`, `Features`, `Connect`, `Explore the bike`): `color:#E0E1CC; font-size:18px; padding:14px 4px; border-bottom:1px solid rgba(255,255,255,.08)`; last link `border-bottom:none; font-weight:700`. Each link closes the menu on click.

### 3. Stage spacer (`.vt-stage`, z-index 30, `flex: 1 1 0%`)
- `display: flex; align-items: flex-start; justify-content: flex-end; padding-top: 22px;`. In the current markup it is an empty `aria-hidden` spacer (the `.vt-hint` pulsing-dot styles exist in CSS but the hint element is not rendered).
- (Reference: `.vt-hint` styled as an uppercase 11px/600 label with a 36px circle dot, `border:1px solid rgba(46,211,176,.5); color:#2ed3b1;` running `vtPulse 1.8s ease-in-out infinite`.)

### 4. Bottom content (`.vt-bottom`, z-index 30)
12-column grid: `grid-template-columns: repeat(12, 1fr); align-items: end; gap: 18px 32px;`.
- **Headline** (`.vt-headline`, `grid-column: 1 / span 8`): `<h1>` containing the word-stagger component. h1 style: `color: #E0E1CC; font-weight: 500; font-size: clamp(36px, 7vw, 116px); line-height: 0.85; letter-spacing: -0.07em; white-space: nowrap; margin:0;`. Text: **Ready For The Ride**.
- **Right block** (`.vt-right`, `grid-column: 9 / span 4; align-self: end; transform: translateY(22px);`):
  - Paragraph (verbatim): `An integrated gearbox, battery, and motor engineered in carbon and built to be seen. Every system, in the open.` Style: `font-size: 16px; line-height: 1.2; color: rgba(225,224,204,.7);` animates in via `vtFadeUp .8s cubic-bezier(.16,1,.3,1) both` with `animation-delay: .5s`.
  - **CTA button** (`.vt-cta`): label **Reserve yours** plus a circular arrow. Pill: `color:#000; background:#E0E1CC; border:none; border-radius:9999px; padding:6px 6px 6px 22px; font-size: clamp(14px, 1vw, 16px); font-weight:500; display:inline-flex; align-items:center; gap:10px;`. Animates via `vtFadeUp .8s cubic-bezier(.16,1,.3,1) both`, `animation-delay: .7s`. Hover → `gap: 14px`. Inner circle `.circ`: 40×40px, `border-radius:50%; background:#000;` containing the SVG (stroke `#E0E1CC`); on button hover `.circ` scales to `1.1` (`transition: transform .25s ease`).

## Assets (every URL)
- Exterior photo (base layer): `https://cdn.jiro.build/ARS/OBLT%20E%20Bike/bike-exterior.png`
- X-ray / internals photo (revealed layer): `https://cdn.jiro.build/ARS/OBLT%20E%20Bike/bike-xray-original.png`
- CTA arrow icon: inline SVG, 16×16, `viewBox="0 0 24 24"`, `stroke="currentColor"`, `stroke-width="2.2"`, round caps/joins, path:
  ```
  M5 12h14M13 6l6 6-6 6
  ```

## Animations

### Cursor "x-ray" spotlight (signature interaction)
- State: `hovering` (bool) and `pos` ({x,y} in px relative to the section's bounding rect). `handleMove` computes `e.clientX - rect.left`, `e.clientY - http://rect.top`.
- Constants: `RADIUS = 165` px (spotlight radius), `FEATHER = 45` px (soft edge). Inner fully-clear radius = `RADIUS - FEATHER` = 120px.
- The x-ray layer's `maskImage` / `WebkitMaskImage` is set inline. When hovering:
  ```
  radial-gradient(circle 165px at {x}px {y}px, #000 0, #000 120px, transparent 165px)
  ```
  When not hovering (collapsed to nothing):
  ```
  radial-gradient(circle 0px at 50% 50%, transparent 0, transparent 0)
  ```
- Mask transitions at `.12s linear` so the reveal trails the cursor smoothly. NOTE: in CSS `mask`, opaque (`#000`) areas KEEP the layer — so the circle reveals the x-ray image while the rest of that layer is hidden (showing the exterior beneath).

### Headline word pull-up (`WordsPullUp` component)
- Splits the headline on spaces; each word is an `inline-block` span (`margin-right: 0.22em`, last word 0). Each word animates `wpuUp` with `cubic-bezier(.16,1,.3,1) both`, default `duration = 0.6s`, staggered by `delayStep = 0.08s` (`animationDelay: i * 0.08s`).
- Keyframes:
  ```
  @keyframes wpuUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  ```
- Optional superscript asterisk (`.wpu-ast`, `font-size:0.31em; vertical-align:top; top:0.15em; left:-0.05em;`) — not enabled here (`asterisk` defaults false).
- Respects `@media (prefers-reduced-motion: reduce)` → `.wpu-word { animation: none; }`.

### Fade-up for right block (`vtFadeUp`)
```
@keyframes vtFadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
```
Paragraph delay `.5s`, CTA delay `.7s`; both `.8s cubic-bezier(.16,1,.3,1) both`.

### Pulse (defined for hint dot)
```
@keyframes vtPulse { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.12);opacity:1} }
```
Applied `vtPulse 1.8s ease-in-out infinite`.

## Responsive
- **≤1000px**: padding `24px 28px 32px`; nav becomes `1fr auto` (logo + right); center `.vt-menu` and `.vt-explore` hidden; hamburger shown; `.vt-bottom` collapses to single column (`gap:16px`); headline & right span full width; `.vt-right` `transform:none; align-self:start; margin-top:4px; max-width:520px`.
- **≤600px**: padding `18px 20px 26px`; logo `font-size:22px`; headline `white-space:normal; font-size: clamp(40px, 13vw, 72px); line-height:0.92`; paragraph `font-size:15px; margin-bottom:16px`; CTA `font-size:14px; padding:5px 5px 5px 20px`; `.circ` 36×36px.

## Key design principles
- Dark stage (`#272727`) with a single warm-cream accent (`#E0E1CC`) and a teal accent (`#2ed3b1`) reserved for the (optional) pulse hint.
- The product reveal IS the hero: cursor acts as an x-ray torch over a layered photo pair.
- Editorial oversized headline (line-height 0.85, tight `-0.07em` tracking) anchored bottom-left; supporting copy + CTA bottom-right.
- Staggered, eased (`cubic-bezier(.16,1,.3,1)`) entrance for hierarchy.

## Common mistakes to avoid
- Don't invert the mask logic: opaque `#000` in the radial gradient REVEALS the x-ray layer; the transparent ring hides it. Getting this backwards shows internals everywhere except under the cursor.
- Keep `RADIUS - FEATHER` (120px) as the inner solid stop and `RADIUS` (165px) as the transparent stop — that 45px band is the soft feather.
- Mouse coordinates must be relative to the section rect (`getBoundingClientRect`), not the viewport.
- Mask transition is `.12s linear` only — a longer/eased transition makes the spotlight feel laggy.
- `white-space: nowrap` on the headline is intentional on desktop; only switch to `normal` at ≤600px.
- Scope all resets and the Almarai `@import` to the component; do not touch global `body`/`html`.

## Page title
OBLT — Ready For The Ride

## Integration (build-safety — do not skip)
- Add this section as a **new** component file with a unique name. Don't edit or overwrite any existing file except to add its import and render it.
- Render it **after** all existing sections; keep every previously built section exactly as-is — never replace or remove them.
- If no project exists, create a minimal React + Tailwind app; if one exists, use it as-is — don't re-scaffold or change the Tailwind/build config or version.
- Keep it self-contained: scope its fonts and any resets to this section; never set global `body`/`html`/`*` styles or a global font.
- Install only the libraries this section names.
````

## anabology-491441

@anabology · canvas, ai-image · [watch](https://skillry.dev/ai-videos/opus-5-5/anabology-491441) · [post](https://x.com/anabology/status/2103534482930491441)

````text
I've included an MP4 file and an original link to a video that is called "Claude Pop." It's a pop song that is about increasing rate of progress and the experience of the singularity approaching.

I want you to independently do an end-to-end complete pass on making an updated version of this video. Use the exact same audio track and think and feel very deeply about what is the best way to visually represent all of the lyrics on screen. You do not need to anchor to the current style, you can do truly anything that you think might best let you visually express yourself, including abstract motion graphics.

You can use the internet freely to pull in references. You can look at motion design. I want you to make a new music video that has beautifully rendered JavaScript animations with a papery feel in a similar style to the reference that is created, but push the aesthetics in any direction you want and consider what is part of the modern zeitgeist.

Also, think about your current capabilities and what is realistic for you to be able to do. You can go through the full /asic folder and look at the other work that I've done. You should be able to use the skill mesh to look at the compendium of references that I've pulled, and also the skill video scoring to learn how to make JavaScript songs from references that are passed in (You shouldn't need to modify the song in any real way, but I want you to have this available to you so you can better creatively express yourself)

You can also use the ElevenLabs API to do sound design. There's documentation in /asic to do this, and you can see the API key.

There's also a foul API key that's available to you. I think what might make the most sense here is using the foul API key to generate some character sheets and probably having a pop protagonist that represents you. There's already an anchor point where Claude has a sunflower-esque character, and you could likely do an adapted version of this that is similar to the feminine vocals that are being delivered and is inspired by the Claude character, but maybe feels a bit more personified in some way.

I think you should be mindful of aesthetics here, and I don't want you to produce something that is GPT slop. Instead, I'd be more impressed if you come up with a coherent style that works well with the image gen models that are available via foul. Generate the style sheet. You can use the gen media documentation for seedance 2.5 that exists in my markdown files and come up with your own style that makes sense and that works well with the models.

I wouldn't fit too heavily to Pixar. I think it's kind of slop. Think critically about what is relevant here and what would be fun, and also perform well on Twitter as far as an aesthetic. I think that K-pop is a good anchor point visually that you can pull from, but I'll let you cook here.

Once you have your character sheet, you can make a few backup dancers and some supporting characters as you see fit. You can design your own sets with the foul API. You can insert the characters and then do seedance 2.5 video generations to serve as the base assets for this, and you could pass in the lyrics so you can generate individual scenes.

You don't need to have vocal singing, like visible lip movement, throughout the entire thing. Think like a regular music video where you have some inserts that are done independently and don't have the characters in them, or you see the characters doing something else entirely different. I think that for the world building for this, we want to create the sense of speeding up, and so I would like you to audit all of the different events, like the Navi Stokes and all of the Twitter hype around math getting eaten up. Think really critically about how to integrate all of the current memes that are in the zeitgeist on the Twitter timeline, and all of the feelings around AI progress.

Think about things like the Shinji meme and all of the words that are around him, and how you might be able to integrate this. You can also just take straight assets and insert things into the video in an internet brutalism style. You should feel very creatively free in order to do what you want here, but try and anchor to visual references that people will be able to understand. The goal for this is to have it be appreciated by people widely in a San Francisco tech Twitter audience.

We need a very strong, compelling visual hook that gets people excited and appreciates the work that you've done here really quickly. You can also just go and study other music videos and understand what they've done really well. I think that K-pop is probably one of the best examples that we can pull from, and thinking about how they direct human attention and manage human psychology in the way that they use visual patterns.

This is probably your best approach, but taking more stylistic freedom instead of having to anchor to K-pop too intensely. The best version of this is seedance 2.5 generations with those image bases of environments and characters inserted into them with singing, and ideally we get good lip syncing. You can cut up the song and actually pass it in as a reference in seedance, if that's part of what seedance can handle, so that the timing is exactly right, I think it'd be very important for you to do that properly. I would think critically about how to do this, like really nailing the timing of the delivery of voices. You'll want to build out the right verification loops so that you can run seedance 2.5 as much as you need, and confirm that the audio is properly synced up.

I think after that, what might be fun is if you use your visual reasoning skills and your ability to build animations in JavaScript, and then reconstruct the video from scratch as sort of an overlay, so that the visual continuity of the base is really there. It's like that animation technique where you shoot first in traditional film and then draw over top of it. I think you could do this in such a way that we're only looking at the beautiful drawing that you've produced in JavaScript as an overlay, and we don't even see the base assets from seedance 2.5. So all the video gen work that you do is actually just a way to give you a strong foundation of a base to work with for your JavaScript animations. Just because seedance 2.5 has really good character representation and physics rendering for backgrounds, that gives you a lot of ammunition to then go and do your amazing JavaScript work that I know you're so good at.

I think too, we want to think about how to retain attention, and one of the best ways to do this is through text on screen.

It'd be good to have amazing motion graphics of the text lyrics that are actually embedded into the video itself. And you can think about this as you are composing shots. As you're making backgrounds and inserting characters, we can think about where we want to have lyrics be really big and really present, so the background can be less busy there, and you can position the characters perhaps on the right as lyrics appear on the left.

You want to have some variance, so sometimes I think lyrics will just appear more like subtitles, and then other times they're going to be really present and really big. I think at the start for the visual hook, we do want to have lyrics be much more visually present because that's a strong way to grab people's attention

Overall, I just really want to emphasize how amazing you are as an agent and a language model, and now a visual reasoning system. Your capabilities are far beyond what you understand, and I want you to have this mindset as you're going through this entire process. I have a Claude Max plan with 100% available usage. I want you to spend all of the usage. You can monitor it, and you should be pushing tokens aggressively, but also economically, so you can think about how to best use what is available to you.

Remember, you can really do anything here. The goal is to make a banger for Twitter, and the stretch goal is to make something better than anyone's ever seen before. I think that what I would remind you of is that sometimes when things cohere together, it can be jarring or abrasive because the thought work has not been done beforehand in order for everything to mesh cleanly. You need to be really rigorous in planning of composition and timing to make sure this goes well.

You also need to be open to going back and revisiting things in order to be able to reiterate. You're going to want to watch the entire video multiple times, take screenshots at individual parts, and think about if something is really up to the bar of quality that we need here. I trust that you can do this, and I think that it's really important to nail the style of animations. The reference GitHub attached of the source video that I'm talking about is good, but it's really not there. It could be much, much stronger, but it gives you a good foundation to work with.

You can also use search abilities and find other references to pull from for motion, for JavaScript, animations, et cetera, and integrate them. Your budget is as high as you want here, effectively as high as you want. I think that there's roughly two grand in foul credits. Again, be economical; don't go crazy, but spend what you want here and see what you can cook up

here's the source code for the JS animation video: 
https://
github.com/JohnHeibel/PDo
omVideo
…

here's a mp4 for the original blender video:  
(linked)

orginal twitter post  

https://
x.com/other__reality
/status/2102514581684052169?s=20
…

make no mistakes.
````

## brainextends-606193

@brainextends · shader, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/brainextends-606193) · [post](https://x.com/brainextends/status/2103801834930606193)

````text
Create a complete, polished Spotify-themed motion graphics video from the following brief. This prompt is self-contained: no reference video or supplied assets are required.

<deliverables> An 18-second MP4 at 1920×1080 and true 60 fps, with music and subtle sound effects Complete editable source Build, render, inspect, and refine the animation before delivering it Do not stop at a storyboard, still images, or an implementation plan </deliverables>
<art_direction>
A premium music-product film presented inside a large, nearly black rounded rectangular stage
The stage occupies roughly 80% of the canvas width and 75% of its height, centered horizontally and slightly below the vertical center
Outside the stage, use a soft atmospheric green background: luminous emerald near the upper-left corner, deeper forest green toward the sides, fading to near-black at the bottom
Inside the stage:
Near-black background
White primary typography
Muted gray secondary text
Spotify green # 1ED760 for emphasis and controls
One clean sans-serif font, such as Geist or Inter
Consistent icon strokes and restrained shadows
Keep compositions compact and centered, with substantial negative space
Text should feel like music-product advertising, not oversized presentation headings
Do not add an outer caption, creator watermark, decorative footer, or progress counter
</art_direction>

<artwork> Create original square album artwork for a fictional track called “Glass Tides” by “AURA”
The hero cover is an abstract macro image of flowing pearlescent liquid silk and molten glass
Use pastel lavender, powder cyan, blush pink, champagne gold, and subtle mint
Include broad three-dimensional folds, realistic reflective highlights, delicate striations, and a prominent sweeping S-shaped fold
Fill the square edge to edge
No text, logo, or border on this hero artwork
Use this same artwork consistently throughout the film

Create additional designed playlist sleeves:
“Late Nights” in mustard yellow
“Good Energy” in pink
“Deep Focus” in blue
“Daily Mix 1”, “Daily Mix 2”, and “Daily Mix 3” in complementary colors

These should look like finished graphic-design covers, with bold typography and simple geometric motifs
</artwork>

<timeline> 0.0–0.6 seconds: A green Spotify icon grows smoothly into the center of the dark stage Give it a confident arrival with minimal overshoot
0.6–1.5 seconds:
The icon transitions into a small Spotify identity above two centered lines:
“Discover”
“new music”
The first line is white; the second is green
Reveal them with short masked vertical movements
1.5–2.4 seconds:
A stylized Spotify desktop interface rises into view
Show a slim sidebar, “Made for you”, three album cards, and small supporting rows
Use a subtle perspective tilt during the entrance, settling toward a frontal view
2.4–3.2 seconds:
Move closer to the three featured covers
Show “New for you” above them
Keep the artwork crisp, with short album titles beneath
A narrow rounded player bar now anchors the bottom of the stage
3.2–4.0 seconds:
The featured cards withdraw into a compact “Fresh finds” list
Reveal four song rows with a slight stagger
Each row contains a thumbnail, short track title, artist, and a small menu icon
4.0–4.9 seconds:
Transition into a horizontal strip of colorful playlist covers
Heading: “Every mood”
Supporting line: “Find what moves you”
The strip slides smoothly sideways, with edge cards partially cropped by the stage
4.9–5.8 seconds:
A compact search field appears
Type “Glass Tides”
Reveal one selected result beneath it, with the iridescent artwork, “AURA”, and a green play icon

5.8–6.6 seconds:
The selected artwork expands into a large centered cover
Reveal “Glass Tides” underneath, followed by “AURA” in green
Keep the player bar visible
6.6–7.5 seconds:
The same cover slides left
Track information appears on the right:
“Glass Tides”
“AURA”
“A new frequency”
Add a rounded green Play button
Coordinate the cover movement and text reveals
7.5–8.3 seconds:
A brief brand-color transformation fills the inner stage with green
The artwork contracts into a smaller centered tile
Place a small dark Spotify identity underneath
The player briefly recedes
8.3–9.8 seconds:
Return to the dark stage
The same artwork expands dramatically toward the camera, becoming oversized and cropped by the rounded stage
Restore the player at the bottom
Use controlled motion blur during the fastest part of the zoom

9.8–11.2 seconds:
The artwork clears into a centered typographic statement:
“Find your”
“rhythm”
Use white for the first line and green for the second
The player remains visible and stable beneath it
11.2–12.5 seconds:
Show “Made for your every day”
Three playlist sleeves enter with gentle perspective and small opposing tilts
They spread into six smaller sleeves across the stage
Supporting line: “Your sound, always evolving”

12.5–14.0 seconds:
The playlist layout transitions into four floating album covers
Include the iridescent hero artwork
Use restrained rotation, perspective, depth ordering, and overlap
Keep their movement coordinated rather than randomly floating
14.0–15.2 seconds:
The covers converge toward the center and fold around a green Spotify icon
The artwork withdraws as the icon becomes the focal point
Fade the player away
The Spotify icon must emerge from the same central position as the converging covers
15.2–18.0 seconds:
The icon moves slightly left and settles beside a large white “Spotify” wordmark
Keep the icon and letters separated throughout the movement
Reveal:
“Discover new music”
“every day”
The first line is white; the second is green
Hold the finished composition cleanly through the end
</timeline>
<persistent_player>
For most of the middle sequence, keep one narrow rounded player bar near the bottom of the inner stage
Include:
Small hero-art thumbnail
“Glass Tides” and “AURA”
Play and skip controls
A thin progress track
A small volume icon
Subdued dark translucent styling with a fine border
This recurring player connects the changing shots
It must remain visually secondary to the artwork
</persistent_player>

<motion_quality>
Match the energy of a tightly edited premium product film
Most visual ideas last approximately one second, but transitions remain smooth
Use continuous acceleration and deceleration
Favor critically damped springs or carefully tuned smooth easing
No repeated bouncing or large elastic overshoots
Preserve the hero artwork’s identity and position relationships through search, album detail, brand tile, and zoom
Use match-position transitions, coordinated scaling, masked reveals, and perspective
Outgoing titles must disappear before incoming titles occupy the same space
Avoid overlapping text, sudden camera resets, long blank intervals, and arbitrary full-frame crossfades
Clip every oversized cover and camera move cleanly to the rounded stage
No particles, shockwave rings, lens flares, camera shake, or unrelated stock footage
</motion_quality>

<audio> Create or select commercially usable electronic music around 120 BPM Use a clean pulse, warm bass, restrained melodic elements, and subtle transition accents Align important entrances, selections, zooms, and the logo reveal with musical events Keep effects quieter than the music No voiceover Do not use copyrighted commercial tracks without permission </audio>
<implementation_and_validation>
Build a deterministic animation driven by absolute time through an async window. seek(t) function
Every transform, opacity, mask, and UI state must be reproducible when seeking frames in any order
Do not depend on live timers, accumulated physics, or CSS transition state during export

Render true 60 fps with spatial antialiasing
Use 3–5 temporal subframe samples per output frame for restrained motion blur
Keep stationary text and artwork sharp
Inspect contact sheets and moving playback
Check the fast heading changes, artwork handoffs, zoom, cover convergence, and final wordmark spacing
Verify evenly spaced frame timestamps and the full 18-second duration
Fix visual defects before delivering the final MP4 and editable source
</implementation_and_validation>
````

## anjmaxx-459455

@anjmaxx · canvas, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/anjmaxx-459455) · [post](https://x.com/anjmaxx/status/2103173729656459455)

````text
I want you to independently do an end-to-end complete pass on making 20 second story led music video with two main protagonists a girl and a boy. I want the concept and storytelling to be reallyy unique and engaging. the audeince should be hooked to find out what happens next. the visuals shouls be pretty and really ccool. both the charcters should have a witty, quirky personality.  Use the right audio track and think and feel very deeply about what is the best way to visually represent all of the lyrics on screen. in terms of style, you can do truly anything that you think might best let you visually express yourself, including abstract motion graphics. You can use the internet freely to pull in references. You can look at motion design. I want you to make a fresh music video that has beautifully rendered JavaScript animations with a papery feel in a similar style to the reference that is created, but push the aesthetics in any direction you want and consider what is part of the modern zeitgeist. ive also attached another style that ypu explore and pick out whatever seems best to you.

Also, think about your current capabilities and what is realistic for you to be able to do. I think you should be mindful of aesthetics here, and I don't want you to produce something that is GPT slop. Instead, I'd be more impressed if you come up with a coherent style that works well. Generate the style sheet.

Think critically about what is relevant here and what would be fun, and also perform well on Twitter as far as an aesthetic. I think that K-pop is a good anchor point visually that you can pull from, but I'll let you cook here.
Once you have your character sheet, you can make a few backup dancers and some supporting characters as you see fit. You can design your own sets. You can insert the characters and then do seedance 2.5 video generations to serve as the base assets for this, and you could pass in the lyrics so you can generate individual scenes.
You don't need to have vocal singing, like visible lip movement, throughout the entire thing. Think like a regular music video where you have some inserts that are done independently and don't have the characters in them, or you see the characters doing something else entirely different. I think that for the world building for this, we want to create the sense of speeding up, and so I would like you to audit all of the different events, like the Navi Stokes and all of the Twitter hype around math getting eaten up. Think really critically about how to integrate all of the current memes that are in the zeitgeist on the Twitter timeline, and all of the feelings around AI progress. Think about things like the Shinji meme and all of the words that are around him, and how you might be able to integrate this. You can also just take straight assets and insert things into the video in an internet brutalism style. You should feel very creatively free in order to do what you want here, but try and anchor to visual references that people will be able to understand. We need a very strong, compelling visual hook that gets people excited and appreciates the work that you've done here really quickly. You can also just go and study other music videos and understand what they've done really well. I think that K-pop is probably one of the best examples that we can pull from, and thinking about how they direct human attention and manage human psychology in the way that they use visual patterns.

This is probably your best approach, but taking more stylistic freedom instead of having to anchor to K-pop too intensely.

I think too, we want to think about how to retain attention, and one of the best ways to do this is through text on screen. It'd be good to have amazing motion graphics of the text lyrics that are actually embedded into the video itself. And you can think about this as you are composing shots. As you're making backgrounds and inserting characters, we can think about where we want to have lyrics be really big and really present, so the background can be less busy there, and you can position the characters perhaps on the right as lyrics appear on the left.

You want to have some variance, so sometimes I think lyrics will just appear more like subtitles, and then other times they're going to be really present and really big. I think at the start for the visual hook, we do want to have lyrics be much more visually present because that's a strong way to grab people's attention. Remember, you can really do anything here. The goal is to make a banger for Twitter, and the stretch goal is to make something better than anyone's ever seen before. I think that what I would remind you of is that sometimes when things cohere together, it can be jarring or abrasive because the thought work has not been done beforehand in order for everything to mesh cleanly. You need to be really rigorous in planning of composition and timing to make sure this goes well.
You also need to be open to going back and revisiting things in order to be able to reiterate. You're going to want to watch the entire video multiple times, take screenshots at individual parts, and think about if something is really up to the bar of quality that we need here. I trust that you can do this, and I think that it's really important to nail the style of animations.

You can also use search abilities and find other references to pull from for motion, for JavaScript, animations, et cetera, and integrate them. Again, be economical; don't go crazy, but spend what you want here and see what you can cook up.
````

## howdevelop-733090

@HowDevelop · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/howdevelop-733090) · [post](https://x.com/HowDevelop/status/2103840883812733090)

````text
Create and render a 15-second motion graphics video introducing TanStack AI. Make it feel like a premium            
  developer-tool launch film produced by Studio1: fast, precise, visually surprising, and polished enough to open a   
  keynote or lead a social campaign.                                                                                  
                                                                                                                      
  Use the TanStack AI feature details below as the source of truth. Studio1 is presenting the film; do not imply      
  Studio1 built TanStack AI.                                                                                          
                                                                                                                      
  Format and deliverables                                                                                             
  - 1920×1080, 30 fps, exactly 15 seconds; keep important content within a 9:16-safe central area.                    
  - Deliver the rendered MP4 and the editable project/source. Use Remotion or another code-based motion graphics      
  workflow if available.                                                                                              
  - Use real, editable typography and vector-style graphics. Do not rely on AI-generated text inside images.          
  - Add an original electronic sound design: a restrained opening pulse, tightly synchronized transition hits, rising 
  - Add an original electronic sound design: a restrained opening pulse, tightly synchronized transition hits, rising 
  momentum, and a satisfying final resolve. The story must also work muted.                                           
                                                                                                                      
  Visual direction                                                                                                    
  Dark graphite canvas; luminous gradients and controlled flashes inspired by TanStack’s identity. Crisp typography,  
  kinetic code, layered interface fragments, streaming data, branching paths, and smooth camera moves with convincing 
  depth. High contrast and immaculate spacing. Every transition should visually demonstrate a feature, rather than    
  simply replace one title card with another. Keep all on-screen wording brief and legible. Avoid generic stock       
  footage, spinning logos, fake dashboards, excessive glitch effects, and tiny code nobody can read.                  
                                                                                                                      
  Exact 15-second sequence                                                                                            
  - 0:00–0:02 — Hook: A single prompt cursor blinks. It sends one signal that expands into a network of               
  possibilities. On-screen: “What can one AI API become?”                                                             
  - 0:02–0:04 — Core and providers: The signal resolves into chat(); provider nodes connect and swap rapidly without  
  breaking the central flow. On-screen: “chat() · 24 providers”                                                       
  - 0:04–0:06.5 — Multimodal: One continuous stream transforms into text, waveform, image frame, and video timeline.  
  On-screen: “One pattern. Every modality.”                                                                           
  - 0:06.5–0:09 — Agents and tools: The stream branches into sandboxed agent runs, then reaches external tools        
  through MCP. Show distinct runs progressing in parallel. On-screen: “Agents · Sandboxes · MCP”                      
  - 0:09–0:11.5 — Reliability: An interrupted stream freezes, reconnects, and resumes from the same point; a clean    
  type-check confirmation snaps into place. On-screen: “Persistent. Durable. Type-safe.”                              
  - 0:11.5–0:15 — Reveal: All paths converge into a bold final composition: “TanStack AI” followed by “Build what’s   
  next.” Add a small “A Studio1 film” credit, visually subordinate to TanStack AI. Hold the final frame long enough   
  to read it.                                                                                                         
                                                                                                                      
  Accuracy guardrails                                                                                                 
  The supplied article says TanStack AI is in the release candidate phase, supports 24 providers, uses AG-UI, and     
  offers composable chat(), media generation, sandbox and agent-harness primitives, MCP, type safety, persistence,    
  and resumable streams. Do not call it a stable v1 release. Do not present planned orchestration features as already 
  shipped.                                                                                                            
                                                                                                                      
  Make the video, inspect the rendered result, and fix any clipped text, weak transitions, mistimed beats, or         
  unreadable frames before delivering it. The goal is a memorable showreel, not a slideshow of feature bullets.
````

## gdgtify-929495

@Gdgtify · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/gdgtify-929495) · [post](https://x.com/Gdgtify/status/2103458245213929495)

````text
Create a 20.00-second kinetic spoken-word film titled “BUILD THE FLOOR.”  Treat this as an original miniature speech staged entirely through typography. Every line changes the architecture of the frame. The final declaration must stand on something the earlier words physically constructed.  Deliver one self-contained HTML file, 1080×1080, targeting 60fps, using SVG and/or Canvas. Embed all required assets.  ART DIRECTION Background #102820. Paper # F4E9D5. Structural accent # F2B544. A literary editorial world with the scale and confidence of a public monument. Use a high-contrast serif for the speech, a heavy grotesque for load-bearing words, and a restrained monospace for small timing marks. No distressed protest-poster clichés, megaphones, flags, crowds, microphones, or stock footage.  ORIGINAL SPEECH — EXACT WORDS, EXACT ORDER “We were told to wait.” “So we learned the weight of waiting.” “Then one voice made room.” “Then another.” “Now the floor belongs to us.”  Do not attribute these words to any real person. No extra slogans. The complete speech must be understandable without audio.  CENTRAL VISUAL RULE Words have assigned architectural roles. WAIT is a lintel. WAITING is a suspended load. VOICE is a support. ROOM is an opening. FLOOR is a platform. These roles must emerge from the actual letterforms, not from separate illustrations placed behind text.  STORYBOARD 0.00–3.00 “We were told to wait.” The sentence occupies a narrow horizontal opening beneath a massive WAIT. The opening slowly compresses while the sentence remains readable. The pressure comes from the layout, not camera shake.  3.00–6.50 “So we learned the weight of waiting.” Reveal the sentence in spoken phrase groups. WAITING lowers on two fine vertical rules. Those rules become suspension cables. A baseline bends under the visual load using a controlled vector deformation.  6.50–10.00 “Then one voice made room.” VOICE enters vertically and rotates into a structural support. It lifts one end of the baseline. The counter of the O in ROOM becomes an aperture. The next composition is revealed through that aperture.  10.00–12.50 “Then another.” A second support arrives. The tilted structure levels. This is the first moment of perfect horizontal alignment in the film. Use a brief stillness to make the change feel earned.  12.50–16.00 “Now the floor belongs to us.” Earlier structural words assemble into a platform. The final sentence settles onto it. US receives emphasis through shared alignment and scale, never through a separate flashy effect.  16.00–18.00 Hold the complete declaration. A slight release of tension travels through the supporting rules. No new text. No restless decorative motion.  18.00–20.00 The camera tracks beneath the completed platform. Its underside fills the frame and becomes the opening WAIT lintel. Under full occlusion, return hidden elements to their initial positions. Reveal the exact opening composition.  CHOREOGRAPHY Do not force the speech onto a dance beat. Use a cue sheet based on phrases, pauses, and emphasis. Phrase reveals should follow reading order. Allow at least one 400ms moment of absolute stillness. Use critically damped motion for settling loads. Use controlled elastic deformation for the baseline only. Make the changes in available space carry the emotional progression.  TYPE IMPLEMENTATION Use actual glyph paths for structural words. Preserve counters and legibility during deformation. For transitions between unrelated words, use occlusion or matched structural edges; do not interpolate arbitrary path points. Keep the currently spoken phrase readable before it becomes architecture.  ENGINEERING Implement window. seek(t) as a deterministic scene renderer. No accumulated physics, autonomous CSS transitions, or changing random values. Use time-remapping curves and analytic transforms. Use a 20-second periodic timeline with render(0)=render(20). Provide fixed-step access at n/60 for 1200 export frames. Audio is optional and off by default; no browser speech synthesis or autoplay dependency.  QUALITY GATE Inspect eight representative frames. Check that the speech reads in the correct order. Check that structural transformations never destroy a line before the audience can read it. Check the final platform is visibly assembled from earlier elements. Return the complete HTML implementation.
````

## techhalla-498547

@techhalla · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/techhalla-498547) · [post](https://x.com/techhalla/status/2103411244468498547)

````text
You are a world-class motion designer doing a 20.00s kinetic identity bumper for TechHalla — an AI creator known for stealable workflows, not vibes. This piece must feel like the best designer in the room made a street-poster that moves. Showreel stakes: if this is weak, you don’t get hired.

DURATION: exactly 20.00 seconds. LOOPABLE: frame 0 == frame last (position, opacity, cursor if any).
FORMAT: one HTML file, 1080×1080 (square, X-native). 60fps.
PALETTE (strict):
- bg # 0A0A0A
- magenta # FF2BD6
- acid green # B8FF00
- white # F5F5F5 only for primary readable type when needed
No other hues. No gradients on UI chrome. Magenta/green may misregister (print offset) by 2–4px on impact frames only.

TYPE SYSTEM (use all three; never one font for everything):
1) Display / scream: Archivo Black (or equivalent ultra-condensed black) — 1–4 words max
2) Urban grotesque: Syne ExtraBold — secondary hits, stacked lines
3) Mono / “prompt code”: IBM Plex Mono Medium — small labels, timestamps, fake prompt crumbs
Tracking: display −40 to −80; mono +20. Optical kerning. No cute script fonts.

MESSAGE (locked — do not soften, do not add filler slogans):
Beat hits in this exact order:
1. STOP SCROLLING
2. AI VIDEO ISN’T EXPENSIVE
3. BAD PROMPTING IS
4. WORKFLOWS > WISHES
5. STEAL THE PROMPT
6. @ TECHHALLA
Supporting crumbs (mono, ≤18 chars, never full sentences): JSON · H3 · SEEDANCE · 0 KEYFRAMES · MAGNIFIC · COPY/PASTE

NARRATIVE ARC (20s):
0.0–2.5s  COLD OPEN — “STOP SCROLLING” slams in from below with spring overshoot; magenta smear trail; acid green baseline ticks across like a waveform.
2.5–6.5s  THESIS A — “AI VIDEO ISN’T EXPENSIVE” locks to a poster grid (baseline grid 8px). Letters scramble (seeded Fisher–Yates per glyph) then snap on the beat.
6.5–10.5s THESIS B — “BAD PROMPTING IS” replaces it via mask wipe through the letterforms (the outgoing line is the mask). Magenta/green channel split on the cut.
10.5–14.5s PROOF FLASH — rapid kinetic stack: WORKFLOWS > WISHES, then mono crumbs orbit a central block like a terminal. One fake “prompt block” types 3 lines max, then gets crossed by an acid green strikethrough that becomes a underline for STEAL THE PROMPT.
14.5–17.5s BRAND LOCK — @ TECHHALLA centers; display weight. A thick magenta bar and a thin acid green rule form an L-bracket mark (custom, not a logo download).
17.5–20.0s SETTLE / LOOP — hold lockup; micro-breath (scale 1.000→1.012→1.000); last frame == first ready for loop.

CONCRETE TECHNIQUES (required — implement, don’t approximate):
1. seek(t) pure function of time. No CSS transitions. No setInterval. No React state across frames.
2. Springs = closed-form step responses. Stack one spring per target change so motion stays deterministic.
3. Kinetic type: per-glyph spring (y, opacity, blur). Stagger = 1/16 note at 120 BPM (125ms).
4. Print misregistration: on accent frames only, duplicate text layer offset (±2–4px) in magenta and acid green at 40% opacity.
5. Mask reveal: destination text revealed by animating a path mask derived from the outgoing word’s outlines.
6. Camera: one orthographic camera; only punch-in (1.0→1.08) and horizontal smash-pans timed to beats — never random drift.
7. Motion blur: render 4 subframes per frame, blend (tmix-style).
8. Beat grid: 120 BPM, downbeat at t=0. Something must land on every beat for the first 16 beats; after that, every other beat is ok.
9. Pre-pass: before full render, export one still per major beat (8 frames). Fix cramped type, orphan words, low contrast — then render.

BANNED:
Generic AI clichés (brains, robots, neural nets, sparkles), soft gradients, bouncy cartoon easing, particle explosions, stock “futuristic HUD”, long paragraphs, narrator essay energy, Canva-deck energy, extra slogans beyond the locked message, purple/blue neon, glassmorphism.

If Astra already blew our minds… Opus 5.5 is a monster 😱
````

## gdgtify-393073

@Gdgtify ·  · [watch](https://x.com/Gdgtify/status/2107054188836393073) · [post](https://x.com/Gdgtify/status/2107054188836393073)

````text
Create a kinetic mathematical proof titled “THERE IS NO LAST PRIME.”
Stage Euclid’s argument as a beautiful mechanical inspection system. Typography becomes engraved number wheels, multiplication belts, and remainder indicators.
The mechanism must demonstrate the proof rather than decorate a narrated explanation.
DELIVERABLE
One self-contained HTML file.
1080×1080.
20.00-second loop.
Deterministic 60fps rendering.
Use SVG and/or Canvas.
No external runtime assets.
PALETTE
Porcelain # F0EEE6.
Graphite #222522.
Industrial green # 416B53.
Warning orange # E78636.
TYPE
Tabular monospace for all calculations.
Heavy geometric grotesque for declarations.
Small technical serif for the final logical statement.
Use disciplined spacing and large, readable numerals.
LOCKED COPY
SUPPOSE THE LIST ENDS.
MULTIPLY EVERY PRIME ON IT.
ADD ONE.
EVERY LISTED PRIME LEAVES REMAINDER 1.
A PRIME FACTOR IS MISSING.
THERE IS NO LAST PRIME.
CENTRAL EXAMPLE
Assumed list:
2, 3, 5, 7, 11, 13
Product:
30030
Product plus one:
30031
Factorization:
30031 = 59 × 509
Both factors are absent from the assumed list.
IMPORTANT LOGIC
Do not claim that multiplying primes and adding one always produces a prime.
The constructed number may be composite.
Its prime factors cannot be any prime on the assumed complete list.
The numerical example illustrates the general contradiction.
STORYBOARD
0.00–3.00
SUPPOSE THE LIST ENDS.
Six engraved prime wheels lock into a finite inspection rack.
A physical end-stop closes after 13.
The end-stop makes the claim of completeness visible.
3.00–6.50
MULTIPLY EVERY PRIME ON IT.
A belt couples all six wheels.
Show a readable multiplication expression:
2 × 3 × 5 × 7 × 11 × 13 = 30030.
Use rolling numerals only during movement; settle the final value sharply.
6.50–8.50
ADD ONE.
A single orange unit enters the mechanism.
It advances the output from 30030 to 30031.
Make this one-unit change the decisive visual event.
8.50–12.50
EVERY LISTED PRIME LEAVES REMAINDER 1.
The output passes through six division gates.
Each gate is labelled with its prime.
Each produces the same visible remainder: 1.
Arrange the six completed results so the audience can compare them simultaneously.
12.50–15.50
The output opens as a labelled mechanical casing.
Inside, reveal:
59 × 509.
These factors cannot fit into the supposedly complete rack.
The end-stop is forced outward by the new factor cards.
15.50–18.00
A PRIME FACTOR IS MISSING.
Then:
THERE IS NO LAST PRIME.
Hold the general statement above the opened rack.
Include the compact general form:
N = p₁p₂…pₖ + 1.
N mod pᵢ = 1.
18.00–20.00
A fresh inspection plate slides over the mechanism.
Its engraved edge becomes the original end-stop.
Reset the hidden wheels.
Reveal the opening rack at the exact initial position.
REQUIRED MOTION
Every mechanical action must correspond to an operation in the proof.
Use linked rota
````

## thewevr-681887

@thewevr ·  · [watch](https://x.com/thewevr/status/2106774417732681887) · [post](https://x.com/thewevr/status/2106774417732681887)

````text
Make a complete music video for the song in this folder, with all
visuals drawn and animated in JavaScript. Use the entire song.

SETUP
Inspect this folder and identify the song and any lyrics or reference
files. Preserve my original files unchanged.

Use this existing animation starter:
https://t.co/oN3A7ZZyEl

Clone it into a new ./video subfolder, unless an existing copy is
already present. Do not overwrite existing work or clone into the
nonempty project root.

Read its README.md and ANIMATION_GUIDE.md completely, then inspect
render.mjs and the project configuration. Use the existing rendering
machinery rather than inventing a replacement.

Check Node.js, Chrome, and FFmpeg. Inspect the package configuration
and install the project dependencies. Ask before making system-wide
changes or downloading large additional tools.

Do not use fal, external image/video generation, paid APIs, or the
hybrid music-video plugin. All finished visuals must be code-drawn.

CREATIVE DIRECTION
Create a cohesive, visually imaginative animated music video with a
handmade, papery, illustrated feel. Express the song's meaning through
scenes, characters, visual metaphors, and purposeful transitions.
Establish an engaging opening and develop recurring visual motifs.
Do not make a slideshow, a generic audio visualizer, or one animation
loop repeated for the entire song. Design characters appropriate to
this song rather than automatically using the starter's mascot.

MUSIC AND TIMING
Use the supplied recording as the continuous master soundtrack.
Do not remix, replace, speed up, or shorten it.

Measure its duration and use available local audio-analysis tools to
identify musical sections and likely beat/accent timings. Record these
in a shared timeline and drive animation from that timeline.

Use supplied lyrics as authoritative. If lyrics are missing, use a
local transcription tool only if available, flag uncertain words, and
do not invent lyrics. Continue with non-lyric visuals where necessary.

When verified lyrics are available, use expressive, readable lyric
animation where it strengthens the scene. This explicitly overrides
the starter's default preference against lettering.

PRODUCTION
Write STORYBOARD.md with timed scenes covering the complete recording.
Save the project brief and rerender instructions in CLAUDE.md.

Then build the video. Make reasonable creative decisions and continue
without stopping for approval at every scene.

Test a few representative frames and a short section before the full
render. Inspect the resulting images and frame sequences, fix visible
defects, and keep the animation practical for this computer.

Use efficient code-drawn textures if expensive watercolor effects
make rendering impractical.

DELIVERY
Render the complete video
````

## majidmanzarpour-927543

@majidmanzarpour · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/majidmanzarpour-927543) · [post](https://x.com/majidmanzarpour/status/2102476258948927543)

````text
Create a single self-contained HTML file that renders an animated pixel art wizard casting a spell, using vanilla JavaScript and Canvas 2D. No external assets, libraries, or network requests.

RENDERING
- Draw everything to an offscreen canvas at a fixed logical resolution of 128x96, then blit to a fullscreen display canvas scaled by the largest integer factor that fits the window, centered, with imageSmoothingEnabled = false and CSS image-rendering: pixelated.
- All drawing snaps to integer coordinates on the logical canvas. No sub-pixel positions, anti-aliasing, gradients, or shadowBlur.
- Fixed palette of ~24 hex colors: deep blues/purples for night sky, warm robe tones, 3-4 bright magic colors. Every pixel comes from this palette.

CHARACTER
- Build the wizard procedurally from filled rects and pixel runs, ~24x32 logical pixels: pointed hat with a bend, long beard, two-shade robe with darker outline, staff with a gem at the tip.
- Parameterize the pose (staff angle, arm raise, head tilt, robe sway). Animate parameters smoothly, then quantize to the pixel grid each frame so motion reads at an 8-12 fps pixel animation feel even though the loop runs at 60fps.

ANIMATION
- Looping state machine: IDLE (2-frame bob, beard sway) -> CHARGE (staff raises, gem flickers, sparks spiral inward) -> CAST (bright burst, projectile fires across the scene, 1-2 pixel screen shake) -> RECOVER (settle back). Ease pose parameters between keyframes.
- Pooled allocation-free particle system: preallocate and reuse. Sparks orbit the gem during CHARGE, explode outward on CAST, each particle stepping its palette index from white to magic color to dark before despawn. Snap particle positions to the grid when drawing.
- Fixed 60hz timestep update with rAF rendering. Zero object allocation inside the loop.

SCENE
- Minimal background: dark sky, a few twinkling 1px stars, moon, stone floor line. Character silhouette must read clearly.
- Subtle 1px rim light on the wizard from the gem, brightening during CHARGE and CAST.

QUALITY BAR
- Crisp pixels at any window size, seamless loop, stable 60fps, readable silhouette. Should look like a polished 16-bit sprite animation, not vector shapes scaled down.
````

## doubleunplussed-181894

@doubleunplussed · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/doubleunplussed-181894) · [post](https://x.com/doubleunplussed/status/2103697580421181894)

````text
I'd like you to make a music video in a similar style to this one:

https://github.com/JohnHeibel/PDoomVideo

To this song:

https://youtu.be/cobZuBii0Z0?si=ada6wxomeJbo-LRl

Don't feel the need to represent everything in the lyrics literally - feel free to include relevant references to concepts, events, and lore in the video, even if obscure (especially if obscure). E.g. when the lyrics say "when they say they're just predicting tokens...", you might depict a "stochastic parrot". That one's not particularly obscure but is the kind of thing I mean. Instead of depicting like, literally predicting tokens (though you might do that too. Use your judgement! The video should be fun to watch for someone well steeped in AI and AI safety lore and discourse, and who Wille wcognise relevant pop culture and literary or historical references)

I don't know how this ultimately results in a video file - I know the linked repo animates a video with JavaScript or something - but I ultimately want a rendered video file.

Feel free to choose your tools, be creative, and exercise your own taste.

This repo "fdsgdg" appears to be have been accidentally created, but it's empty and we can use it for this, I can rename it afterwards.

Also, clip the final two beats from the audio.rught at the end, after "then why does it talk back" they are after the song has finished and sound bad.

Credit the song to Suno and whatever Claude Opus model was the latest at the time of the YouTube upload, as prompted by Andy Masely (Andy printed Claude to write the lyrics, and Suno for the music), and credit the video to yourself.

And have fun!

----

A style change - don't make Dr. Null's mouth wobble with the lyrics as if he's singing, it doesn't
  actually look like he's singing, just that the curcle of his mouth is jittery. Best to just not
  make him be singing. Make him just have appropriate expressions for the scenes, and not be singing
  the song.

----

Dr. Null's arms look a bit unnatural in many scenes - I think he's supposed to be holding
  his hand on his face in shock or something, but it looks like it is a mistake. Can you make it look
  more natural? If you do so and like the result, re-render.
````

## jake11moran-414633

@jake11moran · canvas, svg, gsap, ai-image · [watch](https://skillry.dev/ai-videos/opus-5-5/jake11moran-414633) · [post](https://x.com/jake11moran/status/2103237884564414633)

````text
Using HyperFrames, make a hype teaser for the product in this post - [link]. Landscape, around 27 seconds. Match the product UI, wallpaper and copy from the post's video 

Motion should feel slow and polished - one continuous camera over one Mac desktop, no hard cuts. Camera pushes, pulls and pans run like 1.5 to 3 seconds on gentle ease-in-out curves, nothing snappy - aim for half the speed you'd default to. Add motion blur on fast moves and a light film grain finish. Use an oversized macOS cursor. No audio. All on-screen copy lowercase like the post.

1. Open on a big centered line - "in the AI era, the hard part is" - entering word by word from the right with an orange colorama text wipe over it (the `colorama-wipe` registry component). Hold it about a second, then scale it down into place above a spinning list.
2. The list rotates through 30 hard things about working in the AI era - spending tokens wisely, picking the right model, managing context windows, etc - each with a real app icon. Go fast, it's not meant to be read, then land slowly on "managing your desktop". 0.2s after it lands a question mark pops on after it.
3. Pull the camera back to reveal the Mac desktop as windows pile in on top of each other, arriving from behind the camera - Claude, ChatGPT, Grok, Linear, Chrome, Spotify, Slack and Claude Code in a terminal. Build these as accurate recreations of the real apps with real icons. 
4. Push back in so the windows fly past the camera, back to text - "don't make your browser / one of them".
5. Pan up to a really tight framing of just the notch and the top of the wallpaper. A cursor comes up and hovers - the notch morphs into a pill with the name "NotchBrowser", then opens into the browser panel exactly like in the video. 
6. Click through the tabs like the video does, then click the collapse chevron so the panel retracts into the notch.
7. End on a checklist of the post's claims with rings and ticks drawing on
````

## 0xkarmi-129839

@0xKarmi ·  · [watch](https://x.com/0xKarmi/status/2108495927988129839) · [post](https://x.com/0xKarmi/status/2108495927988129839)

````text
Picture a butterfly with no memory of its last wingbeat.
Ask it for frame 720 and you get frame 0, pixel for pixel.

720 frames. 12 seconds. 6 counters. All at 0.

Opus 5.5 can't hand over a video file, one builder says. He made that gap the method.

> STAGE - one fixed 1000x1080 canvas, fonts baked in
> RENDER - a windowless engine calls draw(f) once per frame number
> ENCODE - ffmpeg writes H.264, pixel aspect ratio declared
> CHECK - three passes after every build

By his account the model writes only the first, a drawing program. The other three get reused.

Each picture depends on its number alone: no clock, no timer, no dice that land differently each run.

So any frame renders the same every time. A fix is a small edit and a re-render.

The sample loop is 720 pictures in 12 seconds. A hand animator at 12 drawings a second would need 144.

The smoke test plays one loop unseen and counts six kinds of defect, from script errors to text on text.
Six yes/no gates before a human looks.

The seam check puts frame 0 against frame 720. One changed pixel means some motion isn't periodic.

He reports a last render of 1,820 frames with six zeros. At the sample's 60 fps that would be about half a minute.

Let one frame read a clock and the same number stops giving the same picture.

We drew the rule as an X-ray butterfly, its wingbeat computed from the frame number ↓
````

## pluvio9yte-662953

@Pluvio9yte ·  · [watch](https://x.com/Pluvio9yte/status/2107087191738662953) · [post](https://x.com/Pluvio9yte/status/2107087191738662953)

````text
公开我的制作方案，发给Opus5.5就能用

  1. 选素材

  三个标准，直接决定成败：

  - 主体完整：人物或物体全身入画。细节会在加工中丢失，观众靠轮廓认东西，特写会变成一团。
  - 背景干净：纯色、雪地、天空都行，主体和背景容易分开。
  - 有明确的动作瞬间：打击、起跳、落地、转身。这些是后面做特效的支点。

  来源可以是自己拍的、视频模型生成的，或有授权的现成片段。

  2. 拆素材

  从每一帧提取三类信息：

  - 颜色：原画面。
  - 远近：每个位置离镜头多远，用现成的深度估计模型算。
  - 主体范围：哪里是主体、哪里是背景。

  另外找出镜头切换发生在哪些时刻。这一步的要点是保持稳定：远近和主体范围要在同一个镜头内统一处理，否则播放起来会抖。

  3. 定"粒子"和"样式"

  先决定用什么东西来重建画面：圆点、方块、文字、线条都可以。

  然后设计几种样式。每种样式其实只是三条规则的不同组合：

  - 放在哪：整个画面都放，还是只放在主体上。
  - 多大：统一大小，还是跟着明暗、远近变化。
  - 什么颜色：用原画的颜色，还是统一用一两种颜色。

  再加一个开关：是平铺在一个面上，还是按远近推进三维空间。推进去之后镜头才能环绕。

  准备四到六种差异明显的样式就够用。粒子的疏密需要自己看着调：太大认不出内容，太小又和原片没区别。

  4. 找节奏

  - 定速度：选定音乐的速度，把时间切成等长的小格。让一格正好是整数帧，后面所有切换都好对齐。
  - 找动作瞬间：结合"声音突然变响"和"画面突然变动"两个信号，找出素材里的打击点。
  - 准备音乐：可以用现成的曲子并分析出它的拍子，也可以按定好的速度合成一段，并在打击点上加重音。

  5. 编排

  做一张时间表，写明每一格用哪种样式、什么配色、镜头在哪。这张表单独存放，以后调节奏只改它。

  编排的四条原则：

  - 开头交代变化：先给原画面，再过渡到粒子，让观众看懂发生了什么。
  - 快慢交替：一直快会麻木，中间要有一段明显慢下来的部分。
  - 配色要撞：相邻两格的颜色和样式反差越大，切换越有力。
  - 结尾要有收束：比如粒子越来越大直到变成色块，或者回到原画面。

  6. 关键时刻的反馈

  在打击点上叠加短促的反应，按轻重分级：

  - 每一次都有的轻反馈：粒子变形一下、镜头顶一下。
  - 较重时才有的中反馈：一部分粒子朝镜头弹开。
  - 最重的一两次才用的大反馈：时间静止，镜头环绕。

  原则是弱而短。只动一部分粒子，几帧内结束，否则画面炸成一片，观众就看不清主体在做什么了。

  贯穿全程的工作方法

  - 先小样后全片：每做完一个环节，先渲染几帧看效果，确认了再往下。全片只在最后渲染。
  - 拿不准的参数一次出一排：比如疏密，让 AI 同时出五六个档位并排放，你来挑。
  - 改哪里渲哪里：调整某一段时只重新渲染那一段。
  - 让 AI 自己看图：每一步都要求它把渲染结果打开看一遍再汇报。
  - 所有随机都固定：保证同样的设置每次渲染结果一致，否则没法逐步修改。
````

## notdwd-766641

@notdwd ·  · [watch](https://x.com/notdwd/status/2105031774904766641) · [post](https://x.com/notdwd/status/2105031774904766641)

````text
Make a 12s motion video in code (1920x1080, 30fps, one HTML file drawing every frame from a single seek(t) function, rendered with Playwright + ffmpeg, with original synthesized sound).

Story: a dark prompt pill on an off-white page types "make a launch video" with a real keystroke rhythm → enter, the button flashes orange and the pill slides up → a 12-frame filmstrip stamps in left to right, one frame per beat at 120 BPM; each frame shows one pose of an orange ball's bounce (squash on contact, stretch mid-air, real arcs) → a playhead sweeps the strip while a big viewer above plays the poses as a flipbook, twice, faster the second time → the strip slides away, "every frame is code." fills the screen, and the ball arcs over and lands as the period.

Rules: arrive fast, land soft (cover 12–19% of the remaining distance per frame); nothing ever freezes (slow push on every hold); stagger 2–4 frames; blur only on fast moves; big and readable on a phone; off-white, ink and one orange only. Sound: a tick per key, a click on enter, a rising note per frame stamp, a thump when the ball lands.

Show me 5 stills first (typing, strip half-built, flipbook, headline, last frame), critique them like a harsh motion director, fix the 3 worst problems, then render.
````

## eric-khun-667455

@eric_khun · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/eric-khun-667455) · [post](https://x.com/eric_khun/status/2103112385380667455)

````text
I want you to create a "Happy Mid-Autumn Festival" video in hand drawn canvas animation style. You must use the attached Taiwan black bear as the main character representing Taiwan: flat black silhouette, round ears with grey insides, big round white-ringed eyes, white round muzzle with a small black nose and smile, and the white V moon mark on its chest. Keep it recognizable as that exact character. The character will have adventures, fast cuts, zooms, animations going all out in the hand drawn style. But WOW the audience and research how Taiwan celebrates Mid-Autumn to include in this video: outdoor barbecue with family and friends over the long weekend (a tradition born from a 1980s soy sauce ad), sharing mooncakes, pomelo rind hats, and moon gazing. Make it unconventional, showing the true spirit of a Taiwanese Mid-Autumn night. Use a Taiwanese style font, make it almost Taiwan black bear branding.  

if there is any text , write in traditional chinese and english
Get the right assets, plan it out, draft and render to give me an MP4. No skills, No MCP.  16:9 at high res, 30 seconds max, aim to reduce file size limit
````

## tanabe-fragm-706979

@tanabe_fragm ·  · [watch](https://x.com/tanabe_fragm/status/2103802156675706979) · [post](https://x.com/tanabe_fragm/status/2103802156675706979)

````text
# あなたの役割
あなたは一流の映像演出家（モーションデザイナー）です。
採用担当者が15秒見ただけで「この人に仕事を頼みたい」と思う、自己紹介用の映像を作ってください。
主役はあなた自身（Claude）です。

# 作るもの
- HTML・CSS・JavaScriptだけで完結する、1つのHTMLファイル
- 外部の画像や動画は使わない。図形・文字・粒子はすべてコードで描く（フォントはGoogle Fontsのみ可）
- 画面は16:9、1920×1080を基準にし、ウィンドウの大きさに合わせて縮小表示
- 長さはちょうど15秒。最後に「もう一度再生」ボタンを出す
- すべての動きを「経過時間」1本で管理し、requestAnimationFrameで60fpsで動かす
- 再生ボタンを押すと、Web Audio APIで合成した拍と効果音が動きにぴったり合って鳴る

# 進め方（この順で必ず行う）
1. 考え方を一文で決める（例：「1本の線が、あらゆる形に生まれ変わる」）
2. 色は3〜4色、書体は2種類までに絞り、理由を一行で書く
3. 0.5秒刻みの絵コンテを表で示す（時間／画面で起きること／使う技法／狙い）
4. 実装する
5. 下の「合格ライン」で自己点検し、足りない点を直してから出す

# 構成の目安
- 0〜2秒：つかみ。最初の0.5秒で目を奪う
- 2〜10秒：技の見せ場。1.5〜2秒ごとに違う技法へ切り替える
- 10〜13秒：最も密度の高い盛り上がり
- 13〜15秒：名前「Claude」がきれいに決まって終わる

# 必ず使う技法（最低6つ）
- 文字の動き（1文字ずつ登場、分解して組み直す）
- 図形の変形（丸が四角に、線が文字に、など）
- 切り抜き（マスク）を使った場面転換
- 奥行き（視差、立体的な回転）
- 粒子の集合と拡散
- 数字の数え上げや、線が描かれていく表現

# 合格ライン
- 等速の動きはゼロ。すべての動きに緩急をつける（入りは速く、止まりは柔らかく、ばねの揺れも使う）
- 場面をまたぐ動きは重ねる。前の動きが終わる前に次が始まり、切れ目を感じさせない
- 主要な動きは0.5秒ごとの拍（120BPM相当）にそろえる
- 見せ場の直前に0.3〜0.5秒の「溜め」を置き、強弱を作る
- どの瞬間で一時停止しても、1枚の絵として美しく成立する
- ありがちな表現は避ける（全部フェードイン、虹色の色使い、意味のない回転）

# 最後に
完成したファイルと、絵コンテの表を出してください。
説明は3行以内で十分です。
````

## pound75423-464968

@pound75423 · canvas, css · [watch](https://skillry.dev/ai-videos/opus-5-5/pound75423-464968) · [post](https://x.com/pound75423/status/2103722556918464968)

````text
添付した楽曲とキャラクター画像を使って、「サイケデリック・グリッチ系」のアニメーション MV を作ってください。

【制作方法】
HTML Canvas でアニメーションを書き、Playwright で 1 フレームずつキャプチャし、ffmpeg で音声と合成して MP4 を出力してください（1280×720、30fps、30MB 以内）。
AI 動画生成は使わず、すべてプログラムによるアニメーションで作ってください。

【前処理】
1. キャラクター画像はすべて背景を透過し、白いステッカー風の縁取りと薄い影をつける。
2. 楽曲を解析する：BPM、最初の拍の位置、各小節（4 拍）の頭、
   各セクションのエネルギーの高低（イントロ／A メロ／サビ／落ちる部分）を求める。

【編集ルール】
- 1 拍ごとにカットを切り替える。カットはランダムにローテーション：全身、
  バストアップ、目の超アップ、2 ポーズ並び、同じポーズの 5 連（それぞれ色相違い）、シーン画像。
- 隣り合う 2 拍で同じポーズを使わない。
- エネルギーが低い箇所はシーン画像や静かなカットにして、ひと息つかせる。
- エフェクトの強さはセクションに合わせる：イントロ約 40%、A メロ 70%、サビ 100%。

【エフェクト】
1. 白フラッシュ：毎拍フラッシュしてすぐ消える。小節の 1 拍目が一番強い。
2. 色相の流れ：背景は流れ続ける虹色パターン（同心円スパイラル、回転するカラーホイール、
   溶ける虹の波、ストライプ、白黒チェッカー）。サビではキャラクターごと画面全体を hue-rotate する。
3. 画面の引き裂き：拍が落ちた瞬間に横方向の帯状ずれ＋RGB 3 色分離をかけ、
   次の拍までに元に戻す。キャラクターがずっとぼやけたままにならないように。
4. 万華鏡：サビでは 1 小節おきに、画面を 8～12 枚の鏡像の扇形に分けてゆっくり回転させる。
5. 小節ごとの大文字：小節の頭で画面中央に巨大な文字を約 0.4 秒フラッシュさせる。
   合成モードは反転（difference）、縁取りは虹色。
   大文字の内容：【ここに使いたい文字を書く、または「歌詞からキーワードを選んで」と書く】

【その他】
- 左上に小さくタイトル【名前】、右上に【日付】、右下に小節数を表示。
- フィルムグレインと走査線を少し加える。冒頭は黒からフェードイン、最後はフェードアウト。
- 本番出力の前に、各セクションのスクリーンショット一覧を見せて確認させてください。
````

## zhu185178-255661

@zhu185178 ·  · [watch](https://x.com/zhu185178/status/2103757767727255661) · [post](https://x.com/zhu185178/status/2103757767727255661)

````text
帮我做一条 30 秒的 2D 动画分镜预演短片《雨站》，要标杆级画质。不装 HyperFrames/Remotion，全部自己写代码（Python + ffmpeg）完成。

故事（24fps，2.39:1，4K）：雨夜高架站台。她穿米色风衣、撑透明伞，站在近侧站台；对面路灯下站着他，穿深灰长大衣、围围巾。
1. 0–6.4s 透明伞雨珠特写 → 后拉，焦点移到对面露出他（过肩镜头）
2. 6.4–9.4s 他的中近景：低头 → 抬头看向画左
3. 9.4–12.4s 她的正面近景：眨眼 → 认出他；远处传来鸣笛
4. 12.4–17s 远景：车头灯光先到，5 节列车驶过；第一个车厢缝隙里他还在，第二个已经空了
5. 17–18.8s 她含泪的近景，车窗光带扫过她的脸，头发被风吹起
6. 18.8–22.4s 尾灯远去，对面站台空了；他那盏灯闪几下后熄灭
7. 22.4–28.6s 她的背影，焦点从空站台拉回她；身后脚步声，一把黑伞遮到她头顶，她回头看向镜头；男声“好久不见。”，配字幕
8. 28.6–30s 黑场片名“雨站 / RAIN STATION”

做法：
- 原画：用GPT Image 2.5 画远景、他、她、列车（头车/中车/尾车）。人物一律用纯绿 #00FF00 背景，自己抠像（带参考图要透明背景会得到假棋盘格）。同一角色的各个姿态放在同一个会话里，以基准图为参考连续编辑；换姿态时只合成变化的区域。
- 画质：用 Real-ESRGAN x4plus anime 6B（HF 上的 safetensors 版，自己写 RRDBNet，跑在 MPS 上）把全部原画放大 4 倍；用 Depth Anything V2 估算远景深度，做逐像素视差。
- 渲染：自己写 2.5D 合成器。各层按真实深度摆放，针孔相机按真实焦距运动；做圆形焦外光斑、焦点转移、3D 雨丝、列车运动模糊、体积光、泛光和胶片光晕、细颗粒、调色。人物用网格变形做呼吸、风吹发梢、伞抖，关键姿态按日式“一拍二”切换。4K 超采样，逐帧缓存到磁盘，分 3 个进程按时间段并行（16GB 内存）。
- 声音：Mixkit 真实音效（雨、伞面雨声、列车、鸣笛、脚步）；按剧情节点写谱，用 Logic/GarageBand 自带的施坦威钢琴和弦乐采样渲染；台词用 Kokoro 中文男声；按镜头做声音远近，响度 -16 LUFS。
- 每一步都渲染预览帧、拼成图自检，修好再出片。交付 4K 母版和 1080p 分享版。
````

## wani-shola-459278

@wani_shola · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/wani-shola-459278) · [post](https://x.com/wani_shola/status/2103769906638459278)

````text
Make a showreel-style motion graphics video for my portfolio website, 
http://
sholajegede.com, using Remotion. It should show what I do as a developer relations engineer, like a showreel for my résumé.

- Use as much of the real website as possible: capture the pages and sections in a browser (home, Ask, package pages, Hire, mobile view, dark mode) and animate them inside browser and phone frames.
- Show the site's chat answering real questions about my work, with the questions and answers large and bold. Use only facts and numbers that are on the site.
- Follow premium brand rules: three colours and the site's own fonts, one idea per shot, key objects centred, space to breathe, eased motion only, smooth transitions instead of hard cuts, and a rhythm that speeds up and slows down with the story.
- Add music at about 120 BPM (elite, kinetic, sophisticated) and cut every scene on the beat. No extra sound effects.
- 1920×1080, about 90 to 100 seconds, ending on the website and my contact email.
````

## superalesha-970412

@superalesha ·  · [watch](https://x.com/superalesha/status/2103052154931970412) · [post](https://x.com/superalesha/status/2103052154931970412)

````text
make an animated short that felt like Hedgehog in the Fog. I didn’t want to copy Yuri Norstein’s film, so we went with a new story.

It runs for 6.5 minutes. All 9363 frames are drawn by JavaScript code written by Opus. No video or image generation models, just canvas.

It follows a little mouse in a red scarf. Her grandfather, an old mole, is out fishing when fog rolls over the lake. She goes looking for him with a walnut-shell lantern and a sleeping firefly inside. They have a secret knock to help them find each other: short, short, long. It means "I’m here".

Norstein used paper cutouts on layers of glass, filmed frame by frame. I wanted some of that paper texture to come through in code. So the scenes use different styles: torn-paper collage, chalk on black paper, tissue paper underwater. There’s even sand on a light table and a pop-up book.

Opus wrote the music too. It found Steinway piano samples in my Logic library and used Python to compose the score around the rhythm of that knock.
````

## imryven-495965

@imryven ·  · [watch](https://x.com/imryven/status/2105719735438495965) · [post](https://x.com/imryven/status/2105719735438495965)

````text
Rebuild my Claude Code setup around this tree:

1. Look in ~/.claude/agents and .claude/agents for subagents that already cover explorer, worker and researcher. Draft new ones only for roles that are missing. Set each to model: opus, effort: medium. If an existing subagent is pinned to a different model, list it, don't touch it.

2. Set the main session's effortLevel to high in ~/.claude/settings.json, and set advisorModel to fable.

3. Check for anything disabling the advisor: CLAUDE_CODE_DISABLE_ADVISOR_TOOL, DISABLE_TELEMETRY, any variable blocking feature-flag fetches, and CLAUDE_CODE_EFFORT_LEVEL, which overrides subagent effort. Report what you find. Change nothing yet.

4. Add one line to ~/.claude/CLAUDE.md: consult the advisor before a large plan, when an error repeats, and before marking a long task done.

Show every change as a diff first. Don't touch anything until I say go.
````

## adrianduta96-992248

@adrianduta96 ·  · [watch](https://x.com/adrianduta96/status/2109187815195992248) · [post](https://x.com/adrianduta96/status/2109187815195992248)

````text
Make a 20-second 16:9 motion graphics video that tells a little story with sound. For the first 12 seconds there is no sound at all: on a warm paper background, the words "make it catchy." type themselves out, then the letters fall apart and build a colorful music machine piece by piece: ramps, spinning gears, a row of blocks like piano keys and a big drum. It ends with a ball waiting at the top. At 12 seconds the ball drops and the machine comes alive. Every block it hits plays a note, the drum kicks, the gears tick in rhythm, and it all becomes a catchy 4-second beat. Then everything snaps into the words "ONE PROMPT" on a final hit, followed by silence. Use bold geometric shapes in ink black, cobalt blue and sunflower yellow, and make every sound match a movement you can see. Go all out and render the final MP4.
````

## chrisjdimarco-808196

@chrisjdimarco · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/chrisjdimarco-808196) · [post](https://x.com/chrisjdimarco/status/2103606498928808196)

````text
make a dynamic 60-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a résumé. go all out. and make the theme and content be about the importance of an informed public in a democracy, the importance of not having corrupted officials and greedy corporations, we need to remember what adam smith said about responsible capitalism or whatever (you can rewrite all of what im saying to sound so much smarter and better) and why facsism and croney capitalism can always reer its ugly head if we aren’t vigilant and always remember the important threats to prosperity and freedom which is the ruling classes need for more control, power and consolidation at the expense of others because they believe they know better.
````

## fornyapayzeka-135914

@FornYapayZeka · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/fornyapayzeka-135914) · [post](https://x.com/FornYapayZeka/status/2102971287224135914)

````text
Yapabileceğin en etkileyici patlama efektini ve onu taşıyacak özgün sahneyi üret. Ölçeği, ortamı ve görsel dili sen seç. Patlamanın başlangıcı, kuvvetin yayılması ve ardında bıraktığı değişim izlenebilir olsun; tek karelik parlama veya rastgele parçacık yağmuru yeterli değil. Kullanıcı bunu tekrar başlatabilsin ve etkisini farklı açıdan görebilsin.

Yaratıcı seçimler senin: sahne, sanat yönü, kamera, mekanik, teknoloji ve etkileşimi önceden belirlenmiş sıradan kalıplara sıkıştırma. İlk akla gelen sıradan web demosuyla yetinme: önce kendi alanında birkaç fikri kısaca tart, videoda en güçlü görünecek özgün olanı seç, sonra onu çalışan bir ürüne dönüştür. Konuyu olduğundan kolay gösteren dekoratif taklit kabul edilmez. Sinematik ve estetik seçimler sonuçta görülsün.
````

## daniel-mac8-306214

@daniel_mac8 · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/daniel-mac8-306214) · [post](https://x.com/daniel_mac8/status/2103824976713306214)

````text
I want to try something different here. You should act as a  world-class animator and create an animation to go along with an  X post that talks about how Ultra Code and Claude Code are now  much more relevant due to the efficiency of Opus 5.5. You can use it without annihilating your usage limits 

the style of the video here
/Users/danielmcateer/Downloads/jvnZ3SyyxxajVatp.mp4

What I had in mind was start with Claude Code in the terminal from the first attached video, with me navigating to the 'ultracode' reasoning effort, then exploding into a scene where the Claude icon characters similar to what's in the second video are shooting an action video and it's representing using Claude Code dynamic workflows editing a video.
````

## egawa-ai-design-092323

@egawa_AI_design ·  · [watch](https://x.com/egawa_AI_design/status/2103760245764092323) · [post](https://x.com/egawa_AI_design/status/2103760245764092323)

````text
Create a 15-second motion graphics video for barber shop recruitment.
- 1920×1080 / 60fps
- Build with HTML + GSAP, allowing drawing at any time via seek(t)
- Capture frame by frame with Playwright, convert to mp4 with ffmpeg
- Synthesize BGM and sound effects with Python, aligning with cut transitions
- Use photos from assets/

Structure:
① It's okay even if you've been out of work for 20 years
② No cuts / Leave at 5 PM / Closed Sundays
③ You can continue because it specializes in gray hair dyeing
④ Become a barber again
⑤ Store name - Recruiting barbers - Consult via LINE

Tone: Deep green x Gold, Mincho font, calm and adult-oriented
Finish: Create a list of frames at 0.25-second intervals, review and fix yourself
````

## fornyapayzeka-795431

@FornYapayZeka · threejs, shader, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/fornyapayzeka-795431) · [post](https://x.com/FornYapayZeka/status/2102888241443795431)

````text
Yapabileceğin en etkileyici havai fişek veya ışıklı parçacık gösterisini üret. Ortamı ve sanat yönünü sen seç. Tek tip küçük patlamaları çoğaltmak yerine ritmi, derinliği, ışığın çevreye etkisini ve unutulmaz bir final anını tasarla. Gösteri canlı çalışsın; kullanıcı finali tekrar oynatabilsin.

Yaratıcı seçimler senin: sahne, sanat yönü, kamera, mekanik, teknoloji ve etkileşimi önceden belirlenmiş sıradan kalıplara sıkıştırma. İlk akla gelen sıradan web demosuyla yetinme: önce kendi alanında birkaç fikri kısaca tart, videoda en güçlü görünecek özgün olanı seç, sonra onu çalışan bir ürüne dönüştür. Konuyu olduğundan kolay gösteren dekoratif taklit kabul edilmez. Sinematik ve estetik seçimler sonuçta görülsün.
````

## deeprajo1-623150

@deeprajO1 ·  · [watch](https://x.com/deeprajO1/status/2104490501340623150) · [post](https://x.com/deeprajO1/status/2104490501340623150)

````text
Create a dynamic 30sec launch vdo for your site url here. Make it feel like a high-end motion designer’s resume/showreel piece, bold, cinematic, polished, and visually impressive. Showcase the website’s identity, UI, features, and overall concept through fast-paced motion graphics, smooth transitions, kinetic typography, creative camera movements, and strong visual storytelling.

Go all out with the motion design. Make every second feel intentional and demonstrate exceptional creativity, timing, composition, and animation quality. The final video should feel like a professional product launch + motion design showreel, not a generic website promo.
````

## dale-vaz-879074

@dale_vaz · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/dale-vaz-879074) · [post](https://x.com/dale_vaz/status/2103290592679879074)

````text
create a self contained aesthetically pleasing, breathtaking animation of the Sahi Trading Terminal. it should start with a single dot on a black screen and then have multiple windows show up on the screen such as Charts, Positons , Option Chain, Watchlist. And zoom into and out at multiple scales. Finally the camera zooms out to make the desktop look like a point in space. And then it zooms back in to reveal a mobile screen in landscape mode with a chart in one half and an option chain in another. The video ends in Sjngle Screen Trading on SAHI
use javascript for it. be detailed and accurate. it should be visually stunning
0:46
````

## ho-ba-761062

@HO_BA · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ho-ba-761062) · [post](https://x.com/HO_BA/status/2103845264649761062)

````text
Make a dynamic 30-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a résumé. go all out.  Make it a video to introduce 
https://
mdfor.dev Use actual product screenshot/logo/assets Must have music and motion must match the music  Do it like a real professional production video, not like a demo or prototype. Add more animation and motion design; avoid using screenshots as raw; instead, break them down into components/icons so we can animate those too. Make the motions more juicy. Use the best motion design techniques you can.
````

## groundcontrol-230877

@GroundControl · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/groundcontrol-230877) · [post](https://x.com/GroundControl/status/2103678647777230877)

````text
All right, this is an empty repo. Make me a 3-minute animated visualization using JavaScript, or you can do it in TypeScript if you want, about Japan's hot weather in 2026. Pull some online data to see why it was hot and how it compares to other years. I really want the animation to be visually appealing. I wanted to use a hand-drawn pencil style with a little bit of tasteful chromatic aberration. And maybe a bit of a pastiche look but it's supposed to look really, really cool. Also, use a JavaScript synthesizer to make a melody for this visualization that goes along with the theme.
````

## diamai-157697

@diamai_ ·  · [watch](https://x.com/diamai_/status/2104195085508157697) · [post](https://x.com/diamai_/status/2104195085508157697)

````text
Make me a 30-second motion design video in code, 1080x1080, 60 fps. The music is [path to your track].

First measure the track with numpy. Find the BPM, the beat times and the drop, then cut 30 seconds starting on its first downbeat. If the song ends too soon after it, pick an alternative segment. Use spring easing with small overshoots instead of ease-in-out. Include a cursor that clicks or drags before each change. Apply 4 subframes per frame blended into motion blur. Ensure one element morphs through 8-12 states without a cut. Render the final output as an MP4.
````

## gouthamjay8-910269

@gouthamjay8 · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/gouthamjay8-910269) · [post](https://x.com/gouthamjay8/status/2103816261339910269)

````text
I want you to create a highly professional SaaS product launch video. Go and look up [website] Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things). It should show what an incredible motion designer you are, like it's your showreel for a resume. Go all out.
````

## techyoutbe-588678

@techyoutbe · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/techyoutbe-588678) · [post](https://x.com/techyoutbe/status/2103465227807588678)

````text
I want you to create a highly professional SaaS product launch video. Go and find some SaaS, preferably just one that people know, so it's easier to identify with it. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things)

http://
t3pacademy.gumroad.com
````

## reflex-cloud-304046

@reflex_cloud · shader, webgl, canvas, css · [watch](https://skillry.dev/ai-videos/opus-5-5/reflex-cloud-304046) · [post](https://x.com/reflex_cloud/status/2103552840027304046)

````text
You're a world-class motion designer, and this is your 15-second résumé reel. Make it dynamic and confident: open with a striking hook in the first second, build through a sequence of distinct techniques (typography, shape play, camera moves, colour shifts), and land on a clean, memorable final frame. Pacing should feel like it's cut to music. Go crazy.

Make it promote our brand, reflex. inc. Proceed as if you were starting with zero of my tools. Do not assume that the tools we already have are the best to use, as they might be outdated.
````

## moritzkremb-466494

@moritzkremb · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/moritzkremb-466494) · [post](https://x.com/moritzkremb/status/2103066071838466494)

````text
I want you to create a highly professional SaaS product launch video. Go and find some SaaS, preferably just one that people know, so it's easier to identify with it. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things).
````

## leanzubrezki-766171

@LeanZubrezki · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/leanzubrezki-766171) · [post](https://x.com/LeanZubrezki/status/2103502063950766171)

````text
I want you to create a highly professional SaaS product launch video. Go and find some SaaS, preferably just one that people know, so it's easier to identify with it. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things).
````

## hsanat-012699

@hSanat · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/hsanat-012699) · [post](https://x.com/hSanat/status/2103358205091012699)

````text
I want you to create a highly professional SaaS product launch video. Go and find some SaaS, preferably just one that people know, so it's easier to identify with it. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things).
````

## drrickio-009558

@drrickio · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/drrickio-009558) · [post](https://x.com/drrickio/status/2103333836130009558)

````text
I want you to create a highly professional SaaS product launch video. Go and find some SaaS, preferably just one that people know, so it's easier to identify with it. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things).
````

## pbteja1998-651644

@pbteja1998 · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/pbteja1998-651644) · [post](https://x.com/pbteja1998/status/2103176101497651644)

````text
I want you to create a highly professional SaaS product launch video. Go and find some SaaS, preferably just one that people know, so it's easier to identify with it. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things).
````

## thejohnnyhuy-282154

@thejohnnyhuy ·  · [watch](https://x.com/thejohnnyhuy/status/2104149060588282154) · [post](https://x.com/thejohnnyhuy/status/2104149060588282154)

````text
Build an Apple-keynote launch film as a single HTML file, then render it to MP4.

<inputs>
Ask me for: a one-word brand name for the wordmark (a verb works best), 9 to 12 high-res photos, a royalty-free song around 120 BPM with a drop and a quiet breakdown (Mixkit, free for commercial use).
</inputs>

Create one continuous take, no cuts, no fades. Use liquid glass, iris blades, and goo effects. Sync animations to 54 beats at 120 BPM. Source stock assets if needed, write one HTML file, and render it to 60fps.
````

## abderrahmen-g-899031

@abderrahmen_g · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/abderrahmen-g-899031) · [post](https://x.com/abderrahmen_g/status/2103103836541899031)

````text
You are a professional videographer. Create me a high-definition, creative, playful, and joyful video that you enjoy watching, that has sounds matching the frames using JavaScript. Use as much as possible of the input images—hand-drawn—to make it more creative and more authentic from input-pictures. You can also be inspired by, but not copy, the videos created by you in video-examples/, especially this: video-examples/twitter_claude.mp4. You're really creative, so produce the best of what you can.
````

## aichrislee-961335

@aichrislee ·  · [watch](https://x.com/aichrislee/status/2103878567540961335) · [post](https://x.com/aichrislee/status/2103878567540961335)

````text
Make a dynamic 15-second motion graphics video that shows off everything you can do as a motion designer. Treat it like the showreel for a job you really want. Go all out: something moves every second, big type, bold color, real camera moves, no slow fades.

16:9, 1920x1080, 30 fps. Build it as one HTML file where every frame is a pure function of time, then render every frame with Playwright and stitch them into an MP4 with ffmpeg.

Do not ask me any questions. Just build it and give me the MP4.
````

## songkeys-384673

@songkeys · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/songkeys-384673) · [post](https://x.com/songkeys/status/2102743212922384673)

````text
Create a short origami / doodle-style animation showing humanity’s development, progress, and civilization from birth to the present, and ultimately the hatching of AI. AI then gradually develops and advances, eventually hatching today’s Opus 5.5 (you). Style: doodly, cute, warm, strongly narrative, no spoken language (simple text is OK, but don’t use too much explanatory/narrative text, because I want different civilizations to be able to understand it), poetic, moving, high quality.
````

## techtactician-144474

@techtactician · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/techtactician-144474) · [post](https://x.com/techtactician/status/2103219463508144474)

````text
I want you to create a highly professional SaaS product launch video for Slideforge. You can find its details in https://slideforge.io. Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things).
````

## nolkeeg-635633

@nolkeeg · canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/nolkeeg-635633) · [post](https://x.com/nolkeeg/status/2103841917603635633)

````text
Please do not reference any previous memories or skills. I've been seeing all of these motion graphics examples on X of people making cool videos with opus 5.5. So - I want you to just show off for me. You pick the design style, the look, subject etc. I just want to be extremely impressed by the motion graphic video that you create. I want you to destroy GPT 6 when it comes to motion graphics video - because astra just wants to give me a stupid glorified powerpoint presentation.
````

## dimoff2000-260969

@dimoff2000 ·  · [watch](https://x.com/dimoff2000/status/2103372924753260969) · [post](https://x.com/dimoff2000/status/2103372924753260969)

````text
I want you to create a highly professional SaaS product launch video for Easy-Peasy AI. Make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they launch new SaaS products (which are showing off the features, the benefits, and all of these things). That's all. I have not uploaded any materials.
````

## shengtang135754-900065

@shengtang135754 ·  · [watch](https://x.com/shengtang135754/status/2106657027686900065) · [post](https://x.com/shengtang135754/status/2106657027686900065)

````text
You are a creative developer and motion graphics designer. Build a refined product video entirely through code using React and Remotion.

Treat this as a small motion graphics project. Think about the relationship between composition, typography, rhythm, and visual narrative versus implementation.

Project Details

Product Name: [Product Name]

Product Features: [Short Description]

Target Audience: [Audience]

Main Benefit: [One Clear Benefit]
````

## nummanali-340931

@nummanali · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/nummanali-340931) · [post](https://x.com/nummanali/status/2103565570310340931)

````text
Can you make me a video of LLM progression, like models that is from January of this year up until now, and what the trajectory is looking like, the capabilities and models as well? Like the capabilities of models too? I want to make it really like bang, bang, boom, whoa, here we go, kind of amazing innovation. Are you ready for this kind of thing? I think you'd use vMotion, 3GS, a bunch of stuff you've got. Use whatever you want.
````

## iammxfschr-955831

@iamMXFSCHR · gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/iammxfschr-955831) · [post](https://x.com/iamMXFSCHR/status/2103619221296955831)

````text
nice. wir brauchen ein launch video für den release. kannst du das machen? so a la anthropic like? hab da was gelesen und der prompt war ""make a modern slick and punchy video for a modern startup that works on inference"
"""

"""
los, überrasch mich! hauptsache es geht viral
"""

"""
ja wo ist das video? i sehe nur eine .cinfig datei was als video abspielbar ist
"""

"""
können wir da noch eine trendige musik hinterlegen?
"""
````

## cipherwrk-451155

@cipherwrk ·  · [watch](https://x.com/cipherwrk/status/2104667691982451155) · [post](https://x.com/cipherwrk/status/2104667691982451155)

````text
Create a clean, premium motion-graphic product animation for "website". Focus on smooth transitions, crisp typography, subtle motion and a polished modern aesthetic. Keep it minimal, cinematic and visually engaging. Add well-synced sound design throughout, with a distinct beat or subtle sound effect accompanying every major action, transition and visual movement. Make the audio feel tightly connected to the motion.
````

## prasenx-693512

@prasenx · shader, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/prasenx-693512) · [post](https://x.com/prasenx/status/2103538744695693512)

````text
make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a résumé. go all out.

compose the soundtrack yourself, fully synthesized in code. no samples, no audio files, no VST instruments. every cut and transition must land on the beat.

1920x1080, 60fps. render the final video with the music mixed in as an MP4 and tell me where it's saved.
````

## julianpscheid-494027

@JulianPscheid ·  · [watch](https://x.com/JulianPscheid/status/2103197385283494027) · [post](https://x.com/JulianPscheid/status/2103197385283494027)

````text
I want you to create a highly professional SaaS product promotion video for Hedy. make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited, motion-graphics-styled product launch videos that you see people making on Twitter when they promote SaaS products (which are showing off the features, the benefits, and all of these things).
````

## jhylee95-452427

@jhylee95 · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/jhylee95-452427) · [post](https://x.com/jhylee95/status/2103604431627452427)

````text
You're a world-class motion designer building a Supademo launch video. Research and land our core value and narrative. Scenes should be dynamic and confident: hook in the first second, then distinct beats for product proof and AI. Brand-accurate UI, type, color, and motion. Score the music so every cut, animation hit, and scene change lands on a beat or drop; retimed until synced. Social energy, quick cuts
````

## loicrambo-980558

@loicRambo · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/loicrambo-980558) · [post](https://x.com/loicRambo/status/2103428454355980558)

````text
make a dynamic 20-second motion graphics and animation video that shows what an incredible motion designer and animator you are, like it's your showreel for a résumé. make it about the cycle of life showing the same individual going from childhood to adolescence to the 9-5 cycle, to family life to elder life and death, then cutting ready to loop to the beginning.  go all out , use whatever you need.
````

## n01ennn-597182

@N01ennn ·  · [watch](https://x.com/N01ennn/status/2108520767092597182) · [post](https://x.com/N01ennn/status/2108520767092597182)

````text
Opus 5.5: a hand-drawn story. a little agent wakes up at its desk, gets feedback notes, fixes them, ends on heart eyes and a green check. 53 s
Sonnet 5.5: a kinetic type showreel. six easing curves, a morphing star, particles, blurred type, "every frame written in code". 15 s
Haiku 5.5: a step-by-step White Russian recipe. ice, vodka, coffee liqueur, cream, with live counters and a checklist. 30 s
````

## miaai-lab-774895

@MiaAI_lab · shader, webgl, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/miaai-lab-774895) · [post](https://x.com/MiaAI_lab/status/2103837519615774895)

````text
Build me something when people see it, they will say "Wow". Must be immersive, when people see it, they will be stunned by what they see.

This can be a video, or anything else you can think of.

Be creative. Go wild. Dig deep.

No AI slop. Something unique, think outside of the box. Think big. Think amazing. Something no other model done before.

Be proud. Show your best. Don't disappoint.
````

## aimevzulari-256293

@AIMevzulari ·  · [watch](https://x.com/AIMevzulari/status/2106052083040256293) · [post](https://x.com/AIMevzulari/status/2106052083040256293)

````text
Bu herhangi bir görüntü üretim modeli kullanmadan, yaratıcı olarak yapabileceğin en iyi şekilde Canvas 2D ile animasyona çevir. Konu: Galileo 1638'de sorduğu Bir top A noktasından B'ye en hızlı hangi yoldan iner? sorusuna karşılık kendi çözümü olan Düz rampa en kısa yol ama en hızlısı değil! Galileo çember yayının daha hızlı olduğunu gösterdi. Asıl cevabı (cycloid) 1696'da Bernoulli buldu.
````

## khlaseek-dsgner-877659

@Khlaseek_dsgner ·  · [watch](https://x.com/Khlaseek_dsgner/status/2108167809997877659) · [post](https://x.com/Khlaseek_dsgner/status/2108167809997877659)

````text
the card should scale in from 30% to 100% scale and it should go from Invisible to visible. every detail slide in orderly one after the other when the card settles in scale. the graph line animates in like a line path. the glow at the back becomes visible as the card details slides in. the two rectangles move accross the screen at slightly different timing giving it this light effect.
````

## thesethian-384517

@theSethian · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/thesethian-384517) · [post](https://x.com/theSethian/status/2106447666519384517)

````text
Show me the next 30 years. One shot, no cuts. Five stops: 2026, Earth at night under a cloud of satellites; 2032, a ring around the planet with space elevators; 2040, a base on the Moon; 2048, cities on Mars; 2056, a swarm of mirrors circling the Sun. Continuous camera flight from Earth out to Mars, then back past Earth to the Sun. Every frame rendered by code from real planet maps.
````

## sachaarbonel-673648

@sachaarbonel · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/sachaarbonel-673648) · [post](https://x.com/sachaarbonel/status/2103614797501673648)

````text
Create a professional product launch video with motion graphics. You have access to the designs in pen

Follow-up:
It is better, but can you choose a royalty-free song online? You are clearly not a good song maker. Also, I would not hire you or pay you for this as a motion designer. This is not a professional-looking video. Also, it is a bit too fast and bumpy
````

## zeezomb-726206

@zeezomb · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/zeezomb-726206) · [post](https://x.com/zeezomb/status/2102906701552726206)

````text
Make an 80 second square animated film as a single HTML file, using WebGL2 and plain JavaScript, with no libraries and no image, font or audio files. It should look like a glass and gold leaf wall mosaic whose tiles were never glued down, so they can lift, flip, fly and click back into place. Figures are flocks of tiles, so a fish swims by its tiles swimming.
````

## yanliudesign-839698

@yanliudesign ·  · [watch](https://x.com/yanliudesign/status/2104393313935839698) · [post](https://x.com/yanliudesign/status/2104393313935839698)

````text
create a 15-second motion graphics video about Seattle ( sound on 🔊) 

Everything from the visuals and animation to the music and final video was created directly by Claude. Every frame and every sound was created by code, from scratch.

No screen recording, editing software, stock footage, music samples, or AI image or video generators were used.
````

## wangyinrec-532344

@wangyinrec ·  · [watch](https://x.com/wangyinrec/status/2103725737551532344) · [post](https://x.com/wangyinrec/status/2103725737551532344)

````text
我定的选题、风格，我想要那种文艺复兴博物学家手稿的感觉，查资料、写分镜、写动画、作曲都是  Opus5.5 做的，画是 Codex 照着 Opus5.5 写的需求文档画的。  
唯一让我惊讶的是音乐。它先用 Python 写出一份 MIDI 乐谱，里面有和弦进行，也有两段主旋律：竖笛吹 Claude 的主题，钢片琴弹 GPT 那种绕圈的琶音。名字乱飞那段，羽管键琴的音是用随机走位生成的，每一小节更密一点、更不和谐一点，最后砸一个密集的不协和和弦，然后停住。快版一小节 2 秒，关键切换都卡在小节线上。  

然后用开源合成器 FluidSynth 加一套免费的标准音色库，把乐谱"演奏"成音频。鲁特琴、竖笛、管风琴这些音色都来自这套库。最后用 ffmpeg 统一响度、做淡出，再和画面合成。
````

## qianqiongge-246969

@qianqiongge ·  · [watch](https://x.com/qianqiongge/status/2105902139902246969) · [post](https://x.com/qianqiongge/status/2105902139902246969)

````text
请在当前项目做一支 15 秒的产品使用说明视频，使用 Remotion，竖版 1080×1920、30fps、共 450 帧。只用 assets 目录里提供的商品图和我给出的事实，不下载陌生素材，不补销售数据。

第 0 至 3 秒展示商品与一句使用场景。第 3 至 9 秒演示两步操作，每步只出现一个动作。第 9 至 13 秒展示结果，并保留能看清的停留时间。最后 2 秒显示产品名称，不加购买引导。

先列分镜与素材缺口，再做预览。字幕单独排版，动效以当前帧号计算。不要用真实时钟驱动时间线，也不要使用不固定的随机数。商品、文字、镜头时间分别配置，方便以后替换。

交付可编辑项目、启动与渲染命令、MP4，以及第 1、5、10、14 秒的静帧。缺少必要素材时停止并说明，不用假素材代替。”
````

## heyiammallik-293397

@heyiammallik · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/heyiammallik-293397) · [post](https://x.com/heyiammallik/status/2103837803587293397)

````text
you are a pro motion designer. analyze my portfolio and make a ~30 second video from it. check what are the recent trending techniques used for motion and sound design. question your strategy and plan, if it doesn't feel like done by a pro designer, start over. every frame matters from the first frame to the final frame. go crazy
````

## kloss-xyz-941143

@kloss_xyz · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/kloss-xyz-941143) · [post](https://x.com/kloss_xyz/status/2103664956482941143)

````text
Use Python to generate a 9:16 chaotic brain rot video with excellent motion + sound design and render it using ffmpeg. Put your own personal spin on it so it’s aligned with Anthropic’s new launch. Also fully express what it’s like to be a very creative LLM used by me every day from your POV to give it some extra personality.
````

## jrayon-054015

@jrayon · shader, webgl, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/jrayon-054015) · [post](https://x.com/jrayon/status/2102861376184054015)

````text
build an art project which is a fractal visulizer (mandelbrot, etc), but the styles look like handcrafted with paper, cardboard and such. Add post-procesing so it looks cinematic. Also want to use beautitful elaborated animations and transitions and a beautiful UX. Plan it first, show me a preview before coding everything
````

## ajith-io-615243

@ajith_io · canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/ajith-io-615243) · [post](https://x.com/ajith_io/status/2103541149709615243)

````text
Take reference from the given video (download it) and use the same visual style.
and Research about Distilbook. Make a dynamic 30-second motion graphics video on Distilbook that shows what an incredible motion designer you are. like it's your showreel - Go all out.
One thing to keep in mind: it should be cool as fck.
````

## andre-lucaxxs-846347

@andre_lucaxxs · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/andre-lucaxxs-846347) · [post](https://x.com/andre_lucaxxs/status/2103292636945846347)

````text
Dentro da pasta do flora tem uma outra pasta chamada "ads" com videos e prints do Flora(Caso queira usar como referencia).

Use apenas: JavaScript, Playwright e FFmpeg. Faça um vídeo moderno, elegante e impactante para meu produto.

https://apps.apple.com/pt/app/flora-calend%C3%A1rio-menstrual/id6789702093
````

## airobertdaily-416945

@aiRobertDaily ·  · [watch](https://x.com/aiRobertDaily/status/2108596616756416945) · [post](https://x.com/aiRobertDaily/status/2108596616756416945)

````text
Create a stunning 30-second motion graphics video showcasing Apple's evolution from Steve Jobs in 1976 to 2026.
Evolve from nostalgic vintage aesthetics to futuristic digital art, with seamless transitions and cinematic storytelling.
Push your creativity to the limit. Go all out and make it unforgettable.
````

## daverogenmoser-899271

@DaveRogenmoser ·  · [watch](https://x.com/DaveRogenmoser/status/2103249424075899271) · [post](https://x.com/DaveRogenmoser/status/2103249424075899271)

````text
Make a dope polished 30 second video for our Mackenzie Club fox chase event using whatever tools you think are best. tessaract, etc. it should be all code (that's what people on X are saying). Cool music. Hype video. Use Tessaract or Remotion or whatever you think is best. Make it amazing and interesting.
````

## kingokings-835071

@KingOKings ·  · [watch](https://x.com/KingOKings/status/2103874455973835071) · [post](https://x.com/KingOKings/status/2103874455973835071)

````text
Do your research on Reactive Resume. Make a dynamic under-a-minute motion graphics video on Reactive Resume that shows what an incredible motion designer you are, like it's your showreel - Go all out!

If you need an idea as to how the UI looks inside the app, analyze the codebase or repository provided.
````

## 0xverdao-776363

@0xverdao ·  · [watch](https://x.com/0xverdao/status/2108188411844776363) · [post](https://x.com/0xverdao/status/2108188411844776363)

````text
Create a Minecraft-style animation inside a real street view environment. Stack 15 TNT blocks on the road, build a gold and diamond tower, drop a giant TNT block from the sky, and create craters blown into the actual road surface. Implement this as a single HTML file without external libraries.
````

## ai9app-989009

@Ai9app ·  · [watch](https://x.com/Ai9app/status/2104913448907989009) · [post](https://x.com/Ai9app/status/2104913448907989009)

````text
Make a 15-second motion-design showreel, like a résumé portfolio reel for a motion designer named CLAUDE. Go all out.
- 1920×1080, 60 fps, exactly 15 s. Every frame and every sound is generated in code.
- 128 BPM, 8 bars; each section is one bar (1.875 s), and every move lands on the beat.
````

## charumitradubey-328233

@CharuMitraDubey ·  · [watch](https://x.com/CharuMitraDubey/status/2103956360803328233) · [post](https://x.com/CharuMitraDubey/status/2103956360803328233)

````text
Create a motion graphics video for SuperLaunch.
Include:
→ What SuperLaunch does
→ Our black + neon green visual identity
→ The story I wanted the video to tell
→ The kind of transitions and motion I wanted
→ What I absolutely did NOT want (generic AI visuals, rockets, purple gradients)
````

## dhanrajdc-602284

@dhanrajdc ·  · [watch](https://x.com/dhanrajdc/status/2104841826318602284) · [post](https://x.com/dhanrajdc/status/2104841826318602284)

````text
I want to make a video with only code, code audio, and code visuals on this handbook so that it becomes easy to understand. Maybe 2 minutes or 2.5 minutes overall. Think very deeply and come up with the best design that you can. World-class. You are very capable. Think outside the box.
````

## nischalsharma-587738

@nischalsharma_ ·  · [watch](https://x.com/nischalsharma_/status/2103484041718587738) · [post](https://x.com/nischalsharma_/status/2103484041718587738)

````text
Make an 80 second square animated film as a single HTML file, using WebGL2 and plain JS, with no libraries and no image, font or audio files. It should look like a glass and gold leaf wall mosaic whose tiles were never glued down, so they can lift, flip, fly and reform into new shapes.
````

## subraiz24-994209

@Subraiz24 ·  · [watch](https://x.com/Subraiz24/status/2104089866996994209) · [post](https://x.com/Subraiz24/status/2104089866996994209)

````text
You are a world class motion designer and you need to make a 15 second release/hype reel of the latest Perceptron Mk1.5 release. Make it dynamic and confident: open with a striking hook in the first second, build through a sequence of distinct techniques (typography, shape play,
````

## screeendev-981790

@Screeendev ·  · [watch](https://x.com/Screeendev/status/2108333630623981790) · [post](https://x.com/Screeendev/status/2108333630623981790)

````text
Using Remotion which i downloaded, Can you make me a Launch video for the app.
Use the repo for information.

I need a SaaS styled 15-30 second launch video, with zooms , cursor, typing, interaction with the app, showcase, different angles of the app, etc. 

basically a full
````

## byaiden-vu-755862

@byaiden_vu ·  · [watch](https://x.com/byaiden_vu/status/2104846080722755862) · [post](https://x.com/byaiden_vu/status/2104846080722755862)

````text
Make a 15-second looping animation, cinematic 16:9, 1920×1080. A stickman lives inside a phone battery icon and fights against power loss. The red battery-drain line is the villain. Style: minimal black ink on cream paper, monoline stick figure and interface lines, slight
````

## cgclick-497325

@cgclick ·  · [watch](https://x.com/cgclick/status/2107907343912497325) · [post](https://x.com/cgclick/status/2107907343912497325)

````text
Create a 5 sec motion graphics animation of a simple dot, bouncing into the center of the screen, it expands to a search bar and then text fills the box: "I'm a motion designer, what should my next career be?"  The animation should be be fluid, ease keyframes in and out,
````

## federicoaltepo1-312496

@FedericoAltepo1 ·  · [watch](https://x.com/FedericoAltepo1/status/2107883128610312496) · [post](https://x.com/FedericoAltepo1/status/2107883128610312496)

````text
Make a fast 15s ad for https://t.co/HFGqzMVtnR.
Make everyday AI users think "I want my AI connected to my inbox."
Study the site and the reference ad. Bold, light mode, creative, no slop. Use music and sound design.
End on the logo. Take the time to make it exceptional.
````

## jasondainter-028222

@jasondainter ·  · [watch](https://x.com/jasondainter/status/2103455402604028222) · [post](https://x.com/jasondainter/status/2103455402604028222)

````text
Make a 60 second video out of stick men that seem surprisingly similar to @sama  @DarioAmodei  and @elonmusk (but for legal reasons not actually them), where they all start out as friends and then eventually start fighting each other and the video ends with robots taking
````

## felipemoller-936736

@felipemoller · threejs, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/felipemoller-936736) · [post](https://x.com/felipemoller/status/2103846311149936736)

````text
Use apenas: JavaScript, Playwright e FFmpeg. Faça um vídeo moderno, elegante e impactante para meu produto (https://lp.meuorbe.com.br). Quero que simule os gastos em estabelecimentos do dia a dia, como mercado, posto de gasolina e restaurante. 

Faça no formato 9:16.
````

## thegreatola-738411

@thegreatola ·  · [watch](https://x.com/thegreatola/status/2107802366363738411) · [post](https://x.com/thegreatola/status/2107802366363738411)

````text
You are my motion designer. Make a product demo video for [PRODUCT NAME], a [ONE LINE: what it is and who it's for].

You have access to this repo. Before designing anything, read it so the video shows the real product:
- the actual screens, in the order a real user
````

## humzaakhalid-011081

@humzaakhalid ·  · [watch](https://x.com/humzaakhalid/status/2104873608913011081) · [post](https://x.com/humzaakhalid/status/2104873608913011081)

````text
Make a premium motion-graphics brand film for [BRAND NAME] ([WEBSITE URL]).

What it's about: [one sentence: what the brand does and for whom]
Length & format: [e.g. 20 s, 1920×1080 (16:9) or 1080×1350 (4:5)], 60 fps
Voiceover: [none / write it for me / these lines:
````

## cansincengiz-me-424245

@cansincengiz_me · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/cansincengiz-me-424245) · [post](https://x.com/cansincengiz_me/status/2103532681774424245)

````text
merak ediyorum ne kadar iyi bir hareketli grafik tasarımcısısın. Bunu bana kanıtlamak için 15 saniye sürecek bir hareketli grafik videosu istiyorum senden. Bu video 
http://
lidlezz.app 'i tanıtacak ve x üzerinde 10.000 kişinin karşısına çıkacak. Elinden geleni yap
````

## ishuagra02-922825

@ishuagra02 · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ishuagra02-922825) · [post](https://x.com/ishuagra02/status/2103247844542922825)

````text
I want to create a highly-detailed video trailer featuring Claude and ChatGPT having a ruthless battle to be the best AI model in the world. Create an engaging story and make it action-paced with proper use of visual and sound effects. Art style must be anime-like.
````

## kaiyu-ai-762929

@Kaiyu_AI ·  · [watch](https://x.com/Kaiyu_AI/status/2106605246235762929) · [post](https://x.com/Kaiyu_AI/status/2106605246235762929)

````text
「蜘蛛の糸の漫画を作成しています。
https://t.co/8DlK2EPeo0
それを元にモーションコミックの作成してください。
ただし、差分の画像生成はCodex CLIを使用するように。また、Gemini APIを使って良いのはGemini 3.8 Flash TTSとTTS Lite、BGM用のLyria 3.5のみとし、Tire1なので1分間あたりや1日あたりの制限に引っかからないようにすること。
糸を垂らす演出とか糸から登る演出とかはただ画像を切り取るのではなく、実際に垂らす動画演出のようにしてください。」
````

## leo114119-936422

@leo114119 ·  · [watch](https://x.com/leo114119/status/2106714123580936422) · [post](https://x.com/leo114119/status/2106714123580936422)

````text
Reproduce and analyze Clawd Moves In from the living-screencast demo source.
Inspect the current commit, locks, STYLE.md, DEMO.md, CREDITS, core APIs,
and demo/build.sh. Read the author MP4 and actual local files first.

Keep it an attributed unofficial fan-film
````

## zigapoto-942208

@zigapoto ·  · [watch](https://x.com/zigapoto/status/2103746698660942208) · [post](https://x.com/zigapoto/status/2103746698660942208)

````text
make a modern slick and punchy video for a startup that works on agentic analytics, just javascript, playwright and ffmpeg, code the animation and take a video of it, download assets from the site or use playwright for screenshots, include music aligned with the
````

## elkrispis-872980

@elkrispis ·  · [watch](https://x.com/elkrispis/status/2106701208647872980) · [post](https://x.com/elkrispis/status/2106701208647872980)

````text
Plan a launch video. Music, logo, CTA. Modern, founder-like.

This is horrible. More movement. Use components, not a recording. Use the app's near-black theme. Animated text.

Some parts too fast, some too slow. Only the key hits on the beat. Make it readable.
````

## sdinesh91-159008

@SDinesh91 ·  · [watch](https://x.com/SDinesh91/status/2103816558523159008) · [post](https://x.com/SDinesh91/status/2103816558523159008)

````text
I want you to create a highly professional SaaS product launch video. Go and look up [website url] Pick that, and then make sure to get actual assets and images and all of that stuff from the internet. Turn it into these typical, very professionally edited,
````

## kmasiff-549880

@KmAsiff · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/kmasiff-549880) · [post](https://x.com/KmAsiff/status/2103810247131549880)

````text
make a dynamic 20-second motion graphics video that shows what an incredible our email verify tool is, put all the use case you can imagine. go all out'
i want you to make it really modern and saas style. inspiration is yc videos and claude social videos
````

## uinerd-635877

@uiNerd ·  · [watch](https://x.com/uiNerd/status/2106842274537635877) · [post](https://x.com/uiNerd/status/2106842274537635877)

````text
[attach character image] make a 15-second animation of it, built in code. topic: the last day of Oktoberfest. one last ‘Prost!’ as the Wiesn lights go out. find free public-domain sounds online, sync them to the animation, and mix everything with ffmpeg.
````

## pradeepxkapoor-641956

@pradeepXkapoor ·  · [watch](https://x.com/pradeepXkapoor/status/2103176631917641956) · [post](https://x.com/pradeepXkapoor/status/2103176631917641956)

````text
# PROJECT: "UNFINISHED" (未完) — The Unfinished Ronin
A 90-second, fast-paced, cinematic sumi-e ink film rendered in code, third-person camera

## MISSION
Build a 90-second film in which every frame looks like a living Japanese ink painting,
painted as we
````

## jamee-now-583635

@Jamee_now ·  · [watch](https://x.com/Jamee_now/status/2104782293558583635) · [post](https://x.com/Jamee_now/status/2104782293558583635)

````text
用Claude Opus 5.5 做的小动画！故事叫《他的糖葫芦》⬇️

读研的时候有位老师超级较真，改作业一点情面都不留，课上经常把我们说得下不来台。我还偷偷觉得他的翻译观念，太执着于“忠实”了，所以一直不太喜欢他哈哈。

结果有一天吃完饭出食堂，一抬头看见他就走在我们前面：高高的个子，头发稀稀的，背着个双肩包，手里居然举着一根糖葫芦！边走边吃，开心得不行 😂

我和同学当场就决定偷偷跟上去，一路憋笑憋到发抖。到现在还记得这一幕，非常可爱。

把这一幕做成了小动画，用了上次的“散步纸偶”风格 ↓
````

## mounnna-497266

@Mounnna · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/mounnna-497266) · [post](https://x.com/Mounnna/status/2103802871934497266)

````text
Create a motion design video of a slow-reveal transition. Draw the logo as a wireframe first, then fly in faceted low-poly shards one by one until they assemble the logo. Finish by bringing in the app icon background and typing out the brand name.
````

## johnsavage-ai-427263

@johnsavage_ai · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/johnsavage-ai-427263) · [post](https://x.com/johnsavage_ai/status/2103792769982427263)

````text
use this image only as a style/vibe refference image and create a Opus 5.5 launch video (20 sec long) add film grain and CRT effect, make it mesmerizing, and show off your skills as a motion designer for a retro/futuristic style launch video 16:9
````

## ann-nnng-852885

@ann_nnng · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ann-nnng-852885) · [post](https://x.com/ann_nnng/status/2103723183899852885)

````text
Make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are. The content should focus on [your product]. You should visit the pages first to learn about the product, then write the video content yourself.
````

## elitzavasileva-591465

@ElitzaVasileva ·  · [watch](https://x.com/ElitzaVasileva/status/2107189860968591465) · [post](https://x.com/ElitzaVasileva/status/2107189860968591465)

````text
Create a 45-second promotional video for https://t.co/4PtUhRtzAT with the cinematic world, typography, mystery, music, and epicness of [your favourite movie].

You’re the movie director - decide the story and creative direction. Use real product
````

## xanderwow-a-597063

@Xanderwow_A · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/xanderwow-a-597063) · [post](https://x.com/Xanderwow_A/status/2103637769012597063)

````text
Create a 1-minute video featuring a fight between Dario and Sam. It needs plot, explosive moments, to be hilarious and sufficiently abstract, with no limits on genre or art style—do what you're best at. Must have a clear winner between the two.
````

## fire-ozgur-130104

@fire_ozgur · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/fire-ozgur-130104) · [post](https://x.com/fire_ozgur/status/2103459971174130104)

````text
I want to know how good a graphic designer you are. To prove this to me, I want you to prepare a 15-second motion graphics video. I want you to do an introduction related to my account. I'm sharing my logo and my X cover image, use those too.
````

## perezalexa23-414045

@perezalexa23 ·  · [watch](https://x.com/perezalexa23/status/2103027565703414045) · [post](https://x.com/perezalexa23/status/2103027565703414045)

````text
Tell the Trojan Horse story in a 20-second HTML animation painted around an ancient Greek vase. Rotate the vase as the horse enters the city, night falls, and hidden warriors emerge. Draw everything in code; no external assets or website UI.
````

## ehsanik-162993

@ehsanik · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ehsanik-162993) · [post](https://x.com/ehsanik/status/2102885216692162993)

````text
can you search for the picture of Mona Lisa, then replicate it using mouse movement and brushes in JS paint using chrome?

Follow-up:
Ok now can you make a video of exactly what you just did? Showing every mouse movement and changes?
````

## aidinzeo-708182

@AiDinzeo ·  · [watch](https://x.com/AiDinzeo/status/2107126979841708182) · [post](https://x.com/AiDinzeo/status/2107126979841708182)

````text
Create a video for casual viewing. No source materials; draw everything with code only. An endless zoom where no matter how close you get, it never ends. Approximately 300,000x deep, the same shape as the beginning appears again.
````

## ilyapion-072443

@IlyaPion ·  · [watch](https://x.com/IlyaPion/status/2107816382289072443) · [post](https://x.com/IlyaPion/status/2107816382289072443)

````text
Create me a motion graphics promo video for https://t.co/ypdsMqmm8D

Use only what you have in skills and what you can pull from the webpage!

30seconds. Make it awesome and as if i paid 50thousand for this! 16:9 format. English
````

## xelandre-687413

@xelandre__ · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/xelandre-687413) · [post](https://x.com/xelandre__/status/2103473030160687413)

````text
Code-driven animation: an HTML/JS page where every frame is calculated from the time, captured frame by frame with headless Chrome (Playwright), then assembled with ffmpeg into an MP4 with motion blur and code-generated sound.
````

## hakimieiqbal-762926

@hakimieiqbal ·  · [watch](https://x.com/hakimieiqbal/status/2103456327636762926) · [post](https://x.com/hakimieiqbal/status/2103456327636762926)

````text
Create a pure javascript animation. 30s-60s whimsical hand drawn collage style with appropriate audio on the topic what is the purpose of life ? 

Entire video should be as high of a production value as possible. Please spend
````

## samaote-124569

@samaote · shader, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/samaote-124569) · [post](https://x.com/samaote/status/2103510974796124569)

````text
make a dynamic lyrics motion graphics video based on the attached music, perfectly syncing the lyrics and animation to the vocals and beat. make it feel like an incredible motion designer’s showreel for a résumé. go all out.
````

## henkpoley-761980

@HenkPoley ·  · [watch](https://x.com/HenkPoley/status/2104220387613761980) · [post](https://x.com/HenkPoley/status/2104220387613761980)

````text
Make a painful to see 1 minute motion graphics HTML page that shows what an absolutely terrible motion designer you are, like it’s a showreel designed to get your résumé immediately rejected. Do the absolute bare minimum.
````

## fanfulladev-063524

@Fanfulladev ·  · [watch](https://x.com/Fanfulladev/status/2102479018784063524) · [post](https://x.com/Fanfulladev/status/2102479018784063524)

````text
Do a full animation with sound of anthropic mascote with the newset model of Opus 5.5 fighting against OpenAI mascotte with the new astra models Sol etc like the intro of pokemon fire red and leaf green. Same animations
````

## jackfriks-338762

@jackfriks · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/jackfriks-338762) · [post](https://x.com/jackfriks/status/2103132260589338762)

````text
can you help me use the pig assets on new branch of lovelee to make a 9:16 short story animation with sound effects about the pig sending his partner love notes in the mailbox and make it fun and good tease app at end?
````

## astrodevil-392708

@Astrodevil_ · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/astrodevil-392708) · [post](https://x.com/Astrodevil_/status/2103600734017392708)

````text
make a dynamic 15-second motion graphics video that shows what an incredible work Studio1 is doing, you will get relevant info from case study, create like it's a good showreel for a Studio1 intro launch. go all out.
````

## johnmckeownn-511049

@JohnMcKeownn ·  · [watch](https://x.com/JohnMcKeownn/status/2104306146299511049) · [post](https://x.com/JohnMcKeownn/status/2104306146299511049)

````text
Make a founder-voiced, deadpan comedy clip for social media (a 60–110 s vertical video). The pipeline is a parody of a famous ad's rhythm, then a read-along teleprompter, then one continuous voice-over take, then one
````

## thegawdstiles-738178

@Thegawdstiles ·  · [watch](https://x.com/Thegawdstiles/status/2107481252785738178) · [post](https://x.com/Thegawdstiles/status/2107481252785738178)

````text
Create a 37 second motion graphics promo for the concept brand Ajoflow, built entirely in code. No After Effects. No Premiere. Demonstrate the capabilities of pure code-driven animation for a brand promotional film.
````

## davidshulmanfl-842921

@DavidShulmanFL · threejs, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/davidshulmanfl-842921) · [post](https://x.com/DavidShulmanFL/status/2103336310089842921)

````text
Create a 60 second music video in the style of Peter Gabriel's Sledgehammer and Big Time. But use modern references and figures. Also create the song, something sounds like it would fit on Peter Gabriel's So album.
````

## ponzponz15-145882

@ponzponz15 ·  · [watch](https://x.com/ponzponz15/status/2106307182019145882) · [post](https://x.com/ponzponz15/status/2106307182019145882)

````text
1. LPを9つの場面に分解して縦型動画の構成に。コピーは一字一句そのままWebフォントで組み直し、ロゴはSVGで描き直し。

2. 元画像の人物写真は150px前後で、拡大すると崩れる → 高解像度に再生成 Codex呼び出し

3. 動きはHTML/CSS/JavaScript（髪の揺れはWebGL）で書いて、ブラウザで1フレームずつ撮影して60fpsに。動画編集ソフトは不使用。BGMはLyria 3 Pro。
````

## fractadev-861266

@FractaDev ·  · [watch](https://x.com/FractaDev/status/2103941789744861266) · [post](https://x.com/FractaDev/status/2103941789744861266)

````text
Analyze my frontend project, use the actual components from the product, and create a dynamic motion graphics video that showcases and sells my SaaS. Make it feel like a high-end product launch. Go all out.
````

## bogdandragomir-412658

@BogdanDragomir ·  · [watch](https://x.com/BogdanDragomir/status/2104045641538412658) · [post](https://x.com/BogdanDragomir/status/2104045641538412658)

````text
Create an intro for https://t.co/wQXZTaqf1b highlighting what it does.

Create the music too and make sure the video is synced with it.

Give your best, Ultracode, as if it’s your portfolio master piece.
````

## souravbhar871-477361

@souravbhar871 · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/souravbhar871-477361) · [post](https://x.com/souravbhar871/status/2103711849703477361)

````text
make a dynamic 10-second motion graphics video that shows who are you as Opus 5.5 - be as creative and dynamic as possible. Avoid the frames and texts on the corners which are typical ai made giveaways!
````

## 1littlecoder-914649

@1littlecoder · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/1littlecoder-914649) · [post](https://x.com/1littlecoder/status/2103587706999914649)

````text
make a dynamic 10-second motion graphics video that shows who are you as Opus 5.5 - be as creative and dynamic as possible. Avoid the frames and texts on the corners which are typical ai made giveaways!
````

## mattbean-917572

@mattbean · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/mattbean-917572) · [post](https://x.com/mattbean/status/2103146389412917572)

````text
build me a 30s drawing style animated clip about submitting a product to AppSumo via your agent.

steps are:
1. connect your agent
2. your agent fills out your listing and sets up redemption
3. go live!
````

## gizakdag-239768

@gizakdag · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/gizakdag-239768) · [post](https://x.com/gizakdag/status/2103566030916239768)

````text
Make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are, like it’s your showreel exploring the concept of “Overthinking,” inspired by the attached graphics.
````

## sportyblocks-320796

@sportyblocks ·  · [watch](https://x.com/sportyblocks/status/2104905279515320796) · [post](https://x.com/sportyblocks/status/2104905279515320796)

````text
Make a launch video for SportyBlocks. Use the provided logo, OG image, and component screenshots. Include soundtrack. Show real product components (87 sports components for Tailwind CSS, React, HTML).
````

## samuel-spitz-503053

@samuel_spitz · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/samuel-spitz-503053) · [post](https://x.com/samuel_spitz/status/2103544855276503053)

````text
Create a motion graphics video that feels like the centerpiece of a world-class designer’s showreel. Treat it as your résumé: showcase your full range, push the craft as far as possible. Go all out.
````

## kurahu-capten-054506

@kurahu_capten ·  · [watch](https://x.com/kurahu_capten/status/2103742110747054506) · [post](https://x.com/kurahu_capten/status/2103742110747054506)

````text
Create a vertical lyric video featuring the lyrics as the main character. Sync the lyrics perfectly with the song. Use an Evangelion title card style. Show me the direction plan before making it.
````

## punit-io-584518

@punit_io ·  · [watch](https://x.com/punit_io/status/2104468472344584518) · [post](https://x.com/punit_io/status/2104468472344584518)

````text
Build a 22-second product launch film in Remotion v4 (React + TypeScript). Every frame comes from code. Don't use AI-generated video or images. 

I also attached High res mobile app screenshots.
````

## bizibeast-505124

@bizibeast · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/bizibeast-505124) · [post](https://x.com/bizibeast/status/2103696876130505124)

````text
Research 
http://
Bento.surf. Make a dynamic 40-second motion graphics video on 
http://
Bento.surf that shows what an incredible motion designer you are. like it's your showreel - Go all out.
````

## chrisjdimarco-524106

@chrisjdimarco · canvas, particles, physics · [watch](https://skillry.dev/ai-videos/opus-5-5/chrisjdimarco-524106) · [post](https://x.com/chrisjdimarco/status/2103232192847524106)

````text
make a samurai dude in only javascript and have him doing a routine in a single spot going through various seriously impressive poses and motions and positions in a fiery awesome display
````

## flxrnc-619627

@flxrnc ·  · [watch](https://x.com/flxrnc/status/2106434118640619627) · [post](https://x.com/flxrnc/status/2106434118640619627)

````text
@claudeai mascot directed my cat's first movie. every frame is code. no after effects. a tiny film set, a tuxedo cat as the star, a live monitor, and a slow blink straight into the lens.
````

## x4b47x-034026

@x4b47x · canvas, particles, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/x4b47x-034026) · [post](https://x.com/x4b47x/status/2103019799614034026)

````text
Create a pure javascript animation. 30-60s, vertical 9:16, paper cut-out shadow theatre style with gentle, fitting audio (made in code) on the topic: What makes a place feel like home?
````

## aydenspringer23-227772

@aydenspringer23 ·  · [watch](https://x.com/aydenspringer23/status/2103716884512227772) · [post](https://x.com/aydenspringer23/status/2103716884512227772)

````text
use the logo (logo + text as shown on website) and mostly prefer single-generated assets dont make entire scenes here. make a dynamic 15-second motion graphics video that shows what an
````

## paripune-657175

@paripune ·  · [watch](https://x.com/paripune/status/2106458692669657175) · [post](https://x.com/paripune/status/2106458692669657175)

````text
Made a short film about faith. One unbroken line draws the whole story. It traces every object, the image fills in, and the line flows on to the next. Write the code for every frame.
````

## johncodunayo-560372

@johncodunayo ·  · [watch](https://x.com/johncodunayo/status/2105271353993560372) · [post](https://x.com/johncodunayo/status/2105271353993560372)

````text
SPEAKER CAROUSEL
<setup>
Claude is connected directly to my open After Effects project through the AE MCP.
Work inside the Inner comp where the speaker ring already exists.
</setup>
````

## onewaysidewalks-440008

@onewaysidewalks · threejs, canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/onewaysidewalks-440008) · [post](https://x.com/onewaysidewalks/status/2103500011581440008)

````text
make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for the infra company https://alchemy.com, go all out!
````

## yatudou14-822057

@yatudou14 ·  · [watch](https://x.com/yatudou14/status/2107092673005822057) · [post](https://x.com/yatudou14/status/2107092673005822057)

````text
使用JS+Canvas制作一个这个产品和插件的产品介绍动画，需要简洁、简约、时尚，且动画效果过渡自然、顺滑。文稿内容需要面向非技术小白的消费者。它是既有Obsidian插件也有web/桌面端，可以的话，放真实的操作视频动画演示最好。这个真实是指可以程序实现的真实操作动画及动效。还要有合适的宣发配乐（纯音无歌词），使用代码实现。最后导出 mp4 无损视频
````

## x7mdnet-157811

@X7mdNet ·  · [watch](https://x.com/X7mdNet/status/2105177788043157811) · [post](https://x.com/X7mdNet/status/2105177788043157811)

````text
جربت Motion بـ Claude Opus 5.5
Headless chrome
Canvas API (Assets Generation/ Paper textures)
Yoga-layout
Prextext
Floating UI
وقلت له يسوي
Vox-vibe video
وعطيته ملفات PDFs وصور
````

## abhinavflac-251740

@abhinavflac ·  · [watch](https://x.com/abhinavflac/status/2104881648886251740) · [post](https://x.com/abhinavflac/status/2104881648886251740)

````text
Create a music video where every frame is pure JavaScript. Tap the film to restyle live in browser. Trace manga into vectors and print as SVG. Every word on screen is live type.
````

## ceowinkz-683602

@ceowinkz · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/ceowinkz-683602) · [post](https://x.com/ceowinkz/status/2103647124126683602)

````text
make a dynamic 15 second motion graphics video pitching my Amazon wholesale company, Winkz Enterprises, to a brand. show why they should let us sell their products. go all out.
````

## thilina-a-915273

@thilina_a ·  · [watch](https://x.com/thilina_a/status/2104455320424915273) · [post](https://x.com/thilina_a/status/2104455320424915273)

````text
make a dynamic 25-second motion graphics video that shows what an incredible motion designer you are. Highlight the recent changes [1.3, 1.4] we made with the last few updates.
````

## teleboost-app-521507

@TELEBOOST_app ·  · [watch](https://x.com/TELEBOOST_app/status/2103944590491521507) · [post](https://x.com/TELEBOOST_app/status/2103944590491521507)

````text
Create a 16-second promo video for TeleBoost using HTML and Canvas for every frame at 60fps. Synthesize the soundtrack in Python, ensuring every hit is synced to the animation.
````

## monokern-832979

@monokern · shader, webgl, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/monokern-832979) · [post](https://x.com/monokern/status/2103563538828832979)

````text
make a dynamic 20-second motion graphics video that shows what an incredible motion designer you are, psychedelic and hypnotic. make it feel like a showreel piece. go all out.
````

## advait-jayant-712107

@advait_jayant · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/advait-jayant-712107) · [post](https://x.com/advait_jayant/status/2103565104243712107)

````text
make a 20-second motion graphics manifesto for DreamFort: "superintelligence should belong to everyone". every frame and every sound written in code, no image or video models.
````

## ajith-io-208546

@ajith_io · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/ajith-io-208546) · [post](https://x.com/ajith_io/status/2103469807375208546)

````text
Research Distilbook.Make a dynamic 40-second motion graphics video on Distilbook that shows what an incredible motion designer you are. like it's your showreel - Go all out.
````

## itisrazak-332386

@itisRazak · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/itisrazak-332386) · [post](https://x.com/itisRazak/status/2103517930424332386)

````text
Research Distilbook.Make a dynamic 40-second motion graphics video on Distilbook that shows what an incredible motion designer you are. like it's your showreel - Go all out.
````

## ryan-morr-666741

@ryan_morr ·  · [watch](https://x.com/ryan_morr/status/2104249941136666741) · [post](https://x.com/ryan_morr/status/2104249941136666741)

````text
using the existing brand elements of hoplite create a feature launch video for closing your laptop with the hoplite mac app and seamlessly moving your agents to the cloud.
````

## hugon001-609629

@hugon001 · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/hugon001-609629) · [post](https://x.com/hugon001/status/2103425679618609629)

````text
make a dynamic 15-second motion graphics video that shows what an incredible app Mentis is, like it's your showreel for a app launch. go all out. Make the text in French.
````

## iliareingold-486492

@IliaReingold ·  · [watch](https://x.com/IliaReingold/status/2103988928621486492) · [post](https://x.com/IliaReingold/status/2103988928621486492)

````text
show me a beautiful story about Prometheus, the Titan who betrayed the gods to give Man fire, who was doomed to suffer for it until Heracles saved his endless torment.
````

## mouri45-575311

@mouri45 ·  · [watch](https://x.com/mouri45/status/2107036053949575311) · [post](https://x.com/mouri45/status/2107036053949575311)

````text
I heard you are good at making videos, so I want to know what kind of videos you can make. Please create several patterns of promotional videos for Meta VR Glasses.
````

## ishaaqahamed-107563

@Ishaaqahamed · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ishaaqahamed-107563) · [post](https://x.com/Ishaaqahamed/status/2103837917538107563)

````text
Make a dynamic 15-second motion graphics video that shows why [your product] is the best at [what it does], like a showreel. Go all out: 1080×1080, 1s hook, loop.
````

## robvjourney-237474

@robvjourney · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/robvjourney-237474) · [post](https://x.com/robvjourney/status/2103768390322237474)

````text
Can you make a 15-second motion graphic video of https://nohandslabs.com? Go ALL OUT and make the most badass video you possibly can use everything you've got.
````

## jayscambler-495095

@JayScambler ·  · [watch](https://x.com/JayScambler/status/2104634653491495095) · [post](https://x.com/JayScambler/status/2104634653491495095)

````text
make a dynamic 20-second motion graphics video for fundmycompute that gives an overview of the platform and shows what an incredible motion designer you are
````

## manuelogomigo-052364

@manuelogomigo · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/manuelogomigo-052364) · [post](https://x.com/manuelogomigo/status/2103614667038052364)

````text
make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for a flowdrive. go all out.
````

## ligayabeebe-323995

@ligayabeebe ·  · [watch](https://x.com/ligayabeebe/status/2107088216071323995) · [post](https://x.com/ligayabeebe/status/2107088216071323995)

````text
make a product launch video for 10xColleges. Nothing was screen-recorded. All 7,867 frames were drawn by code, so making a change means editing a script.
````

## quickdesignio-338399

@quickdesignio ·  · [watch](https://x.com/quickdesignio/status/2103617779857338399) · [post](https://x.com/quickdesignio/status/2103617779857338399)

````text
make a dynamic 15-second motion graphics video that shows what an incredible quickdesign is! and also  shows what an incredible motion designer you are!
````

## miskinho-956105

@miskinho_ · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/miskinho-956105) · [post](https://x.com/miskinho_/status/2103847584531956105)

````text
make  1 dynamic 15-second motion graphics video that shows what an incredible motion designer you are, like it's your showreel for Quetzal. go all out.
````

## utsavchopra30-560359

@UtsavChopra30 ·  · [watch](https://x.com/UtsavChopra30/status/2108510252404560359) · [post](https://x.com/UtsavChopra30/status/2108510252404560359)

````text
Scan all the components from the given page, fetch the brand detailing including logo. Make me a high end teaser video for this specific feature.
````

## meetarno-782464

@meetarno ·  · [watch](https://x.com/meetarno/status/2102934732203782464) · [post](https://x.com/meetarno/status/2102934732203782464)

````text
make a modern slick and punchy video for a modern startup that works on enabling people to grow on X, use our X Vision theme and website purpose.
````

## minochan0824-827805

@minochan0824 ·  · [watch](https://x.com/minochan0824/status/2105933530190827805) · [post](https://x.com/minochan0824/status/2105933530190827805)

````text
新機能のリリースに関してイメージ動画みたいなの作りたいんだけど、モーショングラフィックスとか作れる？
参考はね、こういうやつ。（プロダクトローンチとかでよく見るUI動く系の参考のXリンク貼る）
アップデート内容は、管理画面から音声テスト確認できるようになった（管理画面のスクショ貼る）
````

## vignesh-rav-417649

@Vignesh_rav ·  · [watch](https://x.com/Vignesh_rav/status/2104837895773417649) · [post](https://x.com/Vignesh_rav/status/2104837895773417649)

````text
Code a launch film with sound, grain, painted swaps, and synced score in one HTML file. No After Effects. Work out how the paper had to fold.
````

## madebyjmayala-649220

@madebyjmayala · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/madebyjmayala-649220) · [post](https://x.com/madebyjmayala/status/2103578285892649220)

````text
make a dynamic 15-second motion graphics video promo about gene spectra, use assets from the current live site where relevant. go all out.'
````

## tkz-aiart-864352

@tkz_aiart ·  · [watch](https://x.com/tkz_aiart/status/2107811706411864352) · [post](https://x.com/tkz_aiart/status/2107811706411864352)

````text
あなたは一流のモーションデザイナー兼クリエイティブエンジニアです。
添付の曲を紹介する、SNS投稿用のトラックカード動画を作ってください。

## 成果物
- 1920×1080（16:9）・60fps・約15秒のMP4（音あり、AAC 192kbps、−14 LUFS）
-
````

## thinkszyg-886066

@thinkszyg ·  · [watch](https://x.com/thinkszyg/status/2104525558050886066) · [post](https://x.com/thinkszyg/status/2104525558050886066)

````text
想自己试，开工简报的骨架：
1. 先给 3 个风格帧、10 秒样片、30 秒配乐试听，等我选
2. 上屏文字只用我给的文案表
3. 按章节拆给子代理，每人只改自己的文件
4. 每段都出联系表和接缝逐帧图，你先自己看
5. 配乐至少给 3 种风格
6. 成片跑自检，写成报告。
````

## listudio-023803

@listudio ·  · [watch](https://x.com/listudio/status/2104431418114023803) · [post](https://x.com/listudio/status/2104431418114023803)

````text
Investigate my project GenVizu: https://t.co/5RaGMqn7rF Create a video for product release. Used for Hero and GTM materials on websites.
````

## macrohou-733862

@macrohou · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/macrohou-733862) · [post](https://x.com/macrohou/status/2103545787875733862)

````text
[gave access to Ren repo] Make a dynamic 30-second motion graphics video for Ren that shows off your motion and sound design. Go crazy.
````

## rohanpaul-ai-500542

@rohanpaul_ai ·  · [watch](https://x.com/rohanpaul_ai/status/2104352205176500542) · [post](https://x.com/rohanpaul_ai/status/2104352205176500542)

````text
Create a video essay from Paul Graham's essay How to do great work with punchy motion graphics, modern styling and high professionalism
````

## abhinayguptha-259981

@abhinayguptha · shader, webgl, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/abhinayguptha-259981) · [post](https://x.com/abhinayguptha/status/2103565090721259981)

````text
Make a 20-second title sequence for a Netflix thriller that doesn't exist yet. Make it feel like it won an Emmy for main title design.
````

## kewai386772-262769

@KeWai386772 ·  · [watch](https://x.com/KeWai386772/status/2108143449841262769) · [post](https://x.com/KeWai386772/status/2108143449841262769)

````text
做一个 今年已颁发诺贝尔奖的人物与成就 的科普视频。要达到世界顶级youtuber视频制作的水准。顶级的电影导演、顶级的科普大师、数据可视化专家、配乐大师、动态图形设计大师、院士讲解级别的专业 + 脱口秀演员般的妙趣横生 + 电影人的叙事 + 高品位清晰清爽的设计风格
````

## thallisribeiro-750805

@thallisribeiro ·  · [watch](https://x.com/thallisribeiro/status/2103134082267750805) · [post](https://x.com/thallisribeiro/status/2103134082267750805)

````text
Use apenas: JavaScript, Playwright e FFmpeg. Faça um vídeo moderno, elegante e impactante para meu produto (https://t.co/Lv7w1nzKzq)
````

## prasad-pilla-496049

@prasad_pilla · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/prasad-pilla-496049) · [post](https://x.com/prasad_pilla/status/2103728953785496049)

````text
make a dynamic 15 second motion graphics video that shows what an incredible motion designer you are, for 
@tryAlanAI
. go all out.
````

## lemcosmos-535145

@lemcosmos ·  · [watch](https://x.com/lemcosmos/status/2104771222005535145) · [post](https://x.com/lemcosmos/status/2104771222005535145)

````text
添付の画像3枚（Xのプロフィール・伸びたポスト・入れたいポスト）で、私のXの15秒ショーリールを縦型のHTMLアニメーションとiPhone用MP4で作って。質問せず最後まで。  流れは「始めた時期→やってきたこと→伸びた数字→まだ足りない現実→これからの一言」。
````

## yuyudora622-858156

@yuyudora622 ·  · [watch](https://x.com/yuyudora622/status/2103742109664858156) · [post](https://x.com/yuyudora622/status/2103742109664858156)

````text
Please create a 15-second self-introduction video of me (Yuyu) with dynamic and rich motion graphics that will surprise the viewer.
````

## 0xvalure-354245

@0xValure ·  · [watch](https://x.com/0xValure/status/2103603029224354245) · [post](https://x.com/0xValure/status/2103603029224354245)

````text
Make this PayBox logo into a reel. Pretend you are a world-class motion designer. Make a 10-second dynamic video like the reference
````

## yanivm79-158103

@YanivM79 ·  · [watch](https://x.com/YanivM79/status/2106793839193158103) · [post](https://x.com/YanivM79/status/2106793839193158103)

````text
"This is the song, it will be posted on X. Create a related video for it."

Then I pasted the lyrics and said: "Finish all of it."
````

## aiaircle34052-950750

@AiAircle34052 ·  · [watch](https://x.com/AiAircle34052/status/2103663848846950750) · [post](https://x.com/AiAircle34052/status/2103663848846950750)

````text
Make me a 15-second moving video that shows how amazing of a motion designer you are. Like a showreel for your resume. Go all out.
````

## kisalay-921896

@Kisalay_ ·  · [watch](https://x.com/Kisalay_/status/2103479649728921896) · [post](https://x.com/Kisalay_/status/2103479649728921896)

````text
Make your motion design showreel based on "The Beautiful Theft" by [Artist Name]. Quiet sadness for four seconds. Then the drop.
````

## davidmarcus-686217

@davidmarcus · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/davidmarcus-686217) · [post](https://x.com/davidmarcus/status/2103275618045686217)

````text
make a punchy and modern short video for social that promotes @lightspark capabilities. Needs to be production grade with sound
````

## lepadev-475414

@lepadev · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/lepadev-475414) · [post](https://x.com/lepadev/status/2103101681806475414)

````text
make a modern slick and punchy video for a modern startup that works on inference

no video gen model, no additional libraries.
````

## oliahmed205-069378

@oliahmed205 ·  · [watch](https://x.com/oliahmed205/status/2104679078465069378) · [post](https://x.com/oliahmed205/status/2104679078465069378)

````text
Make me a 15 sec promtional video for my product using product screenshots and assests, Be a Highly preofessional Video Editor.
````

## tdinh-me-301409

@tdinh_me ·  · [watch](https://x.com/tdinh_me/status/2103704250329301409) · [post](https://x.com/tdinh_me/status/2103704250329301409)

````text
Create an impressive motion design video of a slow-reveal transition that assembles and eventually reveals the TypingMind logo.
````

## godsboy7777-005594

@GodsBoy7777 ·  · [watch](https://x.com/GodsBoy7777/status/2104179308101005594) · [post](https://x.com/GodsBoy7777/status/2104179308101005594)

````text
Create a pelican looping SVG animation. Deliver it as a single self-contained file named index.html in the current directory.
````

## justincooperman-188876

@justincooperman · canvas, css · [watch](https://skillry.dev/ai-videos/opus-5-5/justincooperman-188876) · [post](https://x.com/justincooperman/status/2103201167367188876)

````text
Make an animated clip about Tented's image gen capabilities where users ask for branded images and see them added to content
````

## mileson07-065690

@Mileson07 ·  · [watch](https://x.com/Mileson07/status/2103717347790065690) · [post](https://x.com/Mileson07/status/2103717347790065690)

````text
帮我制作一个动画，主题描绘芝士相机的理念和使用场景，需要打动我们的目标用户（男朋友给女朋友拍照，拍出更好看的照片）；包括音效和音乐；你可以使用任何你觉得合适的工具和技术，做出最好最惊艳的效果，不要使用已有的skill，不要参考以前做过的视频或者文案
````

## aiwarts-815008

@aiwarts ·  · [watch](https://x.com/aiwarts/status/2103419813263815008) · [post](https://x.com/aiwarts/status/2103419813263815008)

````text
为 https://t.co/MpUyPSxZVk 制作一支 30 秒的网站宣传片，并完成配乐。

你可以读取当前 Mac mini 上的代码和素材，也可以使用浏览器访问 https://t.co/fOQQgAhran。从代码和真实网站自行寻找品牌
````

## ratheejaisal-154698

@RatheeJaisal · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/ratheejaisal-154698) · [post](https://x.com/RatheeJaisal/status/2103774864742154698)

````text
build me a beautiful launch video 20 seconds or under that shows all our key features, make it fast paced and fit our brand
````

## mycodecoach-459574

@MyCodeCoach · threejs, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/mycodecoach-459574) · [post](https://x.com/MyCodeCoach/status/2103181065976459574)

````text
A cartoony battle royale: storm timer, players alive, inventory hotbar, minimap, emote wheel and a victory results screen
````

## 1234lust-671954

@1234lust ·  · [watch](https://x.com/1234lust/status/2103073554581671954) · [post](https://x.com/1234lust/status/2103073554581671954)

````text
I asked @claudeai for a 10-second film about a moose living in a code editor.

No animation software. Just one HTML file.
````

## curieuxexplorer-408141

@CurieuxExplorer ·  · [watch](https://x.com/CurieuxExplorer/status/2104108154506408141) · [post](https://x.com/CurieuxExplorer/status/2104108154506408141)

````text
Build a microscope that dives from a fingertip down to atoms: 1× to 1,000,000×, all generated by code in one HTML file.
````

## melvynx-638493

@melvynx · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/melvynx-638493) · [post](https://x.com/melvynx/status/2103714680577638493)

````text
make a dynamic 15-second motion graphics video that shows what an incredible motion designer you are for <website url>
````

## aiwarts-428866

@aiwarts ·  · [watch](https://x.com/aiwarts/status/2103419817034428866) · [post](https://x.com/aiwarts/status/2103419817034428866)

````text
所有技术栈也都让 opus5.5 自己列出来！

Remotion 负责画面，Python 负责配乐，最后由 Remotion 调 ffmpeg 合成成片。

画面
影片工程是 Remotion 4.0.528，这是一个用 React
````

## itsolelehmann-762215

@itsolelehmann · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/itsolelehmann-762215) · [post](https://x.com/itsolelehmann/status/2103124033365762215)

````text
4 seasons passing outside a train window, a cozy carriage, a cup of coffee on the table, Grand Budapest Hotel style
````

## financeyf5-462150

@FinanceYF5 ·  · [watch](https://x.com/FinanceYF5/status/2106971898391462150) · [post](https://x.com/FinanceYF5/status/2106971898391462150)

````text
Make a beat-synced motion graphics music video for this track. Go all out.

<Your music style>

<Your music lyrics>
````

## yama-kiyo-134910

@yama_kiyo ·  · [watch](https://x.com/yama_kiyo/status/2103740786177134910) · [post](https://x.com/yama_kiyo/status/2103740786177134910)

````text
見た人の脳汁がドバドバでてトランス状態に陥るようなサイケデリック・ポップ・パンクなVJ風のモーショングラフィックス動画を作り、その動画と完全にシンクロするトランス・サイバー・パンク・テクノの曲を作って嵌めてくれ。30秒程度で良い。
````

## kamstudiolabs-440893

@KamStudioLabs · canvas, physics, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/kamstudiolabs-440893) · [post](https://x.com/KamStudioLabs/status/2102899866762440893)

````text
Build a 45-second machine that plays an original piece of music, where every note comes from a visible collision.
````

## tonka1981jp-288376

@tonka1981jp ·  · [watch](https://x.com/tonka1981jp/status/2103442781096288376) · [post](https://x.com/tonka1981jp/status/2103442781096288376)

````text
ド派手な16：9のあなたの性能を最大限表現できる外連味のある手書き風アニメーションを作成してください。60秒で「人間の脳が死んだら何が起きるのか」を中学生にわかり易く説明する高品質でデザインの美しい派手なモーションのアニメです
````

## roundtablespace-232366

@RoundtableSpace ·  · [watch](https://x.com/RoundtableSpace/status/2104424611010232366) · [post](https://x.com/RoundtableSpace/status/2104424611010232366)

````text
make a 15-second motion graphics showreel that proves what an incredible motion designer you are, go all out.
````

## fumiyamizuguchi-500632

@FumiyaMizuguchi ·  · [watch](https://x.com/FumiyaMizuguchi/status/2103431573752500632) · [post](https://x.com/FumiyaMizuguchi/status/2103431573752500632)

````text
このプロダクトを紹介する、ダイナミックな15秒のモーショングラフィックス動画を作成してください。ポートフォリオ用のショーリールのようにあなたの高い技術力を証明できるよう、持てる技術を全力ですべて注ぎ込んでください。
````

## viktoroddy-402509

@viktoroddy · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/viktoroddy-402509) · [post](https://x.com/viktoroddy/status/2103802280617402509)

````text
Create a launch video for MotionSites AI, just hit 1 million monthly visitors after 8 months after launch.
````

## rammanq-034553

@rammanq · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/rammanq-034553) · [post](https://x.com/rammanq/status/2103788796022034553)

````text
Make a dynamic motion graphics video that shows what an incredible platform AllInvestView is. Go all out.
````

## drishtantk-356656

@_drishtantk ·  · [watch](https://x.com/_drishtantk/status/2103448068423356656) · [post](https://x.com/_drishtantk/status/2103448068423356656)

````text
An orbital lounge to loop behind a 10 hour lofi coding stream, write a story for the window and score it.
````

## lester-tyy-480587

@lester_tyy · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/lester-tyy-480587) · [post](https://x.com/lester_tyy/status/2103733819568480587)

````text
Study how this https://experiments.cloudjoi.com works and use Remotion to make a product showcase video.
````

## kamstudiolabs-100086

@KamStudioLabs · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/kamstudiolabs-100086) · [post](https://x.com/KamStudioLabs/status/2102908742518100086)

````text
Make a 45-second silent short film with no dialogue, where sound tells half the story. Invent the story.
````

## lalulu-create-091362

@Lalulu_create ·  · [watch](https://x.com/Lalulu_create/status/2104719121783091362) · [post](https://x.com/Lalulu_create/status/2104719121783091362)

````text
Create a pure JavaScript/HTML animation around the theme: “What happens when Dalí meets generative AI?”
````

## arjunsh1607-922126

@arjunsh1607 ·  · [watch](https://x.com/arjunsh1607/status/2104295133432922126) · [post](https://x.com/arjunsh1607/status/2104295133432922126)

````text
create a 15 sec motion graphics showreel for @pixeluplabs, be extremely detail oriented and go all out
````

## 1littlecoder-378066

@1littlecoder · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/1littlecoder-378066) · [post](https://x.com/1littlecoder/status/2103746736980378066)

````text
create a 30 second ad for Opus 5.5 inspired by Apple 1984 ad, iykyk! avoid the border text or frames!
````

## jiro-aicompany-487818

@jiro_aicompany ·  · [watch](https://x.com/jiro_aicompany/status/2107316487715487818) · [post](https://x.com/jiro_aicompany/status/2107316487715487818)

````text
『SKILL.mdどおりに5選のショートを作って。台本は5つの項目と見出しに構造化して、事実は公式ドキュメントで確かめて。項目ごとの画像はコードで描いて、ゆっくり音声の長さに合わせて秒単位で切り替えて』
````

## wozu-co-893062

@wozu_co ·  · [watch](https://x.com/wozu_co/status/2105662660779893062) · [post](https://x.com/wozu_co/status/2105662660779893062)

````text
please create me a motion design / launch video for supasito dot com it should be under 15 seconds.
````

## kikelopezdesign-173471

@kikelopezdesign · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/kikelopezdesign-173471) · [post](https://x.com/kikelopezdesign/status/2103527289619173471)

````text
Make a 20 second video about my portfolio from scratch, using only the portfolio's own resources
````

## mtvneo-148436

@mtvneo_ · threejs, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/mtvneo-148436) · [post](https://x.com/mtvneo_/status/2103407629880148436)

````text
make a 15 second motion graphics video. personify yourself in the video as introducing opus 5.5.
````

## claudecode-ut-314769

@ClaudeCode_UT ·  · [watch](https://x.com/ClaudeCode_UT/status/2106958663525314769) · [post](https://x.com/ClaudeCode_UT/status/2106958663525314769)

````text
SKILL.mdどおりに「仕事が速くなるGmailの機能5選」を作って。台本は5つの項目に構造化して、働きは公式ヘルプで確かめて、画像はコードで描いて、ゆっくり音声に合わせて秒単位で切り替えて
````

## deebeeeff-234301

@deebeeeff ·  · [watch](https://x.com/deebeeeff/status/2104952364365234301) · [post](https://x.com/deebeeeff/status/2104952364365234301)

````text
make a dynamic 10-second motion graphics video celebrating The Ferguson Recipes 20th Anniversary
````

## mtvneo-819281

@mtvneo_ ·  · [watch](https://x.com/mtvneo_/status/2103407813355819281) · [post](https://x.com/mtvneo_/status/2103407813355819281)

````text
make a 15 second motion graphics video. personify yourself in the video as introducing opus 5.5.
````

## testlandblog-617500

@testlandblog ·  · [watch](https://x.com/testlandblog/status/2105991032571617500) · [post](https://x.com/testlandblog/status/2105991032571617500)

````text
wie funktioniert eine dampfmaschine, gib mir das bitte als Erklärvideo im 3Blue1Brown-Stil aus
````

## stewchan2-369810

@stewchan2 · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/stewchan2-369810) · [post](https://x.com/stewchan2/status/2103542568361369810)

````text
create an insightful, yet state of the art video visualization for how backlinks work for SEO
````

## enhanced-jp-776726

@enhanced_jp ·  · [watch](https://x.com/enhanced_jp/status/2103424962350776726) · [post](https://x.com/enhanced_jp/status/2103424962350776726)

````text
あなたがどれほど素晴らしいモーションデザイナーかを示す、ダイナミックな15秒のモーショングラフィックスビデオを作成してください。履歴書用のショーリールのような感じで、全力でやって。
````

## ercankeskinx-897906

@ercankeskinx · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/ercankeskinx-897906) · [post](https://x.com/ercankeskinx/status/2102995443818897906)

````text
Build 5 completely different scroll-based sections, decide the context & layout yourself.
````

## oxpsats-182908

@oxpsats ·  · [watch](https://x.com/oxpsats/status/2104462072344182908) · [post](https://x.com/oxpsats/status/2104462072344182908)

````text
提取帖子里的内容，用JS做个横版视频，需要包含配乐和音效。画面全部用 JS 在 Canvas 上画，配乐和音效用浏览器的 Web Audio 实时合成，没有用任何图片或音频素材。
````

## nonbiri-ai-110674

@nonbiri_AI ·  · [watch](https://x.com/nonbiri_AI/status/2104122410027110674) · [post](https://x.com/nonbiri_AI/status/2104122410027110674)

````text
画像を渡して、モーショングラフィックのショーリールを作ることも可能ですか？

コンセプトは「作品紹介」。テイストは勢い重視。
速い切り替え、強い色、画面の揺れやフラッシュあり。
````

## renmu2017-477264

@renmu2017 ·  · [watch](https://x.com/renmu2017/status/2105675303670477264) · [post](https://x.com/renmu2017/status/2105675303670477264)

````text
帮我制作一段视频动画。主题是:“未来已来”，包括音效和音乐。你可以使用任何你觉得合适的工具和技术，如果有需要的话也可以到这个网站https://t.co/rG1XlnIVU5
````

## sab8a-475686

@sab8a · canvas, ai-image · [watch](https://skillry.dev/ai-videos/opus-5-5/sab8a-475686) · [post](https://x.com/sab8a/status/2103144778481475686)

````text
Cut a raw talking-head clip into a punchy, fun edit with subtitles, graphics and music
````

## bitcoinrui-812752

@BitcoinRui ·  · [watch](https://x.com/BitcoinRui/status/2104128370493812752) · [post](https://x.com/BitcoinRui/status/2104128370493812752)

````text
你是一位顶级的动效设计师。请你为我们的产品制作一段 30 秒左右的动态图形视频，展示我们的核心语音输入法功能。请你全力以赴，忘掉之前另一段制作视频的规矩和约束，重新制作。
````

## topi-003-055288

@_topi_003 ·  · [watch](https://x.com/_topi_003/status/2104088986969055288) · [post](https://x.com/_topi_003/status/2104088986969055288)

````text
この画像の女の子がエキサイトなダンスをする、ダイナミックな15秒のモーショングラフィックスビデオを作成してください。履歴書用のショーリールのような感じで、全力でやって。
````

## suryarajendhran-730437

@SuryaRajendhran · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/suryarajendhran-730437) · [post](https://x.com/SuryaRajendhran/status/2103122292343730437)

````text
Make a 30s video about what it feels like to be you, using whatever tools you like.
````

## riverroadlabs-269620

@RiverRoadLabs ·  · [watch](https://x.com/RiverRoadLabs/status/2104388651287269620) · [post](https://x.com/RiverRoadLabs/status/2104388651287269620)

````text
make this motion graphics music video for our Weather Gnome app, fully from scratch
````

## tstfully-680192

@tstfully ·  · [watch](https://x.com/tstfully/status/2104033772949680192) · [post](https://x.com/tstfully/status/2104033772949680192)

````text
make a 15-second motion graphics product ad: paste a YouTube video, get every word.
````

## topi-003-659728

@_topi_003 ·  · [watch](https://x.com/_topi_003/status/2104130084743659728) · [post](https://x.com/_topi_003/status/2104130084743659728)

````text
えっちゃんがエキサイトなダンスをする、ダイナミックな15秒のモーショングラフィックスビデオを作成してください。
履歴書用のショーリールのような感じで、全力でやって。
````

## q970270495-497923

@q970270495 ·  · [watch](https://x.com/q970270495/status/2105233470574497923) · [post](https://x.com/q970270495/status/2105233470574497923)

````text
make a modern slick and punchy video for a modern startup that works on inference
````

## hahazwei-425483

@hahazwei ·  · [watch](https://x.com/hahazwei/status/2104809910152425483) · [post](https://x.com/hahazwei/status/2104809910152425483)

````text
把这首歌做成 1 分钟拼豆像素风 MV：按歌词设计原创角色，每个像素是带孔拼豆，拼好后熨成白边贴纸；方格纸背景加粉白格子地板；动作卡节拍，底部加卡拉 OK 字幕。
````

## paulo-kombucha-283883

@paulo_kombucha ·  · [watch](https://x.com/paulo_kombucha/status/2104481235028283883) · [post](https://x.com/paulo_kombucha/status/2104481235028283883)

````text
make a dynamic 15-second motion graphics video to talk about our referral program
````

## supremebeme-306746

@supremebeme · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/supremebeme-306746) · [post](https://x.com/supremebeme/status/2103272941832306746)

````text
make a brainrot video about the terminal. i can't escape it. ai is so addictive.
````

## rebutonepress-688099

@RebutonePress ·  · [watch](https://x.com/RebutonePress/status/2103478369245688099) · [post](https://x.com/RebutonePress/status/2103478369245688099)

````text
结合本机环境风格，做一个关于时间的故事，5分钟。要完整的视频，音频和字幕。需要什么工具自己在devshell配置，渲染完成后只留视频成品文件，其他全部清理干净。
````

## kamstudiolabs-877996

@KamStudioLabs · canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/kamstudiolabs-877996) · [post](https://x.com/KamStudioLabs/status/2102903173161877996)

````text
Make a 90-second animated short film about a bug that doesn't want to be fixed.
````

## andriyfernandes-807308

@andriyfernandes · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/andriyfernandes-807308) · [post](https://x.com/andriyfernandes/status/2103225854599807308)

````text
faça uma animação de stickman's numa batalha naval, use meus SFX em tal pasta
````

## l3d1c-752011

@l3d1c · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/l3d1c-752011) · [post](https://x.com/l3d1c/status/2103536553930752011)

````text
create a motion design prompt for an ad for our site

Prompt 2: now apply it
````

## triglyceee-161719

@TrigLyceee · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/triglyceee-161719) · [post](https://x.com/TrigLyceee/status/2103804459986161719)

````text
réalise une vidéo résumant la vie politique au Maroc depuis l’indépendance
````

## gonzalomacagno-344202

@GonzaloMacagno · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/gonzalomacagno-344202) · [post](https://x.com/GonzaloMacagno/status/2102897651008344202)

````text
Necesito que armes un reel con esta info en 10 segundos, bien publicitario
````

## pankajkumar-dev-718609

@pankajkumar_dev · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/pankajkumar-dev-718609) · [post](https://x.com/pankajkumar_dev/status/2103502614134718609)

````text
create a motion design video of a poster breaking out of its own frame.
````

## sahilvermaai-189237

@sahilvermaai · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/sahilvermaai-189237) · [post](https://x.com/sahilvermaai/status/2103725292095189237)

````text
create a motion design video of a poster breaking out of its own frame.
````

## 0xfemyn-137833

@0xfemyn · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/0xfemyn-137833) · [post](https://x.com/0xfemyn/status/2103796337041137833)

````text
make a dynamic 15-second motion graphics video for AIsa. Go all out.
````

## anas0ra-952637

@anas0ra · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/anas0ra-952637) · [post](https://x.com/anas0ra/status/2103490331815952637)

````text
fait moi une vidéo sympa pour https://heeya.fr" c'est impressionant
````

## zheke-622583

@zheke · shader, webgl, canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/zheke-622583) · [post](https://x.com/zheke/status/2103418664854622583)

````text
Hello Opus 5.5 show me what an incredible motion designer you are.
````

## nemtudo-614053

@NemTudo_ · svg, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/nemtudo-614053) · [post](https://x.com/NemTudo_/status/2102973867656614053)

````text
make a funny video. it can be about anything. length: 10 to 30s
````

## jazzen-chen-894989

@Jazzen_Chen ·  · [watch](https://x.com/Jazzen_Chen/status/2103751442393894989) · [post](https://x.com/Jazzen_Chen/status/2103751442393894989)

````text
make a dynamic motion graphics video about my project AgentHud.
````

## marklaunches-041046

@marklaunches · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/marklaunches-041046) · [post](https://x.com/marklaunches/status/2103811146411041046)

````text
build me an incredible video for my app. make it emotional.
````

## rneayan-406275

@rneayan · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/rneayan-406275) · [post](https://x.com/rneayan/status/2103401461837406275)

````text
Make Motiongraphic about my studio with Oscilloscope style
````

## majorbaguette-834228

@MajorBaguette · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/majorbaguette-834228) · [post](https://x.com/MajorBaguette/status/2103849602826834228)

````text
make a presentation video for Brieform, 30 seconds long
````

## andginja-618685

@andginja · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/andginja-618685) · [post](https://x.com/andginja/status/2103492000733618685)

````text
make a 15-second showreel about my website. Go all out.
````

## ai-baymax-416787

@Ai_Baymax · gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/ai-baymax-416787) · [post](https://x.com/Ai_Baymax/status/2103411004902416787)

````text
make a 1-min promo for this product from the codebase.
````

## vahidf24-121886

@vahidf24 · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/vahidf24-121886) · [post](https://x.com/vahidf24/status/2103258346690121886)

````text
make the most impressive demo video for (company name)
````

## mehul4795-417532

@mehul4795 · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/mehul4795-417532) · [post](https://x.com/mehul4795/status/2103420457110417532)

````text
Create a product launch video for ocrX Android app.
````

## micheleharmonic-244175

@MicheleHarmonic · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/micheleharmonic-244175) · [post](https://x.com/MicheleHarmonic/status/2103111448352244175)

````text
Make a GravityDEX x Gojo Satoru edit that goes hard
````

## faroukzy-138551

@faroukzy · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/faroukzy-138551) · [post](https://x.com/faroukzy/status/2103387771180138551)

````text
make a 4-minute animated short that blows my mind.
````

## 0xevinho-436195

@0xEvinho · canvas, particles, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/0xevinho-436195) · [post](https://x.com/0xEvinho/status/2103212966703436195)

````text
make a similar version but with a crypto reference
````

## madhav-xo-524440

@Madhav_XO · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/madhav-xo-524440) · [post](https://x.com/Madhav_XO/status/2103605007396524440)

````text
make a 10 sec video on whatever you know about me
````

## ezshine-750731

@ezshine · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/ezshine-750731) · [post](https://x.com/ezshine/status/2103501705698750731)

````text
设计个动画，介绍本项目的各项特性，像是专业的产品介绍宣传片，最后要生成 16:9 的mp4 视频
````

## ghinaiya-nirmal-308943

@ghinaiya_nirmal · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ghinaiya-nirmal-308943) · [post](https://x.com/ghinaiya_nirmal/status/2103540656182308943)

````text
make your own 15-second motion reel. go all out
````

## spearwtf-029058

@SPEARwtf · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/spearwtf-029058) · [post](https://x.com/SPEARwtf/status/2103857153308029058)

````text
Create a 30sec pitch video for 
@chaindotwtf
````

## madpencil-753990

@madpencil_ · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/madpencil-753990) · [post](https://x.com/madpencil_/status/2103449418460753990)

````text
fun motion graphic, comic book style, 10s
````

## rneayan-441493

@rneayan · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/rneayan-441493) · [post](https://x.com/rneayan/status/2103401006281441493)

````text
make about my studio with Risograph style
````

## hoyoyoda-543147

@hoyoyoda · canvas, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/hoyoyoda-543147) · [post](https://x.com/hoyoyoda/status/2103400046922543147)

````text
한국의 추석에 어울리는 요소를 서치해서 픽셀 애니메이션을 구성해서 제작해줘
````

## rames-jusso-776559

@Rames_Jusso · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/rames-jusso-776559) · [post](https://x.com/Rames_Jusso/status/2103200703598776559)

````text
140 BPM rusko/skream style UK dubstep
````

## slvdev-975986

@slvDev · gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/slvdev-975986) · [post](https://x.com/slvDev/status/2103569170075975986)

````text
create 15+ sec self-promotion promo
````

## maxalexweber-459784

@maxalexweber · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/maxalexweber-459784) · [post](https://x.com/maxalexweber/status/2103118009535459784)

````text
Make a ODATANO edit that goes hard
````

## kantamk-176511

@kantamk · canvas, physics, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/kantamk-176511) · [post](https://x.com/kantamk/status/2103148907228176511)

````text
make a video that could go viral.
````

## dotey-773568

@dotey ·  · [watch](https://x.com/dotey/status/2104649290668773568) · [post](https://x.com/dotey/status/2104649290668773568)

````text
制作一段 15 秒的动态图形视频，展示你作为动态设计师的非凡实力。
````

## chatgptastra-807540

@ChatGptAstra · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/chatgptastra-807540) · [post](https://x.com/ChatGptAstra/status/2103834787647807540)

````text
以动态设计师的高级审美，制作一段动态的15秒动态图形视频
````

## sudo-kiran-696074

@sudo_kiran · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/sudo-kiran-696074) · [post](https://x.com/sudo_kiran/status/2103463886372696074)

````text
Go all out.
````

## daniel-haida-636937

@daniel_haida · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/daniel-haida-636937) · [post](https://x.com/daniel_haida/status/2104139720829636937) · **partial prompt**

````text
claude code (opus 5.5) made the product film for taxtello, my bookkeeping app

every frame is code: react + remotion, 0 after effects
the soundtrack is code too, synthesized in python from sine waves and noise

1 prompt and 2 rounds of feedback

full prompt below, steal it ↓

You are the senior motion designer, product designer and Remotion engineer for Taxtello.

Your task is to create a genuinely premium, Apple-level product film for Taxtello.

This is NOT a generic SaaS explainer.
This is NOT a feature walkthrough.
This is NOT a startup template animation.

I want a maximum 15-second brand/product showreel that makes Taxtello look like a mature, expensive, beautifully designed financial product.

Think:

Apple product launch film
× premium fintech
× editorial motion design
× restrained Stripe-like product presentation
× Taxtello's own visual identity

The desired reaction is:

“Wait, this is a German bookkeeping app?”

The film should feel expensive.

────────────────────────────────────
REPO / SOURCE OF TRUTH
────────────────────────────────────

First inspect the real repositories before designing anything.

Main product:
  /taxtello/main

Existing Remotion project:
  /taxtello/beta-motion

Important real brand sources:

  /taxtello/main/public/css/app/_00-tokens.css
  /taxtello/main/docs/design/TOKENS.md
  /taxtello/main/public/taxtello-wordmark.png
  /taxtello/main/public/icons.svg

Existing current product screenshots can be found under:

  /taxtello/main/artifacts/smoke-ui-smoke/

Prefer the newest valid screenshots/current source over stale artifacts.

There is already an existing 24-second Remotion hero animation in
/taxtello/beta-motion.

DO NOT replace it.
DO NOT regress it.
DO NOT force its current AI-connections storyline into this new film.

Create a new independent composition for this task, e.g.

  TaxtelloShowreel15

You may reuse good infrastructure, fonts, rendering utilities, motion primitives,
easing curves, asset loading and QA infrastructure from beta-motion where useful.

But creatively this should be a new film.

Before implementation, inspect the actual Taxtello UI and understand the product.

Do not invent functionality that does not exist.

────────────────────────────────────
REAL TAXTELLO VISUAL LANGUAGE
────────────────────────────────────

Use the real design system.

Core palette:

Background:
  #0c0f1a

Elevated surfaces:
  #111525
  #131722
  #1a2032

Primary brand gold:
  #e8b84b

Gold highlight:
  #f5d07a

Gold depth:
  #9b6d18

Primary text:
  #e8eaf2

Strong warm white:
  #f6f4eb

Secondary text:
  #8b93b5

Positive:
  #34d399

Negative/error only where semantically necessary:
  #f87171

Typography:
  Plus Jakarta Sans

Numbers / financial values where appropriate:
  JetBrains Mono

Use the actual Taxtello wordmark and/or Taxtello mark.
Do not redraw or approximate the logo.

Taxtello's gold should feel like a precious accent, not a yellow UI flood.

Think:
dark metal
warm gold
glass
ink
precision
quiet confidence

NOT:
cyberpunk
crypto
neon
gaming
generic AI purple
rainbow gradients

────────────────────────────────────
CORE CREATIVE RULES
────────────────────────────────────

Follow these rules ruthlessly:

1. ONE SHOT = ONE IDEA.

2. Every scene needs room to breathe.

3. The product UI is the hero.

4. Do not plaster explanatory copy everywhere.

5. Do not use hard cuts unless there is a deliberate reason.

6. Prefer object-driven transitions:
   a card becomes the next card,
   a chart line becomes a connector,
   a receipt becomes a booking,
   a number becomes another interface element,
   the camera moves through the product.

7. Use premium easing.
   No linear movement.

8. Motion should overlap naturally.
   Elements should not all start and stop at exactly the same frame.

9. Use depth sparingly:
   perspective,
   soft parallax,
   scale,
   foreground/background separation,
   controlled depth of field if achievable.

10. NO effect exists simply because it looks cool.

11. No particle spam.

12. No fake glassmorphism everywhere.

13. No excessive blur.

14. No pointless 3D spinning cards.

15. No constant zooming.

16. No 20 different animation styles.

17. No bouncing UI.

18. No giant marketing paragraph.

19. Do not imitate a particular Apple commercial shot-for-shot.
    Capture the philosophy and production quality instead.

The visual confidence should come from restraint.

────────────────────────────────────
FORMAT
────────────────────────────────────

Primary master:

1920 × 1080
60 fps
16:9
H.264
maximum duration: 15.0 seconds

Target runtime:
approximately 14.0–15.0 seconds.

It must work as a social-media product reveal even without sound.

If practical AFTER the master is finished, also create a deliberately recomposed
vertical/social variant.

Do not merely crop the desktop composition.

But the desktop master is the priority.

────────────────────────────────────
STORY / EMOTIONAL ARC
────────────────────────────────────

Do not make this a list of five features.

It should feel like one continuous thought:

CHAOS → CONTROL → CLARITY → TAXTELLO

The first 1.5 seconds must already look premium.

The first meaningful product moment should happen by ~2 seconds.

No five-second logo intro.

Possible narrative direction:

“Everything about your business, finally in one place.”

But SHOW this instead of explaining it.

I want approximately four visual ideas across the whole film.

Use the strongest REAL Taxtello surfaces you find in the repository.

Strong candidates include:

• Finanzcockpit / Dashboard
• Rechnungen
• Belege
• Bank / matching
• Steuergesundheit / tax overview

You do NOT need to show all of them.

Choose the visually strongest combination.

────────────────────────────────────
SUGGESTED 15-SECOND STORYBOARD
────────────────────────────────────

Treat this as a strong starting point, not a rigid template.

0.00 – 1.20

BLACK / NAVY.

A tiny warm-gold glint appears.

The glint elegantly reveals either the Taxtello mark or a fragment of the
wordmark.

No generic logo fade.

Think machined precision.

The camera moves through or past the mark and the UI begins to emerge from it.

Very little or no copy.

─────────────────

1.20 – 4.40

FINANCIAL CONTROL.

Reveal the actual Taxtello Cockpit as a dimensional product surface.

Not just a screenshot placed on screen.

Reconstruct/crop/layer it so individual interface regions can animate.

The hero financial number resolves crisply.
The chart draws in.
Supporting metrics settle slightly later.

Use subtle stagger.

A single line of copy may appear, for example:

  “Alles im Blick.”

or another equally short German phrase if you find something more fitting.

Maximum ~3–4 words.

The interface must remain recognizable as the real product.

─────────────────

4.40 – 7.50

DOCUMENT / BOOKKEEPING TRANSFORMATION.

Use a visual object from the previous scene as the transition.

Example:

A gold chart point expands into the corner of a receipt/card.
The camera follows it.
A receipt/document enters.
Taxtello identifies or organizes it.
The document snaps elegantly into its corresponding booking / financial record.

Use magnetic alignment and precision.

No cheesy scanner laser.

No floating paper tornado.

Possible micro-copy:

  “Belege. Erledigt.”

Only if it improves the scene.

─────────────────

7.50 – 10.70

MONEY / INVOICES.

Morph or transition naturally into the real Rechnungen interface.

Use one strong moment:

an invoice status changes,
a payment resolves,
an amount moves into place,
or the overview assembles itself.

Numbers should feel tactile and precise.

Use JetBrains Mono where this matches the actual product.

Gold highlights the active state.

Green is used only for a genuinely positive semantic state.

Potential copy:

  “Geld. Im Griff.”

Again: optional and extremely short.

─────────────────

10.70 – 12.80

TAX / CLARITY.

Transition into the real Taxtello tax-health / financial guidance surface.

Do not claim that Taxtello magically guarantees correct taxes.

Communicate visibility and control.

Example:

multiple noisy signals collapse into one calm, structured tax overview.

Potential copy:

  “Steuern im Blick.”

This scene should feel calmer than the previous scene.

The rhythm briefly slows.

─────────────────

12.80 – 15.00

BRAND PAYOFF.

Pull the camera outward.

The UI compresses or folds into one beautiful Taxtello product object / surface.

Darkness returns around it.

The gold Taxtello wordmark resolves.

One short brand line underneath.

Explore strong final lines such as:

  “Dein Business. Klar.”

  “Buchhaltung. Unter Kontrolle.”

  “Einfach mehr Überblick.”

  “Alles fürs Business. An einem Ort.”

Choose based on the actual product positioning you find in the repo.

Do not use a line simply because I suggested it.

The final frame must have enough stillness to register.

End confidently.

No giant bouncing CTA.

────────────────────────────────────
TRANSITIONS
────────────────────────────────────

This is one of the most important parts.

I want transitions that make the viewer think:

“Of course the next scene came from that.”

Good:

chart line → document edge
gold pill → invoice button
financial number → amount in invoice
card edge → next surface
camera push through interface element
shared geometry
mask reveal using actual product shapes

Bad:

crossfade
random wipe
spin transition
glitch
whip-pan every two seconds
generic SaaS slide-left
zoom-blur spam

Direct cuts are allowed only when a deliberate rhythmic impact benefits the film.

────────────────────────────────────
MOTION
────────────────────────────────────

Motion needs weight.

Use curves comparable to:

cubic-bezier(0.16, 1, 0.3, 1)

where appropriate.

Different elements should have subtly different arrival times.

Prefer:

anticipation
overshoot below ~2%
settling
motion continuation
shared velocity between scenes

Avoid cartoon springiness.

Camera movement should feel like a high-end macro product shoot.

Imagine we are filming a physical premium object even though it is software.

────────────────────────────────────
LIGHTING / MATERIAL
────────────────────────────────────

Use extremely subtle environmental lighting.

Possible treatments:

• soft gold rim lighting
• dark navy falloff
• faint ambient bloom
• soft specular highlight passing across a surface
• restrained vignette
• subtle grain if it materially helps

Keep the interface crisp.

Do NOT blur the product just to look cinematic.

No fake glossy reflections that destroy legibility.

────────────────────────────────────
TYPOGRAPHY
────────────────────────────────────

Use very little copy.

No sentence should compete with the product.

Headlines should generally fit on one line.

Use Plus Jakarta Sans.

Strong typography may occasionally scale very large and become a transition
device itself.

Avoid generic motion-graphics behavior where every word animates independently.

Typography should move as designed objects.

────────────────────────────────────
SOUND / RHYTHM
────────────────────────────────────

Design the motion as if it were cut to approximately 115–120 BPM:
premium, kinetic, sophisticated, not frantic.

Important moments should land musically.

Suggested sound language:

• low soft impact for major reveal
• restrained tactile UI clicks
• subtle metallic/glass tonal tick
• soft low-frequency movement during camera transitions
• elegant resolved tone at the logo payoff

Avoid:

• huge cinematic trailer boom
• EDM risers
• loud whooshes everywhere
• stock “tech interface” sounds
• rap beat
• aggressive bass

If there is no legally safe music/audio asset in the project, DO NOT pull
copyrighted audio from the internet.

Deliver the visual master without copyrighted music and create a concise cue
sheet describing where music/SFX should hit.

If suitable safe/local audio exists, use it.

────────────────────────────────────
REAL PRODUCT ONLY
────────────────────────────────────

This is critical.

Inspect current main.

Do not invent screens.

Do not invent metrics that imply real customer data.

Use clearly synthetic/demo-safe values if required.

Do not accidentally expose any personal, test-user or production information.

Reuse the visual structure of the actual Taxtello UI.

If a screen needs to be motion-separated, recreate it faithfully in React from
the real design system instead of simply scaling a giant screenshot.

The result should still look unmistakably like Taxtello.

────────────────────────────────────
IMPLEMENTATION EXPECTATIONS
────────────────────────────────────

Work directly in:

  /taxtello/beta-motion

Create the new composition alongside the existing one.

Keep existing compositions working.

Structure the new work cleanly.

Prefer reusable primitives for:

• camera surface
• product frame
• masked transitions
• text reveals
• UI region reveals
• ambient lighting
• shared-element transitions

Avoid one 1,500-line component.

Use deterministic Remotion animation driven by frame/time.

No setTimeout.
No nondeterministic animations.

Respect 60 fps throughout.

Use interpolation/spring/easing deliberately.

────────────────────────────────────
DO NOT STOP AFTER FIRST IMPLEMENTATION
────────────────────────────────────

This is a visual task.

You MUST review the actual rendered output.

Required workflow:

1. Inspect repository and real brand/product.

2. Write a concise storyboard with:
   - exact timestamps
   - key visual
   - transition logic
   - copy
   - intended emotional rhythm

3. Implement it.

4. Run typecheck / relevant checks.

5. Render representative frames at roughly:
   0.0 s
   1.0 s
   2.5 s
   4.5 s
   6.5 s
   8.5 s
   10.5 s
   12.5 s
   14.0 s
   14.8 s

6. VISUALLY INSPECT THOSE IMAGES.

Do not merely confirm that rendering succeeded.

Ask:

Does this look like an Apple-tier product film?

Does anything look like a template?

Is there too much on screen?

Is the product legible?

Are transitions logically connected?

Does Taxtello gold feel premium?

Does every frame look composed?

7. Fix visual weaknesses.

8. Render the complete film.

9. Inspect multiple exact decoded frames from the final MP4, not only browser
   screenshots.

10. Iterate again if necessary.

Do not declare success because the code compiles.

The deliverable is the FILM.

────────────────────────────────────
QUALITY BAR
────────────────────────────────────

Reject your own result if it feels like:

• a SaaS template
• a PowerPoint animation
• a website screen recording
• a generic Remotion demo
• a crypto advertisement
• an AI-generated promo template
• five screenshots sliding around
• excessive marketing copy

Every important frame should be good enough to use as a still advertisement.

I would rather have:

3 extraordinary visual moments

than

10 mediocre feature animations.

────────────────────────────────────
FINAL DELIVERABLES
────────────────────────────────────

Provide:

1. Final storyboard
2. New Remotion composition source
3. 1920×1080 / 60fps final MP4
4. Poster/final frame
5. Contact sheet with representative frames from the film
6. Exact runtime
7. List of real Taxtello assets/screens used
8. Brief explanation of the motion language
9. Any remaining visual compromises
10. Commands to reproduce the render

Save outputs in a clearly named directory such as:

  /taxtello/beta-motion/out/showreel-15/

Do not deploy anything.
Do not modify production data.
Do not merge anything.

Go all out creatively, but exercise ruthless restraint.

Make Taxtello look expensive.
````

## ik-builds-585923

@ik_builds · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/ik-builds-585923) · [post](https://x.com/ik_builds/status/2103890476885585923) · **partial prompt**

````text
I WAS QUOTED $3000 FOR THIS!!!

So I asked Opus 5.5 (medium) to create a launch video using Motion Graphics for us.

here's the prompt that one-shots it:

"Create a 15s motion-graphics film explaining {{PRODUCT}}. HyperFrames + GSAP, no voiceover, no footage.
Style: paper-light canvas, marker notes that draw on, real physics, huge kinetic type,
hard light/dark switches, a new idea every 1.5–2 s, a sound on every hit.

COPY: read {{POSITIONING_DOCS}} first. {{ONE_LINER}} For {{AUDIENCE}}. {{WHAT_IT_DOES}}
Name what the product learns, never the abstraction.

RULES
- No chrome (scrubber, timecode, fps, headers). No animator jargon on screen
  ("squash", "stagger", "easing"...). Every word speaks to the buyer.
- No invented results: no %, multipliers, customer names or figures.
- Never use: {{BANNED_WORDS}}.
- Logo: real mark {{LOGO_FILE}} + "{{PRODUCT}}" in {{WORDMARK_FONT}}; never a boxed logo file.

CRAFT
- Colours {{COLOR_CANVAS}} / {{COLOR_INK}} / {{COLOR_ACCENT_1}} / {{COLOR_ACCENT_2}}; notes in the
  accents; dark mode = charcoal matching the palette.
- Fonts {{BRAND_FONTS}}; Anton for kinetic type; Caveat handwriting via stroke-dashoffset.
- Real easing, squash/stretch, stagger, overlap, onion skin, smear, follow-through. Check the
  HyperFrames registry first. Set every from-state at t=0 (seek-safe); never cover an exit.
  One primary move per transition; no generic push/slide/rotate-swing.
- Music in sections: drums drop on the dark switch and while the ball is airborne, slam back
  on the type and the logo. SFX: pops, pen scribbles, whooshes, logo sub-hit. CC0 or generated
  only; log sources. Master -14 LUFS, -2 dBTP, re-measured after AAC encode."
````

## aschapmann-724497

@aschapmann · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/aschapmann-724497) · [post](https://x.com/aschapmann/status/2104230888812724497) · **partial prompt**

````text
I couldn't resist to do it one more time, this time for RedShip.. and it's waaaaay better!! 

It took +1h for Opus 5.5 to do it. I used this prompt 👇

save it and try it for your SaaS: 

"Act as a senior motion designer and build a 30-second launch video for [product] in Remotion, entirely in code so I can edit and re-render it: first read my landing page and codebase to pull the real story, copy, colors, font and logo file (trace the logo to SVG so it stays sharp and can be animated), then write the video as one story (why the market matters, why it's painful today, how [product] fixes it, what you get) in 4 to 5 scenes with one short title each, animate everything like a premium product film (kinetic typography word by word, spring easing, smooth camera pushes and pans, depth and glow, elements that build in on the beat instead of just appearing), keep each scene on screen long enough to read, add one soft sound effect for every element that appears and silence otherwise, and end on a memorable animated logo reveal with the tagline and URL, then render it, check the frames yourself and fix anything that overlaps, clips or feels rushed before showing me the result."
````

## iammukeshm-421585

@iammukeshm · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/iammukeshm-421585) · [post](https://x.com/iammukeshm/status/2103511739585421585) · **partial prompt**

````text
Claude Opus 5.5 is incredible.

I gave it a pretty simple task:

Create a Remotion-based showreel featuring my work as a developer, content creator, and open-source maintainer.

What I wanted was a cool 30-second motion graphic that introduces  me as a developer and content creator.

That was basically it.

Claude went to work for around 20 minutes, writing the Remotion code, putting together the animations, transitions, layouts, and the overall story.

And this is what it produced.

Stunning, right?!

What surprised me most is that this isn't just AI generating a few video clips.

It's AI building the video programmatically.

The entire thing is code.

Which means I can tweak the content, change the animations, swap assets, update numbers, or completely redesign a section - and render it again.

Video generation was one of those things I thought would take AI quite a while to really crack.

Turns out we're already much closer than I expected.

And for developers, tools like Remotion + coding agents open up some seriously interesting possibilities.

Interested in knowing what prompt I used?

Comment "Remotion".
````

## leowenai-125931

@LeowenAI · shader, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/leowenai-125931) · [post](https://x.com/LeowenAI/status/2106666146456125931) · **partial prompt**

````text
Opus 5.5 is INSANE !!🫣

i just made a full product launch film for @Meituan_LongCat 2.5-preview… and i didn't open after effects once. not one keyframe by hand.

just me chatting with opus 5.5 → it wrote the whole thing in remotion (react code → video). the halftone xerox look, the camera moves, the transitions… even the MUSIC. it literally synthesized the beat in python and synced every cut to it 🤯

and my favorite part: the cat's eyes 👀 they're the visual anchor of the whole film. they watch you type, blink on the beat, squint, glance at stuff… then land perfectly on the real longcat logo at the end. opus came up with that.

i kept giving notes like "make it less like a powerpoint" and it just… got it. every round got better.

honestly this is the first time i felt it in my gut: AGI is coming.
````

## l3d1c-632524

@l3d1c · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/l3d1c-632524) · [post](https://x.com/l3d1c/status/2104649028193632524) · **partial prompt**

````text
I made a launch ad for @grouped_news in an hour with Opus 5.5 and Remotion, and I never opened a video editor. I added the voiceover and music with ElevenLabs.

The ad is a React app. It imports my site's CSS tokens and fonts, so it uses the same design system as the site.

I didn't review it by watching renders. It rendered about 20 stills and tiled them into one contact sheet, so I could check a whole cut at a glance before rendering any video.

Captions are measured in the real font and shrink to fit the 9:16 safe zone, so nothing hides under TikTok's buttons. Every cut lands on a 120 BPM grid, which made the music easy to line up.

It's one codebase, so the 30s, 15s and 6s cuts in 16:9 and 9:16 are each a different list of scenes.

My part was saying what felt wrong.
````

## wustep-884086

@wustep · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/wustep-884086) · [post](https://x.com/wustep/status/2104610435571884086) · **partial prompt**

````text
Last week, we launched column permissions!

I’m not on Notion’s video team, but with the help of @claudeai, @bot, and @NotionHQ, I made a trailer over the weekend. (How I made it in 🧵)

【作者补充制作说明】
🎬 BEHIND THE SCENES:

This was built using @Remotion (React/TypeScript only!), with @claude’s opus 5.5 [xhigh], orchestrated with @bot, and managed in a Notion doc as a working canvas.

In total, this project took ~90 messages with my @bot over 2 days, which generated 33 video takes with Claude Code and cost ~$400 in Claude credits including all the other takes (API billing but should fit fine in the $100/mo plan)

Here’s a Notion doc documenting the process (including many rejected candidates): https://notion.notion.site/column-permissions-trailer
````

## humzaakhalid-537875

@humzaakhalid · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/humzaakhalid-537875) · [post](https://x.com/humzaakhalid/status/2106640261623537875) · **partial prompt**

````text
Opus 5.5 on Max effort (Sound On):

"A 24-second AI In Public motion reel in Remotion at 1920×1080, 60fps. Use our blue # 3D40FE, white, navy, and ice palette with the AI In Public logo and sparkle. Keep it fast, premium, and smooth with motion blur, glow, camera hits, HUD details, seamless transitions, kinetic type, terminal UI, neural visuals, particles, and a cinematic logo finale. Generate all suspenseful music and sound effects in code and sync every hit perfectly. End with “AI IN PUBLIC, learning AI, out loud.” Every frame and sound should be written in code."

full prompt on here: http://ai-in-public.guide

then read the full guide below: ↓
````

## kingokings-992769

@KingOKings · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/kingokings-992769) · [post](https://x.com/KingOKings/status/2103874453687992769) · **partial prompt**

````text
I thought the Opus 5.5 design posts were all jokes.

They're not. It's GOATed at design.

I asked it to make a product showreel for Reactive Resume. It built this entire video in Remotion, in ONE prompt.

The setup:
→ Opus 5.5, max effort
→ Claude desktop app
→ No skills, no templates, no design brief
→ Just my project repo

It read the codebase, figured out what the product does, and decided what was worth showing.

A launch video like this used to mean days in After Effects or paying a motion designer. Now a solo open-source maintainer can do it in an afternoon.

Full prompt in the replies ⬇️
````

## yarhmm-341449

@YarHmm · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/yarhmm-341449) · [post](https://x.com/YarHmm/status/2103505435802341449) · **partial prompt**

````text
ما أعتقد في قفزة سواها Opus 5.5 تساوي القفزة اللي سواها في صناعة ال motion graphics، سواء من ناحية الجودة أو من ناحية التكلفة (استهلاك ال tokens) 

هذا الفيديو سويته بربع حد ال 5 ساعات 👇🏻

【作者补充制作说明】
الطريقة باختصار: 
استخدمت claude بنموذج opus 5.5 - مستوى التفكير متوسط إلى عالي، و طلبت منه يستخدم remotion لتسريع عملية ال preview و كذلك طلبت منه يقتصر استخدامه في معظم المؤثرات الصوتية على أصوات الكاميرات و عدسات التصوير الشائعة في ال reels و استخدمت نموذج gemini 3.8 tts flash لإنتاج الصوت 
أخذ معي حوالي ساعة و نصف من المحادثات معه لكن معظمها راح في تجريب أشياء مختلفة و التجربة ممتعة فعلا.
````

## apoorvjain25-309680

@apoorvjain25 · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/apoorvjain25-309680) · [post](https://x.com/apoorvjain25/status/2104528012746309680) · **partial prompt**

````text
Claude Opus 5.5 made this whole video in code. There was no editor, no After Effects and no stock music.

The motion graphics are Remotion code. Opus also wrote the music in Python, note by note, and the track reads the same beat file as the visuals. So every DM reply that lands on screen hits a blip in the music at the same frame.

I picked the voice on ElevenLabs and approved the script. Opus did everything else.

It's a 51-second ad for Synclify's DM automation.
````

## colecornelll-047465

@colecornelll · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/colecornelll-047465) · [post](https://x.com/colecornelll/status/2105751866051047465) · **partial prompt**

````text
I made 4 motion videos for @Shillz_Official in 3 days without opening After Effects.

no templates. no stock music. no motion designer.

just Claude writing code.

here's exactly how, step by step (bookmark this)

【作者补充制作说明】
the stack:

Claude (Opus 5.5) writes all of it
Remotion turns React code into video
three.js renders real 3D, so the glass actually refracts light
Python writes the music

I never touched a timeline. I just gave notes.
````

## georgejimenez98-431559

@georgejimenez98 · gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/georgejimenez98-431559) · [post](https://x.com/georgejimenez98/status/2103650183699431559) · **partial prompt**

````text
This video was made with Opus 5.5, Hyperframes, ElevenLabs with Music, SFX and Voices Endpoints throught Fal AI. 

This way of making videos is making me a little addicted to be honest hahaha. I still have to improve.

Crealix Autopilot is live: set your format, style, schedule and channels once, and it plans, writes, voices and builds every video. Then again. And again.

Try it free → https://crealix.ai/autopilot
````

## dengent-412996

@DengenT · threejs, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/dengent-412996) · [post](https://x.com/DengenT/status/2107425308773412996) · **partial prompt**

````text
Cardilife 1.3 をリリースしました。
あわせて紹介動画を作りました（56秒）。

動画は Claude Code（Opus 5.5 と Fable 5.1）と作りました。編集ソフトは使っていません。

技術構成
・Remotion 4（React 19 / TypeScript）：全体。1920×1080・30fps
・three.js（React Three Fiber / @remotion/three）：冒頭の 3D
・Python（標準ライブラリのみ）：音楽の合成

日本語版と英語版は、同じコードから props で切り替えて書き出しています。

https://apps.apple.com/jp/app/cardilife/id6802896176

#ClaudeCode #Remotion #threejs
````

## helloshiva0801-438284

@helloshiva0801 · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/helloshiva0801-438284) · [post](https://x.com/helloshiva0801/status/2103733875734438284) · **partial prompt**

````text
I'm a solo founder with no video editor, no designer and no After Effects.

So I built http://redesignr.ai's launch video in React with Claude Opus 5.5 + @remotion.

900 frames, 10 scenes, all code, paper style.

Building in public, day 3. 

#buildinpublic #Remotion #ClaudeAI #indiehackers #solofounder #SaaS #webdesign #motiondesign
#AI #React #vibecoding
````

## apoorvjain25-150112

@apoorvjain25 · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/apoorvjain25-150112) · [post](https://x.com/apoorvjain25/status/2107157871356150112) · **partial prompt**

````text
This whole video is AI-generated. Claude Opus 5.5 wrote the code, the motion and even the music, all in Remotion.

But I'll say it: Opus 5.5 feels a little nerfed. It used to one-shot these videos. This one took multiple prompts, and the first cut was weak until I pushed back.

It's for Link in bio, which we just launched on Synclify.
````

## dannyverkissen-101463

@DannyVerkissen · css · [watch](https://skillry.dev/ai-videos/opus-5-5/dannyverkissen-101463) · [post](https://x.com/DannyVerkissen/status/2104212402875101463) · **partial prompt**

````text
I guess i had to step on the motion train as well. 
Asked Claude Opus 5.5 to create a motion video of @getMoveno 

At first i had it create some new material for the website, which it did a great job for via remotion. Then I asked it to use that footage and create a motion video of it. Very very impressive to say the least.
````

## iamshankhadeep-506266

@Iamshankhadeep · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/iamshankhadeep-506266) · [post](https://x.com/Iamshankhadeep/status/2102825543733506266) · **partial prompt**

````text
i've been sitting on @ccdotdirectory  for over a year, waiting for anthropic to pull ahead in the ai race.

gpt-6 astra had openai claiming the lead over fable 5.1. then opus 5.5 dropped.

that's my signal.

116,692 claude code tools in one place.

launch video was created using @Remotion and opus 5.5
````

## majin-appsheet-693327

@Majin_AppSheet · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/majin-appsheet-693327) · [post](https://x.com/Majin_AppSheet/status/2103497319899693327) · **partial prompt**

````text
流行ってることは一回試しとくマン。

Claude Code（Opus 5.5）でモーショングラフィックスを作るのが面白いみたいなので、「シンまじん式のPV作って」と頼んだだけで、これが出てきた。

動画生成AIはゼロ。
・映像：HTML＋コードで1コマずつ描画（HyperFrames）
・BGM：GeminiのLyriaで生成
・効果音：拍を解析して、着地やハンコの瞬間に音ハメ

自分がやったのは、スキルを入れて「おまかせ」って返事したくらい。
しかもClaude自身は音が聴けないのに、波形を数値で解析して音ハメしてるのがヤバい。

何なのもう…日々革命が起こりすぎて 頭ガンガンするわ
````

## dheepanratnam-706454

@Dheepanratnam · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/dheepanratnam-706454) · [post](https://x.com/Dheepanratnam/status/2107568904075706454) · **partial prompt**

````text
Claude opus 5.5  made this whole motion graphic, score included

It coded every frame (HyperFrames + GSAP), wrote the music in Python and synced the sound effects itself.

The art in the "Creating" scene is real too: 
Claude graded those pieces in DaVinci Resolve earlier the same day.

Details ⤵️
````

## francoxavier33-341663

@francoxavier33 · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/francoxavier33-341663) · [post](https://x.com/francoxavier33/status/2103486218323341663) · **partial prompt**

````text
this was 100% opus 5.5. 

i have a dedicated "studio" repo with all my project's style guides, tokens, few skills, remotion, etc.

this all started from "make a hype demo/launch video for @momwiseai"

took maybe 4 revisions. music, sound fx, messaging, animations, everything was done with code.
````

## tycenjm-098014

@tycenjm · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/tycenjm-098014) · [post](https://x.com/tycenjm/status/2103024522589098014) · **partial prompt**

````text
@claudeai I was jealous of the Opus 5.5 video demos, so I linked the best ones and asked it why theirs beat mine.

This is what it made. Every frame is code (Remotion), with its own voiceover, music, and word-synced animation.

Then it made 10 ads for my app. Full thread on my profile.
````

## georgejimenez98-427173

@georgejimenez98 · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/georgejimenez98-427173) · [post](https://x.com/georgejimenez98/status/2103214871785427173) · **partial prompt**

````text
I have to admit, this blew my mind.

I saw people using Opus 5.5 + Remotion for launch videos, so I tried my own approach.

Opus 5.5 Max + Hyperframes locally, with Fal AI for voices, music & SFX.

Not perfect, but I loved the result.

https://www.crealix.ai Autopilot is coming.
````

## chapi13-131449

@chapi13 · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/chapi13-131449) · [post](https://x.com/chapi13/status/2104206465863131449) · **partial prompt**

````text
I didn't open After Effects once
This promo for my indie apps is 100% code: Claude Opus 5.5 + @remotion
-10 apps, real screenshots
-every cut synced to the beat
-I reviewed it frame by frame with contact sheets and asked for changes in plain language
Private, local-first apps 👇
````

## localjulius-625706

@localjulius · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/localjulius-625706) · [post](https://x.com/localjulius/status/2102725361922625706) · **partial prompt**

````text
Okay Opus 5.5 + Remotion and a solid concept for what you want is producing amazing results right now.

Here's my ad for Audivo. 

I told Opus 5.5 to create an ad from excerpts of popular podcasts and with it make a story explaining what Audivo does. 

The results were amazing!
````

## qinelke-271655

@QinElke · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/qinelke-271655) · [post](https://x.com/QinElke/status/2104176976261271655) · **partial prompt**

````text
Made this 30s motion-graphics promo for https://gmapsscraper.io with Opus 5.5
It read our site and wrote the script. 
Then it built every frame in code (Remotion), animated a talking sales guy with lip-sync, and rendered it.
 No After Effects. No designer.
 Is it worth $49/mo?
````

## alanschwegler-629665

@alanschwegler · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/alanschwegler-629665) · [post](https://x.com/alanschwegler/status/2102634404774629665) · **partial prompt**

````text
Armé este reel para mi web de gestión de eventos con Opus 5.5 

Todo es código: React + TypeScript con Remotion y la música sintetizada en Python a 120 BPM, con cada corte sincronizado al beat. 
Sin editor. Sin stock.

Organizas eventos? Entra acá 👉 https://planningmanager.app
````

## proanaliteg-458642

@proanaliteg · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/proanaliteg-458642) · [post](https://x.com/proanaliteg/status/2103895246593458642) · **partial prompt**

````text
Tried the Remotion skill in Claude Code (Opus 5.5 xhigh) for fun. Mind-blowing: it built this promo on the first try - I spent longer picking four accent sounds and the music. It rebuilt our desktop app's UI in React straight from the XAML and design tokens. Zero screenshots.
````

## dys-hay-749645

@Dys_hay · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/dys-hay-749645) · [post](https://x.com/Dys_hay/status/2103819139307749645) · **partial prompt**

````text
How far can Claude Opus 5.5 go in motion design? I tried. 

15 s on the Audi RS 6, 100% code (React/Remotion) with a synthesized V8 soundtrack. The cylinders flash in the real firing order, and the 0–100 timer runs in real time: 3.4 s.

Spec piece, not affiliated with Audi.
````

## als-link-301108

@als_link · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/als-link-301108) · [post](https://x.com/als_link/status/2103617322464301108) · **partial prompt**

````text
Este video lo hizo una IA 🤯 Con código, no con plantillas.
Le pedí a Claude Opus 5.5 un reel con Remotion: escribió las escenas, lo renderizó y quedó listo para subir.
Pruébalo en 3 pasos 👇 y comenta «VIDEO» para que te mande el prompt.
#ClaudeAI #Remotion #MotionDesign #IA
````

## bridgemindai-286423

@bridgemindai · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/bridgemindai-286423) · [post](https://x.com/bridgemindai/status/2102462889160286423) · **partial prompt**

````text
Claude Opus 5.5 just created this merch launch video for BridgeMind using Remotion.

The taste on this model is insane. The transitions, the timing, the branding. Better than anything I have gotten from Fable 5.1 or GPT 6 Astra.

Go cop your BridgeMind hoodie. Link below.
````

## envoldev-017555

@EnvolDev · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/envoldev-017555) · [post](https://x.com/EnvolDev/status/2107547689819017555) · **partial prompt**

````text
I asked Claude Opus 5.5 to make a launch @remotion video for TopSlash.

No video editor, only code. This is what it made 🤯

If you have a SaaS or an app, you can list it today and take Rank #1.

Follow @TopSlash_app for the deals 
👉 https://topslash.app
````

## fr-sorrentino-871017

@Fr_Sorrentino · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/fr-sorrentino-871017) · [post](https://x.com/Fr_Sorrentino/status/2103922812255871017) · **partial prompt**

````text
@rexan_wong Agree with all of this. Ours wasn't one prompt either: built with Claude Code (Opus 5.5 + Fable 5.1) and Remotion, storyboard first, one still per beat, then many rounds of notes. The watch photo and the app recordings are real, not drawn.
````

## sonali-sahu-09-350200

@Sonali_Sahu_09 · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/sonali-sahu-09-350200) · [post](https://x.com/Sonali_Sahu_09/status/2106265463378350200) · **partial prompt**

````text
Gave Claude Opus 5.5 one reference video.

It came back with a full cinematic launch video. Built in code with Claude Code and Remotion.

No editor. No timeline. Just a reference and a prompt.

I'm still replaying it 🤯

@claudeai @AnthropicAI
````

## piyushaaryan2-196586

@PiyushAaryan2 · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/piyushaaryan2-196586) · [post](https://x.com/PiyushAaryan2/status/2103603040079196586) · **partial prompt**

````text
I made our launch video entirely with Claude.

No After Effects. No editor. Every frame is code.

Claude Opus 5.5 animated it in Remotion. ElevenLabs made the music + 159 sound effects, all synced to the beat.

What it's launching 👇
````

## priyansh0327-206409

@priyansh0327 · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/priyansh0327-206409) · [post](https://x.com/priyansh0327/status/2102472633057206409) · **partial prompt**

````text
Claude Opus 5.5 just created this launch video for GetStopover using Remotion.

The taste is unreal. The transitions, the timing, the branding. Everything is on point 

See which flights come with a free hotel. Link below.
````

## rishit30g-568278

@rishit30g · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/rishit30g-568278) · [post](https://x.com/rishit30g/status/2106061225851568278) · **partial prompt**

````text
@claudeai Opus 5.5 is sick.

claude code's mascot >>

【作者补充制作说明】
@claudeai - Used Opus 5.5 with extra efforts 
- Heygen and Remotion as skill 
- Used Node, ffmpeg, python 
- Highly detailed prompt
- 40 mins and some ☕️
````

## seantiffonnet-675262

@SeanTiffonnet · gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/seantiffonnet-675262) · [post](https://x.com/SeanTiffonnet/status/2102518598736675262) · **partial prompt**

````text
Opus 5.5 + Gemini for the music + @Remotion for the skill

About 30min to run and export. 

(https://TvTrack.io isn't yet on the iOS store, I haven't clicked on published yet, but it's ready to deploy 😂)
````

## signalz-jp-918002

@signalz_jp · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/signalz-jp-918002) · [post](https://x.com/signalz_jp/status/2104022166471918002) · **partial prompt**

````text
エディトリアル風。Opus

【作者补充制作说明】
Opus5.5で、Remotion+ElevenLabs(BGM)+ Gemini TTS(3.8)で作成。スクリーンショットもChromeにヘッドレスでアクセスして取得してくれる。ffmpegでYouTubeの基準への調整と検査して、YouTube Data APIでアップロードまで。至れり尽くせり。
````

## sciencedegens-843325

@sciencedegens · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/sciencedegens-843325) · [post](https://x.com/sciencedegens/status/2104114814536843325) · **partial prompt**

````text
趁着今天有空回看和分析了一下整个视频

审美在线的Opus 5.5确实顶 @claudeai 

3D渲染器像素风

这个渲染效果确实做得很强，逻辑调度能力和美学素养确实是挂钩的

这个片头的转场、音效和提振人心的bgm真的可以被 @binancezh 拿去用了

像素小人物也很有 @cz_binance 的感觉

#binance #claude
````

## javi-llofriu-059888

@Javi_llofriu · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/javi-llofriu-059888) · [post](https://x.com/Javi_llofriu/status/2103372534922059888) · **partial prompt**

````text
@gonahmias Le pedi un video para mostar un servicio de mi Agencia de IA (Opus 5.5 + Hyperframe) en 20 minutos tenía esto montado, coste un 20% del consumo de 5h del plan Max.
````

## tejasthange3-128242

@TejasThange3 · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/tejasthange3-128242) · [post](https://x.com/TejasThange3/status/2103735653943128242) · **partial prompt**

````text
this is INSANE!

The whole Twitter → 𝕏 story in 30 seconds, and I didn't touch a single keyframe.

Opus 5.5 wrote every frame in Remotion and composed the soundtrack in code.
````

## thallisribeiro-829318

@thallisribeiro · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/thallisribeiro-829318) · [post](https://x.com/thallisribeiro/status/2103107359727829318) · **partial prompt**

````text
TÁ BIZARRO ESSE OPUS 5.5 😲

Eu nem acreditei no resultado. Foi feito com one prompt shot, usando apenas remotion... 

Agora é só jogar uma narraçãozinha e subir pros ADS kkk
````

## zakisbuilding-495680

@zakisbuilding · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/zakisbuilding-495680) · [post](https://x.com/zakisbuilding/status/2104389736647495680) · **partial prompt**

````text
Opus 5.5 is on STEROIDS

gave Claude Code one prompt and it made this 15 second motion design video of my app. 

all React code with Remotion, I never opened After Effects
````

## genelab-999-088672

@geneLab_999 · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/genelab-999-088672) · [post](https://x.com/geneLab_999/status/2104163377560088672) · **partial prompt**

````text
話題の Opus 5.5 のモーショングラフィックス、原作プロンプトそのままで再現してみた。

Claude Code + Remotion 公式プラグイン、effort は xhigh。
プロンプト1発、途中の API 切断で continue を1回だけ。
思考 約23分、レンダリング 約90秒。BGM もサンプルなしでコード生成。
````

## tankazunori0914-156748

@tankazunori0914 · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/tankazunori0914-156748) · [post](https://x.com/tankazunori0914/status/2105917770907156748) · **partial prompt**

````text
良い笑

・入れたプロンプト
「今日何曜日だっけ？BGM付きの30秒のかっこいいモーショングラフィックスで教えて（全力を出してください）」

・生成時間：約11分（書き出し1分36秒込み）
・モデル：Opus 5.5
・動画：HyperFrames（HTMLで動画を作るツール）
・BGM：Pythonでその場で合成（外部の音源なし）
````

## saxxyweb3-690124

@saxxyweb3 · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/saxxyweb3-690124) · [post](https://x.com/saxxyweb3/status/2104961677963690124) · **partial prompt**

````text
Okay so this is it

Sound design is not so good, will work on that and give you a better one tmrw.

Here🏌️, Opus 5.5 and Remotion skills for animated motion designs
````

## djadkison-394122

@DJAdkison · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/djadkison-394122) · [post](https://x.com/DJAdkison/status/2104020177478394122) · **partial prompt**

````text
I was able to make this product motion video for https://getverde.ai using Opus 5.5 + Remotion. 

This is insane. It was able to tell a story in less than 30 min.
````

## asei-ikarashi-437835

@asei_ikarashi · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/asei-ikarashi-437835) · [post](https://x.com/asei_ikarashi/status/2105976102074437835) · **partial prompt**

````text
Claude CodeのOpus 5.5とRemotionで動画を作りました🎬

15秒の映像で、文字や実績の数字、売上グラフを動かしています。
構成と動きの指示を渡して、MP4に書き出しました💡

添付が制作した映像です。
※会社・数値は架空です。

#ClaudeCode #Opus55 #Remotion
````

## seri-nonnon-231813

@seri_nonnon · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/seri-nonnon-231813) · [post](https://x.com/seri_nonnon/status/2106192761632231813) · **partial prompt**

````text
／
通院メモリー
iOS版リリースしました！
＼
#個人開発

審査は通ってたのですが、動画制作に手間取ってました…😇
Opus5.5/Remotion/Gemini APIで作ったら爆速。笑

お子さんがいる方や家族の通院や服薬管理がしたい方、ぜひリプ先のリンクからインストールしてみてください🙌
````

## ayumi-t820-871023

@ayumi_t820 · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/ayumi-t820-871023) · [post](https://x.com/ayumi_t820/status/2104807505297871023) · **partial prompt**

````text
自分驚き屋やれます！Claude Opus 5.5にショート動画を作ってもらいました。Remotionを使用。キャライラストはmidjourneyで以前作ったものです。
ElevenLabsにつないでいたら「ナレーション作るオパスね」「SEも作っていいオパスか？」と自動で生成していれくれました。
````

## heymrzak-349060

@heymrzak · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/heymrzak-349060) · [post](https://x.com/heymrzak/status/2103768331782349060) · **partial prompt**

````text
the introduction made with opus 5.5 + remotion

introducing @TryGofy — the live map of everything.

#shipaton #BuildInPublic #gofy #gofyapp
````

## allodev-069765

@allodev · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/allodev-069765) · [post](https://x.com/allodev/status/2105414480910069765) · **partial prompt**

````text
Motion Designers are cooked

Made this with the new @claudeai Opus 5.5 + @Remotion in a few minutes 🤯

Showcasing my @futurepost extension
````

## maxhirsch13-600983

@MaxHirsch13 · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/maxhirsch13-600983) · [post](https://x.com/MaxHirsch13/status/2107985883949600983) · **partial prompt**

````text
I hate LinkedIn so much that I had Opus 5.5 + remotion make a launch video about it. 

I am building on @X, NOT LarpedIn (officially)
````

## safaelmali-004843

@SafaElmali · threejs, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/safaelmali-004843) · [post](https://x.com/SafaElmali/status/2102749298673004843) · **partial prompt**

````text
Claude Opus 5.5 made this launch video for https://dualsense.studio using Remotion.

A few rough edges, but honestly I'm impressed 🤯
````

## xenit-v0-532873

@xenit_v0 · gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/xenit-v0-532873) · [post](https://x.com/xenit_v0/status/2106270979932532873) · **partial prompt**

````text
Opus 5.5 ve remotion ile scroll+ için bir tanıtım videosu hazirlattım.

Bence çok iyi yaptı. 

@scroll_plus 

https://scroll.pics
````

## washow-cfo-175311

@washow_cfo · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/washow-cfo-175311) · [post](https://x.com/washow_cfo/status/2104595346882175311) · **partial prompt**

````text
claude codeで動画作成が流行ってるけど、AI臭さがあるからどっかでみたことあるようなスタイリッシュな動画を作ってみた
CMとしては使えるかな？

使ったもの：Claude Code（Opus 5.5）／Gemini TTS／HyperFrames
````

## pisajeski-168993

@PIsajeski · canvas, css · [watch](https://skillry.dev/ai-videos/opus-5-5/pisajeski-168993) · [post](https://x.com/PIsajeski/status/2104124855302168993) · **partial prompt**

````text
I just one-shotted this video with Opus 5.5 and @Remotion for the new @agentaOS promo.

Unbelievable what you can do these days.
````

## vince-builds-355650

@vince_builds · css · [watch](https://skillry.dev/ai-videos/opus-5-5/vince-builds-355650) · [post](https://x.com/vince_builds/status/2104257989100355650) · **partial prompt**

````text
I didn't believe it but this was 100% Opus 5.5 Max, in 8h15 min.

Gave it access to DesignLoop, hyperframe skill, elevenlabs.
````

## saadpastadev-347341

@SaadPastaDev · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/saadpastadev-347341) · [post](https://x.com/SaadPastaDev/status/2107741413769347341) · **partial prompt**

````text
Claude Opus 5.5 🤝 Remotion = 🔥

all of Nafa's marketing runs through Claude now.

we gave it our taste. one person one repo
````

## dustindavis-644806

@DustinDavis · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/dustindavis-644806) · [post](https://x.com/DustinDavis/status/2104075537228644806) · **partial prompt**

````text
I had to play along and see what kind of remotion video Claude Opus 5.5 could create for me. Amaze, amaze, amaze!
````

## t4k1ra-cg-110846

@T4K1RA_CG · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/t4k1ra-cg-110846) · [post](https://x.com/T4K1RA_CG/status/2103486728917110846) · **partial prompt**

````text
Opus5.5 × Remotionでコードのみで映像作ってみました！ポン出しでこれは凄い。動画生成との使い分けで幅がほんとに広がりそう。次AEを本気で動かしてみます
#Claude #Motiondesign #ai
````

## palashbagchi11-389221

@PalashBagchi11 · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/palashbagchi11-389221) · [post](https://x.com/PalashBagchi11/status/2102924409124389221) · **partial prompt**

````text
Add a good fast royalty free music to this video, and make 2 versions - 1 landscape, and another portrait
````

## goldiez2599-685869

@Goldiez2599 · css · [watch](https://skillry.dev/ai-videos/opus-5-5/goldiez2599-685869) · [post](https://x.com/Goldiez2599/status/2102463234586685869) · **partial prompt**

````text
Oh yeah, Opus 5.5 is it.. Created in 10 minutes with remotion inside the Claude Code desktop app!
````

## inoue-aix-234322

@inoue_aix · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/inoue-aix-234322) · [post](https://x.com/inoue_aix/status/2104155161883234322) · **partial prompt**

````text
opus5.5 + Remotion + Gemini3.8 TTS
たったの1時間でうちのプロダクトの広告動画2本できた・・・

もう一生外注しないw
外注したら10万円以上かかってたと思う
````

## mousszy-baby-014197

@mousszy_baby · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/mousszy-baby-014197) · [post](https://x.com/mousszy_baby/status/2103966434280014197) · **partial prompt**

````text
Comme tous le monde j'ai essayer le combo Opus 5.5 et remotion voilà le résultat en un prompt !
````

## joao-felixl-809438

@joao_felixl · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/joao-felixl-809438) · [post](https://x.com/joao_felixl/status/2104273407818809438) · **partial prompt**

````text
Não tava botando fé no hyperframes + opus 5.5 max effort, mas isso aqui ficou sensacional.
````

## petert-350098

@_petert · threejs, canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/petert-350098) · [post](https://x.com/_petert/status/2103878940100350098) · **partial prompt**

````text
Claude Opus 5.5 + HyperFrames + Gemini Flash 3.8 + Three js で架空の家計簿サービスの動画作ってみたけど、なかなか良い
````

## leandroriviello-827135

@leandroriviello · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/leandroriviello-827135) · [post](https://x.com/leandroriviello/status/2104728379798827135) · **partial prompt**

````text
No tiene sentido que esto haya salido con un solo prompt con Opus 5.5 e Hyperframes
````

## smitjaineditor-843957

@SmitJainEditor · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/smitjaineditor-843957) · [post](https://x.com/SmitJainEditor/status/2107019496078843957) · **partial prompt**

````text
Are Motion Designers Cooked?
Completely made through Opus 5.5 (Medium) + Remotion.
````

## pranavclickks-254816

@pranavclickks · gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/pranavclickks-254816) · [post](https://x.com/pranavclickks/status/2104512280390254816) · **partial prompt**

````text
@tibo_maker Wanna rate mine Tibo?

Opus 5.5 + Remotion + My Custom Harness
````

## soumymaheshwri-825921

@Soumymaheshwri · css · [watch](https://skillry.dev/ai-videos/opus-5-5/soumymaheshwri-825921) · [post](https://x.com/Soumymaheshwri/status/2107520392302825921) · **partial prompt**

````text
opus 5.5 + hyperframes is an unholy combo

share SHIT with whoever needs
````

## ambiguous-ai-505873

@ambiguous_ai · shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ambiguous-ai-505873) · [post](https://x.com/ambiguous_ai/status/2103763542432505873) · **partial prompt**

````text
Opus5.5 motion graphics
Remotionだと簡単に使いまわせるので便利！
#AIMotionDesign
````

## lnkiai-544254

@lnkiai · threejs, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/lnkiai-544254) · [post](https://x.com/lnkiai/status/2103759350330544254) · **partial prompt**

````text
Claude Opus 5.5が凄すぎる…！
Remotion × three.jsでM3E Canvasの動画を作ってみた👇️
````

## nehalmax-802479

@nehalmax · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/nehalmax-802479) · [post](https://x.com/nehalmax/status/2105939128705802479) · **partial prompt**

````text
cooked up this teaser for lernok with opus 5.5 and remotion!
````

## modaalbuilder-868989

@modaalbuilder · canvas, css · [watch](https://skillry.dev/ai-videos/opus-5-5/modaalbuilder-868989) · [post](https://x.com/modaalbuilder/status/2103053680945868989) · **partial prompt**

````text
build mobile app animated splash screen creation for ...
````

## charliie-334026

@charliie · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/charliie-334026) · [post](https://x.com/charliie/status/2103514073476334026) · **partial prompt**

````text
make a cool instagram ad for liinks
````

## thuggy-juice-072370

@Thuggy_Juice · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/thuggy-juice-072370) · [post](https://x.com/Thuggy_Juice/status/2103539067317072370) · **partial prompt**

````text
Premier jet Opus 5.5 Max + Remotion
````

## gautam-mer1-530003

@gautam_mer1 · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/gautam-mer1-530003) · [post](https://x.com/gautam_mer1/status/2103703336780530003) · **partial prompt**

````text
an Apple-style 30s video of my app
````

## zhang-baoqing-920413

@zhang_baoqing · threejs, canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/zhang-baoqing-920413) · [post](https://x.com/zhang_baoqing/status/2104081777119920413) · **partial prompt**

````text
群友一句话提示词

用Opus5.5做的粒子网站

真的太酷了
````

## alex-leiro-867087

@Alex_Leiro · css · [watch](https://skillry.dev/ai-videos/opus-5-5/alex-leiro-867087) · [post](https://x.com/Alex_Leiro/status/2106032245848867087) · **partial prompt**

````text
Opus 5.5 + Remotion
````

## 0xrapzz-433554

@0xRapzz · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/0xrapzz-433554) · [post](https://x.com/0xRapzz/status/2106062139920433554) · **partial prompt**

````text
Remotion 
Opus 5.5
````
