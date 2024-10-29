import type { GenreInfo } from "@/types/deezer";
import styles from "./GenreButton.module.css";
// import { url } from "inspector";

const GenreButton = ({ genre }: { genre: GenreInfo }) => {
  return (
    <div className={styles.genreContent}>
      <button
        type="button"
        style={{
          backgroundImage: `url(${genre.picture})`,
          WebkitTextStroke: "0.7px black",
          color: genre.id === 0 ? "black" : "white",
        }}
      >
        {genre.name}
      </button>
    </div>
  );
};

export default GenreButton;
