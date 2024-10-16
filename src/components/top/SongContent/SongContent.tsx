import type { DeezerSong } from "@/types/deezer";
import Image from "next/image";
import styles from "./SongContent.module.css";

const SongContent = ({ song }: { song: DeezerSong }) => {
  return (
    // FIXME: 後でリンクにする必要があります。
    <div className={styles.songInfo}>
      <Image
        src={song.cover_xl || song.album.cover_xl || ""}
        alt={`${song.title}のジャケット画像`}
        width={180}
        height={180}
      />
      <p>{song.artist.name}</p>
      <p>{song.title}</p>
    </div>
  );
};

export default SongContent;
