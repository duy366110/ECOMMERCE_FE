import { useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import { useDispatch } from 'react-redux';
import config from "../../../../configs/config.env";
import { mapperElement } from "../../../../store/store.generes";
import { loaderInforSearch, updateTypeSearch } from "../../../../store/store.serach";
import BreadcroumbComponent from '../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component';
import ShopTabComponent from './Shop-Tab-Component/Shop-Tab-Component';
import ShopSectionProductComponent from "./Shop-Section-Product-Component/Shop-Section-Product-Component";
import classes from "./Shop-Section-Component.module.css";

const ShopSectionComponent = (props) => {
    const shopSectionWorker = new Worker("assets/js/product-worker.js");
    const loader = useLoaderData();
    const dispatch = useDispatch();

    const onChangeTypeHandler = (event) => {
        let { type } = event.target.dataset;

        shopSectionWorker.postMessage({
            type: "shop-product-amount",
            url: `${config.URI}/api/search/product/amount?category=${type}`
        });

        shopSectionWorker.onmessage = (event) => {
            let { status, amount } = event.data;
            if(status) {
                dispatch(updateTypeSearch({type, amount}))
            }
        }
    }
    
    useEffect(() => {
        let { status, amountAllProduct, categories} = loader;
        if(status && categories.length > 0) {
            dispatch(loaderInforSearch({amount: amountAllProduct}));
            dispatch(mapperElement({categories}));
        }
    }, [loader, dispatch])

    return (
        <div className={classes['shop-component']}>
            <BreadcroumbComponent />
            <div className="container">
                <div className='row py-5'>
                    <div className="col-3 d-none d-lg-block">
                        <ShopTabComponent changeType={onChangeTypeHandler}/>
                    </div>

                    <div className="col-12 col-lg-9">
                        <ShopSectionProductComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSectionComponent;

// LOADER SHOP INFORMATION SECTION
export const loader = (request, params) => {
    const worker = new Worker(`${window.location.origin}/assets/js/product-worker.js`);
    return new Promise( async(resolve, reject) => {
        try {

            let options = {
                category: {
                    url: `${config.URI}/api/client/category`
                },
                product: {
                    url: `${config.URI}/api/client/product/amount`
                }
            }

            worker.postMessage({
                type: "shop-product-loade-infor",
                options
            });

            worker.onmessage = (event) => {
                let [{value:{categories}}, {value:{amount}}] = event.data;
                resolve({ status: true , amountAllProduct: amount, categories });
            }

        } catch (error) {
            reject(error);
        }
    })
}