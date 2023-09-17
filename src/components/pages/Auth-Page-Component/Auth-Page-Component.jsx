import { Outlet } from "react-router-dom";
import CommonPopupComponent from "../../common/Common-Popup-Component/Common-Popup-Component";
import classes from "./Auth-Page-Component.module.css";

const AuthPageComponent = (props) => {

    return (
        <div className={classes['auth-page-component']} style={{backgroundImage: 'url("/assets/images/banner1.jpg")'}}>
            <Outlet />
            <CommonPopupComponent />
        </div>
    )
}

export default AuthPageComponent;