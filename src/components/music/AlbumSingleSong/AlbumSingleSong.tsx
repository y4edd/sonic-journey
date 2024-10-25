"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import AlbumSingleSongAudio from "../AlbumSingleSongAudio/AlbumSingleSongAudio";
import styles from "./AlbumSingleSong.module.css";
import { useAlbumAudio } from "@/context/AlbumAudioContext";

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
  const handlePlay = () => {
    setCurrentlyPlayingId(id);
  };

  // 止めたらstateから削除
  const handlePause = () => {
    setCurrentlyPlayingId(null);
  };

  // 楽曲をナンバリングするための記述
  const displayNum = num.toString().padStart(2, "0");

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
        <button type="button">
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
