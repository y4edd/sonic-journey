"use client";

import type { DeezerTrackSong } from "@/types/deezer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import styles from "./PlaylistSongButton.module.css";

const PlaylistSongButton = ({
  pickSong,
  index,
}: {
  pickSong: DeezerTrackSong;
  index: number;
}) => {
  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favorite/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songId: pickSong.id,
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
  return (
    <div className={styles.songList}>
      <button type="button" className={styles.playButton}>
        <Image src={pickSong.cover_xl} alt="" height={60} width={60} />
        <p>{pickSong.title}</p>
      </button>
      <button
        type="button"
        onClick={postFavorite}
        className={styles.favoriteButton}
      >
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
