import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../../configs/config.env";
import { updateCurrentPage } from "../../../../../store/store.serach";
import { toggleLoader, openMessage, closeMessage } from "../../../../../store/store.popup";
import CommonProductCardComponent from "../../../../common/Common-Product-Card-Component/Common-Product-Card-Component";
import CommonPaginationComponent from "../../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Shop-Section-Product-Component.module.css";

const ShopSectionProductComponent = (props) => {
    const search = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const http = async () => {
            try {
                dispatch(toggleLoader());
                let url = `${config.URI}/api/search/${search.type}/${search.itemPage}/${search.currentPage * search.itemPage}`;
                let res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let { status, products } = await res.json();
                if(status) {
                    setProducts(products);
                }

            } catch (error) {
                dispatch(openMessage({content: error?.message}));
                setTimeout(() => {
                    dispatch(closeMessage());
                }, 2500)
            }
            dispatch(toggleLoader());
        }

        http();
    }, [search, dispatch])

    const onPaginationHandler = (event) => {
        let { page } = event.target.dataset;
        dispatch(updateCurrentPage({page}));
    }

    return (
        <div className={classes['shop-section-product-component']}>
            {search.amountProductOfType > 0 && products?.length > 0 && (
                <div className="row">
                    {products.map((product) => {
                        return (
                            <div key={product._id} className="col-4">
                                <CommonProductCardComponent product={product} />
                            </div>
                        )
                    })}

                    <div className="col-12">
                        <CommonPaginationComponent
                        click={onPaginationHandler}
                         items={ Array.from({length: search.elemtItemsPagination}, (elm, index) => index)} />
                    </div>
                </div>
            )}


        </div>
    )
}

export default ShopSectionProductComponent;