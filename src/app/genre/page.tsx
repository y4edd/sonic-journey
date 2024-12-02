"use client";

import GenreState from "@/components/genre/GenreState/GenreState";
import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import BreadList from "@/components/top/BreadList/BreadList";
import { UseGenreNumChange } from "@/hooks/chart/useGenreNumChange";
import { Suspense } from "react";

const GenreContent = () => {
  const { transitionId } = UseGenreNumChange();
  return <GenreState transitionId={transitionId} />;
};

const Page = () => {
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/genre", title: "ジャンル" },
        ]}
      />
      <ChartTitle title="ジャンル" />
      <Suspense fallback={<div>Loading...</div>}>
        <GenreContent />
      </Suspense>
    </>
  );
};

export default Page;
