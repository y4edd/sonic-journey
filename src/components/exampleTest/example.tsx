import Link from "next/link";
import styles from "./example.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.h1}>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
