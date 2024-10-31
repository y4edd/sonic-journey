import type { ArtistAlbum } from "@/types/deezer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./SearchAlbum.module.css";

const SearchAlbumContent = ({
  result,
  url,
}: {
  result: ArtistAlbum;
  url: string;
}) => {
  return (
    <Link href={`/${url}/${result.id}`}>
      <div className={styles.albumInfo}>
        <Image
          src={result.cover_xl || "/images/defaultsong.png"}
          alt={`${result.artist.name}の画像`}
          width={180}
          height={180}
        />
        <p>{result.title}</p>
        <p>{result.artist.name}</p>
      </div>
    </Link>
  );
};

export default SearchAlbumContent;
