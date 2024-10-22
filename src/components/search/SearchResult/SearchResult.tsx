"use client";

import type { Result } from "@/types/deezer";
import { useEffect, useState } from "react";
import SearchContent from "../SearchContent/SearchContent";
import styles from "./SearchResult.module.css";

const SearchResult = () => {
  // 検索結果をステートで管理
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // セッションストレージのデータを取得
    const searchedResults = sessionStorage.getItem("searchResults");

    if (searchedResults) {
      setResults(JSON.parse(searchedResults));
    }
  }, []);
  return (
    <div className={styles.SongGroup}>
      {results.map((result) => {
        return <SearchContent key={result.id} result={result} />;
      })}
    </div>
  );
};

export default SearchResult;
