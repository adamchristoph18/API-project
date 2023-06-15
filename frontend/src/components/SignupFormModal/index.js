import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1 className="sign-up-title">Sign Up</h1>
      <form
        className="sign-up-form"
        onSubmit={handleSubmit}
      >
      <label>
          <input
            type="text"
            className="sign-up-input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        {errors.firstName && <p className="sign-up-errors">{errors.firstName}</p>}
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            className="sign-up-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
        {errors.lastName && <p className="sign-up-errors">{errors.lastName}</p>}
        </label>
        <label>
          <input
            type="text"
            placeholder="Email"
            className="sign-up-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>
          {errors.email && <p className="sign-up-errors">{errors.email}</p>}
        <label>
          <input
            type="text"
            placeholder="Username"
            className="sign-up-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p className="sign-up-errors">{errors.username}</p>}
        <label>
          <input
            type="password"
            placeholder="Password"
            className="sign-up-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p className="sign-up-errors">{errors.password}</p>}
        <label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="sign-up-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && (
          <p className="sign-up-errors">{errors.confirmPassword}</p>
        )}
        <button
          type="submit"
          className="submit-button-sign-up clickable"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
