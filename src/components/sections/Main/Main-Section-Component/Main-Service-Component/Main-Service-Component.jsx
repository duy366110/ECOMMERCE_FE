import React from 'react';
import useValidation from '../../../../../hook/use-validation';
import InputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import classes from "./Main-Service-Component.module.css";

const MainService = (props) => {
    const {value, valid, onBlur, onChange} = useValidation(['required', 'email']);

    return (
        <div className={classes['main-service-component']}>
            <div className={classes['service-container']}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4 my-3 my-md-0">
                            <h2 className={classes['service-title']}>Free shipping</h2>
                            <p className={classes['service-sub-title']}>Free shipping worlwide</p>
                        </div>

                        <div className="col-12 col-md-4 my-3 my-md-0">
                            <h2 className={classes['service-title']}>24 X 7 service</h2>
                            <p className={classes['service-sub-title']}>Free shipping worlwide</p>
                        </div>

                        <div className="col-12 col-md-4 my-3 my-md-0">
                            <h2 className={classes['service-title']}>Festival service</h2>
                            <p className={classes['service-sub-title']}>Free shipping worlwide</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes['support-container']}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h2 className={classes['support-title']}>Lest's be friends</h2>
                            <p className={classes['support-sub-title']}>nisi nisi tempor consequat laboris nisi</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={classes['support-form']}>
                                <InputComponent blur={onBlur} change={onChange} placeholder="Enter your email adress" valid={valid} value={value} clearBorderRadius={true} width="350px"/>
                                <CommonButtonComponent style="btn-italic" variant="contained">Subscribe</CommonButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainService;