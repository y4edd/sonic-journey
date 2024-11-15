"use client";

import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import Modal from "@/components/mypage/Modal/Modal";
import PlaylistButton from "@/components/mypage/PlaylistButton/PlaylistButton";
import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";
import PlaylistList from "@/components/mypage/PlaylistList/PlaylistList";
import { PlaylistEdit } from "@/components/mypage/PlaylistsEdit/PlaylistEdit";
import BreadList from "@/components/top/BreadList/BreadList";
import { fetchUser, getUserPlaylist } from "@/utils/apiFunc";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import type { Playlist } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const PlayListPage = () => {
  const [user, setUser] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser();
      setUser(data.id);
    };
    getUser();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: プレイリスト作成、編集モーダルの開閉により更新
  useEffect(() => {
    if (user) {
      const getPlaylists = async () => {
        const getPlaylists = await getUserPlaylist(user);
        setPlaylists(getPlaylists);
      };
      getPlaylists();
    }
  }, [user, createModalOpen, editModalOpen]);
  if (!user) return <div>Loading...</div>;
  if (!playlists) return <div>Loading...</div>;
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
        <PlaylistButton
          name="追加"
          icon={<AddBoxIcon />}
          setFunc={setCreateModalOpen}
        />
        <PlaylistButton
          name="編集"
          icon={<EditIcon />}
          setFunc={setEditModalOpen}
        />
      </div>
      <PlaylistList playlists={playlists} />
      {createModalOpen && (
        <Modal setFunc={setCreateModalOpen}>
          <PlaylistForm
            user_id={user}
            setCreateModalOpen={setCreateModalOpen}
          />
        </Modal>
      )}
      {editModalOpen && (
        <Modal setFunc={setEditModalOpen}>
          <PlaylistEdit setEditModalOpen={setEditModalOpen} />
        </Modal>
      )}
    </>
  );
};

export default PlayListPage;
