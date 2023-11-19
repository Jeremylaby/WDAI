const board = document.getElementById("board");
const health = document.getElementById("health");
const score = document.getElementById("score");
const scoredpoints = document.getElementById("points");
const resultsconteiner = document.getElementById("results-conteiner");
const finalscore = document.getElementById("final-points");
const tryagain = document.getElementById("try-again");
const zobiesAll = {};
const loginconteiner = document.getElementById("login-conteiner");
const nick = document.getElementById("nick");
const scales = [0.5, 0.5, 0.5, 1, 1, 1, 1.5, 1.5, 2];
const body = document.querySelector("body");

let gameupdateInterval;
let numberofZombies = 0;
let scorepoints = 0;
let healthpoints = 0;

function DisplayScore() {
  if (scorepoints > 0) {
    score.textContent = scorepoints;
  } else {
    score.textContent = "0";
  }
}
function DisplayHealth() {
  health.innerHTML = "";
  let i = 0;
  for (i; i < healthpoints; i++) {
    const img = document.createElement("img");
    img.src = "images/full_heart.png";
    health.appendChild(img);
  }
  for (let j = i; j < 3; j++) {
    const img = document.createElement("img");
    img.src = "images/empty_heart.png";
    health.appendChild(img);
  }
}
function missed() {
  scorepoints -= 3;
  DisplayScore();
  if (scorepoints <= 0) {
    GameOver();
  }
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function kill(scale, speed) {
  points = Math.floor(10 * (50 / speed) * (1 / scale));
  if (scorepoints > 0) {
    scorepoints += points + 3;
    DisplayScore();
    scoredpoints.textContent = points;
    clearInterval(zobiesAll[this.id]);
    this.remove();
  }
}
function movezombie(zombie, speed) {
  let zombieFrameLenght = 200;
  let bgposition = 2000;
  let position = 0;
  zobiesAll[zombie.id] = setInterval(() => {
    zombie.style.backgroundPositionX = bgposition + "px";
    zombie.style.left = 100 - position + "vw";
    bgposition -= zombieFrameLenght;
    position++;
    if (bgposition == 0) {
      bgposition = 2000;
    }
    if (position == 110) {
      zombie.remove();
      healthpoints -= 1;
      DisplayHealth();
      if (healthpoints <= 0) {
        GameOver();
      }
      clearInterval(zobiesAll[zombie.id]);
    }
  }, speed);
}
function GenerateZombie() {
  let scale = scales[randomInt(0, 8)];
  let height = randomInt(5, 50);
  let speed = randomInt(10, 50);

  let zombie = document.createElement("div");
  zombie.classList.add("zombie");
  zombie.setAttribute("id", numberofZombies);
  zombie.addEventListener("click", function () {
    kill.call(this, scale, speed);
  });
  zombie.style.bottom = height + "vh";
  zombie.style.left = "100vw";
  zombie.style.transform = "scale(" + scale + ")";

  board.appendChild(zombie);
  numberofZombies += 1;
  movezombie(zombie, speed);
}
function StartGame() {
  scorepoints = 30;
  healthpoints = 3;
  numberofZombies = 0;
  DisplayHealth();
  DisplayScore();
  setTimeout(board.addEventListener("click", missed), 200);
  gameupdateInterval = setInterval(() => {
    GenerateZombie();
  }, 700);
}
function PlayAgain() {
  resultsconteiner.style.display = "none";
  StartGame();
}
function GameOver() {
  clearInterval(gameupdateInterval);

  Object.keys(zobiesAll).forEach(function (key) {
    clearInterval(zobiesAll[key]);
  });
  let zombies = document.querySelectorAll(".zombie");
  zombies.forEach((zombie) => {
    zombie.remove();
  });
  board.removeEventListener("click", missed);
  OpenJson();
  if (scoredpoints > scoresdata.leaderboard[9].score) {
    AddNewPlayer();
    return;
  }
  DispplayResults();
}
function OpenJson() {
  fetch("./highscores.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("cos poszlo nie tak");
      }
      return response.json;
    })
    .then((data) => {
      const scoresdata = data;
    })
    .catch((error) => {
      console.error("cos poszlo nie tak", error);
    });
}
function AddNewPlayer() {
  loginconteiner.style.display = "flex";
}
function DispplayResults() {
  finalscore.textContent = scorepoints;
  tryagain.addEventListener("click", PlayAgain);
  resultsconteiner.style.display = "flex";
}
document.addEventListener("DOMContentLoaded", () => StartGame());
