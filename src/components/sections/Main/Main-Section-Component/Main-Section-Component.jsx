import React, { useEffect, useCallback, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import config from "../../../../configs/config.env";
import MainBannerComponent from './Main-Banner-Component/Main-Banner-Component';
import MainGenresComponent from './Main-Genres-Component/Main-Genres-Component';
import MainService from "./Main-Service-Component/Main-Service-Component";
import classes from "./Main-Section-Component.module.css";

const MainSectionComponent = (props) => {
    const loader  = useLoaderData();
    const [featureds, setFeatureds] = useState([]);

    // PHƯƠNG THỰC HIÊN MAP PRODUCT DATA.
    const mapperProduct = useCallback(() => {
        let { status, featureds} = loader;

        if(status) {
            console.log(featureds);
            setFeatureds(featureds);
        }
    }, [loader])

    useEffect(() => {
        mapperProduct();
    }, [mapperProduct])

    return (
        <div className={classes['main-component']}>
            <MainBannerComponent />
            <MainGenresComponent featureds={featureds}/>
            <MainService />
        </div>
    )
}

export default MainSectionComponent;

// LOADER FEATURED
const loaderFeatured = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/client/featured`, {
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

            let data = await Promise.all([loaderProduct(), loaderFeatured()]);
            let [{products}, {featureds}] = data;
            resolve({ status: true , products, featureds });

        } catch (error) {
            reject(error);
        }
    })
}