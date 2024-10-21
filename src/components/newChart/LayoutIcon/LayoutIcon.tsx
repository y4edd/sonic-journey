"use client";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import styles from "./LayoutIcon.module.css";

type UseLayoutChange = {
  gridLayout: boolean;
  handleGridLayoutIconClick: () => void;
  handleListLayoutIconClick: () => void;
};

export const LayoutIcon = ({
  gridLayout,
  handleGridLayoutIconClick,
  handleListLayoutIconClick,
}: UseLayoutChange) => {
  return (
    <ul className={styles.layoutIcons}>
      <li className={styles.layoutIconList}>
        <ViewModuleIcon
          className={gridLayout ? styles.gridOn : styles.gridOff}
          onClick={handleGridLayoutIconClick}
          onKeyDown={handleGridLayoutIconClick}
        />
      </li>
      <li className={styles.layoutIconList}>
        <ViewListIcon
          className={gridLayout ? styles.gridOff : styles.gridOn}
          onClick={handleListLayoutIconClick}
          onKeyDown={handleListLayoutIconClick}
        />
      </li>
    </ul>
  );
};
