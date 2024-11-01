import ActionButton from "@/components/mypage/ActionButton/ActionButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import PlaylistList from "@/components/mypage/PlaylistList/PlaylistList";
import BreadList from "@/components/top/BreadList/BreadList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./page.module.css";

const PlayListPage = async () => {
  // FIXME:　表示確認用のデータです。
  const playlists = [
    { id: 1, name: "ランニング用" },
    { id: 2, name: "ドライブ用" },
    { id: 3, name: "雨の日に聞く" },
  ];

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/playlist", title: "プレイリスト" },
        ]}
      />
      <MenuHeader title="プレイリスト" />
      <div className={styles.actionButtonContainer}>
        <ActionButton name="追加" icon={<AddBoxIcon />} url="/mypage/playlist/create" />
        <ActionButton name="編集" icon={<EditIcon />} url="/mypage/playlist/edit" />
      </div>
      <PlaylistList playlists={playlists} />
    </>
  );
};

export default PlayListPage;
