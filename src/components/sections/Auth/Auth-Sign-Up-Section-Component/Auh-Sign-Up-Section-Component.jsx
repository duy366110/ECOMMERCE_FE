import { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import useValidation from "../../../../hook/use-validation";
import useHttp from "../../../../hook/use-http";
import { authSignin} from "../../../../store/store.auth";
import CommonInputComponent from "../../../common/Common-Input-Component/Common-Input-Component";
import classes from "./Auth-Sign-Up-Section-Component.module.css";

const SignUpSectionComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const  addressRef = useRef();

    let { httpMethod } = useHttp();
    const {value: fullNameValue, valid: fullNameValid, onBlur: fullNameBlur, onChange: fullNameChange} = useValidation(['require']);
    const {value: emailValue, valid: emailValid, onBlur: emailBlur, onChange: emailChange} = useValidation(['require', 'email']);
    const {value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange} = useValidation(['require', 'password']);
    const {value: phoneValue, valid: phoneValid, onBlur: phoneBlur, onChange: phoneChange} = useValidation(['require', 'phone']);
    const {value: addressValue, valid: addressValid, onBlur: addressBlur, onChange: addressChange} = useValidation(['require']);

    // PHƯƠNG THỨC KHÁCH HÀNG THỰC HIỆN ĐĂNG KÝ TÀI KHOẢN
    const signUpHandler = (event) => {
        event.preventDefault();

        let fullNameInput = fullNameRef.current.input.current;
        fullNameInput.focus();
        fullNameInput.blur();

        let emailInput = emailRef.current.input.current;
        emailInput.focus();
        emailInput.blur();

        let passwordInput = passwordRef.current.input.current;
        passwordInput.focus();
        passwordInput.blur();

        let phoneInput = phoneRef.current.input.current;
        phoneInput.focus();
        phoneInput.blur();

        let addressInput = addressRef.current.input.current;
        addressInput.focus();
        addressInput.blur();

        if((fullNameValid.status && emailValid.status) && (passwordValid.status && phoneValid.status) && addressValid.status) {

            let account = {
                fullName: fullNameValue,
                email: emailValue,
                password: passwordValue,
                phone: phoneValue,
                address: addressValue
            }

            httpMethod({
                url: `http://localhost:5000/api/client/user/account`,
                method: 'POST',
                author: '',
                payload: JSON.stringify(account)
            }, (information) => {
                let { status, message, infor} = information;

                if(status) {
                    let { email, fullname, phone, role, username, token} = infor
                    localStorage.setItem('user', JSON.stringify({username, fullname, email , phone, role, token}));
                    dispatch(authSignin({infor}));
                    navigate("/");
                }
            })
        }

    }

    return (
        <div className="auth-sign-up-component">
            <h2 className={classes['form-title']}>Sign up</h2>
            <form onSubmit={signUpHandler} className={classes['auth-sign-up-form']}>
                <CommonInputComponent
                    ref={fullNameRef}
                    blur={fullNameBlur}
                    change={fullNameChange}
                    showLabel={false}
                    id="user-full-name"
                    placeholder="Full name"
                    type="text"
                    valueInput={fullNameValue}
                    validInput={fullNameValid}/>

                <CommonInputComponent
                    ref={emailRef}
                    blur={emailBlur}
                    change={emailChange}
                    showLabel={false}
                    id="user-email"
                    placeholder="Email"
                    type="email"
                    valueInput={emailValue}
                    validInput={emailValid}/>

                <CommonInputComponent
                    ref={passwordRef}
                    blur={passwordBlur}
                    change={passwordChange}
                    showLabel={false}
                    id="user-password"
                    placeholder="Password"
                    type="password"
                    valueInput={passwordValue}
                    validInput={passwordValid}/>

                <CommonInputComponent
                    ref={phoneRef}
                    blur={phoneBlur}
                    change={phoneChange}
                    showLabel={false}
                    id="user-phone"
                    placeholder="Phone"
                    type="phone"
                    valueInput={phoneValue}
                    validInput={phoneValid}/>


                <CommonInputComponent
                    ref={addressRef}
                    blur={addressBlur}
                    change={addressChange}
                    showLabel={false}
                    id="user-address"
                    placeholder="address"
                    valueInput={addressValue}
                    validInput={addressValid}/>

                <button className={classes['auth-btn']} type="submit">Sign in</button>
            </form>

            <p className={`text-center text-sugget`}>
                Create an account? <Link className="text-sugget-link" to="/auth">Sign in</Link>
            </p>
        </div>
    )
}

export default SignUpSectionComponent;