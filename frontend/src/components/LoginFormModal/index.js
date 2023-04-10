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

    const demoUser = () => {
      setCredential("demoUser");
      setPassword("password");
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
    }

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="credential-input">
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="password-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errors.message && (
          <p>{errors.message}</p>
        )}
        <button
          type="submit"
          >Log In</button>
      </form>
      <div
        className="demo-user-link clickable"
        onClick={() => demoUser()}
      >
        Demo User
      </div>
    </div>
  );
}

export default LoginFormModal;
