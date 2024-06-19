import React from 'react';
import { logout } from '../services/authentication';
import { refresh } from '../services/medios';

export function Header({ name = '', setGlobalState }) {
    const username =  name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div id="header" className='d-flex flex-column mb-3'>
            <div className='d-flex flex-row justify-content-between p-3 bg-white'>
                <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" />
                <img src={`${process.env.PUBLIC_URL}/lesp-logo.jpeg`} alt="logo" />
                <img src={`${process.env.PUBLIC_URL}/gob-logo.png`} alt="logo" />
            </div>
            <div className='d-flex flex-row justify-content-between px-4 py-2 align-items-center bg-pearl'>
                <h4>Bienvenid@ {username}</h4>
                <div>
                    <button
                        className="login__btn__sec me-3"
                        onClick={() => refresh(setGlobalState)}
                        >
                        Actualizar Datos
                    </button>
                    <button
                        className="login__btn"
                        onClick={logout}
                        >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}