"use client";

import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Image from "next/image";
import Link from "next/link";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import styles from "./PlaylistSongButton.module.css";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
  album_id: number;
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
