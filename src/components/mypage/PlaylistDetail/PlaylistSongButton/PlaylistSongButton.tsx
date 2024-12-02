"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import styles from "./PlaylistSongButton.module.css";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
};

const PlaylistSongButton = ({
  song,
  index,
  currentIndex,
  setCurrentIndex,
  setIsPlaying,
  audioRef,
  handlePlay,
}: {
  song: PlaylistSongsAudio;
  index: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  handlePlay: (type: "standard" | "continuous" | "interrupted") => Promise<void>;
}) => {
  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favorite/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songId: song.id,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        alert(error.message);
        return;
      }

      alert("お気に入り楽曲に追加されました");
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  const handleIndexPlay = () => {
    if (audioRef.current) {
      setCurrentIndex(index);
      audioRef.current.currentTime = 0; // 再生時間を0秒に更新
      setIsPlaying(true);
      handlePlay("interrupted");
    }
  };
  return (
    <div className={styles.songList}>
      <button
        type="button"
        onClick={handleIndexPlay}
        className={index === currentIndex ? styles.currentSong : styles.playButton}
      >
        {index === currentIndex ? (
          <Image src={song.img} alt="" height={65} width={65} />
        ) : (
          <Image src={song.img} alt="" height={50} width={50} />
        )}
        <p>{song.title}</p>
      </button>
      <button type="button" onClick={postFavorite} className={styles.favoriteButton}>
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
  );
};

export default PlaylistSongButton;
