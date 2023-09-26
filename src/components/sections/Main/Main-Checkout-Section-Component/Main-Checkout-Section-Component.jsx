import { useEffect, useState,  useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "../../../../configs/config.env";
import useHttp from "../../../../hook/use-http";
import useValidation from "../../../../hook/use-validation";
import CommonBreadcroumbComponent from "../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component";
import CommonInputComponent from "../../../common/Common-Input-Component/Common-Input-Component";
import classes from "./Main-Checkout-Section-Component.module.css";

const MainCheckoutSectionComponent = (props) => {
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    const cartInfor = useSelector((state) => state.cart);


    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    const { httpMethod } = useHttp();
    const {defaultValue: nameDef, value: nameValue, valid: validName, onBlur: blurName, onChange: changeName} = useValidation(['require']);
    const {defaultValue: emailDef, value: emailValue, valid: validEmail, onBlur: blurEmail, onChange: changeEmail} = useValidation(['require', 'email']);
    const {defaultValue: phoneDef, value: phoneValue, valid: validPhone, onBlur: blurPhone, onChange: changePhone} = useValidation(['require', 'phone']);
    const {defaultValue: addressDef, value: addressValue, valid: validAddress, onBlur: blurAddress, onChange: changeAddress} = useValidation(['require']);

    const [CartProducts, setCartProducts] = useState([]);

    // PHƯƠNG THỨC LOAD THÔNG TIN KHÁCH HÀNG VÀ SẢN PHẨM TRƯỚC KHI ORDER
    useEffect(() => {
        if(cartInfor.cart.length) {
            setCartProducts(cartInfor.cart);
            let {fullname, username, email, phone, role, token, address } = auth;

            nameDef(fullname);
            emailDef(email);
            phoneDef(phone);
            addressDef(address);

        } else {
            navigate('/cart');
        }

    }, [])

    // PHƯƠNG THỨC THỰC HIỆN ORDER SẢN PHẨM
    const orderHandler = (event) => {
        event.preventDefault();

        nameRef.current.input.current.focus();
        nameRef.current.input.current.blur();

        emailRef.current.input.current.focus();
        emailRef.current.input.current.blur();

        phoneRef.current.input.current.focus();
        phoneRef.current.input.current.blur();

        addressRef.current.input.current.focus();
        addressRef.current.input.current.blur();

        if(validName.status && validEmail.status && validPhone.status && validAddress.status) {
            let coupon = localStorage.getItem('coupon')? localStorage.getItem('coupon') : '';

            let order = {
                fullName: nameValue,
                email: emailValue,
                phone: phoneValue,
                address: addressValue,
                coupon
            }

            httpMethod({
                url: `${config.URI}/api/client/order`,
                method: 'POST',
                author: auth.token,
                payload: JSON.stringify(order)
            }, (information) => {
    
                let { status, message} = information;
                if(status) {
                    navigate('/transaction');
                }
            })
        }
    }

    return (
        <div className={classes['checkout-component']}>
            <CommonBreadcroumbComponent />
            <div className="container">
                <div className={classes['checkout-content']}>
                    <div className="row flex-column-reverse flex-lg-row">
                        <div className="col-12 col-lg-8">
                            <div className={classes['checkout-form']}>
                                <form onSubmit={orderHandler}>
                                    <div className={classes["form-wrapper"]}>
                                        <CommonInputComponent
                                            ref={nameRef}
                                            blur={blurName}
                                            change={changeName}
                                            hasLabel={true}
                                            label="Full name *"
                                            placeholder="Enter your full name here!"
                                            valueInput={nameValue}
                                            validInput={validName}/>
                                    </div>

                                    <div className={classes["form-wrapper"]}>
                                        <CommonInputComponent
                                            ref={emailRef}
                                            blur={blurEmail}
                                            change={changeEmail}
                                            hasLabel={true}
                                            label="Email *"
                                            placeholder="Enter your email here!"
                                            valueInput={emailValue}
                                            validInput={validEmail}/>
                                    </div>

                                    <div className={classes["form-wrapper"]}>
                                        <CommonInputComponent
                                            ref={phoneRef}
                                            blur={blurPhone}
                                            change={changePhone}
                                            hasLabel={true}
                                            label="Phone number *"
                                            placeholder="Enter your phone number here!"
                                            valueInput={phoneValue}
                                            validInput={validPhone}/>
                                    </div>

                                    <div className={classes["form-wrapper"]}>
                                        <CommonInputComponent
                                            ref={addressRef}
                                            blur={blurAddress}
                                            change={changeAddress}
                                            hasLabel={true}
                                            label="Adrress *"
                                            placeholder="Enter your addrress here!"
                                            valueInput={addressValue}
                                            validInput={validAddress}/>
                                    </div>

                                    <div className={classes['form-wrapper']}>
                                        <button className={classes['checkout-btn']} type="submit">Place order</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-12 col-lg-4 mb-5 mb-lg-0">
                            <div className={classes['checkout-resum-information']}>
                                <h2 className={classes['checkout-resum-title']}>Your order</h2>
                                <ul className={classes['checkout-resum-CartProducts']}>
                                    {CartProducts.length > 0 && CartProducts.map((cartProductItem) => {

                                        return (
                                            <li key={cartProductItem._id}>
                                                <span>{cartProductItem.product.name}</span>
                                                <span>{cartProductItem.product.price.$numberDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</span>
                                                <span>{cartProductItem.quantity}</span>
                                            </li>
                                        )
                                    })}
                                </ul>

                                <h3 className={classes['checkout-resum-total']}>
                                    <span>Total</span>
                                    <span>{cartInfor.total} VND</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
export default MainCheckoutSectionComponent;