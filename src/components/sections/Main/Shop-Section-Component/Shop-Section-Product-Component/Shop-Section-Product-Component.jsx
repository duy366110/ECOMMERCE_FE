import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../../configs/config.env";
import { updateCurrentPage } from "../../../../../store/store.serach";
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
                let url = `${config.URI}/api/search/${search.type}/${search.itemPage}/${search.currentPage}`;
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

            }
        }

        http();
    }, [search])

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