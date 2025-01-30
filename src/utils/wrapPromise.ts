/**
 * Author : Andoni ALONSO TORT
 */

function WrapPromise( promise : Promise<any> ) {
    let status = "pending";
    let response:any;

    const suspender = promise
        .then( ( res:any ) => {
            status = "success";
            response = res;
        }
        )
        .catch( ( err:Error ) => {
            status = "error";
            response = err;
        } );

    const handler:any = {
        pending: () => {
            throw suspender;
        },
        error: () => {
            throw response;
        },
        default: () => response
    };

    const read = () => {
        const res = handler[ status ] ? handler[ status ]() : handler.default();
        return res;
    };

    return { read };
}

export default WrapPromise;