import Link from "next/link";
import styles from "./LinkButton.module.css";

const LinkButton = ({ label, url }: { label: string; url: string }) => {
  return (
    <Link href={url}>
      <button type="button" className={styles.linkButton}>
        {label}
      </button>
    </Link>
  );
};

export default LinkButton;
