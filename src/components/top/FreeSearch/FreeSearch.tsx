"use client";

import { useFreeWordSearch } from "@/hooks/top/useFreeWordSearch";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./FreeSearch.module.css";

// フリーワード検索コンポーネント
const FreeSearch = () => {
  // フリーワード検索のためのカスタムフック
  const { handleForm, handleChange, error, freeWord } = useFreeWordSearch();

  return (
    <>
      <form onSubmit={handleForm} className={styles.freeSearch}>
        <input
          type="text"
          name="freeWord"
          value={freeWord}
          onChange={handleChange}
          placeholder="アーティスト・アルバム・楽曲で検索"
        />
        <button type="submit">
          <SearchIcon className={styles.searchIcon} />
        </button>
      </form>
      <p className={styles.errorMessage}>{error}</p>
    </>
  );
};

export default FreeSearch;
