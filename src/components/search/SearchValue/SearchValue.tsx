import styles from "./SearchValue.module.css";

const SearchValue = ({ freeWord }: { freeWord: string }) => {
  return (
    <div className={styles.searchValue}>
      <h2>「{freeWord}」の検索結果</h2>
    </div>
  );
};

export default SearchValue;
