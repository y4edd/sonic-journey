import type { GenreArtist } from "@/types/deezer";
import styles from "./GenreContent.module.css";

const GenreContent = ({ genre }: { genre: GenreArtist }) => {
  return (
    <div className={styles.genreContent}>
      <button type="button">{genre.name}</button>
    </div>
  );
};

export default GenreContent;
