const menu = document.querySelector(".social-menu");
const toggle = document.querySelector(".toggle");
const button = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const Wrapper = document.querySelector("Wrapper");
const git = document.getElementById("git");
const images = ["images/github-logo.PNG", "images/github-mark.PNG"];
const modes = ["moon-sharp", "sunny"];
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

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "50%",
    width: "80%",
    events: {
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

function onPlayerReady(event) {
  num = Math.floor(Math.random() * 32);
  setTimeout(() => {
    player.playVideoAt(num);
  }, 2000);
}
