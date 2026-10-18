// The single source of truth for time. Picture (src/acts), sound (src/sync.ts -> out/cues.json)
// and QA (scripts/grid-check.ts) all import this file, so a change here moves everything together.
// Think in bars and beats, never in seconds. Keep this file free of React and CSS imports:
// Node scripts load it directly.
import { holdFor, PACE, readingWindows, revealFor, wordCount, type PaceName } from './lib/pace';

export { PACE } from './lib/pace'; // grid-check checks COPY against the film's own pace numbers

export const FPS = 60;
export const BPM = 120;
export const W = 1080;
export const H = 1920;
/**
 * The film's pace (src/lib/pace.ts). calm: text arrives as short fragments that take turns with
 * the picture, held about 1-1.5 s (the default for text-led films, at 90-100 BPM). crisp: the
 * denser launch-film tempo, for briefs that ask for energy (at 120 BPM).
 */
export const PACE_NAME: PaceName = 'crisp';

/** Frames per beat. Must be a whole number (grid-check fails otherwise): 60 fps -> 90, 100, 120, 144, 150 BPM. */
export const BEAT = (60 / BPM) * FPS;
export const BAR = BEAT * 4;
/**
 * Absolute frame of a grid position: bar is 1-based, beat 0-3, sub = 16ths within the beat.
 * b(3) is the downbeat of bar 3; b(2, 1, 2) is the "and" of beat 2 in bar 2.
 */
export const b = (bar: number, beat = 0, sub = 0) => Math.round(((bar - 1) * 4 + beat) * BEAT + sub * (BEAT / 4));

/**
 * A choreography length written in 60 fps frames (the unit every number in the cinetic
 * references uses), converted to this film's fps. Cues come from b(); durations inside a move
 * use f60(), so the film keeps its timing if --fps changes.
 */
export const f60 = (frames: number) => Math.round((frames * FPS) / 60);

/** After the last bar the picture holds while the audio decays to digital silence. */
export const TAIL = FPS;

// Acts: contiguous, bar-aligned, [from, from + dur). Each act is its own composition in Root.tsx.
export const ACT = {
  hook: { from: b(1), dur: b(2) - b(1) }, // night, fog, the pumpkin; one question; the drop is the cut
  signup: { from: b(2), dur: b(5) - b(2) }, // the headline becomes the sign-up bar; the press releases the pack
  offers: { from: b(5), dur: b(10) - b(5) }, // the wheel turns four more offers through the pumpkin's light
  lockup: { from: b(10), dur: b(12) + TAIL - b(10) }, // the light hands over to B x OURBIT
};

export const TOTAL = b(12) + TAIL;

/** One offer of the wheel every 5 beats (150 f): it turns into the light, then its line is read. */
export const OFFER_STEP = 5 * BEAT;
/** Absolute frame offer i (0..3) starts turning into the light; the pack leaves on the first turn. */
export const turnAt = (i: number) => ACT.offers.from + i * OFFER_STEP;
export const TURN = BEAT; // a turn of the wheel takes one beat

// Named sync points (absolute frames), all on the 16th grid.
export const CUE = {
  flare: b(1, 2, 2), // the pumpkin flame flares once the question has been read
  drop: b(2), // HARD CUT to the headline: the drop lands here
  caret: b(2, 3), // a caret appears in the gap between 註冊 and 就送
  capsule: b(2, 3, 2), // ...thickens to a capsule
  widen: b(3, 0, 1), // ...and widens into the sign-up bar (60 f on E.rest)
  cursor: b(3, 1), // the cursor sets off (24 f, E.out)
  press: b(3, 2, 2), // the press on 註冊: the pack starts to rise out of the pumpkin's light
  rise: b(3, 3, 2), // the pack is half-way out of the light
  packIn: b(4), // the pack lands above the pumpkin on the downbeat: the payoff
  turn1: turnAt(1), // the wheel turns: gold into the light
  turn2: turnAt(2), // the wheel turns: the gift drops in
  turn3: turnAt(3), // the wheel turns: the cards
  tally: turnAt(0) + TURN, // the 30% cells fill as the bitcoin offer settles
  gift: turnAt(2) + TURN + BEAT / 2, // the gift box lands on the light, once the turn has settled
  fan: turnAt(3) + TURN, // the three cards fan open
  markIn: b(10), // the B mark rises out of the light
  markRest: b(10, 1), // the mark is at rest in the light
  slide: b(10, 1, 2), // the mark slides up and OURBIT rises in under it
  lockup: b(10, 2, 2), // the lockup is complete: the one hit
  push: b(11, 2), // the end card's slow push begins under the read
  end: b(12),
};

