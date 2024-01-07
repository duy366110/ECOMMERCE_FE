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

    const mapperProduct = useCallback(() => {
        let { status, featureds} = loader;

        if(status) {
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

// LOAD INFORMATION
export const loader = (request, params) => {
    let mainSectionWorker = new Worker(`${window.location.origin}/assets/js/main-worker.js`);

    return new Promise( async(resolve, reject) => {
        try {
            let options = {
                type: "main-get-infor",
                featured: {
                    url: `${config.URI}/api/client/featured`
                }
            }

            mainSectionWorker.postMessage(options);
            mainSectionWorker.onmessage = (event) => {
                let [{value: {featureds}}] = event.data;
                resolve({ status: true , featureds });
            }

        } catch (error) {
            reject(error);
        }
    })
}