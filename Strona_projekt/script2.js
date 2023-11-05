const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const galleryContent = document.querySelector(".gallery-content");

let isExpanded = false;

galleryHeader.addEventListener("click", () => {
  if (isExpanded) {
    gallery.style.height = "auto"; /* Rozwiń galerię */
    galleryHeader.style.display = "none"; /* Ukryj nagłówek */
    galleryContent.style.display = "block"; /* Pokaż zawartość */
    isExpanded = false;
  } else {
    gallery.style.height = "300px"; /* Zwin galerię */
    galleryHeader.style.display = "block"; /* Pokaż nagłówek */
    galleryContent.style.display = "none"; /* Ukryj zawartość */
    isExpanded = true;
  }
});
const articles = document.querySelectorAll(".article a");
const articleTitle = document.getElementById("article-title");
const articleSummary = document.getElementById("article-summary");
const articleSummaryContainer = document.querySelector(".article-summary");

articles.forEach((article) => {
  article.addEventListener("mouseover", (e) => {
    const title = e.target.getAttribute("data-title");
    const summary = e.target.getAttribute("data-summary");
    articleTitle.textContent = title;
    articleSummary.textContent = summary;
    articleSummaryContainer.style.display = "block";
  });

  article.addEventListener("mouseout", () => {
    articleSummaryContainer.style.display = "none";
  });
});
