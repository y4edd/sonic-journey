"use client";

import { UseHamburgerOpen } from "@/hooks/header/useHamburgerOpen";
import { fetchUser } from "@/utils/apiFunc";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteTwoToneIcon from "@mui/icons-material/MusicNoteTwoTone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HamburgerMenu.module.css";

export const HamburgerMenu = () => {
  const [user, setUser] = useState<string | null>(null);
  const { openMenu, openMenuClick, hamburgerLink } = UseHamburgerOpen();

  // biome-ignore lint/correctness/useExhaustiveDependencies: ハンバーガーメニューの開閉により更新
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser();
      if (data) {
        setUser(data.id);
      }
    };
    getUser();
  }, [openMenu]);

  return (
    <>
      <div className={styles.hamburgerContainer}>
        {openMenu ? (
          <>
            <div className={styles.hamburgerCloseWrapper}>
              <div
                className={styles.hamburgerCloseIconMark}
                onClick={openMenuClick}
                onKeyDown={openMenuClick}
                data-testid="close-hamburger-menu"
              >
                ☒
              </div>
              <div className={styles.logoImageClose}>
                <Image
                  src="/images/yaetunes_logo_transparent.png"
                  alt="header-logo"
                  height={40}
                  width={160}
                />
              </div>
              <ul className={styles.hamburgerLists}>
                <li
                  className={styles.hamburgerList}
                  onClick={() => hamburgerLink("/")}
                  onKeyDown={() => hamburgerLink("/")}
                >
                  <HomeIcon fontSize="large" />
                  &nbsp;トップページ
                </li>
                <li
                  className={styles.hamburgerList}
                  onClick={() => hamburgerLink("/mypage")}
                  onKeyDown={() => hamburgerLink("/mypage")}
                >
                  <HeadphonesIcon fontSize="large" />
                  &nbsp;マイページ
                </li>
                <ul>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/playlist")}
                    onKeyDown={() => hamburgerLink("/mypage/playlist")}
                  >
                    <PlaylistPlayIcon fontSize="large" />
                    &nbsp;プレイリスト
                  </li>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/favoriteartist")}
                    onKeyDown={() => hamburgerLink("/mypage/favoriteartist")}
                  >
                    <PeopleOutlineIcon fontSize="large" sx={{ cursor: "pointer" }} />
                    &nbsp;お気に入りアーティスト
                  </li>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/favoritesong")}
                    onKeyDown={() => hamburgerLink("/mypage/favoritesong")}
                  >
                    <MusicNoteTwoToneIcon fontSize="large" />
                    &nbsp;お気に入り楽曲
                  </li>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/history")}
                    onKeyDown={() => hamburgerLink("/mypage/history")}
                  >
                    <HistoryIcon fontSize="large" />
                    &nbsp;再生履歴
                  </li>
                </ul>
                <div className={styles.line} />
                <li className={styles.hamburgerList}>
                  <PersonIcon fontSize="large" />
                  &nbsp;ユーザー
                </li>
                {/* ログイン情報により記載内容変更 */}
                {user ? (
                  <>
                    <li
                      className={styles.hamburgerinList}
                      onClick={() => hamburgerLink("/user/logout")}
                      onKeyDown={() => hamburgerLink("/user/logout")}
                    >
                      <LogoutIcon fontSize="large" />
                      &nbsp;ログアウト
                    </li>
                    <li
                      className={styles.hamburgerinList}
                      onClick={() => hamburgerLink("/user/[:id]")}
                      onKeyDown={() => hamburgerLink("/user/[:id]")}
                    >
                      <AccountBoxIcon fontSize="large" />
                      &nbsp;アカウント情報
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className={styles.hamburgerinList}
                      onClick={() => hamburgerLink("/user/login")}
                      onKeyDown={() => hamburgerLink("/user/login")}
                    >
                      <LoginIcon fontSize="large" />
                      &nbsp;ログイン
                    </li>
                    <li
                      className={styles.hamburgerinList}
                      onClick={() => hamburgerLink("/user/register")}
                      onKeyDown={() => hamburgerLink("/user/register")}
                    >
                      <HowToRegIcon fontSize="large" />
                      &nbsp;新規登録
                    </li>
                  </>
                )}
              </ul>
            </div>
          </>
        ) : (
          <MenuIcon
            className={styles.hamburgerIconMark}
            onClick={openMenuClick}
            onKeyDown={openMenuClick}
            data-testid="hamburger-menu"
          />
        )}
      </div>
    </>
  );
};
