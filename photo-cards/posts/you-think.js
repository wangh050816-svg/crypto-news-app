// 發 Threads 用：「你以為 / 其實」的自然版，不談錢，上格是卡住的狀態、下格是鬆開的樣子
POST({
  author:'',
  slides:[
    {top:{q:'messy desk laptop papers stress',en:'You think you need more time.',zh:'你以為你缺的是時間'},
     bot:{q:'coffee cup morning light',en:'You need less on your plate.',zh:'其實是你手上的事太多'}},
    {top:{q:'person standing alone lake',en:'You think you need to feel ready first.',zh:'你以為要準備好才能開始'},
     bot:{q:'jogging sunrise',en:'Ready comes after you start.',zh:'其實是開始了才會準備好'}},
    {top:{q:'tired person laptop at night',en:'You think rest is wasted time.',zh:'你以為休息是在浪費時間'},
     bot:{q:'hammock relax',pick:5,en:'It’s what keeps you going.',zh:'其實那是你走得下去的原因'}},
    {top:{q:'crowd of runners marathon',en:'You think you’re behind.',zh:'你以為自己落後了'},
     bot:{q:'person walking alone forest path',en:'You’re just on a different road.',zh:'其實你只是走在不同的路上'}},
    {text:{en:'Slow progress is still progress.',zh:'慢慢來\n也是在前進'}},
  ],
  caption:`很多人以為自己缺的是時間，
其實缺的是取捨。

說要等準備好再開始，
多半只是還沒準備好面對結果。
看別人走得快就焦慮，
卻忘了每個人的路本來就不一樣。

走得遠的人，在意的是方向，
速度，就交給時間。`,
});
