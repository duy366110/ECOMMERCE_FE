import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import config from "../../../../configs/config.env";
import { GENRES, IPHONEANDMAC, WIRELESS, OTHER } from "../../../../data/data.constant";
import { loaderPagination, updateElementToTal,  updateCurrentPage, updateType } from "../../../../store/store.pagination";
import useHttp from "../../../../hook/use-http";
import BreadcroumbComponent from '../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component';
import ShopTabComponent from './Shop-Tab-Component/Shop-Tab-Component';
import CommonProductListComponent from "../../../common/Common-Product-List-Component/Common-Product-List-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Shop-Section-Component.module.css";

const ShopSectionComponent = (props) => {
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector((state) => state.pagination);

    const { httpMethod } = useHttp();
    const [type, setType] = useState('all');
    const [products , setProducts] = useState([]);

    // THAY ĐỔI TYPE SEARCH
    const changeTypeHandler = (event) => {
        let { type } = event.target.dataset;
        setType(type);

    }

    // LẤY THÔNG TIN VÀ CẬP NHẬT USER
    const searchProduct = async () => {
        let { amount} = loader;

        if(type !== 'all') {
            let category = pagination.category.find((elm) => elm.id === type)
            dispatch(updateElementToTal({amount: category.amount, type}));

        } else {
            console.log(amount);
            httpMethod({
                url: `${config.URI}/api/client/product/amount`,
                method: 'GET',
                author: '',
                payload: null
            }, (infor) => {
                let { status, message, amount } = infor;
                dispatch(updateElementToTal({amount, type: 'all'}));
            })
        }

        httpMethod({
            url: `${config.URI}/api/search/${type}/${pagination.current.itemPage}/${(pagination.current.itemPage * pagination.current.currentPage)}`,
            method: 'GET',
            author: '',
            payload: null
        }, (infor) => {
            let { status, message, products } = infor;
            setProducts(products);
        })
    }
    
    useEffect(() => {
        let { status, categories, amount} = loader;

        if(status) {
            searchProduct();
            dispatch(loaderPagination({infor: categories}));

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
        }

    }, [type, pagination.current.currentPage])

    // Dựa vào từ khoá người dùng nhập vào để tìm sản phẩm phù hợp.
    const searchHandler = (event) => { }

    // Dự vào option người dùng lựa chọn để sort.
    const sortHandler = (event) => { }

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPage({page: pagi}));
    }

    return (
        <div className={classes['shop-component']}>
            <BreadcroumbComponent />
            <div className="container">
                <div className='row py-5'>
                    <div className="col-3">
                        <ShopTabComponent changeType={changeTypeHandler} generes={GENRES}/>
                    </div>
                    
                    <div className="col-9">
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6"> </div>
                        </div>

                        <CommonProductListComponent products={products} hasTitle={false} />

                        <CommonPaginationComponent
                            click={paginationHandler}
                            items={ Array.from({length: pagination.current.elemtItemsPagination}, (elm, index) => index)} />
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

            let data = await Promise.all([loaderProduct(), loaderCategory()]);
            let [{amount}, {categories}] = data;
            resolve({ status: true , amount, categories });

        } catch (error) {
            reject(error);
        }
    })
}