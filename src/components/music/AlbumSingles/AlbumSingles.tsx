"use client";

import type { AlbumSingle } from "@/types/deezer";
import AlbumSingleSong from "../AlbumSingleSong/AlbumSingleSong";
import styles from "./AlbumSingles.module.css";
import { AlbumAudioProvider } from "@/context/AlbumAudioContext";

type AlbumSong = {
  id: number;
  title: string;
  preview: string;
};

const AlbumSingles = ({ singles }: { singles: AlbumSingle[] }) => {
  return (
    // Providerでラップすると、子孫コンポーネントがコンテキストにアクセスできるようになる
    <AlbumAudioProvider>
      <div className={styles.albumSinglesContent}>
        {singles.map((song: AlbumSong, index: number) => {
          return (
            <div key={song.id} className={styles.albumSingleSong}>
              <AlbumSingleSong
                id={song.id}
                title={song.title}
                preview={song.preview}
                num={index + 1}
              />
            </div>
          );
        })}
      </div>
    </AlbumAudioProvider>
  );
};

export default AlbumSingles;
