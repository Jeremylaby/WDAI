function getRandomInt(min, max) {
  // Uwaga: Math.floor() zaokrągla w dół, co daje liczbę całkowitą
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function kill(scale, speed) {
  points = Math.floor(3 * (30 / speed) * (1 / scale));
  return points;
}
// Przykład użycia:
var losowaLiczba = getRandomInt(1, 10);
console.log(losowaLiczba);
console.log(kill(0.5, 10));

const sample = require("./highscores.json");
console.log(sample);
DispplayResults();
function OpenJson() {
  fetch("./highscores.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const leaderboard = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
function DispplayResults() {
  console.log(sample.leaderboard[9].score);
  scorepoints = 10;
}
