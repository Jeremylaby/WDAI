import React, {useState, useEffect} from "react";
import ProductsList from "./ProductList";
import ReactDOM from "react-dom/client";
import './products.css'
import product from "./Product";


function Products() {
    const [data, setData] = useState([]);
    const [productsdata, setProductsData] = useState([]);


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

    const sortItems = (type) => {
        let dataToSort = [...productsdata]
        switch (type) {
            case "dsc":
                setProductsData(sortProducts(dataToSort))
                break;
            case "asc":
                setProductsData(sortProducts(dataToSort).reverse())
                break;
            case "none":
                setProductsData([...productsdata.sort((a, b) => a.id - b.id)])
                break;
        }
        console.log(productsdata)
    }
    const sortProducts = (dataToSort) => {
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
    const searchItems = (e) => {
        let searchPhrase = e.target.value
        console.log(searchPhrase)
        setProductsData(data.filter((product) => product.title.toLowerCase().includes(searchPhrase)))
    }
    return (<><div className="button-conteiner"><div className="buttons"><div className="sort-buttons">
        <div className={"Dsc"} onClick={() => sortItems('dsc')}>DSC</div>
        <div className={"Asc"} onClick={() => sortItems('asc')}>ASC</div>
        <div className={"Default"} onClick={() => sortItems('none')}>DEFAULT</div></div>
        <input type="text" placeholder={"search"} onChange={(e)=>searchItems(e)}/></div>
    </div>
        <ProductsList products={productsdata}/></>)
}

export default Products


function replaceNotLetters(text) {
    //Funkcja pomocnicza do sortowania która usuwa znaki niebędące literami
    text = text.replace(/3D /g, "");
    text = text.toLowerCase();
    return text.replace(/[^a-z]/g, "");
}