import { GENRE_ARTISTS } from "@/constants/constant";
import type { GenreArtist } from "@/types/deezer";
import GenreContent from "../GenreContent/GenreContent";
import styles from "./GenreGroup.module.css";

const GenreGroup = () => {
  return (
    <div className={styles.genreGroup}>
      {GENRE_ARTISTS.map((genre: GenreArtist) => {
        return <GenreContent genre={genre} key={genre.id} />;
      })}
    </div>
  );
};

export default GenreGroup;
