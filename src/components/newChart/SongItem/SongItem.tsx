import styles from "./SongItem.module.css";
import Image from "next/image";

type Songs = {
  artist: {
    id: number;
    name: string;
  };
  cover_xl: string;
  id: number;
  release_date: string;
  title: string;
};

export const SongItem = ({ songs }: { songs: Songs[] }) => {
  return (
    <>
      {songs.map((song) => (
        <Image src={song.cover_xl} alt="ジャケ写" height={120} width={120} />
      ))}
    </>
  );
};
