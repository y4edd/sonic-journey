import { GENRE_ARTISTS } from "@/constants/constant";
import type { GenreArtist } from "@/types/deezer";
import GenreButton from "../GenreButton/GenreButton";
import styles from "./GenreButtons.module.css";

const GenreButtons = () => {
  return (
    <div className={styles.genreGroup}>
      {GENRE_ARTISTS.map((genre: GenreArtist) => {
        return <GenreButton genre={genre} key={genre.id} />;
      })}
    </div>
  );
};

export default GenreButtons;
