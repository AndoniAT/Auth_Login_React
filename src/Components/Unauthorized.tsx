/**
 * Author: Andoni ALONSO TORT
 */

import { useNavigate } from "react-router-dom";

const Unauthorized = ( ) => {
    const navigate = useNavigate();

    const goBack = () => navigate( -1 );

    return (
        <section>
            <h1>Unathorized</h1>
            <br />
            <p>You don't have acces to this page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    );
};

export default Unauthorized;