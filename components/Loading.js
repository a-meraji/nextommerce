import styles from "../shared/styles/loading.module.css";

export default function Loading({loading}) {
  return (
    <div
    style={{zIndex:loading?"100":"-100", display:loading?"block":"none"}}
      className={styles.loading}
    >
        <div>

      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          strokeWidth="1"
          stroke="#fff"
          fill="none"
          points="20,1 40,40 1,40"
          ></polygon>
      </svg>
          </div>
    </div>
  );
}
