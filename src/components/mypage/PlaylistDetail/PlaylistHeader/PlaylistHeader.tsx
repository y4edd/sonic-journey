"use client";

import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import MenuHeader from "../../MenuHeader/MenuHeader";
import Modal from "../../Modal/Modal";
import PlaylistButton from "../../PlaylistButton/PlaylistButton";
import { PlaylistSongEdit } from "../PlaylistSongEdit/PlaylistSongEdit";
import styles from "./PlaylistHeader.module.css";

export const PlaylistHeader = ({
  playlistTitle,
  playlistId,
  playlistSongInfo,
}: {
  playlistTitle: string;
  playlistId: number;
  playlistSongInfo: { api_song_id: number; title: string }[];
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div>
        <MenuHeader title={playlistTitle} />
        {playlistSongInfo.length > 0 && (
          <div className={styles.button}>
            <PlaylistButton name="編集" icon={<EditIcon />} setFunc={setModalOpen} />
          </div>
        )}
      </div>
      {modalOpen && (
        <Modal setFunc={setModalOpen}>
          <div className={styles.modal}>
            <PlaylistSongEdit
              playlistId={playlistId}
              playlistSongInfo={playlistSongInfo}
              setEditModalOpen={setModalOpen}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
