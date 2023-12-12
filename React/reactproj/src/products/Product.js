import React from 'react';
function Product({product}) {
    return (
        <div className="product-card">
            <div className="product">
                <div className="product-conteiner">
                    <img className="product-img" src={product.thumbnail}/>
                    <div className="product-properties">
                        <span className="product-title">{product.title}</span>
                        <span className="product-price">Price: {product.price}$</span>
                        <span className="product-brand">Brand: {product.brand}</span>
                        <span className="product-category">Category: {product.category}</span>
                    </div>
                </div>
                <div className="product-description">{product.description}</div>
                <div className="product-footer">
                    <span className="product-discount">Discount: {product.discountPercentage}%</span>
                    <span className="product-rating">Rating: {product.rating}</span>
                </div>
            </div>
        </div>
    );
}export default Product;