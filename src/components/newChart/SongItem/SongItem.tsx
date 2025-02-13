"use client";

import type { DeezerChartSong } from "@/types/deezer";
import { getMondayOfThisWeek } from "@/utils/getMonday";
import Image from "next/image";
import Link from "next/link";
import styles from "./SongItem.module.css";

export const SongItem = ({
  songs,
  gridLayout,
  weekCheck,
}: {
  songs: DeezerChartSong[];
  gridLayout: boolean;
  weekCheck?: string;
}) => {
  if (weekCheck) {
    if (weekCheck === "this") {
      songs = songs.filter(
        (song) =>
          getMondayOfThisWeek().toLocaleDateString().replaceAll("/", "-") <= song.release_date,
      );
    } else if (weekCheck === "last") {
      songs = songs.filter(
        (song) =>
          getMondayOfThisWeek().toLocaleDateString().replaceAll("/", "-") > song.release_date,
      );
    } else {
    }
  }

  return (
    <div className={styles.wrapper}>
      {gridLayout ? (
        <div className={styles.songItemsGridWrapper}>
          {songs.map((song) => (
            <Link href={`/album/${song.id}`} key={song.id}>
              <div className={styles.songItemGridWrapper}>
                <Image
                  src={song.cover_xl}
                  alt=""
                  height={160}
                  width={160}
                  className={styles.songImageGrid}
                />
                <p className={styles.songNameGrid}>
                  {song.title.length <= 15 ? song.title : `${song.title.slice(0, 14)}...`}
                </p>
                <p className={styles.artistNameGrid}>
                  {song.artist.name.length <= 15
                    ? song.artist.name
                    : `${song.artist.name.slice(0, 14)}...`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.songItemsListWrapper}>
          {songs.map((song) => (
            <Link href={`/album/${song.id}`} key={song.id}>
              <div className={styles.songItemListWrapper}>
                <Image
                  src={song.cover_xl}
                  alt=""
                  height={70}
                  width={70}
                  className={styles.songImageList}
                />
                <div className={styles.nameList}>
                  <p className={styles.songNameList}>{song.title}</p>
                  <p className={styles.artistNameList}>{song.artist.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
