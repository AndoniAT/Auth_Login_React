/**
 * Author: Andoni ALONSO TORT
 */

interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string,
    err?:string
}

const MyInput = ( { label, id, err, ...attr }:InputType ) => {
    return (
        <div className="mb-5">
            <label htmlFor={id} className="block mb-2 text-sm font-medium">
                {label}
            </label>
            <input id={id} { ...attr } />
            <p className={err ? "errmsg error-message" : "offscreen"} aria-live="assertive">{err}</p>
        </div>
    );
};

export default MyInput;