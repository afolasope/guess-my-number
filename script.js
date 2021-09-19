"use strict";
const restartBtn = document.querySelector(".restart-btn");
const numberInput = document.getElementById("number-iput");
const msg = document.querySelector(".message");
const checkBtn = document.querySelector(".check-btn");
const scoreInput = document.querySelector(".score");
const highscoreInput = document.querySelector(".highscore");
console.log(highscoreInput);

let randonNum = Math.floor(Math.random() * 20) + 1;
let number;
let score = 20;
let highscore = localStorage.getItem("highscore") || 0;
let isWon = false;

const handleScore = function () {
  if (randonNum !== number) {
    score--;
    scoreInput.textContent = score;
  }
};

const handleRestart = function () {
  numberInput.value = "";
  msg.textContent = "🏆 You win";
  document.querySelector("body").style.backgroundColor = "rgb(213, 247, 144)";
  msg.textContent = "🟢 Start guessing...";
  randonNum = Math.floor(Math.random() * 20) + 1;
  score = 20;
  document.querySelector(".replace-num").textContent = "?";
  scoreInput.textContent = 20;

  isWon = false;
// Disabling the input and button after player has won
  // numberInput.removeAttribute("disabled");
  // checkBtn.removeAttribute("disabled");
};

const checkNum = function () {
  number = parseInt(numberInput.value);
  if (isWon) {
    handleRestart();
  }

  numberInput.value = number;

  if (randonNum === number) {
    msg.textContent = "🏆 You win!";
    document.querySelector("body").style.backgroundColor = "green";
    numberInput.value = "";
    document.querySelector(".replace-num").textContent = randonNum;
    isWon = true;

    // numberInput.setAttribute("disabled", true);
    // checkBtn.setAttribute("disabled", true);
    handleScore();

    console.log(score);
    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore);
      displayHighScore(highscore);
    }
  } else if (number > randonNum) {
    msg.textContent = "↖︎ Too high...";
    handleScore();
  } else if (number < randonNum) {
    if (!number) return;
    msg.textContent = "↘︎ Too low...";
    handleScore();
  }
};

const displayHighScore = function (highscore) {
  highscoreInput.textContent = highscore;
};

displayHighScore(highscore);

checkBtn.addEventListener("click", checkNum);
restartBtn.addEventListener("click", handleRestart);
