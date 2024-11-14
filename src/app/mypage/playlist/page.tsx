"use client";

import ActionButton from "@/components/mypage/ActionButton/ActionButton";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import PlaylistList from "@/components/mypage/PlaylistList/PlaylistList";
import BreadList from "@/components/top/BreadList/BreadList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUser, getUserPlaylist } from "@/utils/apiFunc";
import type { Playlist } from "@prisma/client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Modal from "@/components/mypage/Modal/Modal";
import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";
import { PlaylistEdit } from "@/components/mypage/PlaylistsEdit/PlaylistEdit";

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
          setFunc={setCreateModalOpen}
        />
        <ActionButton
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
