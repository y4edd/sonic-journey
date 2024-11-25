import type { SearchAlbum } from "@/types/deezer";
import { getArtistAlbum } from "@/utils/apiFunc";
import React from "react";
import SearchAlbumContent from "../SearchAlbumContent/SearchAlbumContent";
import SearchTotal from "../SearchTotal/SearchTotal";
import styles from "./SearchAlbumResult.module.css";

const SearchAlbumResult = async ({
  freeWord,
  url,
  style,
}: {
  freeWord: string;
  url: string;
  style: string;
}) => {
  //アルバムの検索結果を取得する関数を呼び出し
  const searchAlbum = await getArtistAlbum(freeWord);

  const resultAlbum: SearchAlbum[] = searchAlbum.resultData;
  return (
    <>
      <div>
        <SearchTotal searchTotal={String(resultAlbum.length)} name="アルバム" />
      </div>
      <div className={style === "grid" ? styles.albumGroup : styles.none}>
        {resultAlbum.map((result: SearchAlbum) => {
          return <SearchAlbumContent key={result.id} result={result} url={url} style={style} />;
        })}
      </div>
    </>
  );
};

export default SearchAlbumResult;
