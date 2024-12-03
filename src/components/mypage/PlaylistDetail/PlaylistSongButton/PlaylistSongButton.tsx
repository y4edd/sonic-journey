"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DoneIcon from "@mui/icons-material/Done";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Image from "next/image";
import Link from "next/link";
import { fetchUser, getFavoriteSongsForFav } from "@/utils/apiFunc";
import { useState, useEffect } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import styles from "./PlaylistSongButton.module.css";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
  album_id: number;
};

type FavoriteSongs = {
  resultData: {
    songId: number;
    updatedAt: Date;
  }[];
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
  handlePlay: (
    type: "standard" | "continuous" | "interrupted"
  ) => Promise<void>;
}) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  // NOTE: DBから取得したお気に入り楽曲とidを比較し、お気に入りボタンの表示を変える
  const doneFav = async () => {
    // NOTE: ログイン状態を確認し、userIdを返す
    const userId: string = await fetchUser();
    // NOTE: DBからお気に入り楽曲を取得。
    const favoriteSongs: FavoriteSongs = await getFavoriteSongsForFav(userId);
    const songIds = favoriteSongs.resultData.map((song) => song.songId);
    // NOTE: もしfavoriteSongsのなかのsongIdとidに、一致するものがあればisFavをtrueにする
    if (songIds.includes(song.id)) {
      setIsFav(true);
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
          songIds: [song.id],
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
        className={
          index === currentIndex ? styles.currentSong : styles.playButton
        }
      >
        {index === currentIndex ? (
          <Image src={song.img} alt="" height={60} width={60} />
        ) : (
          <Image src={song.img} alt="" height={50} width={50} />
        )}
        <p>{song.title}</p>
      </button>
      <Link href={`/album/${song.album_id}`} className={styles.albumLink}>
        <LibraryMusicIcon />
      </Link>
    </div>
  );
};

export default PlaylistSongButton;
