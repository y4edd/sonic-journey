import type { DeezerArtist } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import styles from "./SearchArtistResultContent.module.css";
const SearchArtistResultContent = ({
  result,
  url,
  style,
}: {
  result: DeezerArtist;
  url: string;
  style: string;
}) => {
  return (
    <div className={style === "grid" ? styles.artistInfoGrid : styles.artistInfo}>
      <Link href={`/${url}/${result.id}`}>
        <Image
          src={result.picture_xl || "/images/defaultsong.png"}
          alt={`${result.name}の画像`}
          width={180}
          height={180}
        />
      </Link>
      <div>
        <p>{result.name}</p>
      </div>
    </div>
  );
};

export default SearchArtistResultContent;
