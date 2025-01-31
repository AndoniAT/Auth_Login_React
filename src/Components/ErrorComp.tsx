/**
 * Author: Andoni ALONSO TORT
 */

import { FaceFrownIcon } from "@heroicons/react/24/solid";

interface ErrorType {
    error: Error,
    resetErrorBoundary: any
};

const ErrorComp = ( { error, resetErrorBoundary  } : ErrorType ) => {

    return (
        <div className="my-0 mx-auto w-fit justify-items-center mt-[10%]">
            <FaceFrownIcon className="size-30 mx-2 text-slate-700"/>
            <p className="text-xl">Something went wrong !</p>
            <p className="text-lg error-message">{ error?.message }</p>
        </div>
    );
};

export default ErrorComp;