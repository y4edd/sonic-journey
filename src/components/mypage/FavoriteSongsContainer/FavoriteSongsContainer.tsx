"use client";
import type { DeezerSong } from "@/types/deezer";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ActionButton from "../ActionButton/ActionButton";
import SongList from "../SongList/SongList";
import SortButtons from "../SortButtons/SortButtons";
import styles from "./FavoriteSongsContainer.module.css";

type FavoriteSongsContainerProps = {
  songsInfo: {
    songId: number;
    updatedAt: Date;
    songData: DeezerSong;
  }[];
};

const FavoriteSongsContainer = ({ songsInfo }: FavoriteSongsContainerProps) => {
  // NOTE: 昇順フラグの状態を管理
  const [ascFlag, setAscFlag] = useState(false);

  const descSongData = songsInfo.map((song) => song.songData);

  const ascSongData = songsInfo
    .toSorted((songA, songB) => {
      return songA.updatedAt < songB.updatedAt ? -1 : 1;
    })
    .map((song) => song.songData);

  const songData = ascFlag ? ascSongData : descSongData;

  if (songsInfo.length === 0) {
    return <SongList songs={[]} url="music" errorMessage="お気に入り曲は登録されていません" />;
  }

  return (
    <>
      <SortButtons label="登録日" onSortChange={(flag) => setAscFlag(flag)} />
      <div className={styles.actionButtonContainer}>
        <ActionButton name="編集" icon={<EditIcon />} url="/mypage/favoritesong/edit" />
      </div>
      <SongList songs={songData} url="music" errorMessage="お気に入り曲は登録されていません" />
    </>
  );
};

export default FavoriteSongsContainer;
