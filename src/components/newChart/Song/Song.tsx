"use client";
import styles from "./Song.module.css";
import type { DeezerChartSong } from "@/types/deezer";
import { LayoutIcon } from "@/components/newChart/LayoutIcon/LayoutIcon";
import { SongItem } from "../SongItem/SongItem";
import { SelectDate } from "../SelectDate/SelectDate";
import { UseLayoutChange } from "@/hooks/chart/useLayoutChange";
import { UseDateCheck } from "@/hooks/chart/useDateCheck";

export const Song = ({
  songs,
}: {
  songs: { resultData: DeezerChartSong[] };
}) => {
  const { gridLayout, handleGridLayoutIconClick, handleListLayoutIconClick } =
    UseLayoutChange();

  const { weekCheck, handleLastClick, handleThisClick } = UseDateCheck();
  return (
    <>
      <div className={styles.flexWrapper}>
        <LayoutIcon
          gridLayout={gridLayout}
          handleGridLayoutIconClick={handleGridLayoutIconClick}
          handleListLayoutIconClick={handleListLayoutIconClick}
        />
        <SelectDate
          weekCheck={weekCheck}
          handleLastClick={handleLastClick}
          handleThisClick={handleThisClick}
        />
      </div>
      <SongItem
        songs={songs.resultData}
        gridLayout={gridLayout}
        weekCheck={weekCheck}
      />
    </>
  );
};
