"use client";

import type { DeezerChartSong } from "@/types/deezer";
import styles from "./SongItem.module.css";
import Image from "next/image";
import { GETMONDAYOFTHISWEEK, GETMONDAYOFLASTWEEK } from "@/constants/constant";

export const SongItem = ({
  songs,
  gridLayout,
  weekCheck,
}: {
  songs: DeezerChartSong[];
  gridLayout: boolean;
  weekCheck: string;
}) => {
  let selectSongs: DeezerChartSong[] = [];

  if (weekCheck === "this") {
    selectSongs = songs.filter(
      (song) =>
        GETMONDAYOFTHISWEEK.toLocaleDateString().replaceAll("/", "-") <=
        song.release_date
    );
  } else if (weekCheck === "last") {
    selectSongs = songs.filter(
      (song) =>
        GETMONDAYOFTHISWEEK.toLocaleDateString().replaceAll("/", "-") >
        song.release_date
    );
  } else {
    selectSongs = songs;
  }

  return (
    <div className={styles.wrapper}>
      {gridLayout ? (
        <div className={styles.songItemsGridWrapper}>
          {selectSongs.map((song) => (
            <div key={song.id} className={styles.songItemGridWrapper}>
              <Image
                src={song.cover_xl}
                alt="ジャケ写"
                height={160}
                width={160}
                className={styles.songImageGrid}
              />
              <p className={styles.songNameGrid}>
                {song.title.length <= 15
                  ? song.title
                  : song.title.slice(0, 14) + "..."}
              </p>
              <p className={styles.artistNameGrid}>
                {song.artist.name.length <= 15
                  ? song.artist.name
                  : song.artist.name.slice(0, 14) + "..."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.songItemsListWrapper}>
          {songs.map((song) => (
            <div key={song.id} className={styles.songItemListWrapper}>
              <Image
                src={song.cover_xl}
                alt="ジャケ写"
                height={70}
                width={70}
                className={styles.songImageList}
              />
              <div className={styles.nameList}>
                <p className={styles.songNameList}>{song.title}</p>
                <p className={styles.artistNameList}>{song.artist.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
