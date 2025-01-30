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
            <Outlet/>
        </>
    );
};

export default Layout;