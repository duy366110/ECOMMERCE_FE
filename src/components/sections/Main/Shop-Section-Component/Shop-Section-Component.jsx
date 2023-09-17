import React, { useState, useEffect } from 'react';
import { Outlet, useRouteLoaderData, useLocation,  useParams } from "react-router-dom";
import _ from "lodash";
import BreadcroumbComponent from '../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component';
import ShopTabComponent from './Shop-Tab-Component/Shop-Tab-Component';
import CommonInputComponent from '../../../common/Common-Input-Component/Common-Input-Component';
// import SelectComponent from '../../../common/Input/Select-Component/Select-Component';
import classes from "./Shop-Section-Component.module.css";

const SORTS = [
    {
        title: "Default sorting",
        value: "default"
    },
    {
        title: "Category sorting",
        value: "category"
    },
    {
        title: "Price sorting",
        value: "price"
    }
]

const ShopSectionComponent = (props) => {
    const loader = useRouteLoaderData('main-page-component');
    const params = useParams();
    const location = useLocation();
    const [products , setProducts] = useState(loader);
    const [searchValue, setSearchValue] = useState('');
    const [sortvalue, setSortvalue] = useState('default');

    useEffect(() => {

        // Dựa vào caterogy trên url để lấy về danh sách sản phẩm phù hợp.
        if(params.hasOwnProperty('genres') && params.genres !== "All") {
            setProducts((pre) =>loader.filter((product) => product.category == params.genres.toLowerCase()));

        } else {
            setProducts(loader);
        }

    }, [location.pathname, params])


    // Dựa vào từ khoá người dùng nhập vào để tìm sản phẩm phù hợp.
    const searchHandler = (event) => {
        let value = event.target.value;
        setProducts((pre) => {
            let mapper = pre;
            if(value) {
                mapper = mapper.filter((pro) => pro.name.toLowerCase().includes(value));

            } else {
                if(params.hasOwnProperty('genres')) {
                    mapper = loader.filter((product) => product.category == params.genres.toLowerCase())
                } else {
                    // Nếu từ khoá được trả về empty sẽ load lại danh mục sản phẩm ban đầu.
                    mapper = loader;
                }
            }

            return mapper;
        })

        setSearchValue(event.target.value);
    }


    // Dự vào option người dùng lựa chọn để sort.
    const sortHandler = (event) => {
        let value = event.target.value;
        setProducts((pre) => {
            let mapper = [];
            let sort = [];
            Object.assign(mapper, pre);

            if(value !== 'default') {
                if(value === 'category') {
                    sort = mapper.sort((first, last) => (first[value] > last[value])? 1 : -1);
                }

                if(value === 'price') {
                    sort = mapper.sort((first, last) => Number(first[value]) - Number(last[value]));
                }
                
            } else {
                // Sort sản phẩm nặc định theo giá.
                sort = mapper.sort((first, last) => Number(last.price) - Number(first.price));
            }

            
            return sort;
        })

        setSortvalue(value);
    }


    return (
        <div className={classes['shop-component']}>
            <BreadcroumbComponent />
            <div className="container">
                <div className='row py-5'>
                    <div className="col-3">
                        <ShopTabComponent/>
                    </div>
                    
                    <div className="col-9">
                        <div className="row">
                            <div className="col-6">
                                <CommonInputComponent change={searchHandler} valueInput={searchValue} placeholder="Enter search here!"/>
                            </div>
                            <div className="col-6">
                                {/* <SelectComponent change={sortHandler} list={SORTS} /> */}
                            </div>
                        </div>

                        <Outlet context={{products}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSectionComponent;