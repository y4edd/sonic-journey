"use client";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { SelectAddPlaylist } from "../SelectAddPlaylist/SelectAddPlaylist";
import { fetchUser, getUserPlaylist } from "@/utils/apiFunc";
import { getAddPlaylists } from "@/utils/apiFunc";
import Modal from "@/components/mypage/Modal/Modal";
import type { Playlist } from "@prisma/client";
import styles from "./AddPlaylist.module.css";
import { useState, useEffect } from "react";

export const AddPlaylist = ({ id }: { id: number }) => {
  const [user, setUser] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultPlaylists, setDefaultPlaylists] = useState<
    { playlist_id: number; music_flag: boolean }[]
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

  useEffect(() => {
    if (user) {
      const addMusicPlaylists = async () => {
        const data: { playlist_id: number; music_flag: boolean }[] =
          await getAddPlaylists(user, id);
        setDefaultPlaylists(data);
      };
      addMusicPlaylists();
    }
  }, [user, playlists, modalOpen]);

  return (
    <>
      <button className={styles.songInfoAddList} onClick={handleAddPlaylist}>
        <CreateNewFolderIcon />
        <span>プレイリストに追加</span>
      </button>
      {modalOpen && user && (
        <Modal setFunc={setModalOpen}>
          <div className={styles.modal}>
            <SelectAddPlaylist
              music_id={id}
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
