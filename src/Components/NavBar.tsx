import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const NavBar = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async() => {
        await logout();
        navigate( '/' );
    };

    return (
        <>
            <nav className="bg-slate-300 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Andoni ALONSO TORT</span>
                    </a>
                    {
                        ( auth?.accessToken ) ?
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            <p onClick={signOut} className="text-sm text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Logout</p>
                        </div>
                        :
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            <Link to='/login' className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                        </div>

                    }
                </div>
            </nav>
            <nav className="bg-slate-200 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link to='/' className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to='/about' className="text-gray-900 dark:text-white hover:underline">About</Link>
                            </li>
                            <li>
                                <Link to='/contact' className="text-gray-900 dark:text-white hover:underline">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;