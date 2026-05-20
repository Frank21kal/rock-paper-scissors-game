// Algorithm:
// when we click a button:
// 1. get the player's move
// 2. get the computer's move
// 3. compare the moves and determine the winner
// 4. update the score and display the result

let scores = JSON.parse(localStorage.getItem('scores'));
let difficulty = 'easy';
let playerRoundWins = 0;
let computerRoundWins = 0;

if (!scores) {
  scores = {
    Wins: 0,
    Losses: 0,
    Draws: 0
  };
}

updateScore();


function playGame(playerMove) {
  let computerMove = pickCompMove(playerMove);
  let result;

  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') result = 'Draw!';
    else if (computerMove === 'Paper') result = 'You lose!';
    else result = 'You win!';
  }

  else if (playerMove === 'Paper') {
    if (computerMove === 'Paper') result = 'Draw!';
    else if (computerMove === 'Scissors') result = 'You lose!';
    else result = 'You win!';
  }

  else if (playerMove === 'Scissors') {
    if (computerMove === 'Scissors') result = 'Draw!';
    else if (computerMove === 'Rock') result = 'You lose!';
    else result = 'You win!';
  }

  if (result === 'You win!') {
    scores.Wins++;
    playerRoundWins++;
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  } else if (result === 'You lose!') {
    scores.Losses++;
    computerRoundWins++;
    document.querySelector('.game-card').classList.add('shake');
    setTimeout(() => {
      document.querySelector('.game-card').classList.remove('shake');
    }, 400);
  } else scores.Draws++;


  if (gameMode === 3) {
    if (playerRoundWins === 2) {
      showStatus('🎉 You won Best of 3!');
      resetRounds();
    }
    else if (computerRoundWins === 2) {
      showStatus('💀 Computer won Best of 3!');
      resetRounds();
    }
  }
  if (gameMode === 5) {
    if (playerRoundWins === 3) {
      showStatus('🎉 You won Best of 5!');
      resetRounds();
    }
    else if (computerRoundWins === 3) {
      showStatus('💀 Computer won Best of 5!');
      resetRounds();
    }
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  document.querySelector('.result').innerHTML = result;

  document.querySelector('.choices').innerHTML =
    `You
        <img src="pics/${playerMove}-emoji.png" class="icons"> -
        <img src="pics/${computerMove}-emoji.png" class="icons"> 
        Computer`;

  updateScore();
}


function setDifficulty(level) {
  difficulty = level;
  document
    .querySelectorAll('.difficulty button')
    .forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelector('.current-mode')
    .innerHTML = `Difficulty: ${level}`;
}

// function pickCompMove() {
//   const ranNum = Math.random();

//   if (ranNum < 1 / 3) return 'Rock';
//   else if (ranNum < 2 / 3) return 'Paper';
//   else return 'Scissors';
// }


function pickCompMove(playerMove) {
  const moves = ['Rock', 'Paper', 'Scissors'];

  if (difficulty === 'easy') {
    return moves[Math.floor(Math.random() * 3)];
  }

  else if (difficulty === 'medium') {
    if (Math.random() < 0.5) {
      return moves[Math.floor(Math.random() * 3)];
    }
    return counterMove(playerMove);
  }

  else {
    return counterMove(playerMove);
  }
}


function counterMove(playerMove) {

  if (playerMove === 'Rock') return 'Paper';
  if (playerMove === 'Paper') return 'Scissors';
  return 'Rock';
}


function updateLeaderboard() {

  let bestScore =
    localStorage.getItem('bestWins') || 0;

  if (scores.Wins > bestScore) {

    localStorage.setItem('bestWins', scores.Wins);

    bestScore = scores.Wins;
  }

  const totalGames =
    scores.Wins + scores.Losses + scores.Draws;

  document.querySelector('.best-score').innerHTML =
    `Best Wins: ${bestScore}`;

  document.querySelector('.games-played').innerHTML =
    `Games Played: ${totalGames}`;
}


function updateScore() {

  document.getElementById('wins').innerHTML =
    scores.Wins;

  document.getElementById('losses').innerHTML =
    scores.Losses;

  document.getElementById('draws').innerHTML =
    scores.Draws;

  updateLeaderboard();
}


function resetScore() {
  scores = { Wins: 0, Losses: 0, Draws: 0 };
  localStorage.removeItem('scores');
  updateScore();
  document.querySelector('.result').innerHTML = '';
}


function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

function toggleMenu() {
  document.querySelector('.nav-links')
    .classList.toggle('active');
}

let gameMode = 3;

function setMode(mode) {
  gameMode = mode;
  document
    .querySelectorAll('.game-modes button')
    .forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelector('.current-game-mode')
    .innerHTML = `Mode: ${mode}`;
}

function resetRounds() {
  playerRoundWins = 0;
  computerRoundWins = 0;
}

function showStatus(message) {
  const status =
    document.querySelector('.game-status');
  status.innerHTML = message;
  status.classList.add('show');
  setTimeout(() => {
    status.classList.remove('show');
  }, 3000);
}
