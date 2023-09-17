import React, { useEffect, useReducer } from "react";
import { useLocation, Link } from "react-router-dom";
import classes from "./Common-Breadcrumb-Component.module.css";

const breadcrumbReducer = (state, action) => {
    if(action.type === 'SET_BREADCRUMB') {
        if(action.pathname === '/checkout') {
            return {
                page: 'Checkout',
                breakPoint: [
                    {
                        link: "/",
                        name: "Home"
                    },
                    {
                        link: "/cart",
                        name: 'Cart'
                    },
                    {
                        link: null,
                        name: "Checkout"
                    }
                ]
            }
        }

        if(action.pathname === "/cart") {
            return {
                page: 'Cart',
                breakPoint: [
                    {
                        link: "/",
                        name: "Home"
                    },
                    {
                        link: null,
                        name: "Cart"
                    }
                ]
            }
        }

        if(action.pathname.includes('/detail')) {
            return {
                page: 'Detail',
                breakPoint: [
                    {
                        link: "/",
                        name: "Home"
                    },
                    {
                        link: "/shop",
                        name: 'Shop'
                    },
                    {
                        link: null,
                        name: "Detail"
                    }
                ]
            }
        }

        if(action.pathname === "/shop") {
            return {
                page: 'Shop',
                breakPoint: [
                    {
                        link: "/",
                        name: "Home"
                    },
                    {
                        link: null,
                        name: "Shop"
                    }
                ]
            }
        }

        if(action.pathname === "/transaction") {
            return {
                page: 'Transaction',
                breakPoint: [
                    {
                        link: "/",
                        name: "Home"
                    },
                    {
                        link: null,
                        name: "Transaction"
                    }
                ]
            }
        }
    }

    return state;
}

const CommonBreadcroumbComponent = (props) => {
    const location = useLocation();
    const [breadCrumb, breadCrumbDispatch] = useReducer(breadcrumbReducer, {page: '', breakPoint: []})

    useEffect(() => {
            breadCrumbDispatch({type: 'SET_BREADCRUMB', pathname: location.pathname});
    }, [location.pathname])

    return (
        <div className={classes['breadcrumb-component']}>
            <div className="container">
                <div className={classes['breadcrumb-content']}>
                    <h2 className={classes['breadcrumb-title']}>{breadCrumb.page}</h2>
                    <ul className={classes['breadcrumb-list']}>
                        {breadCrumb.breakPoint?.length > 0 && breadCrumb?.breakPoint.map((pointer, index) => {
                            return (
                                <li key={index}>
                                    <Link to={pointer.link? pointer.link : ''}>{pointer.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CommonBreadcroumbComponent);