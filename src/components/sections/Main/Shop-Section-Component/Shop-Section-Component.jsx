import { useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import { useDispatch } from 'react-redux';
import config from "../../../../configs/config.env";
import { mapperElement } from "../../../../store/store.generes";
import { loaderInforSearch } from "../../../../store/store.serach";
import BreadcroumbComponent from '../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component';
import ShopTabComponent from './Shop-Tab-Component/Shop-Tab-Component';
import ShopSectionProductComponent from "./Shop-Section-Product-Component/Shop-Section-Product-Component";
import classes from "./Shop-Section-Component.module.css";

const ShopSectionComponent = (props) => {
    const loader = useLoaderData();
    const dispatch = useDispatch();

    const onChangeTypeHandler = (event) => {
        let { type } = event.target.dataset;
        console.log(type);
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

// LOADER CATEGORY
const loaderCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/client/category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                throw Error(await res.json());
            }

            resolve(await res.json());

        } catch (error) {
            reject(error);
        }
    })
}

// LOADER PRODUCTS
const loaderProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/client/product/amount`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                throw Error(await res.json());
            }

            resolve(await res.json());

        } catch (error) {
            reject(error);
        }
    })
}

// LOADER THÔNG TIN MAIN SECTION
export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {

            let data = await Promise.allSettled([loaderProduct(), loaderCategory()]);
            let [{value:{amount}}, {value:{categories}}] = data;
            resolve({ status: true , amountAllProduct: amount, categories });

        } catch (error) {
            reject(error);
        }
    })
}