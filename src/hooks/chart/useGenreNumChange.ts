"use client";

import { useSearchParams } from "next/navigation";

type UseGenreNumChange = () => {
  transitionId: number;
};

export const UseGenreNumChange: UseGenreNumChange = () => {
  const searchParams = useSearchParams();
  let transitionId = Number(searchParams.get("id"));
  if (
    transitionId !== 0 &&
    transitionId !== 16 &&
    transitionId !== 95 &&
    transitionId !== 113 &&
    transitionId !== 132 &&
    transitionId !== 152 &&
    transitionId !== 165 &&
    transitionId !== 173 &&
    transitionId !== 464
  ) {
    transitionId = 0;
  }
  return {
    transitionId,
  };
};
