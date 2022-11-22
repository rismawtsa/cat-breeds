import styles from "./noData.module.css";

export default function NoData({ isShow = true, message }) {
  if (!isShow) return;
  return <div className={styles.noData}>{message || "--- No Data ---"}</div>;
}