export type Copy = {
  id: string;
  text: string; // exactly what is on screen (\n separates lines)
  in: number; // first frame any of it is visible
  resolved: number; // first frame it is fully readable
  out: number; // first frame it starts to leave (TOTAL if it stays)
  kind?: 'copy' | 'ui'; // 'ui': a string the product shows; not budgeted
  chain?: string;
  mode?: 'build' | 'replace';
};

const pace = PACE[PACE_NAME];

export const line = (id: string, text: string, inF: number, out?: number): Copy => {
  const n = wordCount(text);
  const resolved = inF + f60(revealFor(n, pace));
  return { id, text, in: inF, resolved, out: out ?? resolved + f60(holdFor(n, pace)) };
};

export const chain = (id: string, mode: 'build' | 'replace', fragments: [text: string, inF: number][], o: { out?: number } = {}): Copy[] => {
  const base = fragments.map(([text, inF], i) => ({ id: `${id}.${i + 1}`, text, in: inF, resolved: inF + f60(revealFor(wordCount(text), pace)), chain: id, mode }));
  const last = base[base.length - 1];
  if (!last) throw new Error(`timeline: chain "${id}" has no fragments`);
  const words = (list: { text: string }[]) => list.reduce((n, c) => n + wordCount(c.text), 0);
  if (mode === 'build') {
    const out = o.out ?? last.resolved + f60(holdFor(words(base), pace));
    return base.map((c) => ({ ...c, out }));
  }
  const leave = f60(pace.exitDur) + f60(6);
  return base.map((c, i) => ({ ...c, out: base[i + 1] ? base[i + 1].in - leave : (o.out ?? c.resolved + f60(holdFor(wordCount(c.text), pace))) }));
};

// Every on-screen word. A CJK phrase with no space counts as one word, as every check counts them.
export const COPY: Copy[] = [
  // The hook: one question in the dark, read before the flame flares; it has left before the cut.
  ...chain('hook', 'replace', [['不給糖？', b(1, 0, 1)]], { out: b(1, 3) }),
  // The headline arrives on the cut; the caret in its gap becomes the sign-up bar, which shoves it aside.
  ...chain('headline', 'build', [['註冊 就送', CUE.drop]], { out: CUE.caret }),
  // The sign-up bar's own strings (product UI, not budgeted).
  { id: 'ui.email', text: '輸入電子郵件', in: CUE.widen + f60(28), resolved: CUE.widen + f60(40), out: CUE.press + f60(6), kind: 'ui' },
  { id: 'ui.button', text: '註冊', in: CUE.widen + f60(28), resolved: CUE.widen + f60(40), out: CUE.press + f60(6), kind: 'ui' },
  // The prize, named once it is at rest.
  ...chain('pack', 'replace', [['寶可夢卡包', CUE.packIn]], { out: b(4, 3, 2) }),
  // The wheel: one line per offer, each read after its turn, gone before the next turn lands.
  ...chain('offers', 'replace', [
    ['儲值返利 最高 30%', turnAt(0) + TURN],
    ['588 USDT 體驗金', turnAt(1) + TURN],
    ['PRL 空投', turnAt(2) + TURN],
    ['VIP 轉盤+10次', turnAt(3) + TURN],
  ], { out: b(9, 2, 3) }),
  // The end card: the action, then the practical fact, once the lockup has resolved.
  ...chain('cta', 'build', [['立即註冊', b(10, 3, 2)], ['10/16 – 10/31', b(11, 2, 2)]], { out: TOTAL }),
];

/**
 * When each COPY entry is being read: [from, to) frame ranges by id (src/lib/pace.ts
 * readingWindows(): from `resolved` for at most readMax, an earlier fragment of a build chain only
 * for its own hold, then the whole line again). The one rule every check uses: export-cues.ts
 * writes it into out/cues.json, and grid-check, layout-audit, measure-speed and forensics read it.
 * Nothing new should start inside a window: the read happens in the quiet.
 */
export const READ = readingWindows(COPY, pace, FPS, TOTAL);

/** One COPY entry by id; acts read their text and timing from here so the budget stays true. */
export const copy = (id: string): Copy => {
  const c = COPY.find((x) => x.id === id);
  if (!c) throw new Error(`timeline: no COPY entry "${id}"`);
  return c;
};

/** The fragments of one chain, in order of arrival. */
export const chainOf = (id: string): Copy[] => {
  const list = COPY.filter((x) => x.chain === id).sort((p, q) => p.in - q.in);
  if (!list.length) throw new Error(`timeline: no COPY chain "${id}"`);
  return list;
};
