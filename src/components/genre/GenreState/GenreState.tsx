"use client";

import styles from "./GenreState.module.css";
import GenreButtons from "../GenreButtons/GenreButtons";
import { useState } from "react";

const GenreState = () => {
  const [selectGenre, setSelectGenre] = useState(0);
  return (
    <div className={styles.wrapper}>
      <GenreButtons setSelectGenre={setSelectGenre} />
    </div>
  );
};

export default GenreState;
