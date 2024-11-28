"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
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
  setCurrentIndex,
  setIsPlaying,
  handlePlay,
}: {
  song: PlaylistSongsAudio;
  index: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  handlePlay: (start_flag: boolean) => Promise<void>;
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
    setCurrentIndex(index);
    setIsPlaying(true);
    handlePlay(false);
  };
  return (
    <div className={styles.songList}>
      <button type="button" onClick={handleIndexPlay} className={styles.playButton}>
        <Image src={song.img} alt="" height={60} width={60} />
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
