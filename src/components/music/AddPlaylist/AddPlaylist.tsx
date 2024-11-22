"use client";

import Modal from "@/components/mypage/Modal/Modal";
import { fetchUser, getUserPlaylist } from "@/utils/apiFunc";
import { getAddPlaylists } from "@/utils/apiFunc";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import type { Playlist } from "@prisma/client";
import { useEffect, useState } from "react";
import { SelectAddPlaylist } from "../SelectAddPlaylist/SelectAddPlaylist";
import styles from "./AddPlaylist.module.css";

export const AddPlaylist = ({ id }: { id: number }) => {
  const [user, setUser] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultPlaylists, setDefaultPlaylists] = useState<
    { playlistId: number; musicFlag: boolean }[]
  >([]);

  const handleAddPlaylist = () => {
    if (user) {
      setModalOpen(true);
    }
  };

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
  }, [user]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: プレイリスト作成、編集モーダルの開閉により更新
  useEffect(() => {
    if (user) {
      const addMusicPlaylists = async () => {
        const data: { playlistId: number; musicFlag: boolean }[] = await getAddPlaylists(user, id);
        setDefaultPlaylists(data);
      };
      addMusicPlaylists();
    }
  }, [user, id, playlists, modalOpen]);

  return (
    <>
      <button type="button" className={styles.songInfoAddList} onClick={handleAddPlaylist}>
        <CreateNewFolderIcon />
        <span>プレイリストに追加</span>
      </button>
      {modalOpen && user && (
        <Modal setFunc={setModalOpen}>
          <div className={styles.modal}>
            <SelectAddPlaylist
              musicId={id}
              playlists={playlists}
              defaultPlaylists={defaultPlaylists}
              setModalOpen={setModalOpen}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
