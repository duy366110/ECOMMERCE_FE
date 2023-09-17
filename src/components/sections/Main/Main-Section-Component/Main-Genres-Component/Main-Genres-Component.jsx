import React from "react";
import { Link } from "react-router-dom";
import classes from "./Main-Genres-Component.module.css";

const IMAGES = ['product_1.png', 'product_2.png', 'product_3.png', 'product_4.png', 'product_5.png'];

const MainGenresComponent = (props) => {

    return  (
        <div className={classes['main-genres-component']}>
            <div className="container">
                <p className='section-sub-title text-center'>Carfully created collection</p>
                <h2 className="section-title text-center">Brpwse out categories</h2>

                <div className="row">
                    {IMAGES.length > 0 && IMAGES.map((image, index) => {
                        return (
                            <div key={index} className={(index <= 1)? "col-6" : 'col-4'}>
                                <Link to="/shop">
                                    <div className={classes['card-genres']}>
                                        <img src={`./assets/images/${image}`} alt="product" />
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(MainGenresComponent);