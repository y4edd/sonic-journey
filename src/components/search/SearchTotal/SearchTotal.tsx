import styles from "./SearchTotal.module.css";

const SearchTotal = ({ searchTotal }: { searchTotal: string }) => {
  return (
    <div className={styles.total}>
      <p>シングル（{searchTotal}件）</p>
    </div>
  );
};

export default SearchTotal;
