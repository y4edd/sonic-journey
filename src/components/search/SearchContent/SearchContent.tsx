import { Result } from "@/types/deezer";
import Image from "next/image";
import styles from "./SearchContent.module.css";

const SearchContent = ({ result }: { result: Result }) => {
  return (
    <div className={styles.songInfo}>
      <Image
        src={result.artist.picture_big}
        alt={`${result.artist.name}の画像`}
        width={180}
        height={180}
      />
      <p>{result.title}</p>
      <p>{result.artist.name}</p>
    </div>
  );
};

export default SearchContent;
