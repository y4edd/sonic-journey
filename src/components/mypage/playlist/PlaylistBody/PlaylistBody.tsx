"use client";
import Modal from "@/components/mypage/Modal/Modal";
import PlaylistButton from "@/components/mypage/PlaylistButton/PlaylistButton";
import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";
import PlaylistList from "@/components/mypage/PlaylistList/PlaylistList";
import { PlaylistEdit } from "@/components/mypage/PlaylistsEdit/PlaylistEdit";
import type { Playlist } from "@/types/deezer";
import { getUserPlaylist } from "@/utils/apiFunc";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import styles from "./PlaylistBody.module.css";

export const PlaylistBody = ({ userId }: { userId: string }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: プレイリスト作成、編集モーダルの開閉により更新
  useEffect(() => {
    if (userId) {
      const getPlaylists = async () => {
        const getPlaylists = await getUserPlaylist(userId);
        setPlaylists(getPlaylists);
      };
      getPlaylists();
    }
  }, [userId, createModalOpen, editModalOpen]);
  return (
    <>
      <div className={styles.actionButtonContainer}>
        <PlaylistButton name="追加" icon={<AddBoxIcon />} setFunc={setCreateModalOpen} />
        <PlaylistButton name="編集" icon={<EditIcon />} setFunc={setEditModalOpen} />
      </div>
      <PlaylistList playlists={playlists} />
      {createModalOpen && (
        <Modal setFunc={setCreateModalOpen}>
          <PlaylistForm user_id={userId} setCreateModalOpen={setCreateModalOpen} />
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
