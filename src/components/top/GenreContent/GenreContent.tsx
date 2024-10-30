import type { GenreInfo } from "@/types/deezer";
import styles from "./GenreContent.module.css";
import Link from "next/link";

const GenreContent = async ({ genre }: { genre: GenreInfo }) => {
  return (
    <div className={styles.genreContent}>
      <Link
        href={{ pathname: "/genre", query: { id: genre.id } }}
        className={styles.link}
      >
        <button type="button">{genre.name}</button>
      </Link>
    </div>
  );
};

export default GenreContent;
