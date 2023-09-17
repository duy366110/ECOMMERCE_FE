import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import useHttp from '../../../../hook/use-http';
import useValidation from "../../../../hook/use-validation";
import { authSignin } from "../../../../store/store.auth";
import CommonInputComponent from '../../../common/Common-Input-Component/Common-Input-Component';
import classes from "./Auth-Sign-In-Section-Component.module.css";

const AuthSignInSectionComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const auth = useSelector((state) => state);

    let { httpMethod } = useHttp();
    const {value: emailValue, valid: validEmail, onBlur: blurEmail, onChange: changeEmail} = useValidation(['require', 'email']);
    const {value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange} = useValidation(['require', 'password']);

    // NGƯỜI DÙNG THỰC HIỆN ĐĂNG NHẬP
    const SignInHandler = (event) => {
        event.preventDefault();

        emailRef.current.input.current.focus();
        emailRef.current.input.current.blur();

        passwordRef.current.input.current.focus();
        passwordRef.current.input.current.blur();

        if(validEmail.status && passwordValid.status) {

            httpMethod({
                url: `http://localhost:5000/api/auth/signin`,
                method: 'POST',
                author: '',
                payload: JSON.stringify({email: emailValue, password: passwordValue})
            }, (information) => {
                let { status, message, infor} = information;

                if(status) {
                    let { email, fullname, phone, role, username, address, token} = infor

                    localStorage.setItem('user', JSON.stringify({username, fullname, email , phone, role, address, token}));
                    dispatch(authSignin({infor}));
                    navigate("/");
                }
            })
        }
    }

    return (
        <div className="auth-sign-in-component">
            <h2 className={classes['form-title']}>Sign in</h2>
            <form onSubmit={SignInHandler} className={classes['auth-sign-in-form']}>
                <CommonInputComponent
                    ref={emailRef}
                    blur={blurEmail}
                    change={changeEmail}
                    label="Email"
                    hasLabel={false}
                    id="user-email"
                    placeholder="Email"
                    type="email"
                    valueInput={emailValue}
                    validInput={validEmail}/>

                <CommonInputComponent
                    ref={passwordRef}
                    blur={passwordBlur}
                    change={passwordChange}
                    label="Password"
                    hasLabel={false}
                    id="user-password"
                    placeholder="Password"
                    type="password"
                    valueInput={passwordValue}
                    validInput={passwordValid}/>

                <button className={classes['auth-btn']} type="submit">Sign in</button>
            </form>

            <p className={`text-center text-sugget`}>
                Create an account? <Link className="text-sugget-link" to="signup">Sign up</Link>
            </p>
        </div>
    )
}

export default AuthSignInSectionComponent;