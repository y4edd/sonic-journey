import type { DeezerNewSong } from "@/types/deezer";
import SongContent from "../SongContent/SongContent";
import styles from "./SongsGroup.module.css";

const SongsGroup = async () => {
  // Next.jsのルートハンドラーより人気新着楽曲を4曲取得(サーバー)
  const res = await fetch(`http://localhost:3000/api/newSongsSearch?limit=${4}`);
  const songs = await res.json();

  return (
    <div className={styles.newSongGroup}>
      {songs.resultData.map((song: DeezerNewSong) => {
        return <SongContent song={song} key={song.id} />;
      })}
    </div>
  );
};

export default SongsGroup;
