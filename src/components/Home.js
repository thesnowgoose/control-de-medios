import React, { useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { fetchUserName } from '../services/users';
import { auth } from "../firebase";
import { CaptureForm } from './CaptureForm';
import { Header } from './Header';

export function Home() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    if (!loading && user) user.name = user.email.replace('@prepmedios.com', '');// TODO remove

    useEffect(() => {
        if (loading) return 'Loading...';
        if (!user) return navigate("/");
        fetchUserName(user);
    }, [user, loading, navigate]);

    if (loading) return 'Loading...'

    return (
        <div id="home" className='d-flex flex-column'>
            <Header name={user?.name} />
            <CaptureForm />
        </ div>
    )
}