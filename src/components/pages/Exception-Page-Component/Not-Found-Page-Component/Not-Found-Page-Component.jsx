import React from "react";
import { Link } from "react-router-dom";
import classes from "./Not-Found-Page-Component.module.css";

const NotFoundPageComponent = (props) => {

    return (
        <div>
            <section className={classes["error-container"]}>
                <span>4</span>
                <span><span className={classes["screen-reader-text"]}>0</span></span>
                <span>4</span>
            </section>
            <p className={classes["zoom-area"]}>Không tìm thấy nọi dung phù hợp! với tìm kiếm của bạn </p>
            <div className={classes["link-container"]}>
                <Link to="../" relative='path' className={classes["more-link"]}>Quay lại</Link>
            </div>
        </div>
    )
}

export default NotFoundPageComponent;