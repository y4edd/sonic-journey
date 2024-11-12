"use client";

import styles from "./PlaylistEdit.module.css";
import type { UserInfo } from "@/types/user";
import type { Playlist } from "@prisma/client";
import { useEffect, useState } from "react";
import { getUserInfo, getUserPlaylist } from "@/utils/apiFunc";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export const PlaylistEdit = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const user: UserInfo = await getUserInfo();
      if (!user) return <div>Loading...</div>;
      const getPlaylists = await getUserPlaylist(user.id);
      setPlaylists(getPlaylists);
    };
    getUser();
  }, []);
  const handlePlaylistDelete = async (playlist: Playlist) => {
    const deleteCheck = confirm(
      `「${playlist.name}」\nプレイリストを削除しますか？`
    );
    if (deleteCheck) {
      try {
        const res = await fetch("http://localhost:3000/api/deletePlaylist", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: playlist.id,
          }),
        });

        if (!res.ok) {
          throw new Error("正常に削除できませんでした");
        }
        router.back();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.editTitle}>プレイリスト編集</p>
      <div className={styles.listWrapper}>
        <ul className={styles.playlists}>
          {playlists.map((playlist) => (
            <li key={playlist.id} className={styles.playlistList}>
              <p className={styles.listTitle}>{playlist.name}</p>
              <button
                type="button"
                onClick={() => handlePlaylistDelete(playlist)}
              >
                <DeleteIcon className={styles.deleteIcon} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
