// 每張卡：[場景key, 上格中文, 上格英文, 下格中文, 下格英文]
// 場景key 會對應到 scenes/*.js 裡的 S[key+'Top'] 和 S[key+'Bot']
SET({
  title:'交易心態的6個提醒',
  cards:[
    ['revenge','連虧好幾筆想扳回時','After a losing streak, itching to win it back.','那就今天先別下單',"Then don't place another trade today."],
    ['stop','跌破停損還想再等等時','Stop hit, but hoping it bounces.','那就照計畫出場','Then exit like you planned.'],
    ['miss','錯過一波大漲很不甘心時','Missed the big pump.','那就不追',"Let it go. There's always another one."],
    ['gut','每筆進場都憑感覺時','Trading on gut feeling alone.','那就寫交易日記','Then start a trading journal.'],
    ['chop','看不懂現在的行情時','When the market makes no sense.','那就先空手','Sitting out is a position too.'],
    ['streak','連贏好幾次覺得自己很神時','A winning streak makes you feel unstoppable.','那就把部位調回原本大小','Then size back to normal.'],
  ],
});
