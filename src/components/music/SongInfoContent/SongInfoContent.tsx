import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import Image from "next/image";
import SongAudio from "../SongAudio/SongAudio";
import styles from "./SongInfoContent.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type SongInfoContentProps = {
  title: string;
  artist: string;
  image: string;
  preview?: string;
};

const SongInfoContent = ({
  title,
  artist,
  image,
  preview,
}: SongInfoContentProps) => {
  return (
    <div>
      <div className={styles.songInfoContent}>
        <Image
          src={image}
          alt={`${title}のジャケット`}
          width={130}
          height={130}
          priority
        />
        <div className={styles.songInfoDetail}>
          <h2>{title}</h2>
          <p>{artist}</p>
          <div>
            <SongAudio preview={preview} />
          </div>
          {/* FIXME: プレイリストに追加する処理を記述する必要があります。 */}
          <div className={styles.songInfoAddFavorite}>
            <FavoriteBorderIcon />
            <p>お気に入りに追加</p>
          </div>
          <div className={styles.songInfoAddList}>
            <CreateNewFolderIcon />
            <p>プレイリストに追加</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongInfoContent;
