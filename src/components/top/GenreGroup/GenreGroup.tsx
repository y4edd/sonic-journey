import { GENRE_ARTISTS } from "@/constants/constant";
import type { GenreInfo } from "@/types/deezer";
import GenreContent from "../GenreContent/GenreContent";
import styles from "./GenreGroup.module.css";
import { getGenreInfo } from "@/utils/apiFunc";

const GenreGroup = async () => {
  const genreArtistInfo: GenreInfo[] = await getGenreInfo();
  return (
    <div className={styles.genreGroup}>
      {genreArtistInfo.map((genre: GenreInfo) => {
        return <GenreContent genre={genre} key={genre.id} />;
      })}
    </div>
  );
};

export default GenreGroup;
