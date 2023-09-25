import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../../../store/store.tableft";
import classes from "./Common-Header-Tab-Left-Component.module.css";

const CommonHeaderTabLeftComponent = (props) => {
    const dispatch = useDispatch();
    const tableft = useSelector((state) => state.tableft);

    const closeTabLeftHandler = (event) => {
        dispatch(toggle());
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

                <li>
                    <NavLink onClick={closeTabLeftHandler} className={({isActive}) => (isActive? classes['active'] : '')} to="/cart">Cart</NavLink>
                </li>

                <li>
                    <NavLink onClick={closeTabLeftHandler} className={({isActive}) => (isActive? classes['active'] : '')} to="/transaction">Transaction</NavLink>
                </li>

            </ul>
        </div>
    )
}

export default CommonHeaderTabLeftComponent;