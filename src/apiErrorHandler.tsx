class ApiErrorHandler {
    
    /**
     * Return the error message received from the API
     * @param {e:any}
     */
    static getMessageError( e:any ) {
        const response = e?.response;
        const message = response?.data?.message;

        if( message ) {
            return message;
        }
        
        if( response?.status && response?.statusText ) {
            return response?.status + ' : ' + response?.statusText;
        }

        if( response ) {
            return JSON.stringify( response );
        }

        return 'No server response';

    }
}

export default ApiErrorHandler;