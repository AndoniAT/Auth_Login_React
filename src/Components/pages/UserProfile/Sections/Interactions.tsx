import { ChatBubbleBottomCenterTextIcon, UserPlusIcon } from "@heroicons/react/24/solid";

function Interactions( { username }:Readonly<{ username:string }> ) {
    return (
        <div className="flex lg:w-12/12">
            <div className="p-4 h-fit">
                <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                    <UserPlusIcon className="size-20 text-yellow-500 mx-2"/>
                    <p className="dark:text-white">Add {username} to my network</p>
                </div>
            </div>
            {
                <div className="p-4 h-fit">
                    <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                        <ChatBubbleBottomCenterTextIcon className="size-20 text-yellow-500 mx-2"/>
                        <p className="dark:text-white">Start chat with {username}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Interactions;