import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import Image from "next/image";
import AlbumSingleSongAudio from "@/components/music/AlbumSingleSongAudio/AlbumSingleSongAudio";
import styles from "./PickSongs.module.css";
import type { DeezerTrackSong } from "@/types/deezer";

const PickSongs = ({ pickSong }: { pickSong: DeezerTrackSong }) => {
  return (
    <div className={styles.albumSingleContent}>
      <Link href={`/album/${pickSong.album.id}`} className={styles.linkImage}>
        <Image src={pickSong.cover_xl} alt="" height={60} width={60} />
      </Link>
      <AlbumSingleSongAudio preview={pickSong.preview} />
      <div className={styles.albumSingleInfo}>
        <p>
          <Link href={`/music/${pickSong.id}`}>{pickSong.title}</Link>
        </p>
        <button type="button">
          <FavoriteIcon
            sx={{
              fontSize: 16,
              color: "#fc9aff",
              cursor: "pointer",
            }}
            role="img"
            aria-hidden="false"
          />
        </button>
      </div>
    </div>
  );
};

export default PickSongs;
