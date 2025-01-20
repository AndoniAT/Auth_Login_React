import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import UserProfile from "./components/UserProfile";

const ROLES = {
    admin: 1000,
    user : 2000
}

const AppRoute = ( ) => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>} >
                { /* Public */}
                <Route index path="/" element={<Home/>}/>
                <Route path="/about" element={<div>About</div>}/>
                <Route path="/contact" element={<div>Contact</div>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/createAccount" element={<CreateAccount/>}/>

                { /* Protected routes*/ }
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={[ ROLES.user, ROLES.admin ]}/>}>
                        <Route path="/user/:id/profile" element={<UserProfile/>}/>
                    </Route>                

                    <Route element={<RequireAuth allowedRoles={[ ROLES.admin ]}/>}>
                        <Route path="/admin" element={<Admin/>}/>
                    </Route>                
                </Route>

                <Route path="/unauthorized" element={<Unauthorized/>}/>

                { /* Catch all */}
                <Route path="*" element={<>Not Found</>}/>
            </Route>
            </Routes>
    )
}

export default AppRoute;