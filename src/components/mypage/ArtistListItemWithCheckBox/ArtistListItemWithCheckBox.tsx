import type { DeezerArtist } from "@/types/deezer";
import Image from "next/image";
import styles from "./ArtistListItemWithCheckBox.module.css";

const AritstListItemWithCheckBox = ({
  artist,
  checked,
  onChange,
}: {
  artist: DeezerArtist;
  checked: boolean;
  onChange: (id: number, isChecked: boolean) => void;
}) => {
  return (
    // HACK: artist.id が undefined になるのを回避
    <label htmlFor={(artist.id ?? -1).toString()} className={styles.artistItemLabel}>
      <Image
        src={artist.picture_xl || ""}
        alt={`${artist.name}のアーティスト画像`}
        width={75}
        height={75}
        priority
      />
      <div className={styles.artistName}>
        <p>{artist.name}</p>
      </div>
      <span>
        <input
          type="checkbox"
          className={styles.checkbox}
          // HACK: artist.id が undefined になるのを回避
          value={(artist.id ?? -1).toString()}
          id={(artist.id ?? -1).toString()}
          checked={checked}
          onChange={(e) => onChange(Number(e.target.value), e.target.checked)}
        />
      </span>
    </label>
  );
};

export default AritstListItemWithCheckBox;
