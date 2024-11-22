import Image from "next/image";
import styles from "./ArtistInfo.module.css";
import ArtistFavoriteButton from "../ArtistFavoriteButton/ArtistFavoriteButton";

const ArtistInfo = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className={styles.artistInfoContent}>
      <Image src={image} alt={`${name}の画像`} width={250} height={250} />
      <p>{name}</p>
      <ArtistFavoriteButton />
    </div>
  );
};

export default ArtistInfo;
