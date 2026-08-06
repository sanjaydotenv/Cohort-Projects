const birdContainer = document.querySelector(".bird-container");
const birdPng = document.querySelector(".bird img");

const startBtn = document.querySelector(".startBtn");
const restartBtn = document.querySelector(".restartBtn");

let initialBirdPosition = 200;
let birdMove = initialBirdPosition;
let birdInterval = null;
let isGameStart = false;

(() => {
  const moveBird = () => {
    birdMove += 2;
    birdPng.style.top = birdMove + "px";
  };

  const moveBirdIntervalFNC = () => {
    birdInterval = setInterval(moveBird, 15);
  };
  const startGame = () => {
    if (isGameStart) return;
    moveBirdIntervalFNC();
    isGameStart = true;
  };
  startBtn.addEventListener("click", () => {
    startGame();
  });

  const MoveBirdClearIntervalFNC = () => {
    clearInterval(birdInterval);
  };
  const restartGame = () => {
    birdPng.style.top = initialBirdPosition + "px";
    birdMove = initialBirdPosition;
    isGameStart = false;
    MoveBirdClearIntervalFNC();
  };
  restartBtn.addEventListener("click", () => {
    restartGame();
  });
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      if (!isGameStart) {
        startGame();
      }

      birdMove -= 80;
      birdPng.style.top = birdMove + "px";
    }
  });
})();


