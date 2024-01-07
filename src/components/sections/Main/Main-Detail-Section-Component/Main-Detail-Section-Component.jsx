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
    const [productDesc, setProductDesc] = useState("");
    const [productSample, setProductSample] = useState([]);

    const mapperData = useCallback(function() {

        let { status, product, category} = loader;
        if(status) {
            setProduct(product);

            let des = product.longDes.split('(+)')
                .filter((content) => content)
                .map((content) => {
                    return `<p class="descrition-item">${content}</p>`;
                })
                .join('');

            console.log(des);
            setProductDesc(des);

            // FILTER CATEGORY PRODUCT SAMPLE PRODUCT MAIN
            category.collections = category.collections
                                    .filter((pro) => pro._id !== product._id)
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
                                <div className="col-12 col-lg-5 mb-5 mb-lg-0">
                                    <MainDetailSectionThumbnailComponent list={product.images} />
                                </div>

                                <div className="col-12 col-lg-7">
                                    <MainDetailSectionInformationComponent information={product} />
                                </div>

                                <div className='col-12 mt-5'>
                                    <div className={classes['product-detail-information']}>
                                        <h3 className={classes['product-detail-information__sub-title']}>Description</h3>
                                        <h3 className={classes['product-detail-information__title']}>Product Description</h3>
                                        <div
                                            dangerouslySetInnerHTML={{__html: productDesc}}/>
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

// LOADER PRODUCT DETAIL INFORMATION
export const loader = (request, params) => {
    const worker = new Worker(`${window.location.origin}/assets/js/worker.js`);

    return new Promise( async(resolve, reject) => {
        try {
            let { product_id, category_id } = params;
            const options = {
                product: {
                    url: `${config.URI}/api/client/product/${product_id}`
                },
                category: {
                    url: `${config.URI}/api/client/category/${category_id}`
                }
            }
            worker.postMessage({type: "get-product-detail", options});
            worker.onmessage = (event) => {
                let [{value: {category}}, {value: {product}}] = event.data;
                resolve({status: true , product, category});
            }

        } catch (error) {
            reject({status: false, error});
        }
    })
}