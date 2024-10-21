"use client";

import { getMondayOfLastWeek, getMondayOfThisWeek } from "@/utils/getMonday";
import styles from "./SelectDate.module.css";

type UseDateCheck = {
  weekCheck: string;
  handleLastClick: () => void;
  handleThisClick: () => void;
};

// 先週の月曜日の日付を取得

const options = { month: "2-digit" as const, day: "2-digit" as const };

export const SelectDate = ({
  weekCheck,
  handleLastClick,
  handleThisClick,
}: UseDateCheck) => {
  return (
    <div className={styles.dateWrapper}>
      <div className={styles.weekWrapper}>
        <p
          className={weekCheck === "last" ? styles.theWeek : styles.otherWeek}
          onClick={handleLastClick}
          onKeyDown={handleLastClick}
        >
          先週
        </p>
        <p
          className={weekCheck === "last" ? styles.theWeek : styles.otherWeek}
          onClick={handleLastClick}
          onKeyDown={handleLastClick}
        >
          ({getMondayOfLastWeek().toLocaleDateString(undefined, options)}~)
        </p>
      </div>
      <div className={styles.border} />
      <div className={styles.weekWrapper}>
        <p
          className={weekCheck === "this" ? styles.theWeek : styles.otherWeek}
          onClick={handleThisClick}
          onKeyDown={handleThisClick}
        >
          今週
        </p>
        <p
          className={weekCheck === "this" ? styles.theWeek : styles.otherWeek}
          onClick={handleThisClick}
          onKeyDown={handleThisClick}
        >
          ({getMondayOfThisWeek().toLocaleDateString(undefined, options)}~)
        </p>
      </div>
    </div>
  );
};
