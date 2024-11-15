"use client";

import { savePlayHistory } from "@/utils/history";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Slider from "@mui/material/Slider";
import { useEffect, useRef, useState } from "react";
import styles from "./SongAudio.module.css";

const SongAudio = ({ preview, id }: { preview?: string; id: number }) => {
  // 再生中かどうかstateで管理
  const [isPlaying, setIsPlaying] = useState(false);
  // 再レンダリングさせたくないので、useRefでaudio要素を参照
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // 現在の再生時間
  const [currentTime, setCurrentTime] = useState(0);
  // 曲の総再生時間
  const [duration, setDuration] = useState(30);

  // スライダー動作に関わる処理全て
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 再生中の時間を更新
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      // 曲の再生時間を取得
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      // アンマウント時に削除
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  // 曲の再生位置を変更
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (audioRef.current && typeof newValue === "number") {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  // 曲を再生
  const handlePlay = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      setIsPlaying(true);
      await savePlayHistory(id);
    }
  };

  // 曲を一時停止
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 再生終了後
  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      {preview ? (
        <>
          <audio src={preview} ref={audioRef} onEnded={handleEnded} />
          <div>
            <PlayCircleIcon
              sx={{
                fontSize: 32,
                color: isPlaying ? "#9a9a9a" : "#77ffcc",
                cursor: "pointer",
              }}
              onClick={handlePlay}
              style={{ pointerEvents: isPlaying ? "none" : "auto" }}
            />
            <StopCircleIcon
              sx={{
                fontSize: 32,
                color: isPlaying ? "#77ffcc" : "#9a9a9a",
                cursor: "pointer",
              }}
              onClick={handlePause}
              style={{ pointerEvents: isPlaying ? "auto" : "none" }}
            />
          </div>
          <div className={styles.sliderContent}>
            <MusicNoteIcon sx={{ color: "#77ffcc" }} />
            <Slider
              value={currentTime}
              max={duration}
              onChange={handleSliderChange}
              sx={{ color: "#77ffcc" }}
            />
          </div>
        </>
      ) : (
        <p className={styles.errorMessage}>プレビューが読み込めませんでした。</p>
      )}
    </div>
  );
};

export default SongAudio;
