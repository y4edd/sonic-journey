import type { DeezerSong } from "@/types/deezer";
import Image from "next/image";
import styles from "./SongListItemWithCheckbox.module.css";

const SongListItemWithCheckbox = ({
  song,
  checked,
  onChange,
}: {
  song: DeezerSong;
  checked: boolean;
  onChange: (id: number, isChecked: boolean) => void;
}) => {
  return (
    <label htmlFor={song.id.toString()} className={styles.songItemLabel}>
      <Image
        src={song.cover_xl || song.album.cover_xl || ""}
        alt={`${song.title}のジャケット画像`}
        width={75}
        height={75}
        priority
      />
      <div>
        <p className={styles.songTitle}>{song.title}</p>
        <p className={styles.artistName}>{song.artist.name}</p>
      </div>
      <span>
        <input
          type="checkbox"
          className={styles.checkbox}
          value={song.id.toString()}
          id={song.id.toString()}
          checked={checked}
          onChange={(e) => onChange(Number(e.target.value), e.target.checked)}
        />
      </span>
    </label>
  );
};

export default SongListItemWithCheckbox;
