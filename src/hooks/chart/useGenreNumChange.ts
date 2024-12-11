"use client";

import { GENRE_ARTISTS } from "@/constants/constant";
import { useSearchParams } from "next/navigation";

type UseGenreNumChange = () => {
  transitionId: number;
};

export const UseGenreNumChange: UseGenreNumChange = () => {
  const searchParams = useSearchParams();
  const ParamsId = Number(searchParams.get("id"));
  const ALLOWED_GENRE_IDS = GENRE_ARTISTS.map((ele) => ele.id);
  const transitionId = ALLOWED_GENRE_IDS.includes(ParamsId) ? ParamsId : 0;
  return {
    transitionId,
  };
};
