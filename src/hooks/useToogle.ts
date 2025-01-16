import useLocalStorage from "./useLocalStorage";

const useToogle = ( key:string, initValue:any ) => {
    const [ value, setValue ] = useLocalStorage( key, initValue );

    const toogle = ( val:any ) => {
        setValue( ( prev:any ) => {
            return typeof val === 'boolean' ? val : !prev;
        } );
    };

    return [ value, toogle ];
};

export default useToogle;