import type { DeezerArtist } from "@/types/deezer";
import ArtistListItem from "../ArtistListItem/ArtistListItem";
import styles from "./ArtitstList.module.css";

const ArtistList = ({ artists }: { artists: DeezerArtist[] }) => {
  return (
    <div className={styles.artistList}>
      {artists.length === 0 ? (
        <p className={styles.noArtistMessage}>お気に入りアーティストは登録されていません</p>
      ) : (
        <ul>
          {artists.map((artist: DeezerArtist) => {
            return (
              <li key={artist.id}>
                <ArtistListItem artist={artist} />
              </li>
            );
          })}
          <div className={styles.horizon} />
        </ul>
      )}
    </div>
  );
};

export default ArtistList;
