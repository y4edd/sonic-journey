import styles from "./SpecialTitles.module.css";
import type { SpecialOverView } from "@/types/deezer";

export const SpecialTitles = ({
  specialOverView,
}: {
  specialOverView: SpecialOverView;
}) => {
  return (
    <>
      <div className={styles.titles}>
        <p className={styles.headerTitle}>{specialOverView.title}</p>
        <p className={styles.headerDescription}>
          {specialOverView.description}
        </p>
      </div>
    </>
  );
};
