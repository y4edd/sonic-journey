"use client";

import { useState } from "react";
import Modal from "../../Modal/Modal";
import { PlaylistSongEdit } from "../PlaylistSongEdit/PlaylistSongEdit";
import styles from "./PlaylistHeader.module.css";
import MenuHeader from "../../MenuHeader/MenuHeader";
import PlaylistButton from "../../PlaylistButton/PlaylistButton";
import EditIcon from "@mui/icons-material/Edit";

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
            <PlaylistButton
              name="編集"
              icon={<EditIcon />}
              setFunc={setModalOpen}
            />
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
