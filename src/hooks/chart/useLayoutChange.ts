"use client";
import { useState } from "react";

type UseLayoutChange = () => {
  gridLayout: boolean;
  handleGridLayoutIconClick: () => void;
  handleListLayoutIconClick: () => void;
};

export const UseLayoutChange = () => {
  const [gridLayout, setGridLayout] = useState(true);
  const handleGridLayoutIconClick = () => {
    setGridLayout(true);
  };
  const handleListLayoutIconClick = () => {
    setGridLayout(false);
  };

  return {
    gridLayout,
    handleGridLayoutIconClick,
    handleListLayoutIconClick,
  };
};
