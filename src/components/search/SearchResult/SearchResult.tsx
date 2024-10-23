import type { Result } from "@/types/deezer";
import { getSearchSongs } from "@/utils/apiFunc";
import SearchContent from "../SearchContent/SearchContent";
import styles from "./SearchResult.module.css";

const SearchResult = async ({ freeWord }: { freeWord: string }) => {
  //関数を使用して検索結果を取得
  const res = await getSearchSongs(freeWord);

  const results: Result[] = res.resultData;

  return (
    <div className={styles.SongGroup}>
      {results.map((result) => {
        return <SearchContent key={result.id} result={result} />;
      })}
    </div>
  );
};

export default SearchResult;
