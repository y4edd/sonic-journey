import type { GenreInfo } from "@/types/deezer";
import type { Dispatch, SetStateAction } from "react";
import styles from "./GenreButton.module.css";

const GenreButton = ({
  genre,
  selectGenre,
  setSelectGenre,
}: {
  genre: GenreInfo;
  selectGenre: number;
  setSelectGenre: Dispatch<SetStateAction<number>>;
}) => {
  const handleGenreBtnClick = (id: number) => {
    setSelectGenre(id);
  };
  return (
    <div className={styles.genreContent}>
      <button
        type="button"
        className={genre.id !== selectGenre ? styles.genreBtn : styles.selectGenreBtn}
        onClick={() => handleGenreBtnClick(genre.id)}
      >
        {genre.name}
      </button>
    </div>
  );
};

export default GenreButton;
