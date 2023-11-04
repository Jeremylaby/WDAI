const menu = document.querySelector(".social-menu");
const toggle = document.querySelector(".toggle");
const button = document.querySelector(".dark-mode");
const body = document.querySelector("body");
const Wrapper = document.querySelector("Wrapper");
const git = document.getElementById("git");
const images = ["images/github-logo.PNG", "images/github-mark.PNG"];
const modes = ["moon-sharp", "sunny"];
const music = document.querySelector(".losuj");
const pets = document.querySelector(".pets");
const lake = document.querySelector(".lake");
const sea = document.querySelector(".sea");
const village = document.querySelector(".village");
if (pets != null) {
  const pets_header = pets.querySelector(".pets-header");
  pets_header.addEventListener("click", () => {
    DisplayGallery(pets, pets_header);
  });
}
if (lake != null) {
  const lake_header = lake.querySelector(".lake-header");
  lake_header.addEventListener("click", () => {
    DisplayGallery(lake, lake_header);
  });
}
if (sea != null) {
  const sea_header = sea.querySelector(".sea-header");
  sea_header.addEventListener("click", () => {
    DisplayGallery(sea, sea_header);
  });
}
if (village != null) {
  const village_header = village.querySelector(".village-header");
  village_header.addEventListener("click", () => {
    DisplayGallery(village, village_header);
  });
}
if (music != null) {
  music.addEventListener("click", PlayRandom);
}
let currImageIndex = 0;
if (button != null) {
  button.addEventListener("click", change_to_dark_mode);
}
if (toggle != null) {
  toggle.addEventListener("click", display_items);
}
function display_items() {
  menu.classList.toggle("active");
}
function change_to_dark_mode() {
  currImageIndex = (currImageIndex + 1) % images.length;
  button.querySelector("ion-icon").setAttribute("name", modes[currImageIndex]);
  const newImage = images[currImageIndex];
  if (git != null) {
    git.src = newImage;
  }
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
  console.log(university);
  console.log(name);
  console.log(phone);
  console.log(email);
  console.log(comment);
  alert("Spotkanie umuwione ");
}
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    width: "100%",
    height: "400px",
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
function DisplayGallery(gallery, header) {
  const galleryContent = gallery.querySelector(".gallery-content");
  console.log(window.getComputedStyle(galleryContent).display);
  if (window.getComputedStyle(galleryContent).display == "none") {
    galleryContent.style.display = "block";
    header.style.borderRadius = "45px 45px 0px 0px";
    header.style.borderStyle = "none";
    gallery.style.borderStyle = "solid";

    console.log(window.getComputedStyle(galleryContent).display);
  } else {
    galleryContent.style.display = "none";
    header.style.borderRadius = "45px";
    gallery.style.borderStyle = "none";
    header.style.borderStyle = "solid";
    console.log(window.getComputedStyle(galleryContent).display);
  }
}
