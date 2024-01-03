import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import config from "../../../../../configs/config.env";
import CommonProductCardComponent from "../../../../common/Common-Product-Card-Component/Common-Product-Card-Component";
import classes from "./Shop-Section-Product-Component.module.css";

const ShopSectionProductComponent = (props) => {
    const search = useSelector((state) => state.search);
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

    return (
        <div className={classes['shop-section-product-component']}>
            {products.length > 0 && (
                <div className="row">
                    {products.map((product) => {
                        return (
                            <div key={product._id} className="col-4">
                                <CommonProductCardComponent product={product} />
                            </div>
                        )
                    })}
                </div>
            )}


        </div>
    )
}

export default ShopSectionProductComponent;