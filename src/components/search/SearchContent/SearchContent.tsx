import type { Result } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import styles from "./SearchContent.module.css";

const SearchContent = ({ result, url }: { result: Result; url: string }) => {
  return (
    <div className={styles.songInfo}>
      <Link href={`/${url}/${result.id}`}>
        <Image
          src={result.cover}
          alt={`${result.artist.name}の画像`}
          width={180}
          height={180}
          className={styles.songImage}
        />
      </Link>
      <p>{result.title}</p>
      <p>{result.artist.name}</p>
    </div>
  );
};

export default SearchContent;
