import styles from "./MenuHeader.module.css";

type MenuHeaderProps = {
  title: string;
};

const MenuHeader = ({ title }: MenuHeaderProps) => {
  return (
    <div className={styles.menuHeader}>
      <h3>{title}</h3>
    </div>
  );
};

export default MenuHeader;
