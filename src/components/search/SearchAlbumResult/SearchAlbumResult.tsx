import type { ArtistAlbum } from "@/types/deezer";
import { getSearchAlbum } from "@/utils/apiFunc";
import React from "react";
import SearchAlbumContent from "../SearchAlbumContent/SearchAlbumContent";
import SearchTotal from "../SearchTotal/SearchTotal";
import styles from "./SearchAlbumResult.module.css";

const SearchAlbumResult = async ({
  freeWord,
  url,
}: {
  freeWord: string;
  url: string;
}) => {
  //アルバムの検索結果を取得する関数を呼び出し
  const searchAlbum = await getSearchAlbum(freeWord);

  const resultAlbum: ArtistAlbum[] = searchAlbum.resultData;
  return (
    <>
      <div>
        <SearchTotal searchTotal={String(resultAlbum.length)} name="アルバム" />
      </div>
      <div className={styles.albumGroup}>
        {resultAlbum.map((result: ArtistAlbum) => {
          return <SearchAlbumContent key={result.id} result={result} url={url} />;
        })}
      </div>
    </>
  );
};

export default SearchAlbumResult;
