'use strict';

const scorePlayer1 = document.getElementById('score--0');
const scorePlayer2 = document.getElementById('score--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');
const Player1 = document.querySelector('.player--0');
const Player2 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing;

// intializing the state

const initialize = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  dice.classList.add('hidden');
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;
  Player1.classList.add('player--active');
  Player2.classList.remove('player--active');
  Player1.classList.remove('player--winner');
  Player2.classList.remove('player--winner');
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Player1.classList.toggle('player--active');
  Player2.classList.toggle('player--active');
};

// initialize before starting

initialize();

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate rand num
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // make the right dice visible
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      // add dice to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player + reset the prev player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add score to the current active
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialize);
