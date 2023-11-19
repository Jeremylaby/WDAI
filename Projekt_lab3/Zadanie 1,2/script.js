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
  products.forEach((product) => {
    const listitem = document.createElement("div");
    const ItemImage = document.createElement("img");
    const ItemHeader = document.createElement("h2");
    const ItemDescription = document.createElement("p");
    ItemHeader.textContent = product.title;
    ItemImage.src = product.thumbnail;
    ItemDescription.textContent = product.description;
    listitem.classList.add("list-item");
    listitem.appendChild(ItemHeader);
    listitem.appendChild(ItemImage);
    listitem.appendChild(ItemDescription);
    mainlist.appendChild(listitem);
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
