import React from 'react';
import Product from "./Product";

function ProductsList({products}) {
    return (<div className="products-list">
        {products.map((product) => (<Product key={product.id} product={product}/>))}</div>);
}export default ProductsList;