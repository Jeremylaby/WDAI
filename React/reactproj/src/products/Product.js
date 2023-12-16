import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

function Product({product,onEdit}) {
    const [edit, setEdit] = useState(false);
    const titleRef = useRef("");
    const descriptionRef = useRef("");
    const priceRef = useRef("")
    const handleCancel = () => {
        titleRef.current.innerText = product.title;
        descriptionRef.current.innerText = product.description;
        priceRef.current.innerText = product.price;
        setEdit(false);
    };
    const handleAccept=()=>{
        const updatedProduct = {
            ...product,
            title: titleRef.current.innerText,
            description: descriptionRef.current.innerText,
            price: priceRef.current.innerText,
        };
        onEdit(updatedProduct,product.id);
        setEdit(false);
    }
    return (

        <div className="product-card">
            {!edit &&
                (<div className={"edit-conteiner"}><FontAwesomeIcon className={"edit-icon"} onClick={() => {
                    setEdit(true)
                }} icon={faPenToSquare} style={{color: "#ffffff",}}/></div>)}
            <div className="product">
                <div className="product-conteiner">
                    <img className="product-img" src={product.thumbnail}/>
                    <div className="product-properties">
                        <span ref={titleRef} contentEditable={edit} className="product-title">{product.title}</span>
                        <span className="product-price">Price: <span ref={priceRef}
                                                                     contentEditable={edit}>{product.price}</span>$</span>
                        <span className="product-brand">Brand: {product.brand}</span>
                        <span className="product-category">Category: {product.category}</span>
                    </div>
                </div>
                <div ref={descriptionRef} contentEditable={edit}
                     className="product-description">{product.description}</div>
                <div className="product-footer">
                    <span className="product-discount">Discount: {product.discountPercentage}%</span>
                    <span className="product-rating">Rating: {product.rating}</span>
                </div>
                {edit &&<div className={"accept-cancel"}><span onClick={handleCancel}>Cancel</span><span onClick={handleAccept}>Accept</span></div>}
            </div>
        </div>
    )
        ;
}

export default Product;