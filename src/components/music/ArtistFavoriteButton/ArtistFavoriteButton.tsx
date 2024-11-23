"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./ArtistFavoriteButton.module.css";

const ArtistFavoriteButton = ({ id }: { id: number }) => {
  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favoriteArtists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: id,
        }),
      });

      if (!response.ok) {
        const error = response.json();
        console.error(error);
        alert("お気に入りの登録に失敗しました");
        return;
      }

      alert("お気に入りアーティストに追加されました");
    } catch (error) {
      console.error(error);
      alert("サーバーエラーです");
    }
  };
  return (
    <>
      <div className={styles.artistInfoContent}>
        <button type="button" onClick={postFavorite}>
          <FavoriteBorderIcon />
          お気に入りに追加
        </button>
      </div>
    </>
  );
};

export default ArtistFavoriteButton;
