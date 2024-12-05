import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./MenuBox.module.css";

type MenuBoxProps = {
  mainTitle: string;
  subTitle?: string;
  icon: ReactNode;
  link: string;
};

const MenuBox = ({ mainTitle, subTitle, icon, link }: MenuBoxProps) => {
  return (
    <Link href={link} className={styles.anchor}>
      <div className={styles.menuBox}>
        <div className={styles.menuIcon}>{icon}</div>
        <p>{mainTitle}</p>
        <p>{subTitle}</p>
      </div>
    </Link>
  );
};

export default MenuBox;
