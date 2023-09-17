import React, { useState, useEffect } from "react";
import classes from "./Main-Detail-Section-Thumbnail-Component.module.css";

const MainDetailSectionThumbnailComponent = (props) => {
    const [imageMain, setImageMain] = useState('');

    const viewThumbnailHandler = (event) => {
        let thumbnail = event.target.closest('#thumbnail-list__item').dataset.thumb;
        setImageMain(thumbnail);
    }

    useEffect(() => {
        setImageMain(props.list[0]);
    }, [props.list[0]])

    return (
        <div className={classes['thumbnail-component']}>
            <div className={classes['detail-product-thumbnail']}>
                <div className="row">
                    <div className="col-2">
                        <div className={classes['product-thumbnail-list']}>
                            {props.list.length > 0 && props.list.map((image) => {
                                return (
                                    <div key={image} id="thumbnail-list__item" data-thumb={image} onClick={viewThumbnailHandler} className={classes['thumbnail-list__item']}>
                                        <img src={`http://localhost:5000/${image}`} alt="product" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-10">
                        <div className={classes['product-thumbnail-master']}>
                            <img src={`http://localhost:5000/${imageMain}`} alt="product" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDetailSectionThumbnailComponent;