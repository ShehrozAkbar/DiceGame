"use strict";

const score0EL = document.querySelector("#score--0");
const score1EL = document.querySelector("#score--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current0EL = document.querySelector("#current--0");
const current1EL = document.querySelector("#current--1");
// player name
const name0El = document.querySelector("#name--0");
const name1El = document.querySelector("#name--1");
// players elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// starting conditions
score0EL.textContent = "0";
score1EL.textContent = "0";

diceEL.classList.add("hidden");

//rolling thr dice btn fun
btnRoll.addEventListener("click", function () {
  if (
    player0El.classList.contains("player--winner") ||
    player1El.classList.contains("player--winner")
  ) {
    toPlayAgain();
  } else {
    // 1.create a random number
    // 2.display that number dice and add it and display it in current
    // 3.check if number is 1 then switch to other player

    const rand = Number(Math.trunc(Math.random() * 6) + 1);
    console.log(rand);
    diceEL.src = `dice-${rand}.png`;
    diceEL.classList.remove("hidden");

    if (rand === 1) {
      if (player0El.classList.contains("player--active")) {
        player0El.classList.remove("player--active");
        player1El.classList.add("player--active");
        current0EL.textContent = "0";
      } else if (player1El.classList.contains("player--active")) {
        player1El.classList.remove("player--active");
        player0El.classList.add("player--active");
        current1EL.textContent = "0";
      }
    } else {
      if (player0El.classList.contains("player--active")) {
        action(0, rand);
      } else {
        action(1, rand);
      }
    }
  }
});
// this function will set the value of current
function action(user, randnum) {
  if (user == 0) {
    current0EL.textContent = Number(current0EL.textContent) + randnum;
  } else if (user == 1) {
    current1EL.textContent = Number(current1EL.textContent) + randnum;
  }
}

// hold button functionality
btnHold.addEventListener("click", function () {
  if (
    player0El.classList.contains("player--winner") ||
    player1El.classList.contains("player--winner")
  ) {
    toPlayAgain();
  } else {
    if (player0El.classList.contains("player--active")) {
      if (Number(score0EL.textContent) + Number(current0EL.textContent) >= 50) {
        name0El.textContent += " Wins the game";
        player0El.classList.add("player--winner");
        score0EL.textContent =
          Number(score0EL.textContent) + Number(current0EL.textContent);
        current0EL.textContent = 0;
      } else {
        score0EL.textContent =
          Number(score0EL.textContent) + Number(current0EL.textContent);
        current0EL.textContent = 0;
        player0El.classList.remove("player--active");
        player1El.classList.add("player--active");
      }
    } else if (player1El.classList.contains("player--active")) {
      if (Number(score1EL.textContent) + Number(current1EL.textContent) >= 50) {
        name1El.textContent += " Wins the game";
        player1El.classList.add("player--winner");
        Number(score1EL.textContent) + Number(current1EL.textContent);
        current1EL.textContent = 0;
      } else {
        score1EL.textContent =
          Number(score1EL.textContent) + Number(current1EL.textContent);
        current1EL.textContent = 0;
        player1El.classList.remove("player--active");
        player0El.classList.add("player--active");
      }
    }
  }
});

// function to refresh the game
function reset() {
  score0EL.textContent = "0";
  score1EL.textContent = "0";
  diceEL.classList.add("hidden");
  current0EL.textContent = "0";
  current1EL.textContent = "0";
  //   if first player wins
  if (player0El.classList.contains("player--winner")) {
    player0El.classList.remove("player--winner");
    name0El.textContent = "Player 1";
  }
  //   if second player wins
  else {
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");
    name1El.textContent = "Player 2";
  }
}

btnNew.addEventListener("click", reset);

function toPlayAgain() {
  alert("Click on New Game to Play it Again.");
}
