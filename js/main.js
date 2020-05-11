'use strict';

// ジャンケン関数化  0=グー, 1=チョキ, 2=パーと定義する
let randNum;
function createRand() {
  var num = Math.floor(Math.random() * 3);
  return num;
}

// じゃんけん要素の取得
const pcHands = document.getElementById('pchand-text');
const myHandsGu = document.getElementById('gu_btn');
const myHandsChoki = document.getElementById('cho_btn');
const myHandsPa = document.getElementById('pa_btn');

// 判定要素の取得
const isJudgment = document.getElementById('judgment');
const win = document.getElementById('win');
const lose = document.getElementById('lose');
const draw = document.getElementById('draw');
const game = document.getElementById('game');
const scores = document.getElementById('score');
let counter = { win: 0, lose: 0, draw: 0, game: 0, score: 0 };

// 結果表示
const resultBtn = document.getElementById('result');
const resultArea = document.getElementById('resultarea');
resultArea.style.display = 'none';
resultBtn.addEventListener('click', function () {
  if (counter.game < 1) {
    alert('必ず3試合は対戦してください。');
  } else if (counter.score < 1) {
    alert('得点が3を超えていません。');
  } else {
    resultArea.style.display = 'block';
    document.getElementById('content').style.display = 'none';
    showRank();
  }
});

// リセット
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function () {
  var resetConfirmText = confirm('本当によろしいですか。');
  if (resetConfirmText) {
    window.location.reload();
  }
});

// 再挑戦ボタン
const restart = document.getElementById('restart');
restart.addEventListener('click', function () {
  resultArea.style.display = 'none';
  window.location.reload();
});

// PC側の画像
var pcimages = [
  'img/janken_gu.png',
  'img/janken_choki.png',
  'img/janken_pa.png',
];
var pcimg = document.getElementById('pchandimg');

// 勝ちの関数
function winFnc(hand, imgAry) {
  pcHands.textContent = hand;
  isJudgment.textContent = '勝ち';
  counter.win++;
  win.textContent = counter.win;
  // 得点+1
  counter.score++;
  scores.textContent = counter.score;
  // ジャンケン画像
  pchandimg.setAttribute('src', pcimages[imgAry]);
}

// 負けの関数
function loseFnc(hand, imgAry) {
  pcHands.textContent = hand;
  isJudgment.textContent = '負け';
  counter.lose++;
  lose.textContent = counter.lose;
  // 得点-1
  counter.score--;
  scores.textContent = counter.score;
  // ジャンケン画像
  pchandimg.setAttribute('src', pcimages[imgAry]);
}

// あいこの関数
function drawFnc(hand, imgAry) {
  pcHands.textContent = hand;
  isJudgment.textContent = '引き分け';
  counter.draw++;
  draw.textContent = counter.draw;
  // ジャンケン画像
  pchandimg.setAttribute('src', pcimages[imgAry]);
}

// グーの処理
myHandsGu.addEventListener('click', function () {
  randNum = createRand();
  if (randNum == 0) {
    drawFnc('グー', 0);
  }
  if (randNum == 1) {
    winFnc('チョキ', 1);
  }
  if (randNum == 2) {
    loseFnc('パー', 2);
  }
  countGame();
});

// チョキの処理
myHandsChoki.addEventListener('click', function () {
  randNum = createRand();
  if (randNum == 0) {
    loseFnc('グー', 0);
  }
  if (randNum == 1) {
    drawFnc('チョキ', 1);
  }
  if (randNum == 2) {
    winFnc('パー', 2);
  }
  countGame();
});

// パーの処理
myHandsPa.addEventListener('click', function () {
  randNum = createRand();
  if (randNum == 0) {
    winFnc('グー', 0);
  }
  if (randNum == 1) {
    loseFnc('チョキ', 1);
  }
  if (randNum == 2) {
    drawFnc('パー', 2);
  }
  countGame();
});

// 試合数を数える
function countGame() {
  counter.game++;
  game.textContent = counter.game;
}

// ランクの表示
function showRank() {
  const rank = document.getElementById('ranktext');
  if (counter.game > 50) {
    rank.textContent = 'ナンボ押すねん';
  } else if (counter.game > 30) {
    rank.textContent = 'ノーコメントや';
  } else if (counter.game > 20) {
    rank.textContent = 'あかんわ';
  } else if (counter.game > 10) {
    rank.textContent = 'やるやん';
  } else if (counter.game > 4) {
    rank.textContent = 'ええやん';
  } else {
    rank.textContent = 'まぐれちゃうか？';
  }
}
