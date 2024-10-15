import type { ReactNode } from "react";
import styles from "./MenuBox.module.css";

type MenuBoxProps = {
  mainTitle: string;
  subTitle?: string;
  icon: ReactNode;
};

const MenuBox = ({ mainTitle, subTitle, icon }: MenuBoxProps) => {
  return (
    <div className={styles.menuBox}>
      <div className={styles.menuIcon}>{icon}</div>
      <p>{mainTitle}</p>
      <p>{subTitle}</p>
    </div>
  );
};

export default MenuBox;
