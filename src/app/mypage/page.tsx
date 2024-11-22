import Logout from "@/components/mypage/Logout/Logout";
import MenuBox from "@/components/mypage/MenuBox/MenuBox";
import BreadList from "@/components/top/BreadList/BreadList";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";
import MusicNoteTwoToneIcon from "@mui/icons-material/MusicNoteTwoTone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PlaylistPlayTwoToneIcon from "@mui/icons-material/PlaylistPlayTwoTone";
import { ToastContainer } from "react-toastify";
import styles from "./page.module.css";
import "react-toastify/dist/ReactToastify.css";
import { getUserId } from "@/utils/apiFunc";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

const MyPage = async () => {
  const token = getTokenFromCookie();

  const userId = await getUserId(token);

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
        ]}
      />
      <ToastContainer />
      <div className={styles.menuTitle}>
        <h3>メニュー</h3>
      </div>
      <div className={styles.myPageMenuGrid}>
        <MenuBox
          mainTitle="お気に入り"
          subTitle="楽曲"
          icon={<MusicNoteTwoToneIcon fontSize="large" />}
          link="/mypage/favoritesong"
        />
        <MenuBox
          mainTitle="お気に入り"
          subTitle="アーティスト"
          icon={<PeopleOutlineIcon fontSize="large" />}
          link="/mypage/favoriteartist"
        />
        <MenuBox
          mainTitle="プレイリスト"
          icon={<PlaylistPlayTwoToneIcon fontSize="large" />}
          link="/mypage/playlist"
        />
        <MenuBox
          mainTitle="再生履歴"
          subTitle="（最新10件）"
          icon={<HistoryIcon fontSize="large" />}
          link="/mypage/history"
        />
      </div>
      <div className={styles.menuTitle}>
        <h3>アカウント関連</h3>
      </div>
      <div className={styles.accountMenuGrid}>
        <MenuBox
          mainTitle="ユーザー情報"
          subTitle="編集・確認"
          icon={<AccountBoxIcon fontSize="large" />}
          link={`/user/${userId}/info`}
        />
        <Logout />
      </div>
    </div>
  );
};

export default MyPage;
