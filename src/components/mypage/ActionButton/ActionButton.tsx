import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  name: string;
  icon: ReactNode;
  url: string;
};

const ActionButton = ({ name, icon, url }: ActionButtonProps) => {
  return (
    <Link href={url}>
      <button type="button" tabIndex={-1} className={styles.buttonContainer}>
        <span className={styles.buttonIcon}>{icon}</span>
        {name}
      </button>
    </Link>
  );
};

export default ActionButton;
