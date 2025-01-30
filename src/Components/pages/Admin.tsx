import "../../styles/Admin.css";

import Users from "../Users";
const Admin = () => {
    return (
        <section className="admin-container">
            <h1 className="text-center text-2xl mt-5 font-bold">Admins Page</h1>
            <br />
            <Users />
            <br />
        </section>
    );
};

export default Admin;