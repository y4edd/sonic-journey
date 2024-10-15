"use client";

import Image from "next/image";
import styles from "./header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { HamburgerMenu } from "./hamburgerMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  console.log(pathname, "pth");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerTop}>
          <HamburgerMenu />
          <div className={styles.logoImage}>
            <Link href="/">
              <Image
                src="/images/yaetunes_logo_transparent.png"
                alt="header-logo"
                height={40}
                width={160}
              />
            </Link>
          </div>
          <div className={styles.searchIcon}>
            <SearchIcon className={styles.searchIconMark} />
          </div>
        </div>
        <hr />
        <ul className={styles.headerBottom}>
          <li></li>
        </ul>
        <hr />
      </div>
    </>
  );
};

export default Header;
