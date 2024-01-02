import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "../../../../../configs/config.env";
import useHttp from "../../../../../hook/use-http";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import CommonQuantityComponent from "../../../../common/Common-Quantity-Component/Common-Quantity-Component";
import classes from "./Main-Detail-Section-Information-Component.module.css";

const MainDetailSectionInformationComponent = (props) => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const { httpMethod } = useHttp();
    const [quantity, setQuantity] = useState(0);

    // GIẢM QUANTITY SẢN PHẨM
    const removeQuantity = (event) => {
        if(quantity > 0) {
            setQuantity((pre) => pre - 1);
        }
    }

    // TĂNG QUANTITY SẢN PHẨM
    const addQuantity = (event) => {
        setQuantity((pre) => pre + 1);
    }

    // THÊM SẢN PHẨM VÀO CART USER
    const addCartHandler = (event) => {
        if(auth.token && auth.email) {
            if(quantity) {
                httpMethod({
                    url: `${config.URI}/api/client/cart`,
                    method: 'POST',
                    author: auth.token,
                    payload: JSON.stringify({product: props.information._id, quantity})
                }, (information) => {

                    let { status} = information;
                    if(status) {
                        navigate("/cart");
                    }
                })
    
            } else {
                window.alert('Please enter quantity product');
            }

        } else {
            navigate('/auth');
        }
        
    }

    return (
        <div className={classes['detai-section-information-component']}>
            <div className={classes['product-information']}>
                <h2 className={classes['information-title']}>{props.information.name}</h2>
                <h3 className={classes['information-price']}>{props.information.price.$numberDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</h3>
                <p className={classes['information-des']}>{props.information.shortDes}</p>
                <p className={classes['information-category']}><span>Category:</span> {props.information.category.title}</p>
                <div className="d-flex align-item-center">
                    <CommonQuantityComponent label="Quantity" remove={removeQuantity} add={addQuantity} quantity={quantity}/>
                    <CommonButtonComponent onClick={addCartHandler}>Add to cart</CommonButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default MainDetailSectionInformationComponent;