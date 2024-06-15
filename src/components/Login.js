import React from 'react';

export function Login() {
    const [state, setState] = React.useState({});
    const authenthicate = () => {
        console.log({state});
    }

    const setUsername = ({ target }) => {
        setState((prevState) => ({...prevState, username: target.value}));
    }

    const setPassword = ({ target }) => {
        setState((prevState) => ({...prevState, password: target.value}))
    }
    
    return (
        <div className='d-flex flex-column bg-gray center'>
            <h4 className='align-self-center mt-3'>Login</h4>
            <div className='d-flex justify-content-center mb-3 mt-4'>
                <input type='text' placeholder='Usuario' onBlur={setUsername} />
            </div>
            <div className='d-flex justify-content-center'>
                <input type='password' placeholder='Contraseña' onBlur={setPassword} />
            </div>
            <button className='mx-5 mt-3 rounded-btn' onClick={authenthicate}>Log in</button>
        </div>
    );
}