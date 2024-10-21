import styles from "./MusicContentTitle.module.css";

const MusicContentTitle = ({ title }: { title: string }) => {
  return <h2 className={styles.contentTitle}>{title}</h2>;
};

export default MusicContentTitle;
