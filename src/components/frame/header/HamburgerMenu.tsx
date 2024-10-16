import Image from "next/image";
import styles from "./HamburgerMenu.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { UseHamburgerOpen } from "@/hooks/header/useHamburgerOpen";

export const HamburgerMenu = () => {
  const { openMenu, openMenuClick, hamburgerLink } = UseHamburgerOpen();
  return (
    <>
      <div className={styles.hamburgerContainer}>
        {openMenu ? (
          <>
            <div className={styles.hamburgerCloseWrapper}>
              <div
                className={styles.hamburgerCloseIconMark}
                onClick={openMenuClick}
                data-testid="close-hamburger-menu"
              >
                ☒
              </div>
              <div className={styles.logoImageClose}>
                <Image
                  src="/images/yaetunes_logo_transparent.png"
                  alt="header-logo"
                  height={25}
                  width={100}
                />
              </div>
              <ul className={styles.hamburgerLists}>
                <li
                  className={styles.hamburgerList}
                  onClick={() => hamburgerLink("/")}
                >
                  <HomeIcon />
                  &nbsp;トップページ
                </li>
                <li
                  className={styles.hamburgerList}
                  onClick={() => hamburgerLink("/mypage")}
                >
                  <HeadphonesIcon />
                  &nbsp;マイページ
                </li>
                <ul>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/playlist")}
                  >
                    <PlaylistPlayIcon />
                    &nbsp;プレイリスト
                  </li>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/artist")}
                  >
                    <FavoriteBorderIcon />
                    &nbsp;アーティスト
                  </li>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/song")}
                  >
                    <FavoriteBorderIcon />
                    &nbsp;曲
                  </li>
                  <li
                    className={styles.hamburgerinList}
                    onClick={() => hamburgerLink("/mypage/history")}
                  >
                    <HistoryIcon />
                    &nbsp;再生履歴
                  </li>
                </ul>
                <div className={styles.line}></div>
                <li className={styles.hamburgerList}>
                  <PersonIcon />
                  &nbsp;ユーザー
                </li>
                {/* ログイン情報により記載内容変更 */}
                <li
                  className={styles.hamburgerinList}
                  onClick={() => hamburgerLink("/user/login")}
                >
                  <LoginIcon />
                  &nbsp;ログイン
                </li>
                <li
                  className={styles.hamburgerinList}
                  onClick={() => hamburgerLink("/user/register")}
                >
                  <HowToRegIcon />
                  &nbsp;新規登録
                </li>
                <li
                  className={styles.hamburgerinList}
                  onClick={() => hamburgerLink("/user/logout")}
                >
                  <LogoutIcon />
                  &nbsp;ログアウト
                </li>
                <li
                  className={styles.hamburgerinList}
                  onClick={() => hamburgerLink("/user/[:id]")}
                >
                  <ContactPageIcon />
                  &nbsp;アカウント情報
                </li>
              </ul>
            </div>
          </>
        ) : (
          <MenuIcon
            className={styles.hamburgerIconMark}
            onClick={openMenuClick}
            data-testid="hamburger-menu"
          />
        )}
      </div>
    </>
  );
};
