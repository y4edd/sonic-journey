"use client";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import styles from "./SongsAudio.module.css";

type PlaylistAudioProps = {
  preview?: string;
  id: number;
  title: string;
  img: string;
};

const SongAudio = ({
  playlistSongsAudio,
  currentIndex,
  setCurrentIndex,
  isPlaying,
  setIsPlaying,
  audioRef,
  handlePlay,
  currentSong,
  order,
  setOrder,
}: {
  playlistSongsAudio: PlaylistAudioProps[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  handlePlay: (
    type: "standard" | "continuous" | "interrupted" | "shuffle"
  ) => Promise<void>;
  currentSong: PlaylistAudioProps;
  order: number[];
  setOrder: Dispatch<SetStateAction<number[]>>;
}) => {
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

  // シャッフル再生の処理
  const handleShuffle = async () => {
    if (audioRef.current) {
      setOrder((prevOrder) => [...prevOrder].sort(() => Math.random() - 0.5));
      await handlePlay("shuffle");
    }
  };

  // 前曲アイコン　1曲目の時は0秒へ。以降の曲で、曲開始から4秒以上経過した時は0秒へ。経過時間が3秒以内であれば前曲へ。
  const handlePrePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime > 3 || currentIndex === 0) {
        audioRef.current.currentTime = 0;
      } else {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  // 次曲アイコン　最終曲の時は1曲目へ返り再生停止。それ以前の曲は次の曲へスキップ
  const handleNextPlay = () => {
    if (audioRef.current) {
      if (currentIndex !== playlistSongsAudio.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsPlaying(false);
        setCurrentIndex(0);
      }
    }
  };

  // 一曲の再生終了に伴ってcurrentIndexが変わった時に、曲再生を始める
  // biome-ignore lint/correctness/useExhaustiveDependencies: 再生対象の楽曲が移った際にのみ楽曲の再生を行わせるため
  useEffect(() => {
    const nextPlaying = async () => {
      if (audioRef.current && isPlaying) {
        await handlePlay("continuous");
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
            onClick={() => handlePlay("standard")}
            className={styles.playButton}
          >
            ▶ &nbsp;再生
          </button>
          <button
            type="button"
            onClick={handleShuffle}
            className={styles.playButton}
          >
            <ShuffleIcon /> &nbsp;シャッフル
          </button>
        </div>
        <div className={styles.songIntro}>
          <Image
            src={playlistSongsAudio[order[currentIndex]].img}
            alt={`${playlistSongsAudio[order[currentIndex]].title}のジャケット`}
            height={60}
            width={60}
          />
          <p className={styles.currentTitle}>
            {playlistSongsAudio[order[currentIndex]].title}
          </p>

          <div className={styles.controls}>
            <button
              type="button"
              onClick={handlePrePlay}
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
              onClick={handleNextPlay}
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
