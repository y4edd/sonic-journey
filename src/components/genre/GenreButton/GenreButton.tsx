import type { GenreArtist } from "@/types/deezer";
import styles from "./GenreButton.module.css";

const GenreButton = ({ genre }: { genre: GenreArtist }) => {
  return (
    <div className={styles.genreContent}>
      <button type="button">{genre.name}</button>
    </div>
  );
};

export default GenreButton;
