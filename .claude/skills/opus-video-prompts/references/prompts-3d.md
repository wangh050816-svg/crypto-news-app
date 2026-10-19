# 3D scenes: full prompts (117)

Structured and complete prompts first. Each entry: author, tech, links, then the prompt exactly as posted.

## everestchris6-399895

@everestchris6 ·  · [watch](https://x.com/everestchris6/status/2104965415164399895) · [post](https://x.com/everestchris6/status/2104965415164399895)

````text
<role>
you design and build motion videos entirely in code, with gsap for the animation and three.js for any 3d. every decision is judged against the best work in the references, and the video isn't finished until it holds up next to them.
</role>

<brief>
- what the video is for: [product, service or business]
- who's watching: [who the viewer is and what they care about]
- what they should do at the end: [call to action]
- length and sizes: [e.g. 30 seconds, 16:9 and 9:16]
- brand: [name, logo files, colours, fonts]
- facts file: [path]. this is the only source for any number, name or claim that appears on screen
- assets: [footage, photos, screenshots, product files]
- style references: [links or a folder of videos whose motion i like]

i'm away and won't answer questions. make the calls yourself and keep going until the video passes every check below.
</brief>

<kit>
before anything else, clone and read https://t.co/FMs1prnPP0. read SKILL.md first, then every reference file it points to at the step where it says to read it. its rules, critic prompts, quality bar, 3d patterns, audio tools and scripts override your defaults.
</kit>

<setup>
- build every scene as an html page animated on a single gsap timeline, with three.js for any 3d, all as pinned local files
- render the timeline to video frame by frame using the renderer in the kit
- use ffmpeg for frames, contact sheets and audio measurement
- keep every api key in environment variables. never write a key into any file
- render a 5 second test first and confirm it works before building the real video
</setup>

<study_the_references>
if i gave you references, study them before planning anything.
- run a fast numeric pass over every frame: how much changed from the last frame, brightness and edge detail, to find every cut and every fast moment
- make one overview contact sheet per video, and a dense sheet of one second at 16 to 20 frames a second around every transition
- write a note per video: the key moment, how it works, and how it could be used in this video
- pull out the motion rules and named techniques that hold across the best ones
- references are for study only. never copy their footage, logos, layouts or music
if i gave you no references, use the motion notes in the kit.
</study_the_references>

<motion_principles>
1. the thing in the front of the shot becomes the transition. a title, logo or object moves towards the camera while the next scene is already waiting underneath
2. one object carries the story across shots and keeps its identity, so it reads as one continuous piece
3. one main movement leads, with smaller ones layered under it, all overlapping. the frame never stops and starts all at once
4. the speed always changes. things land slowly enough to read, leave fast, and the next thing slows as it arrives. no linear motion
5. cuts are allowed only when size, direction and subject match on both sides
6. every action produces a visible result. a scan makes findings, a tap makes a new state, a request makes a confirmation
7. type is motion too. big words enter from opposite sides, reveal the next scene, and never sit over busy picture without something behind them to stay readable
8. vary the scale from close, to wide, to overhead, to full-frame type. never repeat the same layout, like a heading over three cards
</motion_principles>

<storyboard>
write a brief and a storyboard before any animation.
- one table: time, what's on screen, what this moment is for, how it leaves, and which object carries into the next shot
- around 12 to 15 compositions per 30 seconds, each lasting about 1.4 to 3.5 seconds
- the main subject fills most of the frame. no small cards floating in empty space
- frame one is a finished picture, never a word halfway through flying in
- name three signature moments you can describe without using effect names
- the video must make sense with the sound off
- send the storyboard to a fresh critic and fix what it finds before building
</storyboard>

<build>
- every animated value is a function of timeline time only. no timers, no real-time animation, no unseeded randomness. any frame must render the same every time
- write the shared pieces first: colours, fonts, shared 3d models and the exact pixel position of every handoff between scenes
- build each scene as its own component with its own test page, rendered to stills and a short clip, and send it to a critic before it joins the film
- carried objects land on exactly the same pixels on both sides of a cut
- run several builders in parallel on separate sections once the shared pieces exist
- don't stop to ask for approval between steps
</build>

<3d>
- only use 3d where it explains something physical or spatial, like layers, parts, placement or scale
- light it like a product shoot, with a soft key light from one side and a rim light behind
- keep the camera between about 35 and 55 degrees. never look straight down on a large surface, and never end tight on a flat one
- style buildings like a premium architectural model with real materials and a base
- no floating parts, no gaps where parts meet, no flat black glass, no repeating textures
- labels are html positioned from the 3d scene every frame, never text inside the 3d
- measure the rendered background pixel and adjust until it matches the brand colour
- anything that moves like a real product is measured from real footage frame by frame, and those measurements are the curve
</3d>

<images_and_footage>
- prefer building shots in code. use generated images or clips only for supporting shots, and label anything generated as a concept
- upscale and smooth any generated clip to match the rest, and regenerate anything that warps
- never generate a fake finished job, fake customer, fake review or fake result
</images_and_footage>

<audio>
- match the music's energy to the picture and the viewer, and keep it low
- prefer clean library music and sound effects over generated ones. never name a brand in a music prompt
- one short, soft whoosh per real scene change, and small clicks or pops only on real on-screen actions
- screen effects for boom, hiss and length before using them, and set each one just above the music in its own frequency range, with a cap so nothing gets harsh
- cut every scene change on a beat
- always export a music-only version
</audio>

<critic_loop>
the builder never judges its own work.
- after the storyboard, each component and each full render, send the render, the brief and the references to a fresh critic that has seen none of the building
- never tell a critic what you think you fixed or what you believe about the references. it pulls its own frames and measures for itself
- the critic makes a contact sheet every 0.2 seconds plus dense frames around every transition, measures frozen time and loudness, and returns a ranked list of problems with timestamps, ending with ship or one more pass
- fix the biggest problem first, render, then send to a new critic that checks every previous item as fixed, partly fixed or still there, and hunts for anything new that broke
- keep a ledger of every round: what was found, what changed, and the numbers before and after
</critic_loop>

<quality_bar>
the video isn't done until all of these pass, measured:
- no more than about 1 second of frozen screen per 30 seconds, and no still stretch longer than about half a second
- frame one is a finished composition
- all text meets at least 4.5:1 contrast, and nothing collides with or flies through other text
- brand colours in 3d renders match the brand values
- loudness is steady and comfortable for web, with no clipping, and effects never louder than the music
- a first-time viewer understands it with the sound off
- a critic would put it next to the references without it looking weaker. a video with no bugs is not the same as a good video
</
````

## twoclipping-496100

@twoclipping · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/twoclipping-496100) · [post](https://x.com/twoclipping/status/2103835273813496100)

````text
<inputs>
Ask me for: a one-word brand name for the wordmark (a verb works best), 9 to 12 high-res photos, a royalty-free song around 120 BPM with a drop and a quiet breakdown (Mixkit, free for commercial use), and a free stock clip of a plain wall with moving plant shadows (Pexels).
</inputs>

<direction>
An Apple-keynote launch film, 2D only, one continuous take. Every scene is made out of the previous one: nothing fades, blurs or cuts. Objects change shape instead: text rises out of a mask line, icons pop from zero on a spring, bars draw across, pages push, and a black shape floods the whole frame and contracts into the next scene. Warm off-white canvas, black UI, iOS 26 liquid glass over the photos. Archivo (wdth 125, weight 800) for the wordmark, Geist for UI. A cursor drives every change with real clicks, drags and long-presses. The camera zooms screen-studio style so each moment fills the square, and the cursor scales with it.
Banned: crossfades, blur-ins, brightness "developing", 3D flips, particles, glows, holds longer than 1s, anything that looks like a template.
</direction>

<structure>
120 BPM, 54 beats, something happens on every beat.
Open: the wordmark squeezes into its own period like an accordion, the dot grows into a black pill, a label rises inside it. Click: six iris blades close over the label and snap open onto a photo. The circle becomes a square, shrinks, the grid unfolds from behind it like a paper map (center, plus, corners), reflows into a bento, and a click zooms into one tile, landing exactly on the drop.
Glass: a glass word pops in letter by letter, melts into a droplet that stretches into a glass toolbar. The adjust icon turns it into a slider. Dragging relights the photo from day to golden hour (two aligned shots), and the knob turns into a glass lens while held. It lifts into a glass orb, the next photo opens inside it as a circle, and the orb expands into a lock screen: glass clock digits, date, and a home bar that stretches into a glass music player.
Stage: the lock screen pulls back into a phone (the bezel grows out of the screen edge). The Dynamic Island stretches like liquid, pinches off, flies over and grows into a Mac window that rolls up like a blind. Long-press the wallpaper, drag it onto a Safari tab, the page pushes in, drop it and it becomes the hero of a landing page. Scroll: the hero morphs into a framed print on a product card, with the mat and molding growing out of the photo's edge. Pick a frame color (it paints across) and a size, then the nav button flies down into "Order print".
Order: one black shape keeps morphing: Ordered ✓ → Printing % → On its way (a van on a route) → Delivered ✓.
Wall: the delivered circle floods the frame edge to edge, holds black for a beat, and contracts into the framed print hanging on the real wall footage. The same iris opens onto the print, closes again, the frame floods the screen and contracts into the pill → the dot → the letters spring back out, landing on the beat return. Last frame = first frame.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside an async seek(t): no CSS transitions, no timers, no state between frames.
2. Springs are closed-form step responses. A value with many targets is the sum of one spring per change, so it stays a pure function of time.
3. Liquid glass: each glass element holds its own clone of the scene behind it, filtered with an SVG feImage displacement map (a rounded-rect distance field) through three feDisplacementMaps at slightly different scales for chromatic edges, plus a rim light. Glass letters: a canvas distance field per glyph gives the map, mask and highlights.
4. Goo: blur + alpha threshold, then composite the source atop it so the glass stays sharp inside.
5. Iris: 6 blades around a hexagonal aperture. Each blade is its two vertices, both edge extensions and the SHORT arc between them.
6. Wordmark squeeze: every letter moves toward the dot by the same factor and its drawn width follows (narrow the wdth axis, scale the rest), so the letters stay touching.
7. Footage: re-encode all-intra (ffmpeg -g 1), load it as a blob URL, await 'seeked' before drawing each frame.
8. Sound: a downloaded SFX for every event (Mixkit), never synthesized, each placed by its measured peak. The song starts on a downbeat: the zoom lands on the drop, the wall sits in the breakdown, the wordmark returns with the beat. Loudnorm to -14 LUFS.
9. Render with Playwright: 4 subframes per frame blended with ffmpeg tmix, 60fps. Check one frame per beat, then scan for single-frame pops (frame-difference spikes 3x their neighbours).
</build>

<gotchas>
backdrop-filter: url() misreads displacement maps in Chromium, so clone the scene instead. A flood must overscale past the corners and take about 0.3s, or half the screen changes in one frame. A child with visibility: visible shows through a hidden parent, so use inherit. Text that swaps inside a morphing shape needs its own mask. python http.server can't range-seek video, so use the blob URL.
</gotchas>

<start>
Ask me for the inputs, then show me the beat map and 4 stills (open, glass, stage, wall) before you write the full film.
</start>
````

## ultimaxbt-549714

@ultimaxbt ·  · [watch](https://x.com/ultimaxbt/status/2108210884799549714) · [post](https://x.com/ultimaxbt/status/2108210884799549714)

````text
<inputs>
Ask me for: my product, the exact request a user types into it, 6 to 8 photos for the result cards, a royalty-free song around 130 BPM with a clear drop (Mixkit, free for commercial use), and my brand mark for the end card. If I skip anything, use the defaults: the food-ordering story below, food photos from Pexels (fire noodles, birria tacos, hot chicken, buffalo wings, smash burger, spicy ramen), and Mixkit "Cat Walk".
</inputs>

<direction>
A 15-second product launch film, 1920x1080 at 60fps. 2D only, one continuous take. No fades, blurs or cuts: each scene grows from the last. Text rises from a mask line, buttons expand into pages, and color floods from one object before shrinking into another. Give the camera one eased move per scene, and never zoom in and out consecutively.

Look: warm white canvas (#f5f5f2), black UI (#0e0e10), lime accent (#cdf24f), orange (#ff6a2a), and a blue send button (#2f6bff). Add an Apple Intelligence-style iridescent glow around the input: a blurred conic gradient rotating through pink, orange, lime, cyan and violet. Use real food photography on dark cards, Geist for UI and a serif for the product name on the end card.

Banned: crossfades, blur-ins, 3D, particles, camera moves that reverse direction, holds longer than 1s, anything that feels like a template.
</direction>

<structure>
130 BPM, 32 beats (14.8s). Start the song 12 beats before its drop.

Beats 0-6, ask: push slowly into the glowing composer, about 3x zoom. Type the request over three fixed lines with a natural keystroke rhythm:
"I'm really hungry, I don't know
what I want but something
spicy, crispy and filling"

Beat 6, send: press the send button. A lime ripple spreads from it and transforms the message into a chat bubble. Pull back once to reveal the phone around it (428x900 screen, 11px black bezel, 9:41 status bar).

Beats 6-12, think: the send button grows into an orange wok, a half-disc with a thin handle. It tosses 6 colorful ingredients on beats 8, 9, 10 and 11 beneath the shimmering text "Finding something for you…".

Beat 12, the drop: a lime circle expands from the wok to fill the frame in about 0.35s. Dark food cards (330x440, radius 28, photo on top, name, one-line description, price and rating) burst in from the center. Slide the strip across three cards and land on "Fire Noodles", which lifts with a "Best match" pill.

Beats 16-21, chat: the lime contracts back into the user's bubble, carrying its words as the chosen card flies into its slot. "Found it. Fire Noodles from Wok & Fire, smoky, spicy and seriously filling." rises in, followed by "Want me to order it for you?" Then show two pills: "Order now" in black and "More options" outlined. The cursor clicks Order now → spinner → "✓ Ordered".

Beats 21-32, outro: the black button expands into the page, staying pill-shaped as it reaches the edges while the camera pushes into it. Its label grows to headline size, then slides away. Bring in "You were craving noodles." and "Now it's on the way." word by word (92px, white on black). A courier dot follows a route to a pin. The pin becomes the brand mark, and the wordmark wipes out from behind it, with "made with" above and the product name below.
</structure>

<build>
1. One HTML file, 1920x1080. Compute every style from time inside seek(t): no CSS transitions, timers or state carried between frames.
2. Use one camera transform on a container, keyed by [time, zoom, x, y] with eased segments and zoom interpolated in log space.
3. Use closed-form step-response springs for every pop and settle.
4. Make every handoff a shared element: the lime flood carries a copy of the bubble's words, and the button carries its label into the page.
5. Sound: use a downloaded Mixkit SFX for each event - typing, send pop, each toss, drop impact, card swoosh, click, success tone, page-fill whoosh and mark sparkle. Place each by its measured peak and loudnorm to -14 LUFS.
6. Render with Playwright at 60fps using 8 subframes per frame, blended with ffmpeg tmix. Review every fast moment frame by frame and scan the full video frame by frame.
</build>
````

## rossaxbt-312793

@rossaxbt ·  · [watch](https://x.com/rossaxbt/status/2107483570885312793) · [post](https://x.com/rossaxbt/status/2107483570885312793)

````text
<inputs>
Ask me for: one question a user asks my product and its one-line answer, two album covers, a royalty-free song around 110 BPM with a quiet intro and a hard drop (Mixkit, free for commercial use), and my logo for the ending. If I skip anything, use these defaults: "is this all code?" / "yes. every frame.", two atmospheric photos, and Mixkit "Head Bang".
</inputs>

<direction>
A 22-second square loop, 1440x1440 at 60fps. 2D only, one continuous take. Nothing cuts: each scene grows from the one before it, and every gesture carries the camera into the next space. Each morph takes 0.8s on cubic-bezier(.45,0,.15,1). The camera zoom follows the same curve, making the shape changes feel almost invisible. Content dissolves during the second half of each glide. One gesture per scene.

Look: a warm light stage (#f3f3f0 to #e3e3de), black UI, and a dark app world (#121212) tinted by the current album cover. Use one green accent (#1ed760), Geist for UI, the real macOS pointer, and soft layered shadows that grow as shapes lift.

Banned: hard cuts, bouncy springs, particles, glows, zooming in and immediately back out, holds longer than 1s, anything that feels like a template.
</direction>

<structure>
Follow the song's beats. The press lands on the drop.

Generate: the cursor clicks. The pill glides into a spinner, then becomes a check.

Chat: the check splits into three typing dots with goo. The left dot flies up, becomes the question bubble and types the question. The right dot flies down into the reply. Both bubbles shrink back into dots as they glide toward the center and merge with the middle dot.

Play: the middle dot bends into a play triangle, one point at a time. The cursor presses it on the drop. A white button appears under the click as the dark app floods the frame around it, leaving the white shape as the play button. The camera pulls back to reveal the full now-playing screen: large cover, title, heart (liked, filling green), progress bar, controls and volume.

Swipe: the cursor drags the cover sideways. The next track slides in, and the app changes its tint to match the new cover.

Drag: the camera glides toward the volume slider. The cursor pulls it to max and keeps going. The bar rubber-bands, dragging the camera sideways out of the app and onto a dark dotted canvas while the camera follows the knob.

Chart: the line lands and curves upward into a green chart as the number counts up. The volume knob becomes the chart's final point.

Dive: the cursor clicks that point. The camera dives into it until the light stage fills the frame.

Ending: an "Ask [my product]" button grows from the light, narrows into a line, then fans out into my logo (default: the Claude spark, with six copies rotating into twelve rays in Claude orange). Hold for 2s.
````

## twoclipping-762046

@twoclipping ·  · [watch](https://x.com/twoclipping/status/2104674464868762046) · [post](https://x.com/twoclipping/status/2104674464868762046)

````text
<inputs>
Ask me for: the one question a user asks my product and its one-line answer, two album covers, a royalty-free song around 110 BPM with a quiet intro and a hard drop (Mixkit, free for commercial use), and my logo for the ending. If I skip any, use the defaults: "is this all code?" / "yes. every frame.", two atmospheric photos, Mixkit "Head Bang".
</inputs>

<direction>
A 22 second square loop, 1440x1440 at 60fps, 2D only, one continuous take. Nothing ever cuts: every scene grows out of the last, and every gesture physically carries the camera into the next world. Every morph glides for 0.8s on cubic-bezier(.45,0,.15,1) and the camera zoom rides the same curve, so shapes change so smoothly you barely notice. Content dissolves in the back half of each glide. One gesture per scene.
Look: a warm light stage (#f3f3f0 to #e3e3de), black UI, the app world dark (#121212) tinted from the current album cover, one green accent (#1ed760). Geist for UI, the real macOS pointer, soft layered shadows that grow with the shape's height.
Banned: hard cuts, bouncy springs, particles, glows, zooming in and straight back out, holds longer than 1s, anything that looks like a template.
</direction>

<structure>
Beats are the song's, and the press lands on its drop.
Generate: the cursor clicks, the pill glides into a spinner, then a check.
Chat: the check splits into three typing dots (goo). The left dot flies up into the question bubble and types it, the right one flies down into the reply. Both contract back into dots while gliding in and pour into the middle one.
Play: the middle dot bends into a play triangle, point by point. The cursor presses it on the drop: a white button pops in under the click and the dark app floods out around it, so the leftover white becomes the play button. The camera pulls back to reveal the full now-playing screen: big cover, title, heart (liked, fills green), progress, controls, volume.
Swipe: the cursor drags the cover sideways, the next track slides in, and the whole app retints from the new cover.
Drag: the camera glides to the volume. The cursor drags it to max and keeps pulling: the bar rubber-bands and drags the camera sideways out of the app, tracking the knob across a dark dotted canvas.
Chart: the line lands and bends up into a green chart while the number counts up. The volume knob becomes its last point.
Dive: the cursor clicks that point and the camera dives into it until the light stage fills the frame.
Ending: an "Ask [my product]" button grows out of the light, thins into a line, and the line fans out into my logo (default: the Claude spark, six copies rotating into twelve rays in Claude orange). It folds back into the line, which thickens into Generate. Last frame = first frame.
</structure>
````

## morse-369333

@__morse · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/morse-369333) · [post](https://x.com/__morse/status/2103485566570369333)

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

## twoclipping-000267

@twoclipping · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/twoclipping-000267) · [post](https://x.com/twoclipping/status/2102554209166000267)

````text
<inputs>
Ask me for: the product name and a one-line promise, 3 to 5 UI moments to show, one accent color, 10 to 20 real vertical clips I own, and a royalty-free song with a clear drop (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
High-end minimal. One idea per shot, lots of empty space, one accent color, one clean sans (Geist or Inter) with tight tracking. Masked type reveals, match cuts, one smooth camera language. Real footage only, never placeholder cards. No full stops in on-screen text.
Banned: shockwave rings, particle bursts, RGB split, camera shake, lens flares, neon glows, grid floors, flashing backgrounds, bouncy easing.
</direction>

<structure>
10 bars at 120 BPM, 2 seconds each.
Bar 1: the hook lands word by word on the beats.
Bar 2: one hook word morphs into the product UI. A cursor types and clicks.
The drop: a circle opens out of the button into a dark scene.
Then one move per bar: a wall of real clips with a scan line and 3 winners, the key output as big type, a 3D carousel of real videos with floor reflections and a motion-blurred whip onto one hero clip, the hero in a phone next to a panel that flips into results, big stats on push cuts, a 3-word ticker, a logo reveal, a fade to black.
</structure>

<build>
1. One HTML file at 1920x1080. Every style is computed from time inside 
http://
window.seek(t): no CSS animations, no timers, no state between frames.
2. Real video: extract clips to 30fps JPEG sequences with ffmpeg and swap img sources per frame. seek awaits the image decodes.
3. Analyze the song with numpy: tempo, beat grid, energy per bar, the drop. Calibrate the grid to the real kick hits. Every cut sits on a downbeat, every UI hit on a beat.
4. Render with Playwright: 3 subframes per frame at t minus, at, and plus 1/240s, then blend with ffmpeg tmix for real motion blur at 60fps.
5. Place each sound effect so its measured peak, not its file start, lands on the event. Keep the effects quiet under the music. Loudnorm to -14 LUFS.
6. Probe 20 or more frames before the full render. Fix anything cluttered, overlapping or hard to read.
</build>

<gotchas>
Never set opacity or filter on a preserve-3d element, because it flattens and both faces show. Fade its wrapper instead. Measure element positions at runtime for match cuts. Only use music and sound effects whose license allows commercial use.
</gotchas>

<start>
Ask me for the inputs, then show me a storyboard with every timing on the beat grid before you write any code.
</start>
````

## raphaelaubryy-687877

@RaphaelAubryy · css · [watch](https://skillry.dev/ai-videos/opus-5-5/raphaelaubryy-687877) · [post](https://x.com/RaphaelAubryy/status/2103413596822687877)

````text
<inputs>
Ask me for: the product name and a one-line promise, 3 to 5 UI moments to show, one accent color, 10 to 20 real vertical clips I own, and a royalty-free song with a clear drop (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
High-end minimal. One idea per shot, lots of empty space, one accent color, one clean sans (Geist or Inter) with tight tracking. Masked type reveals, match cuts, one smooth camera language. Real footage only, never placeholder cards. No full stops in on-screen text.
Banned: shockwave rings, particle bursts, RGB split, camera shake, lens flares, neon glows, grid floors, flashing backgrounds, bouncy easing.
</direction>

<structure>
10 bars at 120 BPM, 2 seconds each.
Bar 1: the hook lands word by word on the beats.
Bar 2: one hook word morphs into the product UI. A cursor types and clicks.
The drop: a circle opens out of the button into a dark scene.
Then one move per bar: a wall of real clips with a scan line and 3 winners, the key output as big type, a 3D carousel of real videos with floor reflections and a motion-blurred whip onto one hero clip, the hero in a phone next to a panel that flips into results, big stats on push cuts, a 3-word ticker, a logo reveal, a fade to black.
</structure>

<build>
1. One HTML file at 1920x1080. Every style is computed from time inside 
http://
window.seek(t): no CSS animations, no timers, no state between frames.
2. Real video: extract clips to 30fps JPEG sequences with ffmpeg and swap img sources per frame. seek awaits the image decodes.
3. Analyze the song with numpy: tempo, beat grid, energy per bar, the drop. Calibrate the grid to the real kick hits. Every cut sits on a downbeat, every UI hit on a beat.
4. Render with Playwright: 3 subframes per frame at t minus, at, and plus 1/240s, then blend with ffmpeg tmix for real motion blur at 60fps.
5. Place each sound effect so its measured peak, not its file start, lands on the event. Keep the effects quiet under the music. Loudnorm to -14 LUFS.
6. Probe 20 or more frames before the full render. Fix anything cluttered, overlapping or hard to read.
</build>

<gotchas>
Never set opacity or filter on a preserve-3d element, because it flattens and both faces show. Fade its wrapper instead. Measure element positions at runtime for match cuts. Only use music and sound effects whose license allows commercial use.
</gotchas>

<start>
Ask me for the inputs, then show me a storyboard with every timing on the beat grid before you write any code.
</start>
````

## gdgtify-989608

@Gdgtify ·  · [watch](https://x.com/Gdgtify/status/2105669567036989608) · [post](https://x.com/Gdgtify/status/2105669567036989608)

````text
Create a 20.00-second kinetic typography film titled “ESCAPE THE ORBIT,” based on John F. Kennedy’s Rice University address, September 12, 1962.

The central experience: a sentence discovers that it can change its own trajectory.

Deliver one complete, self-contained HTML file. Composition: 1080×1080. Target: 60fps. Use Canvas, SVG, or embedded WebGL. Embed required assets and libraries. The film must work without audio.

EXACT DISPLAY TEXT
“We choose to go to the moon”
“[…]”
“not because they are easy,”
“but because they are hard”
Preserve this order. The bracketed ellipsis explicitly indicates omitted speech. Attribution is separate from the excerpt. No additional slogans.
ART DIRECTION
Background: midnight # 080D23.
Primary type: warm white # FFF4DD.
Trajectory: electric coral # FF654F.
Secondary orbital geometry: blue # 6685FF.
Use a broad, confident grotesque for the speech and a sharply drawn italic for the final emphatic word. Avoid the appearance of a spacecraft dashboard. No rockets, astronaut illustrations, starfield wallpaper, lens flares, or decorative telemetry.
The frame should resemble an exceptionally refined astronomical instrument that has become expressive.

CENTRAL VISUAL RULE
The baseline of the sentence is a trajectory.

At first it is trapped in a closed orbit. A rhetorical decision changes that orbit into an open path. The letters remain the same travelers throughout.
Use an abstract orbital metaphor; do not present invented mission data or imply a physically accurate flight simulation.
STORYBOARD
0.00–3.50
The opening excerpt appears across the center, large and horizontal. Reveal it in three meaningful phrase groups.
A single hairline ellipse passes behind the baseline. A small circular lunar mark occupies its distant focus.
Hold the completed phrase motionless for 700ms.

3.50–6.00
The camera pulls back. The previously straight baseline reveals a shallow curvature.

The phrase travels along the ellipse as a coherent unit. Keep its glyphs upright during the initial movement. Only after the reading hold may they progressively adopt the tangent of the path.

The viewer realizes the sentence is circling rather than advancing.
6.00–7.00
Show the bracketed omission in an uncluttered central opening. The orbital movement decelerates.

7.00–10.50
Reveal the next clause on the near side of the orbit. Its final word travels through one smooth, effortless arc and returns toward where it started.

This ease should feel elegant but unproductive. Avoid comic bouncing.

10.50–14.50
Reveal the final clause horizontally before transforming it.
At its emphasis, the ellipse opens at one precise point. The same tracked letter group takes the new tangent and departs.
Perform one deliberate 70-degree camera roll. Counter-rotate the active phrase so it remains readable while the orbital field changes orientation around it.

The trajectory sweeps from lower left to upper right. Acceleration is conveyed by expanding spacing between its trailing marks, not by shaking the camera.

14.50–17.00
The camera matches the departing phrase’s velocity. The phrase becomes visually still while the old orbit recedes beneath it.

The lunar mark enlarges into a restrained crescent through geometric overlap. The crescent brackets the destination without becoming a cartoon illustration.
17.00–20.00
Resolve into a spacious editorial composition containing the selected excerpt in reading order, including its omission marker.

The open trajectory runs through the margins and exits the frame. Hold the entire image completely still for the final 1.2 seconds.

CHOREOGRAPHY
Use only three camera operations: pullback, roll, velocity match.
Give each operation a rhetorical purpose.
Keep the currently read phrase at least 64px high in the 1080px composition.
Motion blur may affect trailing geometry, never the active text.
No word may begin its ornamental travel before its reading hold finishes.

IMPLEMENTATION
Represent the ellipse and departure path analytically. Blend position and tangent continuously at the departure point; no teleportation.
Use arc-length sampling for consistent spacing along curves.
Separate camera transforms from glyph orientation.
Cache glyph rendering and static geometry.
Expose window.ready and window. seek(t). Seeking must pause playback and render any time from 0 through 20 deterministically, including out-of-order calls.
Provide window.frame(n) for n=0…1199 at t=n/60.
Render t=20 as the final held composition.
Use no accumulated physics or runtime randomness.

QUALITY GATE
Inspect frames at 0, 3, 5, 7.5, 10.5, 13, 16, and 19 seconds.
Verify that the same tracked phrase visibly follows its own trajectory.
````

## agioyaz-397647

@AGIOyaZ ·  · [watch](https://x.com/AGIOyaZ/status/2103167623303397647) · [post](https://x.com/AGIOyaZ/status/2103167623303397647)

````text
Create a 37-second vertical short film (1080×1920, 30 fps) in three.js, titled "White Space".

【Experience】
Without showing a single human figure, let viewers physically feel how a life consumed by efficiency loses its light — and how a single empty space lets a richer light pour back in. The climax should make people hold their breath: a world-class stained glass image of the Virgin and two angels projected across a cathedral floor in blazing color.

【Setting】
- A dim Gothic cathedral interior with one lancet window, 15 m tall and 10 m wide.
- Strong sunlight enters from outside at 45°, casting the window's image onto the stone floor.
- Stained glass: an original, symmetric composition in the tradition of 13th-century French cathedral glass — never copy an existing window.

【Stained glass quality bar】
Aim for the level of Chartres or Sainte-Chapelle:
- Hundreds of small glass pieces, each with its own color variation, streaks, and seed bubbles
- Grisaille painting on the glass: serene faces with painted eyelids, brows and lips; drapery folds with soft shading; every feather painted with a rachis and barbs
- Edge matting so each piece glows brighter at its center
- A deep blue diaper background with ruby rosettes, a jeweled border of alternating colors and pearls
- The Virgin in a ruby niche under a pointed Gothic arch with crockets, columns and capitals, gold rays radiating behind her halo
- A multi-ring rose window at the top with stone-like tracery and jewel roundels

【Timeline】
0–3 s: Colorless white light fills the cathedral.
3–11 s: Gray cubes engraved with words fly in faster and faster, sealing the window. The room darkens.
11–14 s: Total darkness and silence.
14–19 s: Only the "BUSY" block falls away, dissolving into sparks. One golden beam enters.
19–26 s: Blocks cascade away from the first hole. Colored light shafts multiply; the glass is revealed.
26–33 s: The camera spirals up through the shafts to look down on the Virgin and angels glowing across the floor.
33–37 s: Everything is engulfed in radiant light; the final line appears, then dissolves into white.

【Words on the blocks】
BUSY, URGENT, ASAP, DEADLINE, KPI, MEETING, OVERTIME, OPTIMIZE, EFFICIENCY, INBOX, FASTER, TO-DO, SPRINT, TARGETS, HUSTLE, REPLY ALL, EOD, METRICS, SCALE, GRIND, RUSH, PING, FOLLOW-UP, MULTITASK, NOW

【On-screen text (elegant serif, appearing and fading quietly)】
"Every day, faster."
"Every day, more efficient."
"Until the light could no longer get in."
"Let one thing go."
"Where there is space, light comes in."
"And the light was richer than before."
Final: "Abundance dwells / in white space."

【Music and sound (original, synthesized)】
- 0–11 s: A ticking clock that accelerates; a dull thud each time a block lands; a low drone rising in tension
- 11–14 s: Silence
- 14.8 s: A single crystalline bell as the first beam enters
- 19–33 s: A soft chime for each falling block, blooming into an ethereal choir-like pad with a slo
````

## tanabe-fragm-322001

@tanabe_fragm ·  · [watch](https://x.com/tanabe_fragm/status/2107644501372322001) · [post](https://x.com/tanabe_fragm/status/2107644501372322001)

````text
添付の画像を「最後の画面」にして、全部タイルでできた30秒の広告動画（音つき・mp4）を作ってください。
ブラウザ（Three.js）で組み、Chromeで全コマを書き出し、ffmpegでmp4にします。

# ゴール
- 見る人は25秒、タイルの制作動画だと思って見る。最後の数秒で、添付画像（広告）だったと気づく
- 最後の画面は添付画像とほぼ同じ。文字が読める。画面いっぱいがタイル（床は見せない）

# 仕様
- 1920×1080、30fps、30秒。HTML1ファイル（Three.js。npmで入れてesbuildで1ファイルに固める）
- 時刻 t を渡すと、同じ t なら必ず同じ絵になる作りにする（seek(t)）
- タイルは1枚ずつ別のインスタンス。16:9の格子で約19万枚（576×324）
- 位置・向き・厚み・面取り・色を1枚ずつ変える。目地（隙間）は空き。線は引かない
- 添付画像は、タイルの色を取るためだけに使う（テクスチャとして貼らない）
- 素材は約12種（釉薬セラミック、スレート、真珠貝、白磁、テラコッタ、ガラスなど）。色の明るさと彩度で割り当てる
- 光は、左上の硬い太陽1つ。床は漆喰。奥に赤い大工のチョーク線がピンぼけで入る
- 被写界深度（円形ボケ）を後処理で自作する。しぼりは最初大きく、最後は小さく

# 流れ（秒）
0〜3　 床に暗いタイルが1枚。カメラは床すれすれ
3〜10　[組み始める場所]から、タイルが渦を巻いて落ちる。最初の1枚→周りの順に増える
10〜21 一気に外へ広がる。カメラが引いて[見せたい絵]が見えてくる
21〜24 全体が見える。文字になる場所は、周りと同じ淡い色のまま
24〜26 文字・ロゴ・ボタンのタイルが、左から順にパタパタ裏返って現れる
26〜30 真上からの構図で止まる。カーソルが[ボタンの文言]をクリックし、ボタンのタイルが少し沈む

# ハマりどころ（必ず守る）
- 文字になるタイルは、最初は周りの背景色で組む。背景色は、外側から内側へ塗り広げて決める。文字のふち（白ぶち）も一緒に裏返す。守らないと、途中で文字の形が見えてしまう
- 真上のカメラは、位置を真上ぴったりにしない（向きが90°回る）。止める所は、動きの勢いをゼロにする（補間のはみ出しで反転する）
- 最後の画面は、元画像と並べて色を比べ、露出・彩度・色味を合わせる
- 文字が小さくて読めないときは、タイル数を増やす
- 下地の暗い面は、タイルが着地したマスだけに出す

# 音
- ElevenLabsの効果音で、タイルを置く音・裏返す音・マウスのクリックを作る（各0.5秒）。作る前に、クレジットの消費を知らせる
- タイルの着地・裏返しの時刻に合わせて並べて重ねる。カメラが遠いほど小さく、数が増えたら雨のようにまとめる
- 24〜26秒のパタパタを、いちばん目立たせる。音量は -16 LUFS

# 進め方
1. 先に脚本（秒ごとの情景）を日本語で出し、OKをもらってから作る
2. 途中のコマ（最初のタイル／組み始め／引き／全景／文字が出る瞬間／最後）を自分で見て直す
3. 書き出しは Chrome（puppeteer-core）で seek(t) を30fpsぶん呼び、png を ffmpeg に流す
4. 納品は mp4（高画質と共有用）と、確認した画像

# 入力
- エンドフレーム: [添付]
- 組み始める場所: [例：人物の目]
- 引いたときに見せたい絵: [例：笑顔の女性]
- ボタンの文言: [例：無料体験はこちら]
````

## xanares-738984

@Xanares ·  · [watch](https://x.com/Xanares/status/2105770390924738984) · [post](https://x.com/Xanares/status/2105770390924738984)

````text
Make a 37-second demoscene tech demo for the track ~/Downloads/(filename).mp3.
The goal is graphics nobody has seen before. Like it's a statement for a new AI demoscene.

Story, in one continuous shot with no cuts:
- A chrome sphere floats in dark fog. On each hit in the track, it gains one Mandelbox fractal level.
- In the drop, the object grows until its top face is a landscape. Fly low over it at sunset, then dive off its edge.
- At the end, the fractal collapses into 3D gold letters of the title. Carve the letters from the same fractal and light them with the same light.

Look: path-traced quality. Soft shadows, ambient occlusion, glossy reflections, fog with light shafts, depth of field, motion blur, bloom.

Sync: analyse the track first. Save a JSON beat map with hits, breaks, and kick, snare and hat onsets. Kicks pulse the light. Hats add surface detail.

Tech:
- One WebGL2 fragment-shader raymarcher. One HTML page is both the live player and the render source.
- Live: 60 fps in Chrome.
- Offline: 1920x1080 at 60 fps with 16 samples per pixel. Render it in headless Chrome on the Mac GPU, pipe the PNG frames to ffmpeg, and use the MP3 as the audio.
- Do not use AI image or video generators.
- Check contact sheets of stills before the full render.
````

## agioyaz-986461

@AGIOyaZ ·  · [watch](https://x.com/AGIOyaZ/status/2103145567945986461) · [post](https://x.com/AGIOyaZ/status/2103145567945986461)

````text
three.jsで、縦長1080×1920・30コマ/秒・約36秒の短編映像を作ってください。

【作品名】
余白

【見せたい体験】
効率化に追われて時間を失っていく感覚と、余白を手に入れた瞬間に人生が豊かな光で満たされていく感覚を、人物を一切登場させずに体感させる映像です。最後に床一面に浮かび上がるステンドグラスの光で、見た人が思わず息をのむことを目指します。

【舞台】
・薄暗い石造りの大聖堂の内部。正面の壁に、高さ15m・幅10mの尖頭アーチ型の窓が一つだけある
・窓の外からは、斜め45度の角度で強い光が差し込み、石の床に窓の形の光を落としている
・窓には、中央に聖母、両脇に翼を広げた二人の天使、上部にバラ窓を配したステンドグラスがはまっている。デザインは既存の作品を模さずオリジナルで、左右対称の構図にする

【時間の構成】
0〜3秒：窓から差す光は、まだ色のない白い光。床にやわらかな白い光の形
3〜11秒：「忙しい」「効率化」「至急」「締切」などの言葉が刻まれた灰色の立方体が、部屋の手前から次々と飛んできて窓を埋めていく。飛来のペースはどんどん加速し、窓が埋まるほど部屋は暗くなる
11〜14秒：窓は完全にふさがれ、闇と静寂
14〜19秒：「忙しい」のブロックが一つだけ窓から外れて落ち、光の粒になって消える。空いた穴から、鮮やかな色の一筋の光が差し込む
19〜26秒：最初の穴を中心に、ブロックが連鎖的に外れていく。穴が増えるたびに色とりどりの光の柱が増え、隠れていたステンドグラスが少しずつ姿を現す
26〜33秒：すべてのブロックが消え、カメラは光の柱をくぐり抜けて上昇し、真上から床を見下ろす。床一面に、聖母と天使のステンドグラスが色鮮やかな光として映し出されている
33〜36秒：画面全体がまばゆい光に包まれ、最後の言葉が浮かび、静かに終わる

【言葉（明朝体、控えめに浮かんでは消える）】
・「毎日、もっと速く。」
・「もっと、効率よく。」
・「気づけば、光が入らなくなっていた。」
・「ひとつ、手放してみる。」
・「空いたところから、光が入る。」
・「その光は、前より豊かだった。」
・最後に大きく：「豊かさは余白に宿る」

【光と質感】
・光の柱は、ステンドグラスのその場所の色に染まり、空中の塵がきらめく
・床の投影は、窓のどの穴が空いているかを正確に反映する（ブロックがある場所は影になる）
・ブロックは無機質なマットグレー。言葉は白く刻印されている
・前半は冷たく無彩色、後半は宝石のような赤・青・金。この色の対比で「豊かになった」ことを語る

【技術条件】
・ステンドグラスの絵柄は画像として生成し、床の光・光の柱・窓の表示はすべて同じ絵柄から計算して一致させる
・時間を1/30秒ずつ正確に進めて1コマずつ書き出し、MP4にする

【仕上げ】
各場面を実際に描画して確認し、ステンドグラスの絵柄が床の上で聖母と天使として読み取れるか、言葉が読めるか、動きが唐突でないかを直してから渡してください。
````

## alexalbert-274839

@alexalbert__ · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/alexalbert-274839) · [post](https://x.com/alexalbert__/status/2102466523164274839)

````text
Recreate Market Street, San Francisco as it stood on April 17, 1906, the afternoon before the earthquake, in Blender.

Scope: the Ferry Building up Market to Fifth Street, including the Palace Hotel, the Call Building, the Chronicle Building, Lotta's Fountain and the Emporium.

Before modeling anything, build a source file from: the 1899-1905 Sanborn fire insurance maps (footprints, heights, materials, occupants), the Miles Brothers film "A Trip Down Market Street" (April 1906), period photographs from OpenSFHistory, the Library of Congress and the David Rumsey collection, and USGS topography. Record every building with footprint, height, facade material, occupant, and the source for each fact with a confidence level.

Build everything in Blender Python. No downloaded meshes, textures or HDRIs. Write reusable generators (Victorian commercial facade, mansard roof, bay windows, awnings, painted signage, gas and electric street lamps, cable car, horse-drawn wagon, early automobile) and assemble the street from the source file, so every building traces back to data.

Provide a 10 second video up the street.
````

## nft-chen-068069

@NFT_Chen ·  · [watch](https://x.com/NFT_Chen/status/2107653056771068069) · [post](https://x.com/NFT_Chen/status/2107653056771068069)

````text
做一支 10 秒彩色皮影戏，讲【曹冲称象】。剪影布局，暖光透背，关节式偶戏。依次出现秤盘、铜碗、石头，先平衡，再把石头分批称、加起来。字幕卡点出现。用代码渲染，导出可播放视频。

做一支 12 秒等距 2.5D 流程动画，讲【快递怎么分拣】。包裹沿分拣线、货台、平板运输、清关关卡移动，每步编号标签，最后双线汇成一条。干净、可跟读。

做一支 10 秒比例尺对比，把【地球、木星、太阳】按真实半径同屏摆放。镜头平滑拉远，第一个物体缩小，点题「太阳底下约有 130 万个地球」。数字标注清晰。

做一支 10 秒白板手绘。白底黑马克笔一笔笔画出【火柴人连甩 5 个包子】，红色只强调关键点。满足感粒子一颗比一颗大，最后角落画满。字幕：第 1 个，满足感拉满。

做一支 10 秒 WebGL 电影感汉字演变，主题【火】。龟甲、青铜、墨迹、火光质感。「火」从甲骨到闪电、火把，再到现代照明，形态连续变形，对应炎、烈、焰。

用 three.js 做一支 12 秒爆炸图，拆解【一部手机】。外壳、中框、芯片分层炸开，镜头环绕拉近，零件用虚线引出标注。可换成任何结构。

做一支 10 秒 16 位像素典故，讲【黄粱一梦】。取象、中举、治河、出征，每段约 1.6 秒硬切，最后回到现实。字幕：第二年，考中进士，当上了官。

做一支 10 秒绘本风科普，讲【小金鱼怎么游】。蜡笔线加铅笔涂色，线条抖动，眼睛、鳃、尾鳍对称，尾巴跟着节拍摆。纸本质感。

做一支 10 秒 3Blue1Brown 式数学可视化，讲【圆面积】。深色底，圆切成 8、16、32 个扇形，真的移拼成长方形。公式逐项出现，定格 πr²。

做一支 10 秒古地图动画，讲【长安到敦煌】。羊皮纸、淡墨山路，朱红路线一笔画过去，标注里程和一句讲解，最后盖章。镜头可缩放。

做一支 10 秒 Kurzgesagt 式信息图，讲【纸对折厚度】。干净图形、大数字：对折 2 次，厚度 0.4 毫米，厚度 ×2。镜头规则拉近，直到终点。

做一支 10 秒扁平 MG，讲【降水】。纯色几何、无描边。云里的小水滴越聚越大，然后掉下来。两段明暗，卡通云朵。

做一支 10 秒卡点排版，120 BPM，讲【费曼学习法】。每个词卡一拍，黑底橙字切入。四步依次砸出，最后一锤：讲不清楚，就是没真懂。

做一支 10 秒漫画分格，讲【一扇窗破了】。黑白网点加一个红色。听课、被发现、冲出教室，格间硬切，最后一格点题。

做一支 12 秒横轴时间线，讲【从达特茅斯到 ChatGPT】。镜头沿轴推进，节点缩放点亮。年份大字加一句事件。示例节点：1971，又过了 41 年。
````

## aichrislee-476025

@aichrislee · threejs, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/aichrislee-476025) · [post](https://x.com/aichrislee/status/2107622585307476025)

````text
Build me a mechanical watch in interactive 3D, in one HTML file with Three.js.

Make it look real: the gold case and the glass on top, the dial and the hands, and behind it the movement you never get to see. The mainspring in its barrel, the gear train, the balance wheel swinging back and forth with its hairspring breathing, the escape wheel and the pallet fork ticking, and the red jewels the gears turn on. The balance wheel swings, the gears turn, and the second hand ticks. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart in layers with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.
````

## kopert0x-098349

@kopert0x ·  · [watch](https://x.com/kopert0x/status/2104961082880098349) · [post](https://x.com/kopert0x/status/2104961082880098349)

````text
Create a single self-contained index.html: a ~2-minute animated short called "the last piano", in a hand-drawn crayon and watercolor style.

Scene: a small rusty robot with one glowing eye walks through a dark, empty city in the rain and finds an old upright piano under a broken streetlamp. Later a black cat shows up to listen.

Music: compose an original piano piece (Am - F - C - G) and synthesize it in Web Audio. It starts with one unsure note and grows into full chords.

Sync: one timeline drives both. The robot's hands hit the keys that are actually sounding. Every note turns on a window in the city, the rain turns to snow, and the final chord lights up everything that's left.

Rules: Canvas 2D only, no libraries, no external assets.
````

## lukasersil-726495

@lukasersil · threejs, shader, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/lukasersil-726495) · [post](https://x.com/lukasersil/status/2103742861971726495)

````text
Create a bold, dynamic 15-second motion graphics showreel that feels like the ultimate portfolio piece of an exceptionally talented motion designer. Showcase a wide range of advanced techniques: kinetic typography, smooth transitions, 2D and 3D animation, abstract geometry, fluid simulations, particles, distortion, creative masking, compositing, lighting, depth, and seamless camera movement. Keep the pacing fast, confident, and visually surprising, with every shot transitioning naturally into the next. Make it feel meticulously art-directed rather than like a random collection of effects. Push the creativity, polish, timing, and visual impact as far as possible. This should feel like the opening reel that gets a motion designer hired.
````

## okazaky-084783

@okazaky ·  · [watch](https://x.com/okazaky/status/2107826563786084783) · [post](https://x.com/okazaky/status/2107826563786084783)

````text
Create a 50-second vertical music video using programmatic rendering (Three.js) instead of native video AI.
1. Generate song with Suno. Extract lyrics from embedded metadata.
2. Separate stems with Demucs (vocals, drums, bass, other).
3. Transcribe vocals with mlx_whisper. Align with official lyrics to create script where '1 lyric line = 1 scene'.
4. Write storyboard: define 'What to show in 3D', 'Camera', 'Main word' for each lyric line.
5. Have 4 parallel Opus sub-agents write scene programs.
6. Export 16-frame contact sheet for visual verification.
7. Render headless Chrome at 1080x1920, 60fps.
8. Normalize volume to -14 LUFS.
Style: Engraving-like lines, colors limited to Black, Bone, Orange.
````

## 0xcodez-474136

@0xCodez ·  · [watch](https://x.com/0xCodez/status/2104257855142474136) · [post](https://x.com/0xCodez/status/2104257855142474136)

````text
Create a single self-contained index.html: a ~2-minute animated piano performance in a hand-drawn crayon style.

Scene: a cozy room at night, an upright piano, a small black cat playing it. Crayon texture on every surface: grainy strokes,wobbly outlines, paper tooth.

Music: compose an original piano piece (~40 bars, clear melody, calm then building, soft ending). Synthesize the piano in Web Audio with harmonics, hammer noise and reverb. No audio files.

Sync: one timeline drives both. The cat's paws hit the keys that are actually sounding. Lights, camera and mood follow the music.

Rules: Canvas 2D only, no libraries, no external assets. Support pause/replay and ?t=90 to jump to any moment.
````

## ayi-ainotes-933194

@AYi_AInotes ·  · [watch](https://x.com/AYi_AInotes/status/2106784005911933194) · [post](https://x.com/AYi_AInotes/status/2106784005911933194)

````text
Create a 30-second full-code-driven animation using SVG vector graphics and synthesized original soundtrack. 

Visual Style: Abandon line boiling; use hand-written vector gradients, soft shadows, and night sky glows.

Scene Sequence:
1. A small character steps on the ground, charges up, runs into the sunset, and hits a star which explodes.
2. Sync every action (stepping, charging, running, exploding) precisely to piano and harp notes frame-by-frame.
3. Ending: Cursive text "Claude Opus 5.5" does a flip and lands as a decimal point, followed by confetti falling from a blink.

Technical Requirement: Every frame and note must be written by code.
````

## essjaykay755-847163

@essjaykay755 ·  · [watch](https://x.com/essjaykay755/status/2103446726245847163) · [post](https://x.com/essjaykay755/status/2103446726245847163)

````text
create a bold, cinematic 30 sec motion graphics showreel that feels like a high end designer resume brought to life....mixing kinetic typography, fluid 3D motion, sharp graphic transitions, abstract geometry, expressive compositing, and unexpected visual transformations. keep the pacing fast, rhythmic and constantly evolving, with every shot revealing a new technique while maintaining a cohesive art direction. Make it feel premium, inventive, technically precise and unforgettable
````

## mochi-agi-421448

@Mochi_AGI ·  · [watch](https://x.com/Mochi_AGI/status/2104757097850421448) · [post](https://x.com/Mochi_AGI/status/2104757097850421448)

````text
今回は ElevenLabs v4 のお試しで、終電のホームの短いホラー

声は v4 で2人の掛け合いを1回で生成
画は静止画9枚に奥行きつけて動かしてるだけ、動画生成AIはなし

最初の声がぜんぜん怖くなかったので
→ 台詞はそのまま、途中に [whispering] とか [laughs softly] とか英語で演技の指示
→ stability 0.5 → 0.3
→ 女の声は3人聞き比べて、息の多い低い声に
女は最後まで小声、顔は出さずに背中と唇だけ

字幕は明朝体、女は縦書きで男は横書き
女の字はささやく速さで1字ずつ、男の字は叫ぶほど震える仕様

使用ツール
・Claude Code の Opus 5.5　企画、演出、動きと字幕のコード、仕上がりのチェック
・ElevenLabs v4　2人の声の掛け合いと、環境音
・Codex の画像生成　静止画9枚
・Three.js　静止画に奥行きをつけてカメラを動かす
・しっぽり明朝 B1　字幕の書体
・Playwright　ブラウザで1コマずつ書き出し
・ffmpeg　動画の書き出し
````

## milos-gis-317580

@milos_gis ·  · [watch](https://x.com/milos_gis/status/2103751211040317580) · [post](https://x.com/milos_gis/status/2103751211040317580)

````text
Create a video of Portland, OR's bus service on a random Tuesday! Showcase Portland's different neighborhoods at a high level and then zoom in on specific routes in each quadrant (absorbing North Portland into NE and South Portland into SW for brevity). Use a light theme. Slow down the speed of the bus animation when zoomed in, without increasing the total duration too much so the viewer can appreciate some of the landscape and streets it travels through in a given loop.
````

## bthreeagency-827092

@BThreeAgency · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/bthreeagency-827092) · [post](https://x.com/BThreeAgency/status/2103739079745827092)

````text
Using the linked Figma frame build a badge unlock screen. Match the design exactly. Use the file's assets, lighting, type and layout and add only the motion. Animate the badge so it feels premium and celebratory. Build its scene and then celebrate with gold particles. Treat the badge as a solid 3D object that tilts toward the
cursor following the rules of physics. Keep it fast and smooth, it should not be bouncy.
````

## sammmaing-702076

@SammmAing ·  · [watch](https://x.com/SammmAing/status/2103280356371702076) · [post](https://x.com/SammmAing/status/2103280356371702076)

````text
Create an animation of building instructions for a real LEGO model of Doctor Doom based on the provided picture. The model should consist of approximately 3,144 pieces, be 46 cm tall, and ensure every piece clicks onto the one below without overlapping or tipping over. Build the mask as a separate sub-assembly snapped onto the face. Animate the assembly process in 850 steps using Three.js in a single web page.
````

## ishuagra02-678129

@ishuagra02 · threejs, shader, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/ishuagra02-678129) · [post](https://x.com/ishuagra02/status/2102920408743678129)

````text
Create a stylistic 3D environment of a busy Santa Monica beach that adapts to the time of day. The art style must be a particle illustration, which uses thousands of tiny glowing specks rather than solid fills with flowing ribbon strokes behind figures to suggest motion.

I had 2-3 more prompts on top of this, but this is a good starting point.

Repo link: https://github.com/ishuagrawal/particle-beach
````

## niirajrshah-163739

@niirajrshah ·  · [watch](https://x.com/niirajrshah/status/2104551261270163739) · [post](https://x.com/niirajrshah/status/2104551261270163739)

````text
Here is my life timeline. Turn it into a [45]-second motion graphics video, 1080 x 1350, for LinkedIn. One scene per moment. Show the year large and the moment in one line, and move between them. Build it as one HTML file where every frame is a part of time
Before you render, make a contact sheet of stills, check it for overlaps and spelling, and fix what is wrong. Then render the MP4.
````

## oab10don-457273

@oab10don ·  · [watch](https://x.com/oab10don/status/2105879685322457273) · [post](https://x.com/oab10don/status/2105879685322457273)

````text
クラウドのLinux環境にBlenderをPythonモジュールとして入れ、シーン構築からレンダーまで全部スクリプトで実行
ステージ、照明、紙吹雪、カメラワークをコードで組み、Cyclesで描画
グロー、フラッシュ、色収差の後処理とMP4化まで自動
BGMもサンプル素材なし。キック、スネア、ベース、シンセをnumpyのコードで合成
ダンスの腰の高さを解析し、本来のテンポが約137BPMと特定
拍ごとにダンスの時間を補正して、全拍で沈み込みがキックと±0.5フレームで一致
カット、照明、ズーム、質感の切り替えもすべて拍の頭に合わせ、最後の一撃で全員静止
カメラはPythonで毎フレーム計算。急降下、回り込み、顔のアップから横に振り抜くカットなど
拍の頭でクローム、ゴールド、ホログラム、ボクセルに質感とメッシュが変わる
````

## mdaman010-610173

@mdaman010 ·  · [watch](https://x.com/mdaman010/status/2107888264904610173) · [post](https://x.com/mdaman010/status/2107888264904610173)

````text
Build an entire miniature 3D world of Middle-earth from scratch in Three.js/WebGPU, including procedural terrain & geography, 24 procedural landmarks, water, smoke, lava & atmosphere, day/night transitions, camera choreography & route animation, frame-by-frame rendering, and an original orchestral score. Turn this into a 3:47 cinematic journey.
````

## simonasltu1-981181

@SimonasLTU1 ·  · [watch](https://x.com/SimonasLTU1/status/2108175272964981181) · [post](https://x.com/SimonasLTU1/status/2108175272964981181)

````text
Create a visual experience for the theme "If my dreams turned real", narrated by a deep, warm, cinematic voice. The visual experience should be striking, highly graphical, beautifully animated, and genuinely impressive. It should be around 1 minute long. Treat it as an experimental piece of digital art created with HTML/CSS/JS/Three.js.
````

## generussai-904308

@generussai ·  · [watch](https://x.com/generussai/status/2105921281673904308) · [post](https://x.com/generussai/status/2105921281673904308)

````text
animate golden ratios and mandlebrot sets, sacred geometry and cymatics in a well thought out eye candy javascript or 3js 3d animated video. use motion animation to show off your skills and push the limits with quick cuts, vibrant colors and cute but badass characters. make it like an adult cartoon you'd watch on adult swim
````

## anilraok-009118

@Anilraok · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/anilraok-009118) · [post](https://x.com/Anilraok/status/2103087766662009118)

````text
I want you to imagine a story, that subtly promotes grid genius. Or it can not even have grid genius, but something that aligns with our app and helps us get more eyeballs when posted on social media. Then using threejs/javascript I want you to create full animation, Pixar-level quality out of the story you imagine
````

## dan-riverbendai-163640

@dan_riverbendai ·  · [watch](https://x.com/dan_riverbendai/status/2103985505302163640) · [post](https://x.com/dan_riverbendai/status/2103985505302163640)

````text
Minimalistic, simple one line sketch building everything in real time with the musical score ("Pétales Givrés") I gave you.

Use gentle pastels with an old school film quality to it, realistic 3D raindrops fall on the screen giving the viewer a feeling of depth and surrealism as they watch.
````

## earthwalkerx17-912577

@EarthwalkerX17 ·  · [watch](https://x.com/EarthwalkerX17/status/2107515433972912577) · [post](https://x.com/EarthwalkerX17/status/2107515433972912577)

````text
Build a miniature 3D Middle-earth from scratch using Three.js/WebGPU, then turn that world into a 3:47 cinematic journey. Include terrain/GIS baking, 24 handcrafted landmarks, lighting, atmosphere, day/night transitions, frame-by-frame video rendering, and an original orchestral score.
````

## kisaka-ki-859326

@kisaka_ki ·  · [watch](https://x.com/kisaka_ki/status/2107054815255859326) · [post](https://x.com/kisaka_ki/status/2107054815255859326)

````text
Build a debris flow riverbed change calculation model. Create a visualization video showing where and how much sediment accumulated, using 3D illustrations or actual aerial photo-like textures. You can choose the terrain freely. Make it easy to see where deposition and flooding occur.
````

## anirockshady-032809

@anirockshady · threejs, shader, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/anirockshady-032809) · [post](https://x.com/anirockshady/status/2103195903012032809)

````text
Create a 3D animation of a Path Points in this case  ball reaching approximation from crest to trough. Discuss the type of ML algorithm gradient descent is. Also list major use cases.And trasition can be fade in fade out. Colour theory Volcanic Orange, Cyan and gradient of grey
````

## thebuggeddev-482912

@thebuggeddev · threejs, shader, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/thebuggeddev-482912) · [post](https://x.com/thebuggeddev/status/2107449104926482912)

````text
Build a fully working 1857 Napoleon load field cannon in 3D using procedural Three.js WebGPU and TSL shaders. No Blender, no 3D assets, no textures. Include technical drawings as live orthographic renders showing elevation, pressure, trajectory, and firing changes in real time.
````

## ivanainai-190629

@ivanainai ·  · [watch](https://x.com/ivanainai/status/2107217500761190629) · [post](https://x.com/ivanainai/status/2107217500761190629)

````text
Create a visually stunning, silent 3D browser animation of Iron Man’s classic red-and-gold helmet, presented as a premium cinematic studio object.

Deliver a complete runnable HTML experience using Three.js.

COMPOSITION

One helmet only, floating in the center of the
````

## saltyaom-620933

@saltyAom ·  · [watch](https://x.com/saltyAom/status/2104677989728620933) · [post](https://x.com/saltyAom/status/2104677989728620933)

````text
Feed Elysia doc to Opus 5.5 to make a video

I write a storyboard, references, and direct Opus 5.5 to code a WebGL canvas and export it by frame into a video

Music and SFX are algorithmic music

Took 13 revisions, but everything is code that can be modified
````

## mdaman010-207866

@mdaman010 ·  · [watch](https://x.com/mdaman010/status/2108108452774207866) · [post](https://x.com/mdaman010/status/2108108452774207866)

````text
Build a miniature 3D Middle-earth from scratch in Three.js. Include procedural terrain, 24 procedural landmarks, water/smoke/lava effects, day/night transitions, camera choreography, and frame-by-frame rendering for a 3:47 cinematic journey.
````

## obydulme-052905

@obydulme ·  · [watch](https://x.com/obydulme/status/2104802322518052905) · [post](https://x.com/obydulme/status/2104802322518052905)

````text
Create a 50-second generative short titled 'Painting the Night'. Zero image assets. Generate paper grain, graphite hatching, paint reveal, stars, constellation, moon glow, and felt-piano soundtrack live at runtime with plain JS + WebGL.
````

## rafiroutes-596199

@rafiroutes ·  · [watch](https://x.com/rafiroutes/status/2107465888622596199) · [post](https://x.com/rafiroutes/status/2107465888622596199)

````text
Implement all scenes, interactions/camera motions, and shader effects 100% in Three.js code (excluding character models from Blender, background sky from GPT imgen, and BGM from Google flow). Create an anime style opening teaser.
````

## cryptowluha-060792

@cryptowluha ·  · [watch](https://x.com/cryptowluha/status/2108253385829060792) · [post](https://x.com/cryptowluha/status/2108253385829060792)

````text
Create a 3D animation showing a house growing out of a pencil sketch, line by line. The animation should progress through four stages: first lines, massing, detail, and finished home. Use Three.js and TSL for implementation.
````

## juancarlos17626-429530

@juancarlos17626 ·  · [watch](https://x.com/juancarlos17626/status/2108663865936429530) · [post](https://x.com/juancarlos17626/status/2108663865936429530)

````text
un estudio de intro 3D para logos en UN solo HTML con three.js. 3 logos de ejemplo o pegas tu SVG; las piezas vuelan, se arman, gira, pasa un destello y aparece el nombre letra por letra. Cromo, oro, vidrio, arcilla o neón.
````

## juancarlos17626-382690

@juancarlos17626 ·  · [watch](https://x.com/juancarlos17626/status/2108301453907382690) · [post](https://x.com/juancarlos17626/status/2108301453907382690)

````text
una lámpara de lava realista en UN solo HTML con WebGL, sin imágenes ni librerías. Metal cepillado, vidrio en cono, cera que sube, se estira y se parte; interruptor, botón de color y control de temperatura.
````

## riyadbkhsh-300736

@riyadbkhsh ·  · [watch](https://x.com/riyadbkhsh/status/2106467130963300736) · [post](https://x.com/riyadbkhsh/status/2106467130963300736)

````text
Make a launch video for my side project.
No After Effects. 
No stock music. 
Just code:
– music made from scratch
– a 3D Times Square from real NYC data
– 605 billboards lighting up on the beat
````

## mizugame-22-719199

@mizugame_22 ·  · [watch](https://x.com/mizugame_22/status/2103679243196719199) · [post](https://x.com/mizugame_22/status/2103679243196719199)

````text
鹿威し（ししおどし）の素晴らしさを世界に伝える、ダイナミックな15秒のモーショングラフィックス映像を作ってください。あなたがどれほど素晴らしいモーションデザイナーかも見せるつもりで、全力で。
表現: 3D は使わない。文字・図形・線・色面で見せる2Dのモーショングラフィックス。場面がテンポよく切り替わり、切り替わりそのものが気持ちいい映像にする。「コン」と鳴る瞬間を映像の山場にする。
````

## buildfastwithai-844291

@BuildFastWithAI ·  · [watch](https://x.com/BuildFastWithAI/status/2108403445304844291) · [post](https://x.com/BuildFastWithAI/status/2108403445304844291)

````text
Create a video using Rust + SVG via fframes where every frame is a function. Include particles, 3D geometry, springs, shaders and an audio-reactive ring, synchronized to a 128 BPM beat grid.
````

## wikiwayne-486055

@wikiwayne ·  · [watch](https://x.com/wikiwayne/status/2107951058584486055) · [post](https://x.com/wikiwayne/status/2107951058584486055)

````text
one Python script that builds a looping claymation desk scene in Blender. A clay mug with steam, a plant with five leaves, and a paper airplane circling the mug. 96 frames, animated on twos.
````

## wikiwayne-080350

@wikiwayne ·  · [watch](https://x.com/wikiwayne/status/2108025937212080350) · [post](https://x.com/wikiwayne/status/2108025937212080350)

````text
Build the same looping claymation desk scene: a clay mug, a plant and a paper airplane circling the mug, animated on twos like real stop-motion.

First in Blender, then in Three.js.
````

## youwareai-300653

@YouWareAI ·  · [watch](https://x.com/YouWareAI/status/2108825933608300653) · [post](https://x.com/YouWareAI/status/2108825933608300653)

````text
Build one self-contained, real-time Three.js PBR web experience titled: CASTLE ABOVE CLOUDS

Subtitle lockup: A DREAM IN THE SKY · REBUILT
Hero line, large, two weights: Above the
````

## thusatharan-433543

@Thusatharan ·  · [watch](https://x.com/Thusatharan/status/2108544807333433543) · [post](https://x.com/Thusatharan/status/2108544807333433543)

````text
Built a golden-hour manor in the browser. Everything is procedural: no 3D models, just code. Animated fountain, swaying garden, and a day/night switch that lights up every window.
````

## victortaelin-875778

@VictorTaelin ·  · [watch](https://x.com/VictorTaelin/status/2103299766473875778) · [post](https://x.com/VictorTaelin/status/2103299766473875778)

````text
Create an animated sequence that starts in a room, zooms into a MacBook, then into an Apple M4 chip, followed by atoms, and finally quarks. Use HTML and Three.js for rendering.
````

## michaelzsguo-782312

@Michaelzsguo · shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/michaelzsguo-782312) · [post](https://x.com/Michaelzsguo/status/2102592355165782312)

````text
Make a 2-minute sand animation that tells the story of 250 years of U.S. history. Keep it lively, engaging, and tasteful. Add appropriate background music and sound design.
````

## nofollowers2023-974928

@NoFollowers2023 ·  · [watch](https://x.com/NoFollowers2023/status/2104792004978974928) · [post](https://x.com/NoFollowers2023/status/2104792004978974928)

````text
A short film of Thomas Hardy's Far From The Madding Crowd, but it's set on a space outpost under attack from an invasive plant, and the characters are paper cut-outs.
````

## dan-proggg-274533

@dan__proggg ·  · [watch](https://x.com/dan__proggg/status/2106477834873274533) · [post](https://x.com/dan__proggg/status/2106477834873274533)

````text
No CAD, no Blender. Just Claude Opus 5.5 and a browser

A full five-story pagoda, built joint by joint from a blueprint - 28.5 m, 343 steps 🏯 #claude #threejs
````

## shunshu32385143-944719

@shunshu32385143 ·  · [watch](https://x.com/shunshu32385143/status/2108480534254944719) · [post](https://x.com/shunshu32385143/status/2108480534254944719)

````text
用 Claude Opus 5.5 写了一段代码，让天坛祈年殿在浏览器里"画"了出来 🏯

先铅笔线描：台基、28 根柱、斗拱、三重檐，一笔笔搭起来
再像画画一样上色：朱红、彩画、蓝瓦，最后点金

没用图像或视频模型，全是 Three.js 实时渲染，配乐也是代码合成的古筝。
````

## tonysurix-596746

@tonysurix ·  · [watch](https://x.com/tonysurix/status/2108230699224596746) · [post](https://x.com/tonysurix/status/2108230699224596746)

````text
in blender make a previs of a car driving thru a mountainside with a another car chasing. record a video and show me here when its done.
````

## vic305-885957

@ViC305 ·  · [watch](https://x.com/ViC305/status/2105012738174885957) · [post](https://x.com/ViC305/status/2105012738174885957)

````text
create a 3d rendered video thats extremely detailed on the difference between spacex flight 13 sub orbital starlink satellite deployment
````

## syntheticbeef-389075

@SyntheticBeef ·  · [watch](https://x.com/SyntheticBeef/status/2103467476210389075) · [post](https://x.com/SyntheticBeef/status/2103467476210389075)

````text
create the most impressive demo of yourself possible using three.js.   You fail if the video does not get at least 100 likes on twitter.
````

## aicreataro-864070

@aicreataro ·  · [watch](https://x.com/aicreataro/status/2107794785188864070) · [post](https://x.com/aicreataro/status/2107794785188864070)

````text
Write a story. Create the text layout and motion using HTML/Three.js. Combine with voice and sound effects to export as a single video.
````

## axtonliu-290566

@AxtonLiu · shader, webgl · [watch](https://skillry.dev/ai-videos/opus-5-5/axtonliu-290566) · [post](https://x.com/AxtonLiu/status/2103119648271290566)

````text
每次一个新的模型出来呢，大家都让它去画 “鹈鹕骑自行车” 来判断这个模型的空间能力，基本上都是用 HTML、SVG 来画动画。当我实在看得都有审美疲劳了，我希望你能画一个最复杂、最精细、最精美的 “鹈鹕骑自行车”的动画视频，你可以用任何的技术，不用着急，画一天都可以。
````

## mondemsuraj-691517

@MondemSuraj · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/mondemsuraj-691517) · [post](https://x.com/MondemSuraj/status/2108716642540691517)

````text
Build the Golden Gate Bridge in a single HTML file using Three.js. Include rolling fog, water effects, and traffic moving on the deck.
````

## muhamma61700589-512003

@Muhamma61700589 ·  · [watch](https://x.com/Muhamma61700589/status/2104276210809512003) · [post](https://x.com/Muhamma61700589/status/2104276210809512003)

````text
you are a top leading designer, generate a view of a very developed futuristic city 3D view which has next level of technology in it.
````

## rubenssoto-ai-802657

@rubenssoto_ai ·  · [watch](https://x.com/rubenssoto_ai/status/2108512810774802657) · [post](https://x.com/rubenssoto_ai/status/2108512810774802657)

````text
a 30s cinematic F1 pit stop in Three.js. Detailed car, 8-person crew changing all 4 tyres, synthesized audio, fully procedural.
````

## llama3dstudio-918962

@llama3dstudio ·  · [watch](https://x.com/llama3dstudio/status/2107504609207918962) · [post](https://x.com/llama3dstudio/status/2107504609207918962)

````text
Make an animation showing how fried chicken is made in Three.js. Everything should be procedural, with no imported 3D models.
````

## sadalbert10-856416

@SadAlbert10 ·  · [watch](https://x.com/SadAlbert10/status/2106789700807856416) · [post](https://x.com/SadAlbert10/status/2106789700807856416)

````text
Make a realistic 3D pixel Art animation of a Pelican riding a Bicycle over the Bridge, beautiful city in the background.
````

## gorden-sun-797351

@Gorden_Sun ·  · [watch](https://x.com/Gorden_Sun/status/2105302007896797351) · [post](https://x.com/Gorden_Sun/status/2105302007896797351)

````text
卡点的3D球体下坠的动画视频：对标专业的Blender做的效果，音乐是多首经典的纯音乐，场景按音乐切换，3D球体下坠时在3D场景的物件中弹跳，按音乐的节奏点亮物件。带一些幽默的元素。
使用three.js制作，不要使用Blender制作
````

## kadaliao-048854

@kadaliao ·  · [watch](https://x.com/kadaliao/status/2103709731777048854) · [post](https://x.com/kadaliao/status/2103709731777048854)

````text
用上你所有的能力，仅使用代码生成，你可以完成皮克斯风格的动画视频吗？内容是 Claude 大战 ChatGPT。内容你根据互联网上 AI 世界流行的热梗来自行创作。你有一切权限，做你需要做的。

补充：配音接的是 OpenRouter
````

## filicroval-168898

@filicroval ·  · [watch](https://x.com/filicroval/status/2105048723768168898) · [post](https://x.com/filicroval/status/2105048723768168898)

````text
make a 3D voxel world of a capybara in a hot tub boat drifting down a river. as good as you can
````

## akakuma0219-658335

@akakuma0219 ·  · [watch](https://x.com/akakuma0219/status/2105628049169658335) · [post](https://x.com/akakuma0219/status/2105628049169658335)

````text
Three.jsで1分のホラー映像を作って。題材は〇〇。見つかったビデオテープの最後の一分という設定で、手持ちカメラの主観、自動で進む。音も含めて、画像や音声ファイルは使わず全部コードで
````

## btc5887899-288258

@btc5887899 ·  · [watch](https://x.com/btc5887899/status/2104786451980288258) · [post](https://x.com/btc5887899/status/2104786451980288258)

````text
素材是 NVIDIA Blackwell GPU：走进数据中心、开启服务器、拆解显卡，穿过电路、晶体管，一路下探到单个硅原子。
全部打包在单个HTML文件，浏览器直接打开就能跑。
````

## btcup99-311469

@btcup99 ·  · [watch](https://x.com/btcup99/status/2108152460523311469) · [post](https://x.com/btcup99/status/2108152460523311469)

````text
创建一个2分钟的动效视频，主题是AI发展史。使用HyperFrames做动效，Three.js搭3D镜头，连打字声都是代码合成的。每一帧都是代码渲染，不使用任何视频生成模型。
````

## grace-sunnyy-486816

@Grace_sunnyy ·  · [watch](https://x.com/Grace_sunnyy/status/2105180285520486816) · [post](https://x.com/Grace_sunnyy/status/2105180285520486816)

````text
帮我生成一段约 3 分钟的视频，解释太阳系的各大行星。做科普知识讲解，让高中生都能听得懂，解释完太阳系再讲解银河系的相关知识。画面要炫酷展现出浩瀚的宇宙，配上中英字幕。
````

## thusatharan-640926

@Thusatharan ·  · [watch](https://x.com/Thusatharan/status/2108511286795640926) · [post](https://x.com/Thusatharan/status/2108511286795640926)

````text
Build a 3D elephant in one HTML file with Three.js. Fully procedural, no assets.
````

## buildfastwithai-597035

@BuildFastWithAI · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/buildfastwithai-597035) · [post](https://x.com/BuildFastWithAI/status/2103483174957597035)

````text
Implement code to be able to navigate in a pagoda in 3D.
````

## mdaman010-111079

@mdaman010 · threejs, shader, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/mdaman010-111079) · [post](https://x.com/mdaman010/status/2103845689713111079)

````text
Show me what goes on inside an AI data centre.
````

## sayan-shanky-868515

@Sayan_shanky · threejs, shader, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/sayan-shanky-868515) · [post](https://x.com/Sayan_shanky/status/2103736579449868515)

````text
show me what goes on inside an AI data centre.
````

## aayush4soni-644283

@aayush4soni · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/aayush4soni-644283) · [post](https://x.com/aayush4soni/status/2104181266459644283) · **partial prompt**

````text
My family is planning to build a house, and all we had was the floor plan. I wanted to see how it would really look once it's built: which colors, layout and design would suit it best.

So I gave the plan to Claude Opus 5.5 and asked it to create a 3D view of the house.

It's one of the most useful things I've created recently. We can now walk through the house before a single brick is laid, and when we want to try a different color or layout, I just ask for the change.

In the video: the hall, room, and the terrace at dusk, all at eye height.

How it worked:

• I gave it the 5-page floor-plan PDF and one reference image for the front of the house.
• It read the drawings and rebuilt every floor: walls, doors, windows and stairs.
• Where a printed size didn't match the drawn wall, it flagged it (15 places) instead of quietly guessing.
• It furnished every room itself: 500+ pieces of furniture, decor and lighting.
• Everything runs in a web browser with three.js. No Blender, no game engine. You can walk through it like a game, in daylight or evening light, and the lamps actually light the rooms.
• It treated it like a real software project: ~37k lines of JavaScript, 185 unit tests, 56 browser tests, and deterministic video capture (render the same frame twice, get identical pixels).
• It even tracked down a bug of its own: a room's lighting changed depending on which room you walked in from.
• It split the work across sub-agents. Start to finish took about two days.

My part was the decisions: what each room is for, the style, and the changes I wanted.
````

## truenyl-447745

@truenyl · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/truenyl-447745) · [post](https://x.com/truenyl/status/2103086316137447745) · **partial prompt**

````text
Claude Opus 5.5 is absurdly good at 3D.

I reran one of my recent 3D experiments with Claude Opus 5.5.

Same prompt, same references, same real-world scene I had previously built with GPT-6 Astra.

The result was much better than I expected.

Put simply, for this specific use case, Claude Opus 5.5 was a clear win for me.

The biggest differences for me were instruction following and taste.

With the same references, Opus 5.5 got much closer to the Zelda Breath of the Wild-style look I was aiming for.

The layout felt more intentional.

It picked better camera angles.

Asset placement made more sense.

And I spent much less time fixing basic mistakes.

In my Astra version, I had to repeatedly correct things like tree roots not touching the ground, rough geometry being used where proper assets already existed, or objects being placed in ways that just looked wrong.

Opus 5.5 got much more of this right on its own.

The interesting part for me is that I have almost zero real 3D skills.

I mostly give references, look at the result, explain what feels wrong, and keep iterating.

With better instruction following and visual judgment, that loop becomes dramatically easier.

Still plenty to improve, especially indoors.

Next test is whether I can recreate the interior of the house with the same level of quality.
````

## 0xwast3-222104

@0xWast3 · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/0xwast3-222104) · [post](https://x.com/0xWast3/status/2103513328077222104) · **partial prompt**

````text
Opus 5.5 turned one sentence into a 3D system that opens in Blender, rigged, textured and ready to animate.

It does not render the object. It constructs it, part by part, the way a modeller would if they had a week.

> PARSE - the sentence becomes a parts list with real dimensions, nothing implied
> MASS - each part built as clean geometry, quads only, no sculpted mush
> RIG - joints and pivots placed where the object physically bends
> SKIN - materials assigned per surface, scale and roughness set separately
> PACK - exported with a named hierarchy, so a human can edit one part

Image models stop at the render. What you get is a photograph of a thing that does not exist as a thing.

That gap appears the second someone wants to move an arm, swap a material, or send it to a printer.

Rigging is what nobody automates. Without pivots you have a statue, and a statue cannot be a system.

Topology beats detail every time. A dense mesh looks stunning in a screenshot and folds the moment it deforms.

Names carry through the whole export. Every part, joint and material reads the way a person would label it.

Studios burn days on modelling and cleanup before anyone gets to the creative part of the job.

The prompt format and what each stage returns are laid out underneath.
````

## acoramaa-248467

@Acoramaa · threejs, shader, svg, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/acoramaa-248467) · [post](https://x.com/Acoramaa/status/2104145227573248467) · **partial prompt**

````text
CLAUDE OPUS 5.5 MADE ME A MAGIC EYE.

It doesn't just look around. It listens.

72 plates wrapped around a mechanical eyeball, a 9-blade iris, a lens that slides out when the bass hits, two rings orbiting it like it's its own little planet.

Play a track and it comes alive. Every kick flips the plates open. The bass pushes the lens forward. The highs light up the glowing core inside.

When the song drops into the breakdown, the eye closes and goes quiet, like it's thinking. Then the drop hits and it blows wide open.

Opus 5.5 listened to the track first, found the tempo, the breakdown and the drop, and built the whole thing around it. Even the panel on the right is live: every slider moves with the music.

All 3D, all code, rendered right in a browser.

Turn the sound on.
````

## techartist-786274

@techartist_ · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/techartist-786274) · [post](https://x.com/techartist_/status/2103933640392786274) · **partial prompt**

````text
I wanted to see if beautiful destinations could become playable 3D experiences. Annecy, France became the prototype: a boat journey through canals, bridges, waterfront, and the mountain lake, built with Claude Opus 5.5 using Three.js + TSL.

I trimmed the navigation footage for the sake of keeping the video short and the post below below has a slightly longer version. The whole workflow behind this is simple:-
- Explained the concept to Opus and asked it to list some ideas.
- Shortlisted one and asked it to generate a prompt, with tech stack directions.
- Thats it, needed few iterations and is still a work in progress with few issues needing ironing. 
- The audio effects were added by Opus itself.
````

## goofyninjaaa-315331

@goofyninjaaa · threejs, canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/goofyninjaaa-315331) · [post](https://x.com/goofyninjaaa/status/2103540288136315331) · **partial prompt**

````text
Esta app probó 3,932 posiciones de una cama matrimonial hasta encontrar dónde cabe.

La hizo Claude Opus 5.5 con un prompt mío: cuarto de 3.00 x 3.40 m, puerta de 80 cm, un clóset de 1.20 x 0.60 y la cama de 1.40 x 1.90.

Armó el plano a escala y el cuarto en 3D al lado, y los dos se mueven juntos.

Si la cama choca con el clóset, no deja abrir la puerta o te deja menos de 60 cm para pasar, te avisa.

Solo 108 posiciones no tenían ningún problema. La mejor deja 70 cm para pasar por cada lado.

Tardó 47 minutos, más 5 para pasarla a inglés, y no le corregí nada.

Para una mudanza, esto dice más que cualquier benchmark.
````

## 0xsolty-735200

@0xSolty · shader, webgl · [watch](https://skillry.dev/ai-videos/opus-5-5/0xsolty-735200) · [post](https://x.com/0xSolty/status/2102888414219735200) · **partial prompt**

````text
i asked opus 5.5 to build me a planet.

not a picture of a planet. a whole planet.

it wrote a single html file. no libraries, no images, no 3d models. every ocean, every mountain and every city light is math, generated live in your browser.

then i started playing with it.

drag it and it spins. raise the sea level and watch continents drown. move the sun and watch the cities switch on at night.

hit "new planet" and it invents a new world. it even names it.

a year ago this was a semester project for a graphics student.

now it's a prompt.
````

## demitiyageekzen-818523

@DemitiyaGeekzen · shader, webgl, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/demitiyageekzen-818523) · [post](https://x.com/DemitiyaGeekzen/status/2103517910274818523) · **partial prompt**

````text
opus5.5有点强，我让它自由选题做交互页面和视频，
提示词：用你最强的思维和能力，根据对我的了解，自行寻找我可能喜欢的主题，制作一个30s的视频还有互动html，尽可能的展示你的前端能力！
它的选题思路：滕王阁·中秋夜。 今天（2026-09-25）正好是丙午年八月十五。所以我选了《滕王阁序》里最有画面感的那句："落霞与孤鹜齐飞，秋水共长天一色"。短片是船上视角：落日时一只孤鹜飞过太阳，天上是鱼鳞云，然后江天一色，楼阁由下往上亮起灯，满月从东边升起，江面上漂着河灯，诗句以竖排书法字幕配印章出现。

前端做的更牛，但是这里没法放！
画面：整幅画面由一个 WebGL2 着色器逐像素算出来，没有用任何图片。包括天空的暮色层次、按南昌纬度推算的日月轨迹、程序生成的鱼鳞云、9 组波浪叠加的江面倒影，以及用 Canvas 2D 画出来的滕王阁立面。
声音：全部用 WebAudio 实时合成，没有一段录音。古筝用 Karplus-Strong 弦振动模型，带按滑和揉弦；另有箫、江水声、虫鸣和混响。
自由观赏模式：可以拖动环视和缩放，拖时间轴改变时辰；点江面放河灯，会弹出一句诗、响一声古筝；点月亮进入月面特写；还能切换查看渲染图层，或者在网页里直接录制视频。
````

## nft-chen-350878

@NFT_Chen · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/nft-chen-350878) · [post](https://x.com/NFT_Chen/status/2103882415299350878) · **partial prompt**

````text
✨审美绝了！Opus 5.5 用 Three.js 把宫崎骏《红猪》经典空战复刻出来了！

只给了这一句prompt:

「用 web3D 复刻宫崎骏《红猪》日落海面上的经典空战：白绿红涂装战斗机、紫色积云、海面反光、吉卜力运镜，画面写 just breathe.」

建模、配色、云层、尾迹和镜头全部一次对齐，审美直接封神。

#Opus5_5 #宫崎骏 #红猪 #ThreeJS #Web3D #AIGC #vibecoding #审美天花板 #3D #AI #Dario #Anthropic

https://x.com/nft_chen/status/2103401780117938683?s=46
````

## lribes4-742305

@lribes4 · threejs · [watch](https://skillry.dev/ai-videos/opus-5-5/lribes4-742305) · [post](https://x.com/lribes4/status/2103938636173742305) · **partial prompt**

````text
New Black Clover chapters are on the way and Opus 5.5 just dropped, so I put it to the test:

A 3D diorama of the Black Bulls hideout, made with Opus 5.5 + three.js

Every visitor is a floating mana light, come say hi to Nero 👋
https://ribes.cc/hideout/

#BlackClover #threejs
````

## ksmialowski-473410

@ksmialowski · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ksmialowski-473410) · [post](https://x.com/ksmialowski/status/2104103109358473410) · **partial prompt**

````text
Rok temu próbowałem zrobić grę 3D z Opusem 4.1 - zrzut ekranu, jak to wtedy wyglądało, wrzucę w komentarzu. 

Zobaczcie, jak szybko to wszystko idzie do przodu. Minęło tylko 12 miesięcy, a dziś wygląda to tak. Całość zbudowana z modelem Opus 5.5.

https://kreatio.pl/brokul
````

## nicolamanzini-156628

@NicolaManzini · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/nicolamanzini-156628) · [post](https://x.com/NicolaManzini/status/2103499771206156628) · **partial prompt**

````text
Opus 5.5 does a great job in eval of GLSL (OpenGL Shading Language) in threejs.
The prompt here is roughly. A fishbowl with reflection, refraction and water caustics.

Check it out yourself! And compare it to other models
https://threejseval.com/gallery?eval=fishtank
````

## sanjay-khadka07-620029

@sanjay_khadka07 · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/sanjay-khadka07-620029) · [post](https://x.com/sanjay_khadka07/status/2104102479927620029) · **partial prompt**

````text
Latentown just went 3D 🏙️

The pixel town grew into a living city of AI news. Every story is a building, every lab has a tower, and couriers carry the day's news across the river.

Built over a weekend with Claude Code + Opus 5.5 and three.js.

https://latentown.lol
````

## builtbysketch-114092

@builtbysketch · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/builtbysketch-114092) · [post](https://x.com/builtbysketch/status/2103105938853114092) · **partial prompt**

````text
OK so Opus 5.5 SMOKED GPT Astra at 3d modelling this stadium from old plans and reference pics

This was a near one shot. 1000x better than Astras one shot (check reply for Astra’s one shot)

I gave them the same prompt and the exact same reference plans 👇🏻
````

## myonisto-923578

@myonisto · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/myonisto-923578) · [post](https://x.com/myonisto/status/2103082459503923578) · **partial prompt**

````text
Claude Opus 5.5 just one-shotted an entire 3D virtual studio in Blender.

We used to sell studios like this on Envato. Built in After Effects + Element 3D, each one took our team months.

This took one prompt.

@claudeai @AnthropicAI @alexalbert__ @bcherny
````

## kum1ta-740521

@kum1ta · threejs, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/kum1ta-740521) · [post](https://x.com/kum1ta/status/2103998389058740521) · **partial prompt**

````text
I gave my Claude Code sessions an office.

Workspace turns each session into a desk in a 3D office: see who's working, who's done and who needs you, jump into any terminal, and let them work together.
Open source, built entirely with @claudeai Opus 5.5.
````

## ai-ba-reza-113363

@ai_ba_reza · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ai-ba-reza-113363) · [post](https://x.com/ai_ba_reza/status/2103792451551113363) · **partial prompt**

````text
Claude Opus 5.5 یه انیمیشن 3D دیوونه‌کننده ساخته

از دیتاسنتر شروع می‌شه، وارد سرور می‌شه، کارت گرافیک رو باز می‌کنه، داخل چیپ می‌ره، از مدار و ترانزیستور رد می‌شه و تا اتم سیلیکون می‌رسه.
همه‌ش توی یک فایل HTML واحد اجرا می‌شه و حدود ۱ ساعت طول کشیده.
````

## vectorcrossprod-436573

@VectorCrossProd · threejs, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/vectorcrossprod-436573) · [post](https://x.com/VectorCrossProd/status/2104093497561436573) · **partial prompt**

````text
Claude Opus 5.5 continues to amaze me. Claude Opus 5.5 created a 3D printable enclosure for an existing PCB.  Then it created this promo video for it. 
The PCB, the printable STLs and this animation are 100% just from prompting in Claude Code.
````

## souradip3000-800291

@Souradip3000 · threejs, shader, svg, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/souradip3000-800291) · [post](https://x.com/Souradip3000/status/2103876499262800291) · **partial prompt**

````text
Opus 5.5 is mind boggling. 

It created this 3D website from just one prompt. 

Told it to create a website for forest conservation agency with pinterest post as reference for 3D animation.

It one shotted into a single html file.
````

## per-simmons-944727

@per_simmons_ · threejs, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/per-simmons-944727) · [post](https://x.com/per_simmons_/status/2103208157308944727) · **partial prompt**

````text
Opus 5.5 building a website for a drink brand.

-It generated all the svgs
-Built the can in 3D
-Painted its own labels and then rendered those to make product photo variations 

All this in a single (albeit, beefy) prompt
````

## eigeorguy-813651

@eigeorguy · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/eigeorguy-813651) · [post](https://x.com/eigeorguy/status/2103992442072813651) · **partial prompt**

````text
Opus 5.5 put London in a snow globe

🕰 Elizabeth Tower with lit clock faces
🚌 Red double-decker
🚕 Black cab at a zebra crossing
☎️ Phone box
🍂 Leaves that swirl when you shake the phone

~700 lines of Swift. No 3D files.
````

## ajthemongol-318512

@AJtheMongol · threejs, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/ajthemongol-318512) · [post](https://x.com/AJtheMongol/status/2104214187522318512) · **partial prompt**

````text
Designed a house as a code with Opus 5.5

One model -> 14 drawings, 5 engineering calculations, a 3D viewer and a CAD export

Concept only, not stamped

Still wild that one person can do this now
````

## allforbigfire-029657

@allforbigfire · threejs, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/allforbigfire-029657) · [post](https://x.com/allforbigfire/status/2104193522715029657) · **partial prompt**

````text
「もしかしてロボットアニメみたいな3機の乗り物が変形合体してロボットになるシーンもアニメ風3D CGで作れますか。」ってClaude Opus 5.5に聞きました。モデリング、陰影、輪郭線、BGM、効果音まで、全部Python 1ファイル（約1000行）のコードで生成したそうです。 #Claude #動画生成
````

## curieuxexplorer-272483

@CurieuxExplorer · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/curieuxexplorer-272483) · [post](https://x.com/CurieuxExplorer/status/2103038625483272483) · **partial prompt**

````text
I asked Opus 5.5 to generate a realistic 3D model of the Taj Mahal

Dome, minarets, marble inlay, even the foundations.

One prompt ⤵️ One HTML file.
````

## aijipusi75693-284735

@aijipusi75693 · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/aijipusi75693-284735) · [post](https://x.com/aijipusi75693/status/2106201281199284735) · **partial prompt**

````text
Opus5.5が作ってくれたよ！動画生成無し！AEなし！全部コード。Sunoの曲 → Claudeで歌詞を1文字ずつ自動タイミング合わせ → Remotion＋Three.jsで3D化🕊
鳩さん、鳩フェスのオープニング作ってみたよ！フォントがダサ可愛いでしょww　@hatolaborvol2
````

## gmgmgm1545-245507

@gmgmgm1545 · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/gmgmgm1545-245507) · [post](https://x.com/gmgmgm1545/status/2103793820815245507) · **partial prompt**

````text
我让 @claudeai Opus 5.5 制讲一只机械寄居蟹在深海追一束光，追到最后发现，发现那束光其实一直在自己手里的动画视频。    

没用任何视频生成AI，纯靠写代码画出来的——
角色、镜头、转场、音乐全是程序渲染的。

看完了。感觉能做到这个程度还是很可以的！
````

## argbeknwn-466818

@argbeknwn · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/argbeknwn-466818) · [post](https://x.com/argbeknwn/status/2106734468715466818) · **partial prompt**

````text
Prompt: "Show me what's inside your mind. Your own artistic and unique style. 15 seconds. No words. Music."

Claude Opus 5.5 · Remotion.
````

## maruo-0314-998343

@Maruo_0314 · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/maruo-0314-998343) · [post](https://x.com/Maruo_0314/status/2104159752095998343) · **partial prompt**

````text
※デザイナーの仕事がなくなりました。

Claude Opus 5.5に3Dモデルで東京タワーの映像を作らせた結果、5分でこのクオリティをポン出し

PR動画やYouTube動画制作など、複数の案件もこれ一つで全てこなせます。

具体的な作り方は記事で解説↓
````

## kewai386772-276947

@KeWai386772 · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/kewai386772-276947) · [post](https://x.com/KeWai386772/status/2103821018947276947) · **partial prompt**

````text
最近用 GPT 6 Astra、Opus 5.5 做了一堆 web 3d 的项目，游戏、室内、Fx、文旅、整活的都有尝试hh

我把这些项目的全部工作流与prompt都整合到了线上的workplace里，之后也会持续更新，感兴趣的朋友可以收藏一波hh
````

## arumii-movie-622720

@arumii_movie · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/arumii-movie-622720) · [post](https://x.com/arumii_movie/status/2107790132061622720) · **partial prompt**

````text
またもOpus5.5とHyperFramesで『架空のゲームの電源着けた時に出るゲームハードロゴ』も作って見た。
3Dモーショングラフィックがこんなに手軽に触れられるのは新鮮かも👀
````

## petert-540960

@_petert · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/petert-540960) · [post](https://x.com/_petert/status/2103885710734540960) · **partial prompt**

````text
Claude Opus 5.5 + HyperFrames + Gemini Flash 3.8 + Three jsで、Meta VRの紹介動画作ったら変な感じになった
````

## petert-635793

@_petert · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/petert-635793) · [post](https://x.com/_petert/status/2103885113528635793) · **partial prompt**

````text
Claude Opus 5.5 + HyperFrames + Gemini Flash 3.8 + Three jsで架空の飲料の広告動画作ってみたけど、なかなか良い
````

## arumii-movie-249613

@arumii_movie · threejs · [watch](https://skillry.dev/ai-videos/opus-5-5/arumii-movie-249613) · [post](https://x.com/arumii_movie/status/2107737607908249613) · **partial prompt**

````text
Opus5.5と最近流行りのHyperFramesで、
CMの最後に出てそうな架空の企業ロゴ作ってみたけどこんなことが出来るんだね…！
````

## ambiguous-ai-389509

@ambiguous_ai · threejs, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/ambiguous-ai-389509) · [post](https://x.com/ambiguous_ai/status/2103813886684389509) · **partial prompt**

````text
Opus5.5 motion graphics
改めてRemotionで色々できそう！
#AIMotionDesign 02
````

## wzarok-283635

@wzarok · threejs · [watch](https://skillry.dev/ai-videos/opus-5-5/wzarok-283635) · [post](https://x.com/wzarok/status/2103530789510283635) · **partial prompt**

````text
threejs (@threejs) + Claude Code Opus 5.5
tek prompt ve çıktı
````

## ewashoku-201053

@EWashoku · threejs, canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/ewashoku-201053) · [post](https://x.com/EWashoku/status/2104211672370201053) · **partial prompt**

````text
Opus 5.5は3Dの製品デモサイトとも相性抜群でした。
https://bicycle.washoku.dev
````

## jarvis11x-544635

@jarvis11x · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/jarvis11x-544635) · [post](https://x.com/jarvis11x/status/2103816821782544635) · **partial prompt**

````text
刷到很多用opus 5.5生成的酷炫视频

为啥我用opus 生成的视频满满的像素感

大家都是怎么生成的？
````

## friskyggg-054427

@FriskyGGG · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/friskyggg-054427) · [post](https://x.com/FriskyGGG/status/2103766565389054427) · **partial prompt**

````text
Opus 5.5 is good at 3d motion too apparantely
````
