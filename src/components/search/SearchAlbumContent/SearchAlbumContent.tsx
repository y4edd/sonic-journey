import type { SearchAlbum } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./SearchAlbum.module.css";

const SearchAlbumContent = ({
  result,
  url,
  style,
}: {
  result: SearchAlbum;
  url: string;
  style: string;
}) => {
  return (
    <div className={style === "grid" ? styles.albumInfoGrid : styles.albumInfo}>
      <Link href={`/${url}/${result.id}`}>
        <Image
          src={result.cover_xl || "/images/defaultsong.png"}
          alt={`${result.artist.name}の画像`}
          width={180}
          height={180}
        />
      </Link>
      <div>
        <p>{result.title}</p>
        <p>{result.artist.name}</p>
      </div>
    </div>
  );
};

export default SearchAlbumContent;
