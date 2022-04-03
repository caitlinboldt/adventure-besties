import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpUser, confirmUserSignUp, resendUserCode } from "api/signUp";
import styles from "./scss/sign-up.module.scss";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  code: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormState);
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [error, setError] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    const signUpResponse = await signUpUser(formValues);
    if (signUpResponse.isError) {
      return setError(signUpResponse.message);
    }
    setWaitingForCode(true);
    setError("");
    setFormValues({ ...formValues, password: "" });
  };

  const confirmSignUp = async (e) => {
    e.preventDefault();
    const confirmResponse = await confirmUserSignUp({
      email: formValues.email,
      code: formValues.code,
    });
    if (confirmResponse.isError) {
      return setError(confirmResponse.message);
    }
    setWaitingForCode(false);
    setError("");
    navigate("/login");
  };

  const resendCode = async (e) => {
    e.preventDefault();
    const codeResponse = await resendUserCode(formValues.email);
    if (codeResponse.isError) {
      return setError(codeResponse.message);
    }
    setError("");
  };

  const handleInput = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.mainContainer}>
      <div>
        <h3>Ready to plan your adventures?</h3>
        <div className={styles.signUpContainer}>
          <div className={styles.innerSignUpContainer}>
            <h6>Sign up for free with Adventure Besties</h6>
            {error && <p className={styles.errorText}>Error: {error}</p>}
            {!waitingForCode && (
              <form>
                <input
                  name="name"
                  id="sign-in-name"
                  value={formValues.name}
                  onChange={handleInput}
                  placeholder="Name"
                />
                <input
                  name="email"
                  id="sign-up-email"
                  type="email"
                  value={formValues.email}
                  onChange={handleInput}
                  placeholder="Email address"
                />
                <input
                  name="password"
                  id="sign-up-password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInput}
                  placeholder="Password"
                />
                <button
                  className={styles.brandBlueButton}
                  type="submit"
                  onClick={signUp}
                >
                  Sign up
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
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.brandBlueButton}
                    type="submit"
                    onClick={confirmSignUp}
                  >
                    Confirm sign up
                  </button>
                  <button
                    className={styles.brandBlueButton}
                    type="button"
                    onClick={resendCode}
                  >
                    Resend code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <Link className={styles.brandBlueLink} to="/login">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
