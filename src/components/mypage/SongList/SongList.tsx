import type { DeezerSong } from "@/types/deezer";
import SongListItem from "../SongListItem/SongListItem";
import styles from "./SongList.module.css";

const SongList = ({ songs }: { songs: DeezerSong[] }) => {
  return (
    <div className={styles.songList}>
      {songs.length === 0 ? (
        <p className={styles.noSongsMessage}>お気に入り曲は登録されていません</p>
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
