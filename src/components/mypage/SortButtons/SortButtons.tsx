"use client";
import { useState } from "react";
import styles from "./SortButtons.module.css";

type SortButtonsProps = {
  label: string;
  onSortChange: (order: boolean) => void;
};

const SortButtons = ({ label, onSortChange }: SortButtonsProps) => {
  const [isAscSelected, setIsAscSelected] = useState(false);
  const [isDescSelected, setIsDescSelected] = useState(true);

  const handleAscClick = () => {
    setIsAscSelected(true);
    setIsDescSelected(false);
    onSortChange(true);
  };

  const handleDescClick = () => {
    setIsAscSelected(false);
    setIsDescSelected(true);
    onSortChange(false);
  };

  return (
    <div className={styles.sortButtonWrapper}>
      <button
        type="button"
        onClick={handleDescClick}
        className={`${isDescSelected ? styles.selected : styles.notSelected}`}
      >
        {label}降順
      </button>
      <div className={styles.verticalLine} />
      <button
        type="button"
        onClick={handleAscClick}
        className={`${isAscSelected ? styles.selected : styles.notSelected}`}
      >
        {label}昇順
      </button>
    </div>
  );
};

export default SortButtons;
