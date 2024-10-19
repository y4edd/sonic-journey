import { useState } from "react";

type UseDateCheck = () => {
  weekCheck: string;
  handleLastClick: () => void;
  handleThisClick: () => void;
};

export const UseDateCheck: UseDateCheck = () => {
  const [weekCheck, setWeekCheck] = useState("all");
  const handleLastClick = () => {
    if (weekCheck === "last") {
      setWeekCheck("all");
    } else {
      setWeekCheck("last");
    }
  };

  const handleThisClick = () => {
    if (weekCheck === "this") {
      setWeekCheck("all");
    } else {
      setWeekCheck("this");
    }
  };
  return {
    weekCheck,
    handleLastClick,
    handleThisClick,
  };
};
