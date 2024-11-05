import type { Playlist } from "@/types/deezer";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import styles from "./PlaylistList.module.css";

const PlaylistList = ({ playlists }: { playlists: Playlist[] }) => {
  return (
    <div className={styles.playlistListContainer}>
      {playlists.length === 0 ? (
        <p className={styles.noPlaylistMessage}>
          プレイリストは登録されていません
        </p>
      ) : (
        <ul>
          {playlists.map((playlist: Playlist) => {
            return (
              <li key={playlist.id}>
                <PlaylistItem playlist={playlist} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PlaylistList;
