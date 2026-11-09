# 纏論實戰｜盤整中樞、背馳、跌破中樞做空（原片：1:35 直播回放的螢幕錄影，ZECUSDT，1920×1080）
# 原片放在 SRC，不 commit 影片本身。時間都是原片秒數；字幕時間來自 faster-whisper 的逐字時間戳，文字已人工校正。
# 這支是實戰案例，畫面本來就是真實 K 線，沒有示意圖可換。最後「九哥感謝…你先忙」是跟觀眾的私人對話，不剪進來。
SRC = 'shorts/src/new.mp4'
SPEED = 1.0
GAP = 0
TIGHT = True
SQUEEZE = .25           # 每句裡超過 0.25 秒的停頓縮到約 0.12 秒（畫面跟著剪）
SMOOTH_CUTS = True
DENOISE = True
DECLICK = True
HATS = 0
MUSIC_VOL = 0
SHAKE, FLASH = 6, 60
BOOM_VOL, WHOOSH_VOL = .45, 0
LAYOUT = 'landscape'
CROP_LANDSCAPE = (76, 190, 1396, 784)  # K 線圖＋MACD 區（去掉上方直播標題、網址列、工具列、右邊報價欄、價格軸、下方播放器進度條）
CROP = CROP_LANDSCAPE
CAPTION_STYLE = 'plain'
ICONS = {'discord': 'shorts/assets/discord.png'}
BADGE = dict(path='shorts/assets/xiaoyi-badge.png', width=170, opacity=.92, skip=['hook'])
FOOTER = '教學分享・非投資建議'

CHAPTERS = {
    'hook': ('纏論實戰', '價格創新高，卻要[做空]？'),
    'c1': ('① 先看結構', '盤整[還沒結束]'),
    'c2': ('② 進場條件', '頂分型＋[次級別背馳]'),
    'c3': ('③ 關鍵一步', '跌破[中樞]'),
    'finale': ('纏論實戰', '目標在哪？'),
}

