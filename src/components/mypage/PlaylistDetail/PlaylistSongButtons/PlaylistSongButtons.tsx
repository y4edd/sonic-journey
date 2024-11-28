"use client";

import { AlbumAudioProvider } from "@/context/AlbumAudioContext";
import type { Dispatch, SetStateAction } from "react";
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
  handlePlay,
}: {
  song: PlaylistSongsAudio[];
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  handlePlay: (start_flag: boolean) => Promise<void>;
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
