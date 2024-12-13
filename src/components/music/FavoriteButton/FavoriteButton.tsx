"use client";

import { fetchUser, getFavoriteSongsForFav } from "@/utils/apiFunc";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import styles from "./FavoriteButton.module.css";

type FavoriteSongs = {
  resultData: {
    songId: number;
    updatedAt: Date;
  }[];
};

type UserId = {
  id: string;
};

const FavoriteButton = ({ id }: { id: number }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav = async () => {
    // NOTE: ログイン状態を確認し、userIdを返す
    const userId:UserId = await fetchUser();
    try{
      if(typeof userId.id === "string") {
        // NOTE: DBからお気に入り楽曲を取得。
        const favoriteSongs: FavoriteSongs = await getFavoriteSongsForFav(userId.id);
        const songIds = favoriteSongs.resultData.map((song) => song.songId);
        // NOTE: もしfavoriteSongsのなかのsongIdとidに、一致するものがあればisFavをtrueにする
        if (songIds.includes(id)) {
          setIsFav(true);
        }
      }
    }catch(err){
      console.error(err);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    doneFav();
  }, []);

  // お気に入り楽曲追加
  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favorite/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songId: id,
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
      const response = await fetch("/api/favorite/songs", {
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
      ) : (
        <>
          <button type="button" className={styles.songInfoAddFavorite} onClick={postFavorite}>
            <FavoriteBorderIcon />
            お気に入りに追加
          </button>
        </>
      )}
    </>
  );
};

export default FavoriteButton;
