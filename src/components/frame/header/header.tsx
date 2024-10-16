"use client";

import Image from "next/image";
import styles from "./header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { HamburgerMenu } from "./hamburgerMenu";
import Link from "next/link";
import { PageHeadingList } from "./pageHeadingList";
import { useState } from "react";
import { useFreeWordSearch } from "@/hooks/top/useFreeWordSearch";

const Header = () => {
  const [searchOn, setSearchOn] = useState(false);
  const { handleForm, handleChange, error, freeWord } = useFreeWordSearch();
  const handleClickSearch = () => {
    setSearchOn((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          {searchOn ? (
            <div className={styles.headerTop}>
              <form onSubmit={handleForm} className={styles.freeSearch}>
                <input
                  type="text"
                  name="freeWord"
                  value={freeWord}
                  onChange={handleChange}
                  placeholder={
                    error ? error : "アーティスト・アルバム・楽曲で検索"
                  }
                />
                <button type="submit">
                  <SearchIcon />
                </button>
              </form>
              <div className={styles.searchCancel}>
                <p
                  className={styles.searchCancelText}
                  onClick={handleClickSearch}
                >
                  キャンセル
                </p>
              </div>
            </div>
          ) : (
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
              <div
                className={styles.searchIcon}
                onClick={handleClickSearch}
                data-testid="search-icon"
              >
                <SearchIcon className={styles.searchIconMark} />
              </div>
            </div>
          )}
        </div>
        <hr />
        <PageHeadingList />
        <hr />
      </div>
    </>
  );
};

export default Header;
