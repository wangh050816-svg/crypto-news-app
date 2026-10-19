import React from 'react';
import { AbsoluteFill, getStaticFiles, Html5Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Hook } from './acts/Hook';
import { Lockup } from './acts/Lockup';
import { Night } from './acts/Night';
import { Stage3D } from './three/Stage3D';
import { Offers } from './acts/Offers';
import { Signup } from './acts/Signup';
import { C } from './brand/tokens';
import { Audit } from './lib/Audit';
import { FontGate } from './lib/FontGate';
import type { SafeSpec } from './lib/safe';
import { ACT } from './timeline';

/** Written by `npm run audio`. Renders are muted and scripts/render.sh muxes it with ffmpeg. */
export const SOUNDTRACK = 'audio/soundtrack.wav';

/** audit: draw and log the layout audit; safe: its safe zone (a lib/safe.ts preset or insets; default by aspect). */
export type FilmProps = { audit?: boolean; safe?: SafeSpec };

/** The acts in order, for Film and the per-act compositions (Root.tsx: ActN is the Nth entry of ACT). */
export const ACTS: { key: keyof typeof ACT; name: string; C: React.FC }[] = [
  { key: 'hook', name: '1 Hook', C: Hook },
  { key: 'signup', name: '2 Sign-up', C: Signup },
  { key: 'offers', name: '3 Offers', C: Offers },
  { key: 'lockup', name: '4 Lockup', C: Lockup },
];

// The film: the night (with the device) runs under everything on the absolute frame, so it never
// jumps at a cut; one Sequence per act on top, handing off on exact frames.
export const Film: React.FC<FilmProps> = ({ audit = false, safe }) => {
  const f = useCurrentFrame();
  const hasScore = getStaticFiles().some((s) => s.name === SOUNDTRACK);
  return (
    <FontGate>
      <AbsoluteFill style={{ background: C.ink }}>
        <Night abs={f} />
        <Stage3D abs={f} />
        {ACTS.map(({ key, name, C: Act }) => (
          <Sequence key={key} from={ACT[key].from} durationInFrames={ACT[key].dur} name={name}>
            <Act />
          </Sequence>
        ))}
        {hasScore && <Html5Audio src={staticFile(SOUNDTRACK)} />}
        {audit && <Audit safe={safe} />}
      </AbsoluteFill>
    </FontGate>
  );
};
