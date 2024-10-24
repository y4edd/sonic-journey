import Link from "next/link";
import styles from "./LinkButton.module.css";

const LinkButton = ({ label, url }: { label: string; url: string }) => {
  return (
    // FIXME: 結果ページが実装出来次第、リンクを設定する
    <Link href={url}>
      <button type="button" className={styles.linkButton}>
        {label}
      </button>
    </Link>
  );
};

export default LinkButton;
