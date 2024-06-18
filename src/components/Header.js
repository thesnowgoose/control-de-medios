import React from 'react';
import { logout } from '../services/authentication';

export function Header({ name = '' }) {
    const username =  name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div id="header" className='d-flex flex-column mx-4 mb-3'>
            <div className='d-flex flex-row justify-content-between p-3 bg-white'>
                <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" />
                <img src={`${process.env.PUBLIC_URL}/lesp-logo.jpeg`} alt="logo" />
                <img src={`${process.env.PUBLIC_URL}/gob-logo.png`} alt="logo" />
            </div>
            <div className='d-flex flex-row justify-content-between px-4 py-2 align-items-center bg-pearl'>
                <h4>Bienvenid@ {username}</h4>
                <button
                    className="login__btn"
                    onClick={logout}
                    >
                    Log Out
                </button>
            </div>
        </div>
    )
}