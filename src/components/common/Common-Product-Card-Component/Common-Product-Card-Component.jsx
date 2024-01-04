import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CommonPopupCardProductComponent from '../Common-Popup-Card-Product-Component/Common-Popup-Card-Product-Component';
import classes from "./Common-Product-Card-Component.module.css";

const CommonProductCardComponent = ({product}) => {
    const [openPopup, setOpenPopup] = useState(false);

    const cardProductHandler = (event) => {
        setOpenPopup(!openPopup);
    }

    return (
        <>
        <Link className={classes['product-card-component']} id='product-card-component' onClick={cardProductHandler}>
            <div className={classes['cart-wrapper']}>
                <div className={classes['card-thumbnail-wrapper']}>
                    <img
                        className={`${product.category.title === "Mac"? classes["mac-thumbnail"] : ""}`}
                        src={product.images[0]} alt="product thumbnail" />
                </div>
                <h2 className={classes['card-title']}>{product.name}</h2>
                <p className={classes['card-price']}>{product.price.$numberDecimal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</p>
            </div>
        </Link>
        {openPopup && (<CommonPopupCardProductComponent close={cardProductHandler} infor={product}/>)}
        </>
    )
}
export default CommonProductCardComponent;