import React from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import classes from './Common-Quantity-Component.module.css';

const CommonQuantityComponent = (props) => {

    return (
        <div className={classes['quantity-component']}>
            {props.label && <label className={classes['quantity-label']} htmlFor="quantity">{props.label}</label>}
            <div className={classes['quantity-group']}>
                <button className={classes['quantity-btn']} id="remove-product" onClick={props.remove} data-id={props.id}>
                    <ArrowLeftIcon />
                </button>

                <input className={classes['quantity-input']} type="text" min={0} max={10} defaultValue={`${0}`} value={props.quantity}/>

                <button  className={classes['quantity-btn']} id="add-product" onClick={props.add} data-id={props.id}>
                    <ArrowRightIcon />
                </button>
            </div>

        </div>
    )
}

export default CommonQuantityComponent;