"use client";
import type { DeezerSong } from "@/types/deezer";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useMemo, useState } from "react";
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
  // NOTE: 降順の楽曲データをキャッシュ
  const descSongData = useMemo(() => songsInfo.map((song) => song.songData), [songsInfo]);

  // NOTE: 昇順の楽曲データをキャッシュ
  const ascSongData = useMemo(() => {
    return songsInfo
      .toSorted((a, b) => {
        return a.updatedAt < b.updatedAt ? -1 : 1;
      })
      .map((song) => song.songData);
  }, [songsInfo]);

  // NOTE: useStateで昇順、降順の状態を管理
  const [ascFlag, setAscFlag] = useState(false);
  const [songData, setSongData] = useState(descSongData);

  // NOTE: useEffectでascFlagが変化したときにsongDataを更新
  useEffect(() => {
    if (ascFlag) {
      setSongData(ascSongData);
    } else {
      setSongData(descSongData);
    }
  }, [ascFlag, ascSongData, descSongData]);

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
