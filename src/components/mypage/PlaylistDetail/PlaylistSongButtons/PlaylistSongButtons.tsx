"use client";

import { AlbumAudioProvider } from "@/context/AlbumAudioContext";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import PlaylistSongButton from "../PlaylistSongButton/PlaylistSongButton";
import styles from "./PlaylistSongButtons.module.css";

type PlaylistSongsAudio = {
  preview?: string;
  id: number;
  title: string;
  img: string;
};

const PlaylistSongButtons = ({
  song,
  setCurrentIndex,
  setIsPlaying,
  audioRef,
  handlePlay,
}: {
  song: PlaylistSongsAudio[];
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  handlePlay: (
    type: "standard" | "continuous" | "interrupted" | "shuffle"
  ) => Promise<void>;
}) => {
  return (
    <AlbumAudioProvider>
      <div className={styles.albumSinglesContent}>
        {song.map((song: PlaylistSongsAudio, index: number) => {
          return (
            <div key={song.id} className={styles.albumSingleSong}>
              <PlaylistSongButton
                song={song}
                index={index}
                setCurrentIndex={setCurrentIndex}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                handlePlay={handlePlay}
              />
            </div>
          );
        })}
      </div>
    </AlbumAudioProvider>
  );
};

export default PlaylistSongButtons;
