import type { DeezerSong } from "@/types/deezer";
import SongListItemWithCheckbox from "../SongListItemWithCheckbox/SongListItemWithCheckbox";
import styles from "./SelectableSongList.module.css";

const SelectableSongList = ({
  songs,
  selectedSongs,
  onChange,
  errorMessage,
}: {
  songs: DeezerSong[];
  selectedSongs: number[];
  onChange: (id: number, isChecked: boolean) => void;
  errorMessage: string;
}) => {
  return (
    <div className={styles.songListContainer}>
      {songs.length === 0 ? (
        <p className={styles.noSongsMessage}>{errorMessage}</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              <SongListItemWithCheckbox
                song={song}
                checked={selectedSongs.includes(song.id)}
                onChange={onChange}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectableSongList;
