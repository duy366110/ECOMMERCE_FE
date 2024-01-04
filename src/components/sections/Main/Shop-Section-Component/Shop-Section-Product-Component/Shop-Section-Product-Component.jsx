import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../../configs/config.env";
import { updateCurrentPage, previousPage, nextPage } from "../../../../../store/store.serach";
import CommonProductCardComponent from "../../../../common/Common-Product-Card-Component/Common-Product-Card-Component";
import CommonPaginationComponent from "../../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Shop-Section-Product-Component.module.css";

const ShopSectionProductComponent = (props) => {
    const search = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const sectionProductWorker = new Worker("assets/js/product-worker.js");
        sectionProductWorker.postMessage({
            type: "get-product",
            url: `${config.URI}/api/search/${search.type}/${search.itemPage}/${search.currentPage * search.itemPage}`,
        })

        sectionProductWorker.onmessage = (event) => {
            let { status, products } = event.data;
            if(status) {
                setProducts(products);
            }
        }
    }, [search])

    const onPaginationHandler = (event) => {
        let { page } = event.target.dataset;
        dispatch(updateCurrentPage({page}));
    }

    const onNextPageHandler = () => {
        dispatch(nextPage());
    }

    const onPreviousHandler = (event) => {
        dispatch(previousPage());
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
                        previous={onPreviousHandler}
                        next={onNextPageHandler}
                         items={ Array.from({length: search.elemtItemsPagination}, (elm, index) => index)} />
                    </div>
                </div>
            )}


        </div>
    )
}

export default ShopSectionProductComponent;