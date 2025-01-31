/**
 * Author: Andoni ALONSO TORT
 */

import "./styles/userProfile.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import SuspenseComp from "./components/SuspenseComp";
import { lazy } from "react";
import UserProfileSkeleton from "./skeletons/UserProfileSkeletons";

export const ROLES = {
    admin: 1000,
    user : 2000
};

const AppRoute = ( ) => {
    const UserProfile = lazy( () => import( "./components/pages/UserProfile/UserProfile" ) );;

    return (
        <div>
            <Routes>
                { /* Public */}
                <Route element={<PersistLogin/>}>
                    <Route path="/" element={<Layout/>} >
                        <Route index path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                    </Route>

                    { /* Protected routes*/ }
                    <Route path="/" element={<Layout/>} >
                        <Route element={<RequireAuth allowedRoles={[]} authRequired={false} pages={[ "/login", "/createAccount" ]}/>}>
                            <Route path="/login" element={<LoginForm/>}/>
                            <Route path="/createAccount" element={<CreateAccount/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ ROLES.user, ROLES.admin ]}/>}>
                            <Route element={<SuspenseComp fallback={<UserProfileSkeleton/>}/>}>
                                <Route path="/user/:id/profile" element={<UserProfile/>}/>
                            </Route>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={[ ROLES.admin ]}/>}>
                            <Route path="/admin" element={<Admin/>}/>
                        </Route>

                        <Route path="/unauthorized" element={<Unauthorized/>}/>
                    </Route>


                    { /* Catch all */}
                    <Route path="*" element={<>Not Found</>}/>
                </Route>
            </Routes>
        </div>
    );
};

/**
 * <Route path="/" element={<Layout/>} >
 * <Route element={<PersistLogin/>}>
 */

export default AppRoute;