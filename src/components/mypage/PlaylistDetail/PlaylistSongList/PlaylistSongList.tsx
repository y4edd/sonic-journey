"use client";

import SongsAudio from "@/components/music/SongsAudio/SongsAudio";
import PlaylistSongButtons from "@/components/mypage/PlaylistDetail/PlaylistSongButtons/PlaylistSongButtons";
import { savePlayHistory } from "@/utils/history";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./PlaylistSongList.module.css";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
};

export const PlaylistSongList = ({
  playlistSongsAudio,
}: {
  playlistSongsAudio: PlaylistSongsAudio[];
}) => {
  // 再生中の楽曲のインデックス
  const [currentIndex, setCurrentIndex] = useState(0);
  // 再生中かどうかstateで管理
  const [isPlaying, setIsPlaying] = useState(false);
  // 再生順を管理
  const [order, setOrder] = useState<number[]>([]);
  // 再レンダリングさせたくないので、useRefでaudio要素を参照
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = playlistSongsAudio[order[currentIndex]];
  const defaultOrder = () => {
    setOrder(
      Array.from({ length: playlistSongsAudio.length }, (_, index) => index)
    );
  };

  // 無限増殖回避のための条件式
  if (order.length === 0 && playlistSongsAudio.length > 0) {
    defaultOrder();
  }

  // 曲を再生
  // start_flagがtrueの時、プレイリストの一曲目から再生を始める。falseの時、currentIndexの曲を再生する
  const handlePlay = async (
    type: "standard" | "continuous" | "interrupted" | "shuffle"
  ) => {
    if (audioRef.current) {
      if (type === "standard") {
        defaultOrder();
        setCurrentIndex(0);
        audioRef.current.currentTime = 0;
      } else if (type === "interrupted") {
        defaultOrder();
      } else if (type === "shuffle") {
        setCurrentIndex(0);
        audioRef.current.currentTime = 0;
      }
      await audioRef.current.play();
      await savePlayHistory(currentSong.id);
      setIsPlaying(true);
    }
  };

  return (
    <>
      {playlistSongsAudio.length > 0 ? (
        <SongsAudio
          playlistSongsAudio={playlistSongsAudio}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          handlePlay={handlePlay}
          currentSong={currentSong}
          order={order}
          setOrder={setOrder}
        />
      ) : null}
      <div className={styles.playlistList}>
        {playlistSongsAudio.length > 0 ? (
          <PlaylistSongButtons
            song={playlistSongsAudio}
            setCurrentIndex={setCurrentIndex}
            setIsPlaying={setIsPlaying}
            audioRef={audioRef}
            handlePlay={handlePlay}
          />
        ) : (
          <>
            <p className={styles.noSongs}>曲を追加しましょう!!</p>
            <div className={styles.link}>
              <Link href="/ranking" className={styles.rankingPageLink}>
                人気楽曲ページへ →
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};
