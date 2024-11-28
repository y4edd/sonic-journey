"use client";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Image from "next/image";
import { useEffect } from "react";
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
}: {
  playlistSongsAudio: PlaylistAudioProps[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  handlePlay: (start_flag: boolean) => Promise<void>;
  currentSong: PlaylistAudioProps;
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

  // 一曲の再生終了に伴ってcurrentIndexが変わった時に、曲再生を始める
  // biome-ignore lint/correctness/useExhaustiveDependencies: 再生対象の楽曲が移った際にのみ楽曲の再生を行わせるため
  useEffect(() => {
    const nextPlaying = async () => {
      if (audioRef.current && isPlaying) {
        await handlePlay(false);
      }
    };
    nextPlaying();
  }, [currentIndex]);

  return (
    <div>
      <>
        <audio src={currentSong.preview} ref={audioRef} onEnded={handleEnded} />
        <div className={styles.playButtons}>
          <button type="button" onClick={() => handlePlay(true)} className={styles.playButton}>
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
          <p className={styles.currentTitle}>{playlistSongsAudio[currentIndex].title}</p>

          <div className={styles.controls}>
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
              className={styles.preButton}
            >
              <SkipPreviousIcon className={styles.preButtonIcon} />
            </button>
            <button type="button" onClick={handlePause} className={styles.switchButton}>
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
