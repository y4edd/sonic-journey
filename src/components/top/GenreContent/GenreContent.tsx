import type { GenreInfo } from "@/types/deezer";
import Link from "next/link";
import styles from "./GenreContent.module.css";

const GenreContent = async ({ genre }: { genre: GenreInfo }) => {
  return (
    <div className={styles.genreContent}>
      <Link href={{ pathname: "/genre", query: { id: genre.id } }} className={styles.link}>
        <button type="button">{genre.name}</button>
      </Link>
    </div>
  );
};

export default GenreContent;
