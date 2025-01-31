/**
 * Author: Andoni ALONSO TORT
 */

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import ErrorComp from "./ErrorComp";

interface TypeParams {
    fallback: JSX.Element
};

const SuspenseComp = ( { fallback } : TypeParams ) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorComp}>
            <Suspense fallback={fallback}>
                <Outlet/>
            </Suspense>
        </ErrorBoundary>
    );
};

export default SuspenseComp;