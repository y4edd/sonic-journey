import Image from "next/image";
import Link from "next/link";
import { AddPlaylist } from "../AddPlaylist/AddPlaylist";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import SongAudio from "../SongAudio/SongAudio";
import styles from "./SongInfoContent.module.css";

type SongInfoContentProps = {
  id: number;
  title: string;
  artist: string;
  image: string;
  preview?: string;
  albumId: number;
};

const SongInfoContent = ({ id, title, artist, image, preview, albumId }: SongInfoContentProps) => {
  return (
    <div>
      <div className={styles.songInfoContent}>
        <Link href={`/album/${albumId}`}>
          <Image src={image} alt={`${title}のジャケット`} width={130} height={130} priority />
        </Link>
        <div className={styles.songInfoDetail}>
          <h2>{title}</h2>
          <p>{artist}</p>
          <div>
            <SongAudio preview={preview} id={id} />
          </div>
          <FavoriteButton id={id} />
          <AddPlaylist id={id} text="プレイリストに追加" />
        </div>
      </div>
    </div>
  );
};

export default SongInfoContent;
