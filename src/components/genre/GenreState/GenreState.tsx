"use client";

import styles from "./GenreState.module.css";
import GenreButtons from "../GenreButtons/GenreButtons";
import { GenreArtist } from "../GenreArtist/GenreArtist";
import { useState } from "react";

const GenreState = () => {
  const [selectGenre, setSelectGenre] = useState(0);
  return (
    <div className={styles.wrapper}>
      <GenreButtons selectGenre={selectGenre} setSelectGenre={setSelectGenre} />
      <GenreArtist selectGenre={selectGenre} />
    </div>
  );
};

export default GenreState;
