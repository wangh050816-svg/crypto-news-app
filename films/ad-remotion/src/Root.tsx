import React from "react";
import {Composition} from "remotion";
import {z} from "zod";
import {AdTemplate, variantSchema} from "./AdTemplate";
import {ASPECTS} from "./aspects";
import {theme} from "./theme";

export const adSchema = z.object({v: variantSchema, aspect: z.enum(["9x16", "1x1", "16x9"])});

export const RemotionRoot: React.FC = () => (
  <Composition
    id="AdTemplate"
    component={AdTemplate}
    schema={adSchema}
    durationInFrames={theme.durationInSeconds * theme.fps}
    fps={theme.fps}
    width={1080}
    height={1920}
    defaultProps={{
      aspect: "9x16" as const,
      v: {id: "v01_free_card", hook: "註冊就送寶可夢卡包", hookSub: "萬聖節限定・新用戶註冊即享", hero: "pack" as const,
          cta: "立即註冊・領 PKM 卡牌", accent: "#3DF0A0", bg: "#07090A"},
    }}
    calculateMetadata={({props}) => { const a = ASPECTS[props.aspect]; return {width: a.w, height: a.h}; }}
  />
);
