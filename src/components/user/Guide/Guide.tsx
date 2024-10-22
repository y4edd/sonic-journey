import type { GuideProps } from "@/types/user";
import Link from "next/link";
import styles from "./Guide.module.css";

const Guide: React.FC<GuideProps> = ({ text, href, message }) => {
  return (
    <>
      <div className={styles.login}>
        <p>
          {text}
          <Link href={href} className={styles.message}>
            {message}
          </Link>
        </p>
      </div>
    </>
  );
};

export default Guide;
