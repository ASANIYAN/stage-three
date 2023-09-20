/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

const UnAuthLayout = ({ user }) => {
    const outlet = useOutlet();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
        } else {
            navigate("login");
        }
    }, [user]);

    return (
        <main>
            { outlet }
        </main>
    )
}
 
export default UnAuthLayout;