"use client";

import ActionButton from "@/components/mypage/ActionButton/ActionButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import PlaylistList from "@/components/mypage/PlaylistList/PlaylistList";
import BreadList from "@/components/top/BreadList/BreadList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { getUserInfo, getUserPlaylist } from "@/utils/apiFunc";
import type { UserInfo } from "@/types/user";
import type { Playlist } from "@prisma/client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const PlayListPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    const getUser = async () => {
      const user: UserInfo = await getUserInfo();
      if (!user) return <div>Loading...</div>;
      const getPlaylists = await getUserPlaylist(user.id);
      setPlaylists(getPlaylists);
    };
    getUser();
  }, []);

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
        <ActionButton
          name="追加"
          icon={<AddBoxIcon />}
          url="/mypage/playlist/create"
        />
        <ActionButton
          name="編集"
          icon={<EditIcon />}
          url="/mypage/playlist/edit"
        />
      </div>
      <PlaylistList playlists={playlists} />
    </>
  );
};

export default PlayListPage;
