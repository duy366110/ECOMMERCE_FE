import React, { useEffect , useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MainBannerComponent from './Main-Banner-Component/Main-Banner-Component';
import MainGenresComponent from './Main-Genres-Component/Main-Genres-Component';
import CommonProductListComponent from '../../../common/Common-Product-List-Component/Common-Product-List-Component';
import MainService from "./Main-Service-Component/Main-Service-Component";
import classes from "./Main-Section-Component.module.css";

const MainSectionComponent = (props) => {
    const loader  = useLoaderData();
    const [products, setProducts] = useState([]);

    // PHƯƠNG THỰC HIÊN MAP PRODUCT DATA.
    const mapperProduct = () => {
        let { status, message, products, error} = loader;

        if(status) {
            setProducts(products);
        }
    }

    useEffect(() => {
        mapperProduct();

    }, [])

    return (
        <div className={classes['main-component']}>
            <MainBannerComponent />
            <MainGenresComponent />
            <CommonProductListComponent products={products} hasTitle={true}/>
            <MainService />
        </div>
    )
}

export default MainSectionComponent;

// LOADER PRODUCTS
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch("http://localhost:5000/api/client/product/15/0", {
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