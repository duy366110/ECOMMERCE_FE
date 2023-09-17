import React from 'react';
import { Outlet }from "react-router-dom";
import CommonHeaderComponent from '../../common/Common-Header-Component/Common-Header-Component';
import CommonFooterComponent from '../../common/Common-Footer-Component/Common-Footer-Component';

const MainPageComponent = (props) => {

    return (
        <div>
            <CommonHeaderComponent />
            <Outlet />
            <CommonFooterComponent />
        </div>
    )
}

export default MainPageComponent;