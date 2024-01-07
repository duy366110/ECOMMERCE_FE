import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import config from "../../../../configs/config.env";
import useValidation from "../../../../hook/use-validation";
import useWorker from "../../../../hook/use-worker";
import { authSignin } from "../../../../store/store.auth";

import CottageIcon from '@mui/icons-material/Cottage';

import CommonInputComponent from '../../../common/Common-Input-Component/Common-Input-Component';
import classes from "./Auth-Sign-In-Section-Component.module.css";

const AuthSignInSectionComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const { working } = useWorker();
    const {value: emailValue, valid: validEmail, onBlur: blurEmail, onChange: changeEmail} = useValidation(['require', 'email']);
    const {value: passwordValue, valid: passwordValid, onBlur: passwordBlur, onChange: passwordChange} = useValidation(['require', 'password']);

    const SignInHandler = (event) => {
        event.preventDefault();

        emailRef.current.input.current.focus();
        emailRef.current.input.current.blur();

        passwordRef.current.input.current.focus();
        passwordRef.current.input.current.blur();

        if(validEmail.status && passwordValid.status) {

            working({
                type: "auth-sign-in",
                url: `${config.URI}/api/auth/signin`,
                token: "",
                method: "POST",
                payload: JSON.stringify({email: emailValue, password: passwordValue})
            }, (information) => {
                let { status, infor} = information;

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
        <div className={classes["auth-sign-in-component"]}>
            <h2 className="form-title">
                <Link to="/"><CottageIcon /></Link>
                <span>Sign in</span>
            </h2>
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