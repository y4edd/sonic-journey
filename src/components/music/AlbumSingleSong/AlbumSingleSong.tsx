"use client";

import { useAlbumAudio } from "@/context/AlbumAudioContext";
import { savePlayHistory } from "@/utils/history";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import AlbumSingleSongAudio from "../AlbumSingleSongAudio/AlbumSingleSongAudio";
import styles from "./AlbumSingleSong.module.css";

type AlbumSingleSongProps = {
  id: number;
  num: number;
  title: string;
  preview: string;
};

const AlbumSingleSong = ({ id, num, title, preview }: AlbumSingleSongProps) => {
  // コンテキストからstateを呼び出す
  const { currentlyPlayingId, setCurrentlyPlayingId } = useAlbumAudio();

  // この楽曲が再生中がどうか返す
  const isPlaying = currentlyPlayingId === id;

  // 再生中の楽曲のidをstateに格納
  const handlePlay = async () => {
    setCurrentlyPlayingId(id);
    await savePlayHistory(id);
  };

  // 止めたらstateから削除
  const handlePause = () => {
    setCurrentlyPlayingId(null);
  };

  // 楽曲をナンバリングするための記述
  const displayNum = num.toString().padStart(2, "0");

  // 楽曲をお気に入り登録
  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favoriteSongs", {
        method: "POST",
        body: JSON.stringify({ musicId: id }),
      });
      if (!response.ok) {
        const err = await response.json();
        console.error(err);
        alert(err.message);
        return;
      }
      alert("お気に入りに登録されました");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.albumSingleContent}>
      <AlbumSingleSongAudio
        preview={preview}
        handlePlay={handlePlay}
        handlePause={handlePause}
        isPlaying={isPlaying}
      />
      <div className={styles.albumSingleInfo}>
        <p>
          <Link href={`/music/${id}`}>
            {displayNum}: {title}
          </Link>
        </p>
        <button type="button" onClick={postFavorite}>
          <FavoriteIcon
            sx={{
              fontSize: 16,
              color: "#fc9aff",
              cursor: "pointer",
            }}
            role="img"
            aria-hidden="false"
          />
        </button>
      </div>
    </div>
  );
};

export default AlbumSingleSong;
