"use client";

import type { DeezerSong } from "@/types/deezer";
import Image from "next/image";
import styles from "./SongItem.module.css";

export const SongItem = ({
  songs,
  gridLayout,
}: {
  songs: DeezerSong[];
  gridLayout: boolean;
}) => {
  return (
    <div className={styles.wrapper}>
      {gridLayout ? (
        <div className={styles.songItemsGridWrapper}>
          {songs.map((song, index) => (
            <div key={song.id} className={styles.songItemGridWrapper}>
              <p
                className={
                  index + 1 === 1
                    ? styles.firstRankGrid
                    : index + 1 === 2
                    ? styles.secondRankGrid
                    : index + 1 === 3
                    ? styles.thirdRankGrid
                    : styles.otherRankGrid
                }
              >
                {index + 1}
              </p>
              <Image
                src={song.cover_xl || song.album.cover_xl || ""}
                alt=""
                height={160}
                width={160}
                className={styles.songImageGrid}
              />
              <p className={styles.songNameGrid}>
                {song.title.length <= 15
                  ? song.title
                  : `${song.title.slice(0, 14)}...`}
              </p>
              <p className={styles.artistNameGrid}>
                {song.artist.name.length <= 15
                  ? song.artist.name
                  : `${song.artist.name.slice(0, 14)}...`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.songItemsListWrapper}>
          {songs.map((song, index) => (
            <div key={song.id} className={styles.songItemListWrapper}>
              <p
                className={
                  index + 1 === 1
                    ? styles.firstRankList
                    : index + 1 === 2
                    ? styles.secondRankList
                    : index + 1 === 3
                    ? styles.thirdRankList
                    : styles.otherRankList
                }
              >
                {index + 1}
              </p>
              <Image
                src={song.cover_xl || song.album.cover_xl || ""}
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
          ))}
        </div>
      )}
    </div>
  );
};
