import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch }from "react-redux";
import config from "../../../../../configs/config.env";
import useValidation from "../../../../../hook/use-validation";
import { increaseCoupon } from "../../../../../store/store.cart";

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import CommonQuantityComponent from '../../../../common/Common-Quantity-Component/Common-Quantity-Component';
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import classes from './Main-Cart-Content-Component.module.css';

const MainCartContentComponent = (props) => {
    const worker = new Worker("assets/js/cart-worker.js");
    const dispatch = useDispatch();
    const cartInfor = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const couponRef = useRef();
    const {resetValue: couponResetValue, value: couponValue, valid: couponValid, onBlur: couponBlur, onChange: couponChange} = useValidation([]);

    const workerMethod = (infor = {
        type: "",
        url: "",
        payload: null
    }) => {
        worker.postMessage({
            type: infor.type,
            url: infor.url,
            token: `Bearer ${auth.token}`,
            payload: infor.payload
        })

        worker.onmessage = (value) => {
            window.location.reload();
        }
    }

     // DECREMENT PRODUCT IN CART.
    const decreaseQuantityHandler = (event) => {
        let { id } = event.target.closest('#remove-product').dataset;
        workerMethod({
            type: "decrement-product-cart",
            url: `${config.URI}/api/client/cart/decrease`,
            payload: {product: id}
        });
    }

    // INCREMENT PRODUCT IN CART.
    const increaseQuantityHandler = (event) => {
        let { id } = event.target.closest('#add-product').dataset;
        workerMethod({
            type: "increment-product-cart",
            url: `${config.URI}/api/client/cart/increase`,
            payload: {product: id}
        });
    }
    
    // REMOVE PRODUCT IN CART.
    const removeProductOfCartHandler = (event) => {
        let { id } = event.target.closest('#del-product').dataset;
        workerMethod({
            type: "remove-product-in-cart",
            url: `${config.URI}/api/client/cart/product`,
            payload: {product: id}
        });
    }

    // PHƯƠNG THỨC THÊM COUPON
    const addCouponHandler = (event) => {
        event.preventDefault();
        if(couponValue) {
            dispatch(increaseCoupon({coupon: couponValue}));
            couponResetValue();

        } else {
            window.alert("Please enter coupon code");
        }
    }

    return (
        <div className={classes['cart-content-component']}>
            <div className="container">
                <div className="row flex-column-reverse flex-lg-row">
                    <div className="col-12 col-md-8 mb-5 mb-md-0">
                        <div className={classes['cart-table-wrapper']}>
                            <table className={`${classes['table-product']} table mb-5`}>
                                <thead>
                                    <tr>
                                        <th scope="col">Images</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>

                                <tbody className={classes['cart-content-body']}>
                                    { cartInfor.cart.length > 0 && cartInfor.cart.map((cartItem, index) => {
                                        return (
                                            <tr key={cartItem.product._id}>
                                                <td className={classes['col-image']}>
                                                    <img src={cartItem.product.images[0]} alt="product_thumbnail" />
                                                </td>

                                                <td className="text-left">{cartItem.product.name}</td>
                                                <td>
                                                    {cartItem.product.price.$numberDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND
                                                </td>
                                                <td className={classes['td-quantity']}>
                                                    <CommonQuantityComponent id={cartItem.product._id} label="" remove={decreaseQuantityHandler} add={increaseQuantityHandler} quantity={cartItem.quantity} />
                                                </td>
                                                <td>
                                                    {cartItem.total} VND
                                                </td>

                                                <td>
                                                    <button className={classes['del-product']} id="del-product" onClick={removeProductOfCartHandler} data-id={cartItem.product._id}>
                                                        <DeleteIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        )})
                                    }

                                    {cartInfor.cart.length === 0 && (
                                        <tr>
                                            <td className={classes['col-image']}>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className={classes['cart-content-navigation']}>
                            <NavLink to="/shop" className={`${classes['btn-nav']} ${classes['btn-nav-previous']}`}><ArrowRightAltIcon /><span>Continue shopping</span></NavLink>
                            {cartInfor.cart.length > 0 && (<NavLink to="/checkout" className={classes['btn-nav']}><span>Procced to checkout</span><ArrowRightAltIcon /></NavLink>)}
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-5 mb-lg-0">
                        <div className={classes['cart-total']}>
                            <h2 className={classes['cart-total__title']}>Cart Total</h2>

                            <h3 className={classes['cart-total__price']}>
                                <span>Subtotal</span>
                                <span>{cartInfor.total} VND</span>
                            </h3>

                            <h3 className={classes['cart-total__price']}>
                                <span>Total</span>
                                <span>{cartInfor.total} VND</span>
                            </h3>

                            <form onSubmit={addCouponHandler} className="d-flex flex-column">
                                <CommonInputComponent
                                    ref={couponRef}
                                    blur={couponBlur}
                                    change={couponChange}
                                    hasLabel={false}
                                    id="coupon"
                                    placeholder="Enter your coupon"
                                    valueInput={couponValue}
                                    validInput={couponValid}/>
                                <CommonButtonComponent type="submit" width="100%"><CardGiftcardIcon /> Apply coupon</CommonButtonComponent>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainCartContentComponent;