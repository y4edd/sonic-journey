import type { DeezerSong } from "@/types/deezer";
import SongListItem from "../SongListItem/SongListItem";
import styles from "./SongList.module.css";

const SongList = ({
  songs,
  url,
  errorMessage,
}: {
  songs: DeezerSong[];
  url: string;
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
                <SongListItem song={song} url={url} />
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
