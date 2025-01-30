/**
 * Author : Andoni ALONSO TORT
 */

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { jwtDecode } from "jwt-decode";
import { AccesTokenDecodedType } from "../interfaces/Auth";
import { ROLES } from "../AppRoute";
import * as _heroui_aria_utils from "@heroui/aria-utils";
import MyTooltip from "./elements/MyTooltip";

const NavBar = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const decoded = auth?.accessToken ? jwtDecode<AccesTokenDecodedType>( auth.accessToken ) : undefined;
    const userConnected = decoded?.user;

    const signOut = async() => {
        await logout();
        navigate( "/" );
    };

    const goToProfileHandler = async() => {
        if( userConnected ) {
            navigate( `/user/${userConnected.username}/profile` );
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Created by Andoni ALONSO TORT
                        </span>
                    </a>
                    {
                        ( userConnected ) ?
                            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                                <p onClick={signOut} className="text-sm text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                                    Logout
                                </p>
                                <MyTooltip content={'Profile'} position={'botton-start' as _heroui_aria_utils.OverlayPlacement}>
                                        <UserCircleIcon
                                            onClick={goToProfileHandler}
                                            className="size-10 text-slate-500 mx-2 cursor-pointer hover:scale-110"/>
                                </MyTooltip>
                            </div>
                        :
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            <Link to='/login' className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                        </div>

                    }
                </div>
            </nav>
            <nav className="navbar-buttons">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link to='/' className="hover:underline" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to='/about' className="hover:underline">About</Link>
                            </li>
                            <li>
                                <Link to='/contact' className="hover:underline">Contact</Link>
                            </li>
                            {
                                userConnected?.roles.includes( ROLES.admin ) ?
                                    <li>
                                        <Link to='/admin' className="hover:underline">Admin Page</Link>
                                    </li>
                                    :
                                    <></>

                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;