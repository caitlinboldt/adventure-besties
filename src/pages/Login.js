import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "slices/user/userSlice";
import { cognitoLogin, mainLogin } from "api/login";
import { useNavigate, Link } from "react-router-dom";
import LottieAnimation from "components/LottieAnimation";
import planeLottie from "animations/plane_lottie.json";
import styles from "./scss/login.module.scss";

const initialFormState = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormState);
  const [error, setError] = useState("");

  const clearForm = () => {
    setFormValues(initialFormState);
    setError("");
  };

  const logIn = async (e) => {
    e.preventDefault();
    const cognitoResponse = await cognitoLogin(formValues);
    clearForm();

    if (cognitoResponse.isError) {
      return setError(cognitoResponse.message);
    }

    const loginResponse = await mainLogin(cognitoResponse);
    if (loginResponse.isError) {
      return setError(loginResponse.message);
    }
    dispatch(setUser(loginResponse));
    navigate("/homepage");
  };

  const handleInput = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInnerContainer}>
        <LottieAnimation
          style={styles.lottieHeartbeat}
          animationData={planeLottie}
        />
        <h3>Adventure Besties for life</h3>
        <div className={styles.loginContainer}>
          <div className={styles.innerLoginContainer}>
            <h6>Log in</h6>
            {error && <p className={styles.errorText}>Error: {error}</p>}
            <form>
              <input
                name="email"
                id="sign-in-email"
                type="email"
                value={formValues.email}
                onChange={handleInput}
                placeholder="Email address"
              />
              <input
                name="password"
                id="sign-in-password"
                type="password"
                value={formValues.password}
                onChange={handleInput}
                placeholder="Password"
              />
              <div className={styles.loginButtonContainer}>
                <Link
                  className={styles.forgotPasswordLink}
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
                <button
                  className={styles.brandBlueButton}
                  type="submit"
                  onClick={logIn}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
        <Link className={styles.brandBlueLink} to="/sign-up">
          Want to join Adventure Besties?
        </Link>
      </div>
    </div>
  );
}
