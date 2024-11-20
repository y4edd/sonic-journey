import type { DeezerArtist } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import styles from "./SearchArtistResultContent.module.css";
const SearchArtistResultContent = ({
  result,
  url,
}: {
  result: DeezerArtist;
  url: string;
}) => {
  return (
    <div className={styles.artistInfo}>
      <Link href={`/${url}/${result.id}`}>
        <Image
          src={result.picture_xl || "/images/defaultsong.png"}
          alt={`${result.name}の画像`}
          width={180}
          height={180}
        />

        <p>{result.name}</p>
      </Link>
    </div>
  );
};

export default SearchArtistResultContent;
