const board = document.getElementById("board");
const health = document.getElementById("health");
const score = document.getElementById("score");
const scoredpoints = document.getElementById("points");
const resultsconteiner = document.getElementById("results-conteiner");
const finalscore = document.getElementById("final-points");
const tryagain = document.getElementById("try-again");
const zobiesAll = {};
const scales = [0.5, 0.5, 0.5, 1, 1, 1, 1.5, 1.5, 2];
const body = document.querySelector("body");
const login_conteiner = document.getElementById("login-conteiner");
const new_nick = document.getElementById("nick");
const leaderboard = document.getElementById("leaderboard");

let nick;
let leaderboard_data;
let gameupdateInterval;
let numberofZombies = 0;
let scorepoints = 0;
let healthpoints = 0;
function OdczytajBazeDanych() {
  fetch("./highscores.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      leaderboard_data = data.leaderboard;
    })
    .catch((error) => {
      console.error("Wystąpił problem podczas operacji fetch:", error);
    });
}

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
  if (leaderboard_data[9].score < scorepoints) {
    DisplayLoginMenu();
    return;
  }
  DisplayPlayAgain();
}
function DisplayLoginMenu() {
  login_conteiner.style.display = "flex";
  const submit = document.getElementById("submit");
  submit.addEventListener("click", AddNewBest);
}
function AddNewBest() {
  nick = new_nick.value;
  submit.removeEventListener("click", AddNewBest);
  login_conteiner.style.display = "none";
  const nowyWynik = { player: nick, score: scorepoints };
  leaderboard_data.push(nowyWynik);
  leaderboard_data.sort((a, b) => b.score - a.score);
  leaderboard_data = leaderboard_data.slice(0, 10);
  fetch("./highscores.json", {
    method: "POST", // Możesz również użyć 'PUT' w zależności od konfiguracji serwera
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ leaderboard_data }),
  });
  DisplayPlayAgain();
}
function DisplayPlayAgain() {
  let newtext = "";
  for (let i = 0; i < 10; i++) {
    newtext +=
      "1: " +
      leaderboard_data[i].player +
      " score: " +
      leaderboard_data[i].score +
      "<br>";
  }
  leaderboard.innerHTML = "";
  leaderboard.innerHTML = newtext;
  resultsconteiner.style.display = "flex";
  finalscore.textContent = scorepoints;
  tryagain.addEventListener("click", PlayAgain);
}
document.addEventListener("DOMContentLoaded", () => {
  OdczytajBazeDanych();
  StartGame();
});
