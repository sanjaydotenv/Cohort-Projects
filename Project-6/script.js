const birdContainer = document.querySelector(".bird-container");
const birdPng = document.querySelector(".bird img");

const startBtn = document.querySelector(".startBtn");
const restartBtn = document.querySelector(".restartBtn");

const scoreEl = document.querySelector("#score");
const movesEl = document.querySelector("#moves");

let initialBirdPosition = 200;
let birdMove = initialBirdPosition;
let birdInterval = null;
let pipeSpawner = null;
let isGameStart = false;
let gameOverHoGaya = false;

let score = 0;
let moves = 0;

(() => {
  const moveBird = () => {
    birdMove += 2;

    let gameHeight = birdContainer.clientHeight;
    let birdHeight = birdPng.clientHeight;

    if (birdMove <= 0) {
      birdMove = 0;
      birdPng.style.top = birdMove + "px";
      gameOver();
      return;
    }

    if (birdMove + birdHeight >= gameHeight) {
      birdMove = gameHeight - birdHeight;
      birdPng.style.top = birdMove + "px";
      gameOver();
      return;
    }

    birdPng.style.top = birdMove + "px";
  };

  const moveBirdIntervalFNC = () => {
    birdInterval = setInterval(moveBird, 15);
  };

  const startGame = () => {
    if (isGameStart) return;
    gameOverHoGaya = false;
    moveBirdIntervalFNC();
    pipeSpawner = setInterval(pipeSystem, 2000);
    isGameStart = true;
  };

  startBtn.addEventListener("click", () => {
    startGame();
  });

  const MoveBirdClearIntervalFNC = () => {
    clearInterval(birdInterval);
    clearInterval(pipeSpawner);
  };

  const restartGame = () => {
    document
      .querySelectorAll(".pipeDivTop, .pipeDivBottom")
      .forEach(function (p) {
        p.remove();
      });

    birdPng.style.top = initialBirdPosition + "px";
    birdMove = initialBirdPosition;
    isGameStart = false;
    gameOverHoGaya = false;

    score = 0;
    moves = 0;
    scoreEl.textContent = score;
    movesEl.textContent = moves;

    MoveBirdClearIntervalFNC();
  };

  restartBtn.addEventListener("click", () => {
    restartGame();
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();

      if (gameOverHoGaya) return;

      if (!isGameStart) {
        startGame();
      }

      moves++;
      movesEl.textContent = moves;

      birdMove -= 80;
      if (birdMove < 0) birdMove = 0;
      birdPng.style.top = birdMove + "px";
    }
  });

  window.gameOver = function () {
    if (gameOverHoGaya) return;
    gameOverHoGaya = true;
    isGameStart = false;

    MoveBirdClearIntervalFNC();

    setTimeout(() => {
      alert("Game Over! Score: " + score);
      restartGame();
    }, 10);
  };
})();

function gameOver() {
  window.gameOver();
}

function pipeSystem() {
  const pipeDivTop = document.createElement("div");
  const pipeDivBottom = document.createElement("div");

  pipeDivTop.classList.add("pipeDivTop");
  pipeDivBottom.classList.add("pipeDivBottom");

  const gameHeight = birdContainer.clientHeight;

  const gap = 180;
  const minHeight = 50;
  const maxHeight = gameHeight - gap - minHeight;

  const topHeight =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  const bottomHeight = gameHeight - topHeight - gap;

  pipeDivTop.style.height = topHeight + "px";
  pipeDivBottom.style.height = bottomHeight + "px";

  pipeDivTop.style.right = "-60px";
  pipeDivBottom.style.right = "-60px";

  birdContainer.append(pipeDivTop, pipeDivBottom);

  let pipeMove = -60;
  let scoreDiyaKya = false;

  const moveInterval = setInterval(() => {
    pipeMove += 2;

    pipeDivTop.style.right = pipeMove + "px";
    pipeDivBottom.style.right = pipeMove + "px";

    const birdRect = birdPng.getBoundingClientRect();
    const topRect = pipeDivTop.getBoundingClientRect();
    const bottomRect = pipeDivBottom.getBoundingClientRect();

    const topCollision =
      birdRect.left < topRect.right &&
      birdRect.right > topRect.left &&
      birdRect.top < topRect.bottom &&
      birdRect.bottom > topRect.top;

    const bottomCollision =
      birdRect.left < bottomRect.right &&
      birdRect.right > bottomRect.left &&
      birdRect.top < bottomRect.bottom &&
      birdRect.bottom > bottomRect.top;

    if (topCollision || bottomCollision) {
      clearInterval(moveInterval);
      gameOver();
      return;
    }

    if (!scoreDiyaKya && birdRect.left > topRect.right) {
      scoreDiyaKya = true;
      score++;
      scoreEl.textContent = score;
    }

    const containerRect = birdContainer.getBoundingClientRect();
    if (topRect.right < containerRect.left) {
      clearInterval(moveInterval);
      pipeDivTop.remove();
      pipeDivBottom.remove();
    }
  }, 20);
}
