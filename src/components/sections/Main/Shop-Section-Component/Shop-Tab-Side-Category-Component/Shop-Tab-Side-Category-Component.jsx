import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideCategory } from "../../../../../store/store.tableft";
import classes from "./Shop-Tab-Side-Category-Component.module.css";

const ShopTabSideCategoryComponent = (props) => {
    const dispatch = useDispatch();
    const tabLeft = useSelector((state) => state.tableft);


    const cloaseTabSideCategory = (event) => {
        dispatch(toggleSideCategory());
    }

    return (
        <div className={`${classes['tab-side-category-component']} ${tabLeft.sidecategory.status? classes['active'] : ''}`}>
            <div onClick={cloaseTabSideCategory} className={classes['tab-side-category-mask']}></div>
            {props.children}
        </div>
    )
}

export default ShopTabSideCategoryComponent;