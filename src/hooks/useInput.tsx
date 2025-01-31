/**
 * Author: Andoni ALONSO TORT
 */

import useLocalStorage from "./useLocalStorage";

const useInput = ( key:string, initValue:any ) => {
    const [ value, setValue ] = useLocalStorage( key, initValue );

    const reset = ( val = initValue ) => {
        setValue( val );
    };

    const attrObj = {
        value,
        onChange: ( e:React.ChangeEvent<HTMLInputElement> ) => setValue( e.target.value )
    };

    return [ value, reset, attrObj ];
};

export default useInput;