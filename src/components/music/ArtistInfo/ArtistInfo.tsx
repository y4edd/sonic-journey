import Image from "next/image";
import ArtistFavoriteButton from "../ArtistFavoriteButton/ArtistFavoriteButton";
import styles from "./ArtistInfo.module.css";

const ArtistInfo = ({ image, name, id }: { image: string; name: string; id: number }) => {
  return (
    <div className={styles.artistInfoContent}>
      <Image src={image} alt={`${name}の画像`} width={250} height={250} />
      <p>{name}</p>
      <ArtistFavoriteButton id={id} />
    </div>
  );
};

export default ArtistInfo;
