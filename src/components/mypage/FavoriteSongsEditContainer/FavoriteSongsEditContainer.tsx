"use client";
import type { DeezerSong } from "@/types/deezer";
import { deleteFavoriteSongs } from "@/utils/favoriteSong";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActionButton from "../ActionButton/ActionButton";
import SelectableSongList from "../SelectableSongList/SelectableSongList";
import styles from "./FavoriteSongsEditContainer.module.css";

type FavoriteSongsEditContainerProps = {
  songsInfo: {
    songId: number;
    updatedAt: Date;
    songData: DeezerSong;
  }[];
};

const FavoriteSongsEditContainer = ({ songsInfo }: FavoriteSongsEditContainerProps) => {
  const router = useRouter();
  // 選択されている音楽を管理, 登録解除ボタンのdisabledプロパティを管理
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedSongs((prev) => {
      // isCheckedがtrueのとき楽曲idを追加し、falseのとき除外する
      const newSelectedSongs = isChecked ? [...prev, id] : prev.filter((songId) => songId !== id);

      // 音楽が選択されていないとき、解除ボタンを無効化する
      setButtonDisabled(!newSelectedSongs.length);
      return newSelectedSongs;
    });
  };

  const handleDisableButtonClick = async () => {
    await deleteFavoriteSongs(selectedSongs);
    // router.refresh()後に state を保持したくないので初期値をセットする
    setSelectedSongs([]);
    setButtonDisabled(true);
    router.refresh();
  };

  const songData = songsInfo.map((song) => song.songData);

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <ActionButton name="キャンセル" icon={<CancelIcon />} url="/mypage/favoritesong" />
      </div>
      <SelectableSongList
        songs={songData}
        selectedSongs={selectedSongs}
        onChange={handleCheckboxChange}
        errorMessage="お気に入り曲は登録されていません"
      />
      <div className={styles.removeFavoriteButtonContainer}>
        <button
          type="button"
          className={styles.removeFavoriteButton}
          disabled={isButtonDisabled}
          onClick={handleDisableButtonClick}
        >
          お気に入り登録解除
        </button>
      </div>
    </>
  );
};

export default FavoriteSongsEditContainer;
