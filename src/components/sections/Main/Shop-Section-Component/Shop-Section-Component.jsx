import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import config from "../../../../configs/config.env";
import { GENRES, IPHONEANDMAC, WIRELESS, OTHER } from "../../../../data/data.constant";
import { loaderPagination } from "../../../../store/store.pagination";
import useHttp from "../../../../hook/use-http";
import BreadcroumbComponent from '../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component';
import ShopTabComponent from './Shop-Tab-Component/Shop-Tab-Component';
import CommonProductListComponent from "../../../common/Common-Product-List-Component/Common-Product-List-Component";
import classes from "./Shop-Section-Component.module.css";



const ShopSectionComponent = (props) => {
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector((state) => state.pagination);

    const { httpMethod } = useHttp();
    const [products , setProducts] = useState([]);

    // PHƯƠNG THỨC MAP PAGINATION
    const mapPagination = (categories) => {
            dispatch(loaderPagination({infor: categories}));
    }

    const loaderProductByType = (event) => {
        let { type } = event.target.dataset;
        console.log(type);
    }
    
    useEffect(() => {
        let { status, categories, products} = loader;

        if(status) {
            mapPagination(categories);

            for(let generes of GENRES) {
                if(generes.id === 1) {
                    generes.values = categories.filter((elm) => IPHONEANDMAC.some((type) => type === elm.title));
                }

                if(generes.id === 2) {
                    generes.values = categories.filter((elm) => WIRELESS.some((type) => type === elm.title));
                }

                if(generes.id === 3) {
                    generes.values = categories.filter((elm) => OTHER.some((type) => type === elm.title));
                }
            }

            setProducts(products);
        }

    }, [])

    // Dựa vào từ khoá người dùng nhập vào để tìm sản phẩm phù hợp.
    const searchHandler = (event) => { }

    // Dự vào option người dùng lựa chọn để sort.
    const sortHandler = (event) => { }

    return (
        <div className={classes['shop-component']}>
            <BreadcroumbComponent />
            <div className="container">
                <div className='row py-5'>
                    <div className="col-3">
                        <ShopTabComponent changeType={loaderProductByType} generes={GENRES}/>
                    </div>
                    
                    <div className="col-9">
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6"> </div>
                        </div>

                        <CommonProductListComponent products={products} hasTitle={false} />
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

            let res = await fetch(`${config.URI}/api/client/product/15/0`, {
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

            let data = await Promise.all([loaderProduct(), loaderCategory()]);
            let [{products}, {categories}] = data;
            resolve({ status: true , products, categories });

        } catch (error) {
            reject(error);
        }
    })
}