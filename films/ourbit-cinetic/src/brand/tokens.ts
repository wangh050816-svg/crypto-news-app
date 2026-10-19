// Brand tokens: the only place a colour, face or type size is written down. Acts import these;
// scripts/lint-film.mjs fails any hex colour that is not declared here.
// B x OURBIT Halloween: a near-black, faintly green stage (the night the photos live in), light
// type, and OURBIT's own green as the one accent.
import type React from 'react';
import { safeInsets } from '../lib/safe';
import { H, W } from '../timeline';

// palette.py --accent #3DF0A0 --stage dark --brand-supplied. On this dark stage `ink` is the stage
// and `paper` is the type: Chain and Words are given color={C.paper}.
export const C = {
  ink: '#0C0F0D', // the stage
  ink2: '#161B18', // raised surfaces on the stage (the sign-up bar)
  paper: '#F1F4F2', // type and marks, 17.4:1 on ink
  mist: '#DBDFDC', // the input's placeholder on ink2
  line: '#2C322E', // hairlines, >= 1.5 px on screen; unfilled tally cells
  mute: '#9FA7A2', // secondary text, 7.8:1 on ink
  black: '#000000', // the photographs' own black, under the vignette
  white: '#FFFFFF', // the cursor's outline
  // The one accent, and what it means: "yours" - what OURBIT hands you. OURBIT's brand green, used
  // flat with no glow; it lights the button, the newest words and the share of the tally.
  accent: '#3DF0A0', // cinetic:brand-supplied OURBIT brand green (BRIEF.md)
};

// Materials of the 3D prizes (three/Stage3D.tsx). These are the objects' own surfaces, not accents:
// the campaign gives away gold, bitcoin and a gift, and the pumpkin's light is warm. BRIEF.md lists them.
export const M = {
  gold: '#F2C25A', // cinetic:brand-supplied gold bars and coins (the 588 USDT and bitcoin prizes)
  goldHi: '#FFE7A3', // cinetic:brand-supplied coin face highlight
  goldLo: '#9A6A1C', // cinetic:brand-supplied coin face rim shadow
  goldRing: '#B07D24', // cinetic:brand-supplied coin face rim
  goldMark: '#A8761F', // cinetic:brand-supplied the struck bitcoin sign
  packBack: '#6B6B6B', // the foil pack's unprinted back
  print: '#A6A6A6', // dims the cards' printed art so the key light does not push it past the print's own colours
  ribbon: '#B00C14', // the gift's red ribbon (the gift photo's own red)
  giftBox: '#D3D7D9', // the gift box's white card, kept cool so the pumpkin's light does not turn it pink
  keyLight: '#E9F1FF', // cool key light
  rimLight: '#BFD7FF', // cool rim light
  pumpkin: '#FF8A2A', // cinetic:brand-supplied the jack-o'-lantern's own light (the photo's flame)
};

export const FONT = {
  // One sans with full Traditional Chinese coverage, at two weights: Noto Sans TC (OFL), the
  // brand's own CJK face from the earlier OURBIT films. Clean, neutral, legible at phone size.
  text: '"Noto Sans TC", system-ui, sans-serif',
  mono: '"Noto Sans TC", system-ui, sans-serif',
};

/** Faces the FontGate waits for before anything renders or measures (one entry per weight in use). */
export const FACES = ['500 16px "Noto Sans TC"', '800 16px "Noto Sans TC"'];

/** Layout unit: 1 at 1080p, scales every size with the short side of the frame (16:9, 9:16, 1:1). */
export const U = Math.min(W, H) / 1080;

// One token per role, reused everywhere (size in px at 1080 short side). CJK sets a touch looser.
export const TYPE = {
  display: { size: 132, weight: 800, track: 0.02, lead: 1.1 }, // statements: the question, the headline, the offer lines
  line: { size: 72, weight: 800, track: 0.02, lead: 1.15 }, // fragment chains under a picture
  secondary: { size: 48, weight: 500, track: 0.04, lead: 1.2 }, // the dates
  ui: { size: 40, weight: 500, track: 0.02, lead: 1.3 }, // the sign-up bar's strings
};

/** CSS for a type role at a size (px). Tabular figures always, so numbers never jitter in width. */
export const typeStyle = (role: keyof typeof TYPE, size = TYPE[role].size * U): React.CSSProperties => ({
  fontFamily: FONT.text,
  fontSize: size,
  fontWeight: TYPE[role].weight,
  letterSpacing: `${TYPE[role].track}em`,
  lineHeight: TYPE[role].lead,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'pre',
});

/**
 * Safe margins for a w x h frame as a symmetric envelope: the larger inset of each pair from the
 * frame's safe-zone preset (src/lib/safe.ts), so a centred layout that fits inside clears every
 * side. 96 x 64 px at 1920x1080; 120 x 420 at 1080x1920, where the feed zones are asymmetric
 * (use safeBox() from lib/safe.ts there to centre on the clear band instead of the frame).
 */
export const safeArea = (w: number, h: number) => {
  const i = safeInsets(undefined, w, h);
  return { x: Math.max(i.left, i.right), y: Math.max(i.top, i.bottom) };
};
/** The film's safe margins; text stays inside them (scripts/layout-audit.sh checks). */
export const SAFE = safeArea(W, H);
