import styles from "./skeleton.module.css";

export default function Skeleton({ isLoading, count, style }) {
  if (!isLoading) return;

  let elements = [];
  for (let i = 1; i <= count; i++) {
    elements.push(
      <div key={i} className={styles.skeletonWrapper} style={style}>
        <div className={styles.skeletonImg}></div>
        <div className={styles.skeletonText}>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return elements;
}
