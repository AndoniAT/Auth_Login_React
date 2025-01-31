/**
 * Author: Andoni ALONSO TORT
 */

import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (
        <>
            <NavBar/>
            {
                /*
                Anything nested in the Layout component is
                represented by the Outlet.
                We use this for the routes in AppRoute.tsx
             */
            }
            <div className="pt-28 max-h-screen overflow-y-auto">
                <Outlet/>
            </div>
        </>
    );
};

export default Layout;