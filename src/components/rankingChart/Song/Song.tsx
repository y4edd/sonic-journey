"use client";
import { LayoutIcon } from "@/components/newChart/LayoutIcon/LayoutIcon";
import { UseLayoutChange } from "@/hooks/chart/useLayoutChange";
import type { DeezerSong } from "@/types/deezer";
import { SongItem } from "../SongItem/SongItem";
import styles from "./Song.module.css";

export const Song = ({ songs }: { songs: { resultData: DeezerSong[] } }) => {
  const { gridLayout, handleGridLayoutIconClick, handleListLayoutIconClick } =
    UseLayoutChange();

  return (
    <>
      <div className={styles.flexWrapper}>
        <LayoutIcon
          gridLayout={gridLayout}
          handleGridLayoutIconClick={handleGridLayoutIconClick}
          handleListLayoutIconClick={handleListLayoutIconClick}
        />
      </div>
      <SongItem songs={songs.resultData} gridLayout={gridLayout} />
    </>
  );
};
