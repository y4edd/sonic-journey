import styles from "./SearchTotal.module.css";

const SearchTotal = ({
  searchTotal,
  name,
}: {
  searchTotal: string;
  name: string;
}) => {
  return (
    <div className={styles.total}>
      <p>
        {name}({searchTotal}件)
      </p>
    </div>
  );
};

export default SearchTotal;
