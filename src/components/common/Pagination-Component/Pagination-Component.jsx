import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { previous, next, setCurrentPage } from "../../../store/store-pagination";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import classes from "./Pagination-Component.module.css";

const PaginationComponent = (props) => {
    const pagination = useSelector((state) => state.pagination);
    const dispath = useDispatch();

    const changePageHandler = (event) => {
        let page = event.target.dataset.page;
        dispath(setCurrentPage({page}));
    }

    const previousPageHandler = (event) => {
        dispath(previous());
    }

    const nextPageHandler = (event) => {
        dispath(next());
    }


    return (
        <div className={classes['pagination-component']}>
            <div className={classes['pagination-wrapper']}>
                {!(pagination.currentPage == pagination.minPage) && (
                    <button onClick={previousPageHandler}>
                        <KeyboardDoubleArrowLeftIcon />
                    </button>
                )}

                <ul className={classes['pagination-content']}>
                    {pagination.quantityItem.map((elm) => {
                        return (
                            <li key={elm} className={`${classes['pagination-item']} ${classes[ pagination.currentPage == elm? 'active' : '']}`}>
                                <button data-page={elm} onClick={changePageHandler}>{elm}</button>
                            </li>
                        )
                    })}
                </ul>

                {!(pagination.currentPage == pagination.maxPage) && (
                    <button onClick={nextPageHandler}>
                        <KeyboardDoubleArrowRightIcon />
                    </button>
                )}
            </div>
            <p className={classes['pagination-des']}>Showing {1}-{9} of {9} results</p>
        </div>
    )
}

export default PaginationComponent;