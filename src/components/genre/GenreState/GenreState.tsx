"use client";

import { useState } from "react";
import { GenreArtist } from "../GenreArtist/GenreArtist";
import GenreButtons from "../GenreButtons/GenreButtons";
import styles from "./GenreState.module.css";

const GenreState = ({ transitionId }: { transitionId: number }) => {
  const [selectGenre, setSelectGenre] = useState(transitionId);

  return (
    <div className={styles.wrapper}>
      <GenreButtons selectGenre={selectGenre} setSelectGenre={setSelectGenre} />
      <GenreArtist selectGenre={selectGenre} />
    </div>
  );
};

export default GenreState;
