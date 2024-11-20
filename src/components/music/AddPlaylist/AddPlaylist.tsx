"use client";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { SelectAddPlaylist } from "../SelectAddPlaylist/SelectAddPlaylist";
import { fetchUser, getUserPlaylist } from "@/utils/apiFunc";
import { getAddPlaylists } from "@/utils/apiFunc";
import type { Playlist } from "@prisma/client";
import styles from "./AddPlaylist.module.css";
import { useState, useEffect } from "react";

export const AddPlaylist = ({ id }: { id: number }) => {
  const [user, setUser] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [addListOpen, setAddListOpen] = useState(false);
  const [defaultPlaylists, setDefaultPlaylists] = useState<
    { playlist_id: number }[]
  >([]);

  const handleAddPlaylist = () => {
    if (user) {
      setAddListOpen(true);
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
        const data: { playlist_id: number }[] = await getAddPlaylists(user, id);
        setDefaultPlaylists(data);
      };
      addMusicPlaylists();
    }
  }, [user, playlists, addListOpen]);

  return (
    <>
      <button className={styles.songInfoAddList} onClick={handleAddPlaylist}>
        <CreateNewFolderIcon />
        <p>プレイリストに追加</p>
      </button>
      {addListOpen && user && (
        <SelectAddPlaylist
          user_id={user}
          music_id={id}
          playlists={playlists}
          defaultPlaylists={defaultPlaylists}
          setAddListOpen={setAddListOpen}
        />
      )}
    </>
  );
};
