"use client";
import { useState } from "react";
import styles from "./SortButtons.module.css";

type SortButtonsProps = {
  label: string;
};

const SortButtons = ({ label }: SortButtonsProps) => {
  const [isAscSelected, setIsAscSelected] = useState(true);
  const [isDescSelected, setIsDescSelected] = useState(false);

  const handleAscClick = () => {
    setIsAscSelected(true);
    setIsDescSelected(false);
  };

  const handleDescClick = () => {
    setIsAscSelected(false);
    setIsDescSelected(true);
  };

  return (
    <div className={styles.sortButtonWrapper}>
      {/* FIXME: ボタンにリンクを付ける */}
      <button
        type="button"
        onClick={handleAscClick}
        className={`${isAscSelected ? styles.selected : styles.notSelected}`}
      >
        {label}昇順
      </button>
      <div className={styles.verticalLine} />
      <button
        type="button"
        onClick={handleDescClick}
        className={`${isDescSelected ? styles.selected : styles.notSelected}`}
      >
        {label}降順
      </button>
    </div>
  );
};

export default SortButtons;
