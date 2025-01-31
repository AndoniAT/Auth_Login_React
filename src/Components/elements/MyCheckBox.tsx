/**
 * Author: Andoni ALONSO TORT
 */

interface MyCheckBoxType extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string
}

const MyCheckBox = ( { label, id, ...attr }:MyCheckBoxType ) => {
    return (
        <div className="flex items-start mb-5 mt-4">
            <div className="flex items-center h-5">
                <input id={id} type="checkbox" value=""
                    className={""}
                    {...attr }
                />
            </div>
            <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-900 dark:text-black">
                {label}
            </label>
        </div>
    );
};

export default MyCheckBox;