import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { readMediosTypes, readMediosRequests } from '../services/medios';
import { readLoggedUser } from '../services/users';
import { auth } from "../firebase";
import { Header } from './Header';
import { CaptureForm } from './CaptureForm';
import { RecordsList } from './RecordsList';
import { getPermissions } from '../utils';
import "react-datepicker/dist/react-datepicker.css";

const emptyState = {
    mediosTypes: [],
    mediosRequests: [],
    loggedUser: null
}

export function Home() {
    const [state, setState] = useState(emptyState);
    const [user, loading] = useAuthState(auth);
    const { canCreate } = getPermissions(state.loggedUser);
    const navigate = useNavigate();

    if (!loading && user) user.name = user.email.replace('@prepmedios.com', '');// TODO remove

    useEffect(() => {
        if (!user) return navigate("/");
        readMediosTypes(setState);
        readMediosRequests(setState);
        readLoggedUser(user.uid, setState);
    }, [user, navigate]);

    if (loading) return 'Loading...'

    return (
        <div id="home" className='d-flex flex-column'>
            <Header name={user?.name} user={state.loggedUser} setGlobalState={setState} />
            {canCreate && <CaptureForm mediosTypes={state.mediosTypes} setGlobalState={setState} user={user} />}
            <RecordsList user={state.loggedUser} mediosRequests={state.mediosRequests} setGlobalState={setState}  />
        </ div>
    )
}