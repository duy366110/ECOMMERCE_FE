import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import classes from "./Shop-Tab-Component.module.css";

const GENRES = [
    {
        title: '',
        values: [
            {
                path: 'All',
                title: "All"
            }
        ]
    },
    {
        title: 'Iphone & mac',
        values: [
            {
                path: 'Iphone',
                title: "Iphone"
            },
            {
                path: 'Ipad',
                title: "Ipad"
            },
            {
                path: 'Macbook',
                title: "Macbook"
            }
        ]
    },
    {
        title: 'Wireless',
        values: [
            {
                path: 'Airpod',
                title: "Airpod"
            },
            {
                path: 'Watch',
                title: "Watch"
            }
        ]
    },
    {
        title: 'Other',
        values: [
            {
                path: 'Mouse',
                title: "Mouse"
            },
            {
                path: 'Keyboard',
                title: "Keyboard"
            },
            {
                path: 'Other',
                title: "Other"
            }
        ]
    }
]

const ShopTabComponent = (props) => {

    const renderContent = (genres) => {
        return (
            <ul className={classes['tab-list-content-list']}>
                {genres.values.length && genres.values.map((infor) => {
                    return (
                        <li key={`${infor.title}`}>
                            <NavLink to={infor.path} className={({isActive}) => (isActive? classes.active : '')} end>
                                {infor.title}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className={classes['tab-component']}>
            <h2 className={classes['tab-title']}>Categories</h2>
            <div className={classes['tab-list']}>
                <h3 className={classes['tab-list-title']}>Apple</h3>
                {GENRES.length && GENRES.map((genres, index) => {
                    return (
                        <div key={genres.title} className={classes['tab-list-content']}>
                            {genres.title && <h4 className={classes['tab-list-content-title']}>{genres.title}</h4>}
                            { renderContent(genres) }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShopTabComponent;