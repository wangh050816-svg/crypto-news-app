# TREATMENT — 南瓜燈的光

## Specifics first
- **The name / the campaign:** 萬聖節的「不給糖就搗蛋」。OURBIT 這次反過來：不用搗蛋，註冊就給。
- **Unlike the obvious version:** 一般的活動廣告是五張福利卡排隊閃過。這支的福利是「從南瓜燈的光裡被送出來的」：註冊這個動作直接觸發第一份好禮，之後每份好禮都轉進同一道光裡才亮起來。
- **The product's own objects:** 註冊輸入列和按鈕、寶可夢卡包、儲值返利的比例、588 USDT、空投禮盒、轉盤抽到的卡。

## Three concepts
- **(a) 產品的動詞變成畫面：** 「註冊」標題裂開，長成 OURBIT 的註冊輸入列；按下去，獎品從南瓜燈裡升起。✔ chosen
- (b) 痛點可見化：空空的糖果袋。被刪：道具誰都能用，不是這個活動獨有的。
- (c) 形式裝置：一顆南瓜從頭到尾一鏡到底。併入 (a)：南瓜燈成了貫穿全片的光源裝置。

**Logline (13 字):** 不給糖？註冊 OURBIT，南瓜燈就把好禮送到你手上。

## Device
The jack-o'-lantern (a real photo) sits at the bottom centre of every shot. Its light is the **lens line**: in the hook it flares on the cut; in the sign-up act the prize rises out of it; in the offer wheel every offer lights up only while it passes over it; at the end the light hands over to the B × OURBIT lockup. It never blinks out at a cut.

## Drawn techniques (`pick.py --seed 2414508252 --format vertical --energy medium --seconds 20`)
| Technique | Where | Retold as |
|---|---|---|
| `oh-quiet-intro-drop` | bar 1 → cut at b(2) | dark, fog, one question; the drop lands on the hard cut to the sign-up headline |
| `pd-headline-becomes-input` | bars 2–3 | 「註冊 ｜ 就送」: the gap's caret swells into the OURBIT sign-up bar |
| `mi-guide-cursor-hover-press` | bar 3 | snappy cursor presses 「註冊」; the press makes the pack rise |
| `ty-recentre-line-build` | bar 4 | 「寶可夢卡包」 rises under the pack (single CJK fragment; re-centre is trivial) |
| `ui-lens-list-scroll` | bars 5–9 | rolodex of four offers turning past the pumpkin's light; flat picker scale/tint by distance |
| `dn-unit-grid-tally` | bar 5–6 | 30% as 3 of 10 cells filling, the third landing in the accent |
| `le-mark-slide-name-follow` | bars 10–11 | 9:16 stack variant: B mark rises, OURBIT rises in under it |
| `tr-envelope-match-type-cut` | — | **dropped**: CJK lines have no word gaps to close, the device has nothing to grip |

## Arc and beat sheet (120 BPM, bar = 120 f = 2 s)
| bar | time | picture | copy (fragment, mode) | picture beat | sound |
|---|---|---|---|---|---|
| 1 | 0–2 s | night, fog drifting, pumpkin lit at bottom, camera creeping | 「不給糖？」 (replace) | the pumpkin flame flares | filtered pad, quiet |
| 2 | 2–4 s | HARD CUT: 「註冊　就送」, caret in the gap swells to the sign-up bar | 「註冊」「就送」 (one line, two words) | the bar shoves the words aside | **drop** on the cut, pop on caret, whoosh on widen |
| 3 | 4–6 s | cursor arrives, presses 「註冊」 | — (UI strings only) | press → pumpkin light flares, pack rises | click on press, riser |
| 4 | 6–8 s | the pack lands above the pumpkin | 「寶可夢卡包」 | pack lands with contact | land on contact, text |
| 5–6 | 8–10.5 s | wheel turns: bitcoin over the light; 10 cells, 3 fill | 「儲值返利 最高 30%」 | cells tally | whoosh per turn, tick on tally lock |
| 6–7 | 10.5–13 s | wheel: gold bars | 「最高 588 USDT 體驗金」 | gold lights | whoosh, text |
| 7–8 | 13–15.5 s | wheel: gift box drops onto the light | 「PRL 空投」 | gift lands | land |
| 8–9 | 15.5–18 s | wheel: three official cards fan open | 「VIP 轉盤 +10 次」 | fan opens | snap |
| 10–11 | 18–22 s | light hands over: B mark rises, OURBIT rises under it | 「立即註冊」「10/16 – 10/31」 | lockup | stop-down, ONE hit |
| tail | 22–23 s | hold, creep | | | decay |

## Copy (word count by fragment, CJK phrase = 1 word)
不給糖？(1) · 註冊 / 就送 (2) · 寶可夢卡包 (1) · 儲值返利 最高 30% (3) · 最高 588 USDT 體驗金 (4) · PRL 空投 (2) · VIP 轉盤 +10 次 (4) · 立即註冊 (1) · 10/16 – 10/31 (3) = **21 words**, inside the 15–25 budget.

## Final frame
B mark over the OURBIT wordmark, 「立即註冊」 and the dates under it, the pumpkin's light below, fog still moving.

## Tests
- **Deletion:** remove the sign-up and the wheel and nothing says why to register; remove the offers and the film is a sign-up form. Both halves carry it.
- **Specificity:** a generic promo shows five cards. This one shows that *registering* is what releases the pack, and every offer lights in the same pumpkin light. Passes.
- **Feature word:** muted, a stranger says 「註冊送卡包」. Passes.
