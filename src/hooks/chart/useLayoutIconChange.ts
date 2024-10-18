"use client";
import { useState } from "react";

type UseLayoutIconChange = () => {
  gridLayout: boolean;
  handleGridLayoutIconClick: () => void;
  handleListLayoutIconClick: () => void;
};

export const UseLayoutIconChange = () => {
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
