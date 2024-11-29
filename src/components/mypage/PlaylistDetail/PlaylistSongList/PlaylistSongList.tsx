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
  // 再レンダリングさせたくないので、useRefでaudio要素を参照
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = playlistSongsAudio[currentIndex];

  // 曲を再生
  // start_flagがtrueの時、プレイリストの一曲目から再生を始める。falseの時、currentIndexの曲を再生する
  const handlePlay = async (start_flag: boolean) => {
    if (audioRef.current) {
      if (start_flag) {
        setCurrentIndex(0);
        await audioRef.current.play();
        setIsPlaying(true);
      }
      await audioRef.current.play();
      setIsPlaying(true);
      await savePlayHistory(currentSong.id);
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
        />
      ) : null}
      <div className={styles.playlistList}>
        {playlistSongsAudio.length > 0 ? (
          <PlaylistSongButtons
            song={playlistSongsAudio}
            setCurrentIndex={setCurrentIndex}
            setIsPlaying={setIsPlaying}
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
