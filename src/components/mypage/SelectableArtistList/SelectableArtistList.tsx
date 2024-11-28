import type { DeezerArtist } from "@/types/deezer";
import AritstListItemWithCheckBox from "../ArtistListItemWithCheckBox/ArtistListItemWithCheckBox";
import styles from "./SelectableAritstList.module.css";

const SelectableArtistList = ({
  artists,
  selectedArtists,
  onChange,
  errorMessage,
}: {
  artists: DeezerArtist[];
  selectedArtists: number[];
  onChange: (id: number, isChecked: boolean) => void;
  errorMessage: string;
}) => {
  return (
    <div className={styles.artistListContainer}>
      {artists.length === 0 ? (
        <p className={styles.noArtistsMessage}>{errorMessage}</p>
      ) : (
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              <AritstListItemWithCheckBox
                artist={artist}
                // HACK: artist.id が undefined になるのを回避
                checked={selectedArtists.includes(artist.id ?? -1)}
                onChange={onChange}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectableArtistList;
