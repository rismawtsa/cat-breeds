import styles from "./arrow.module.css";
import expandArrow from "../assets/icons8-expand-arrow-50.png";
import collapseArrow from "../assets/icons8-collapse-arrow-50.png";

const TYPE = {
  expand: expandArrow,
  collapse: collapseArrow,
};

export default function Arrow({ type }) {
  return <img src={TYPE[type]} alt={type} className={styles.arrow} />;
}
