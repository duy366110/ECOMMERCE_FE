import React, { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import classes from "./Error-Page-Component.module.css";

const ErrorPageComponent = (props) => {

    const error = useRouteError();

    useEffect(() => {
        console.error(error);

    }, [error])

    return (
        <div className={classes['error-component']}>
            <div className={classes['error-content']}>
                <h2 className={classes['error-title']}>Error</h2>
                <p className={classes['error-sub-title']}>You have problem, please wait minutes!</p>
            </div>
        </div>
    )
}

export default ErrorPageComponent;