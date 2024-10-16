import type { DeezerSong } from "@/types/deezer";
import SongContent from "../SongContent/SongContent";
import styles from "./SongsGroup.module.css";

const SongsGroup = ({ songs }: { songs: { resultData: DeezerSong[] } }) => {
  return (
    <div className={styles.newSongGroup}>
      {songs.resultData.map((song: DeezerSong) => {
        return <SongContent song={song} key={song.id} />;
      })}
    </div>
  );
};

export default SongsGroup;
