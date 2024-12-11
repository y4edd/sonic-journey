"use client";

import SongsAudio from "@/components/music/SongsAudio/SongsAudio";
import PlaylistSongButtons from "@/components/mypage/PlaylistDetail/PlaylistSongButtons/PlaylistSongButtons";
import { savePlayHistory } from "@/utils/history";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./PlaylistSongList.module.css";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
  album_id: number;
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
  // 画面下部に表示するプレイリストを管理（シャッフルによる曲順変更に対応するため定義）
  const [playlistSongs, setPlaylistSongs] = useState<PlaylistSongsAudio[]>(playlistSongsAudio);
  // 再レンダリングさせたくないので、useRefでaudio要素を参照
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = playlistSongs[currentIndex];

  // 曲を再生
  // start_flagがtrueの時、プレイリストの一曲目から再生を始める。falseの時、currentIndexの曲を再生する
  const handlePlay = async (type: "standard" | "continuous" | "interrupted") => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (type === "standard") {
        setCurrentIndex(0);
        audioRef.current.currentTime = 0;
      }
      await audioRef.current.play();
      setIsPlaying(true);
    }
    await savePlayHistory(currentSong.id);
  };

  // プレイリストから楽曲が削除されたタイミングで表示プレイリストを更新
  useEffect(() => {
    setPlaylistSongs(playlistSongsAudio);
  }, [playlistSongsAudio]);

  return (
    <>
      {playlistSongs.length > 0 ? (
        <SongsAudio
          playlistSongs={playlistSongs}
          defaultSongs={playlistSongsAudio}
          setPlaylistSongs={setPlaylistSongs}
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
        {playlistSongs.length > 0 ? (
          <PlaylistSongButtons
            song={playlistSongs}
            currentIndex={currentIndex}
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
