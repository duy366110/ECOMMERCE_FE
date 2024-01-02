import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useLoaderData } from "react-router-dom";
import config from "../../../../configs/config.env";
import CommonProductCardComponent from '../../../common/Common-Product-Card-Component/Common-Product-Card-Component';
import CommonBreadcrumbComponent from '../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component';
import MainDetailSectionThumbnailComponent from "./Main-Detail-Section-Thumbnail-Component/Main-Detail-Section-Thumbnail-Component";
import MainDetailSectionInformationComponent from './Main-Detail-Section-Information-Component/Main-Detail-Section-Information-Component';
import classes from "./Main-Detail-Section-Component.module.css";

const MainDeatilSectionComponent = (props) => {
    const params = useParams();
    const loader = useLoaderData();

    const [product, setProduct] = useState(null);
    const [description, setDescription] = useState('');
    const [productSample, setProductSample] = useState([]);

    // PHƯƠNG THỰC HIÊN MAP PRODUCT VÀ CATEGORY DATA.
    const mapperData = useCallback(function() {

        let { status, product, category} = loader;

        if(status) {
            setProduct(product);

            // FORMAT NỘI DUNG MIÊU TẢ
            let des = product.longDes.split('(+)').map((content, index) => {
                if(index === 0 ) {
                    return `<h2 class="descrition-title">${content}<h2>`;
                }
                return `<p class="descrition-item">${content}<p>`;

            }).join('');
            setDescription(des);

            // LỌC NHỮNG SẢN PHẨM TƯỢNG TỰ SẢN PHẨM CHÍNH
            category.collections = category.collections.filter((pro) => pro._id !== product._id)
                                    .map((pro) => {
                                        pro.category = product.category;
                                        return pro;
                                    });
                                    
            setProductSample(category.collections);
        }
    }, [loader])

    useEffect(() => {
        mapperData();
    }, [params.product_id, params.category_id, mapperData])


    return (
        <div className={classes['detail-product-component']}>
            <CommonBreadcrumbComponent/>
            <div className={classes['detail-product-wrapper']}>
                <div className="container">

                        {product && (
                            <div className="row">
                                <div className="col-12 col-lg-6 mb-5 mb-lg-0">
                                    <MainDetailSectionThumbnailComponent list={product.images} />
                                </div>

                                <div className="col-12 col-lg-6">
                                    <MainDetailSectionInformationComponent information={product} />
                                </div>

                                <div className='col-12 mt-5'>
                                    <div className={classes['product-detail-information']}>
                                        <h3 className={classes['product-detail-information__sub-title']}>Description</h3>
                                        <h3 className={classes['product-detail-information__title']}>Product Description</h3>
                                        <div contentEditable='true' dangerouslySetInnerHTML={{__html: description}}/>
                                    </div>
                                </div>
                            </div>
                        )}

                    <div className={classes['product-simlar']}>
                        <div className="row">
                            {product && productSample.length > 0 && productSample.map((productSample, index) => {
                                return (
                                    <div className="col-12 col-md-3" key={productSample._id}>
                                        <CommonProductCardComponent product={productSample}/>
                                    </div>
                                )
                            })}

                            {!productSample.length > 0 && <p className='product-blank'>Not found products similar!</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MainDeatilSectionComponent;

// LOADER SẢN PHẨM TƯƠNG TỰ
async function loadProductsSample (category) {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${config.URI}/api/client/category/${category}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}

// LOADER PRODUCT CHI TIẾT
async function loadProduct (product) {
    return new Promise( async(resolve, reject) => {
        try {
            let res = await fetch(`${config.URI}/api/client/product/${product}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}

// THỰC HIỆN LOADER THÔNG TRANG CHI TIẾT SẢN PHẨM
export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {
            let { product_id, category_id } = params;

            let data = await Promise.all([loadProduct(product_id), loadProductsSample(category_id)]);
            let [{product}, {category}] = data;
            resolve({status: true , product, category});

        } catch (error) {
            reject({status: false, error});
        }
    })
}