"use client";
import { LayoutIcon } from "@/components/newChart/LayoutIcon/LayoutIcon";
import { UseDateCheck } from "@/hooks/chart/useDateCheck";
import { UseLayoutChange } from "@/hooks/chart/useLayoutChange";
import type { DeezerChartSong } from "@/types/deezer";
import { SelectDate } from "../SelectDate/SelectDate";
import { SongItem } from "../SongItem/SongItem";
import styles from "./Song.module.css";

export const Song = ({
  songs,
}: {
  songs: { resultData: DeezerChartSong[] };
}) => {
  const { gridLayout, handleGridLayoutIconClick, handleListLayoutIconClick } = UseLayoutChange();

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
      <SongItem songs={songs.resultData} gridLayout={gridLayout} weekCheck={weekCheck} />
    </>
  );
};
