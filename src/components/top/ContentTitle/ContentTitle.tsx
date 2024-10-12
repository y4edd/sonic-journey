import styles from "./ContentTitle.module.css";

interface ContentTitleProps {
  title: string;
}

const ContentTitle = ({ title }: ContentTitleProps) => {
  return (
    <div className={styles.contentTitle}>
      <h3>{title}</h3>
    </div>
  );
};

export default ContentTitle;
