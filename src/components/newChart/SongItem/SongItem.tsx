import styles from "./SongItem.module.css";
import Image from "next/image";

type Songs = {
  artist: {
    id: number;
    name: string;
  };
  cover_xl: string;
  id: number;
  release_date: string;
  title: string;
};

export const SongItem = ({
  songs,
  gridLayout,
}: {
  songs: Songs[];
  gridLayout: boolean;
}) => {
  return (
    <div className={styles.songItemsGridWrapper}>
      {songs.map((song) => (
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
  );
};
