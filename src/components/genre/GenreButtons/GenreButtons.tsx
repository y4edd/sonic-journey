"use client";

import { Dispatch, SetStateAction } from "react";
import type { GenreInfo } from "@/types/deezer";
import GenreButton from "../GenreButton/GenreButton";
import styles from "./GenreButtons.module.css";
import useSWR from "swr";

const fetcher = async (key: string) => {
  return await fetch(key).then((res) => res.json());
};
const GenreButtons = ({
  setSelectGenre,
}: {
  setSelectGenre: Dispatch<SetStateAction<number>>;
}) => {
  const { data, error, isLoading } = useSWR<GenreInfo[]>(
    "http://localhost:3000/api/getGenreArtistId",
    fetcher
  );

  if (error) return <div>エラー</div>;
  if (isLoading) return <div>ジャンルの情報を取得中...</div>;
  if (data) {
    return (
      <div className={styles.genreGroup}>
        {data.map((genre: GenreInfo) => {
          return (
            <GenreButton
              genre={genre}
              setSelectGenre={setSelectGenre}
              key={genre.id}
            />
          );
        })}
      </div>
    );
  }
};

export default GenreButtons;
