import styles from "./Logo.module.css"

function Logo({ image }) {
    return (
    <>
        <img className={styles.logo} src={image} alt="Logotipul Jurnalului"/>
    </>
      );
}

export default Logo