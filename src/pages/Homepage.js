import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./scss/homepage.module.scss";

export default function Homepage() {
  return (
    <>
      <Header />
      <div className={styles.homepage}>
        <p>Future homepage</p>
      </div>
      <Footer />
    </>
  );
}
