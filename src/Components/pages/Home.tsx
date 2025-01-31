/**
 * Author: Andoni ALONSO TORT
 */

import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";
import "../../styles/main.css";
import * as _heroui_aria_utils from "@heroui/aria-utils";
import MyTooltip from "../elements/MyTooltip";

const Home = ( ) => {
    const [count, setCount] = useState( 0 );

    return (
        <div className={
            `w-full mx-auto p-10
            min-h-fit`
        }>
            <div className='text-center'>
                <div className='flex inline-flex'>
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <div className='text-center flex justify-center w-full'>
                        <MyTooltip content={"Click me"} position={"botton-start" as _heroui_aria_utils.OverlayPlacement}>
                            <button
                                onClick={() => setCount( ( count ) => count + 1 )}
                                className="blue-btn text-white font-bold py-2 px-4 rounded m-3"
                            >
                                count is {count}
                            </button>

                        </MyTooltip>
                    </div>
                    <p>
                    Edit <code>src/components/pages/Home.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                Click on the Vite and React logos to learn more
                </p>
            </div>
        </div>
    );
};

export default Home;