import { Link } from "react-router-dom";

const Home = ( ) => {
    return (
        <div className="max-w-md mx-auto mt-14 border-2 border-slate-400 p-10 rounded-lg bg-slate-200 dark:bg-gray-900">
            <Link to={'/profile'} className="text-indigo-700">Profile</Link>
            <br />
            <Link to={'/admin'} className="text-indigo-700">Admin</Link>
        </div>
    )
}

export default Home;