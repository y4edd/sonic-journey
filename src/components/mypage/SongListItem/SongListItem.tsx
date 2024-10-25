import type { DeezerSong } from "@/types/deezer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import Link from "next/link";
import styles from "./SongListItem.module.css";

const SongListItem = ({ song, url }: { song: DeezerSong; url: string }) => {
  return (
    <Link href={`/${url}/${song.id}`}>
      <div className={styles.songInfo}>
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
        <ArrowForwardIosIcon fontSize="small" color="disabled" />
      </div>
    </Link>
  );
};

export default SongListItem;
