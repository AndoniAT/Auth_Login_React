/**
 * Author: Andoni ALONSO TORT
 */

import { useState, useEffect } from "react";

const getLocalValue = ( key:string, initValue:any ) => {
    // Server side react => like next.js
    if( typeof window ===  "undefined" ) {
        return initValue;
    }

    // If a value is already stored
    const localValue = localStorage.getItem( key );
    if( localValue && localValue !== undefined ) {
        const value = JSON.parse( localValue );
        return value;
    }

    // return result of a function
    if( initValue instanceof Function ) return initValue();

    return initValue;

};

const useLocalStorage = ( key:string, initValue:any ) => {
    const [ value, setValue ] = useState<any>( () => {
        return getLocalValue( key, initValue );
    } );

    useEffect( () => {
        localStorage.setItem( key, JSON.stringify( value ) );
    }, [ key, value ] );

    return [ value, setValue ];
};

export default useLocalStorage;