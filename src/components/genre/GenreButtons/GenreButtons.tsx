"use client";

import type { GenreInfo } from "@/types/deezer";
import type { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import GenreButton from "../GenreButton/GenreButton";
import styles from "./GenreButtons.module.css";

const fetcher = async (key: string) => {
  return await fetch(key).then((res) => res.json());
};
const GenreButtons = ({
  selectGenre,
  setSelectGenre,
}: {
  selectGenre: number;
  setSelectGenre: Dispatch<SetStateAction<number>>;
}) => {
  const { data, error, isLoading } = useSWR<GenreInfo[]>(
    "http://localhost:3000/api/getGenreArtistId",
    fetcher,
  );

  if (error) return <div>エラー</div>;
  if (isLoading) return <div>ジャンルの情報を取得中...</div>;
  if (data) {
    const selectGenreInfoArr: GenreInfo[] = data.filter((data) => data.id === selectGenre);
    const selectGenreInfo = selectGenreInfoArr[0];
    return (
      <div className={styles.genreWrapper}>
        <div className={styles.genreGroup}>
          {data.map((genre: GenreInfo) => {
            return (
              <GenreButton
                genre={genre}
                selectGenre={selectGenre}
                setSelectGenre={setSelectGenre}
                key={genre.id}
              />
            );
          })}
        </div>
        <div
          className={selectGenreInfo.id !== 0 ? styles.genreTitle : styles.allGenreTitle}
          style={{
            backgroundImage: `url(${selectGenreInfo.picture})`,
          }}
        >
          <p className={styles.firstTitleLine}>「{selectGenreInfo.name}」ジャンル</p>

          <p>のアーティスト</p>
        </div>
      </div>
    );
  }
};

export default GenreButtons;
