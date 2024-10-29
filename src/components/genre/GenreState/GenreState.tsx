import styles from "./GenreState.module.css";
import GenreButtons from "../GenreButtons/GenreButtons";

const GenreState = () => {
  return (
    <div className={styles.wrapper}>
      <GenreButtons />
    </div>
  );
};

export default GenreState;
