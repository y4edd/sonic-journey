"use client";

import { useSearchParams } from "next/navigation";
import styles from "./SearchTotal.module.css";

const SearchTotal = () => {
  // クエリパラメータを取得
  const Params = useSearchParams();
  const search = Params.get("n");
  return (
    <div className={styles.total}>
      <p>シングル（{search}件）</p>
    </div>
  );
};

export default SearchTotal;
