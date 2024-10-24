"use client";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useRef, useState } from "react";

const AlbumSingleSongAudio = ({ preview }: { preview: string }) => {
  // 再生中かどうかstateで管理
  const [isPlaying, setIsPlaying] = useState(false);

  // 再レンダリングさせたくないので、useRefでaudio要素を参照
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 曲を再生
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 曲を一時停止
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio src={preview} ref={audioRef} />
      <div>
        {preview ? (
          <>
            <PlayCircleIcon
              onClick={handlePlay}
              sx={{
                fontSize: 32,
                color: !isPlaying ? "#77ffcc" : "#9a9a9a",
                cursor: "pointer",
              }}
              style={{ pointerEvents: isPlaying ? "none" : "auto" }}
            />
            <StopCircleIcon
              onClick={handlePause}
              sx={{
                fontSize: 32,
                color: isPlaying ? "#77ffcc" : "#9a9a9a",
                cursor: "pointer",
              }}
              style={{ pointerEvents: isPlaying ? "auto" : "none" }}
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
