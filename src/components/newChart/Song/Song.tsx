"use client";
import type { DeezerChartSong } from "@/types/deezer";
import { LayoutIcon } from "@/components/newChart/LayoutIcon/LayoutIcon";
import { SongItem } from "../SongItem/SongItem";
import { UseLayoutChange } from "@/hooks/chart/useLayoutChange";

export const Song = ({
  songs,
}: {
  songs: { resultData: DeezerChartSong[] };
}) => {
  const { gridLayout, handleGridLayoutIconClick, handleListLayoutIconClick } =
    UseLayoutChange();
  return (
    <>
      <LayoutIcon
        gridLayout={gridLayout}
        handleGridLayoutIconClick={handleGridLayoutIconClick}
        handleListLayoutIconClick={handleListLayoutIconClick}
      />
      <SongItem songs={songs.resultData} gridLayout={gridLayout} />
    </>
  );
};
