"use client";

import { useAlbumAudio } from "@/context/AlbumAudioContext";
import { fetchUser, getFavoriteSongsForFav } from "@/utils/apiFunc";
import { savePlayHistory } from "@/utils/history";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { useEffect, useState } from "react";
import AlbumSingleSongAudio from "../AlbumSingleSongAudio/AlbumSingleSongAudio";
import styles from "./AlbumSingleSong.module.css";

type AlbumSingleSongProps = {
  id: number;
  num: number;
  title: string;
  preview: string;
};

type FavoriteSongs = {
  resultData: {
    songId: number;
    updatedAt: Date;
  }[];
};

const AlbumSingleSong = ({ id, num, title, preview }: AlbumSingleSongProps) => {
  const [isFav, setIsFav] = useState<boolean>(false);
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

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav = async () => {
    // NOTE: ログイン状態を確認し、userIdを返す
    const userId: string = await fetchUser();
    // NOTE: DBからお気に入り楽曲を取得。
    const favoriteSongs: FavoriteSongs = await getFavoriteSongsForFav(userId);
    const songIds = favoriteSongs.resultData.map((song) => song.songId);

    if (songIds.includes(id)) {
      setIsFav(true);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    doneFav();
  }, []);

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
      setIsFav(true);
    } catch (error) {
      console.error(error);
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
        {isFav ? (
          <>
            <button type="button" onClick={deleteFavorite} className={styles.deleteButton}>
              <DoneIcon
                sx={{
                  fontSize: 16,
                  color: "#a9a9a9",
                  cursor: "pointer",
                }}
                role="img"
                aria-hidden="false"
              />
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={postFavorite} className={styles.postButton}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumSingleSong;
