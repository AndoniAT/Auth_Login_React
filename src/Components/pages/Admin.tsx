/**
 * Author: Andoni ALONSO TORT
 */

import { Suspense } from "react";
import "../../styles/admin.css";

import Users from "../Users";
import AdminPageSkeletons from "../../skeletons/AdminPageSkeletons";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComp from "../ErrorComp";

const Admin = () => {
    return (
        <section className="admin-container">
            <h1 className="text-center text-2xl mt-5 font-bold">Admins Page</h1>
            <ErrorBoundary FallbackComponent={ErrorComp}>
                <br />
                <div className="users-container">
                    <h2 className="text-center text-lg">Users List</h2>
                    <Suspense fallback={<AdminPageSkeletons/>}>
                        <Users />
                    </Suspense>
                </div>
                <br />
            </ErrorBoundary>
        </section>
    );
};

export default Admin;