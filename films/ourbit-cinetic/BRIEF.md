# BRIEF — B × OURBIT 萬聖節狂歡夜

**Spec:** `1080x1920@60, 23s, 120BPM, pace: crisp, audio: earshot kit (crisp) + score, 9:16 master`

- **Product:** OURBIT 交易所的萬聖節活動，和使用者的品牌（玫瑰金 B 標誌）聯名宣傳。
- **Message:** 萬聖節註冊 OURBIT，就送寶可夢卡包，另外還有四個加碼福利。
- **Where:** IG Reels、抖音，以 9:16 為主，第一秒要在靜音的動態裡抓住人。
- **Format:** Launch film / teaser 的 9:16 版，crisp 節奏（廣告要有能量，使用者也嫌之前的版本動畫單調）。
- **Engine:** Remotion（沿用 films/ad-remotion 的套件與實拍素材）。
- **Language:** 畫面上所有字都是繁體中文。

## Facts from the poster (do not invent)
- 新用戶註冊：免費送 PKM 卡牌（寶可夢 30th CELEBRATION 卡包）
- 萬聖節限定加碼：最高 30% 儲值返利（依儲值與交易量階梯發放）
- 完成合約交易：最高 588 USDT 體驗金
- 完成任務：免費領 PRL 空投
- VIP 用戶：寶可夢轉盤額外 +10 次抽獎
- 活動時間：10/16 – 10/31（UTC+8）

## Hard bans (copied from cinetic, the QA contract)
- Words: no eyebrow/kicker labels, no stacked taglines, no "Introducing…", no sentence dumped at once; copy arrives as short fragments; no filler text.
- Type: no serif, no italic or fake oblique. One sans (Noto Sans TC), two weights.
- Colour: no orange/amber/beige/cream/tan accents, papers or glows; no neon glows, bloom or halos; no purple/violet/indigo; no multi-hue gradients; no glassmorphism.
- Decoration: no emoji, stock icons, sparkles, particles, confetti, lens flares or code rain; no bouncy overshoot except a true landing; no per-letter tricks on copy.

## Brand-supplied exceptions (critics: do not flag)
- **Accent `#3DF0A0`** is OURBIT's brand green. It is very bright, but it is the client's identity. Used flat: no glow.
- **The rose-gold B mark** (`brandmark.png`) is the user's logo; its warm metallic colour is the brand's, not an accent.
- **Jack-o'-lanterns are photographs** (Pexels): their orange is the subject of the campaign (Halloween), never a UI accent, glow or paper. No orange is added by code.
- **Official Pokémon pack and card art** appear as product photos (the prize), unaltered.
- **Real photography** (moon sky, fog, bitcoin, gold, gift) from Pexels; see films/ad-remotion/sources/CREDITS.md.

## Assumptions
- 23 s instead of the earlier 20 s: crisp holds for five offers plus the lockup need it.
- One film (the "free pack" hook). The CSV variants of films/ad-remotion stay as they are.
- The end card carries the practical fact (10/16 – 10/31) and the action (立即註冊).
