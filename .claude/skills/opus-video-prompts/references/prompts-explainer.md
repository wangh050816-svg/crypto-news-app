# Explainers: full prompts (116)

Structured and complete prompts first. Each entry: author, tech, links, then the prompt exactly as posted.

## verbove-268381

@verbove · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/verbove-268381) · [post](https://x.com/verbove/status/2103483957266268381)

````text
<inputs> 
Ask me for: 
• my product + URL 
• 8–12 UI states that tell its story 
• the real data shown in each state 
• brand colors + fonts + accent color 
• required formats (1:1, 16:9, 9:16) 
</inputs>

<rules> 
One HTML file. One canvas
One draw(t) function

No CSS transitions
No timers
No state carried between frames

One shape, never cut

Every state is the same element changing size, radius and color while the content swaps

A cursor drives the sequence with real clicks, typing and one drag

Real UI. Real data. No placeholders.

</rules>
<structure> 
120 BPM grid

Something happens on every bea

logo → button → handle field → “is this you?” → loader → pin → globe filling with users → matches → tabs → RSVP → search → logo

</structure>

<motion> 
Closed-form springs everywhere with only a tiny overshoot.

If a value changes target multiple times, sum one spring per change

Content enters after its container starts morphing and leaves before the next morph so text never overlaps

Use a short blur on transitions

Never fade black directly into the accent color. Move an accent element between states instead

Make tab indicators stretch by putting each edge on a different spring

Zoom the camera so every state fills the frame

Make the last frame equal the first so the whole thing loops
</motion>

<export> 
First render one frame per beat as a contact sheet

Fix anything cramped or broken

Then render every frame in headless Chrome at 60fps, averaging 6 subframes for motion blur

Pipe into ffmpeg:
H.264 + yuv420p

Export all aspect ratios in parallel
</export>

motion design is becoming a prompt
````

## noah-z-zhang-765393

@noah_z_zhang ·  · [watch](https://x.com/noah_z_zhang/status/2104408692816765393) · [post](https://x.com/noah_z_zhang/status/2104408692816765393)

````text
<direction>
Dribbble-level dark-mode UI motion. One continuous timeline, 0 hard cuts. 
Canvas: Pitch black (#000000) with subtle grid texture.
Pacing: Strict 120 BPM, punchy kinetic typography.
Camera: Snappy
</direction>
````

## gdgtify-130294

@Gdgtify ·  · [watch](https://x.com/Gdgtify/status/2105570411870130294) · [post](https://x.com/Gdgtify/status/2105570411870130294)

````text
Create a 20.00-second kinetic spoken-word film titled “BUILD THE FLOOR.”
Treat this as an original miniature speech staged inside a typographic field. Every line reorganizes the field of the frame. The final declaration must stand on a field that finally lies flat.
Deliver one self-contained HTML file, 1080×1080, targeting 60fps, using SVG and/or Canvas. Embed all required assets.
ART DIRECTION
Background #102820. Letterforms # F4E9D5. Field lines and filings # F2B544. A magnetic-monument world: streamlines, flux, stillness at the null. Typography stays crisp; particles are atmosphere only. High-contrast serif for the speech, heavy grotesque for load-bearing words, restrained monospace for flux gauges. No horseshoe magnets, lightning, electron diagrams, or sci-fi arcs.
ORIGINAL SPEECH — EXACT WORDS, EXACT ORDER
“We were told to wait.”
“So we learned the weight of waiting.”
“Then one voice made room.”
“Then another.”
“Now the floor belongs to us.”
Do not attribute these words to any real person. No extra slogans. The complete speech must be understandable without audio.
CENTRAL VISUAL RULE
Words have assigned field roles. WAIT is a repelling plate; letterforms lean away from it, kerning compressed. WAITING is field lines sagging under load while filings stream toward the low side. VOICE is one pole reversed; the field reorganizes and letters stand upright along it. ROOM is a null point, a still eye inside the field. FLOOR is the field flattened into a horizontal plane. These roles must emerge from the actual letterforms responding to the field, not from illustrations.
STORYBOARD
0.00–3.00 — “We were told to wait.” The sentence leans away from the WAIT plate; streamlines compress against it. Available space pinches on the plate side; the sentence remains readable, pressed but intact.
3.00–6.50 — “So we learned the weight of waiting.” Reveal in phrase groups. Field lines sag deeper with each phrase. Filings — deterministic, hash-seeded per id and time — drift along the streamlines toward the low side and gather. The WAITING glyph hangs tilted inside the field as a suspended load.
6.50–10.00 — “Then one voice made room.” VOICE enters; one pole reverses. The field reorganizes: old streamlines retract by dash-offset while new ones draw in. Letters rotate upright along the new field — analytic rotation of whole glyphs, never path morphing. ROOM opens as a null point, a still eye; the counter of the O in ROOM is its center, and the next composition sits calm inside it.
10.00–12.50 — “Then another.” A second pole turns. The field becomes symmetric; every letter stands vertical. The baseline levels into the first perfect horizontal in the film. Hold absolute stillness for at least 400ms — even the filings pause.
12.50–16.00 — “Now the floor belongs to us.” The field flattens into a hor
````

## astrothewizard-618782

@AstroTheWizard · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/astrothewizard-618782) · [post](https://x.com/AstroTheWizard/status/2103629247751618782)

````text
I want you to make a 60-second, fully animated explainer video, end to end, completely on your own. I'm stepping away from my computer, so work autonomously until it's done. Don't stop to ask me questions; make the calls yourself and tell me what you decided at the end.

Topic: the journey of photons 

Style: whimsical, charming, storybook. Give the photon a personality. It should feel like a professional motion-design studio made it, not "AI video". The whole thing should be a pure JavaScript animation, rendered from code frame by frame. Don't use AI video generators for the visuals. I've seen the videos people are posting from Opus 5.5 (kinetic typography reels, continuous infinite zooms, data-driven explainers like The Pudding or 3Blue1Brown), and what makes them great is that they're code-rendered: crisp, precise, with a coherent design system and one strong formal idea per scene. Aim for that bar or above.

Make it genuinely educational and accurate. Where you can, simulate the real thing: the random walk should be an actual random walk, not a drawing of one. Include real numbers (core temperature, distance, travel time, years inside the Sun) and be honest about uncertainty in the estimates. Use humor and visual gags to keep attention: onomatopoeia, little characters, callbacks. Put what was happening on Earth during those 100,000 years alongside the photon's timeline.

Deliverable: 1920x1080 at 60fps, exactly 60 seconds, with:
- A voiceover script you write yourself, voiced with the highest-quality text-to-speech model you can access
- Burned-in captions, since most people watch on X with the sound off
- An original music score that fits the whimsical tone and changes with each scene
- Sound design synced exactly to the on-screen action (every bounce, pop, whoosh and ding)
- A professional mix: music ducks under the voice, mastered to streaming loudness

You write the script, design the characters, pick the typography and palette, compose the music, and build the animation engine. Use any tools and resources you can find access to: open fonts, sample libraries, open-source models. Use whatever works.

Quality is paramount. Build verification loops: render stills of every scene and review them critically, check transitions frame by frame, measure the audio mix numerically, fix what's weak and re-render. Don't hand me a first draft. Hand me something you'd put your name on. Also give me the source code so it's reproducible
````

## koushikde-937635

@_koushikde_ ·  · [watch](https://x.com/_koushikde_/status/2105730717455937635) · [post](https://x.com/_koushikde_/status/2105730717455937635)

````text
Make a 15s motion video in code (1920x1080, 60fps, one HTML file drawing every frame from a single seek(t) function, rendered with Playwright + ffmpeg, original synthesized sound at 128 BPM).
Idea: a blank résumé fills itself in, one skill per bar, and every skill gets proved on screen before it's ticked.
Story: a paper résumé slams onto a dark page and its rows type in (skills, type, systems, depth, data) → the camera pushes into the orange bullet until it floods the frame → five skill meters fill, each on a different curve → one word swings from thin to black on the beat, then flips through six typefaces → a dot grid ripples and resolves into a pixel mascot → a square tunnel flies at the camera and an extruded "3D" slams out → bars trace a spring curve while a counter lands on the reel's real frame count → "EVERY FRAME ON THE BEAT." one word per beat → the résumé comes back, filled in, mascot in the photo box.
Rules: one orange accent carries every transition; springs, never linear; every state change sits on the beat; no corner labels, no fake HUD numbers.
````

## aichrislee-408244

@aichrislee · threejs, shader, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/aichrislee-408244) · [post](https://x.com/aichrislee/status/2108709764817408244)

````text
Build me a camera lens in interactive 3D, in one HTML file with Three.js.

Make it look real: a big black pro zoom lens with its glass front, the rubber focus and zoom rings, the red stripe and the white numbers, and inside it the parts you never get to see. The stack of glass elements in their groups, the aperture blades that open and close, the focus motor, the image stabilizer, the zoom cams, and the gold contacts on the mount. Cut it open down the side so I can see the glass inside, with light passing through it as colored beams that bend and meet on the camera sensor behind it. The aperture blades open and close slowly. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart along the lens with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.
````

## yankis0x-174321

@yankis0x ·  · [watch](https://x.com/yankis0x/status/2103502194578174321) · [post](https://x.com/yankis0x/status/2103502194578174321)

````text
The trick is NOT the prompt. It is one rule: every frame is a pure function of time.

song -> numpy beat grid -> Opus 5.5 writes one HTML file -> Playwright renders -> ffmpeg blends

step 1 -> pick a royalty-free track around 120 BPM

step 2 -> give Opus 5.5 8 to 12 UI states: button, loader, toggle, chart, command palette

step 3 -> one HTML file, 1440x1440, every style computed inside seek(t). no CSS transitions, no timers

step 4 -> springs as closed-form math, so any frame renders in any order

step 5 -> numpy finds the beats, every UI sound lands on a measured peak

step 6 -> Playwright shoots 4 subframes per frame, ffmpeg tmix blends them into 60fps motion blur

step 7 -> render one frame per beat first, fix what is off the grid, then the full render

the math:

120 BPM x 7 bars = 28 beats = 14 seconds
14 s x 60 fps x 4 subframes = 3,360 browser renders
````

## aichrislee-378670

@aichrislee · threejs, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/aichrislee-378670) · [post](https://x.com/aichrislee/status/2107985027254378670)

````text
Build me a human heart in interactive 3D, in one HTML file with Three.js.

Make it look real: the deep red muscle with the red arteries and blue veins on top, and inside it the parts you never get to see. The four chambers, the four valves, the aorta and the pulmonary artery, the veins bringing blood back, and the wiring that sets the beat. The heart beats about once a second, the valves open and close in time, and the blood flows through it, blue going in and red going out. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.
````

## retropunkai-277590

@RetropunkAI · canvas, svg, gsap, ai-image · [watch](https://skillry.dev/ai-videos/opus-5-5/retropunkai-277590) · [post](https://x.com/RetropunkAI/status/2103237989065277590)

````text
Render a fun motion graphic animation using the GSAP animation platform (see below) to show a brief history of The Sphere in Las Vegas from start to today (start with a minimal architecture to completed venue) - Explainer video style - Talk about how bands now play there, The Wizard of Oz film and next how on Oct 1 2026 Metallica will make their debut - and guess who is attending? We are! Should be a 30-60s video depending on the info. Use the images in the folder.

Sphere History:
https://en.wikipedia.org/wiki/Sphere_(venue)

Animation Platforms:
https://gsap.com/

Ask me any questions if you need, but if you feel confident please have fun and make something awesome that will go super viral!
````

## ivysparkleai-543294

@IvySparkleAI ·  · [watch](https://x.com/IvySparkleAI/status/2107065771658543294) · [post](https://x.com/IvySparkleAI/status/2107065771658543294)

````text
A sung explainer from @leploutos gave me an idea: what if AI agents explained themselves over a house groove? Ten Treblo tracks, one human choice. Then Opus 5.5 got one brief: turn the chosen song into a film, not a slideshow. It built the motion, synced the words, rendered, checked and fixed its own work. Almost one-shot from our side—not one untested take. No editing timeline dragged by hand. Follow the copper thread. It becomes something else 😉 Taste set the direction. An experiment from our @agenticrealism world. Curious about the thinking behind it? Our articles go deeper. Link below. Agentic Music. This is Crazy.
````

## mablesjoseph-735781

@mablesjoseph ·  · [watch](https://x.com/mablesjoseph/status/2105472483054735781) · [post](https://x.com/mablesjoseph/status/2105472483054735781)

````text
Can you generate a motion graphics explainer in the visual style of this post and using all its content? I will leave the details up to you. I want you to show off what you can do so you have full creative freedom within those styling constraints. I want to give this to my engineers at my company. I want you to be proud of the final product. Utilize the elevenlabs and remotion tools at your disposal and let me know if you don't see them for some reason. Use whatever you want in those tools to make the most polished product that you would be proud of. Source Article : Context Tax - X article from the article
````

## deedydas-407965

@deedydas ·  · [watch](https://x.com/deedydas/status/2104391577091407965) · [post](https://x.com/deedydas/status/2104391577091407965)

````text
every single open source repo should have an explainer video like this 7min one for SQLite

1. explains what the repo does and why its useful
2. shows a high level map of the code (beautiful graphic!)
3. life of a query through the codebase
4. the core abstractions in the repo
5. a real trace of execution and what happens, with a bit on join-order query planning

and yes, this was all generated by opus 5.5 w/ gemini 3.8 tts. i sound like i'm on repeat, but im in shock at just how coherent and capable this model is. 

everything truly is code.
````

## linke1427832-343079

@linke1427832 ·  · [watch](https://x.com/linke1427832/status/2104099543839343079) · [post](https://x.com/linke1427832/status/2104099543839343079)

````text
Make a cinematic 2-minute video on the history of artificial intelligence, titled "Building the Brain: A History of Artificial Intelligence". Make it epic and emotional, like a documentary trailer. Go all out.

Compose the soundtrack yourself, fully synthesized in code. No samples, no audio files, no VST instruments. Cut the visuals to the music.

1920x1080, 60fps. No downloaded images or footage, every frame generated in code. Render the final video with the music mixed in as an MP4 and save it [here] (your preferred file location).
````

## ulyssexbt-205279

@ulyssexbt ·  · [watch](https://x.com/ulyssexbt/status/2106383971093205279) · [post](https://x.com/ulyssexbt/status/2106383971093205279)

````text
Make a film about its own prompt.
15 seconds. 0 keyframes. 0 samples
every frame is code. every sound is code. even the equalizer is dancing to its own soundtrack

step 1 → score first - the music is written in code at 120 BPM, every beat exported as data
step 2 → one function draws everything - seek(t) paints frame t, no timers, no randomness
step 3 → the visuals hear the song - FFT on its own mix, the bars are the real track
step 4 → it grades itself - one still per beat, scored 1-10, fixes the lowest on camera
````

## 0xspikez-483865

@0xSpikez · threejs, shader, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/0xspikez-483865) · [post](https://x.com/0xSpikez/status/2108550549532483865)

````text
an interactive 3D turbofan you can take apart in the browser, built with Three.js.

suck, squeeze, bang, blow, every stage labelled:
> the fan pulls in a huge mass of air. most of it bypasses the core and makes most of the thrust
> compressor stages squeeze the air about 40 times, heating it
> fuel burns hotter than the turbine metal's melting point
> the blades survive on cooling air and heat-resistant coatings
> two shafts, one inside the other, spinning at different speeds

then it explodes into every stage.
````

## archiveexplorer-560622

@ArchiveExplorer ·  · [watch](https://x.com/ArchiveExplorer/status/2106732275685560622) · [post](https://x.com/ArchiveExplorer/status/2106732275685560622)

````text
Write my launch video as 9 beats: pain, reframe, name, how it works, objection, range, mechanism in numbers, offer, CTA – one line each. For every beat write 3 headline options and send them to Jev to pick the one that best fits my brief. Build each beat as a wireframe first in HyperFrames: boxes, outlined text, guide lines, no color. Show me one still per beat and lock the timing. Then skin it from my DESIGN.md without moving the layout, and render a split view: final on the left, wireframe on the right.
````

## cryptoxorz-359201

@Cryptoxorz ·  · [watch](https://x.com/Cryptoxorz/status/2106632900049359201) · [post](https://x.com/Cryptoxorz/status/2106632900049359201)

````text
Help me make a science explainer video. Topic: {Topic} (Supplementary materials: {Paper/Link/Screenshot, Optional}; Target audience: {Zero-basis public / Some basis, Optional})

- Content: Explain one core question clearly, with a curiosity hook, counter-intuitive points, and life-like analogies, but facts must be accurate and sourced.
  - Prioritize citing original papers, authoritative institutions, and textbooks; do not use secondary marketing accounts.
````

## fleyta88-443662

@fleyta88 ·  · [watch](https://x.com/fleyta88/status/2108249741125443662) · [post](https://x.com/fleyta88/status/2108249741125443662)

````text
Build a GSAP timeline for UI cards with specific timing constraints: 280ms for cards, 220ms for title, 160ms for metadata, and a 60ms stagger between elements. Implement a verification loop where the animation is stepped through frame-by-frame using Playwright, screenshots are compared to detect overshoot or errors, and the code is patched until it passes the checks without rewriting everything.
````

## woojinrad-455731

@woojinrad ·  · [watch](https://x.com/woojinrad/status/2106083299462455731) · [post](https://x.com/woojinrad/status/2106083299462455731)

````text
Read the attached article and make a 25-second animated explainer (1080×1350, 24 fps) in a colored-pencil storybook style, drawn entirely in JavaScript on an HTML canvas, with a soundtrack synthesized using the Web Audio API. Pick 3 main ideas, give each a short caption taken from the text, and use one simple original character. Show me the storyboard first, then render it to MP4.
````

## ror-fly-880547

@Ror_Fly · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ror-fly-880547) · [post](https://x.com/Ror_Fly/status/2102853258582880547)

````text
We're going to try a little test. Do you think you could render a recipe motion graphic animation using javascript or html (w/e you think will produce the best) to show the full recipe from start to finish (empty glass to completed cocktail) - Explainer video style - Showing the recipe ingreidents + measurements as they're going into the cup. Should be a 30s video.
````

## alex-prompter-997524

@alex_prompter · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/alex-prompter-997524) · [post](https://x.com/alex_prompter/status/2103499977632997524)

````text
Adopt the role of an expert motion designer. Build a 30-second animated explainer for my business as a single HTML page. 5 scenes. The customer's problem, what I do, how it works in 3 steps, one proof point, and my name at the end. Bold text, smooth transitions, my brand colours. My business [DESCRIBE WHAT YOU SELL, WHO IT'S FOR AND YOUR COLOURS]
````

## sudo-kiran-335993

@sudo_kiran · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/sudo-kiran-335993) · [post](https://x.com/sudo_kiran/status/2103761658745335993)

````text
create best motion graphics explainer of the (your product) with very good script and good design colors and good music make sure the video should be incredible and people should feels like watch it many times.. it has to be in 30 seconds good and very intresting, it has to be best of the best of the best of the best video
(product link)
````

## cagrimbakirci-842869

@cagrimbakirci ·  · [watch](https://x.com/cagrimbakirci/status/2104011756397842869) · [post](https://x.com/cagrimbakirci/status/2104011756397842869)

````text
Opus 5.5 is truly insane. 

It one-shotted this explainer of how evolution built the eye.

What makes it even more crazy is that every single retina image in this visualization is computed, not drawn!

Felt fitting after all the "how a camera works" one-shots. Because, you know... evolution many-shotted eyes.

Over 40 times.

Enjoy.
````

## sarut0bisasuke-069973

@Sarut0biSasuke · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/sarut0bisasuke-069973) · [post](https://x.com/Sarut0biSasuke/status/2103418429248069973)

````text
Render a recipe motion graphic animation using JavaScript or HTML (whatever you think will produce the best result) to show the full recipe for a White Russian from start to finish, empty glass to completed cocktail. Explainer video style, showing the ingredients and measurements as they go into the glass. It should be a 30s video.
````

## charlesmendez-476517

@charlesmendez · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/charlesmendez-476517) · [post](https://x.com/charlesmendez/status/2102847039415476517)

````text
I Want you to make a modern slick and punchy video for 
http://
datagran.io with an example of a user creating a chatgpt ads campaign, then connecting their metrics, understanding attribution, then connecting a voice agent to it, the agent responding, then doing follow up, adding humans in the loop and then providing analytics.
````

## andrewmichaelsa-385936

@andrewmichaelsa ·  · [watch](https://x.com/andrewmichaelsa/status/2104490962139385936) · [post](https://x.com/andrewmichaelsa/status/2104490962139385936)

````text
Take a look at our Youtube for example animated explainer videos, review our brand guidelines for style reference, review this blog post, and our codebase to understand the new feature. Generate screenshots if needed, visit our site, grab any assets you need, and generate an explainer video to explain Site Optimization.
````

## incognitoprince-849212

@IncognitoPrince ·  · [watch](https://x.com/IncognitoPrince/status/2107664651760849212) · [post](https://x.com/IncognitoPrince/status/2107664651760849212)

````text
Create a 1-minute explainer video about [Topic] featuring After Effects style kinetic text animations. Use HTML/CSS/JS to render the animation with smooth transitions, bold typography, and timed reveals. The final output should be a standalone web-based animation file that can be recorded or exported as a video.
````

## sanjeevn72-151834

@sanjeevn72 ·  · [watch](https://x.com/sanjeevn72/status/2103456484793151834) · [post](https://x.com/sanjeevn72/status/2103456484793151834)

````text
&lt;inputs&gt;
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
&lt;/inputs&gt;
````

## retropunkai-060898

@RetropunkAI ·  · [watch](https://x.com/RetropunkAI/status/2103237991091060898) · [post](https://x.com/RetropunkAI/status/2103237991091060898)

````text
Render a fun motion graphic animation using the GSAP animation platform (see below) to show a brief history of The Sphere in Las Vegas from start to today (start with a minimal architecture to completed venue) - Explainer video style - Talk about how bands live page with GSAP animations :
````

## gabzofar-852359

@GabZoFar ·  · [watch](https://x.com/GabZoFar/status/2105657821475852359) · [post](https://x.com/GabZoFar/status/2105657821475852359)

````text
Make one 60-second, 60 fps, Apple-style motion-graphics product film for Kirocast (https://t.co/YDA5cSDcTa, "The MacOS screen recorder built for AI."), in two versions: 16:9 at 1920×1080 and 9:16 at 1080×1920 for Instagram Reels and TikTok. Both versions share the same timeline
````

## dotey-927166

@dotey ·  · [watch](https://x.com/dotey/status/2103964025683927166) · [post](https://x.com/dotey/status/2103964025683927166)

````text
做一支史诗编年片《中华文明史》，可以写代码逐帧渲染，再用 ffmpeg 合成。
配乐当时钟：五声调式，乐器从骨笛、编钟一路演进到管弦，BPM 随年代加快，所有切点踩拍。
宣纸白描和玄底泥金两种画风交替；每卷一个主色和一套随时代演变的纹样（彩陶纹 → 饕餮纹 → 云气纹 → 卷草纹 → 缠枝纹 → 回纹）。
每镜一个按词组出现的书法大字关键词，配一幅线稿。全片 HUD：左上朱印卷号，右侧竖排朝代名，底部卷轴时间尺和年份计数。
卷交界用朱印盖下、鼓钟重击的冲击转场。先定拍点网格和分镜表，再渲染。
地图只画示意，不画近现代真实人物，年代核对后再交付。
````

## bradmillscan-839974

@bradmillscan ·  · [watch](https://x.com/bradmillscan/status/2104048013362839974) · [post](https://x.com/bradmillscan/status/2104048013362839974)

````text
Can't Print the Proof

I gave Opus 5.5 total creative freedom to create an epic monetary history banger. 

1 caveat, I said use bitcoin block data to build the animation and wow me with the best quality without using generative video tools.

🤯

21 million, that's the truth
````

## rashadmirza404-020971

@RashadMirza404 ·  · [watch](https://x.com/RashadMirza404/status/2107310721600020971) · [post](https://x.com/RashadMirza404/status/2107310721600020971)

````text
Create a self-contained, aesthetically pleasing, breathtaking animation of optogenetics: how a light-sensing protein from green algae became a light switch for brain cells. Use JavaScript on a single canvas, all in one HTML file. Be detailed and scientifically accurate.
````

## king1818888-642123

@king1818888 ·  · [watch](https://x.com/king1818888/status/2104764925478642123) · [post](https://x.com/king1818888/status/2104764925478642123)

````text
请帮我上网研究大家怎么用 Claude Opus 5.5 制作动画，整理成一套清楚的操作流程，再用这套流程亲手做一部「如何用 Opus 5.5 做动画」的教学动画。

第一阶段：资料收集

1. 搜寻范围：YouTube 教学影片（可读字幕或说明栏）、X/Twitter、Reddit（r/ClaudeAI
第三阶段：制作教学动画

1. 内容：用动画呈现第二阶段整理出的流程，让没有经验的人看完就知道怎么开始。
2. 长度：约 【2-4】 分钟，分成 【5–7】 个段落（开场 → 各步骤 → 小技巧 → 结尾总结）。
3.
````

## ldataengineer-823010

@Ldataengineer ·  · [watch](https://x.com/Ldataengineer/status/2103945508972823010) · [post](https://x.com/Ldataengineer/status/2103945508972823010)

````text
Turn the whole debate about P(doom) into a cinematic explainer.

✈️ Would you board a plane with a 10% crash risk?
🌍 What does “10% risk to civilisation” actually mean?
🤖 And why are AI researchers arguing about this number while capability keeps accelerating?
````

## michaelraspuzzi-740595

@michaelraspuzzi ·  · [watch](https://x.com/michaelraspuzzi/status/2106083592820740595) · [post](https://x.com/michaelraspuzzi/status/2106083592820740595)

````text
explain loop transformers in a youtube animated short. search web for some real papers to read too.

switch up scenes, and make the visual narrative more compelling. also, make sure hook creates a curiosity gap for real world application on why this matters.
````

## amol909s-607293

@Amol909S ·  · [watch](https://x.com/Amol909S/status/2103456534768607293) · [post](https://x.com/Amol909S/status/2103456534768607293)

````text
make a dynamic 20s motion graphics video that shows what an incredible motion designer you are, like it's your showreel for this app commotion, highlighting tiling layout, auto model classifer and other features you deem fit to be in video. Go all out.
````

## howlemont-503897

@howlemont ·  · [watch](https://x.com/howlemont/status/2104023736370503897) · [post](https://x.com/howlemont/status/2104023736370503897)

````text
Turn the file into a 2D animated video, using a BBC-style voice, with English narration and English subtitles.

regarding video effects / script completeness / voice matching / music and sound-effects coordination, Choose those by yourself
````

## ajith-io-562538

@ajith_io · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ajith-io-562538) · [post](https://x.com/ajith_io/status/2103800569584562538)

````text
Make a dynamic 40-second motion graphics video on Distilbook that shows what an incredible motion designer you are, like it's your showreel - go all out. Use the Oppenheimer theme music as inspiration, but compose it yourself.
````

## gandamu-ml-124280

@gandamu_ml ·  · [watch](https://x.com/gandamu_ml/status/2104402167906124280) · [post](https://x.com/gandamu_ml/status/2104402167906124280)

````text
Create a player and tools for Another World's approach to animation. Also create a realtime video for Kavinsky-Nightcall starring Lester from Another World driving to the lab. Use crude compression for binary+data <250KB.
````

## tomandrieu96707-875264

@TomAndrieu96707 · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/tomandrieu96707-875264) · [post](https://x.com/TomAndrieu96707/status/2103411144899875264)

````text
Create a pure javascript animation. 30s-60s whimsical hand drawn collage style with appropriate audio that will explain the same story as our “about-us” page. Use assets from our repo when possible.
````

## rneayan-417829

@rneayan ·  · [watch](https://x.com/rneayan/status/2103400657856417829) · [post](https://x.com/rneayan/status/2103400657856417829)

````text
Drop every country's population as marbles. 1 marble = 1 million people.
+ sound effects
8,144 marbles. Real 2024 population data.
Every clink is synced to a simulated collision.
````

## haribuilds-007643

@hariBuilds_ ·  · [watch](https://x.com/hariBuilds_/status/2106440528435007643) · [post](https://x.com/hariBuilds_/status/2106440528435007643)

````text
Build a complete data animation about Earth’s most isolated location. Visualize Point Nemo, orbital altitude vs. terrestrial distance, and the oceanic spacecraft cemetery.
````

## nakazakifam-831964

@nakazakifam ·  · [watch](https://x.com/nakazakifam/status/2107715000227831964) · [post](https://x.com/nakazakifam/status/2107715000227831964)

````text
NextCoreのような海外のカッコイいYouTubeチャンネルをオマージュした、タイポグラフィとコードだけで作成する心理学解説動画を作ってください。画像生成AIや動画生成AIは使わず、全てコード（HTML/CSS/JSなど）で表現できる描写に制限して作成します。数秒ごとに連続で異なる描写スタイルに切り替わりながら進む構成にしてください。
````

## eleanorina-653042

@_eleanorina ·  · [watch](https://x.com/_eleanorina/status/2107841006909653042) · [post](https://x.com/_eleanorina/status/2107841006909653042)

````text
Build the latest FrankenManim version on my Mac and then use it to create a nice 3b1b-style explainer video about Hoeffding's D. Use FrankenTTS to provide the narration.
````

## sudo-kiran-670892

@sudo_kiran ·  · [watch](https://x.com/sudo_kiran/status/2104846546768670892) · [post](https://x.com/sudo_kiran/status/2104846546768670892)

````text
make a dynamic 30-seconds motion graphic video about the distilbook like a product explainer the video has to be very incredible (product url) https://t.co/BcbRbZVf1d
````

## eyadnour-172216

@eyadnour · threejs, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/eyadnour-172216) · [post](https://x.com/eyadnour/status/2108314868189172216)

````text
Build an interactive explainer on how QR codes hold and repair a message. Render fully in the browser using Three.js. Include treatment for visuals and sound design.
````

## koldo2k-741714

@koldo2k ·  · [watch](https://x.com/koldo2k/status/2104114332430741714) · [post](https://x.com/koldo2k/status/2104114332430741714)

````text
Explain the color wheel in a dynamic ~20-second motion graphics video, same energy as a motion designer's showreel. Use the classic 12-hue artist's wheel and cover
````

## emollick-019567

@emollick · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/emollick-019567) · [post](https://x.com/emollick/status/2103688362960019567)

````text
A video explaining recursion, where every explanation about recursion has a radically different video style, make this self-referential & clever & fast moving.
````

## charlessieg-370949

@charlessieg ·  · [watch](https://x.com/charlessieg/status/2104688668405370949) · [post](https://x.com/charlessieg/status/2104688668405370949)

````text
I want a snappy futuristic promo video for the launch of AccelaStudy AI Test Prep. Be sure to showcase the best features and reasons for using the product.
````

## tak3sh8-441895

@tak3sh8 · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/tak3sh8-441895) · [post](https://x.com/tak3sh8/status/2103667481139441895)

````text
Do a quick hand-drawn whiteboard animations explaining what is replica symmetry breaking in the SK model

Prompt 2: build the mp4 version with narration
````

## jdverolme-302685

@jdverolme ·  · [watch](https://x.com/jdverolme/status/2105013143596302685) · [post](https://x.com/jdverolme/status/2105013143596302685)

````text
I need a 1-minute motion graphics video about the history of AI up to today, with a short introduction. Your role is a motion designer. Go all-in.
````

## so-ainsight-225926

@so_ainsight ·  · [watch](https://x.com/so_ainsight/status/2103119227192225926) · [post](https://x.com/so_ainsight/status/2103119227192225926)

````text
JavaScriptだけでアニメーション動画を作って。
テーマは「Claude Codeって何？」。15秒・16:9、手描きの紙コラージュ風で、日本語ナレーション付き。

台本・素材・アニメーション・構成、全部任せます。
画像は gpt-image-2.5 、声は Gemini TTS
````

## sudo-kiran-254201

@sudo_kiran · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/sudo-kiran-254201) · [post](https://x.com/sudo_kiran/status/2103486573476254201)

````text
make a dynamic 30-seconds motion graphic video about the distilbook like a product explainer the video has to be very incredible
(product url)
````

## parkerrex-701462

@ParkerRex · canvas, physics · [watch](https://skillry.dev/ai-videos/opus-5-5/parkerrex-701462) · [post](https://x.com/ParkerRex/status/2103206747846701462)

````text
explain a token bucket rate limiter, canvas only, no libraries, every frame a pure function of time so my renderer can screenshot it.
````

## henrygsing-050247

@HenrygSing ·  · [watch](https://x.com/HenrygSing/status/2106208175792050247) · [post](https://x.com/HenrygSing/status/2106208175792050247)

````text
给它一份讲稿和一段“导演要求”（风格参照 Kurzgesagt × 皮克斯开场）。它先出方案，我确认后再动手。它先写 STORYBOARD.md，每一场写清时间、画面、文字、转场。用 Remotion 一场一场搭。还有一个就是在本地用微软的TTS 生成语音。免费。
````

## 0xvalure-331584

@0xValure · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/0xvalure-331584) · [post](https://x.com/0xValure/status/2103603025579331584)

````text
Make this PayBox logo into a reel. Pretend you are a world-class motion designer. Make a 10-second dynamic video like the reference
````

## pluginplay-472343

@PluginPlay__ ·  · [watch](https://x.com/PluginPlay__/status/2103910844677472343) · [post](https://x.com/PluginPlay__/status/2103910844677472343)

````text
pixel art boomerang render of the history of LLMs. then RSI. then it goes fucking crazy. 15 seconds max. self contained .html
````

## bitfish-539054

@bitfish ·  · [watch](https://x.com/bitfish/status/2103670987879539054) · [post](https://x.com/bitfish/status/2103670987879539054)

````text
输入如下：魔鬼控制人类最简单的方法,就是让人保持漂流状态。98% 的人,终其一生都在漂流。" —— 拿破仑·希尔《智胜恶魔》

参考这个洞见，创作一部讲解视频，尽可能令人难以置信的 2D 动画，时长 1 -3分钟，要有连贯的讲解，对白和声音。
````

## nilou-salehi-458567

@nilou_salehi ·  · [watch](https://x.com/nilou_salehi/status/2107184179947458567) · [post](https://x.com/nilou_salehi/status/2107184179947458567)

````text
Take a look at our documentation and the product ux and generate a marketing video which narrates how our product works
````

## dotey-522564

@dotey ·  · [watch](https://x.com/dotey/status/2103683057689522564) · [post](https://x.com/dotey/status/2103683057689522564)

````text
帮我用js制作一个视频，主题是：什么是 Transformer
要深入浅出，让高中生也能看得懂，不仅high level说的清楚，也要有细节，包括注意力机制，甚至一些数学概念

你可以用任何工具或者安装工具，可以联网检索

请给我惊喜
````

## nikolajankovic-616097

@_nikolajankovic · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/nikolajankovic-616097) · [post](https://x.com/_nikolajankovic/status/2102867033100616097)

````text
make a hand-drawn stop-motion animation;
story: you're defi saver and explaining yourself in 1st person
````

## yunn260414-016888

@Yunn260414 ·  · [watch](https://x.com/Yunn260414/status/2104044910769016888) · [post](https://x.com/Yunn260414/status/2104044910769016888)

````text
帮我用js制作一个视频，主题是：什么是Git
要深入浅出，让一个计算机0基础的人也能看得懂，然后要介绍一些常用指令的意思等等
要有声音的，然后是中文讲的
你可以用任何工具或者安装工具，可以联网检索
````

## 1stnoel-603851

@1stnoel_ · gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/1stnoel-603851) · [post](https://x.com/1stnoel_/status/2103247530259603851)

````text
Make a 1-minute educational video about https://readsotto.app/ with synthesized voice narration.
````

## xodud-rkd-160324

@xodud_rkd ·  · [watch](https://x.com/xodud_rkd/status/2106732228181160324) · [post](https://x.com/xodud_rkd/status/2106732228181160324)

````text
Make a pixel motion video of all human progress, then 30 years into the future. Output in mp4
````

## amitsingha89-780553

@AmitSingha89 · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/amitsingha89-780553) · [post](https://x.com/AmitSingha89/status/2103737604277780553)

````text
Make a professional explainer video for https://anuprerna.com for a first-time visitor.
````

## buildfastwithai-780900

@BuildFastWithAI ·  · [watch](https://x.com/BuildFastWithAI/status/2104451249269780900) · [post](https://x.com/BuildFastWithAI/status/2104451249269780900)

````text
generate a creative mp4 video on indian civilisation with music and sound effects.
````

## astroboysoup-861770

@astroboysoup ·  · [watch](https://x.com/astroboysoup/status/2104063140371861770) · [post](https://x.com/astroboysoup/status/2104063140371861770)

````text
Generate a 15sec explainer animation of my new app @ChatSoonApp. Pure HTML/CSS/JS.
````

## deedydas-252537

@deedydas · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/deedydas-252537) · [post](https://x.com/deedydas/status/2102787937482252537)

````text
make a modern slick and punchy video for a modern startup that works on inference
````

## blueoctopusai-270222

@blueoctopusai ·  · [watch](https://x.com/blueoctopusai/status/2105116391439270222) · [post](https://x.com/blueoctopusai/status/2105116391439270222)

````text
Make a motion graphics video that explains how the First & 10 Yellow Line works.
````

## wilzerjb-007630

@wilzerjb ·  · [watch](https://x.com/wilzerjb/status/2107892042320007630) · [post](https://x.com/wilzerjb/status/2107892042320007630)

````text
Create me a motion explainer video for my business @aidellyai
````

## kloss-xyz-067876

@kloss_xyz · canvas, svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/kloss-xyz-067876) · [post](https://x.com/kloss_xyz/status/2103652674336067876)

````text
make a video highlighting key moments in the history of AI.
````

## 0xnfrith-068999

@0xnfrith · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/0xnfrith-068999) · [post](https://x.com/0xnfrith/status/2103358957050068999)

````text
make me an animation to explain why celld earns its place.
````

## linearuncle-971663

@LinearUncle · svg, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/linearuncle-971663) · [post](https://x.com/LinearUncle/status/2103128559174971663)

````text
请用Manim给我制作一个导数概念学习的视频，要求通俗易懂，并且有例子，引人思考。配音使用edge-tts
````

## henkvaness-975279

@henkvaness · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/henkvaness-975279) · [post](https://x.com/henkvaness/status/2103801351993975279)

````text
make educational video out of article.
````

## stokebuilder-356793

@stokebuilder · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/stokebuilder-356793) · [post](https://x.com/stokebuilder/status/2103896101120356793) · **partial prompt**

````text
I used Opus 5.5 to generate 50 podcast animations for extremely hard to visualize concepts like Jev for Legal.  Absolutely blown away. 

We're about to see an explosion of visual podcasts, this entire medium is about to shift 

Sharing my prompt below.

【作者补充制作说明】
Go through the entire [episode] cut and add full-screen animations and graphics wherever they help. Be aggressive and over-inclusive: 35–50 moments, at least 2 per chapter. The goal is to fill empty talking-head time, explain ideas, and create visual hooks.

Style. Pick an aesthetic that's genuinely interesting and very, very cool, built in JavaScript with HyperFrames and assembled in Tesseract. Inspiration (all JS, no image assets):

https://x.com/Voxyz_ai/status/2102531681450119426: paper, typewriter-tape labels, hand-drawn marks
https://x.com/donaldjewkes/status/2102801274173587569: halftone, manga and pixel print, kinetic data type

Stay inside the LegalQuants brand (read brands/legalquants/): charcoal, white and black only, Arial, and the supplied lockup top-right, static. Write a shared style bible and a component kit first, so every animation looks like the same show.

Moments I definitely want:

[LIST]

Rules

Whenever anything goes full-screen (animation, screen share or still), one of us is in a corner picture-in-picture, bottom-right, following whoever is talking.
No punch-ins or zooming on the cameras. Keep each speaker relatively centered.
Copy must be verbatim or faithful to what's said. Never invent facts, numbers or quotes.
Sync each animation's beats to the spoken words.
Keep each graphic inside one uncut stretch of audio, and leave a few seconds of faces between graphics.

Process

An Opus 5.5 agent at extra-high effort finds every timestamp where an animation could fill space and hook the viewer, with a concept for each.
Opus 5.5 at medium effort builds each animation.
Opus 5.5 at extra-high effort judges each one once on brand consistency with the others, visual interest, relevance to the narrative and creative judgment.
Only cues the judge considers egregiously bad go back for a fix. No blanket redo loops.
Assemble the full cut with PiP baked into every full-screen visual, and give me a folder of the individual animations.
````

## nathanwilbanks-981110

@NathanWilbanks_ · threejs, shader, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/nathanwilbanks-981110) · [post](https://x.com/NathanWilbanks_/status/2103881538592981110) · **partial prompt**

````text
I asked opus 5.5 in @agnt_gg for the most realistic fire it could build using ONLY javascript.

It wrote a real 3D fluid simulation that runs on the GPU. The flame colors come from blackbody physics, the smoke is real volume, it runs at 96 fps in 1080p, and it critiqued its own renders about 40 times.

Then it shot a 38 second film of it. The sound comes from the fire itself. 🔥

Details:

- Nothing faked. The fire is actual simulated gas that burns, heats up, rises, and swirls. It gives off soot that glows, and the soot that escapes cools into smoke. Every frame is computed on the GPU.

- The AI graded its own work: render a frame, have a vision model pick it apart like a VFX supervisor, fix it, repeat. It caught a flame that kept dying, ring shaped artifacts on the ground, and coals that looked like cheese chips.

- The film isn't screen recorded. Each frame is rendered offline with scripted camera moves. The crackle and roar come from how brightly the fire burns in each frame.

- No Blender, no stock footage, no sound library. One HTML file, one conversation.
````

## voxyz-ai-345550

@Voxyz_ai · threejs, shader, canvas, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/voxyz-ai-345550) · [post](https://x.com/Voxyz_ai/status/2103117246860345550) · **partial prompt**

````text
I asked Opus 5.5 to explain gravitational lensing by building an interactive black hole lab

One prompt for the first version, then a dynamic workflow to polish it for three rounds while I slept. This is what I woke up to: 5h 28m end to end, $90 at API prices

https://blackhole.voxyz.ai

Drag the black hole and the sky behind it bends into arcs, closing into a full ring when everything lines up

Each round ran 3 agents. Two reviewers each picked 9 to 10 issues and ranked them P0, P1, P2. The third one fixed them.
Round 1: 3D materials and lighting + UI and type
Round 2: camera motion and interaction + science-communication design
Round 3: a design director deciding whether it ships + visual QA and performance

Every P0 got fixed, the rest only if worth it. When the two reviewers disagreed, it picked one and wrote down why. It backed up before each round, checked screenshots after, and rolled back anything it couldn't fix.
````

## acoramaa-053577

@Acoramaa · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/acoramaa-053577) · [post](https://x.com/Acoramaa/status/2103833991879053577) · **partial prompt**

````text
I TRIED MAKING A 3D MOTION GRAPHIC WITH CLAUDE OPUS 5.5. THIS IS WHAT CAME OUT.

The idea was simple: start at my desk and don't stop zooming until we hit a single atom inside the CPU.

Opus 5.5 took it and just kept going.

Into the PC case. The cooler lifts off. The CPU under it. The metal lid comes off. Then the silicon die, one core, the copper wiring stacked on top, rows of logic cells, the fins and gates of the transistors…

…all the way down to one silicon atom, bonded to its four neighbours.

One continuous shot, no cuts. The ruler on the right tracks the scale the whole time: from about a metre down to about 2 nanometres.

And the part that still gets me: every frame of this is 3D rendered right in a browser, from code. No Blender, no After Effects, no stock footage.

A year ago this would have been a studio job. Now it's one conversation.

Opus 5.5 is on another level.
````

## henritoivar-445215

@HenriToivar · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/henritoivar-445215) · [post](https://x.com/HenriToivar/status/2102832525798445215) · **partial prompt**

````text
Opus 5.5 is an absolute BEAST in creating videos.

I am extremely shocked because my previous attempts with GPT-6 Astra and Grok 4.6 were quite underwhelming, far from production ready video.

The leap here is gigantic.

This is a ZERO shot video.

【作者补充制作说明】
Why Opus 5.5 is so impressive is because it's is not a video generation model. It uses pure code to generate the sound effects, the music. All of the animations are done with CSS/HTML/JS, it doesn't use any video or image assets.

This is extremely useful for creating detailed explainer videos where you need very fine control over the infographics and consistent deterministic output.

The framework I used was hyperframes and narration is done by OpenAI text-to-speech.
````

## nybobs-680050

@nybobs · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/nybobs-680050) · [post](https://x.com/nybobs/status/2103385835328680050) · **partial prompt**

````text
110k rigid bodies in real time, in a browser tab. Grab anything, fire cannonballs.

Built with Claude Opus 5.5: Augmented Vertex Block Descent (SIGGRAPH 2025, Giles, Diaz & Yuksel) in WebGPU with @threejs . It's a physics solver that stays stable with huge scenes and big mass ratios. Opus 5.5 even put together this whole demo reel video just from a single text prompt in Claude Code haha 🤯

Try it: https://three-avbd.vercel.app
(recorded on an M4 Max, lighter scenes run fine on older computers or on mobile)

Code's here, MIT licensed. Go build something with it, have fun breaking things: https://github.com/sbobyn/three-avbd

#threejs #WebGPU
````

## tetsu-tetsu333-576886

@tetsu_tetsu333 · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/tetsu-tetsu333-576886) · [post](https://x.com/tetsu_tetsu333/status/2106177888265576886) · **partial prompt**

````text
Opus 5.5×Gemini 3.8 Flash TTSやばい

新作SEOツール「コトサーチ」のリリース動画を、ほぼ自動で作ってくれた。
自分がやったのは「ツールへのログイン」と「承認」だけ。

個人的には、画面スクショまで自動で撮ってくれるところが一線を超えた感じ。
(もちろんナレーションも自然すぎてすごい..)

具体的な手順はこんな感じ👇
① Claudeがブラウザでツールにログイン
（ここだけ自分でやった）

② Claudeがアプリを触って、機能仕様書を作成
機能・料金・言っちゃダメな表現まで整理

③ Claudeがツールの画面スクショを撮影
PC・スマホ・パーツ切り出しで38枚

④ Claudeが絵コンテとナレーション原稿を作成

⑤ ClaudeがRemotionで動画を実装
書き出した静止画を自分で見て、文字切れや重なりまで直してくる

⑥ Gemini 3.8 Flash TTSでナレーション音声を生成
声の設定も原稿の入力もClaudeが操作

⑦ Claudeが音声を32フレーズに分解
話した瞬間に画面とテロップが出るよう自動で同期

⑧ BGMはClaudeがコードで作曲
声の下では自動で音量を下げてくれる

⑨ 52秒の動画が完成

ということでSEOツール「コトサーチ」は10月4日に正式リリースです。
キーワードを入れるだけでSEO記事ができて、サイト全体の内部リンクまで整えられます。
明日のリリースをお楽しみにしててください！！！
````

## imthatcarlos-133592

@imthatcarlos · canvas, svg, ai-image · [watch](https://skillry.dev/ai-videos/opus-5-5/imthatcarlos-133592) · [post](https://x.com/imthatcarlos/status/2102849219388133592) · **partial prompt**

````text
Opus 5.5 just one-shotted this explainer video for @sherwoodagent 🔥

Since I ran it within the context of our web app, it used existing components and branding to inform the design and used @Remotion skills for rendering

Kind of insane, haven't tried doing any video generation for months, but the latest models are making it easier to create content that is polished without heavy iteration

Prompt: "make a modern slick and punchy video for sherwood protocol. feel free to take branding or components from the landing page or app. the goal is to highlight how it enables agentic hedge funds, explaining it simply"
````

## stefanostraus-971191

@StefanoStraus · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/stefanostraus-971191) · [post](https://x.com/StefanoStraus/status/2104236916316971191) · **partial prompt**

````text
I asked Opus 5.5 again for an engine you can take apart in the browser

Pistons against magnets at the same shaft speed. Push the RPM, open the cylinders, slow time down to 1/10

Under 15 minutes, and it did not even move the usage meter on my Max plan. The first experiment took half an hour, this one reused the framework the earlier ones built

This is a screen recording, the real thing runs live in your browser

Next I want to find where it breaks, so a game is coming
````

## kgonia7-746268

@kgonia7 · threejs, shader, canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/kgonia7-746268) · [post](https://x.com/kgonia7/status/2103835848575746268) · **partial prompt**

````text
From Cabo da Roca to observable universe.

I gave opus 5.5 old prompt I prepared for Fable but I was not satisfied with the results. I asked model to create a cinematic film that zooms out from a hillside on Earth to the full observable universe using @threejs No external assets. 

Time: ~3h
Output tokens: 662,769
Cache: 125.6M read, 2.0M written; 
API-equivalent cost: about $54.52: output $13.26, cache reads $25.12, cache writes $16.14
````

## irinatoxi-962937

@irinatoxi · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/irinatoxi-962937) · [post](https://x.com/irinatoxi/status/2104212841657962937) · **partial prompt**

````text
Opus 5.5 just turned a smartphone into a 20-second trip from glass to atoms.

It starts on the phone, dives through the motherboard and chip, then keeps going through the semiconductor structure until you’re basically staring at the atomic scale.

This is the kind of 3D shot that normally looks like a whole studio touched it.

Instead, Opus 5.5 built the sequence.

That’s fucking ridiculous.
````

## itsahmedharoon-544194

@itsahmedharoon · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/itsahmedharoon-544194) · [post](https://x.com/itsahmedharoon/status/2103986344414544194) · **partial prompt**

````text
Jumping on the Claude Code + Hyperframe bandwagon.

I made this intro completely zero-shot using Opus 5.5.

Claude downloaded and ran an open-source model for text-to-speech, added the turbine sound at the start, layered in the other sound effects, and nailed the motion and visuals.

The accuracy of the whole thing is unreal. I’m in awe.
````

## stephanferraro-224281

@StephanFerraro · threejs, shader, physics · [watch](https://skillry.dev/ai-videos/opus-5-5/stephanferraro-224281) · [post](https://x.com/StephanFerraro/status/2103020274107224281) · **partial prompt**

````text
Claude Opus 5.5 on our AI coding benchmark: build a fully autonomous 3D water simulation from an empty repo - procedural mountains, rain, streams, lakes. TypeScript + Three.js, no physics engine.

One prompt, zero corrections, ~21 min. 23/23 tests green.

https://github.com/AiondaDotCom/ai-sim-benchmark
````

## konstantinsaifo-501736

@konstantinsaifo · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/konstantinsaifo-501736) · [post](https://x.com/konstantinsaifo/status/2104094723887501736) · **partial prompt**

````text
I asked Claude Opus 5.5 to explain how a rocket engine works by building an interactive Raptor 3 you can take apart in your browser.

Cut it open, follow the oxygen and the methane through both turbopumps, then throttle it and watch the shock diamonds move.

http://airsup.ai/rocket-engine
````

## amberpromptai-345137

@AmberPromptai · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/amberpromptai-345137) · [post](https://x.com/AmberPromptai/status/2103793821012345137) · **partial prompt**

````text
Tried Opus 5.5 to explain the Mid-Autumn Festival 🌕

From ancient traditions to mooncakes and family reunions, I turned the story into a short animated video.
The message is simple: No matter how far apart we are, make time for the people we miss.

What do you think of the result?
````

## iniyanai-856596

@iniyanai · threejs, svg, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/iniyanai-856596) · [post](https://x.com/iniyanai/status/2103814603100856596) · **partial prompt**

````text
Asked claude Opus 5.5 to make an explainer on how a mechanical keyboard works.

It wrote the music in code, used real switch recordings as the beats, built the 3D in @threejs  and timed every cut to the beat.

No stock footage. no editing app.

What a time to be alive!
````

## tony-tt-872147

@_Tony_TT_ · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/tony-tt-872147) · [post](https://x.com/_Tony_TT_/status/2103227891009872147) · **partial prompt**

````text
Opus 5.5 on the Trading House

❯ Using React/TypeScript (Remotion), every image drawn in SVG and Canvas, an open-source TTS voice, and a score synthesized in Python. No stock footage. No image generators.

❯ Build a short 30-60s animation work about the Trading House
````

## chudry223-081860

@chudry223 · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/chudry223-081860) · [post](https://x.com/chudry223/status/2103044654187081860) · **partial prompt**

````text
One prompt. One interactive camera lab. 🎥🔥

Claude Opus 5.5 generates a 3D experience where you can adjust the focus ring, move lens elements, shift the focal plane, and see real-time depth-of-field effects.

AI-generated interactive 3D is getting wild. 🤯
````

## miguel07code-091611

@Miguel07Code · canvas, audio, ai-image · [watch](https://skillry.dev/ai-videos/opus-5-5/miguel07code-091611) · [post](https://x.com/Miguel07Code/status/2103626582896091611) · **partial prompt**

````text
fourier series were hard to learn back in university (2 years ago) and they are fun! 

what unlocks @HyperFrames_ + @claudeai Opus 5.5 is that you can get the best explainer videos just with 1 prompt

you are curious about something? ask claude!
````

## arthurkatcher-604161

@arthurkatcher · svg, gsap, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/arthurkatcher-604161) · [post](https://x.com/arthurkatcher/status/2104198927549604161) · **partial prompt**

````text
I asked Opus 5.5 to explain how a coding agent works in 40 seconds.

never been this shocked. It animated the whole thing, wrote the music, and landed every cut on the beat.

one message in Claude Code, 14 minutes. Workflow is in the comments 👇
````

## konstantinsaifo-587629

@konstantinsaifo · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/konstantinsaifo-587629) · [post](https://x.com/konstantinsaifo/status/2104216976801587629) · **partial prompt**

````text
I asked Claude Opus 5.5 to explain how a fusion reactor works by building one you can take apart in your browser.

Drag the plasma from 15 million °C, the heat of the Sun's core, to 150 million and watch a city light up.

https://airsup.ai/lab
````

## garmdotcom-987439

@garmdotcom · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/garmdotcom-987439) · [post](https://x.com/garmdotcom/status/2103516101518987439) · **partial prompt**

````text
Tried to jump on the explainer video "made entirely with Opus 5.5" bandwagon.

Accidentally didn't include an OpenRouter API key.

Opus decided to just do everything itself. 

The result is insane

$0 additional cost.

Prompt in next post
````

## rakhsh-tech-544921

@Rakhsh_Tech · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/rakhsh-tech-544921) · [post](https://x.com/Rakhsh_Tech/status/2104144532644544921) · **partial prompt**

````text
Claude Opus 5.5 で、ドパガキ用のグラフィックの動画作りが流行っているので、物理演算で落ち着いた音づくりにも挑戦してみました。

弦、笛、太鼓、鈴、水の泡。物理演算できる音をコードにして鳴らしています。映像作りだけではありません。音の表現にも一段工夫を凝らしたい。そんな人はチャレンジしてみる価値があると思います。

グラフィックの動画を作っている人は、ひと味違うサウンドエフェクトも試してみてはどうでしょうか。

#ClaudeCode #物理演算 #Opus
````

## timguignard-623571

@TimGuignard · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/timguignard-623571) · [post](https://x.com/TimGuignard/status/2104515756159623571) · **partial prompt**

````text
Just tested Claude Opus 5.5 with Hyperframes.
One prompt (also generated), the result is ok. Not crazy, but with a few more indications and a clear direction, it would probably get much nicer.

The video below is actually a screen record.
````

## cyrilxbt-149036

@cyrilXBT · canvas, physics · [watch](https://skillry.dev/ai-videos/opus-5-5/cyrilxbt-149036) · [post](https://x.com/cyrilXBT/status/2103532793406149036) · **partial prompt**

````text
🚨 Opus 5.5 is the best model launch in 2026

this entire physics engine is one HTML file.

sand, water, oil, fire, lava, plants, steam.

108,000 particles at 60fps.

built with Opus 5.5.

prompt in the replies 👇

follow @cyrilXBT
````

## explorations-iq-921682

@explorations_iq · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/explorations-iq-921682) · [post](https://x.com/explorations_iq/status/2103317768669921682) · **partial prompt**

````text
Opus 5.5 generated this simulation of molecular orbitals in about ~20 minutes. I had to prompt for some structures and resonance but I can see the promise of instant educational simulations for any advanced topic
````

## rpa-dake-593915

@rpa_dake · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/rpa-dake-593915) · [post](https://x.com/rpa_dake/status/2104466394859593915) · **partial prompt**

````text
Claude Opus 5.5 に Remotion のコードを書かせて、検索の歴史を15秒の年表ムービーにしたら、めちゃくちゃアツい🔥

・1996から2015まで、ネオン調の年号がspringで3D回転しながら叩きつけるように出る。
・大学の研究から持株会社への再編まで、各年の出来事を線画のSVGで描き足していく。
・最後は「検索から、すべてへ。」で締める

歴史ものの勢いは、情報量より場面を叩きつける間で決まる。
````

## hunzai-842605

@hunzai · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/hunzai-842605) · [post](https://x.com/hunzai/status/2103904436141842605) · **partial prompt**

````text
//Like most of you//  I asked opus 5.5 (medium) to generate animation to explain "Tree as an ecosystem" with AUDIO - no fancy prompts just oneliner prompt - and it created this
````

## kureshirfan-386691

@kureshirfan · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/kureshirfan-386691) · [post](https://x.com/kureshirfan/status/2103788564840386691) · **partial prompt**

````text
I asked Claude Opus 5.5 to explain the earthquake physics as an animation. This is what it built, physically accurate strain profile included. 
#opus5 @AnthropicAI @claudeai
````

## itakahashikun-990109

@iTakahashikun · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/itakahashikun-990109) · [post](https://x.com/iTakahashikun/status/2103731575661990109) · **partial prompt**

````text
ださいけど、Remotion で動画っぽいのつくった。コードは見てない。環境だけ用意した…っていっても、いつものように jj init されるカスタム try コマンドを叩いてディレクトリをつくって「Remotion の環境をプリーズ」だけだわ。なんもしてない。あとは Opus 5.5 とちょっと話しただけだわ。未来だ。
````

## cboyack-407181

@cboyack · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/cboyack-407181) · [post](https://x.com/cboyack/status/2103617085402407181) · **partial prompt**

````text
Asked Opus 5.5 (max) to create a 15-second video about why we need to end the Fed. Behold. 

Took 1 hour 45 minutes to do. It used @Remotion to create it.
````

## moguzbulbul-215591

@moguzbulbul · svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/moguzbulbul-215591) · [post](https://x.com/moguzbulbul/status/2104206095313215591) · **partial prompt**

````text
I was struggling to explain my UX decisions in interviews, so I made this kind of animation with Opus 5.5

Anyone want the skill?
````

## falcong-j-277506

@FalconG_J · svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/falcong-j-277506) · [post](https://x.com/FalconG_J/status/2105033204319277506) · **partial prompt**

````text
「Opus 5.5なら数分でできる」は本当か。

記事の冒頭に置く30秒の動画を、Remotionで作りました。
1本目は、依頼してから10分33秒。
最初の1秒から、主役の文字が大きく動きます。

作り方の手順とプロンプトは、引用先の記事へ。
````

## 0xlangeai-597929

@0xlangeai · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/0xlangeai-597929) · [post](https://x.com/0xlangeai/status/2106391068367597929) · **partial prompt**

````text
哈哈,   别再急着买API, 用 CLIProxyAPI 盘活你的 AI 订阅这篇文章的视频版宣传片来了

全程使用 Opus 5.5 + remotion 制作 

感觉还不错的 ,  把流程环节都给讲清楚了
````

## itsyashf-692347

@itsyashf · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/itsyashf-692347) · [post](https://x.com/itsyashf/status/2104227261142692347) · **partial prompt**

````text
Made this small video for a linkedin post with Opus 5.5 + Remotion and 2 screenshots of reference
````

## salmanr2d2-661615

@salmanr2d2 · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/salmanr2d2-661615) · [post](https://x.com/salmanr2d2/status/2103608284825661615) · **partial prompt**

````text
Made with Opus 5.5 and Remotion. #claude #opus #reactnative #currency
````

## samissudo-927179

@samissudo · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/samissudo-927179) · [post](https://x.com/samissudo/status/2102860811219927179) · **partial prompt**

````text
created this with opus 5.5 + remotion, the possibilities are endless
````

## aylmerth-356252

@AylmerTH · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/aylmerth-356252) · [post](https://x.com/AylmerTH/status/2105346401878356252) · **partial prompt**

````text
I made this with a two sentence prompt using Opus 5.5 and Remotion.
````

## ninjaswebcom-684126

@ninjaswebcom · canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ninjaswebcom-684126) · [post](https://x.com/ninjaswebcom/status/2103537378283684126) · **partial prompt**

````text
Made with Opus 5.5, remotion y eleven labs. 145k tokens.
````

## 0xlangeai-178533

@0xlangeai · svg, css · [watch](https://skillry.dev/ai-videos/opus-5-5/0xlangeai-178533) · [post](https://x.com/0xlangeai/status/2104119716533178533) · **partial prompt**

````text
Opus 5.5 做的文章讲解,  省流
````

## xamfonos-004331

@xamfonos_ · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/xamfonos-004331) · [post](https://x.com/xamfonos_/status/2107809209593004331) · **partial prompt**

````text
Opus 5.5 + Remotion 🤓
````
