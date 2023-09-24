import React from "react";
import { Link } from "react-router-dom";
import classes from "./Main-Genres-Component.module.css";

const MainGenresComponent = (props) => {

    return  (
        <div className={classes['main-genres-component']}>
            <div className="container">
                <p className='section-sub-title text-center'>Carfully created collection</p>
                <h2 className="section-title text-center">Brpwse out categories</h2>

                <div className="row">
                    {props.categories.length > 0 && props.categories.map((category, index) => {
                        return (
                            <div key={category._id} className={(index <= 1)? "col-6" : 'col-4'}>
                                <Link to="/shop">
                                    <div className={classes['card-genres']}>
                                        <img src={category.images[0]} alt="category" />
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