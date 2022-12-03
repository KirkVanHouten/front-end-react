import React from 'react';
import Menu from "./Menu";
import {Outlet} from "react-router-dom";

// Template de l'application qui va alors contenir la navbar (Menu) et la page sélectionnée (mise dans Outlet)
const Layout = () => {
    return (
        <div>
            <Menu/>
            <Outlet/>
        </div>
    );
};

export default Layout;