import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { logInWithUsernameAndPassword } from '../services/authentication'
import { auth } from "../firebase";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, navigate]);

  if (loading) return 'Loading...';

  return (
      <div className="login__container">
          <img src={`${process.env.PUBLIC_URL}/lesp-logo.jpeg`} alt="logo" />
          <div className="email">
            <input
                type="text"
                className="login__textBox"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                placeholder="Usuario"
            />
            </div>
        <div className="password">
            <input
                type="password"
                className="login__textBox"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Contraseña"
                />
        </div>
        <button
          className="login__btn"
          onClick={() => logInWithUsernameAndPassword(username, password)}
        >
          Login
        </button>
      </div>
  );
}