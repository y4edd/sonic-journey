import type { DeezerSong } from "@/types/deezer";
import SongListItem from "../SongListItem/SongListItem";
import styles from "./SongList.module.css";

const SongList = ({
  songs,
  errorMessage,
}: {
  songs: DeezerSong[];
  errorMessage: string;
}) => {
  return (
    <div className={styles.songList}>
      {songs.length === 0 ? (
        <p className={styles.noSongsMessage}>{errorMessage}</p>
      ) : (
        <ul>
          {songs.map((song: DeezerSong) => {
            return (
              <li key={song.id}>
                <SongListItem song={song} />
              </li>
            );
          })}
          <div className={styles.horizon} />
        </ul>
      )}
    </div>
  );
};

export default SongList;
