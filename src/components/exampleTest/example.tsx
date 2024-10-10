import Link from "next/link";
import styles from "./example.module.css";

type Props = {
  text: string;
};
export default function Home({ text }: Props) {
  return (
    <div>
      <h1 className={styles.h1}>Home</h1>
      <Link href="/about">About</Link>
      <p>{text}</p>
    </div>
  );
}
