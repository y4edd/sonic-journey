import { useRouter } from "next/navigation";
import { useState } from "react";

type UseHamburgerOpen = () => {
  openMenu: boolean;
  openMenuClick: () => void;
  hamburgerLink: (src: string) => void;
};

export const UseHamburgerOpen: UseHamburgerOpen = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const openMenuClick = () => {
    setOpenMenu((prevState) => !prevState);
  };
  const hamburgerLink = (src: string) => {
    setOpenMenu(false);
    router.push(src);
  };
  return {
    openMenu,
    openMenuClick,
    hamburgerLink,
  };
};
