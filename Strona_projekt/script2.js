const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const galleryContent = document.querySelector(".gallery-content");

let isExpanded = false;

galleryHeader.addEventListener("click", () => {
  if (isExpanded) {
    galleryContent.style.display = "none";
    isExpanded = false;
  } else {
    galleryContent.style.display = "block";
    isExpanded = true;
  }
});
