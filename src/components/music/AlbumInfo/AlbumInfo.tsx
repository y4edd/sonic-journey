import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import styles from "./AlbumInfo.module.css";

type AlbumInfoProps = {
  title: string;
  artist: string;
  image: string;
  nb_tracks: number;
};

const AlbumInfo = ({ image, title, artist, nb_tracks }: AlbumInfoProps) => {
  return (
    <div>
      <div className={styles.albumInfoContent}>
        <Image src={image} alt={`${title}のジャケット`} width={130} height={130} priority />
        <div className={styles.albumInfoDetail}>
          <h2>{title}</h2>
          <p>{artist}</p>
          <p>{nb_tracks}曲</p>
          {/* FIXME: プレイリストに追加する処理を記述する必要があります。 */}
          <div className={styles.albumInfoAddFavorite}>
            <FavoriteBorderIcon />
            <p>お気に入りに追加</p>
          </div>
          <div className={styles.albumInfoAddList}>
            <CreateNewFolderIcon />
            <p>プレイリストに追加</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfo;
