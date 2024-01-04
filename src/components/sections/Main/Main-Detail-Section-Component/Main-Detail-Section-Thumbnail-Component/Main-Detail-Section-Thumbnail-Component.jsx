import React, { useState, useEffect } from "react";
import classes from "./Main-Detail-Section-Thumbnail-Component.module.css";

const MainDetailSectionThumbnailComponent = (props) => {
    const [imageMain, setImageMain] = useState('');

    useEffect(() => {
        setImageMain(props.list[0]);
    }, [props.list])

    return (
        <div className={classes['thumbnail-component']}>
            <div className={classes['detail-product-thumbnail']}>
                <div className="row d-flex justify-content-center">
                    <div className="col-9">
                        <div className={classes['product-thumbnail-master']}>
                            <img src={imageMain} alt="product" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDetailSectionThumbnailComponent;