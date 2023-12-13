import React, {useState, useEffect} from "react";
import ProductsList from "./ProductList";
import ReactDOM from "react-dom/client";
import './products.css'
// eslint-disable-next-line react-hooks/rules-of-hooks
let data, setData;
let productsdata, setProductsData;
function OpenData() {

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((Data) => {
                setData(Data.products)
                setProductsData(Data.products)
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);
}
function Products(){
    [data, setData] = useState([]);
    [productsdata, setProductsData] = useState([]);
    OpenData();
    return(<div><Dsc onClick={()=>searchItems(0)}/><ProductsList products={productsdata}/></div>)
}export default Products
function Dsc(){
    return(<div className={"dsc"} onClick={onclick}>DSC</div>)
}
const searchItems=(type)=>{
   setProductsData(sortProducts(productsdata))
    console.log(productsdata)
}
function replaceNotLetters(text) {
    //Funkcja pomocnicza do sortowania która usuwa znaki niebędące literami
    text = text.replace(/3D /g, "");
    text = text.toLowerCase();
    return text.replace(/[^a-z]/g, "");
}
function sortProducts(dataToSort) {
    //Sortuje po nazwie
    const newdataToSort=dataToSort
    if (newdataToSort) {
        newdataToSort.sort((a, b) => {
            const strA = replaceNotLetters(a.title);
            const strB = replaceNotLetters(b.title);
            return strA.localeCompare(strB);
        });
        return newdataToSort;
    }
}