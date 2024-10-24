import type { DeezerSong } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import styles from "./SongContent.module.css";

const SongContent = ({ song, url }: { song: DeezerSong; url: string }) => {
  return (
    // FIXME: 後でリンクにする必要があります。
    <Link href={`/${url}/${song.id}`}>
      <div className={styles.songInfo}>
        <Image
          src={song.cover_xl || song.album.cover_xl || ""}
          alt={`${song.title}のジャケット画像`}
          width={180}
          height={180}
          priority
        />
        <p>{song.title}</p>
        <p>{song.artist.name}</p>
      </div>
    </Link>
  );
};

export default SongContent;
