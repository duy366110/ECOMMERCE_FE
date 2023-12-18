import React, { useEffect , useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import config from "../../../../configs/config.env";
import MainBannerComponent from './Main-Banner-Component/Main-Banner-Component';
import MainGenresComponent from './Main-Genres-Component/Main-Genres-Component';
import CommonProductListComponent from '../../../common/Common-Product-List-Component/Common-Product-List-Component';
import MainService from "./Main-Service-Component/Main-Service-Component";
import classes from "./Main-Section-Component.module.css";

const MainSectionComponent = (props) => {
    const loader  = useLoaderData();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    // PHƯƠNG THỰC HIÊN MAP PRODUCT DATA.
    const mapperProduct = () => {
        let { status, message, products, categories, error} = loader;

        if(status) {
            setProducts(products);
            setCategories(categories);
        }
    }

    useEffect(() => {
        mapperProduct();

    }, [])

    return (
        <div className={classes['main-component']}>
            <MainBannerComponent />
            <MainGenresComponent categories={categories}/>
            {/* <CommonProductListComponent products={products} hasTitle={true}/> */}
            <MainService />
        </div>
    )
}

export default MainSectionComponent;

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