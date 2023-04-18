import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    };

    const demoUser = (e) => {
      e.preventDefault();
      return dispatch(sessionActions.login({ credential: "demoUser", password: "password" }))
        .then(closeModal)
    }

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
        {errors.message && (
          <p className="login-errors">{errors.message}</p>
        )}
          <input
            className="credential-input"
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="log-in-button clickable"
          >Log In</button>
      </form>
      <div
        className="demo-user-link clickable"
        onClick={demoUser}
      >
        Demo User
      </div>
    </div>
  );
}

export default LoginFormModal;
