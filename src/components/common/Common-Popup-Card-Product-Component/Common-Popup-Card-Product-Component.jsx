import React from 'react';
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CommonButtonComponent from '../Common-Button-Component/Common-Button-Component';
import classes from "./Common-Popup-Card-Product-Component.module.css";

const CommonPopupCardProductComponent = (props) => {
    const navigate = useNavigate();

    console.log(props.infor);

    const viewDetailHandler = (event) => {
        const { id } = event.target.closest('#btn-common').dataset;
        const { category } = props.infor;

        navigate(`/detail/${id}/${category?._id? category?._id : category }`);
    }

    return ReactDOM.createPortal(
        <div className={classes['popup-card-product-component']}>
            <div className={classes["card-product-mask"]} onClick={props.close}></div>
            <div className={classes["card-product-wrapper"]}>
                <button className={classes['btn-close']} onClick={props.close}>
                    <CloseIcon />
                </button>

                <div className="row h-100 w-100">
                    <div className="col-12 col-md-5">
                        <div className={classes['card-product-thumbnail']}>
                            <img
                                className={`
                                    ${props.infor.category.title === 'Mac'? classes['mac-thumbnail'] : ''}
                                `}
                                src={props.infor.images[0]} alt="product thumbnail" />
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <div className={classes['card-product-infor']}>
                            <h2 className={classes['infor-title']}>{props.infor.name}</h2>
                            <h3 className={classes['infor-price']}>{props.infor.price.$numberDecimal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</h3>
                            <h2 className={classes['infor-des']}>{props.infor.shortDes}</h2>
                            <div className="mt-5">
                                <CommonButtonComponent onClick={viewDetailHandler} id={props.infor._id}><ShoppingCartIcon /> <span>View detail</span> </CommonButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('popup')
    )
}

export default CommonPopupCardProductComponent;