import React from 'react';
import { Composition, Folder, useCurrentFrame } from 'remotion';
import { Night } from './acts/Night';
import { Stage3D } from './three/Stage3D';
import { C } from './brand/tokens';
import { ACTS, Film, FilmProps } from './Film';
import { FilmSub, subMetadata } from './FilmSub';
import { Audit } from './lib/Audit';
import { FontGate } from './lib/FontGate';
import { ACT, FPS, H, TOTAL, W } from './timeline';

// An act on its own, font-gated like the film and over the same night (at the act's absolute
// frames), so it can be iterated without scrubbing the film. ActN is the Nth entry of ACT.
const solo = (from: number, Act: React.FC) => {
  const Solo: React.FC<FilmProps> = ({ audit = false, safe }) => {
    const f = useCurrentFrame();
    return (
      <FontGate>
        <div style={{ position: 'absolute', inset: 0, background: C.ink }}>
          <Night abs={f + from} />
          <Stage3D abs={f + from} />
          <Act />
          {audit && <Audit safe={safe} />}
        </div>
      </FontGate>
    );
  };
  return Solo;
};
const SOLOS = ACTS.map((a, i) => ({ id: `Act${i + 1}`, dur: ACT[a.key].dur, C: solo(ACT[a.key].from, a.C) }));

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Film" component={Film} durationInFrames={TOTAL} fps={FPS} width={W} height={H} defaultProps={{ audit: false } as FilmProps} />
    <Composition
      id="FilmSub"
      component={FilmSub}
      durationInFrames={TOTAL}
      fps={FPS}
      width={W}
      height={H}
      defaultProps={{ groups: [] as number[] }}
      calculateMetadata={subMetadata}
    />
    <Folder name="Acts">
      {SOLOS.map((s) => (
        <Composition key={s.id} id={s.id} component={s.C} durationInFrames={s.dur} fps={FPS} width={W} height={H} defaultProps={{ audit: false } as FilmProps} />
      ))}
    </Folder>
  </>
);
