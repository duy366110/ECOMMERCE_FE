import React from 'react';
import { useSelector } from 'react-redux';
import CommonPopupMessageComponent from "../Common-Popup-Message-Component/Common-Popup-Message-Component";
import CommonPopupLoaderComponent from "../Common-Popup-Loader-Component/Common-Popup-Loader-Component";
import classes from "./Common-Popup-Component.module.css";

const CommonPopupComponent = (props) => {

    const popup = useSelector((state) => state.popup);

    return (
        <div className={classes['common-popup-component']}>
            {popup.message.status && <CommonPopupMessageComponent content={popup.message.content} /> }
            {popup.loader.status && <CommonPopupLoaderComponent /> }
        </div>
    )
}

export default CommonPopupComponent;