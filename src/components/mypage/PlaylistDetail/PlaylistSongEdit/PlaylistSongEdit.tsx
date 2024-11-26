"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import styles from "./PlaylistSongEdit.module.css";

export const PlaylistSongEdit = ({
  playlistId,
  playlistSongInfo,
  setEditModalOpen,
}: {
  playlistId: number;
  playlistSongInfo: { api_song_id: number; title: string }[];
  setEditModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [playlistSongs, setPlaylistSongs] = useState(playlistSongInfo);

  const handlePlaylistDelete = async (playlist: {
    api_song_id: number;
    title: string;
  }) => {
    const deleteCheck = confirm(`「${playlist.title}」を\nプレイリストから削除しますか？`);
    if (deleteCheck) {
      try {
        const res = await fetch("http://localhost:3000/api/deletePlaylistSong", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            songId: playlist.api_song_id,
            playlistId: Number(playlistId),
          }),
        });

        if (!res.ok) {
          throw new Error("正常に削除できませんでした");
        }
        setPlaylistSongs((prevState) =>
          prevState.filter((deletePlaylist) => deletePlaylist !== playlist),
        );
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.editTitle}>プレイリストの編集</p>
      <div className={styles.listWrapper}>
        {playlistSongs.length === 0 && (
          <Link href="/ranking" className={styles.rankingPageLink}>
            まずは曲を追加しましょう
          </Link>
        )}
        <ul className={styles.playlists}>
          {playlistSongs.map((playlist) => (
            <li key={playlist.api_song_id} className={styles.playlistList}>
              <p className={styles.listTitle}>{playlist.title}</p>
              <div className={styles.editIcons}>
                <button
                  type="button"
                  onClick={() => handlePlaylistDelete(playlist)}
                  aria-label="delete"
                >
                  <DeleteIcon className={styles.deleteIcon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => setEditModalOpen(false)}
          className={styles.closeButton}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};
