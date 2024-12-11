"use client";

import { AlbumAudioProvider } from "@/context/AlbumAudioContext";
import type { DeezerTrackSong } from "@/types/deezer";
import PickSongs from "../PickSongs/PickSongs";
import styles from "./PickSong.module.css";

type PickSong = {
  id: number;
  title: string;
  preview: string;
};

const PickSong = ({ singles }: { singles: DeezerTrackSong[] }) => {
  return (
    <AlbumAudioProvider>
      <div className={styles.albumSinglesContent}>
        {singles.map((song: DeezerTrackSong) => {
          return (
            <div key={song.id} className={styles.albumSingleSong}>
              <PickSongs pickSong={song} />
            </div>
          );
        })}
      </div>
    </AlbumAudioProvider>
  );
};

export default PickSong;
