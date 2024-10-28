"use client";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useEffect, useRef } from "react";

type AlbumSingleSongAudioProps = {
  preview: string;
  handlePlay: () => void;
  handlePause: () => void;
  isPlaying: boolean;
};

const AlbumSingleSongAudio = ({
  preview,
  handlePlay,
  handlePause,
  isPlaying,
}: AlbumSingleSongAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 再生状態に応じてオーディオを再生、停止
  useEffect(() => {
    // オーディオが存在しているか
    if (!audioRef.current) {
      return;
    }
    // 現在の楽曲が再生中ならtrue
    if (isPlaying) {
      // オーディオ再生
      audioRef.current.play();
    } else {
      // オーディオを停止し再生位置リセット
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  // 停止時にコンテキストの値をリセット
  const handleEnded = () => {
    handlePause();
  };

  return (
    <>
      <audio src={preview} ref={audioRef} onEnded={handleEnded} />
      <div>
        {preview ? (
          <>
            <PlayCircleIcon
              onClick={() => handlePlay()}
              sx={{
                fontSize: 32,
                color: !isPlaying ? "#77ffcc" : "#9a9a9a",
                cursor: "pointer",
              }}
              style={{ pointerEvents: isPlaying ? "none" : "auto" }}
              aria-label="playButton"
            />
            <StopCircleIcon
              onClick={() => handlePause()}
              sx={{
                fontSize: 32,
                color: isPlaying ? "#77ffcc" : "#9a9a9a",
                cursor: "pointer",
              }}
              style={{ pointerEvents: isPlaying ? "auto" : "none" }}
              aria-label="stopButton"
            />
          </>
        ) : (
          <p>プレビューが読み込めません</p>
        )}
      </div>
    </>
  );
};

export default AlbumSingleSongAudio;
