import MenuBox from "@/components/mypage/MenuBox/MenuBox";
import BreadList from "@/components/top/BreadList/BreadList";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteTwoToneIcon from "@mui/icons-material/MusicNoteTwoTone";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PlaylistPlayTwoToneIcon from "@mui/icons-material/PlaylistPlayTwoTone";
import styles from "./page.module.css";

const MyPage = () => {
  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
        ]}
      />
      <div className={styles.menuTitle}>
        <h3>メニュー</h3>
      </div>
      <div className={styles.myPageMenuGrid}>
        <MenuBox
          mainTitle="お気に入り"
          subTitle="楽曲"
          icon={<MusicNoteTwoToneIcon fontSize="large" />}
        />
        <MenuBox
          mainTitle="お気に入り"
          subTitle="アーティスト"
          icon={<PeopleOutlineIcon fontSize="large" />}
        />
        <MenuBox mainTitle="プレイリスト" icon={<PlaylistPlayTwoToneIcon fontSize="large" />} />
        <MenuBox
          mainTitle="再生履歴"
          subTitle="（最新10件）"
          icon={<HistoryIcon fontSize="large" />}
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
        />
        <MenuBox mainTitle="ログアウト" icon={<LogoutIcon fontSize="large" />} />
        <div className={styles.gridRow}>
          <MenuBox mainTitle="退会" icon={<NoAccountsIcon fontSize="large" />} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
