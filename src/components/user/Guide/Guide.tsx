import Link from "next/link";
import { GuideProps } from "@/types/user";
import styles from "./Guide.module.css";

const Guide: React.FC<GuideProps> = ({ href, message }) => {
  return (
    <>
      <div className={styles.login}>
        <p className={styles.text}>
          <Link href={href}>{message}</Link>
        </p>
      </div>
    </>
  );
};

export default Guide;
