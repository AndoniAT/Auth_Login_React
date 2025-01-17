import Users from "./Users"; 

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>You must have been assigned an Admin role.</p>
            <Users />
            <br />
        </section>
    )
}

export default Admin;