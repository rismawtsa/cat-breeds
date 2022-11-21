import styles from "./error.module.css";
export default function Error({ message }) {
  return message && <div className={styles.error}>{message}</div>;
}
