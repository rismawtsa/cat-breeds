import githubIcon from "../assets/github-60.png";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <h2>CatBreeds</h2>
        <a
          href="https://github.com/rismawtsa/cat-breed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="github" />
        </a>
      </nav>
    </header>
  );
}
