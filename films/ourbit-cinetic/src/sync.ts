// The sound events of the film, computed from the picture code. scripts/export-cues.ts calls the
// default export and writes out/cues.json; scripts/audio/score.py voices each event with the
// film's sound kit (audio/kit.json: the earshot take for its kind) on its exact frame (schema,
// roles and recipes: references/sound.md).
//
// The rules this file follows:
// - Every sound has a visible cause, but not every picture event gets a sound: sound discrete
//   state changes (a press, an insert, a lock, a landing, the logo assembling), leave continuous
//   motion silent, and let the music carry most cuts. A class of action, once sounded, is
//   sounded every time.
// - Impacts go on the contact frame, pops on the 50% frame, settles on the 97% frame, and a
//   whoosh's apex on the velocity peak of the move it belongs to.
// - Import the constants the acts animate with (they export them for this file) and compute the
//   frame; a frame typed by hand drifts the first time an act is retimed.
// - Text gets one soft `text` sound per fragment, on the frame its last word visibly comes to rest
//   (chainResolves(), at the size the act sets the chain at), never one per word;
//   what was just said is read in near-silence. The lockup is a stop-down and ONE clean element:
//   score.py's stack guard warns when anything else lands within 3 f of it or leads into it.
import { HOOK_SIZE } from './acts/Hook';
import { CTA_SIZE, NAME } from './acts/Lockup';
import { FALL, OFFER_SIZE, TURNS } from './acts/Offers';
import { BUTTON, HEAD_SIZE, PACK_LINE, RISE, WIDEN } from './acts/Signup';
import { chainResolves } from './fx/Chain';
import { stagger, E } from './lib/anim';
import { peak, settleOf } from './lib/sync';
import { ACT, CUE, f60, FPS, TOTAL, W } from './timeline';

export type Kind =
  | 'tick' | 'tock' | 'hit' | 'land' | 'pop' | 'whoosh' | 'riser'
  | 'drop' | 'key' | 'click' | 'snap' | 'swell' | 'bell' | 'suck' | 'text';

export type SoundEvent = {
  f: number; // absolute frame the sound belongs on (fractional is fine)
  kind: Kind;
  weight?: number; // 0..2, 1 = normal; scales level (and size for whoosh and land)
  pan?: number; // -1 left .. +1 right from screen x; score.py keeps effects within +-0.15, a whoosh travels the full amount
  pitch?: number | string; // MIDI number or "Eb6"; omit and score.py picks a tone in key
  apexFrac?: number; // whoosh / suck: where in its length the loudest point sits (lands on f)
  dur?: number; // frames: whoosh, riser, swell and suck length
  variant?: string; // key: 'word' | 'space' | 'return' | 'back'; tick: 'crisp'; click: 'confirm'; land: 'light'; bell: 'motif'; pop: 'down'
  id?: string; // a name for QA reports
};

/** Seconds to frames, for sound lengths. */
const sec = (s: number) => Math.round(s * FPS);
/** Screen x (px) to pan, scaled so nothing sits hard in one ear. */
const panX = (x: number) => Math.max(-0.8, Math.min(0.8, ((x - W / 2) / (W / 2)) * 0.8));
/** The act a frame belongs to, so QA reports read "mark:dome" rather than a bare frame. */
const actOf = (f: number) => Object.entries(ACT).find(([, a]) => f >= a.from && f < a.from + a.dur)?.[0] ?? 'tail';

/** A move from frame a to b on `ease`: whoosh as long as the move with its apex on the velocity peak. */
const move = (m: { from: number; to: number; ease: (t: number) => number }, weight: number, pan: number, id: string): SoundEvent => {
  const apex = peak(m.from, m.to, m.ease);
  const dur = Math.max(sec(0.3), m.to - m.from); // even a short whip gets 0.3 s of air
  return { f: apex, kind: 'whoosh', weight, pan, dur, apexFrac: (apex - m.from) / (m.to - m.from), id };
};

export default function cues(): SoundEvent[] {
  const ev: SoundEvent[] = [];
  const text = (chain: string, size: number, w = 0.8) =>
    chainResolves(chain, { size }).forEach((f, i) => ev.push({ f, kind: 'text', weight: w, pan: 0, id: `${chain}${i + 1}` }));

  // Hook: the question lands softly in the quiet intro; the flare swells into the drop on the cut.
  text('hook', HOOK_SIZE, 0.7);
  ev.push({ f: CUE.drop, kind: 'drop', weight: 1.2, id: 'cut-drop' });

  // Sign-up: the headline lands; the caret pops (50% of its 6 f grow); the bar's widening breathes
  // once; the press is a confirm click; the pack's rise is silent and it seats on ONE landing (the payoff).
  text('headline', HEAD_SIZE, 0.8);
  ev.push({ f: CUE.caret + f60(3), kind: 'pop', weight: 0.6, id: 'caret' });
  ev.push(move(WIDEN, 0.7, 0, 'bar-widens'));
  ev.push({ f: CUE.press, kind: 'click', variant: 'confirm', weight: 1, pan: panX(BUTTON.x), id: 'press' });
  ev.push({ f: settleOf(RISE.from, RISE.to, RISE.ease), kind: 'land', variant: 'light', weight: 0.9, id: 'pack-seats' });
  text('pack', PACK_LINE, 0.8);

  // The wheel: each turn is one whoosh; the tally's last cell locks with a tick; the gift lands on
  // its contact frame; the cards snap open. One soft text sound per offer line.
  TURNS.forEach((t, i) => ev.push(move(t, 0.55, 0, `turn${i + 1}`)));
  ev.push({ f: CUE.tally + stagger(2, 3, f60(30), E.out) + f60(8), kind: 'tick', variant: 'crisp', weight: 0.8, id: 'tally-30' });
  ev.push({ f: FALL.to, kind: 'land', weight: 1, id: 'gift-lands' });
  ev.push({ f: CUE.fan, kind: 'snap', weight: 0.8, id: 'cards-fan' });
  text('offers', OFFER_SIZE, 0.8);

  // Lockup: the mark rises out of the light (a soft pop, a full second before the hit); the slide
  // stays silent; ONE hit when the wordmark resolves. Then the CTA reads in near-silence.
  ev.push({ f: CUE.markIn + f60(14), kind: 'pop', variant: 'down', weight: 0.6, id: 'mark-rises' });
  ev.push({ f: NAME.to, kind: 'hit', weight: 1, id: 'lockup' });
  text('cta', CTA_SIZE, 0.6);

  for (const e of ev) {
    if (!(e.f >= 0 && e.f < TOTAL)) throw new Error(`sync: ${e.id} at f=${e.f} is outside the film (0..${TOTAL - 1})`);
    e.id = `${actOf(e.f)}:${e.id}`;
  }
  return ev;
}
