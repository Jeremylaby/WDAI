// Utwórz nowy obiekt Request
const request = new Request("https://dummyjson.com/products");
let productdata;
const mainlist = document.getElementById("main-list");
const ascbutton = document.querySelector(".asc");
const dscbutton = document.querySelector(".dsc");
const defbutton = document.querySelector(".default");
const phrase = document.getElementById("searched-phrase");
defbutton.addEventListener("click", () => displaySorted(0));
ascbutton.addEventListener("click", () => displaySorted(1));
dscbutton.addEventListener("click", () => displaySorted(2));
document.addEventListener("DOMContentLoaded", () => {
  //Pobiera dane z pliku json
  fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      productdata = data;
      Itemstodisplay = data.products;
      displayElements(data.products);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
function displayElements(products) {
  //Wyświetla wybrane elementy
  mainlist.innerHTML = "";
  let counter=0;
  products.forEach((product) => {
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardTitle = document.createElement("h5");
    const cardText = document.createElement("p");
    const column = document.createElement("div");
    let row;
    if(counter%2===0){
      row=document.createElement("div");
      row.classList.add("row");
    }else{
      row = mainlist.lastElementChild;
    }
    card.style.marginTop="10px"
    column.classList.add("col-sm-6");
    column.classList.add("d-flex");
    column.classList.add("align-items-baseline");
    column.classList.add("justify-content-center");
    cardTitle.textContent = product.title;
    cardImg.src = product.thumbnail;
    cardText.textContent = product.description;
    card.classList.add("card");
    card.classList.add("text-bg-dark");
    cardImg.classList.add("card-img-top")
    cardBody.classList.add("card-body")
    cardTitle.classList.add("card-title")
    cardText.classList.add("card-text")
    card.appendChild(cardImg);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    card.style.width="80%"
    column.appendChild(card)
    row.appendChild(column)
    if(counter%2===0) {
      mainlist.appendChild(row);
    }
    counter++;
  });
}
function replaceNotLetters(text) {
  //Funkcja pomocnicza do sortowania która usuwa znaki niebędące literami
  text = text.replace(/3D /g, "");
  text = text.toLowerCase();
  return text.replace(/[^a-z]/g, "");
}
function sortProducts(dataToSort) {
  //Sortuje po nazwie
  if (dataToSort) {
    dataToSort.sort((a, b) => {
      const strA = replaceNotLetters(a.title);
      const strB = replaceNotLetters(b.title);
      return strA.localeCompare(strB);
    });
    return dataToSort;
  }
}
function sortId(dataToSort) {
  //Sortuje po id czyli domyślne sortowanie
  if (dataToSort) {
    dataToSort.sort((a, b) => a.id - b.id);
  }
  return dataToSort;
}

function displaySorted(arg) {
  //Sortuje w określony spoób
  switch (arg) {
    case 0:
      displayElements(sortId(Itemstodisplay)); //domyślnie
      break;
    case 1:
      displayElements(sortProducts(Itemstodisplay)); //rosnąco
      break;
    case 2:
      displayElements(sortProducts(Itemstodisplay).reverse()); //malejąco
      break;
    default:
      console.log("cos poszlo nie tak");
  }
}
function SearchItems() {
  //funkcja wyszukuje po frazie
  const searchedPhrase = phrase.value.toLowerCase();
  const categoryInput = document.getElementById("category");
  const category = categoryInput.value;

  if (category === "default") {
    Itemstodisplay = productdata.products.filter((product) =>
      product.title.toLowerCase().includes(searchedPhrase)
    );
  } else {
    Itemstodisplay = productdata.products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchedPhrase) &&
        product.category === category
    );
  }
  displayElements(Itemstodisplay);
}
