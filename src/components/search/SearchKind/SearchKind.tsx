import styles from "./SearchKind.module.css";
const SearchKind = () => {
  return (
    <div className={styles.display}>
      {/*FIXME: これから機能作ります */}
      <ul className={styles.kind}>
        <li className={styles.kindList}>シングル</li>
        <li className={styles.kindList}>アルバム</li>
        <li className={styles.kindList}>アーティスト</li>
      </ul>
      <hr />
    </div>
  );
};
export default SearchKind;