Z = (1.0, 1.0, .5, .5)   # 實戰畫面要看得到整個中樞和 MACD，不放大
CLIPS = [
    # 開頭鉤子：最有張力的一句，約 3 秒，一口氣講完，畫面照原片播
    dict(s=61.05, e=63.75, chapter='hook', zoom=Z, squeeze=.15, free_video=True, boom=[63.4],
         caps=[(61.05, '所以這邊跌破中樞'), (62.6, '是可以進場[做空]的')]),
    # ① 先看結構
    dict(s=6.15, e=10.7, chapter='c1', zoom=Z,
         caps=[(6.15, '它現在的市場型態'), (9.7, '走[中樞延伸]')]),
    dict(s=11.35, e=14.3, chapter='c1', zoom=Z,
         caps=[(11.35, '震盪一直在繼續'), (13.4, '[盤整]還沒有結束')]),
    dict(s=14.65, e=17.95, chapter='c1', zoom=Z,
         caps=[(14.65, '這種情況'), (15.5, '就按[盤整走勢]來處理')]),
    dict(s=18.0, e=20.65, chapter='c1', zoom=Z,
         caps=[(18.0, '用下跌中樞的[類二賣]'), (20.3, '去介入')]),
    # ② 進場條件
    dict(s=21.0, e=23.2, chapter='c2', zoom=Z,
         caps=[(21.0, '怎麼介入？'), (22.0, '[三個條件]')]),
    dict(s=23.4, e=24.75, chapter='c2', zoom=Z,
         caps=[(23.4, '第一：[頂分型]')]),
    dict(s=25.5, e=26.95, chapter='c2', zoom=Z,
         caps=[(25.5, '第二：[次級別背馳]')]),
    dict(s=27.0, e=29.3, chapter='c2', zoom=Z,
         caps=[(27.0, '來看次級別有沒有背馳')]),
    dict(s=32.15, e=35.95, chapter='c2', zoom=Z,
         caps=[(32.15, '看一下 MACD'), (35.6, '有看到吧')]),
    dict(s=36.35, e=43.95, chapter='c2', zoom=Z,
         caps=[(36.35, '價格創出新的高點'), (38.3, '但是下方的 MACD'), (40.7, '沒辦法同步新高'), (41.7, '反而[反方向]運行')]),
    dict(s=44.0, e=46.85, chapter='c2', zoom=Z,
         caps=[(44.0, '這邊出現[背馳]了'), (45.5, '符合背馳條件'), (46.6, '很棒')]),
    # ③ 關鍵一步
    dict(s=47.5, e=49.2, chapter='c3', zoom=Z,
         caps=[(47.5, '接下來關注這個頂分型')]),
    dict(s=49.8, e=52.35, chapter='c3', zoom=Z,
         caps=[(49.8, '關鍵是'), (51.0, '有沒有跌破[中樞破壞點]')]),
    dict(s=54.85, e=55.95, chapter='c3', zoom=Z,
         caps=[(54.85, '這裡跌破[很重要]')]),
    dict(s=56.85, e=59.2, chapter='c3', zoom=Z,
         caps=[(56.85, '接著它又處在[中樞區]')]),
    dict(s=64.05, e=65.1, chapter='c3', zoom=Z,
         caps=[(64.05, '這裡可以進場[做空]')]),
    # 壓軸：目標＝等低點的流動性，DOL 約 1120
    dict(s=65.15, e=66.6, chapter='finale', zoom=Z,
         caps=[(65.15, '目標就是')]),
    dict(s=67.55, e=68.95, chapter='finale', zoom=Z,
         caps=[(67.55, '[雙底]的流動性')]),
    dict(s=69.3, e=73.6, chapter='finale', zoom=Z,
         caps=[(69.3, '在同一個價格水平'), (71.5, '形成的低點')]),
    dict(s=73.75, e=74.8, chapter='finale', zoom=Z,
         caps=[(73.75, '[等低點]的流動性')]),
    dict(s=75.35, e=80.75, chapter='finale', zoom=Z, boom=[79.7],
         caps=[(75.35, '所以它的 DOL'), (77.1, '很明確'), (78.0, '就在差不多 [1120]')]),
    dict(s=83.55, e=85.6, chapter='finale', zoom=Z,
         caps=[(83.55, '做空的目標'), (84.85, '可以抓到這邊')]),
]

# ---------- 重點感 ----------
CHAPTER_INTRO = True
# 重點卡：進場條件一條一條打勾
KEYS = [
    dict(t0=23.4, t1=65.1, lines=[(23.4, '① 頂分型'), (25.5, '② 次級別背馳'), (44.0, '　→ 背馳成立'), (51.0, '③ 跌破中樞破壞點'), (64.05, '　→ 進場做空')]),
]
# 圖上標註：壓軸畫出兩個等低點和 DOL 1120（座標是 CROP 裡的像素，在 82s 的畫面量的）
MARKS = [
    dict(kind='dot', at=(564, 557), label='等低點', off=(-60, 30), t0=69.3, t1=85.6),
    dict(kind='dot', at=(924, 548), label='等低點', off=(-60, 30), t0=71.5, t1=85.6),
    dict(kind='hline', y=556, x0=420, x1=1300, label='DOL 1120', t0=75.35, t1=85.6),
]

END_CARD = dict(dur=12, step=1.3, badge=270, fade=1.2, out=3.0, boom=False, kwcolor=(232, 186, 110), lines=[
    ('跌破中樞之後，還會回來嗎？', 84),
    ('本週末　[第三類買賣點]', 70),
    ('[纏道漫長]　週末直播', 52),
    ('11/14（六）、11/15（日）[15:00]　{discord} Discord 見', 46),
])
COVER_AT = 0.5

CAPTION = '''
價格創新高，為什麼要做空？
盤整還沒結束、次級別 MACD 背馳、再跌破中樞，三個條件到齊才進場。
目標看等低點的流動性。
本週末直播講第三類買賣點：11/14、11/15 15:00，Discord 見。

#纏論 #實戰 #背馳 #技術分析 #加密貨幣
'''
