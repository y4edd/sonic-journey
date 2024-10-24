import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import AlbumSingleSongAudio from "../AlbumSingleSongAudio/AlbumSingleSongAudio";
import styles from "./AlbumSingleSong.module.css";

type AlbumSingleSongProps = {
  id: number;
  num: number;
  title: string;
  preview: string;
};

const AlbumSingleSong = ({ id, num, title, preview }: AlbumSingleSongProps) => {
  const displayNum = num.toString().padStart(2, "0");

  return (
    <div className={styles.albumSingleContent}>
      <AlbumSingleSongAudio preview={preview} />
      <div className={styles.albumSingleInfo}>
        <p>
          <Link href={`/music/${id}`}>
            {displayNum}: {title}
          </Link>
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

export default AlbumSingleSong;
