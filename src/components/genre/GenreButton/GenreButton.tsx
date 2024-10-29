import { Dispatch, SetStateAction } from "react";
import type { GenreInfo } from "@/types/deezer";
import styles from "./GenreButton.module.css";

const GenreButton = ({
  genre,
  setSelectGenre,
}: {
  genre: GenreInfo;
  setSelectGenre: Dispatch<SetStateAction<number>>;
}) => {
  const handleGenreBtnClick = (id: number) => {
    setSelectGenre(id);
  };
  return (
    <div className={styles.genreContent}>
      <button
        type="button"
        style={{
          backgroundImage: `url(${genre.picture})`,
          WebkitTextStroke: "0.7px black",
          color: genre.id === 0 ? "black" : "white",
        }}
        onClick={() => handleGenreBtnClick(genre.id)}
      >
        {genre.name}
      </button>
    </div>
  );
};

export default GenreButton;
