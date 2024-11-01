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
      <div className={styles.buttonContainer}>
        {icon}
        <button type="button">{name}</button>
      </div>
    </Link>
  );
};

export default ActionButton;
