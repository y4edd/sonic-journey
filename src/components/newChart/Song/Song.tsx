"use client";

import { LayoutIcon } from "@/components/newChart/LayoutIcon/LayoutIcon";
import { SongItem } from "../SongItem/SongItem";
import { UseLayoutChange } from "@/hooks/chart/useLayoutChange";
import { getNewSongs } from "@/utils/apiFunc";

export const Song = async () => {
  const { gridLayout, handleGridLayoutIconClick, handleListLayoutIconClick } =
    UseLayoutChange();

  const newSongs = await getNewSongs(20);
  // console.log(newSongs.resultData, "newnew");
  return (
    <>
      <LayoutIcon />
      <SongItem songs={newSongs.resultData} gridLayout={gridLayout} />
    </>
  );
};
