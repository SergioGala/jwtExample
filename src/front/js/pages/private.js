import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate("/");
        }
    }, [store.token, navigate]);

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    return (
        <div className="text-center mt-5">
            <h1>Private Page</h1>
            <p>Welcome, {store.user}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}