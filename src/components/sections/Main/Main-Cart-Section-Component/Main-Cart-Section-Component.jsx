import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../configs/config.env";
import { loadCartInformation } from "../../../../store/store.cart";
import CommonBreadcroumbComponent from "../../../common/Common-Breadcrumb-Component/Common-Breadcrumb-Component";
import MainCartContentComponent from "./Main-Cart-Content-Component/Main-Cart-Content-Component";
import classes from "./Main-Cart-Section-Component.module.css";

const MainCartSectionComponent = (props) => {
    const loader = useLoaderData();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // PHƯƠNG THỨC LOAD THÔNG CART CỦA USER
    useEffect(() => {
        if(auth.token) {
            let { user} = loader;
            dispatch(loadCartInformation({user}));

        } else {
            navigate('/auth');
        }

    }, [loader, auth.token, dispatch, navigate])

    return (
        <div className={classes['cart-component']}>
            <CommonBreadcroumbComponent />
            <MainCartContentComponent />
        </div>
    )
}

export default MainCartSectionComponent;

// LOADER CART THÔNG TIN USER
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = localStorage.getItem('user');
                if(user) {
                    user = JSON.parse(user);

                    let res = await fetch(`${config.URI}/api/client/cart`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user.token}`
                    }
                })

                if(!res.ok) {
                    throw Error(await res.json());
                }

                resolve(await res.json());

            } else {
                resolve(null);
            }

        } catch (error) {
            reject(error);
        }
    })
}