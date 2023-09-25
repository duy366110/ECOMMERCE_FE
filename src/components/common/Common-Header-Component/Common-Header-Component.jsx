import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authLogout } from "../../../store/store.auth";
import { toggle } from "../../../store/store.tableft";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import CommonHeaderTabLeftComponent from "./Common-Header-Tab-Left-Component/Common-Header-Tab-Left-Component";
import classes from "./Common-Header-Component.module.css";

const CommonHeaderComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const tableft = useSelector((state) => state.tableft);

    const authLogoutHandler = (event) => {
        dispatch(authLogout());
        navigate('/');
    }

    const toggleTableftHandler = (event) => {
        dispatch(toggle());
    }

    return (
        <div className={classes['header-component']}>
            <div className="container">
                <div className="row">
                    <div className="col-4 d-none d-lg-block">
                        <ul className={`${classes["header-nav"]} list-unstyled d-flex align-items-center`}>
                            <li>
                                <NavLink to="/" className={({isActive}) => (isActive? classes.active : '')} end>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/shop' className={({isActive}) => (isActive? classes.active : '')}>Shop</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-lg-4 d-flex justify-content-between align-items-center">
                        <h1 className={classes['header-logo']}>Boutique</h1>
                        <button onClick={toggleTableftHandler} className={`${classes['header-btn-tab-left']} ${tableft.status? classes['active'] : ''} d-flex d-lg-none`}>
                            <span></span>
                        </button>
                    </div>

                    <div className="col-4 d-none d-lg-block">
                        <ul className={`${classes["header-actions"]} list-unstyled d-flex align-items-center`}>
                            {auth.token && (
                                <>
                                    <li>
                                        <NavLink to="/cart" className={classes['header-action--btn']}>
                                            <ShoppingCartIcon />
                                            <span>cart</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/transaction" className={classes['header-action--btn']}>
                                            <ReceiptLongIcon />
                                            <span>Transaction</span>
                                        </NavLink>
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
                </div>
            </div>

            <CommonHeaderTabLeftComponent />
        </div>
    )
}

export default CommonHeaderComponent;