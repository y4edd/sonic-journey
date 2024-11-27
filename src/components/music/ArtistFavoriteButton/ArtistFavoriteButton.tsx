"use client";

import { fetchUser, getFavoriteArtistsForFav } from "@/utils/apiFunc";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import styles from "./ArtistFavoriteButton.module.css";

type FavoriteArtists = {
  resultData: {
    artistId: number;
    updatedAt: Date;
  }[];
};

const ArtistFavoriteButton = ({ id }: { id: number }) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav = async () => {
    // NOTE: ログイン状態を確認し、userIdを返す
    const userId: string = await fetchUser();
    // NOTE: DBからお気に入りアーティストを取得。
    const favoriteArtists: FavoriteArtists = await getFavoriteArtistsForFav(userId);
    const ArtistIds = favoriteArtists.resultData.map((artist) => artist.artistId);

    if (ArtistIds.includes(id)) {
      setIsFav(true);
    }
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    doneFav();
  }, []);

  const postFavorite = async () => {
    try {
      const response = await fetch("/api/favorite/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        alert(error.message);
        return;
      }

      alert("お気に入りアーティストに追加されました");
      setIsFav(true);
    } catch (error) {
      console.error(error);
      alert("サーバーエラーです");
    }
  };

  // FIXME:お気に入りアーティスト削除(API実装後、エンドポイント変更(2024/11/27))
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
      alert("お気に入りアーティストから削除されました");
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
          <button type="button" className={styles.artistInfoAddedFavorite} onClick={deleteFavorite}>
            <DoneIcon />
            お気に入りに追加済み
          </button>
        </>
      ) : (
        <>
          <button type="button" className={styles.artistInfoAddFavorite} onClick={postFavorite}>
            <FavoriteBorderIcon />
            お気に入りに追加
          </button>
        </>
      )}
    </>
  );
};

export default ArtistFavoriteButton;
