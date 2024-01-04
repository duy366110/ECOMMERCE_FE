import { useSelector } from "react-redux";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import classes from "./Common-Pagination-Component.module.css";

const CommonPaginationComponent = (props) => {

    const search = useSelector((state) => state.search);
    const onNextHandler = () => {
        console.log("Next");
    }

    const onPreviousHandler = () => {
        console.log("Previous");
    }

    return (
        <div>
            {props.items.length > 1 && (
                <div className={classes['common-pagination-component']}>
                    <div className={classes['pagination-wrapper']}>
                        {search.currentPage > 0 && (
                            <button
                                className={`${classes['btn']} ${classes['btn-previous']}`}
                                id="btn-pagi" onClick={onPreviousHandler}
                                data-pagi="previous">
                                <NavigateBeforeIcon />
                            </button>
                        )}

                        <ul>
                            {props.items.map((elm, index) => {
                                return (
                                    <li key={index}>
                                        <button
                                            className={`
                                                ${classes['btn']}
                                                ${classes['btn-item']}
                                            `}
                                            id="btn-page"
                                            onClick={props.click} data-page={elm}>

                                            {elm + 1}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>

                        {search.currentPage < (props.items.length - 1) && (
                            <button
                                className={`${classes['btn']} ${classes['btn-next']}`}
                                id="btn-pagi" onClick={onNextHandler}
                                data-pagi="next">
                                <NavigateNextIcon />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommonPaginationComponent;