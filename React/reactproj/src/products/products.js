import React, {useState, useEffect} from "react";
import ProductsList from "./ProductList";
import ReactDOM from "react-dom/client";
import './products.css'
function OpenData() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((data) => {
                setData(data.products)
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);
    return data;
}
function Products(){
    const productsdata=OpenData();
    return(<div><ProductsList products={productsdata}/></div>)
}export default Products


