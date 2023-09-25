import React, { useEffect, useState } from 'react';
import CommonProductCardComponent from '../Common-Product-Card-Component/Common-Product-Card-Component';
import classes from "./Common-Product-List-Component.module.css";

const ProductListComponent = (props) => {
    
    return  (
        <div className={classes['product-list-component']}>
            <div className="container">
                {props.hasTitle && (
                    <>
                        <p className='section-sub-title text-left'>Make the hard way</p>
                        <h2 className="section-title text-left">Top trending products</h2>
                    </>
                )}
                
                <div className="row">
                    {props.products.length > 0 && props.products.map((product, index) => {
                            return (
                                <div key={index} className="col-12 col-sm-6 col-lg-3 d-flex mb-3 mb-md-0">
                                    <CommonProductCardComponent product={product}/>
                                </div>
                            )
                        })
                    }
                    {!props.products.length > 0 && <p className='product-blank'>Not found products!</p>}
                </div>
            </div>
        </div>
    )
}

export default ProductListComponent;