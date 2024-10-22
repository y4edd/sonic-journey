"use client";

import { useSearchParams } from "next/navigation";
import styles from "./SearchValue.module.css";

const SearchValue = () => {
  // クエリパラメータを取得
  const Params = useSearchParams();
  const search = Params.get("q");
  return (
    <div className={styles.searchValue}>
      <h2>「{search}」の検索結果</h2>
    </div>
  );
};

export default SearchValue;
