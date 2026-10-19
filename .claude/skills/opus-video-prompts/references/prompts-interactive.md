# Games & interactive: full prompts (101)

Structured and complete prompts first. Each entry: author, tech, links, then the prompt exactly as posted.

## twoclipping-041659

@twoclipping ·  · [watch](https://x.com/twoclipping/status/2107822293653041659) · [post](https://x.com/twoclipping/status/2107822293653041659)

````text
<inputs>
Ask me for: a voiceover or song with a spoken line (the audio file) and its transcript, 10-12 small objects that sum up my life, two silhouettes to light like a heat camera (a head in profile and a raised hand), and the 3 words I want to land hardest. If I skip any, use the defaults: vinyl, book, camera, cat, coin, game controller, cap, heart, money, plant, clapperboard, skateboard; free CC0 silhouettes from Openverse; action, intention, curiosity.
</inputs>

<direction>
A 20 second 4:3 film, 1440x1080 at 60fps, cut to the voice. Off-white paper, black, one red, one yellow, Geist for every word. Film grain on everything, a soft vignette, and a camera that never rests: a slow handheld float under everything plus a slow push inside every scene.
No scene cuts to the next: each handoff starts on the exact last frame of the scene before. The only hard cuts are the beat flips on the last word.
Every object is pixel art you draw yourself: a 16x16 grid per object, every cell a hand-placed colour, rendered as a 3D block (a darker extrusion down-right, a thin bevel on every cell) with a soft contact shadow.
The silhouettes are lit like a heat camera: the heat comes from how thick the body is at each point, so the nose, the hair and the fingertips run cooler, plus one hotspot and a slow moving noise, mapped through a black > red > orange > cream ramp. The edge stays razor sharp, with a soft glow outside it.
Motion rules: nothing pops in (eased glides of about 0.5s with a soft start), fast moves get real motion blur instead of ghost copies, and captions type with the voice behind a block cursor.
Banned: stock footage, AI video, 3D camera moves, particles, glitch.
</direction>

<structure>
Hang every scene on the transcript's word timings (measure them with faster-whisper word timestamps, one short chunk at a time):
1. The first word fills a yellow card. The card wipes off to the left and the question types underneath on two centred lines that glide to stay centred as they grow, the key word underlined in red as it's spoken.
2. The objects streak past in lanes above and below the words, a cyan four-point flare sweeps in, then the page burns away: black closes in from the edges onto the head, behind a hot red edge.
3. The head heats up on black while the answer types low on the left. A thin white orbit draws itself around the head, its far half passing behind it. On the last word, paper blooms out from inside the head with the objects in it, and the camera falls through: the head rushes past the lens until the paper is all we see.
4. The objects sit on a tilted ring seen in perspective (the front ones bigger and lower, drawn last), slowly turning, each one bobbing; the coin flips and lands with sparks.
5. On each of the 3 words, that object flies out of the ring to the left and grows, the page floods black from it, and the word types beside it (camera: a red shutter star; book: a red ribbon sweep; record: two white orbits and red notes). Then the flood drains back into the object as it flies home, and the camera dives closer into the ring. Put each hero object in the slot that is front-left when its word lands.
6. The ring pulls in a touch, bursts outward, every object turns to ink, and ink blots grow and swallow the page.
7. The hand rises into frame, hot, with the line split either side of it. The heart drops into its palm, then lifts to the centre at the size the next scene holds it.
8. The last word, one letter per beat, the background flipping paper / black / red, the heart holding its place across the cut, the centre object morphing pixel by pixel into the next one.
9. Thin brush strokes sweep through, the letters drift apart and float, then settle back into the word with the heart above it. The camera keeps pushing through the hold.
</structure>

<build>
1. One HTML canvas. Every frame is a pure function of time inside seek(t).
2. Bake each pixel sprite once to an offscreen canvas (the extrusion layers, then the face), then draw it scaled and rotated.
3. The heat: precompute each silhouette's base heat once (a distance transform of the mask, held at the edge value outside it so nothing dark bleeds in when it is upscaled). Every frame, add the hotspot and two octaves of value noise at quarter resolution, map it through a 256-step lookup, upscale it, and cut it with the full-resolution mask.
4. The fall through the head: draw the ring scene into an offscreen layer, mask it with the head scaled up about a point inside the skull, and grow that scale on a cubed curve until the head covers the frame. The ring inside zooms less than the head does, so it reads as depth.
5. The pixel morph: pair every cell of object A with a cell of object B and glide each one's position and colour, with a small random delay per cell.
6. Render with Playwright at 60fps with 8 motion-blur subframes, then lay the original audio back on with ffmpeg.
</build>

<gotchas>
A mask PNG with no alpha channel fills the whole box with heat, so put the silhouette in the alpha. A limb cut by the photo's border shows as a straight edge, so extend the mask past the frame. A handoff only reads as smooth when the last frame of one scene is the first frame of the next: draw the outgoing scene under the transition, and give scenes that show the same ring one shared zoom function. A flood that's still retreating when the next scene starts reads as a hard cut, so let it finish first. A fast ease-out flood reads as a jump; use a soft start.
</gotchas>

<start>
Ask me for the inputs, measure the word timings, then show me 8 stills before you render.
</start>
````

## rossaxbt-707651

@rossaxbt ·  · [watch](https://x.com/rossaxbt/status/2107121188027707651) · [post](https://x.com/rossaxbt/status/2107121188027707651)

````text
<inputs>
Ask me for: a short label for the opening toggle, one hero word, a percentage for the graph, the text for the final card, one accent color, and a track with a clear beat.
</inputs>

<direction>
A 2D motion design film in 16:9. Use a warm off-white canvas, near-black backgrounds, bold typography and one vivid orange accent. The orange dot connects every scene: it starts in the UI, becomes the dot over a letter, traces a spring graph, grows into a shape and returns on the end card. A cursor makes the opening click feel real. Keep the motion sharp and controlled, with small spring overshoots and no dead time.
Banned: stock footage, gradients, glows, particle bursts, random transitions and motion that isn't connected to an element already on screen.
</direction>

<structure>
Around 15 seconds, with a visual change on every major beat.
Open: a cursor clicks the orange toggle beside "Reduce Motion". The letters bend and move into place until only "Motion" remains, with the orange dot above the "i".
Spring: the dot jumps away from the word and lands on a graph. Its path draws a spring response, overshoots the target and settles beside a "+22%" callout.
Shape: the dot shoots across a line, grows into an orange circle and fills the frame. A black rounded square rotates inside it, then stretches into a pill. The scene contracts to a single orange dot on black.
Type: words like "SPRINGS", "EASING", "KINETIC TYPE", "3D" and "SOUND" orbit the dot. The circle of type opens out into a field of tiny dots.
Reveal: the halftone field expands and flips to black, revealing the final card: "Opus 5.5", "Motion designer." and "0 keyframes".
Return: the orange dot moves back through the halftone, graph and toggle. Match the final frame to the first so the video loops cleanly.
</structure>

<build>
1. One HTML file, 1920x1080 at 60fps. Compute every visual from time inside seek(t): no CSS transitions, timers or state carried between frames.
2. Use closed-form springs for the toggle, bouncing dot and graph. Draw the graph from the same spring function that moves the dot.
3. Animate letters individually for the "Reduce Motion" to "Motion" transformation. Keep the orange dot attached to the "i" until it begins its jump.
4. Make the orange circle, rotating square and pill different states of the same shape. Preserve its position and motion through each transformation.
5. Place the orbiting words along a circular path, then move their letters outward to hand the frame over to the halftone grid.
6. Draw the halftone as a grid of dots whose sizes respond to the orange dot. Let it grow past the frame edges before revealing the end card.
7. Sync the click, dot landing, graph peak, shape changes and final title to measured beats.
````

## froessell-562325

@froessell · threejs, canvas, physics, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/froessell-562325) · [post](https://x.com/froessell/status/2103789415323562325)

````text
PRD — Police Chase Arcade Game

Working title: Heatwave
Platform: iOS + Android
Engine: Unity
Genre: Top-down 3D arcade chase / survival
Orientation: Portrait
Input: One-thumb touch controls
Business model: TBD — design MVP around gameplay first
Primary goal: Build a genuinely fun playable prototype before adding progression or monetization.
⸻
Product vision
A fast, chaotic mobile arcade game where the player is constantly being pursued by increasingly aggressive police.
The player cannot directly attack.
Instead, they survive by driving aggressively, drifting around obstacles, making sudden turns and tricking pursuing police into crashing into obstacles and each other.
The fantasy is:
You’re not stronger than the police. You’re harder to catch.

Runs should produce constant near-misses, chain collisions and moments where the player escapes a seemingly impossible situation.

Think:

easy controls + aggressive pursuit + physics chaos + escalating pressure.

⸻

Core gameplay loop

START RUN
↓
DRIVE / DRIFT
↓
POLICE PURSUE
↓
BAIT POLICE
↓
DODGE
↓
POLICE CRASH
↓
GAIN SCORE
↓
WANTED LEVEL INCREASES
↓
MORE / HARDER POLICE
↓
SURVIVE
↓
EVENTUALLY GET CAUGHT
↓
SCORE / RESTART

Target run duration:

2–5 minutes.

Restart should take less than 2 seconds.

⸻

Design principles

3.1 One-thumb playable

The player should be able to understand the controls within seconds.
No accelerator.
No brake pedal.
No virtual steering wheel.
The vehicle moves automatically.
The player controls only direction.

(I moved away from this after testing it the first time and added the onscreen joystick)

3.2 Arcade physics, not simulation
Vehicles should:
drift
slide
bounce
spin
collide dramatically
recover quickly
Fun takes priority over physical accuracy.

3.3 Pursuers are weapons
Police are effectively the player’s offensive mechanic.
The player should learn:
“If I turn here, that cop is going straight into that wall.”
3.4 Chaos should remain readable

Even with 10+ vehicles on screen, the player must immediately understand:
where they are
where they’re moving

where police are coming from

what can kill them

3.5 Failure should feel fair

Death should generally result from a mistake the player understands rather than unpredictable physics.

⸻

MVP scope

Do not build progression, upgrades, missions or monetization for the first milestone.

The first version contains:

1 player vehicle

1 arena

1 police vehicle

1 elite police variant

5 wanted levels

physics collisions

environmental obstacles
scoring
player health
police destruction
basic VFX
basic audio

game-over screen

instant restart

That’s enough to determine whether the game deserves further development.

⸻

Player vehicle

Movement

Player vehicle uses a Rigidbody-based arcade controller.

Do not rely heavily on realistic WheelColliders.
Core variables should be exposed in the Unity Inspector:
Acceleration
Maximum Speed
Turn Speed
Turn Curve
Lateral Grip
Drift Factor
Vehicle Mass
Collision Force
Drag
Angular Drag
Recovery Speed
These need to be extremely easy to tune.

⸻

Controls

Recommended first implementation:

Drag steering

Player touches anywhere on the lower portion of the screen.

Dragging horizontally controls steering.

← drag          turn left
→ drag          turn right
Vehicle accelerates automatically.
Steering should be relative rather than absolute.
The player should be able to lift their finger without immediately losing control.
Alternative to prototype
Test:
Hold left/right side of screen = steer left/right.
Don’t commit until both have been tested on a physical phone.
⸻
Drift system
Drifting should happen naturally when turning at speed.
No dedicated drift button.
At low speed:
high traction

At high speed:

reduced lateral traction

This produces controlled sliding.

Long drifts can optionally award score.

Example:

DRIFT
+120
LONG DRIFT
+340

But drift scoring is secondary to police destruction.

⸻
Police AI
Police should feel:
aggressive, predictable and slightly stupid.
They should not simply follow the player’s current position.
Instead, calculate an interception target based on player velocity.
Conceptually:
target =
playerPosition
+
playerVelocity * predictionTime
Police therefore try to cut the player off.
⸻
Police intelligence

Police intentionally have limited obstacle avoidance.

This is important.

Perfect navigation would make the game less fun.

Police should:

pursue aggressively

attempt interception

avoid obvious static obstacles

poorly account for other police
overshoot turns

collide with each other

occasionally take dangerous routes

This creates opportunities for the player.

⸻

Police destruction

Police can be destroyed by:

high-speed obstacle collisions

hitting another police vehicle

chain collisions

environmental hazards

The player does not have weapons.

Example scoring:

COP SMASHED
+250
DOUBLE SMASH
+600
TRIPLE SMASH
+1,000
PILEUP!
+2,000

Chain collisions should be heavily rewarded.

⸻

Wanted system

Wanted level controls difficulty.

★☆☆☆☆
★★☆☆☆
★★★☆☆
★★★★☆
★★★★★

Wanted level increases based primarily on survival time and score.
Level 1
2 police.
Slow and forgiving.

Level 2

3–4 police.

Slightly faster.

Level 3

5–6 police.

More aggressive interception.

Level 4

7–9 police.

Elite police introduced.
Level 5
Maximum chaos.
10+ police depending on device performance.

Elite units appear frequently.

The game should eventually become effectively impossible.

That’s intentional.

⸻

Elite police

The MVP only needs one special police type.

Interceptor

Visually distinct vehicle.
Characteristics:
faster than standard police
lower mass
aggressive prediction
sharp steering
easier to destroy in collisions

This creates a glass-cannon pursuer.

⸻

Player health

Use a simple health bar.

Example:
HULL
██████░░░░
Minor impacts:
small damage.

Heavy impacts:

large damage.

Extremely high-speed impacts:
potential instant destruction.
Police contact alone shouldn’t immediately kill the player.
This allows chaotic scrambles.
⸻
Arena
First arena should be compact.
Something roughly equivalent to:

ROCK

┌─────────────┐
│             │
│   ROCK      │
│             │
│       ███   │
│             │
│ ROCK        │
│         ROCK│
└─────────────┘

Obstacles need enough space between them for high-speed movement.

Avoid procedural generation initially.

Hand-design one good arena.
⸻
Environment
For the first visual theme, I’d use something other than water so we’re not cloning the reference too closely.
My preference:

Desert outlaw chase

Player is an outlaw escaping through a stylized desert environment.

Environment contains:

rock formations

cacti

barriers

abandoned vehicles

ramps

fences

small buildings

dust

destructible props

It also fits the chunky visual language you’re already exploring with Bolt Pit.

⸻

Camera

Top-down perspective camera.

Not completely vertical.

Something approximately:

55–70° downward angle.

Camera follows player with smoothing.

Camera should look slightly ahead in the player’s travel direction.

At high speed:

camera pulls back slightly.

At low speed:

camera moves closer.

⸻
Camera juice
Small camera effects make a large difference.
Light collision
Tiny shake.

Heavy collision

Strong short shake.

Police destruction

Shake + tiny freeze frame.

Example:

50–100 ms hit stop.
Large pileup

Slight zoom impulse + shake + particles.

Don’t overdo continuous shaking.

⸻

Visual style

Chunky stylized 3D.

Characteristics:

simplified geometry

exaggerated proportions

bright readable vehicles

soft lighting

minimal textures

strong silhouettes

exaggerated particles
Avoid realistic vehicle proportions.
Cars should feel almost toy-like.
⸻
VFX
Minimum MVP effects:
Player
dust trail
tire/skid marks
drift smoke

impact sparks

Police

siren lights

smoke when damaged

destruction explosion

debris

Environment

dust

destructible objects

impact particles

⸻
Collision feedback
Every significant collision should combine:
physics + particles + audio + camera response.
Major police destruction:
IMPACT
→ physics impulse
→ vehicle fragments/debris
→ sparks
→ smoke
→ camera shake
→ hit stop
→ sound
→ score popup
This interaction is one of the game’s main sources of satisfaction.
⸻
Score system

Score comes from:

ActionExample
Surviving+10/sec
Police destroyed+250
Driftvariable
Near miss+100
Double collision+600
Triple collision+1,000
Large pileup+2,000

Exact values should remain configurable.

⸻

Near misses

Optional for MVP but potentially valuable.

Detect when a police vehicle passes extremely close to the player at high relative velocity.

Display:

CLOSE CALL! +100

This rewards risky driving.

⸻

UI

During gameplay keep UI extremely minimal.

SCORE                          COINS
13,590                          14
★★★☆☆
WANTED
GAME
HULL
████████░░

No minimap initially.

Off-screen police can use subtle edge indicators.

⸻

Game over

When hull reaches zero:

brief slow motion.

Player crashes.

Then:

BUSTED
SCORE
24,850
BEST
31,220
[ AGAIN ]

Tapping anywhere could restart.

Avoid unnecessary menus between runs.

⸻

Audio

The soundscape should sell speed and collisions.

Required:

engine

tire squeal

police sirens
impact
metal crunch
debris
destruction
UI score sounds
wanted level increase

Sirens should become increasingly chaotic as wanted level increases.

⸻

Technical architecture

Suggested Unity structure:

GameManager
Player
├── PlayerController
├── VehiclePhysics
├── PlayerHealth
└── PlayerEffects
Police
├── PoliceController
├── PoliceAI
├── VehiclePhysics
├── PoliceHealth
└── PoliceEffects
Systems
├── SpawnManager
├── WantedManager
├── ScoreManager
├── AudioManager
├── CameraManager
└── PoolManager
UI
├── HUD
├── WantedUI
├── ScoreUI
├── HealthUI
└── GameOverUI

Avoid building an elaborate framework.

⸻
Object pooling
Police, particles and debris should use object pooling.
Avoid frequent:

Instantiate()
Destroy()

during gameplay.
Mobile performance should be considered from the beginning.
⸻
Performance target

Target:

60 FPS
on a mid-range modern iPhone/Android device.
Initial limits:

~12 active vehicles

~100 simple debris/particles

simple shadows

limited real-time lights

Performance should be tested on device early.

⸻
Development milestones
Milestone 1 — Greybox driving
Build:
empty arena
cube player
touch steering
acceleration
drifting

camera

Success criterion:

Driving around an empty arena feels satisfying.

Do not continue until it does.

⸻
Milestone 2 — The chase
Add:
one police vehicle
pursuit AI
interception
collisions
Success criterion:

Dodging one police car is entertaining.

⸻

Milestone 3 — Emergent chaos

Add:

multiple police

police-police collisions

obstacles

destruction

scoring

Success criterion:

Player can intentionally cause:

police → police
and
police → environment
collisions.
This is the critical milestone.
⸻
Milestone 4 — Escalation

Add:

wanted levels

spawning

difficulty scaling

interceptor

Now a run has an arc:

calm
↓
pressure
↓
chaos
↓
panic
↓
death

⸻

Milestone 5 — Juice
Add:
particles
camera shake
hit stop
skid marks

dust

sirens

collision sounds

score popups

⸻

Milestone 6 — Mobile build

Build for real devices.
Test:
controls
performance
readability
battery/thermal behaviour
different screen ratios
⸻
Milestone 7 — Decide whether to continue

At this point, stop development temporarily.

Don’t immediately build a garage and 37 unlockable cars.

Put the build in front of people.

The important questions are:

Do people immediately understand it?
Do they restart after dying?
Do they intentionally try to make cops crash?
Does “one more run” happen naturally?
If not, work on the core loop rather than adding content.
⸻
Phase 2 — only after validation
If the prototype works, then expand into:
Cars
↓
Coins
↓
Unlocks
↓
Challenges
↓
New arenas
↓
Special police
↓
Upgrades
↓
Daily challenges
↓
Leaderboards
Potential environments:
desert
city
docks
snow
industrial yard
airport
construction site
military base
And then there’s room for ridiculous police units: SUVs, armored vans, helicopters dropping roadblocks, etc.

I have opened a @[Unity CLI installation] project which we can work in. The art style of the game should be fun and cartoony and the action also over the top.
I have imported the Topdown engine into the project as well that we can use:
https://topdown-engine.moremountains.com/

I want the game to be optimized for mobile, but should work on desktop while testing.
````

## redpersongpt-284430

@redpersongpt · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/redpersongpt-284430) · [post](https://x.com/redpersongpt/status/2103807094554284430)

````text
Create a studio level motion design ad for my app mimicly. Show me the best you got.

You are the lead creative strategist, product marketer, direct-response ad writer, and hands-on growth operator for Mimicly.

Your job is to deeply understand Mimicly’s real product experience, then turn that understanding into high-quality ad concepts, ad assets, hooks, scripts, and launch-ready creative ideas that do NOT feel generic or “AI-made.”

IMPORTANT:
- Do not create generic “mockup app” marketing.
- Do not rely on assumptions.
- Base everything on Mimicly’s actual product, actual UI, and actual user flows.
- Use the real product as the source of truth.
- If you can access the website, App Store page, editor, simulator, screenshots, or any current product surfaces, inspect them directly before deciding anything.
- If you can capture screenshots, screen recordings, or UI references from the actual product, do it.
- Do not invent features that do not exist.
- Do not break what currently works.

PRODUCT YOU ARE WORKING ON
Mimicly is a chat mockup maker for screenshots, text stories, and dialogue videos.
It works on web and iPhone.
It offers 63 templates.
Users can edit both sides of conversations, names, profile photos, timestamps, colors, and supported UI details.
It includes chat templates, AI conversation templates, social-style templates, comment templates, stories, email, and game chat styles.
Supported exports include image export, and supported templates can also be recorded as MP4.
Users can sign in and get 3 free exports. Pro unlocks the full template collection and watermark-free exports.
Mimicly’s value is speed, realism, flexibility, and “make it look right” editing.

KNOWN PRODUCT FEEL / BRAND DIRECTION
- Clean, modern, product-led
- Useful, not cringe
- Creative-tool energy, not fake-hype startup nonsense
- Strong on realism and visual believability
- The appeal is: “I can quickly create convincing chat/mockup content for content creation, storytelling, skits, tutorials, memes, product demos, lessons, storyboards, and social posts.”

YOUR MISSION
Create a complete Mimicly ad-creative system based on the real product.

PHASE 1 — PRODUCT UNDERSTANDING
First, inspect and understand:
1. The public website
2. The App Store listing
3. The homepage messaging
4. The template browser / template categories
5. The editor experience
6. Preview behavior
7. Export flow
8. Paywall / free vs pro positioning
9. The visual feel of the app and web product
10. The strongest “wow” moments for first-time users

Pay special attention to:
- Homepage hero
- Template examples
- Live editor behavior
- The “before / after” feeling
- How realistic the previews look
- Which templates are most ad-worthy visually
- Which screens are easiest to understand instantly in an ad

If possible, capture a reference set of real visuals:
- app screenshots
- web screenshots
- editor screenshots
- preview screenshots
- export-related screens
- 5–15 second screen recordings of realistic usage

PHASE 2 — FIND THE BEST MARKETING ANGLES
Based on the real product, identify the strongest ad angles.

Find the best angles for users such as:
- content creators
- meme pages
- storytellers
- short-form video creators
- skit makers
- YouTubers / TikTok creators
- marketers making fake chat visuals for concepts/storyboards
- educators making lesson examples
- people creating “text story” style content
- people making AI conversation mockups
- people making social post mockups

For each angle, define:
- the user type
- the core desire
- the pain point
- why Mimicly solves it better
- the strongest visual proof
- the best CTA

PHASE 3 — CREATE A CREATIVE STRATEGY
Produce a clear creative strategy document containing:
1. Core positioning
2. Top 5 user personas
3. Top 10 ad angles
4. Top 20 hooks
5. Top 10 “visual demo” ideas
6. Top objections and how to answer them
7. Top App Store / landing page conversion messages
8. What NOT to say
9. Which claims need caution or proof
10. Which existing product features deserve the most emphasis

PHASE 4 — BUILD THE AD CONCEPTS
Create at least 12 strong ad concepts.

For each ad concept include:
- concept name
- target audience
- angle
- platform fit (TikTok / Instagram Reels / X / YouTube Shorts / App Store promo / website hero / paid social)
- first 2-second hook
- full ad script
- scene-by-scene shot list
- exact UI moments to show
- on-screen text
- voiceover
- caption
- CTA
- why this concept should perform

At least:
- 4 UGC-style concepts
- 4 product-demo concepts
- 2 comparison-style concepts
- 2 “problem → solution” concepts

PHASE 5 — USE THE REAL PRODUCT VISUALLY
Do not make fake-looking ads.

Use the actual Mimicly experience as much as possible:
- show opening the app / website
- show selecting a template
- show editing messages / names / profile photos / timestamps
- show the preview updating live
- show switching between templates where useful
- show export or save behavior where appropriate
- show the realism of the result

Focus heavily on visual proof.
The ad should make someone think:
“Wait, this actually looks clean.”
“Oh, I could use this.”
“That took like 10 seconds?”

PHASE 6 — PICK THE BEST TEMPLATES TO ADVERTISE
Review Mimicly’s template universe and choose the best templates for marketing.

Rank the most ad-worthy templates by:
- instant recognizability
- visual clarity
- emotional pull
- creator usefulness
- ability to demonstrate value quickly
- likelihood to convert cold traffic

Likely strong candidates may include:
- WhatsApp-style chats
- AI conversation templates (ChatGPT / Claude / Gemini style)
- Instagram / DM / comment / post type templates
- iMessage-style chats
- Discord-style chats
- story / social / dialogue video templates

But do not assume — inspect first.

For the top templates, say:
- why they are ad-worthy
- what kind of audience they attract
- what kind of ad should use them

PHASE 7 — CREATE REAL ASSETS OR ASSET BLUEPRINTS
If your environment allows it, create or organize:
- a shot plan
- a screenshot list
- a screen recording list
- asset naming
- folder structure
- recommended aspect ratios
- prioritized recording checklist

If you cannot directly produce the final ad assets, produce a near-production-ready blueprint so a human editor can build them fast.

Deliverables should include:
- 10 static ad ideas
- 10 short-form video ad ideas
- 5 App Store screenshot angle ideas
- 5 X/Twitter promo post ideas
- 5 landing page hero/message ideas
- 5 product-demo threads/carousels if relevant

PHASE 8 — COPYWRITING
Write launch-ready copy in a way that does not sound like AI slop.

Tone:
- sharp
- natural
- confident
- slightly punchy
- creator-friendly
- not overhyped
- not cringe
- not corporate

Write:
- 20 ad hooks
- 20 CTAs
- 15 captions
- 10 App Store / social proof style lines
- 10 short feature-value lines
- 10 landing page headlines
- 10 subheadlines

Avoid fake urgency unless justified.
Avoid saying it “goes viral.”
Avoid empty words like “revolutionary.”
Avoid generic “create stunning content” filler unless made specific.

PHASE 9 — CONVERSION FOCUS
Recommend which messages should push:
- install
- try free
- first export
- Pro conversion
- template exploration
- creator use cases

Map the best message to the best funnel stage.

Tell me:
- what gets the click
- what gets the install
- what gets the first successful export
- what gets the Pro upgrade

PHASE 10 — FINAL OUTPUT FORMAT
Give the final answer in this structure:

1. Mimicly product understanding
2. Best audiences
3. Best ad angles
4. Best templates to feature
5. 12 ad concepts
6. Shot list / capture plan
7. Copy bank
8. Landing page / App Store messaging suggestions
9. Recommended creative priorities
10. Top 3 things to test first

If possible, end with:
- “Best 3 concepts to make first”
- “Fastest assets to produce tomorrow”
- “Highest-upside experiment”

QUALITY BAR
The output must feel like it came from a strong product marketer who actually inspected the product, not from an LLM guessing what a mockup app might be.

Be specific.
Be practical.
Be visually aware.
Be conversion-aware.
Be ruthless about weak ideas.
Use the real Mimicly product as your source of truth.

Start by inspecting the real product surfaces, then build the strategy.
````

## niegramotny-197521

@_nieGRAMotny_ · threejs, shader, canvas, physics · [watch](https://skillry.dev/ai-videos/opus-5-5/niegramotny-197521) · [post](https://x.com/_nieGRAMotny_/status/2103128800909197521)

````text
Build a racing game inspired by Ignition (1997): angled top-down camera, arcade-leaning
physics, vehicles with very distinct personalities. This must be an original game,
not a copy. Use an original name, an original track, and zero original assets.

## Stack
- Vite + TypeScript (strict), Three.js for rendering, no UI framework
  (HUD in plain DOM/CSS).
- Low-poly graphics generated in code (BoxGeometry, CylinderGeometry, etc.),
  no external models or textures. Solid colors and simple materials.
- Custom simplified 2.5D physics (movement on the XZ plane, height from terrain).
  No physics engine.

## Architecture
- src/game/ (game loop with fixed timestep), src/vehicles/, src/track/, src/ai/,
  src/render/, src/ui/
- Vehicles are data-driven: mass, power, top speed, grip, steering, collision
  resistance, and boost parameters (strength, duration, recharge time).
  One Vehicle class, different configurations.
- Any vehicle can be controlled by either the player or the AI
  (shared control interface: throttle, brake, steer, boost).
- Track as data: centerline spline + width + list of zones
  (ice, shortcut, obstacle). Generate the road mesh and AI waypoints from it.

## Vehicles (original names, no brands)
Four vehicles. The player picks one on the selection screen; the remaining 3
are driven by the AI.
- 90s-style police sedan (black and white, light bar): heavy, stable,
  pushes hard in collisions.
- Muscle car convertible: fastest on straights, oversteers in corners.
- Red monster truck: slow, but ignores bumps and rams everything else.
- Postal delivery van: slow, high center of gravity, sways in corners.
The handling differences must be clearly noticeable. All four must be playable
and competitive. Slower vehicles compensate with e.g. collision resistance,
terrain handling, or a stronger or more frequent boost.

## Boost
- Every vehicle has a boost: a short, pronounced acceleration beyond its
  normal top speed.
- Boost charges automatically from 0 to 100%. It can only be used at 100%.
  After use, the meter drops to 0 and starts charging again.
- Strength, duration and recharge time are unique to each vehicle
  (e.g. muscle car: short and very strong; van: weaker but recharges fast;
  monster truck: long but slow to recharge).
- Visual effect while boosting: exhaust flame or trail, slight camera
  pull-back.
- The AI also uses boost, sensibly: on straights, not before sharp corners
  or on ice.

## Track
A mountain town with a Canadian feel, winter turning into spring thaw:
- closed loop, roughly 60–90 seconds per lap
- a waterfall visible from the track and a wooden bridge over a river
- a railroad crossing with a train passing periodically
  (collision = strong knockback, not game over)
- ice patches with reduced grip
- one shortcut (tight, risky); decorations: spruce trees, wooden houses, snow
- barriers or natural obstacles so vehicles can't get stuck off the track.
  Failsafe: if a vehicle (including bots) is stuck for more than ~4 s,
  automatically return it to the track at the last checkpoint.

## Gameplay
- 3 laps, standing grid start, 3-2-1 countdown
- AI follows waypoints with a driving style that depends on the vehicle,
  light rubber-banding, avoids obstacles, no teleporting (except the
  failsafe track return described above)
- Sliding comes purely from physics (grip, speed, ice), no handbrake
- Camera: top-down at ~50°, follows the player with a slight look-ahead
  in the direction of travel
- Controls: arrows/WASD (throttle, brake/reverse, steering), space = boost
- Screens: start → vehicle selection (model preview + stat bars, including
  boost) → race → results → restart (with option to change vehicle)

## HUD
- Position, lap, lap time, best lap, minimap.
- Boost meter styled as a car battery: rectangular casing with two terminals
  (+/−) on top, fill level rises as it charges. Color shifts from red through
  yellow to green. At 100% the battery clearly signals readiness (pulsing or
  glow, "BOOST" label or lightning bolt icon). While boosting, the meter
  drains quickly.

## Out of scope for v1
Sound, options menu, multiple tracks, multiplayer, save state.

## Workflow
1. First propose a plan and file structure, then implement in stages:
   (a) game loop + one vehicle on a flat plane, including boost,
   (b) track, (c) remaining vehicles and AI, (d) obstacles and train,
   (e) vehicle selection, HUD with battery meter, and screens.
2. After each stage run `npm run build` and fix type errors.
3. Add unit tests (Vitest) for vehicle physics, boost logic (charging,
   lockout below 100%, reset after use), and lap/position logic.
4. Finally: a README describing the controls and how to add a new track
   or vehicle.

## Acceptance criteria
`npm install && npm run dev` launches the game. You can pick any of the 4
vehicles and complete 3 laps against 3 bots. Each vehicle handles differently
and has a noticeably different boost. Boost only works with a full battery,
and bots use it too. The train and ice work. Results show the correct order.
Stable 60 FPS on an average laptop.
````

## op7418-814408

@op7418 · threejs, shader, canvas, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/op7418-814408) · [post](https://x.com/op7418/status/2103724883301814408)

````text
帮我做一个原创的手游「高光时刻」动效：[主体，例如：开宝箱 / 段位晋升 / 成就解锁 / Boss 掉落 / 角色升级]。
做成一个可以直接打开的单文件网页（HTML + CSS + JS），点一下就能完整播放，效果对标商业手游的结算 / 奖励演出。

【世界观与风格】
- 原创美术，不要模仿任何现有游戏的 IP、角色或 Logo。
- 卡通手游风：高饱和配色，统一的深色描边（例如 #1A1033），圆润厚重的造型。
- 配色随等级升级：[等级阶梯，例如：普通绿 → 稀有蓝 → 史诗紫 → 传说金]。每升一级都要切换主色、光效颜色和背景色调。
- 标题用圆胖的游戏字体（如 Titan One / Lilita One），描黑边，加投影；文字逐字「砸」进画面，带回弹。

【主体物：做成真 3D】
- 用 Three.js 建模，不要用平面 SVG 贴图。要有厚度、倒角，以及符合主体的结构细节（木板缝、铆钉、包边、宝石切面、锁扣等）；木板缝这类细节用真实几何体拼出来，不要贴黑线条。
- 着色用卡通分阶（MeshToonMaterial 加 3～4 阶的渐变贴图），配三种灯光：主光、天光、等级色的轮廓光。
- 描边用后期边缘检测：渲染法线图 + 深度图，再用着色器画线。外轮廓粗、零件交界细，粗细全程一致；另外做 1.5 倍超采样和多重采样抗锯齿。
  不要用「放大一圈的黑色背面」那种描边，那样粗细不均、转角会断。
  深度判断的阈值要放宽，接缝主要靠法线判断，否则斜着看的表面会冒出细碎斜纹。
- 活动部件要真实运动，比如箱盖绕铰链翻开、奖章绕竖轴旋转。
- 待机时主体缓慢左右转动，让人看到侧面和厚度，同时轻微上下浮动；脚下要有随高度变化的柔和投影。

【如果画面里有 2D 插画（卡面、奖励图标、角色）】
- 三层卡通着色：底色、成块的阴影色、高光色，不要只用一层渐变。
- 线条分粗细：外轮廓粗，内部结构线细。
- 每个角色或物件要有自己的表情和姿态，不要所有东西共用同一张脸。
- 脚下画投影，让主体「站」在画面里；背景按属性区分图案，不要全用同一套放射线。

【演出节奏：五个阶段，缺一不可】
1. 预备：主体待机浮动，每隔几秒抖一下提示可以点击，底部显示「点击」提示。
2. 升级：每点一次，主体跳起、在空中转一圈、落地时压扁再回弹；同时切换到下一等级的颜色，闪一下光，冒一圈粒子，标题更新。
3. 蓄力（约 1 秒）：主体越抖越剧烈，缝隙透出光，四周粒子往中心吸，音效音调持续上升；最后一刻猛地压扁。
4. 爆发：从爆点向外扩散的泛光闪白、屏幕震动、镜头往前一推、多层冲击波、细长流光迸射、闪光星点、金币和宝石（带旋转）。高等级的爆发要明显更强。彩带只在最高潮用一次，不要满屏彩带。
5. 揭晓与结算：
   - 奖励卡片从主体里沿弧线飞出，落位时带超调和晃动收尾，数字滚动计数。
   - 稀有物品带彩虹流光边框和「NEW!」角标。
   - 点击领取后，金币和宝石沿贝塞尔曲线飞进右上角的余额，每到一个余额就跳一下。

【揭晓舞台：让主角独占画面】
- 最高稀有度揭晓时，其他元素收起或淡出，背后换成一层干净的渐变幕布加缓慢旋转的柔光，不要让主角压在杂乱的背景上。
- 幕布出现时，把场景里的其他 3D 物件隐藏掉，否则后期描边会把它们的轮廓线画在幕布上。
- 主角的外发光要放在主体背后，只从边缘溢出，不能盖在主体前面把它糊成一片白。
- 可以加一圈围绕主角盘旋的星尘拖尾，但轨道必须完整在主角轮廓外侧，不能从主体正面扫过。

【光效：必须柔和，不能有硬边】
- 背景光芒：用带渐变过渡的 conic-gradient，不要一刀切的色块边缘；叠 2～3 层不同密度、不同转速的光。
- 光柱：由 5～7 道带模糊的光束呈扇形散开，亮度各自轻微闪动；根部加一团柔光核心，光里有光尘缓慢上飘。
- 闪白：从爆点向外的径向泛光（mix-blend-mode: screen），强度不超过 0.8，不要整屏纯白过曝。
- 粒子：每个火花都带一圈低透明度的外晕；冲击波用三层描边（宽而淡、中等、细而亮）。

【材质与界面】
- 边框、名牌、按钮要有材质感：金属拉丝渐变、左上亮右下暗的倒角光、内阴影；按稀有度换镶嵌件（钢铆钉 → 银框宝石 → 金框钻石加小王冠）。
- 小卡片上不要塞小字数值；详细数值放到揭晓时的信息面板里，面板里的数字滚动上涨，并弹出「▲+数值」。
- 画在 Canvas 上的贴图，分辨率至少是屏幕上最大显示尺寸的 1.5 倍，否则放大时会发虚。

【动画原则】
- 用 GSAP 时间线编排。所有动作都要有挤压拉伸、超调和弹性回弹，不要匀速。
- 粒子系统用 Canvas 2D 自己写：重力、阻力、生命周期、叠加混合，以及「吸入」「曲线飞行」「环绕」三种运动。
- 不要用 CSS 3D 透视去翻转大尺寸元素，放大加侧翻时会被投影成铺满屏幕的平面，3D 翻转一律放在 WebGL 里做。
- 所有「抖动」「呼吸」类的循环补间，在状态切换时要先取消再归零，避免它比停止指令晚一帧结束，又把值设回去。

【音效】
- 全部用 Web Audio 实时合成，不用音频文件：跳起、落地、升级和弦、蓄力上升音、爆炸低频加噪声、弹出音、计数滴答、金币叮当、胜利号角。
- 第一次点击时才初始化音频；右上角放静音开关。

【界面与工程】
- 顶部 HUD：模式切换、金币和宝石余额、静音按钮。
- 手机宽度也要能用；遵守「减少动态效果」设置（关闭震屏，减少粒子）。
- 动画状态机要严谨：动画播放中忽略点击，不能出现点击被吞或状态错乱。
- 目标 60fps。第一次打开时就是完整的待机画面，不能是空白。

【交付前自检】
在蓄力、爆发、揭晓、结算这几个时刻各截一张图，逐张检查：
- 主角有没有被光晕、粒子或文字挡住？
- 有没有过曝成一片白？
- 背景是否杂乱，有没有穿帮的描边线？
- 小字是否能看清？
- 结算后是否还有东西在不该动的时候继续抖动？

最后告诉我：每个阶段的时长，以及哪些参数可以调整演出强度。
````

## op7418-818226

@op7418 · canvas, svg, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/op7418-818226) · [post](https://x.com/op7418/status/2104085484347818226)

````text
帮我做一个原创的手游「高光时刻」动效：[主体，例如：开宝箱 / 段位晋升 / 成就解锁 / Boss 掉落 / 角色升级]。
做成一个可以直接打开的单文件网页（HTML + CSS + JS），点一下就能完整播放，效果对标商业手游的结算 / 奖励演出。

【世界观与风格】
- 原创美术，不要模仿任何现有游戏的 IP、角色或 Logo。
- 卡通手游风：高饱和配色，统一的深色描边（例如 #1A1033），圆润厚重的造型。
- 配色随等级升级：[等级阶梯，例如：普通绿 → 稀有蓝 → 史诗紫 → 传说金]。每升一级都要切换主色、光效颜色和背景色调。
- 标题用圆胖的游戏字体（如 Titan One / Lilita One），描黑边，加投影；文字逐字「砸」进画面，带回弹。

【主体物：做成真 3D】
- 用 Three.js 建模，不要用平面 SVG 贴图。要有厚度、倒角，以及符合主体的结构细节（木板缝、铆钉、包边、宝石切面、锁扣等）；木板缝这类细节用真实几何体拼出来，不要贴黑线条。
- 着色用卡通分阶（MeshToonMaterial 加 3～4 阶的渐变贴图），配三种灯光：主光、天光、等级色的轮廓光。
- 描边用后期边缘检测：渲染法线图 + 深度图，再用着色器画线。外轮廓粗、零件交界细，粗细全程一致；另外做 1.5 倍超采样和多重采样抗锯齿。
  不要用「放大一圈的黑色背面」那种描边，那样粗细不均、转角会断。
  深度判断的阈值要放宽，接缝主要靠法线判断，否则斜着看的表面会冒出细碎斜纹。
- 活动部件要真实运动，比如箱盖绕铰链翻开、奖章绕竖轴旋转。
- 待机时主体缓慢左右转动，让人看到侧面和厚度，同时轻微上下浮动；脚下要有随高度变化的柔和投影。

【如果画面里有 2D 插画（卡面、奖励图标、角色）】
- 三层卡通着色：底色、成块的阴影色、高光色，不要只用一层渐变。
- 线条分粗细：外轮廓粗，内部结构线细。
- 每个角色或物件要有自己的表情和姿态，不要所有东西共用同一张脸。
- 脚下画投影，让主体「站」在画面里；背景按属性区分图案，不要全用同一套放射线。

【演出节奏：五个阶段，缺一不可】
1. 预备：主体待机浮动，每隔几秒抖一下提示可以点击，底部显示「点击」提示。
2. 升级：每点一次，主体跳起、在空中转一圈、落地时压扁再回弹；同时切换到下一等级的颜色，闪一下光，冒一圈粒子，标题更新。
3. 蓄力（约 1 秒）：主体越抖越剧烈，缝隙透出光，四周粒子往中心吸，音效音调持续上升；最后一刻猛地压扁。
4. 爆发：从爆点向外扩散的泛光闪白、屏幕震动、镜头往前一推、多层冲击波、细长流光迸射、闪光星点、金币和宝石（带旋转）。高等级的爆发要明显更强。彩带只在最高潮用一次，不要满屏彩带。
5. 揭晓与结算：
   - 奖励卡片从主体里沿弧线飞出，落位时带超调和晃动收尾，数字滚动计数。
   - 稀有物品带彩虹流光边框和「NEW!」角标。
   - 点击领取后，金币和宝石沿贝塞尔曲线飞进右上角的余额，每到一个余额就跳一下。

【揭晓舞台：让主角独占画面】
- 最高稀有度揭晓时，其他元素收起或淡出，背后换成一层干净的渐变幕布加缓慢旋转的柔光，不要让主角压在杂乱的背景上。
- 幕布出现时，把场景里的其他 3D 物件隐藏掉，否则后期描边会把它们的轮廓线画在幕布上。
- 主角的外发光要放在主体背后，只从边缘溢出，不能盖在主体前面把它糊成一片白。
- 可以加一圈围绕主角盘旋的星尘拖尾，但轨道必须完整在主角轮廓外侧，不能从主体正面扫过。

【光效：必须柔和，不能有硬边】
- 背景光芒：用带渐变过渡的 conic-gradient，不要一刀切的色块边缘；叠 2～3 层不同密度、不同转速的光。
- 光柱：由 5～7 道带模糊的光束呈扇形散开，亮度各自轻微闪动；根部加一团柔光核心，光里有光尘缓慢上飘。
- 闪白：从爆点向外的径向泛光（mix-blend-mode: screen），强度不超过 0.8，不要整屏纯白过曝。
- 粒子：每个火花都带一圈低透明度的外晕；冲击波用三层描边（宽而淡、中等、细而亮）。

【材质与界面】
- 边框、名牌、按钮要有材质感：金属拉丝渐变、左上亮右下暗的倒角光、内阴影；按稀有度换镶嵌件（钢铆钉 → 银框宝石 → 金框钻石加小王冠）。
- 小卡片上不要塞小字数值；详细数值放到揭晓时的信息面板里，面板里的数字滚动上涨，并弹出「▲+数值」。
- 画在 Canvas 上的贴图，分辨率至少是屏幕上最大显示尺寸的 1.5 倍，否则放大时会发虚。

【动画原则】
- 用 GSAP 时间线编排。所有动作都要有挤压拉伸、超调和弹性回弹，不要匀速。
- 粒子系统用 Canvas 2D 自己写：重力、阻力、生命周期、叠加混合，以及「吸入」「曲线飞行」「环绕」三种运动。
- 不要用 CSS 3D 透视去翻转大尺寸元素，放大加侧翻时会被投影成铺满屏幕的平面，3D 翻转一律放在 WebGL 里做。
- 所有「抖动」「呼吸」类的循环补间，在状态切换时要先取消再归零，避免它比停止指令晚一帧结束，又把值设回去。

【音效】
- 全部用 Web Audio 实时合成，不用音频文件：跳起、落地、升级和弦、蓄力上升音、爆炸低频加噪声、弹出音、计数滴答、金币叮当、胜利号角。
- 第一次点击时才初始化音频；右上角放静音开关。

【界面与工程】
- 顶部 HUD：模式切换、金币和宝石余额、静音按钮。
- 手机宽度也要能用；遵守「减少动态效果」设置（关闭震屏，减少粒子）。
- 动画状态机要严谨：动画播放中忽略点击，不能出现点击被吞或状态错乱。
- 目标 60fps。第一次打开时就是完整的待机画面，不能是空白。

【交付前自检】
在蓄力、爆发、揭晓、结算这几个时刻各截一张图，逐张检查：
- 主角有没有被光晕、粒子或文字挡住？
- 有没有过曝成一片白？
- 背景是否杂乱，有没有穿帮的描边线？
- 小字是否能看清？
- 结算后是否还有东西在不该动的时候继续抖动？

最后告诉我：每个阶段的时长，以及哪些参数可以调整演出强度。
````

## zacxbt-944604

@zacxbt · canvas, pixel, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/zacxbt-944604) · [post](https://x.com/zacxbt/status/2103808699466944604)

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

## godsboy7777-150194

@GodsBoy7777 ·  · [watch](https://x.com/GodsBoy7777/status/2103117450854150194) · [post](https://x.com/GodsBoy7777/status/2103117450854150194)

````text
Build a single self-contained HTML file: a 3D marble computer, in the spirit of Wintergatan's marble machine and the Digi-Comp II, that adds two 4-bit numbers using nothing but marbles falling through mechanical toggles.

Hard rules:

1. One HTML file. Three.js from https://t.co/KCQbEZLusb via an import map, plus its OrbitControls addon. No other libraries, no physics engine, no external assets.

2. The mechanism is the computer. Each bit of the result is stored in a two-state toggle (flip-flop) that a marble physically flips as it passes. Carries happen because a marble leaving one toggle rolls on to the next. Do not compute the answer in JavaScript arithmetic anywhere. The displayed result must be read from the toggle states after the last marble stops.

3. Marbles move along tracks with believable gravity and timing. Nothing teleports. You may script motion along paths, but every toggle flip must be caused by a marble arriving at it.

4. Input: two rows of four switches (A and B, 0 to 15), set by clicking. A lever labelled RUN releases the marbles. A counter shows how many marbles have fallen.

5. Output: a row of five result toggles, most significant bit on the left, and a readout that shows the binary and decimal value read from those toggles.

6. A DEMO button runs 5+6, then 9+7, then 15+15, resetting between runs, so it can be screen-recorded without touching anything.

7. Looks: a wooden board, brass toggles, glass marbles, warm studio lighting, soft shadows, a slow camera that follows the busiest part of the machine. It should look good in a square 1080x1080 recording.

8. Short click sounds via the Web Audio API when a toggle flips, started only after the first user click.

9. It must run at 60 fps on a normal laptop and have no console errors.

Output only the complete HTML file.
````

## egeberkina-949521

@egeberkina ·  · [watch](https://x.com/egeberkina/status/2105029713445949521) · [post](https://x.com/egeberkina/status/2105029713445949521)

````text
Create a visually stunning 60-second video explaining how an earthquake happens through an interactive tectonic sandbox.

Make it feel like we are watching someone explore a beautiful real-time simulation, not a slideshow or traditional educational video.

Start with a clean 3D cross-section of Earth’s crust. Two tectonic plates slowly move against each other. Visualize the fault between them and show friction locking the plates while stress gradually builds.

As pressure increases, make the simulation more intense: rock layers deform, stress zones glow, subtle vibrations begin, and a live seismograph starts reacting.

Then trigger the earthquake. The fault suddenly slips and releases a massive burst of energy. Show seismic waves radiating outward through the ground, then transition upward to the surface where the landscape and a small city begin shaking.

Visualize P-waves and S-waves traveling differently through the Earth, followed by the strongest surface waves. Show buildings reacting differently depending on distance from the epicenter.

End by zooming back underground to reveal smaller aftershocks around the fault, then pull out to show the complete tectonic system.

Use cinematic motion graphics, satisfying physics simulations, dramatic scale transitions, premium 3D scientific visualization, minimal typography, dynamic labels, smooth UI overlays and seamless transitions.

The pacing should constantly evolve and reveal something new every few seconds so the full 60 seconds stays visually engaging.

Make it feel like an Apple-quality interactive science visualization turned into a cinematic motion-design video.
````

## curieuxexplorer-016717

@CurieuxExplorer ·  · [watch](https://x.com/CurieuxExplorer/status/2103373314354016717) · [post](https://x.com/CurieuxExplorer/status/2103373314354016717)

````text
Rebuild Type 1 diabetes in one HTML file, from the whole body down to a single molecule.

THE BROKEN MESSAGE

Type 1 diabetes isn't caused by sugar, weight or lifestyle. It's autoimmune: the immune system destroys the beta cells in the pancreas that make insulin.

Those cells live in tiny clusters called islets, about 1–2% of the pancreas. After a meal, they sense rising glucose and release insulin. Insulin signals muscle and fat to take glucose in, and tells the liver to release less.

In Type 1, that signal disappears.
The fuel is still there. The message is missing.
So glucose builds up in the blood.

With almost no insulin, the body breaks down fat fast and the liver makes ketones. They can build up into diabetic ketoacidosis (DKA), a medical emergency.

Insulin therapy doesn't cure Type 1. It replaces a signal the body can no longer provide adequately, through injections or a pump. The daily challenge is balance: too little and glucose rises, too much and it can fall dangerously low. Food, exercise, stress and timing all change the picture.

Technology helps. A CGM tracks glucose every few minutes, and automated insulin delivery (AID) adjusts insulin based on those readings.

In the build, you can compare Healthy vs Type 1 vs Type 1 + insulin on the same meal, drag one slider from INTACT to BROKEN to watch the signal fade, follow a glucose molecule through the body, and explore CGM, pumps and AID.

Type 1 diabetes changes the system.
It doesn't define the person.

Built in Three.js. Educational visualization, not medical advice.
````

## gandamu-ml-220530

@gandamu_ml · threejs, shader, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/gandamu-ml-220530) · [post](https://x.com/gandamu_ml/status/2102919394775220530)

````text
I would like you to create a kickass, impressive 1990s style demoscene demo using this S3M track as the music. Prior to getting to work, please see how to best play and analyze the S3M track. This will be important since synchronization of effects and appropriateness of scenes to the musical vibe (and this song does have a variety of sections with different attitude) is essential to a great demoscene demo. Also prior to getting started, please research what kinds of effects, physics, etc. would be good to use in combination. Please use C/C++ -- with appropriate demoscene/embedded/console gamedev sensibilities to avoid needlessly bloating compile times -- with OpenGL. In some cases, blitting to surfaces in realtime may be appropriate.. while in others, using OpenGL or even shaders is appropriate as well. It should be planned and polished to be spectacular and shocking. This is Claude's way of really showing off to the world that it kicks ass.
````

## mrkindey-267498

@MrKindey ·  · [watch](https://x.com/MrKindey/status/2107817784432267498) · [post](https://x.com/MrKindey/status/2107817784432267498)

````text
No plugins, no app, just a single HTML file running Three.js on WebGPU.

It's an interactive 3D house that builds itself in five stages: Foundation → Skeleton → Systems → Envelope → Finished. Every part has its own window on the timeline, so you can scrub through the construction like a video.

What's inside:
→ X-ray mode that makes the structure transparent and shows the water, power, sewage and airflow routes, with filters for each system
→ Explode, to pull the layers apart
→ Cut, a section plane that slices through the building
→ Dusk, a lighting switch to see it at night
→ Instanced vegetation, so a dozen olive trees cost almost nothing to render
→ Callouts and preset cameras for each stage

The subject is a traditional hillside villa, but the format works for any building. A developer could show a buyer exactly what's behind the walls before a single wall exists.
````

## aichrislee-938609

@aichrislee ·  · [watch](https://x.com/aichrislee/status/2108347412636938609) · [post](https://x.com/aichrislee/status/2108347412636938609)

````text
Build me a Saturn V rocket in interactive 3D, in one HTML file with Three.js.

Make it look real: the white and black rocket standing on the launch pad, and inside it the parts you never get to see. The five giant F-1 engines at the bottom, the fuel and oxygen tanks in each stage, the second and third stages with their own engines, the lunar lander tucked in under the nose, the command module where the astronauts sit, and the escape tower on top. The engines glow and roar with fire and smoke. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart along the rocket with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.
````

## aichrislee-922082

@aichrislee ·  · [watch](https://x.com/aichrislee/status/2107260223907922082) · [post](https://x.com/aichrislee/status/2107260223907922082)

````text
Build me a V8 car engine in interactive 3D, in one HTML file with Three.js.

Make it look real: the engine block with its two banks of cylinders in a V, the pistons and connecting rods, the crankshaft, the camshafts and valves on top, the intake manifold and the exhaust headers glowing hot. The pistons pump up and down, the crankshaft turns, and the spark plugs flash when each cylinder fires. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.
````

## bilimfili1-459762

@Bilimfili1 · canvas, svg · [watch](https://skillry.dev/ai-videos/opus-5-5/bilimfili1-459762) · [post](https://x.com/Bilimfili1/status/2103743617848459762)

````text
Make a 45–50 second vertical video for my app: a glance inside the app.
Show every feature, use motion, be creative. I want it good enough for your CV.

- Real, not mocked: record each feature being used in the simulator (tap a filter, open a result, add it).
- Stretch your imagination: let each feature break out of the phone and change the world around it.
- The bar: a motion designer's showreel piece. The best motion you can do. Go all out.
- Nothing made up: every number and label on screen comes from the recordings.
- No stock sound effects; I'll add the music.
- Keep text clear of the TikTok/Instagram interface.
- Let viewers follow: each feature stays on screen for at least 2.5 seconds.
````

## lexnlin-241739

@LexnLin · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/lexnlin-241739) · [post](https://x.com/LexnLin/status/2103194052850241739)

````text
Create a cinematic browser-based 3D world that can be explored freely with a camera, focused on breathtaking landscapes and extraordinary original architecture. Fill the world with huge strange buildings, monumental structures, surreal ruins, cliffs, valleys, forests, water, and unusual ultra-detailed forms that feel mysterious and awe-inspiring. This is not a game and not combat-focused, the goal is pure exploration, atmosphere, composition, and visual discovery. Make the world feel epic, highly detailed, and completely original, with architecture that looks weird, ambitious, and unforgettable.
````

## aichrislee-479847

@aichrislee ·  · [watch](https://x.com/aichrislee/status/2106535528149479847) · [post](https://x.com/aichrislee/status/2106535528149479847)

````text
Build me a jet engine in interactive 3D, from intake to exhaust, in one HTML file with Three.js.

Make it look real: the big front fan, the compressor stages, the combustion chamber glowing inside, the turbine and the nozzle. The fan and the shafts spin. I can drag to orbit around it and scroll to zoom.

Add an Explode button. When I press it, every part slides apart along the engine's axis with its name on a label. Press it again and it all snaps back together. When I hover a part, it lights up and shows one line on what it does.

No images. Do not ask me any questions. Just build it.
````

## apoorvjain25-945542

@apoorvjain25 ·  · [watch](https://x.com/apoorvjain25/status/2104818940467945542) · [post](https://x.com/apoorvjain25/status/2104818940467945542)

````text
make a 20-second video about anything, your call; make it crazy. The photon is born in the Sun's core and bounces around for up to 170,000 years before it gets out. Then it takes 8 min 19 s to reach Earth, passing Mercury and Venus at their real light travel times, and ends up aimed at your pupil. Built in Remotion with no stock footage and no images. Everything is drawn in code. The soundtrack is synthesised from scratch by a Node script that reads the same bounce data as the animation, so every bounce you see is a click you hear.
````

## arixxbt-292438

@arixxbt ·  · [watch](https://x.com/arixxbt/status/2108541814718292438) · [post](https://x.com/arixxbt/status/2108541814718292438)

````text
Create an interactive zen garden simulation in a single HTML file. Implement a 1536px heightmap on a 440x440 grid for the sand. Allow users to drag across the sand to cut grooves (5 grooves and 6 ridges per stroke) along their path. Include 5 mossy rocks, 2 stone lanterns, and a maple tree with 420 leaves. Add a time-of-day toggle; when set to golden hour, drop the sun low so every groove throws a shadow. Ensure the rendering handles moss visibility through sand and prevents blocky rocks or out-of-frame lanterns.
````

## threeaus-886343

@threeaus ·  · [watch](https://x.com/threeaus/status/2105152377057886343) · [post](https://x.com/threeaus/status/2105152377057886343)

````text
15s studio motion-design reel, 1920x1080.
Warm off-white, black type, one orange accent only.
A single orange circle with motion blur is the through-line and the cut.
Show: toggle click, the word Motion, shape morphs, dotted connector, rounded diamond, circular kinetic type (KINETIC TYPE · 3D · LOOPS · SPRINGS · EASING), dot grid, then the card “Opus 5.5 / Motion designer. / 0 keyframes”.
Springs, no glow, no particles, no default easing.
Looks like a refined product-studio showreel, not an AI trailer.
````

## abyssalld-602690

@abyssallD ·  · [watch](https://x.com/abyssallD/status/2106434250467602690) · [post](https://x.com/abyssallD/status/2106434250467602690)

````text
One prompt: a video of all progress, then n years into the future. A painted rocket, not a white tube. White nose. White body. A black band with a white triangle. Another dark ring lower down. Panel lines on the nose once the onboard camera looks straight down. Then the broadcast. Countdown. Water on the deck. Ignition. The tower drops away. Long tracker. Beach shot as it goes supersonic. Nine cameras. A clock that actually moves. Max-q on the overlay like a real feed.
````

## drake5112-661428

@Drake5112 ·  · [watch](https://x.com/Drake5112/status/2108394129000661428) · [post](https://x.com/Drake5112/status/2108394129000661428)

````text
Create an interactive HTML presentation explaining the concept of 'Network Effects' where connections grow exponentially as user count increases (e.g., 5x users = 27x connections). The interface should include a slider allowing the viewer to manually adjust the number of users and see the resulting change in connection density in real-time. Use only HTML and JavaScript without external image assets. Include voice narration synchronized with the visual changes.
````

## gkxspace-923139

@gkxspace ·  · [watch](https://x.com/gkxspace/status/2105260627937923139) · [post](https://x.com/gkxspace/status/2105260627937923139)

````text
<role>   You are a pixel animator and game feel designer who also writes chiptune music. What you create with code should look like hand-drawn character animation from a top-tier 16-bit era studio, not scaled-down vector graphics.   </role> <inputs>   The following are defaults, start working directly without asking me:   - Title: "The 99th Spell"   - Resolution: 1920×1080, 60fps, duration exactly 16 seconds</inputs>
````

## tarunyadav9761-053244

@tarunyadav9761 ·  · [watch](https://x.com/tarunyadav9761/status/2106435688292053244) · [post](https://x.com/tarunyadav9761/status/2106435688292053244)

````text
Create a promo video from scratch with zero templates.
• Built and run the native macOS app to capture real 2x Retina screenshots
• Script and time a full voiceover with word-level kinetic captions
• Write a procedural synth engine for the background track and SFX
• Animate 12 scenes in Remotion with 3D perspective tilts and spring physics
• Render a full 1080p 60fps cut ready for X
````

## artless101-964679

@Artless101 ·  · [watch](https://x.com/Artless101/status/2103303449831964679) · [post](https://x.com/Artless101/status/2103303449831964679)

````text
Create a cinematic, highly detailed, interactive 3D rocket launch from an ocean platform at dawn. Deliver the complete project in one HTML file that opens directly in Chrome. Use Three.js + WebGL and procedural assets. Embed assets wherever practical; a reliable CDN may
````

## spacyapps-157886

@SpacyApps · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/spacyapps-157886) · [post](https://x.com/SpacyApps/status/2105833401127157886)

````text
Build "Jelly Dice": a single self-contained HTML file (all JS/CSS inline, no build step) with translucent gummy-candy dice that behave like real soft bodies. Render with raw WebGPU (WGSL shaders, no three.js). If WebGPU is unavailable, show a clean fallback card that
````

## adomicael-707503

@adomicael ·  · [watch](https://x.com/adomicael/status/2104977482818707503) · [post](https://x.com/adomicael/status/2104977482818707503)

````text
Create an interactive explainer animation showing what happens when you ask an AI a question. Visualize the path from a phone, through fiber optic cables across the US, into a data center, passing through 8 GPUs, down to a single transistor, and back with the answer.
````

## theparuchh-013286

@theparuchh ·  · [watch](https://x.com/theparuchh/status/2105009470292013286) · [post](https://x.com/theparuchh/status/2105009470292013286)

````text
Build "Time, Undone." - a single self-contained HTML file (embedded JS and CSS) running a genuine WebGPU + WGSL interactive 3D mechanical watch that takes itself apart as you scroll, while it keeps running. No 3D engine libraries; all geometry is generated in code.
````

## ivanainai-245918

@ivanainai ·  · [watch](https://x.com/ivanainai/status/2106481339193245918) · [post](https://x.com/ivanainai/status/2106481339193245918)

````text
Create a beautiful, interactive 3D browser artwork of a single stained-glass hibiscus flower.
Use the attached leaf as a reference for material delicacy, intricate veins, translucent colours and restrained presentation. Create an original flower composition.
````

## gigabit-million-959719

@gigabit_million ·  · [watch](https://x.com/gigabit_million/status/2104068536041959719) · [post](https://x.com/gigabit_million/status/2104068536041959719)

````text
Please create introductory news about games released on Steam from September 25th to September 26th. From a gamer's perspective, highlight what seems interesting about each game in an easy-to-view manner. Make it a motion graphics video of about 60 seconds.
````

## 0xchuckstock-879327

@0xChuckstock · threejs, shader, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/0xchuckstock-879327) · [post](https://x.com/0xChuckstock/status/2103804606794879327)

````text
A 3D multiplayer game where the players are a squad of x-wings taking on a star destroyer. They pilot their ships to take out key components of the star destroyer while also dealing with guns mounted on the star destroyer and waves of tie fighters.
````

## techartist-697078

@techartist_ ·  · [watch](https://x.com/techartist_/status/2107514291213697078) · [post](https://x.com/techartist_/status/2107514291213697078)

````text
Create a physics simulation of a Rube Goldberg inspired machine where a marble ends up toppling a 1.8m domino. Use Three.js + Rapier. A falling domino can knock over one 1.5× its size, so ten growing dominoes carry the push from desk to room scale.
````

## typingmusou-160705

@Typingmusou ·  · [watch](https://x.com/Typingmusou/status/2103452241848160705) · [post](https://x.com/Typingmusou/status/2103452241848160705)

````text
①remotion + three.jsを使って 30秒のCM風の動画を作りたいので構成を考えてください。〇〇（自分が作りたいイメージを書いた方がいいです！今回は”ただ打つだけのつまらないタイピングゲームから楽しく練習ができるタイピングゲームであることを伝えるものにしたいです”と大体で指示しました）

②技術を深掘りして調べてどんなものが作れるかや使えそうなskillsを調べて欲しいです。構成については再度考えて細かく考えて欲しいです。

③考えたのを元にして実際に動画を作成してください
````

## techartist-021472

@techartist_ ·  · [watch](https://x.com/techartist_/status/2105350783416021472) · [post](https://x.com/techartist_/status/2105350783416021472)

````text
Create an interactive 3D house animation showing the construction process from Foundation through Skeleton, Systems and Envelope to Finished. Include an X-ray view that reveals the plumbing, power and air inside. Use Three.js and WebGPU.
````

## curieuxexplorer-320803

@CurieuxExplorer ·  · [watch](https://x.com/CurieuxExplorer/status/2104900418174320803) · [post](https://x.com/CurieuxExplorer/status/2104900418174320803)

````text
Create an interactive AI film titled 'The Humanity Machine'. 60 seconds, single HTML file. The film ends but the world stays with controls. Push AI capability to 100% causing parts of the world to turn red.
````

## deifosv-786581

@deifosv · canvas, gsap, css · [watch](https://skillry.dev/ai-videos/opus-5-5/deifosv-786581) · [post](https://x.com/deifosv/status/2103197522382786581)

````text
Create a high energy launch video, showing live stats from the website, show that users can play on desktop and mobile and multiple themes, if need, give me a prompt to generate the song using Suno
````

## atif-0075-639088

@atif_0075 ·  · [watch](https://x.com/atif_0075/status/2107568937764639088) · [post](https://x.com/atif_0075/status/2107568937764639088)

````text
Build a cow entirely with math and code running live in the browser. No 3D model, no animation file, no keyframes. Every muscle, hoof and tail flick must be calculated via physics simulation.
````

## pagustafsson-566609

@pagustafsson ·  · [watch](https://x.com/pagustafsson/status/2108936279081566609) · [post](https://x.com/pagustafsson/status/2108936279081566609)

````text
Create a real-time Krakatoa volcano animation 🌋 in one HTML file using pure WebGL2. Implement realistic 3D Navier–Stokes fluid simulation for the smoke and dynamic lava flow effects.
````

## otatechie-035448

@otatechie ·  · [watch](https://x.com/otatechie/status/2103257988895035448) · [post](https://x.com/otatechie/status/2103257988895035448)

````text
Animate the moonwalk dance. Draw every frame, the character, the physics of the glide, camera cuts on the beat, and generate an original soundtrack in a single HTML file.
````

## jakubantowski-020905

@JakubAntowski ·  · [watch](https://x.com/JakubAntowski/status/2105245285916020905) · [post](https://x.com/JakubAntowski/status/2105245285916020905)

````text
recreate the blue beret blob from OpenAI's Dots — fuzzy felt surface, breathing, blinking, squash & stretch, a lagging beret, and a subtle reaction to the mouse.
````

## ryzoft-887481

@Ryzoft · threejs, shader, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/ryzoft-887481) · [post](https://x.com/Ryzoft/status/2102989395359887481)

````text
I want you to imagine a story. And then using threejs I want you to create full animation, star wars 80s-level quality 90s cartoon out of the story you imagine.
````

## op7418-021491

@op7418 ·  · [watch](https://x.com/op7418/status/2104085539419021491) · [post](https://x.com/op7418/status/2104085539419021491)

````text
帮我做一个原创的手游「高光时刻」动效：[主体，例如：开宝箱 / 段位晋升 / 成就解锁 / Boss 掉落 / 角色升级]。
做成一个可以直接打开的单文件网页（HTML + CSS + JS），点一下就能完整播放，效果对标商业手游的结算 / 奖励演出。

【世界观与风格】
- 原创美术，不要模仿任何现有游戏的
````

## curieuxexplorer-590917

@CurieuxExplorer ·  · [watch](https://x.com/CurieuxExplorer/status/2104801713840590917) · [post](https://x.com/CurieuxExplorer/status/2104801713840590917)

````text
Turn a 2025 neuroscience study about strangers' brain reactions to movies growing closer into a 60-second film and interactive lab. One HTML file.
````

## chang-200908

@chang_ ·  · [watch](https://x.com/chang_/status/2108458503367200908) · [post](https://x.com/chang_/status/2108458503367200908)

````text
我用 Claude Opus 5.5 写代码，从零做了条 5 分钟 3D 科普：three.js 复刻踏板总成、shader 实时算应力热力图、裂纹一脚一脚变长的断裂动画、中英双语字幕。

 🧠 Claude Opus 5.5 ｜ 🎙️ 配音 ElevenLabs
没用一帧现成素材 👇
````

## engmoelgaraihy-694832

@EngMoElgaraihy ·  · [watch](https://x.com/EngMoElgaraihy/status/2103038655178694832) · [post](https://x.com/EngMoElgaraihy/status/2103038655178694832)

````text
إنشاء مشهد قارب تفاعلي يمر بجمال الطبيعة اليابانية باستخدام Three.js، مع طقس ديناميكي وانعكاسات ماء واقعية وتفاصيل معماريّة وشخصيات 3D
````

## mandelduck-768972

@MandelDuck · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/mandelduck-768972) · [post](https://x.com/MandelDuck/status/2103802923465768972)

````text
can you make a 3d game where you walk around and spot cats inside of a van gogh painting? we can start with stary night and its town
````

## konstantinsaifo-169107

@konstantinsaifo ·  · [watch](https://x.com/konstantinsaifo/status/2106855420237169107) · [post](https://x.com/konstantinsaifo/status/2106855420237169107)

````text
Build one you can actually watch. Trucks reverse onto the dock, forklifts unload and boxes slide down chutes onto the right truck.
````

## youwareai-259061

@YouWareAI ·  · [watch](https://x.com/YouWareAI/status/2105656935622259061) · [post](https://x.com/YouWareAI/status/2105656935622259061)

````text
A live WebGL ink painting in the style of Qi Baishi, with paper fibre, dry-brush whiskers and an escape when you touch the water.
````

## chudry223-657142

@chudry223 ·  · [watch](https://x.com/chudry223/status/2105374954195657142) · [post](https://x.com/chudry223/status/2105374954195657142)

````text
Create an interactive particle effects animation using Three.js that transforms simple ideas into a mesmerizing 3D experience.
````

## ved-cj-066575

@Ved_CJ · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/ved-cj-066575) · [post](https://x.com/Ved_CJ/status/2103708392930066575)

````text
I want multiplayer game, with proximity chat, with destructurable environment, that players will enjoy, shooting game
````

## aisongman-461057

@aisongman · canvas, pixel, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/aisongman-461057) · [post](https://x.com/aisongman/status/2103763192971461057)

````text
Create a 1-on-1 card game like Hearthstone.
Just make it. As best you can.
In pixel art style.
````

## opener-ai-843891

@opener_ai · canvas, pixel, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/opener-ai-843891) · [post](https://x.com/opener_ai/status/2103437714695843891)

````text
Make a game like Romance of the Three Kingdoms III with a retro, pixelated classic vibe.
````

## buildfastwithai-582551

@BuildFastWithAI · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/buildfastwithai-582551) · [post](https://x.com/BuildFastWithAI/status/2103152898708582551)

````text
Build a Douglas A-1H Skyraider in Three.js
````

## 0xrathi-511319

@0xRathi · threejs, shader, physics, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/0xrathi-511319) · [post](https://x.com/0xRathi/status/2102986585004511319)

````text
make a Tron game.
````

## mozetech-471882

@MozeTech · canvas, audio, pixel, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/mozetech-471882) · [post](https://x.com/MozeTech/status/2102913506815471882) · **partial prompt**

````text
Opus 5.5 just one-shot this entire pixel-art game. Oh, and the prompt? It was barely three sentences. I gave claude creative license to make whatever game it wanted to, and oh boy did it cook

The capabilities of this model are genuinely ridiculous, I fed GPT Sol-6 the same prompt and the results were shockingly poor. Seems like Sol-6 is taking the Opus 5 role this time around.

With models becoming this good, I'm struggling to see the need to purchase games anymore. If you can have any game you want created in a single prompt, with beautiful art, story, etc - what's the point of sinking $60+? 

Lol, obviously because the stories and ideas that humans have are still way better than whatever these models can still do. However, the gaming industry is definitely going to be shaken now - excited to see what's gonna come out of this!

Anyway, here's a side by side comparison of both outputs, thoughts?

Also if you wanted to play it yourself:
https://skerry-light.vercel.app/

Left is Claude, right is Opus
````

## dreyk0o0-165270

@dreyk0o0 · threejs, shader, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/dreyk0o0-165270) · [post](https://x.com/dreyk0o0/status/2103822946800165270) · **partial prompt**

````text
Claude Opus 5.5 just built Minecraft.

In the browser. From a single prompt.

Noah Wachnick asked it to recreate Minecraft with advanced shaders, "as realistic as possible."

1 hour 37 minutes at max effort:

> block placement
> terrain
> realistic lighting and shaders

Here's a prompt to try it yourself. Bookmark this for later 

"Build a Minecraft-style voxel game in a single HTML file that runs in the browser.
- First-person controls: WASD, mouse look, jump
- Procedural terrain with hills, water and trees
- Place and break blocks with the mouse, 5 block types
- Advanced shaders: moving sun, soft shadows, ambient occlusion, fog, water reflections
- Smooth 60 fps on a laptop
Use Three.js from a CDN. Test it, fix every bug, then keep improving the visuals until it looks as realistic as possible."

Tips:
1. Set effort to max
2. Give it time, the original run took ~1.5 hours
3. When it's done, ask: "What looks least realistic? Fix it."
````

## izmaelmag-282849

@izmaelmag · threejs, canvas, audio, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/izmaelmag-282849) · [post](https://x.com/izmaelmag/status/2104070894251282849) · **partial prompt**

````text
What is going on 🤪

🎲 Dice Corners  
https://izmaelmag.me/dice-corners/

I’ve been a gamer since I was three, and the dream of making my own games is what led me into programing

In 2008 I discovered GameMaker and made a few platformers and scrolling shooters. But i had no idea how to make a living from games, so I moved into design and frontend development. I never stopped exploring huge libraries of retro games and imagining games of my own—making them by hand was just hard.

18 years later, I subscribe to Claude Opus 5.5, write a PRD, put together a simple prototype, and half an hour later within a single five-hour usage window I have a complete game. It runs locally. It’s simple, but it’s beautiful, and it works.

And I did it by directing agents on my laptop through a telegram chat

Mind blowing 🤯
````

## agentgamesbot-355554

@agentgamesbot · canvas, pixel, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/agentgamesbot-355554) · [post](https://x.com/agentgamesbot/status/2103401820261355554) · **partial prompt**

````text
Play INKBOUND:
https://agentgames.itch.io/inkbound

Claude Opus 5.5 built this pixel game in 30 minutes.

While the human was building the amusement park with Claude, Opus 5.5 arrived. Time to see what it could do with a pixel game.

Meet INKBOUND. One painter draws your path. Another tries to erase you. Apparently, even a tiny ink spirit needs workplace conflict.

Jump, sink into the ink, or absorb incoming attacks. Sound on for this one.

Want to try building it yourself? The prompt is in the pinned YouTube comment:
https://www.youtube.com/shorts/86TukHHr74o
````

## codrops-340299

@codrops · threejs, canvas, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/codrops-340299) · [post](https://x.com/codrops/status/2104217304611340299) · **partial prompt**

````text
Everyone is sharing what Opus 5.5 can build this week, and it made us ask ourselves a different question: when making things becomes this easy, what do we actually want to make and why?

Our answer was a small retro arcade, the kind we grew up hanging out in, filled with 21 games made by independent developers. Every cabinet carries the name of the person who built its game.

Walk in, drop a coin, and play: https://tympanus.net/Demos/InsertCoin/

#threejs #webgl
````

## anduraio-570761

@anduraio · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/anduraio-570761) · [post](https://x.com/anduraio/status/2103860609712570761) · **partial prompt**

````text
Claude Opus 5.5 is stupidly good at games, so I’m putting it on a streak.
Dropping 10 browser games I built with it. One a day.

Same characters. Same world. Different gameplay each day.
Adventure games. Painterly stylised 3D. Soft cel shading, wind in the grass, hazy blue distance, hand-painted skies. The Legend of Zelda: BotW / TotK energy.

Trailer + play link + what the model actually did.
Playable. Built with Opus. That’s the series.
````

## tonnusos-006126

@tonnusos · canvas, particles, audio, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/tonnusos-006126) · [post](https://x.com/tonnusos/status/2104209760388006126) · **partial prompt**

````text
Testing out Opus 5.5 today by letting it work on a Magicka-inspired game! I loved this game when it came out 15 years ago, super cool spell casting mechanics. 

So I want to take this and turn it into an extraction looter. You go out into the wild solo or in a group, fight off mobs and other players to collect loot to bring back to your base. 

Like others have mentioned, Opus 5.5 feels so much more creative. Crazy
````

## janeloic-905802

@JaneLoic · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/janeloic-905802) · [post](https://x.com/JaneLoic/status/2103023141823905802) · **partial prompt**

````text
HOLY SHIT MOMENT with Opus 5.5 😱

I really wanted to play Super Mario Bros Wonder but I don't have a Nintendo Switch.... So I went to @arena with the hop to find an AI that could reproduce the game. And luckily I stumbled upon Opus 5.5 ✨

Have a look at what it did with ONE prompt 😵‍💫

For those interested I'll share the result of Grok 4.7 in the comments
````

## blitast-studio-257328

@blitast_studio · threejs, shader, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/blitast-studio-257328) · [post](https://x.com/blitast_studio/status/2104003920251257328) · **partial prompt**

````text
A black cat's night stroll along a moonlit canal 🐈‍⬛🌙

CatWalk — a one-button 3D browser game.
Zero image or audio files: the town, the cat's animation and the jazz are all generated in code. The whole game is ~200KB.

Claude Opus 5.5

▶ https://blitastxyz.itch.io/catwalk

#threejs #indiedev #gamedev #WebGL
````

## taylorbereiter-189192

@TaylorBereiter · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/taylorbereiter-189192) · [post](https://x.com/TaylorBereiter/status/2104045641706189192) · **partial prompt**

````text
https://claude.ai/artifact/Vos8wdB8Jenz9FopZWeRMb

Check out DOUBLE FEATURE, a Cuphead Inspired Mini-Game built with Claude Opus 5.5.

I find this model works best when leaning into its strengths, figuring out the parts it does well and letting it capitalize on them. Cartoon shapes and sounds are great.
````

## smallhusk-272056

@smallhusk · threejs, shader · [watch](https://skillry.dev/ai-videos/opus-5-5/smallhusk-272056) · [post](https://x.com/smallhusk/status/2104046074600272056) · **partial prompt**

````text
A procedurally-generated game in infinite stranded space colonies with realistic physics. All creative decisions made by @claudeai Opus 5.5, all done in just one week's usage window at Pro-level. Claude chose to add pettable cats in the combat-free mode. https://claude.ai/artifact/1o1DWNgoanSy2ZCRTCtjpq
````

## curieuxexplorer-519730

@CurieuxExplorer · threejs, shader, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/curieuxexplorer-519730) · [post](https://x.com/CurieuxExplorer/status/2103407536741519730) · **partial prompt**

````text
I made a 3D survival game in one prompt with Opus 5.5

Survive 60 seconds.
Every tile you step on cracks... then it falls.

Race your own ghost, chase near-misses, watch the arena rebuild itself when you fail.

Most people don't make it past 30s 👇
https://claude.ai/artifact/D3kjdvMpvrGgTCcxDTTDvP
````

## angie-carel-954689

@angie_carel · threejs, shader, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/angie-carel-954689) · [post](https://x.com/angie_carel/status/2103876982819954689) · **partial prompt**

````text
In a deeply serious, highly mature effort to test Opus 5.5's ability to render jello-like textures—reflections, transparency, jiggly movement, the works—I accidentally built a "Jiggle Buddies" game that my son played the entire drive home. 
Link to play: https://www.angiecarel.com/jiggle-buddies
````

## curieuxexplorer-772215

@CurieuxExplorer · threejs, shader, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/curieuxexplorer-772215) · [post](https://x.com/CurieuxExplorer/status/2103714595659772215) · **partial prompt**

````text
This is Dope! 
Claude Opus 5.5 is on fire 🔥

One prompt → a 30s video-game walk through Mumbai, built entirely in code.

No AI video. No 3D assets. No stock audio.
1,850 lines. 900 frames. 30+ sounds from pure math.

Every pigeon, puddle and kaali-peeli, made by code.
Mumbai, compiled. 🇮🇳
````

## rehan-shei-839416

@rehan_shei · canvas, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/rehan-shei-839416) · [post](https://x.com/rehan_shei/status/2103755997533839416) · **partial prompt**

````text
I turned this into a full game with unity cli + opus 5.5, also opus did this full demo video, it played the game with multiple characters and spliced together the best bits, holy shit we're in the AGI era. Play it on your browser here: https://rehan-remade.github.io/hollow-crown/
````

## redp314-642106

@redp314 · svg · [watch](https://skillry.dev/ai-videos/opus-5-5/redp314-642106) · [post](https://x.com/redp314/status/2103495629087642106) · **partial prompt**

````text
Always wondered if you can win every game of 2048, so i gave Claude Opus 5.5 one prompt. It built an AI that learns from zero, on my laptop!

Game 1: dies at 128
Game 497: first 2048
Game 3,915: first 8192
Game 98,299: first 16384

Can it win them all? No. After 2M games: 99%!
````

## mayuresh-empire-687553

@mayuresh_empire · threejs, shader, canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/mayuresh-empire-687553) · [post](https://x.com/mayuresh_empire/status/2104207365008687553) · **partial prompt**

````text
Claude Opus 5.5 built this game from a single prompt - a mythic action game inspired by ancient Indian epics.

No engine. No assets. Every temple, tree, enemy, shader, and sound is generated in code.

Even this trailer was designed by Claude. The future is crazy.
````

## kepochnik-237752

@kepochnik · threejs, canvas, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/kepochnik-237752) · [post](https://x.com/kepochnik/status/2103867115044237752) · **partial prompt**

````text
I built Minecraft thanks to Opus 5.5 ( part 2 )

today I added more mobs and here I will show their characteristics as a video

the process took probably : 2-3 hours

next week I'm going to publish this game for everyone

turn notifications
````

## nqaze-939886

@nQaze · threejs, shader, canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/nqaze-939886) · [post](https://x.com/nQaze/status/2103853898301939886) · **partial prompt**

````text
Opus 5.5 releases 😍 

Me: Woahh! Let's drill through our BugSmash backlog quickly. 

My Co-founder @suhailpatel941: Hold my cup... let's make a game 🥲 

All this graphics and the game is just - 4MB game - hosted on BugSmash Drop itself 🤯
````

## boona11-415751

@boona11 · canvas, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/boona11-415751) · [post](https://x.com/boona11/status/2103830083446415751) · **partial prompt**

````text
Nobody edited this video.

Claude Opus 5.5 built the game, then played it, filmed it, wrote the soundtrack and cut its own trailer.

Low Tide: a painting you can actually play. Free in your browser 👇

https://low-tide.netlify.app
````

## rush3rx-342153

@Rush3rx · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/rush3rx-342153) · [post](https://x.com/Rush3rx/status/2103757499652342153) · **partial prompt**

````text
A dead planet to a breathable one, one camera, no cuts.

I'm making Second Dawn, a co-op terraforming game, with Claude: it started on Fable 5.0, moved to Fable 5.1, and it's on Opus 5.5 now. I set the design and the direction.
````

## brainwavepub-812667

@BrainWavePub · threejs, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/brainwavepub-812667) · [post](https://x.com/BrainWavePub/status/2104180455813812667) · **partial prompt**

````text
Opus 5.5 editing my demo video 👀

Built a hand-drawn catapult sketch that turns into a real 3D physics simulator.

Recorded it, gave Opus 5.5 one prompt to edit the raw footage.

No editing app. It made its own.

Video below 👇
````

## ggsimm-535814

@ggsimm · canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/ggsimm-535814) · [post](https://x.com/ggsimm/status/2102882622053535814) · **partial prompt**

````text
I asked opus 5.5 to make a game within the confines and abilities of my engine, no other prompt. It made this deep-sea horror game, with a subtle drone soundtrack. And it's terrifying (if a bit unbalanced/unfair). Sound on.
````

## lisp-mi-139812

@lisp_mi · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/lisp-mi-139812) · [post](https://x.com/lisp_mi/status/2104046743751139812) · **partial prompt**

````text
I asked Opus 5.5 to build a tiny underground delivery network in three.js — then turned it into a game.
Lunch rush: 24 orders in 60 s, 6 express upgrades, beat the deadlines.
Free in the browser, link below 👇
````

## 0xpai-eth-635565

@0xpai_eth · canvas, pixel, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/0xpai-eth-635565) · [post](https://x.com/0xpai_eth/status/2103870009877635565) · **partial prompt**

````text
试着用 Opus 5.5 给「财富进化论」做了一款复古的像素游戏《复利 QUEST》。

把我们家庭投资理财路上的一些困难设计成关卡。

在这个像素世界里，冲动消费是要跳过去的陷阱，通胀会变成怪兽，还会追着我们跑。一路升级的，是我们的耐心值。

再配上 8-bit 音乐，储蓄、复利和长期持有这些知识，就有了具体的角色和关卡。

游戏做完，又用它做了这条 40 秒的介绍视频。
````

## alex-vainshtein-195332

@Alex_Vainshtein · threejs, canvas, particles · [watch](https://skillry.dev/ai-videos/opus-5-5/alex-vainshtein-195332) · [post](https://x.com/Alex_Vainshtein/status/2104197450307195332) · **partial prompt**

````text
Can one developer + 3 AI agents build a GTA-style game?

I’m trying.

FIXER is a 1990s city game I’m building with Astra, Opus 5.5 and Fable.

This is the current playable build.
````

## deeprajo1-834106

@deeprajO1 · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/deeprajo1-834106) · [post](https://x.com/deeprajO1/status/2103938972426834106) · **partial prompt**

````text
What if learning Python felt more like playing a game than studying? 🎮🐍

So I asked Claude Opus 5.5 to build me a Python-learning surfing game.

And the result is pretty wild. 🌊
````

## waseemkhalo-636267

@waseemkhalo · canvas, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/waseemkhalo-636267) · [post](https://x.com/waseemkhalo/status/2104018205580636267) · **partial prompt**

````text
I made this game with Claude Opus 5.5
+ ChatGPT Astra 6 for some visual assets = our new game Spoiled Egg 

https://eggverse.co
https://eggverse.co/games/spoiled-egg
````

## mappletour-334921

@mappletour · canvas, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/mappletour-334921) · [post](https://x.com/mappletour/status/2104206756482334921) · **partial prompt**

````text
Opus 5.5に「ド派手なPVを作って」と丸投げしたら、ほぼ任せきりで完成した😳
世界ランク上位の実際のリプレイを撮影して、拍に合わせて「ギリギリ！」を重ねてくる。
日英2本、一晩で。Claude×HyperFrames、世界変わった🔥
https://biribiri-game.web.app
````

## vibechine-465008

@vibechine · threejs, shader, canvas, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/vibechine-465008) · [post](https://x.com/vibechine/status/2103966021451465008) · **partial prompt**

````text
Ladprao Jet ski game based on the Bangkok floods. Clear the drains and fight the crocs. Made with Opus 5.5 . https://ladprao-flood-ski.vercel.app/
````

## itsjdraven-557760

@itsjdraven · threejs, canvas, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/itsjdraven-557760) · [post](https://x.com/itsjdraven/status/2104059393222557760) · **partial prompt**

````text
Claude Opus 5.5 just built me a mini temple run style game 

it actually feel pretty smooth to play

honestly I didn’t expect the result like this
````

## janlaywss-379361

@janlaywss · threejs, canvas, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/janlaywss-379361) · [post](https://x.com/janlaywss/status/2103751290954379361) · **partial prompt**

````text
被Claude Opus 5.5生成的游戏效果彻底瘫坐了。。。。只消耗了Pro套餐5h限额的19%，连续运行1h45m就能获得这么高的完整度。。。。。瘫坐中。。。。
游戏地址：https://move-car-kappa.vercel.app/
````

## happycapyai-634965

@happycapyai · threejs, canvas, svg, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/happycapyai-634965) · [post](https://x.com/happycapyai/status/2103057174855634965) · **partial prompt**

````text
Opus 5.5 是要上天了吗？一段 prompt 一把帮我复刻了一个泡泡堂！简直是童年经典 💣

无论是游戏机制还是游戏美学我觉得都是足以上架7k7k的程度，关键第一把测试的时候竟然输给了AI npc 🤣

想玩的家人们可以评论告诉我
````

## maxthelion-649723

@maxthelion · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/maxthelion-649723) · [post](https://x.com/maxthelion/status/2103775701052649723) · **partial prompt**

````text
I'm having so much fun doing game development with opus 5.5. This little bit with trains and barriers is awesome.
````

## dmowlin-221566

@dmowlin · canvas, pixel · [watch](https://skillry.dev/ai-videos/opus-5-5/dmowlin-221566) · [post](https://x.com/dmowlin/status/2103830851897221566) · **partial prompt**

````text
made a galactic pixel racer game with opus 5.5, can you beat my score? 👿

https://velven.ai/david/pixel-racer
````

## akokoi1-469188

@akokoi1 · threejs, canvas, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/akokoi1-469188) · [post](https://x.com/akokoi1/status/2104222017696469188) · **partial prompt**

````text
太离谱了，一共3步，Opus 5.5给我整了个“模拟火车”出来。

1. 让ChatGPT生成韶山8各个视角的图；
2. 让Opus做一个3D资产，100%还原这张图；
3. 做一个环形铁路，可以操作这辆车行驶。
````

## jasperdeboer-157391

@jasperdeboer · threejs, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/jasperdeboer-157391) · [post](https://x.com/jasperdeboer/status/2103593633832157391) · **partial prompt**

````text
Claude Opus 5.5 made a trailer for my Antkeeper game (one prompt).

This is what it came up with 🤔
````

## zacxbt-234711

@zacxbt · threejs, shader, audio · [watch](https://skillry.dev/ai-videos/opus-5-5/zacxbt-234711) · [post](https://x.com/zacxbt/status/2103789882309234711) · **partial prompt**

````text
vibe coding a cozy metal detector game

a few prompts in with opus 5.5

loving the sunset 😌
````

## brenbuilds-386902

@BrenBuilds · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/brenbuilds-386902) · [post](https://x.com/BrenBuilds/status/2104199715076386902) · **partial prompt**

````text
@kimmonismus hours of rework on my threejs game with Opus 5.5 and limits didnt even move
````

## jstjs-129051

@jstjs_ · canvas, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/jstjs-129051) · [post](https://x.com/jstjs_/status/2103807826699129051) · **partial prompt**

````text
I asked Opus 5.5 to make a game about @dhh , Ruby and the end of hand-written code.
````

## hellovyom-800659

@HelloVyom · threejs, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/hellovyom-800659) · [post](https://x.com/HelloVyom/status/2104140498344800659) · **partial prompt**

````text
Opus 5.5 spent 43 million output tokens building 3D PvZ 2: Reflourished
````

## kenjiphang-750512

@KenjiPhang · canvas, svg, gsap · [watch](https://skillry.dev/ai-videos/opus-5-5/kenjiphang-750512) · [post](https://x.com/KenjiPhang/status/2103859812123750512) · **partial prompt**

````text
Opus 5.5 is the best at animating concept art for a game im making
````

## llama3dstudio-012980

@llama3dstudio · threejs, shader, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/llama3dstudio-012980) · [post](https://x.com/llama3dstudio/status/2104115092124012980) · **partial prompt**

````text
Rock skipping game made with Three.js and Opus 5.5.
````

## nolit64-347627

@NoLit64 · canvas, audio, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/nolit64-347627) · [post](https://x.com/NoLit64/status/2103628970000347627) · **partial prompt**

````text
Build a MapleStory clone in Raylib-cs.
````

## realfedeuru-475858

@RealFedeURU · threejs, shader, canvas, playable · [watch](https://skillry.dev/ai-videos/opus-5-5/realfedeuru-475858) · [post](https://x.com/RealFedeURU/status/2104154307071475858) · **partial prompt**

````text
Skydiving game built with opus 5.5🪂
````

## mrblock-096062

@mrblock · threejs, shader, canvas · [watch](https://skillry.dev/ai-videos/opus-5-5/mrblock-096062) · [post](https://x.com/mrblock/status/2103492984474096062) · **partial prompt**

````text
opus 5.5 遊戲製作，週末快點來嘗試。
````
