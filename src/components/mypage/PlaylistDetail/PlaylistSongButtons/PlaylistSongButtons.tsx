"use client";

import { AlbumAudioProvider } from "@/context/AlbumAudioContext";
import type { DeezerTrackSong } from "@/types/deezer";
import PlaylistSongButton from "../PlaylistSongButton/PlaylistSongButton";
import styles from "./PlaylistSongButtons.module.css";

const PlaylistSongButtons = ({ singles }: { singles: DeezerTrackSong[] }) => {
  return (
    <AlbumAudioProvider>
      <div className={styles.albumSinglesContent}>
        {singles.map((song: DeezerTrackSong, index: number) => {
          return (
            <div key={song.id} className={styles.albumSingleSong}>
              <PlaylistSongButton pickSong={song} index={index} />
            </div>
          );
        })}
      </div>
    </AlbumAudioProvider>
  );
};

export default PlaylistSongButtons;
