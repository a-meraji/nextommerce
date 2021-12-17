import styles from "../styles/themeToggle.module.css";
import { backToggler } from "../utils/themeClass";

export default function BtnThemeToggle({ toggleTheme, isDark }) {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id="toggle"
        className={styles.toggle__checkbox}
        onClick={() => toggleTheme(!isDark)}
      />
      <label for="toggle" className={styles.toggle__label}>
        <span className={styles.toggle__label_background}></span>
      </label>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: -10,
          width: "100%",
          height: "100%",
          transition: "all 250ms ease-in",
          backgroundColor: backToggler(isDark),
        }}
      ></div>
    </div>
  );
}
