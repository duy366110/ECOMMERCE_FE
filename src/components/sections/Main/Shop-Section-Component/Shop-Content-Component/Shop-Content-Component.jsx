import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import CommonProductListComponent from '../../../../common/Common-Product-List-Component/Common-Product-List-Component';
import classes from "./Shop-Content-Component.module.css";

const ShopContentComponent = (props) => {
    const context = useOutletContext();
    const [productList, setProductList ] = useState([]);
    const pagination = useSelector((state) => state.pagination);
    const dispatch = useDispatch();

    useEffect(() => {

        // Thực hiện lấy tổng số sản phẩm để tạo thanh phan trang.
        // dispatch(getTotalItem({totalItems: context.products.length}));

        // Nếu danh mục sản phẩm không rỗng.
        if(context.products.length) {
            let mapper = [];
            for(let start = pagination.itemsStartList; start < context.products.length; start++) {
               
                // Lấy ra sản phẩm hiện lện view dựa vào trang hiện tại - số sản phẩm một trang.
                if(mapper.length < pagination.pageItems) {
                    mapper.push(context.products[start]);

                }
            }

            setProductList((pre) => mapper);
        } else {

            setProductList((pre) => []);
        }

    }, [context.products, pagination.itemsStartList])

    return (
        <>
            <div className={classes['shop-content-component']}>
                <CommonProductListComponent products={productList} hasTitle={false} />
            </div>
            {productList.length > 0 && (
                <div className="d-flex align-items-center justify-content-end"></div>
            )}
        </>
    )
}

export default ShopContentComponent;