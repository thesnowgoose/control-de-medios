import React from 'react';
import { logout } from '../services/authentication';
import { refresh } from '../services/medios';
import { getPermissions } from '../utils';
import '../Dropdown.css';

export function Header({ name = '', user, setGlobalState }) {
    const username =  name.charAt(0).toUpperCase() + name.slice(1);
    const { canManage } = getPermissions(user);
    return (
        <div id="header" className='d-flex flex-column mb-3'>
            <div className='d-flex flex-row justify-content-between p-3 bg-white'>
                <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" />
                <img src={`${process.env.PUBLIC_URL}/lesp-logo.jpeg`} alt="logo" />
                <img src={`${process.env.PUBLIC_URL}/gob-logo.png`} alt="logo" />
            </div>
            <div className='d-flex flex-row justify-content-between px-4 py-2 align-items-center bg-pearl'>
                <h4>Bienvenid@ {username}</h4>
                <div id="buttons-header" className='d-flex flex-row align-items-center'>
                    <button
                        className="login__btn me-3"
                        onClick={() => refresh(setGlobalState)}
                        >
                        Actualizar
                    </button>
                    { canManage ? <Dropdown /> : (
                        <button className="login__btn" onClick={logout}>
                            Cerrar Sesión
                        </button>
                    ) }
                </div>
            </div>
        </div>
    )
}

const Dropdown = () => {
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const handleOpen = () => setOpen(!open);

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
                        <button onClick={() => {}}>Crear Respaldo</button>
                    </li>
                    {/* <li className="menu-item">
                        <button onClick={() => {}}>Borrar Registros</button>
                    </li> */}
                    <li className="menu-item">
                        <button className="" onClick={logout}>Cerrar Sesión</button>
                    </li>
                </ul>
            ) : null}
        </div>
    )
}