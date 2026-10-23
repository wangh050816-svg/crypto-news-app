// 發 Threads 用：「你以為 / 其實」的自然版，不談錢，上格是卡住的狀態、下格是鬆開的樣子
POST({
  author:'',
  slides:[
    {top:{q:'messy desk laptop papers stress',en:'You think you need more time.',zh:'你以為你缺的是時間'},
     bot:{q:'coffee cup morning light',en:'You need less on your plate.',zh:'其實是你手上的事太多'}},
    {top:{q:'person standing alone lake',en:'You think you need to feel ready.',zh:'你以為要準備好才能開始'},
     bot:{q:'jogging sunrise',en:'Ready comes after you start.',zh:'其實是開始了才會準備好'}},
    {top:{q:'tired person laptop at night',en:'You think rest is wasted time.',zh:'你以為休息是在浪費時間'},
     bot:{q:'hammock relax',pick:5,en:'It’s what keeps you going.',zh:'其實那是你走得下去的原因'}},
    {top:{q:'crowd of runners marathon',en:'You think you’re behind.',zh:'你以為自己落後了'},
     bot:{q:'person walking alone forest path',en:'You’re on a different road.',zh:'其實你只是走在不同的路上'}},
    {text:{en:'Slow is still moving.',zh:'慢慢來\n也是在前進'}},
  ],
  caption:`以前覺得自己缺的是時間，
後來才發現，是什麼都捨不得放。

等準備好才開始，其實是體面的拖延。
看別人走得快就慌，
忘了我們本來就不在同一條路上。

現在只問自己：
有沒有在往想去的地方走？
有的話，慢一點也沒關係。`,
});
