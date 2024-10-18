import styles from "./ChartTitle.module.css";

export const ChartTitle = ({ title }: { title: string }) => {
  return <div className={styles.titleWrapper}>{title}</div>;
};
