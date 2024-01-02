import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import classes from "./Main-Banner-Component.module.css";

const MainBannerComponent = (props)  => {

    const navigate = useNavigate();

    const viewShopHandler = (event) => {
        navigate('/shop');
    }

    return (
        <div className={classes['banner-component']} style={{backgroundImage: 'url("./assets/images/banner1.jpg")'}}>
            <div className="container">
                <div className={classes["banner-content"]}>
                    <p className={classes['sub-title']}>new inspiration 2020</p>
                    <h2 className={classes['title']}>20% off on new season</h2>
                    <CommonButtonComponent onClick={viewShopHandler} variant="contained">Browse collection</CommonButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MainBannerComponent);