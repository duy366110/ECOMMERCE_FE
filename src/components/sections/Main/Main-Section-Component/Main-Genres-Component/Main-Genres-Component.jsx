import React from "react";
import { Link } from "react-router-dom";
import classes from "./Main-Genres-Component.module.css";

const MainGenresComponent = (props) => {

    return  (
        <div className={classes['main-genres-component']}>
            <div className="container-fluid">
                <p className='section-sub-title text-center'>Carfully created collection</p>
                <h2 className="section-title text-center">Brpwse out categories</h2>

                <div className="row">
                    {props.featureds.length > 0 && props.featureds.map((feature, index) => {
                        return (
                            <div key={feature._id} className="col-12 col-md-6">
                                <Link to="/shop">
                                    <div className={classes['card-genres']}>
                                        <img src={feature.images[0]} alt="feature" />
                                        <div className={classes['card-genres-infor']}>
                                            <h2 className={`
                                                ${classes['card-genres-infor-title']}
                                                ${feature.titleColor === "white"? classes['color-white'] : ''}
                                            `}>
                                                {feature.title}
                                            </h2>
                                            <p className={`
                                                ${classes['card-genres-infor-des']}
                                                ${feature.titleColor === "white"? classes['color-white'] : ''}
                                            `}>
                                                {feature.desc}
                                            </p>
                                        </div>
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