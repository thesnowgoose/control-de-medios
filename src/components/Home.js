import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { readMedios } from '../services/medios';
import { auth } from "../firebase";
import { CaptureForm } from './CaptureForm';
import { Header } from './Header';

const emptyState = {
    medios: []
}

export function Home() {
    const [state, setState] = useState(emptyState);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    if (!loading && user) user.name = user.email.replace('@prepmedios.com', '');// TODO remove

    useEffect(() => {
        if (loading) return 'Loading...';
        if (!user) return navigate("/");
        readMedios(setState)
    }, [user, loading, navigate]);

    if (loading) return 'Loading...'

    return (
        <div id="home" className='d-flex flex-column'>
            <Header name={user?.name} />
            <CaptureForm medios={state.medios} />
        </ div>
    )
}