const menu = document.querySelector(".social-menu");
const toggle = document.querySelector(".toggle");
const button = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const Wrapper = document.querySelector("Wrapper");
const git = document.getElementById("git");
const images = ["images/github-logo.PNG", "images/github-mark.PNG"];
const modes = ["moon-sharp", "sunny"];
const music = document.querySelector(".losuj");
music.addEventListener("click", PlayRandom);
let currImageIndex = 0;
button.addEventListener("click", change_to_dark_mode);
toggle.addEventListener("click", display_items);
function display_items() {
  menu.classList.toggle("active");
}
function change_to_dark_mode() {
  currImageIndex = (currImageIndex + 1) % images.length;
  button.querySelector("ion-icon").setAttribute("name", modes[currImageIndex]);
  const newImage = images[currImageIndex];
  git.src = newImage;
  body.classList.toggle("dark");
}

var player;
function SubmitValue() {
  const university = document.getElementById("university").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const comment = document.getElementById("comment").value;
  if (university === "PK") {
    alert("AJAJAJA Cringe");
    window.open("https://www.youtube.com/watch?v=-APGFXVjsMs");
    body.style.backgroundImage = "url('images/Stickman.gif')";
    return false;
  }
}
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    width: "100%",
    higtht: "auto",
    display: "flex",
    events: {
      onStateChange: onPlayerStateChange,
      onReady: onPlayerReady,
    },
    playerVars: {
      allow: "autoplay",
      autoplay: 1,
      listType: "playlist",
      list: "PLpxrJrWZu7vQ9bPEEAJCkqlx8R4UaEHuy",
    },
  });
}
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    PlayRandom();
  }
}
function onPlayerReady(event) {
  PlayRandom();
}
function PlayRandom() {
  num = Math.floor(Math.random() * 32);
  setTimeout(() => {
    player.playVideoAt(num);
  }, 1000);
}
