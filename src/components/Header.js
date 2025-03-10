import React from 'react';
import { logout } from '../services/authentication';
import { refresh } from '../services/medios';
import { getPermissions } from '../utils';
import { openModal } from './modals/Modal';
import { ExportModal } from './modals/ExportModal';
import '../Dropdown.css';

export function Header({ name = '', state, setGlobalState }) {
    const { loggedUser: user, mediosRequests } = state;
    const username =  name.charAt(0).toUpperCase() + name.slice(1);
    const { canManage, canAdd } = getPermissions(user);
    return (
        <div id="header" className='d-flex flex-column mb-3'>
            <div className='d-flex flex-row justify-content-between p-3 bg-white'>
                <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className='mt-4' />
                <img src={`${process.env.PUBLIC_URL}/lesp-logo.jpeg`} alt="logo" className='mt-4'/>
                <div className='d-flex flex-column align-items-end'>
                    <span className='text-secondary'>B-PM-60/1</span>
                    <img src={`${process.env.PUBLIC_URL}/gob-logo.png`} alt="logo" />
                </div>
            </div>
            <div className='d-flex flex-row justify-content-between px-4 py-2 align-items-center bg-pearl'>
                <h4>Bienvenid@ {username}</h4>
                <div id="buttons-header" className='d-flex flex-row align-items-center'>
                    {!canAdd && (
                        <button
                            className="login__btn me-3"
                            onClick={() => refresh(setGlobalState)}
                            >
                            Actualizar
                        </button>
                    )}
                    { canManage ? <Dropdown setGlobalState={setGlobalState} mediosRequests={mediosRequests} /> : (
                        <button className="login__btn" onClick={logout}>
                            Cerrar Sesión
                        </button>
                    ) }
                </div>
            </div>
        </div>
    )
}

const Dropdown = ({ setGlobalState, mediosRequests }) => {
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const handleOpen = () => setOpen(!open);

    const onClick = () => {
        const Content = ExportModal;
        openModal({ setGlobalState, Content, title: 'Crear Respaldo', mediosRequests });
    }

    React.useEffect(() => {
        const onClick = ({ target }) => {
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setOpen(false);
            }
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [dropdownRef, setOpen]);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={handleOpen} className='fa fa-bars bars p-3'><i /></button>
            {open ? (
                <ul className="menu">
                    <li className="menu-item">
                        <button onClick={() => onClick()}>Crear Respaldo</button>
                    </li>
                    <li className="menu-item">
                        <button className="" onClick={logout}>Cerrar Sesión</button>
                    </li>
                </ul>
            ) : null}
        </div>
    )
}