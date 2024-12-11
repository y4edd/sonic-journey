import type { DeezerArtist } from "@/types/deezer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArtistListItem.module.css";

const ArtistListItem = ({ artist }: { artist: DeezerArtist }) => {
  return (
    <Link href={`/artist/${artist.id}`}>
      <div className={styles.artistInfo}>
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
        <ArrowForwardIosIcon fontSize="small" color="disabled" />
      </div>
    </Link>
  );
};

export default ArtistListItem;
