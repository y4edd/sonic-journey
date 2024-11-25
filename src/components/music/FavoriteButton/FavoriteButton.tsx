"use client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({ id }: { id: number }) => {
  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favoriteSongs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          musicId: id,
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
    <>
      <button type="button" className={styles.songInfoAddFavorite} onClick={postFavorite}>
        <FavoriteBorderIcon />
        お気に入りに追加
      </button>
    </>
  );
};

export default FavoriteButton;
