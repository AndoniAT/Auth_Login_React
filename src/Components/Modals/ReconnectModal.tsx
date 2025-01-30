const ReconnectModal = ( { header, message } : { header:string, message:string } ) => {
    return (
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className="inline-flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full mx-auto	">
                { /* Modal content */ }
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    { /* Modal header */ }
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            { header }
                        </h3>
                    </div>
                    { /* Modal body */ }
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            { message }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReconnectModal;