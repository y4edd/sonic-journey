"use client";

import { savePlayHistory } from "@/utils/history";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./SongsAudio.module.css";

type PlaylistAudioProps = {
  playlistSongsAudio: {
    preview?: string;
    id: number;
    title: string;
    img: string;
  }[];
};

const SongAudio = ({ playlistSongsAudio }: PlaylistAudioProps) => {
  // 再生中の楽曲のインデックス
  const [currentIndex, setCurrentIndex] = useState(0);
  // 再生中かどうかstateで管理
  const [isPlaying, setIsPlaying] = useState(false);
  // 再レンダリングさせたくないので、useRefでaudio要素を参照
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = playlistSongsAudio[currentIndex];

  // 曲を再生
  const handlePlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      setIsPlaying(true);
      await savePlayHistory(currentSong.id);
    }
  };

  // 曲を一時停止
  const handlePause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // 再生終了後
  const handleEnded = () => {
    if (currentIndex < playlistSongsAudio.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsPlaying(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const nextPlaying = async () => {
      if (audioRef.current && isPlaying) {
        await handlePlay();
      }
    };
    nextPlaying();
  }, [currentIndex]);

  return (
    <div>
      <>
        <audio src={currentSong.preview} ref={audioRef} onEnded={handleEnded} />
        <div className={styles.playButtons}>
          <button
            type="button"
            onClick={handlePlay}
            className={styles.playButton}
          >
            ▶ &nbsp;再生
          </button>
        </div>
        <div className={styles.songIntro}>
          <Image
            src={playlistSongsAudio[currentIndex].img}
            alt={`${playlistSongsAudio[currentIndex].title}のジャケット`}
            height={50}
            width={50}
          />
          <p className={styles.currentTitle}>
            {playlistSongsAudio[currentIndex].title}
          </p>

          <div className={styles.controls}>
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
              className={styles.preButton}
            >
              <SkipPreviousIcon className={styles.preButtonIcon} />
            </button>
            <button
              type="button"
              onClick={handlePause}
              className={styles.switchButton}
            >
              {isPlaying ? (
                <PauseIcon className={styles.switchButtonIcon} />
              ) : (
                <PlayArrowIcon className={styles.switchButtonIcon} />
              )}
            </button>
            <button
              type="button"
              disabled={currentIndex === playlistSongsAudio.length - 1}
              onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
              className={styles.nextButton}
            >
              <SkipNextIcon className={styles.nextButtonIcon} />
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default SongAudio;
