import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

const AppRoute = ( ) => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>} >
                <Route index path="/" element={<div>Home</div>}/>
                <Route path="/about" element={<div>About</div>}/>
                <Route path="/contact" element={<div>Contact</div>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/createAccount" element={<CreateAccount/>}/>

                <Route element={<RequireAuth/>}>
                    <Route path="/" element={<>Connected</>}/>
                    <Route path="/profile" element={<>Profile</>}/>
                </Route>                

                { /* Catch all */}
                <Route path="*" element={<>Not Found</>}/>
            </Route>
            </Routes>
    )
}

export default AppRoute;