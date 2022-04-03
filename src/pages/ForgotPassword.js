import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordUserCode, newPasswordSubmit } from "api/forgotPassword";
import styles from "./scss/forgot-password.module.scss";

const initialFormState = {
  email: "",
  password: "",
  code: "",
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormState);
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async (e) => {
    e.preventDefault();
    const codeResponse = await forgotPasswordUserCode({
      email: formValues.email,
    });
    if (codeResponse.isError) {
      return setError(codeResponse.message);
    }
    setError("");
    setWaitingForCode(true);
  };

  const confirmNewPassword = async (e) => {
    e.preventDefault();
    const newPasswordResponse = await newPasswordSubmit(formValues);
    if (newPasswordResponse.isError) {
      return setError(newPasswordResponse.message);
    }
    setError("");
    navigate("/login");
  };

  const handleInput = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.mainContainer}>
      <div>
        <h3>Forgot password</h3>
        <div className={styles.forgotPasswordContainer}>
          <div className={styles.innerForgotPasswordContainer}>
            <h6>Receive a code to reset your password</h6>
            {error && <p className={styles.errorText}>Error: {error}</p>}
            {!waitingForCode && (
              <form>
                <input
                  name="email"
                  id="sign-in-email"
                  type="email"
                  value={formValues.email}
                  onChange={handleInput}
                  placeholder="Email"
                />
                <button
                  className={styles.brandBlueButton}
                  type="submit"
                  onClick={sendCode}
                >
                  Send Code
                </button>
              </form>
            )}
            {waitingForCode && (
              <form>
                <input
                  name="code"
                  id="sign-up-code"
                  type="text"
                  value={formValues.code}
                  onChange={handleInput}
                  placeholder="Code"
                />
                <input
                  name="password"
                  id="sign-in-password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInput}
                  placeholder="New password"
                />
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.brandBlueButton}
                    type="submit"
                    onClick={confirmNewPassword}
                  >
                    Confirm New Password
                  </button>
                  <button
                    className={styles.brandBlueButton}
                    type="button"
                    onClick={sendCode}
                  >
                    Resend code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <Link className={styles.brandBlueLink} to="/login">
          Go back to login?
        </Link>
      </div>
    </div>
  );
}
