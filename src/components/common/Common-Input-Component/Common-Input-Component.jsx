import React, { useRef, useImperativeHandle} from 'react';
import classes from "./Common-Input-Component.module.css";

const CommonInputComponent = React.forwardRef(({change, blur, label, hasLabel, id, placeholder, type, valueInput, validInput }, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            input: inputRef
        }
    })

    return (
        <div className={classes['input-component']}>
            <div className={`form-group ${classes['form-group-custom']}`}>
                {hasLabel && (<label htmlFor={id} className={classes['input-label']} >{label}</label>)}
                <input
                    ref={inputRef}
                    onBlur={blur}
                    onChange={change}
                    type={type? type: 'text'}
                    id={id}
                    placeholder={placeholder}
                    value={valueInput}
                    className={`form-control ${(!validInput?.status && validInput?.status != null) ? 'is-invalid' : ''}`}/>
            </div>
            {!validInput?.status && validInput?.status != null && <small className={classes['input-message']}>{validInput?.message}</small>}
        </div>
    )
})

export default CommonInputComponent;