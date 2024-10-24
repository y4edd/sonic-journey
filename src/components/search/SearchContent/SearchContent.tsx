import type { Result } from "@/types/deezer";
import Image from "next/image";
import styles from "./SearchContent.module.css";
import Link from "next/link";

const SearchContent = ({ result, url }: { result: Result; url: string }) => {
  return (
    <div className={styles.songInfo}>
      <Link href={`/${url}/${result.id}`}>
        <Image
          src={result.artist.picture_big}
          alt={`${result.artist.name}の画像`}
          width={180}
          height={180}
        />
      </Link>
      <p>{result.title}</p>
      <p>{result.artist.name}</p>
    </div>
  );
};

export default SearchContent;
