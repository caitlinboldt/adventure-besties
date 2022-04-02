import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { setUser } from "slices/user/userSlice";
import styles from "./scss/logout.module.scss";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(setUser({}));
        await Auth.signOut();
      } catch (error) {
        console.log("error signing out: ", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div>
        <h3>You have been logged out</h3>
        <div className={styles.loginLinkContainer}>
          <Link className={styles.brandBlueLink} to="/login">
            Go back to login?
          </Link>
        </div>
      </div>
    </div>
  );
}
