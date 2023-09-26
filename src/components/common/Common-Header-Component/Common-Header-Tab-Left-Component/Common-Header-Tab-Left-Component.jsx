import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authLogout } from "../../../../store/store.auth";
import { toggle } from "../../../../store/store.tableft";
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import classes from "./Common-Header-Tab-Left-Component.module.css";

const CommonHeaderTabLeftComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const tableft = useSelector((state) => state.tableft);
    const auth = useSelector((state) => state.auth);

    const closeTabLeftHandler = (event) => {
        dispatch(toggle());
    }

    const authLogoutHandler = (event) => {
        dispatch(authLogout());
        navigate('/');
    }

    return (
        <div className={`${classes['common-header-tab-left-component']} ${tableft.status? classes['active'] : ''}`}>
            <div onClick={closeTabLeftHandler} className={classes['tab-left-mask']}></div>
            <ul className={classes['tab-left-nav']}>
                <li>
                    <h2 className={classes['tab-left-logo']}>
                        <Link onClick={closeTabLeftHandler} to="/">Boutique</Link>
                    </h2>
                </li>

                <li>
                    <NavLink onClick={closeTabLeftHandler} className={({isActive}) => (isActive? classes['active'] : '')} to="/">Home</NavLink>
                </li>

                <li>
                    <NavLink onClick={closeTabLeftHandler} className={({isActive}) => (isActive? classes['active'] : '')} to="/shop">Shop</NavLink>
                </li>

                {auth.token && (
                    <>
                        <li>
                            <NavLink onClick={closeTabLeftHandler} className={({isActive}) => (isActive? classes['active'] : '')} to="/cart">Cart</NavLink>
                        </li>

                        <li>
                            <NavLink onClick={closeTabLeftHandler} className={({isActive}) => (isActive? classes['active'] : '')} to="/transaction">Transaction</NavLink>
                        </li>

                        <li>
                            <NavLink onClick={authLogoutHandler} className={`${classes['header-action--btn']} d-flex`}>
                                <PersonIcon />
                                <span className={`mx-2 d-block ${classes['header-user-email']}`}>{auth.email}</span>
                                <ArrowDropDownIcon />
                                <span>(logout)</span>
                            </NavLink>
                        </li>
                    </>
                )}

                {!auth.token && (
                    <>
                        <li>
                            <NavLink to="/auth/signup" className={classes['header-action--btn']}>
                                <ExitToAppIcon />
                                <span>Sign up</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/auth" className={classes['header-action--btn']}>
                                <PersonIcon />
                                <span>Sign in</span>
                            </NavLink>
                        </li>
                    </>
                )}

            </ul>
        </div>
    )
}

export default CommonHeaderTabLeftComponent;