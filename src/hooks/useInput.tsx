import useLocalStorage from "./useLocalStorage";

const useInput = ( key:string, initValue:any ) => {
    const [ value, setValue ] = useLocalStorage( key, initValue );

    const reset = () => setValue( initValue );

    const attrObj = {
        value,
        onChange: ( e:React.ChangeEvent<HTMLInputElement> ) => setValue( e.target.value )
    }

    return [ value, reset, attrObj ];
}

export default useInput;