"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import GenreState from "@/components/genre/GenreState/GenreState";
import { UseGenreNumChange } from "@/hooks/chart/useGenreNumChange";

const Page = () => {
  const { transitionId } = UseGenreNumChange();
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/genre", title: "ジャンル" },
        ]}
      />
      <ChartTitle title="ジャンル" />
      <GenreState transitionId={transitionId} />
    </>
  );
};

export default Page;
