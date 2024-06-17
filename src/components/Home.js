import React, { useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserName } from '../services/users';
import { logout } from '../services/authentication';
import { auth } from "../firebase";

export function Home() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    if (!loading && user) user.name = user.email.replace('@prepmedios.com', '');// TODO remove

    useEffect(() => {
        if (loading) return 'Loading...';
        if (!user) return navigate("/");
        fetchUserName(user);
    }, [user, loading, navigate]);

    if (loading) return 'Loading...'

    return (
        <>
            <div>{`Bienvenido ${user?.name}`}</div>
            <button
                className="login__btn"
                onClick={logout}
                >
                Log Out
            </button>
        </>
    )
}