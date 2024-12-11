import type { Result } from "@/types/deezer";
import { getSearchSongs } from "@/utils/apiFunc";
import SearchContent from "../SearchContent/SearchContent";
import SearchTotal from "../SearchTotal/SearchTotal";
import styles from "./SearchResult.module.css";

const SearchResult = async ({
  freeWord,
  url,
  searchTotal,
  style,
}: {
  freeWord: string;
  url: string;
  searchTotal: string;
  style: string;
}) => {
  //関数を使用して検索結果を取得
  const res = await getSearchSongs(freeWord);
  const results: Result[] = res.resultData;

  return (
    <>
      <div>
        <SearchTotal searchTotal={searchTotal} name="シングル" />
      </div>
      <div className={style === "grid" ? styles.songGroup : styles.none}>
        {results.map((result) => {
          return <SearchContent key={result.id} result={result} url={url} style={style} />;
        })}
      </div>
    </>
  );
};

export default SearchResult;
