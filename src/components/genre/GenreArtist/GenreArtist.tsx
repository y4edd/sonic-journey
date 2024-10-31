"use client";

import type { GenreInfo } from "@/types/deezer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import styles from "./GenreArtist.module.css";

const fetcher = (key: string) => {
  return fetch(key).then((res) => res.json());
};

export const GenreArtist = ({ selectGenre }: { selectGenre: number }) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/genreArtistSearch?genre=${selectGenre}`,
    fetcher
  );
  if (error) return <div>エラー</div>;
  if (isLoading) return <div>楽曲情報を取得中...</div>;
  if (data) {
    const artists = data.resultData;
    return (
      <div className={styles.artistContainer}>
        <ul>
          {artists.map((artist: GenreInfo) => (
            <li className={styles.artistItem} key={artist.id}>
              <Link href={`/artist/${artist.id}`} className={styles.artistLink}>
                <Image
                  src={artist.picture}
                  alt={artist.name}
                  height={75}
                  width={75}
                />
                <p className={styles.artistName}>{artist.name}</p>
                <ArrowForwardIosIcon className={styles.linkArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
