import { Link } from "react-router-dom";

function CreateAccount() {
    return (
        <form className="max-w-md mx-auto mt-14 border-2 border-slate-400 p-10 rounded-lg bg-slate-200 dark:bg-gray-900">
            <div className="w-full text-center mb-3">
                <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">CREATE ACCOUNT</span>
            </div>
            <div className="mb-5">
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Firstname
                </label>
                <input type="firstname" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Firstname" required />
            </div>
            <div className="mb-5">
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Lastname
                </label>
                <input type="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Lastname" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="email@example.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="repeat-assword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Repeat password
                </label>
                <input type="repeat-password" id="repeat-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <div className="flex items-start mb-5">
                <Link to='/login' className="text-blue-900 hover:underline dark:text-blue-500">I have an account</Link>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create Account
            </button>
        </form>
    )
}

export default CreateAccount;