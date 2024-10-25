import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import styles from "./ArtistInfo.module.css";

const ArtistInfo = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className={styles.artistInfoContent}>
      <Image src={image} alt={`${name}の画像`} width={250} height={250} />
      <p>{name}</p>
      <div>
        <FavoriteBorderIcon />
        <p>お気に入りに追加</p>
      </div>
    </div>
  );
};

export default ArtistInfo;
