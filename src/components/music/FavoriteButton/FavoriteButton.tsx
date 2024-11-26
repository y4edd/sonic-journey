"use client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DoneIcon from '@mui/icons-material/Done';
import styles from "./FavoriteButton.module.css";
import { useState } from "react";

const FavoriteButton = ({ id }: { id: number }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  // 初期状態でお気に入り追加済みかどうかを確認し、レンダリング
  

  // お気に入り楽曲追加
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
      setIsFav(true);
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  // お気に入り楽曲削除
  const deleteFavorite = async () => {
    try {
      const response = await fetch("/api/favoriteSongs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songIds: [id],
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        alert(error.message);
        return;
      }

      alert("お気に入り楽曲から削除されました");
      setIsFav(false);
    } catch (error) {
      console.error(error);
      alert("ネットワークエラーです");
    }
  };

  return (
    <>
      {isFav ? (
        <>
          <button type="button" className={styles.songInfoAddedFavorite} onClick={deleteFavorite}>
            <DoneIcon />
            お気に入りに追加済み
          </button>
        </>
      )
        : (
          <>
            <button type="button" className={styles.songInfoAddFavorite} onClick={postFavorite}>
              <FavoriteBorderIcon />
              お気に入りに追加
            </button>
          </>
        )
      }
    </>
  );
};

export default FavoriteButton;
